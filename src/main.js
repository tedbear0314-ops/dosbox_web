import "./styles.css";

const ZIP_JS_URL = "https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.60/index.js";
const JSDOS_PATH = "https://v8.js-dos.com/latest/emulators/";

const KEY_CODES = {
  ArrowUp: 265,
  ArrowDown: 264,
  ArrowLeft: 263,
  ArrowRight: 262,
  Enter: 13,
  Escape: 27,
  Backspace: 8,
  Tab: 9,
  Space: 32,
};

let selectedFile = null;
let selectedFolderFiles = [];
let selectedSource = null;
let launchCandidates = [];
let selectedProgram = "";
let dosProps = null;
let commandInterface = null;
let bundleUrl = null;
let zipModulePromise = null;

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="shell">
    <section class="topbar" aria-label="遊戲載入">
      <div class="brand">
        <span class="brand-mark">C:\\</span>
        <div>
          <h1>Fold DOS Web</h1>
          <p>DOSBox-style browser player</p>
        </div>
      </div>
      <div class="loader-panel">
        <label class="file-button">
          <input id="game-file" type="file" accept=".zip,.jsdos,application/zip,application/x-zip-compressed" />
          選擇 DOS 遊戲 ZIP / JSDOS
        </label>
        <label class="file-button">
          <input id="game-folder" type="file" webkitdirectory directory multiple />
          選擇遊戲資料夾
        </label>
        <select id="program-select" disabled aria-label="選擇啟動程式">
          <option>先選擇遊戲檔案</option>
        </select>
        <button id="start-button" class="primary" disabled>開始遊戲</button>
        <button id="prompt-button" title="直接進入 DOS prompt">DOS prompt</button>
      </div>
    </section>

    <section class="stage">
      <div class="screen-card">
        <div id="dos-screen" class="dos-screen">
          <div class="empty-state">
            <strong>選擇 ZIP 或遊戲資料夾後即可開始</strong>
            <span>含有 .exe 或 .bat 時會自動列出啟動程式。</span>
          </div>
        </div>
        <div id="touch-mouse-layer" class="touch-mouse-layer" aria-label="DOS 滑鼠觸控區"></div>
      </div>

      <div class="controls" aria-label="虛擬按鍵">
        <div class="dpad" aria-label="方向鍵">
          <button class="key ghost"></button>
          <button class="key" data-key="ArrowUp">↑</button>
          <button class="key ghost"></button>
          <button class="key" data-key="ArrowLeft">←</button>
          <button class="key" data-key="ArrowDown">↓</button>
          <button class="key" data-key="ArrowRight">→</button>
        </div>

        <div class="action-pad">
          <button id="keyboard-button" class="utility">鍵盤</button>
          <button class="key action" data-key="Escape">Esc</button>
          <button class="key action enter" data-key="Enter">Enter</button>
        </div>
      </div>
    </section>

    <input id="keyboard-proxy" class="keyboard-proxy" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
    <p id="status" class="status">請選擇 DOS 遊戲 ZIP，或按 DOS prompt 直接進入命令列。</p>
  </main>
