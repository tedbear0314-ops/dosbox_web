(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const v of s.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&a(v)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const G="https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.60/index.js",O="https://v8.js-dos.com/latest/emulators/",m={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:257,Escape:256,Backspace:259,Tab:258,Space:32},V=[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["Tab","Space","Backspace","Enter","Esc"],[":","\\",".","-","_","/","*"]];let d=null,b=[],g=null,l=[],u="",c=null,o=null,L=null,$=null,y=localStorage.getItem("fold-dos-audio-muted")!=="false",q=0;const X=document.querySelector("#app");X.innerHTML=`
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
        <button id="mute-button" title="開關 DOSBox 音效">聲音：關</button>
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

    <div id="keyboard-panel" class="keyboard-panel" hidden>
      <div class="keyboard-panel-head">
        <span>觸控鍵盤</span>
        <input id="keyboard-proxy" class="keyboard-proxy" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="也可用系統鍵盤輸入文字" />
      </div>
      <div id="touch-keyboard" class="touch-keyboard" aria-label="觸控鍵盤"></div>
      <button id="close-keyboard-button" title="收起鍵盤">收起</button>
    </div>
    <div id="debug-panel" class="debug-panel" aria-live="polite">
      Debug: CI 尚未 ready
    </div>
    <p id="status" class="status">請選擇 DOS 遊戲 ZIP，或按 DOS prompt 直接進入命令列。</p>
  </main>
`;const Q=document.querySelector("#game-file"),ee=document.querySelector("#game-folder"),f=document.querySelector("#program-select"),w=document.querySelector("#start-button"),A=document.querySelector("#mute-button"),Z=document.querySelector("#prompt-button"),te=document.querySelector("#keyboard-button"),z=document.querySelector("#keyboard-panel"),k=document.querySelector("#keyboard-proxy"),ne=document.querySelector("#close-keyboard-button"),_=document.querySelector("#touch-keyboard"),oe=document.querySelector("#debug-panel"),re=document.querySelector("#status"),P=document.querySelector("#dos-screen"),S=document.querySelector("#touch-mouse-layer");me();J();Q.addEventListener("change",async e=>{var t;if(d=((t=e.target.files)==null?void 0:t[0])??null,b=[],g=d?"archive":null,u="",l=[],!d){i("沒有選擇檔案。"),h();return}i(`正在讀取 ${d.name}...`);try{if(T(d)){u="__jsdos_bundle__",l=["使用 .jsdos 內建啟動設定"],h(),w.disabled=!1,i(".jsdos 遊戲包已準備好，可以開始。");return}l=await de(d),u=l[0]??"",h(),w.disabled=l.length===0,l.length===0?i("ZIP 內找不到 .exe 或 .bat。你仍可按 DOS prompt 自己輸入命令。"):i(`找到 ${l.length} 個啟動程式，預設使用 ${u}。`)}catch(n){console.error(n),i("讀取 ZIP 失敗，請確認檔案格式正確。"),h()}});ee.addEventListener("change",async e=>{if(d=null,b=Array.from(e.target.files??[]),g=b.length>0?"folder":null,u="",l=[],b.length===0){i("沒有選擇資料夾。Android Chrome 若無法選資料夾，請改用 ZIP。"),h();return}l=pe(b),u=l[0]??"",h(),w.disabled=l.length===0;const t=Se(b);l.length===0?i(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):i(`${t} 已載入 ${b.length} 個檔案，預設使用 ${u}。`)});f.addEventListener("change",()=>{u=f.value});w.addEventListener("click",async()=>{if(!g){i("請先選擇 DOS 遊戲 ZIP、JSDOS 或資料夾。");return}if(!u){i("請先選擇 .exe 或 .bat。");return}await ae()});Z.addEventListener("click",async()=>{await ie()});te.addEventListener("click",()=>{ke()});A.addEventListener("click",()=>{ve(!y)});ne.addEventListener("click",()=>{z.hidden=!0,k.blur()});k.addEventListener("keydown",e=>{be(e)});k.addEventListener("input",()=>{ge()});document.addEventListener("keydown",e=>{if(e.repeat||H(e.target))return;const t=j(e);t!==void 0&&(e.preventDefault(),R(t,!0,`physical:${e.key}`))});document.addEventListener("keyup",e=>{if(H(e.target))return;const t=j(e);t!==void 0&&(e.preventDefault(),R(t,!1,`physical:${e.key}`))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",n=>{n.preventDefault(),p(`pointerdown:${t}`,m[t],!0,"button touched"),E(m[t],`probe:${t}`),C(t,!0,"virtual"),e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{n.preventDefault(),C(t,!1,"virtual")}),e.addEventListener("pointercancel",()=>{C(t,!1,"virtual-cancel")})});S.addEventListener("pointerdown",e=>{var t;o&&(e.preventDefault(),S.setPointerCapture(e.pointerId),U(e),(t=o.sendMouseButton)==null||t.call(o,0,!0))});S.addEventListener("pointermove",e=>{o&&(e.preventDefault(),U(e))});S.addEventListener("pointerup",e=>{var t;o&&(e.preventDefault(),U(e),(t=o.sendMouseButton)==null||t.call(o,0,!1))});async function ae(){i("正在建立 DOSBox 遊戲包..."),D(!0);try{if(g==="folder"){await se(b,u);return}const e=T(d)?URL.createObjectURL(d):await fe(d,u);await le(e,`啟動 ${u}`)}catch(e){console.error(e),i("啟動失敗。請確認 ZIP 內的啟動程式與 DOS 遊戲檔案完整。")}finally{D(!1)}}async function se(e,t){const n=await Promise.all(e.map(we)),a=Ee(t);await ce(a,n,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function ie(){i("正在開啟 DOS prompt..."),D(!0);try{await ue(`
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
`,"DOS prompt 已開啟。")}catch(e){console.error(e),i("DOS prompt 啟動失敗。")}finally{D(!1)}}async function le(e,t){await B(),F(),L=e,c=window.Dos(P,{url:e,pathPrefix:O,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:K}),i(`${t}，等待 DOSBox 核心就緒...`)}async function ue(e,t){await B(),F(),c=window.Dos(P,{dosboxConf:e,pathPrefix:O,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:(n,a)=>{K(n,a),n==="ci-ready"&&i(t)}})}async function ce(e,t,n){await B(),F(),c=window.Dos(P,{dosboxConf:e,initFs:t,pathPrefix:O,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:K}),i(n)}async function B(){o=null,p("ci-reset",void 0,void 0,"stopped"),c!=null&&c.stop&&await c.stop(),c=null,L&&(URL.revokeObjectURL(L),L=null)}function K(e,t){console.log("[fold-dos] js-dos event",e,t),e==="emu-ready"&&(p("emu-ready",void 0,void 0,"DOSBox WebAssembly loaded"),i("DOSBox WebAssembly 核心已載入。")),e==="ci-ready"&&(o=t,W(),p("ci-ready",void 0,void 0,I()),i("遊戲已啟動。方向鍵、Enter、Esc 已可用；按「鍵盤」可叫出觸控鍵盤。"))}async function de(e){const t=await ye(),n=new t.ZipReader(new t.BlobReader(e)),a=await n.getEntries();return await n.close(),a.filter(r=>!r.directory).map(r=>r.filename.replaceAll("/","\\")).filter(r=>/\.(exe|bat)$/i.test(r)).sort((r,s)=>x(r)-x(s)||r.localeCompare(s))}function pe(e){return e.map(t=>Y(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,n)=>x(t)-x(n)||t.localeCompare(n))}async function fe(e,t){var a;if(!((a=window.emulators)!=null&&a.bundle))throw new Error("js-dos emulators bundle API is not available.");window.emulators.pathPrefix=O;const n=URL.createObjectURL(e);try{const r=await window.emulators.bundle(),s=t.replaceAll("\\","/"),v=await r.extract(n,"/").autoexec(s).toUint8Array(!0);return URL.createObjectURL(new Blob([v],{type:"application/octet-stream"}))}finally{URL.revokeObjectURL(n)}}async function ye(){return $||($=import(G)),$}function h(){if(f.innerHTML="",g==="archive"&&T(d)){f.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),f.disabled=!0;return}if(l.length===0){f.append(new Option("找不到 .exe / .bat","")),f.disabled=!0;return}for(const e of l)f.append(new Option(e,e));f.value=u,f.disabled=!1}function C(e,t,n="virtual"){const a=m[e];if(a===void 0){p(`${n}:${e}`,a,t,"unknown key");return}R(a,t,`${n}:${e}`)}function E(e,t="simulate"){if(!o||Number.isNaN(e)){p(t,e,void 0,"blocked: ci missing");return}if(typeof o.simulateKeyPress!="function"){p(t,e,void 0,"blocked: simulateKeyPress missing");return}o.simulateKeyPress(e),p(t,e,"tap","simulateKeyPress ok")}function R(e,t,n="sendKeyEvent"){if(!o||Number.isNaN(e)){p(n,e,t,"blocked: ci missing");return}if(typeof o.sendKeyEvent!="function"){p(n,e,t,"blocked: sendKeyEvent missing");return}o.sendKeyEvent(e,t),p(n,e,t,"sendKeyEvent ok")}function be(e){var n;const t=j(e);if(t!==void 0){e.preventDefault(),E(t,`input:${e.key}`);return}((n=e.key)==null?void 0:n.length)===1&&(e.preventDefault(),E(e.key.toUpperCase().charCodeAt(0),`input:${e.key}`))}function me(){_.innerHTML="";for(const e of V){const t=document.createElement("div");t.className="touch-key-row";for(const n of e){const a=document.createElement("button");a.type="button",a.className=n.length>1?"touch-key wide":"touch-key",a.textContent=n==="Backspace"?"Bksp":n,a.dataset.touchKey=n,a.addEventListener("pointerdown",r=>{r.preventDefault(),he(n)}),t.append(a)}_.append(t)}}function he(e){const n=m[e==="Esc"?"Escape":e]??M(e);n!==void 0&&E(n,`touch-keyboard:${e}`)}function j(e){return m[e.key]??m[e.code]??M(e.key)}function M(e){if(!(!e||e.length!==1))return e===" "?m.Space:e.toUpperCase().charCodeAt(0)}function U(e){var r,s;const t=S.getBoundingClientRect(),n=N((e.clientX-t.left)/t.width,0,1),a=N((e.clientY-t.top)/t.height,0,1);(r=o.sendMouseMotion)==null||r.call(o,n,a),(s=o.sendMouseSync)==null||s.call(o)}function ke(){z.hidden=!1,k.focus({preventScroll:!0})}function ge(e){const t=k.value;k.value="";for(const n of t)E(M(n),`text:${n}`)}function H(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement}function ve(e){y=e,localStorage.setItem("fold-dos-audio-muted",String(e)),W(),J()}function W(){var e,t,n;o&&(y?(e=o.mute)==null||e.call(o):(t=o.unmute)==null||t.call(o),(n=c==null?void 0:c.setVolume)==null||n.call(c,y?0:1))}function I(){return[`ci=${o?"yes":"no"}`,`simulate=${typeof(o==null?void 0:o.simulateKeyPress)=="function"?"yes":"no"}`,`send=${typeof(o==null?void 0:o.sendKeyEvent)=="function"?"yes":"no"}`].join(" ")}function p(e,t,n,a){const s=[`Debug ${new Date().toLocaleTimeString()}`,`CI:${o?"ready":"not-ready"}`,`source:${e}`,t===void 0?"code:-":`code:${t}`,n===void 0?"state:-":`state:${n}`,a,I()].filter(Boolean).join(" | ");q+=1,oe.textContent=`${q}. ${s}`,console.log("[fold-dos-key]",s)}function J(){A.textContent=y?"聲音：關":"聲音：開",A.classList.toggle("muted",y)}function F(){P.innerHTML=""}function D(e){w.disabled=e||!g||!u,Z.disabled=e}function i(e){re.textContent=e}function x(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function T(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function we(e){return{path:Y(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}function Y(e){const n=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(n.length>1?n.slice(1):n).join("\\")}function Se(e){var n;const t=(n=e[0])==null?void 0:n.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function Ee(e){const n=e.replaceAll("/","\\").split("\\"),a=n.pop(),r=n.join("\\");return`
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
${a}
`}function N(e,t,n){return Math.min(Math.max(e,t),n)}
