(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const _="https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.60/index.js",L="https://v8.js-dos.com/latest/emulators/",P={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:13,Escape:27,Backspace:8,Tab:9,Space:32};let u=null,p=[],b=null,l=[],c="",f=null,n=null,k=null,D=null;const q=document.querySelector("#app");q.innerHTML=`
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
`;const Z=document.querySelector("#game-file"),z=document.querySelector("#game-folder"),d=document.querySelector("#program-select"),w=document.querySelector("#start-button"),F=document.querySelector("#prompt-button"),K=document.querySelector("#keyboard-button"),h=document.querySelector("#keyboard-proxy"),N=document.querySelector("#status"),x=document.querySelector("#dos-screen"),g=document.querySelector("#touch-mouse-layer");Z.addEventListener("change",async e=>{var t;if(u=((t=e.target.files)==null?void 0:t[0])??null,p=[],b=u?"archive":null,c="",l=[],!u){s("沒有選擇檔案。"),y();return}s(`正在讀取 ${u.name}...`);try{if(B(u)){c="__jsdos_bundle__",l=["使用 .jsdos 內建啟動設定"],y(),w.disabled=!1,s(".jsdos 遊戲包已準備好，可以開始。");return}l=await G(u),c=l[0]??"",y(),w.disabled=l.length===0,l.length===0?s("ZIP 內找不到 .exe 或 .bat。你仍可按 DOS prompt 自己輸入命令。"):s(`找到 ${l.length} 個啟動程式，預設使用 ${c}。`)}catch(o){console.error(o),s("讀取 ZIP 失敗，請確認檔案格式正確。"),y()}});z.addEventListener("change",async e=>{if(u=null,p=Array.from(e.target.files??[]),b=p.length>0?"folder":null,c="",l=[],p.length===0){s("沒有選擇資料夾。Android Chrome 若無法選資料夾，請改用 ZIP。"),y();return}l=X(p),c=l[0]??"",y(),w.disabled=l.length===0;const t=oe(p);l.length===0?s(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):s(`${t} 已載入 ${p.length} 個檔案，預設使用 ${c}。`)});d.addEventListener("change",()=>{c=d.value});w.addEventListener("click",async()=>{if(!b){s("請先選擇 DOS 遊戲 ZIP、JSDOS 或資料夾。");return}if(!c){s("請先選擇 .exe 或 .bat。");return}await T()});F.addEventListener("click",async()=>{await I()});K.addEventListener("click",()=>{M()});h.addEventListener("keydown",e=>{ee(e)});h.addEventListener("input",()=>{const e=h.value;h.value="";for(const t of e)E(t.toUpperCase().charCodeAt(0))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",o=>{o.preventDefault(),O(t,!0),e.setPointerCapture(o.pointerId)}),e.addEventListener("pointerup",o=>{o.preventDefault(),O(t,!1)}),e.addEventListener("pointercancel",()=>{O(t,!1)})});g.addEventListener("pointerdown",e=>{var t;n&&(e.preventDefault(),g.setPointerCapture(e.pointerId),R(e),(t=n.sendMouseButton)==null||t.call(n,0,!0))});g.addEventListener("pointermove",e=>{n&&(e.preventDefault(),R(e))});g.addEventListener("pointerup",e=>{var t;n&&(e.preventDefault(),R(e),(t=n.sendMouseButton)==null||t.call(n,0,!1))});async function T(){s("正在建立 DOSBox 遊戲包..."),S(!0);try{if(b==="folder"){await W(p,c);return}const e=B(u)?URL.createObjectURL(u):await Q(u,c);await J(e,`啟動 ${c}`)}catch(e){console.error(e),s("啟動失敗。請確認 ZIP 內的啟動程式與 DOS 遊戲檔案完整。")}finally{S(!1)}}async function W(e,t){const o=await Promise.all(e.map(te)),i=re(t);await Y(i,o,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function I(){s("正在開啟 DOS prompt..."),S(!0);try{await H(`
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
`,"DOS prompt 已開啟。")}catch(e){console.error(e),s("DOS prompt 啟動失敗。")}finally{S(!1)}}async function J(e,t){await A(),j(),k=e,f=window.Dos(x,{url:e,pathPrefix:L,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,onEvent:C}),s(`${t}，等待 DOSBox 核心就緒...`)}async function H(e,t){await A(),j(),f=window.Dos(x,{dosboxConf:e,pathPrefix:L,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,onEvent:(o,i)=>{C(o,i),o==="ci-ready"&&s(t)}})}async function Y(e,t,o){await A(),j(),f=window.Dos(x,{dosboxConf:e,initFs:t,pathPrefix:L,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,onEvent:C}),s(o)}async function A(){n=null,f!=null&&f.stop&&await f.stop(),f=null,k&&(URL.revokeObjectURL(k),k=null)}function C(e,t){e==="emu-ready"&&s("DOSBox WebAssembly 核心已載入。"),e==="ci-ready"&&(n=t,s("遊戲已啟動。按「鍵盤」可叫出完整 Android 鍵盤。"),M())}async function G(e){const t=await V(),o=new t.ZipReader(new t.BlobReader(e)),i=await o.getEntries();return await o.close(),i.filter(r=>!r.directory).map(r=>r.filename.replaceAll("/","\\")).filter(r=>/\.(exe|bat)$/i.test(r)).sort((r,a)=>v(r)-v(a)||r.localeCompare(a))}function X(e){return e.map(t=>$(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,o)=>v(t)-v(o)||t.localeCompare(o))}async function Q(e,t){var i;if(!((i=window.emulators)!=null&&i.bundle))throw new Error("js-dos emulators bundle API is not available.");window.emulators.pathPrefix=L;const o=URL.createObjectURL(e);try{const r=await window.emulators.bundle(),a=t.replaceAll("\\","/"),m=await r.extract(o,"/").autoexec(a).toUint8Array(!0);return URL.createObjectURL(new Blob([m],{type:"application/octet-stream"}))}finally{URL.revokeObjectURL(o)}}async function V(){return D||(D=import(_)),D}function y(){if(d.innerHTML="",b==="archive"&&B(u)){d.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),d.disabled=!0;return}if(l.length===0){d.append(new Option("找不到 .exe / .bat","")),d.disabled=!0;return}for(const e of l)d.append(new Option(e,e));d.value=c,d.disabled=!1}function O(e,t){var i;const o=P[e];!n||o===void 0||(i=n.sendKeyEvent)==null||i.call(n,o,t)}function E(e){var t;!n||Number.isNaN(e)||(t=n.simulateKeyPress)==null||t.call(n,e)}function ee(e){var o;const t=P[e.key]??P[e.code];if(t!==void 0){e.preventDefault(),E(t);return}((o=e.key)==null?void 0:o.length)===1&&(e.preventDefault(),E(e.key.toUpperCase().charCodeAt(0)))}function R(e){var r,a;const t=g.getBoundingClientRect(),o=U((e.clientX-t.left)/t.width,0,1),i=U((e.clientY-t.top)/t.height,0,1);(r=n.sendMouseMotion)==null||r.call(n,o,i),(a=n.sendMouseSync)==null||a.call(n)}function M(){h.focus({preventScroll:!0})}function j(){x.innerHTML=""}function S(e){w.disabled=e||!b||!c,F.disabled=e}function s(e){N.textContent=e}function v(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function B(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function te(e){return{path:$(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}function $(e){const o=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(o.length>1?o.slice(1):o).join("\\")}function oe(e){var o;const t=(o=e[0])==null?void 0:o.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function re(e){const o=e.replaceAll("/","\\").split("\\"),i=o.pop(),r=o.join("\\");return`
[sdl]
autolock=false

[render]
aspect=true

[cpu]
cycles=auto

[autoexec]
mount c .
c:
${r?`cd ${r}`:""}
${i}
`}function U(e,t,o){return Math.min(Math.max(e,t),o)}