`;

const fileInput = document.querySelector("#game-file");
const folderInput = document.querySelector("#game-folder");
const programSelect = document.querySelector("#program-select");
const startButton = document.querySelector("#start-button");
const promptButton = document.querySelector("#prompt-button");
const keyboardButton = document.querySelector("#keyboard-button");
const keyboardProxy = document.querySelector("#keyboard-proxy");
const statusLine = document.querySelector("#status");
const dosScreen = document.querySelector("#dos-screen");
const touchMouseLayer = document.querySelector("#touch-mouse-layer");

fileInput.addEventListener("change", async (event) => {
  selectedFile = event.target.files?.[0] ?? null;
  selectedFolderFiles = [];
  selectedSource = selectedFile ? "archive" : null;
  selectedProgram = "";
  launchCandidates = [];

  if (!selectedFile) {
    setStatus("沒有選擇檔案。");
    updateProgramSelect();
    return;
  }

  setStatus(`正在讀取 ${selectedFile.name}...`);

  try {
    if (isJsdosFile(selectedFile)) {
      selectedProgram = "__jsdos_bundle__";
      launchCandidates = ["使用 .jsdos 內建啟動設定"];
      updateProgramSelect();
      startButton.disabled = false;
      setStatus(".jsdos 遊戲包已準備好，可以開始。");
      return;
    }

    launchCandidates = await listLaunchersFromZip(selectedFile);
    selectedProgram = launchCandidates[0] ?? "";
    updateProgramSelect();
    startButton.disabled = launchCandidates.length === 0;

    if (launchCandidates.length === 0) {
      setStatus("ZIP 內找不到 .exe 或 .bat。你仍可按 DOS prompt 自己輸入命令。");
    } else {
      setStatus(`找到 ${launchCandidates.length} 個啟動程式，預設使用 ${selectedProgram}。`);
    }
  } catch (error) {
    console.error(error);
    setStatus("讀取 ZIP 失敗，請確認檔案格式正確。");
    updateProgramSelect();
  }
});

folderInput.addEventListener("change", async (event) => {
  selectedFile = null;
  selectedFolderFiles = Array.from(event.target.files ?? []);
  selectedSource = selectedFolderFiles.length > 0 ? "folder" : null;
  selectedProgram = "";
  launchCandidates = [];

  if (selectedFolderFiles.length === 0) {
    setStatus("沒有選擇資料夾。Android Chrome 若無法選資料夾，請改用 ZIP。");
    updateProgramSelect();
    return;
  }

  launchCandidates = listLaunchersFromFiles(selectedFolderFiles);
  selectedProgram = launchCandidates[0] ?? "";
  updateProgramSelect();
  startButton.disabled = launchCandidates.length === 0;

  const folderName = getFolderLabel(selectedFolderFiles);

  if (launchCandidates.length === 0) {
    setStatus(`${folderName} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`);
  } else {
    setStatus(`${folderName} 已載入 ${selectedFolderFiles.length} 個檔案，預設使用 ${selectedProgram}。`);
  }
});

programSelect.addEventListener("change", () => {
  selectedProgram = programSelect.value;
});

startButton.addEventListener("click", async () => {
  if (!selectedSource) {
    setStatus("請先選擇 DOS 遊戲 ZIP、JSDOS 或資料夾。");
    return;
  }

  if (!selectedProgram) {
    setStatus("請先選擇 .exe 或 .bat。");
    return;
  }

  await startSelectedGame();
});

promptButton.addEventListener("click", async () => {
  await startPrompt();
});

keyboardButton.addEventListener("click", () => {
  focusKeyboard();
});

keyboardProxy.addEventListener("keydown", (event) => {
  forwardKeyboardEvent(event);
});

keyboardProxy.addEventListener("input", () => {
  const text = keyboardProxy.value;
  keyboardProxy.value = "";

  for (const char of text) {
    sendKey(char.toUpperCase().charCodeAt(0));
  }
});

document.querySelectorAll("[data-key]").forEach((button) => {
  const keyName = button.dataset.key;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    pressKey(keyName, true);
    button.setPointerCapture(event.pointerId);
  });

  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    pressKey(keyName, false);
  });

  button.addEventListener("pointercancel", () => {
    pressKey(keyName, false);
  });
});

touchMouseLayer.addEventListener("pointerdown", (event) => {
  if (!commandInterface) {
    return;
  }

  event.preventDefault();
  touchMouseLayer.setPointerCapture(event.pointerId);
  sendMousePosition(event);
  commandInterface.sendMouseButton?.(0, true);
});

touchMouseLayer.addEventListener("pointermove", (event) => {
  if (!commandInterface) {
    return;
  }

  event.preventDefault();
  sendMousePosition(event);
});

touchMouseLayer.addEventListener("pointerup", (event) => {
  if (!commandInterface) {
    return;
  }

  event.preventDefault();
  sendMousePosition(event);
  commandInterface.sendMouseButton?.(0, false);
});

async function startSelectedGame() {
  setStatus("正在建立 DOSBox 遊戲包...");
  disableRunButtons(true);

  try {
    if (selectedSource === "folder") {
      await runDosFromFolder(selectedFolderFiles, selectedProgram);
      return;
    }

    const url = isJsdosFile(selectedFile)
      ? URL.createObjectURL(selectedFile)
      : await createBundleUrlFromZip(selectedFile, selectedProgram);

    await runDos(url, `啟動 ${selectedProgram}`);
  } catch (error) {
    console.error(error);
    setStatus("啟動失敗。請確認 ZIP 內的啟動程式與 DOS 遊戲檔案完整。");
  } finally {
    disableRunButtons(false);
  }
}

async function runDosFromFolder(files, program) {
  const initFs = await Promise.all(files.map(fileToInitFsEntry));
  const dosboxConf = createAutoexecConfig(program);

  await runDosWithFiles(dosboxConf, initFs, `啟動 ${program}，等待 DOSBox 核心就緒...`);
}

async function startPrompt() {
  setStatus("正在開啟 DOS prompt...");
  disableRunButtons(true);

  try {
    const dosboxConf = `
