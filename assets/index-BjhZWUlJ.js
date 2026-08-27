(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const K="https://v8.js-dos.com/latest/emulators/",G=280,Q=82,h={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:257,Escape:256,Backspace:259,Tab:258,Space:32},Z=[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["Tab","Space","Backspace","Enter","Esc"],[":","\\",".","-","_","/","*"]];let M=null,y=[],S=null,b=[],d="",u=null,n=null,f=localStorage.getItem("fold-dos-audio-muted")!=="false";const k=new Map,ee=document.querySelector("#app");ee.innerHTML=`
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
          <input id="game-folder" type="file" webkitdirectory directory multiple />
          選擇遊戲資料夾
        </label>
        <select id="program-select" disabled aria-label="選擇啟動程式">
          <option>先選擇遊戲檔案</option>
        </select>
        <button id="start-button" class="primary" disabled>開始遊戲</button>
        <button id="mute-button" title="開關 DOSBox 音效">聲音：關</button>
        <button id="export-save-button" disabled title="下載目前暫存中的 FD2.SAV">匯出 FD2.SAV</button>
        <button id="prompt-button" title="直接進入 DOS prompt">DOS prompt</button>
      </div>
    </section>

    <section class="stage">
      <div class="screen-card">
        <div id="dos-screen" class="dos-screen">
          <div class="empty-state">
            <strong>選擇遊戲資料夾後即可開始</strong>
            <span>含有 .exe 或 .bat 時會自動列出啟動程式。</span>
          </div>
        </div>
        <div id="touch-mouse-layer" class="touch-mouse-layer" aria-label="DOS 滑鼠觸控區"></div>

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
    <p id="status" class="status">請選擇 DOS 遊戲資料夾，或按 DOS prompt 直接進入命令列。</p>
  </main>
`;const te=document.querySelector("#game-folder"),c=document.querySelector("#program-select"),D=document.querySelector("#start-button"),L=document.querySelector("#mute-button"),x=document.querySelector("#export-save-button"),q=document.querySelector("#prompt-button"),oe=document.querySelector("#keyboard-button"),_=document.querySelector("#keyboard-panel"),w=document.querySelector("#keyboard-proxy"),ne=document.querySelector("#close-keyboard-button"),F=document.querySelector("#touch-keyboard"),re=document.querySelector("#status"),A=document.querySelector("#dos-screen"),g=document.querySelector("#touch-mouse-layer");pe();I();te.addEventListener("change",async e=>{if(M=null,y=Array.from(e.target.files??[]),S=y.length>0?"folder":null,d="",b=[],y.length===0){i("沒有選擇資料夾。請選擇包含 FD2.EXE 的遊戲資料夾。"),P();return}b=ce(y),d=b[0]??"",P(),D.disabled=b.length===0;const t=Ee(y);b.length===0?i(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):i(`${t} 已載入 ${y.length} 個檔案，預設使用 ${d}。`)});c.addEventListener("change",()=>{d=c.value});D.addEventListener("click",async()=>{if(!S){i("請先選擇 DOS 遊戲資料夾。");return}if(!d){i("請先選擇 .exe 或 .bat。");return}await se()});q.addEventListener("click",async()=>{await ae()});oe.addEventListener("click",()=>{be()});L.addEventListener("click",()=>{he(!f)});x.addEventListener("click",async()=>{await we()});ne.addEventListener("click",()=>{_.hidden=!0,w.blur()});w.addEventListener("keydown",e=>{fe(e)});w.addEventListener("input",()=>{me()});document.addEventListener("keydown",e=>{if(U(e.target))return;const t=$(e);t!==void 0&&(e.preventDefault(),m(t,`physical:${e.key}`))});document.addEventListener("keyup",e=>{if(U(e.target))return;const t=$(e);t!==void 0&&(e.preventDefault(),l(`physical:${e.key}`,t,"up","keyup ignored: simulateKeyPress mode"))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",o=>{o.preventDefault(),e.classList.add("is-down"),de(t,`virtual:${t}`),e.setPointerCapture(o.pointerId)}),e.addEventListener("pointerup",o=>{o.preventDefault(),e.classList.remove("is-down"),v(t,`virtual:${t}`)}),e.addEventListener("pointercancel",()=>{e.classList.remove("is-down"),v(t,`virtual-cancel:${t}`)}),e.addEventListener("pointerleave",()=>{e.classList.remove("is-down"),v(t,`virtual-leave:${t}`)})});g.addEventListener("pointerdown",e=>{var t;n&&(e.preventDefault(),g.setPointerCapture(e.pointerId),O(e),(t=n.sendMouseButton)==null||t.call(n,0,!0))});g.addEventListener("pointermove",e=>{n&&(e.preventDefault(),O(e))});g.addEventListener("pointerup",e=>{var t;n&&(e.preventDefault(),O(e),(t=n.sendMouseButton)==null||t.call(n,0,!1))});async function se(){i("正在建立 DOSBox 遊戲包..."),E(!0);try{if(S==="folder"){await B(y,d);return}await B(y,d)}catch(e){console.error(e),i("啟動失敗。請確認資料夾內的啟動程式與 DOS 遊戲檔案完整。")}finally{E(!1)}}async function B(e,t){const o=await Promise.all(e.map(Se)),s=Le(t,o.map(r=>r.path));await ue(s,o,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function ae(){i("正在開啟 DOS prompt..."),E(!0);try{const e=J({autoexec:`
mount c .
c:
cls
`});await ie(e,"DOS prompt 已開啟。")}catch(e){console.error(e),i("DOS prompt 啟動失敗。")}finally{E(!1)}}async function ie(e,t){await j(),z(),u=window.Dos(A,{dosboxConf:e,pathPrefix:K,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:f?0:1,onEvent:(o,s)=>{V(o,s),o==="ci-ready"&&i(t)}})}async function ue(e,t,o){await j(),z(),u=window.Dos(A,{dosboxConf:e,initFs:t,pathPrefix:K,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:f?0:1,onEvent:V}),i(o)}async function j(){le(),n=null,x.disabled=!0,l("ci-reset",void 0,void 0,"stopped"),u!=null&&u.stop&&await u.stop(),u=null}function V(e,t){console.log("[fold-dos] js-dos event",e,t),e==="emu-ready"&&(l("emu-ready",void 0,void 0,"DOSBox WebAssembly loaded"),i("DOSBox WebAssembly 核心已載入。")),e==="ci-ready"&&(n=t,H(),x.disabled=!1,l("ci-ready",void 0,void 0,W()),i("遊戲已啟動。方向鍵、Enter、Esc 已可用；按「鍵盤」可叫出觸控鍵盤。"))}function ce(e){return e.map(t=>Y(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,o)=>T(t)-T(o)||t.localeCompare(o))}function P(){if(c.innerHTML="",S==="archive"&&ge(M)){c.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),c.disabled=!0;return}if(b.length===0){c.append(new Option("找不到 .exe / .bat","")),c.disabled=!0;return}for(const e of b)c.append(new Option(e,e));c.value=d,c.disabled=!1}function m(e,t="simulate"){if(!n||typeof e!="number"||Number.isNaN(e)){l(t,e,void 0,"blocked: ci missing");return}if(typeof n.simulateKeyPress!="function"){l(t,e,void 0,"blocked: simulateKeyPress missing");return}n.simulateKeyPress(e),l(t,e,"tap","simulateKeyPress ok")}function de(e,t){const o=h[e];if(o===void 0){l(t,o,!0,"unknown virtual key");return}v(e,t),m(o,t);const s=window.setTimeout(()=>{const r=window.setInterval(()=>{m(o,`${t}:repeat`)},Q);k.set(e,{intervalId:r})},G);k.set(e,{timeoutId:s})}function v(e,t){const o=k.get(e);o&&(o.timeoutId&&window.clearTimeout(o.timeoutId),o.intervalId&&window.clearInterval(o.intervalId),k.delete(e),l(t,h[e],!1,"repeat stopped"))}function le(){for(const e of Array.from(k.keys()))v(e,`stop:${e}`)}function fe(e){var o;const t=$(e);if(t!==void 0){e.preventDefault(),m(t,`input:${e.key}`);return}((o=e.key)==null?void 0:o.length)===1&&(e.preventDefault(),m(e.key.toUpperCase().charCodeAt(0),`input:${e.key}`))}function pe(){F.innerHTML="";for(const e of Z){const t=document.createElement("div");t.className="touch-key-row";for(const o of e){const s=document.createElement("button");s.type="button",s.className=o.length>1?"touch-key wide":"touch-key",s.textContent=o==="Backspace"?"Bksp":o,s.dataset.touchKey=o,s.addEventListener("pointerdown",r=>{r.preventDefault(),ye(o)}),t.append(s)}F.append(t)}}function ye(e){const o=h[e==="Esc"?"Escape":e]??C(e);o!==void 0&&m(o,`touch-keyboard:${e}`)}function $(e){return h[e.key]??h[e.code]??C(e.key)}function C(e){if(!(!e||e.length!==1))return e===" "?h.Space:e.toUpperCase().charCodeAt(0)}function O(e){var r,a;const t=g.getBoundingClientRect(),o=R((e.clientX-t.left)/t.width,0,1),s=R((e.clientY-t.top)/t.height,0,1);(r=n.sendMouseMotion)==null||r.call(n,o,s),(a=n.sendMouseSync)==null||a.call(n)}function be(){_.hidden=!1,w.focus({preventScroll:!0})}function me(e){const t=w.value;w.value="";for(const o of t)m(C(o),`text:${o}`)}function U(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement}function he(e){f=e,localStorage.setItem("fold-dos-audio-muted",String(e)),H(),I()}function H(){var e,t,o;n&&(f?(e=n.mute)==null||e.call(n):(t=n.unmute)==null||t.call(n),(o=u==null?void 0:u.setVolume)==null||o.call(u,f?0:1))}function W(){return[`ci=${n?"yes":"no"}`,`simulate=${typeof(n==null?void 0:n.simulateKeyPress)=="function"?"yes":"no"}`,`send=${typeof(n==null?void 0:n.sendKeyEvent)=="function"?"yes":"no"}`].join(" ")}function l(e,t,o,s){const a=[`Debug ${new Date().toLocaleTimeString()}`,`CI:${n?"ready":"not-ready"}`,`source:${e}`,t===void 0?"code:-":`code:${t}`,o===void 0?"state:-":`state:${o}`,s,W()].filter(Boolean).join(" | ");console.log("[fold-dos-key]",a)}function I(){L.textContent=f?"聲音：關":"聲音：開",L.classList.toggle("muted",f)}function z(){A.innerHTML=""}function E(e){D.disabled=e||!S||!d,q.disabled=e}function i(e){re.textContent=e}async function we(){if(!n){i("遊戲尚未啟動，還不能匯出存檔。");return}if(typeof n.fsReadFile!="function"){i("目前 js-dos 核心不支援直接讀取存檔。");return}i("正在讀取 FD2.SAV...");try{const e=await ve("FD2.SAV"),t=await n.fsReadFile(e);ke(t,"FD2.SAV","application/octet-stream"),i(`已匯出 ${e}。`)}catch(e){console.error(e),i("找不到 FD2.SAV。請先在遊戲裡存檔，再按匯出。")}}async function ve(e){const t=[e,`/${e}`,`C:\\${e}`];for(const r of t)try{return await n.fsReadFile(r),r}catch{}if(typeof n.fsTree!="function")return e;const o=await n.fsTree(),s=N(o,e.toLowerCase());if(!s)throw new Error(`${e} not found`);return s}function N(e,t,o=""){if(!e)return"";const s=e.name??"",r=s?`${o}${o?"/":""}${s}`:o;if(!e.nodes&&s.toLowerCase()===t)return r;for(const a of e.nodes??[]){const p=N(a,t,r);if(p)return p}return""}function ke(e,t,o){const s=new Blob([e],{type:o}),r=URL.createObjectURL(s),a=document.createElement("a");a.href=r,a.download=t,document.body.append(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(r),1e3)}function T(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function ge(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function Se(e){return{path:Y(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}function Y(e){const o=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(o.length>1?o.slice(1):o).join("\\")}function Ee(e){var o;const t=(o=e[0])==null?void 0:o.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function Le(e,t=[]){const s=e.replaceAll("/","\\").split("\\"),r=s.pop(),a=s.join("\\"),p=a?`cd ${a}`:"",X=De(e,t);return J({fd2:X,autoexec:`
mount c .
c:
${p}
${r}
`})}function J({autoexec:e,fd2:t=!1}){return`
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
nosound=${f?"true":"false"}
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
`}function De(e,t){const o=e.replaceAll("/","\\").toLowerCase(),s=new Set(t.map(r=>r.replaceAll("/","\\").toLowerCase()));return o.endsWith("fd2.exe")&&(s.has("fd2.exe")||s.has("dos4gw.exe")||s.has("dig.ini")||s.has("mdi.ini"))}function R(e,t,o){return Math.min(Math.max(e,t),o)}
