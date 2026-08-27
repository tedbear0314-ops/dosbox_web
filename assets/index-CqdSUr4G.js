(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const M="https://v8.js-dos.com/latest/emulators/",ee=280,te=82,h={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:257,Escape:256,Backspace:259,Tab:258,Space:32},ne=[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["Tab","Space","Backspace","Enter","Esc"],[":","\\",".","-","_","/","*"]];let q=null,y=[],S=null,m=[],l="",u=null,o=null,f=localStorage.getItem("fold-dos-audio-muted")!=="false";const g=new Map,_=document.querySelector("#app");_.innerHTML=`
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
        <button id="fullscreen-button" title="切換網頁全螢幕">全螢幕</button>
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
`;const oe=document.querySelector("#game-folder"),c=document.querySelector("#program-select"),D=document.querySelector("#start-button"),L=document.querySelector("#mute-button"),x=document.querySelector("#fullscreen-button"),A=document.querySelector("#export-save-button"),j=document.querySelector("#prompt-button"),re=document.querySelector("#keyboard-button"),U=document.querySelector("#keyboard-panel"),w=document.querySelector("#keyboard-proxy"),se=document.querySelector("#close-keyboard-button"),B=document.querySelector("#touch-keyboard"),ae=document.querySelector("#status"),$=document.querySelector("#dos-screen"),k=document.querySelector("#touch-mouse-layer");me();N();oe.addEventListener("change",async e=>{if(q=null,y=Array.from(e.target.files??[]),S=y.length>0?"folder":null,l="",m=[],y.length===0){i("沒有選擇資料夾。請選擇包含 FD2.EXE 的遊戲資料夾。"),T();return}m=de(y),l=m[0]??"",T(),D.disabled=m.length===0;const t=De(y);m.length===0?i(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):i(`${t} 已載入 ${y.length} 個檔案，預設使用 ${l}。`)});c.addEventListener("change",()=>{l=c.value});D.addEventListener("click",async()=>{if(!S){i("請先選擇 DOS 遊戲資料夾。");return}if(!l){i("請先選擇 .exe 或 .bat。");return}await ie()});j.addEventListener("click",async()=>{await ue()});re.addEventListener("click",()=>{he()});L.addEventListener("click",()=>{ve(!f)});x.addEventListener("click",async()=>{await ge()});A.addEventListener("click",async()=>{await ke()});document.addEventListener("fullscreenchange",()=>{J()});se.addEventListener("click",()=>{U.hidden=!0,w.blur()});w.addEventListener("keydown",e=>{ye(e)});w.addEventListener("input",()=>{we()});document.addEventListener("keydown",e=>{if(I(e.target))return;const t=F(e);t!==void 0&&(e.preventDefault(),b(t,`physical:${e.key}`))});document.addEventListener("keyup",e=>{if(I(e.target))return;const t=F(e);t!==void 0&&(e.preventDefault(),d(`physical:${e.key}`,t,"up","keyup ignored: simulateKeyPress mode"))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",n=>{n.preventDefault(),e.classList.add("is-down"),fe(t,`virtual:${t}`),e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{n.preventDefault(),e.classList.remove("is-down"),v(t,`virtual:${t}`)}),e.addEventListener("pointercancel",()=>{e.classList.remove("is-down"),v(t,`virtual-cancel:${t}`)}),e.addEventListener("pointerleave",()=>{e.classList.remove("is-down"),v(t,`virtual-leave:${t}`)})});k.addEventListener("pointerdown",e=>{var t;o&&(e.preventDefault(),k.setPointerCapture(e.pointerId),O(e),(t=o.sendMouseButton)==null||t.call(o,0,!0))});k.addEventListener("pointermove",e=>{o&&(e.preventDefault(),O(e))});k.addEventListener("pointerup",e=>{var t;o&&(e.preventDefault(),O(e),(t=o.sendMouseButton)==null||t.call(o,0,!1))});async function ie(){i("正在建立 DOSBox 遊戲包..."),E(!0);try{if(S==="folder"){await P(y,l);return}await P(y,l)}catch(e){console.error(e),i("啟動失敗。請確認資料夾內的啟動程式與 DOS 遊戲檔案完整。")}finally{E(!1)}}async function P(e,t){const n=await Promise.all(e.map(xe)),s=Ae(t,n.map(r=>r.path));await le(s,n,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function ue(){i("正在開啟 DOS prompt..."),E(!0);try{const e=Q({autoexec:`
mount c .
c:
cls
`});await ce(e,"DOS prompt 已開啟。")}catch(e){console.error(e),i("DOS prompt 啟動失敗。")}finally{E(!1)}}async function ce(e,t){await V(),Y(),u=window.Dos($,{dosboxConf:e,pathPrefix:M,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:f?0:1,onEvent:(n,s)=>{H(n,s),n==="ci-ready"&&i(t)}})}async function le(e,t,n){await V(),Y(),u=window.Dos($,{dosboxConf:e,initFs:t,pathPrefix:M,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:f?0:1,onEvent:H}),i(n)}async function V(){pe(),o=null,A.disabled=!0,d("ci-reset",void 0,void 0,"stopped"),u!=null&&u.stop&&await u.stop(),u=null}function H(e,t){console.log("[fold-dos] js-dos event",e,t),e==="emu-ready"&&(d("emu-ready",void 0,void 0,"DOSBox WebAssembly loaded"),i("DOSBox WebAssembly 核心已載入。")),e==="ci-ready"&&(o=t,W(),A.disabled=!1,d("ci-ready",void 0,void 0,z()),i("遊戲已啟動。方向鍵、Enter、Esc 已可用；按「鍵盤」可叫出觸控鍵盤。"))}function de(e){return e.map(t=>G(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,n)=>R(t)-R(n)||t.localeCompare(n))}function T(){if(c.innerHTML="",S==="archive"&&Le(q)){c.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),c.disabled=!0;return}if(m.length===0){c.append(new Option("找不到 .exe / .bat","")),c.disabled=!0;return}for(const e of m)c.append(new Option(e,e));c.value=l,c.disabled=!1}function b(e,t="simulate"){if(!o||typeof e!="number"||Number.isNaN(e)){d(t,e,void 0,"blocked: ci missing");return}if(typeof o.simulateKeyPress!="function"){d(t,e,void 0,"blocked: simulateKeyPress missing");return}o.simulateKeyPress(e),d(t,e,"tap","simulateKeyPress ok")}function fe(e,t){const n=h[e];if(n===void 0){d(t,n,!0,"unknown virtual key");return}v(e,t),b(n,t);const s=window.setTimeout(()=>{const r=window.setInterval(()=>{b(n,`${t}:repeat`)},te);g.set(e,{intervalId:r})},ee);g.set(e,{timeoutId:s})}function v(e,t){const n=g.get(e);n&&(n.timeoutId&&window.clearTimeout(n.timeoutId),n.intervalId&&window.clearInterval(n.intervalId),g.delete(e),d(t,h[e],!1,"repeat stopped"))}function pe(){for(const e of Array.from(g.keys()))v(e,`stop:${e}`)}function ye(e){var n;const t=F(e);if(t!==void 0){e.preventDefault(),b(t,`input:${e.key}`);return}((n=e.key)==null?void 0:n.length)===1&&(e.preventDefault(),b(e.key.toUpperCase().charCodeAt(0),`input:${e.key}`))}function me(){B.innerHTML="";for(const e of ne){const t=document.createElement("div");t.className="touch-key-row";for(const n of e){const s=document.createElement("button");s.type="button",s.className=n.length>1?"touch-key wide":"touch-key",s.textContent=n==="Backspace"?"Bksp":n,s.dataset.touchKey=n,s.addEventListener("pointerdown",r=>{r.preventDefault(),be(n)}),t.append(s)}B.append(t)}}function be(e){const n=h[e==="Esc"?"Escape":e]??C(e);n!==void 0&&b(n,`touch-keyboard:${e}`)}function F(e){return h[e.key]??h[e.code]??C(e.key)}function C(e){if(!(!e||e.length!==1))return e===" "?h.Space:e.toUpperCase().charCodeAt(0)}function O(e){var r,a;const t=k.getBoundingClientRect(),n=K((e.clientX-t.left)/t.width,0,1),s=K((e.clientY-t.top)/t.height,0,1);(r=o.sendMouseMotion)==null||r.call(o,n,s),(a=o.sendMouseSync)==null||a.call(o)}function he(){U.hidden=!1,w.focus({preventScroll:!0})}function we(e){const t=w.value;w.value="";for(const n of t)b(C(n),`text:${n}`)}function I(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement}function ve(e){f=e,localStorage.setItem("fold-dos-audio-muted",String(e)),W(),N()}function W(){var e,t,n;o&&(f?(e=o.mute)==null||e.call(o):(t=o.unmute)==null||t.call(o),(n=u==null?void 0:u.setVolume)==null||n.call(u,f?0:1))}function z(){return[`ci=${o?"yes":"no"}`,`simulate=${typeof(o==null?void 0:o.simulateKeyPress)=="function"?"yes":"no"}`,`send=${typeof(o==null?void 0:o.sendKeyEvent)=="function"?"yes":"no"}`].join(" ")}function d(e,t,n,s){const a=[`Debug ${new Date().toLocaleTimeString()}`,`CI:${o?"ready":"not-ready"}`,`source:${e}`,t===void 0?"code:-":`code:${t}`,n===void 0?"state:-":`state:${n}`,s,z()].filter(Boolean).join(" | ");console.log("[fold-dos-key]",a)}function N(){L.textContent=f?"聲音：關":"聲音：開",L.classList.toggle("muted",f)}function Y(){$.innerHTML=""}function E(e){D.disabled=e||!S||!l,j.disabled=e}function i(e){ae.textContent=e}async function ge(){try{if(document.fullscreenElement){await document.exitFullscreen();return}await _.requestFullscreen({navigationUI:"hide"})}catch(e){console.error(e),i("瀏覽器拒絕全螢幕。請用手指點按全螢幕按鈕再試一次。")}finally{J()}}function J(){const e=!!document.fullscreenElement;x.textContent=e?"離開全螢幕":"全螢幕",x.classList.toggle("fullscreen-on",e)}async function ke(){if(!o){i("遊戲尚未啟動，還不能匯出存檔。");return}if(typeof o.fsReadFile!="function"){i("目前 js-dos 核心不支援直接讀取存檔。");return}i("正在讀取 FD2.SAV...");try{const e=await Se("FD2.SAV"),t=await o.fsReadFile(e);Ee(t,"FD2.SAV","application/octet-stream"),i(`已匯出 ${e}。`)}catch(e){console.error(e),i("找不到 FD2.SAV。請先在遊戲裡存檔，再按匯出。")}}async function Se(e){const t=[e,`/${e}`,`C:\\${e}`];for(const r of t)try{return await o.fsReadFile(r),r}catch{}if(typeof o.fsTree!="function")return e;const n=await o.fsTree(),s=X(n,e.toLowerCase());if(!s)throw new Error(`${e} not found`);return s}function X(e,t,n=""){if(!e)return"";const s=e.name??"",r=s?`${n}${n?"/":""}${s}`:n;if(!e.nodes&&s.toLowerCase()===t)return r;for(const a of e.nodes??[]){const p=X(a,t,r);if(p)return p}return""}function Ee(e,t,n){const s=new Blob([e],{type:n}),r=URL.createObjectURL(s),a=document.createElement("a");a.href=r,a.download=t,document.body.append(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(r),1e3)}function R(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function Le(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function xe(e){return{path:G(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}function G(e){const n=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(n.length>1?n.slice(1):n).join("\\")}function De(e){var n;const t=(n=e[0])==null?void 0:n.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function Ae(e,t=[]){const s=e.replaceAll("/","\\").split("\\"),r=s.pop(),a=s.join("\\"),p=a?`cd ${a}`:"",Z=$e(e,t);return Q({fd2:Z,autoexec:`
mount c .
c:
${p}
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
`}function $e(e,t){const n=e.replaceAll("/","\\").toLowerCase(),s=new Set(t.map(r=>r.replaceAll("/","\\").toLowerCase()));return n.endsWith("fd2.exe")&&(s.has("fd2.exe")||s.has("dos4gw.exe")||s.has("dig.ini")||s.has("mdi.ini"))}function K(e,t,n){return Math.min(Math.max(e,t),n)}