[sdl]
autolock=false

[render]
aspect=true

[cpu]
cycles=auto

[autoexec]
mount c .
c:
cls
`;

    await runDosWithConfig(dosboxConf, "DOS prompt 已開啟。");
  } catch (error) {
    console.error(error);
    setStatus("DOS prompt 啟動失敗。");
  } finally {
    disableRunButtons(false);
  }
}

async function runDos(url, bootMessage) {
  await stopDos();
  clearDosScreen();

  bundleUrl = url;
  dosProps = window.Dos(dosScreen, {
    url,
    pathPrefix: JSDOS_PATH,
    backend: "dosbox",
    backendLocked: true,
    autoStart: true,
    kiosk: true,
    mouseCapture: false,
    renderAspect: "Fit",
    imageRendering: "pixelated",
    theme: "dark",
    noCursor: false,
    onEvent: handleDosEvent,
  });

  setStatus(`${bootMessage}，等待 DOSBox 核心就緒...`);
}

async function runDosWithConfig(dosboxConf, readyMessage) {
  await stopDos();
  clearDosScreen();

  dosProps = window.Dos(dosScreen, {
    dosboxConf,
    pathPrefix: JSDOS_PATH,
    backend: "dosbox",
    backendLocked: true,
    autoStart: true,
    kiosk: true,
    mouseCapture: false,
    renderAspect: "Fit",
    imageRendering: "pixelated",
    theme: "dark",
    noCursor: false,
    onEvent: (event, ci) => {
      handleDosEvent(event, ci);
      if (event === "ci-ready") {
        setStatus(readyMessage);
      }
    },
  });
}

async function runDosWithFiles(dosboxConf, initFs, bootMessage) {
  await stopDos();
  clearDosScreen();

  dosProps = window.Dos(dosScreen, {
    dosboxConf,
    initFs,
    pathPrefix: JSDOS_PATH,
    backend: "dosbox",
    backendLocked: true,
    autoStart: true,
    kiosk: true,
    mouseCapture: false,
    renderAspect: "Fit",
    imageRendering: "pixelated",
    theme: "dark",
    noCursor: false,
    onEvent: handleDosEvent,
  });

  setStatus(bootMessage);
}

async function stopDos() {
  commandInterface = null;

  if (dosProps?.stop) {
    await dosProps.stop();
  }

  dosProps = null;

  if (bundleUrl) {
    URL.revokeObjectURL(bundleUrl);
    bundleUrl = null;
  }
}

function handleDosEvent(event, ci) {
  if (event === "emu-ready") {
    setStatus("DOSBox WebAssembly 核心已載入。");
  }

  if (event === "ci-ready") {
    commandInterface = ci;
    setStatus("遊戲已啟動。按「鍵盤」可叫出完整 Android 鍵盤。");
    focusKeyboard();
  }
}

async function listLaunchersFromZip(file) {
  const zip = await loadZipModule();
  const reader = new zip.ZipReader(new zip.BlobReader(file));
  const entries = await reader.getEntries();

  await reader.close();

  return entries
    .filter((entry) => !entry.directory)
    .map((entry) => entry.filename.replaceAll("/", "\\"))
    .filter((name) => /\.(exe|bat)$/i.test(name))
    .sort((a, b) => scoreLauncher(a) - scoreLauncher(b) || a.localeCompare(b));
}

function listLaunchersFromFiles(files) {
  return files
    .map((file) => getDosPath(file))
    .filter((name) => /\.(exe|bat)$/i.test(name))
    .sort((a, b) => scoreLauncher(a) - scoreLauncher(b) || a.localeCompare(b));
}

async function createBundleUrlFromZip(file, program) {
  if (!window.emulators?.bundle) {
    throw new Error("js-dos emulators bundle API is not available.");
  }

  window.emulators.pathPrefix = JSDOS_PATH;

  const objectUrl = URL.createObjectURL(file);

  try {
    const bundle = await window.emulators.bundle();
    const normalizedProgram = program.replaceAll("\\", "/");
    const bytes = await bundle
      .extract(objectUrl, "/")
      .autoexec(normalizedProgram)
      .toUint8Array(true);

    return URL.createObjectURL(new Blob([bytes], { type: "application/octet-stream" }));
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function loadZipModule() {
  if (!zipModulePromise) {
    zipModulePromise = import(/* @vite-ignore */ ZIP_JS_URL);
  }

  return zipModulePromise;
}

function updateProgramSelect() {
  programSelect.innerHTML = "";

  if (selectedSource === "archive" && isJsdosFile(selectedFile)) {
    programSelect.append(new Option("使用 .jsdos 內建啟動設定", "__jsdos_bundle__"));
    programSelect.disabled = true;
    return;
  }

  if (launchCandidates.length === 0) {
    programSelect.append(new Option("找不到 .exe / .bat", ""));
    programSelect.disabled = true;
    return;
  }

  for (const candidate of launchCandidates) {
    programSelect.append(new Option(candidate, candidate));
  }

  programSelect.value = selectedProgram;
  programSelect.disabled = false;
}

function pressKey(keyName, pressed) {
  const code = KEY_CODES[keyName];

  if (!commandInterface || code === undefined) {
    return;
  }

  commandInterface.sendKeyEvent?.(code, pressed);
}

function sendKey(code) {
  if (!commandInterface || Number.isNaN(code)) {
    return;
  }

  commandInterface.simulateKeyPress?.(code);
}

function forwardKeyboardEvent(event) {
  const mapped = KEY_CODES[event.key] ?? KEY_CODES[event.code];

  if (mapped !== undefined) {
    event.preventDefault();
    sendKey(mapped);
    return;
  }

  if (event.key?.length === 1) {
    event.preventDefault();
    sendKey(event.key.toUpperCase().charCodeAt(0));
  }
}

function sendMousePosition(event) {
  const rect = touchMouseLayer.getBoundingClientRect();
  const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

  commandInterface.sendMouseMotion?.(x, y);
  commandInterface.sendMouseSync?.();
}

function focusKeyboard() {
  keyboardProxy.focus({ preventScroll: true });
}

function clearDosScreen() {
  dosScreen.innerHTML = "";
}

function disableRunButtons(disabled) {
  startButton.disabled = disabled || !selectedSource || !selectedProgram;
  promptButton.disabled = disabled;
}

function setStatus(message) {
  statusLine.textContent = message;
}

function scoreLauncher(name) {
  const base = name.split("\\").pop().toLowerCase();

  if (base === "start.bat" || base === "run.bat") return 0;
  if (base === "setup.exe" || base === "install.exe") return 10;
  if (base.endsWith(".bat")) return 2;
  return 4;
}

function isJsdosFile(file) {
  return Boolean(file?.name?.toLowerCase().endsWith(".jsdos"));
}

async function fileToInitFsEntry(file) {
  return {
    path: getDosPath(file).replaceAll("\\", "/"),
    contents: new Uint8Array(await file.arrayBuffer()),
  };
}

function getDosPath(file) {
  const path = file.webkitRelativePath || file.name;
  const parts = path.split("/").filter(Boolean);
  const withoutRoot = parts.length > 1 ? parts.slice(1) : parts;

  return withoutRoot.join("\\");
}

function getFolderLabel(files) {
  const firstPath = files[0]?.webkitRelativePath;

  if (!firstPath) {
    return "資料夾";
  }

  return firstPath.split("/").filter(Boolean)[0] || "資料夾";
}

function createAutoexecConfig(program) {
  const normalizedProgram = program.replaceAll("/", "\\");
  const parts = normalizedProgram.split("\\");
  const executable = parts.pop();
  const directory = parts.join("\\");
  const cdLine = directory ? `cd ${directory}` : "";

  return `
[sdl]
autolock=false

[render]
aspect=true

[cpu]
cycles=auto

[autoexec]
mount c .
c:
${cdLine}
${executable}
`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
