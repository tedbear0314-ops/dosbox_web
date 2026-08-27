(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const oe="https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.60/index.js",R="https://v8.js-dos.com/latest/emulators/",re=280,se=82,w={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:257,Escape:256,Backspace:259,Tab:258,Space:32},ae=[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["Tab","Space","Backspace","Enter","Esc"],[":","\\",".","-","_","/","*"]];let p=null,b=[],v=null,u=[],c="",d=null,a=null,D=null,O=null,y=localStorage.getItem("fold-dos-audio-muted")!=="false",I=0;const L=new Map,ie=document.querySelector("#app");ie.innerHTML=`
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
`;const le=document.querySelector("#game-file"),ue=document.querySelector("#game-folder"),f=document.querySelector("#program-select"),x=document.querySelector("#start-button"),C=document.querySelector("#mute-button"),Z=document.querySelector("#prompt-button"),ce=document.querySelector("#keyboard-button"),U=document.querySelector("#keyboard-panel"),k=document.querySelector("#keyboard-proxy"),de=document.querySelector("#close-keyboard-button"),q=document.querySelector("#touch-keyboard"),pe=document.querySelector("#debug-panel"),fe=document.querySelector("#status"),$=document.querySelector("#dos-screen"),E=document.querySelector("#touch-mouse-layer");Ee();Y();le.addEventListener("change",async e=>{var t;if(p=((t=e.target.files)==null?void 0:t[0])??null,b=[],v=p?"archive":null,c="",u=[],!p){i("沒有選擇檔案。"),g();return}i(`正在讀取 ${p.name}...`);try{if(j(p)){c="__jsdos_bundle__",u=["使用 .jsdos 內建啟動設定"],g(),x.disabled=!1,i(".jsdos 遊戲包已準備好，可以開始。");return}u=await ke(p),c=u[0]??"",g(),x.disabled=u.length===0,u.length===0?i("ZIP 內找不到 .exe 或 .bat。你仍可按 DOS prompt 自己輸入命令。"):i(`找到 ${u.length} 個啟動程式，預設使用 ${c}。`)}catch(n){console.error(n),i("讀取 ZIP 失敗，請確認檔案格式正確。"),g()}});ue.addEventListener("change",async e=>{if(p=null,b=Array.from(e.target.files??[]),v=b.length>0?"folder":null,c="",u=[],b.length===0){i("沒有選擇資料夾。Android Chrome 若無法選資料夾，請改用 ZIP。"),g();return}u=ve(b),c=u[0]??"",g(),x.disabled=u.length===0;const t=Re(b);u.length===0?i(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):i(`${t} 已載入 ${b.length} 個檔案，預設使用 ${c}。`)});f.addEventListener("change",()=>{c=f.value});x.addEventListener("click",async()=>{if(!v){i("請先選擇 DOS 遊戲 ZIP、JSDOS 或資料夾。");return}if(!c){i("請先選擇 .exe 或 .bat。");return}await ye()});Z.addEventListener("click",async()=>{await he()});ce.addEventListener("click",()=>{Ae()});C.addEventListener("click",()=>{$e(!y)});de.addEventListener("click",()=>{U.hidden=!0,k.blur()});k.addEventListener("keydown",e=>{xe(e)});k.addEventListener("input",()=>{Pe()});document.addEventListener("keydown",e=>{if(H(e.target))return;const t=F(e);t!==void 0&&(e.preventDefault(),h(t,`physical:${e.key}`))});document.addEventListener("keyup",e=>{if(H(e.target))return;const t=F(e);t!==void 0&&(e.preventDefault(),m(`physical:${e.key}`,t,"up","keyup ignored: simulateKeyPress mode"))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",n=>{n.preventDefault(),e.classList.add("is-down"),Se(t,`virtual:${t}`),e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{n.preventDefault(),e.classList.remove("is-down"),S(t,`virtual:${t}`)}),e.addEventListener("pointercancel",()=>{e.classList.remove("is-down"),S(t,`virtual-cancel:${t}`)}),e.addEventListener("pointerleave",()=>{e.classList.remove("is-down"),S(t,`virtual-leave:${t}`)})});E.addEventListener("pointerdown",e=>{var t;a&&(e.preventDefault(),E.setPointerCapture(e.pointerId),M(e),(t=a.sendMouseButton)==null||t.call(a,0,!0))});E.addEventListener("pointermove",e=>{a&&(e.preventDefault(),M(e))});E.addEventListener("pointerup",e=>{var t;a&&(e.preventDefault(),M(e),(t=a.sendMouseButton)==null||t.call(a,0,!1))});async function ye(){i("正在建立 DOSBox 遊戲包..."),A(!0);try{if(v==="folder"){await me(b,c);return}if(j(p)){const e=URL.createObjectURL(p);await ge(e,`啟動 ${c}`);return}await be(p,c)}catch(e){console.error(e),i("啟動失敗。請確認 ZIP 內的啟動程式與 DOS 遊戲檔案完整。")}finally{A(!1)}}async function me(e,t){const n=await Promise.all(e.map(Oe)),o=X(t,n.map(r=>r.path));await W(o,n,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function be(e,t){const n=await Ce(e),o=X(t,n.map(r=>r.path));await W(o,n,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function he(){i("正在開啟 DOS prompt..."),A(!0);try{const e=Q({autoexec:`
mount c .
c:
cls
`});await we(e,"DOS prompt 已開啟。")}catch(e){console.error(e),i("DOS prompt 啟動失敗。")}finally{A(!1)}}async function ge(e,t){await B(),_(),D=e,d=window.Dos($,{url:e,pathPrefix:R,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:T}),i(`${t}，等待 DOSBox 核心就緒...`)}async function we(e,t){await B(),_(),d=window.Dos($,{dosboxConf:e,pathPrefix:R,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:(n,o)=>{T(n,o),n==="ci-ready"&&i(t)}})}async function W(e,t,n){await B(),_(),d=window.Dos($,{dosboxConf:e,initFs:t,pathPrefix:R,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:T}),i(n)}async function B(){Le(),a=null,m("ci-reset",void 0,void 0,"stopped"),d!=null&&d.stop&&await d.stop(),d=null,D&&(URL.revokeObjectURL(D),D=null)}function T(e,t){console.log("[fold-dos] js-dos event",e,t),e==="emu-ready"&&(m("emu-ready",void 0,void 0,"DOSBox WebAssembly loaded"),i("DOSBox WebAssembly 核心已載入。")),e==="ci-ready"&&(a=t,J(),m("ci-ready",void 0,void 0,V()),i("遊戲已啟動。方向鍵、Enter、Esc 已可用；按「鍵盤」可叫出觸控鍵盤。"))}async function ke(e){const t=await N(),n=new t.ZipReader(new t.BlobReader(e)),o=await n.getEntries(),r=ee(o.filter(s=>!s.directory).map(s=>s.filename));return await n.close(),o.filter(s=>!s.directory).map(s=>te(s.filename,r).replaceAll("/","\\")).filter(s=>/\.(exe|bat)$/i.test(s)).sort((s,l)=>P(s)-P(l)||s.localeCompare(l))}function ve(e){return e.map(t=>G(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,n)=>P(t)-P(n)||t.localeCompare(n))}async function N(){return O||(O=import(oe)),O}function g(){if(f.innerHTML="",v==="archive"&&j(p)){f.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),f.disabled=!0;return}if(u.length===0){f.append(new Option("找不到 .exe / .bat","")),f.disabled=!0;return}for(const e of u)f.append(new Option(e,e));f.value=c,f.disabled=!1}function h(e,t="simulate"){if(!a||typeof e!="number"||Number.isNaN(e)){m(t,e,void 0,"blocked: ci missing");return}if(typeof a.simulateKeyPress!="function"){m(t,e,void 0,"blocked: simulateKeyPress missing");return}a.simulateKeyPress(e),m(t,e,"tap","simulateKeyPress ok")}function Se(e,t){const n=w[e];if(n===void 0){m(t,n,!0,"unknown virtual key");return}S(e,t),h(n,t);const o=window.setTimeout(()=>{const r=window.setInterval(()=>{h(n,`${t}:repeat`)},se);L.set(e,{intervalId:r})},re);L.set(e,{timeoutId:o})}function S(e,t){const n=L.get(e);n&&(n.timeoutId&&window.clearTimeout(n.timeoutId),n.intervalId&&window.clearInterval(n.intervalId),L.delete(e),m(t,w[e],!1,"repeat stopped"))}function Le(){for(const e of Array.from(L.keys()))S(e,`stop:${e}`)}function xe(e){var n;const t=F(e);if(t!==void 0){e.preventDefault(),h(t,`input:${e.key}`);return}((n=e.key)==null?void 0:n.length)===1&&(e.preventDefault(),h(e.key.toUpperCase().charCodeAt(0),`input:${e.key}`))}function Ee(){q.innerHTML="";for(const e of ae){const t=document.createElement("div");t.className="touch-key-row";for(const n of e){const o=document.createElement("button");o.type="button",o.className=n.length>1?"touch-key wide":"touch-key",o.textContent=n==="Backspace"?"Bksp":n,o.dataset.touchKey=n,o.addEventListener("pointerdown",r=>{r.preventDefault(),De(n)}),t.append(o)}q.append(t)}}function De(e){const n=w[e==="Esc"?"Escape":e]??K(e);n!==void 0&&h(n,`touch-keyboard:${e}`)}function F(e){return w[e.key]??w[e.code]??K(e.key)}function K(e){if(!(!e||e.length!==1))return e===" "?w.Space:e.toUpperCase().charCodeAt(0)}function M(e){var r,s;const t=E.getBoundingClientRect(),n=z((e.clientX-t.left)/t.width,0,1),o=z((e.clientY-t.top)/t.height,0,1);(r=a.sendMouseMotion)==null||r.call(a,n,o),(s=a.sendMouseSync)==null||s.call(a)}function Ae(){U.hidden=!1,k.focus({preventScroll:!0})}function Pe(e){const t=k.value;k.value="";for(const n of t)h(K(n),`text:${n}`)}function H(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement}function $e(e){y=e,localStorage.setItem("fold-dos-audio-muted",String(e)),J(),Y()}function J(){var e,t,n;a&&(y?(e=a.mute)==null||e.call(a):(t=a.unmute)==null||t.call(a),(n=d==null?void 0:d.setVolume)==null||n.call(d,y?0:1))}function V(){return[`ci=${a?"yes":"no"}`,`simulate=${typeof(a==null?void 0:a.simulateKeyPress)=="function"?"yes":"no"}`,`send=${typeof(a==null?void 0:a.sendKeyEvent)=="function"?"yes":"no"}`].join(" ")}function m(e,t,n,o){const s=[`Debug ${new Date().toLocaleTimeString()}`,`CI:${a?"ready":"not-ready"}`,`source:${e}`,t===void 0?"code:-":`code:${t}`,n===void 0?"state:-":`state:${n}`,o,V()].filter(Boolean).join(" | ");I+=1,pe.textContent=`${I}. ${s}`,console.log("[fold-dos-key]",s)}function Y(){C.textContent=y?"聲音：關":"聲音：開",C.classList.toggle("muted",y)}function _(){$.innerHTML=""}function A(e){x.disabled=e||!v||!c,Z.disabled=e}function i(e){fe.textContent=e}function P(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function j(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function Oe(e){return{path:G(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}async function Ce(e){const t=await N(),n=new t.ZipReader(new t.BlobReader(e));try{const r=(await n.getEntries()).filter(l=>!l.directory),s=ee(r.map(l=>l.filename));return Promise.all(r.map(async l=>({path:te(l.filename,s),contents:await l.getData(new t.Uint8ArrayWriter)})))}finally{await n.close()}}function G(e){const n=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(n.length>1?n.slice(1):n).join("\\")}function Re(e){var n;const t=(n=e[0])==null?void 0:n.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function X(e,t=[]){const o=e.replaceAll("/","\\").split("\\"),r=o.pop(),s=o.join("\\"),l=s?`cd ${s}`:"",ne=Be(e,t);return Q({fd2:ne,autoexec:`
mount c .
c:
${l}
${r}
`})}function Q({autoexec:e,fd2:t=!1}){return`
[sdl]
autolock=false
fullscreen=false
fulldouble=false
fullresolution=original
windowresolution=original
output=surface
sensitivity=100
waitonerror=true
priority=higher,normal
mapperfile=mapper-jsdos.map
usescancodes=true
vsync=false

[dosbox]
machine=svga_s3
language=
captures=capture
memsize=16

[render]
frameskip=0
aspect=false
scaler=none

[cpu]
core=auto
cputype=auto
cycles=auto
cycleup=10
cycledown=20

[mixer]
nosound=${y?"true":"false"}
rate=44100
blocksize=1024
prebuffer=20

[midi]
mpu401=intelligent
mididevice=default
midiconfig=

[sblaster]
sbtype=sb16
sbbase=220
irq=7
dma=1
hdma=5
sbmixer=true
oplmode=auto
oplemu=default
oplrate=44100

[dos]
xms=true
ems=true
umb=true
keyboardlayout=auto

[autoexec]
echo off
${e.trim()}
`}function Be(e,t){const n=e.replaceAll("/","\\").toLowerCase(),o=new Set(t.map(r=>r.replaceAll("/","\\").toLowerCase()));return n.endsWith("fd2.exe")&&(o.has("fd2.exe")||o.has("dos4gw.exe")||o.has("dig.ini")||o.has("mdi.ini"))}function ee(e){const t=new Set;for(const n of e){const o=n.split("/").filter(Boolean);o.length>1&&t.add(o[0])}return t.size===1?`${Array.from(t)[0]}/`:""}function te(e,t){return(t&&e.startsWith(t)?e.slice(t.length):e).replaceAll("\\","/")}function z(e,t,n){return Math.min(Math.max(e,t),n)}
