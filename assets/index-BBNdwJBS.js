(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const G="https://v8.js-dos.com/latest/emulators/",Q=280,Z=82,k={ArrowUp:265,ArrowDown:264,ArrowLeft:263,ArrowRight:262,Enter:257,Escape:256,Control:341,Alt:342,F1:290,F2:291,F3:292,F4:293,F5:294,F6:295,F7:296,F8:297,F9:298,F10:299,F11:300,F12:301,Backspace:259,Tab:258,Space:32},ee=[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["Tab","Space","Backspace","Enter","Esc"],[":","\\",".","-","_","/","*"]];let q=null,p=[],F=null,b=[],c="",u=null,o=null,y=localStorage.getItem("fold-dos-audio-muted")!=="false";const g=new Map,_=document.querySelector("#app");_.innerHTML=`
  <main class="shell">
    <section class="topbar" aria-label="遊戲載入">
      <button id="menu-toggle-button" class="menu-toggle" title="顯示或隱藏上方按鈕">隱藏選單</button>
      <div id="loader-panel" class="loader-panel">
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
            <button class="key function-key" data-key="F1">F1</button>
            <button class="key function-key" data-key="F2">F2</button>
            <button class="key function-key" data-key="F3">F3</button>
            <button class="key function-key" data-key="F4">F4</button>
            <button class="key action" data-key="Escape">Esc</button>
            <button class="key action enter" data-key="Enter">Enter</button>
          </div>
        </div>
      </div>
    </section>

    <section class="extra-keybar" aria-label="額外功能鍵">
      <button class="extra-key" data-key="Alt">Alt</button>
      <button class="extra-key" data-key="Control">Ctrl</button>
      <button class="extra-key" data-key="F5">F5</button>
      <button class="extra-key" data-key="F6">F6</button>
      <button class="extra-key" data-key="F7">F7</button>
      <button class="extra-key" data-key="F8">F8</button>
      <button class="extra-key" data-key="F9">F9</button>
      <button class="extra-key" data-key="F10">F10</button>
      <button class="extra-key" data-key="F11">F11</button>
      <button class="extra-key" data-key="F12">F12</button>
    </section>

    <div id="keyboard-panel" class="keyboard-panel" hidden>
      <div class="keyboard-panel-head">
        <span>觸控鍵盤</span>
        <input id="keyboard-proxy" class="keyboard-proxy" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="也可用系統鍵盤輸入文字" />
      </div>
      <div id="touch-keyboard" class="touch-keyboard" aria-label="觸控鍵盤"></div>
      <button id="close-keyboard-button" title="收起鍵盤">收起</button>
    </div>
    <p id="status" class="status">請選擇 DOS 遊戲資料夾。</p>
  </main>
`;const te=document.querySelector(".topbar"),S=document.querySelector("#loader-panel"),j=document.querySelector("#menu-toggle-button"),ne=document.querySelector("#game-folder"),l=document.querySelector("#program-select"),x=document.querySelector("#start-button"),E=document.querySelector("#mute-button"),L=document.querySelector("#fullscreen-button"),A=document.querySelector("#export-save-button"),oe=document.querySelector("#keyboard-panel"),w=document.querySelector("#keyboard-proxy"),se=document.querySelector("#close-keyboard-button"),T=document.querySelector("#touch-keyboard"),re=document.querySelector("#status"),V=document.querySelector("#dos-screen"),v=document.querySelector("#touch-mouse-layer");ye();W();N();ne.addEventListener("change",async e=>{if(q=null,p=Array.from(e.target.files??[]),F=p.length>0?"folder":null,c="",b=[],p.length===0){i("沒有選擇資料夾。請選擇包含 FD2.EXE 的遊戲資料夾。"),O();return}b=ce(p),c=b[0]??"",O(),x.disabled=b.length===0;const t=Se(p);b.length===0?i(`${t} 找不到 .exe 或 .bat。請確認你選的是遊戲資料夾。`):(i(`${t} 已載入 ${p.length} 個檔案，預設使用 ${c}。`),B(!1))});l.addEventListener("change",()=>{c=l.value});x.addEventListener("click",async()=>{if(!F){i("請先選擇 DOS 遊戲資料夾。");return}if(!c){i("請先選擇 .exe 或 .bat。");return}await ae(),B(!1)});j.addEventListener("click",()=>{B(S.hidden)});E.addEventListener("click",()=>{ke(!y)});L.addEventListener("click",async()=>{await ge()});A.addEventListener("click",async()=>{await we()});document.addEventListener("fullscreenchange",()=>{z()});se.addEventListener("click",()=>{oe.hidden=!0,w.blur()});w.addEventListener("keydown",e=>{pe(e)});w.addEventListener("input",()=>{me()});document.addEventListener("keydown",e=>{if(U(e.target))return;const t=D(e);t!==void 0&&(e.preventDefault(),m(t,`physical:${e.key}`))});document.addEventListener("keyup",e=>{if(U(e.target))return;const t=D(e);t!==void 0&&(e.preventDefault(),d(`physical:${e.key}`,t,"up","keyup ignored: simulateKeyPress mode"))});document.querySelectorAll("[data-key]").forEach(e=>{const t=e.dataset.key;e.addEventListener("pointerdown",n=>{n.preventDefault(),e.classList.add("is-down"),de(t,`virtual:${t}`),e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{n.preventDefault(),e.classList.remove("is-down"),h(t,`virtual:${t}`)}),e.addEventListener("pointercancel",()=>{e.classList.remove("is-down"),h(t,`virtual-cancel:${t}`)}),e.addEventListener("pointerleave",()=>{e.classList.remove("is-down"),h(t,`virtual-leave:${t}`)})});v.addEventListener("pointerdown",e=>{var t;o&&(e.preventDefault(),v.setPointerCapture(e.pointerId),C(e),(t=o.sendMouseButton)==null||t.call(o,0,!0))});v.addEventListener("pointermove",e=>{o&&(e.preventDefault(),C(e))});v.addEventListener("pointerup",e=>{var t;o&&(e.preventDefault(),C(e),(t=o.sendMouseButton)==null||t.call(o,0,!1))});async function ae(){i("正在建立 DOSBox 遊戲包..."),R(!0);try{if(F==="folder"){await P(p,c);return}await P(p,c)}catch(e){console.error(e),i("啟動失敗。請確認資料夾內的啟動程式與 DOS 遊戲檔案完整。")}finally{R(!1)}}async function P(e,t){const n=await Promise.all(e.map(Le)),r=xe(t,n.map(s=>s.path));await ie(r,n,`啟動 ${t}，等待 DOSBox 核心就緒...`)}async function ie(e,t,n){await ue(),he(),u=window.Dos(V,{dosboxConf:e,initFs:t,pathPrefix:G,backend:"dosbox",backendLocked:!0,autoStart:!0,kiosk:!0,mouseCapture:!1,renderAspect:"Fit",imageRendering:"pixelated",theme:"dark",noCursor:!1,volume:y?0:1,onEvent:le}),i(n)}async function ue(){fe(),o=null,A.disabled=!0,d("ci-reset",void 0,void 0,"stopped"),u!=null&&u.stop&&await u.stop(),u=null}function le(e,t){console.log("[fold-dos] js-dos event",e,t),e==="emu-ready"&&(d("emu-ready",void 0,void 0,"DOSBox WebAssembly loaded"),i("DOSBox WebAssembly 核心已載入。")),e==="ci-ready"&&(o=t,H(),A.disabled=!1,d("ci-ready",void 0,void 0,I()),i("遊戲已啟動。方向鍵、Enter、Esc 已可用；按「鍵盤」可叫出觸控鍵盤。"))}function ce(e){return e.map(t=>J(t)).filter(t=>/\.(exe|bat)$/i.test(t)).sort((t,n)=>K(t)-K(n)||t.localeCompare(n))}function O(){if(l.innerHTML="",F==="archive"&&Ee(q)){l.append(new Option("使用 .jsdos 內建啟動設定","__jsdos_bundle__")),l.disabled=!0;return}if(b.length===0){l.append(new Option("找不到 .exe / .bat","")),l.disabled=!0;return}for(const e of b)l.append(new Option(e,e));l.value=c,l.disabled=!1}function m(e,t="simulate"){if(!o||typeof e!="number"||Number.isNaN(e)){d(t,e,void 0,"blocked: ci missing");return}if(typeof o.simulateKeyPress!="function"){d(t,e,void 0,"blocked: simulateKeyPress missing");return}o.simulateKeyPress(e),d(t,e,"tap","simulateKeyPress ok")}function de(e,t){const n=k[e];if(n===void 0){d(t,n,!0,"unknown virtual key");return}h(e,t),m(n,t);const r=window.setTimeout(()=>{const s=window.setInterval(()=>{m(n,`${t}:repeat`)},Z);g.set(e,{intervalId:s})},Q);g.set(e,{timeoutId:r})}function h(e,t){const n=g.get(e);n&&(n.timeoutId&&window.clearTimeout(n.timeoutId),n.intervalId&&window.clearInterval(n.intervalId),g.delete(e),d(t,k[e],!1,"repeat stopped"))}function fe(){for(const e of Array.from(g.keys()))h(e,`stop:${e}`)}function pe(e){var n;const t=D(e);if(t!==void 0){e.preventDefault(),m(t,`input:${e.key}`);return}((n=e.key)==null?void 0:n.length)===1&&(e.preventDefault(),m(e.key.toUpperCase().charCodeAt(0),`input:${e.key}`))}function ye(){T.innerHTML="";for(const e of ee){const t=document.createElement("div");t.className="touch-key-row";for(const n of e){const r=document.createElement("button");r.type="button",r.className=n.length>1?"touch-key wide":"touch-key",r.textContent=n==="Backspace"?"Bksp":n,r.dataset.touchKey=n,r.addEventListener("pointerdown",s=>{s.preventDefault(),be(n)}),t.append(r)}T.append(t)}}function be(e){const n=k[e==="Esc"?"Escape":e]??$(e);n!==void 0&&m(n,`touch-keyboard:${e}`)}function D(e){return k[e.key]??k[e.code]??$(e.key)}function $(e){if(!(!e||e.length!==1))return e===" "?k.Space:e.toUpperCase().charCodeAt(0)}function C(e){var s,a;const t=v.getBoundingClientRect(),n=M((e.clientX-t.left)/t.width,0,1),r=M((e.clientY-t.top)/t.height,0,1);(s=o.sendMouseMotion)==null||s.call(o,n,r),(a=o.sendMouseSync)==null||a.call(o)}function me(e){const t=w.value;w.value="";for(const n of t)m($(n),`text:${n}`)}function U(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement}function ke(e){y=e,localStorage.setItem("fold-dos-audio-muted",String(e)),H(),W()}function H(){var e,t,n;o&&(y?(e=o.mute)==null||e.call(o):(t=o.unmute)==null||t.call(o),(n=u==null?void 0:u.setVolume)==null||n.call(u,y?0:1))}function I(){return[`ci=${o?"yes":"no"}`,`simulate=${typeof(o==null?void 0:o.simulateKeyPress)=="function"?"yes":"no"}`,`send=${typeof(o==null?void 0:o.sendKeyEvent)=="function"?"yes":"no"}`].join(" ")}function d(e,t,n,r){const a=[`Debug ${new Date().toLocaleTimeString()}`,`CI:${o?"ready":"not-ready"}`,`source:${e}`,t===void 0?"code:-":`code:${t}`,n===void 0?"state:-":`state:${n}`,r,I()].filter(Boolean).join(" | ");console.log("[fold-dos-key]",a)}function W(){E.textContent=y?"聲音：關":"聲音：開",E.classList.toggle("muted",y)}function he(){V.innerHTML=""}function R(e){x.disabled=e||!F||!c}function i(e){re.textContent=e}async function ge(){try{if(document.fullscreenElement){await document.exitFullscreen();return}await _.requestFullscreen({navigationUI:"hide"})}catch(e){console.error(e),i("瀏覽器拒絕全螢幕。請用手指點按全螢幕按鈕再試一次。")}finally{z()}}function z(){const e=!!document.fullscreenElement;L.textContent=e?"離開全螢幕":"全螢幕",L.classList.toggle("fullscreen-on",e)}function B(e){S.hidden=!e,N()}function N(){const e=!S.hidden;te.classList.toggle("is-collapsed",!e),j.textContent=e?"隱藏選單":"選單"}async function we(){if(!o){i("遊戲尚未啟動，還不能匯出存檔。");return}if(typeof o.fsReadFile!="function"){i("目前 js-dos 核心不支援直接讀取存檔。");return}i("正在讀取 FD2.SAV...");try{const e=await ve("FD2.SAV"),t=await o.fsReadFile(e);Fe(t,"FD2.SAV","application/octet-stream"),i(`已匯出 ${e}。`)}catch(e){console.error(e),i("找不到 FD2.SAV。請先在遊戲裡存檔，再按匯出。")}}async function ve(e){const t=[e,`/${e}`,`C:\\${e}`];for(const s of t)try{return await o.fsReadFile(s),s}catch{}if(typeof o.fsTree!="function")return e;const n=await o.fsTree(),r=Y(n,e.toLowerCase());if(!r)throw new Error(`${e} not found`);return r}function Y(e,t,n=""){if(!e)return"";const r=e.name??"",s=r?`${n}${n?"/":""}${r}`:n;if(!e.nodes&&r.toLowerCase()===t)return s;for(const a of e.nodes??[]){const f=Y(a,t,s);if(f)return f}return""}function Fe(e,t,n){const r=new Blob([e],{type:n}),s=URL.createObjectURL(r),a=document.createElement("a");a.href=s,a.download=t,document.body.append(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),1e3)}function K(e){const t=e.split("\\").pop().toLowerCase();return t==="start.bat"||t==="run.bat"?0:t==="setup.exe"||t==="install.exe"?10:t.endsWith(".bat")?2:4}function Ee(e){var t;return!!((t=e==null?void 0:e.name)!=null&&t.toLowerCase().endsWith(".jsdos"))}async function Le(e){return{path:J(e).replaceAll("\\","/"),contents:new Uint8Array(await e.arrayBuffer())}}function J(e){const n=(e.webkitRelativePath||e.name).split("/").filter(Boolean);return(n.length>1?n.slice(1):n).join("\\")}function Se(e){var n;const t=(n=e[0])==null?void 0:n.webkitRelativePath;return t&&t.split("/").filter(Boolean)[0]||"資料夾"}function xe(e,t=[]){const r=e.replaceAll("/","\\").split("\\"),s=r.pop(),a=r.join("\\"),f=a?`cd ${a}`:"",X=De(e,t);return Ae({fd2:X,autoexec:`
mount c .
c:
${f}
${s}
`})}function Ae({autoexec:e,fd2:t=!1}){return`
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
`}function De(e,t){const n=e.replaceAll("/","\\").toLowerCase(),r=new Set(t.map(s=>s.replaceAll("/","\\").toLowerCase()));return n.endsWith("fd2.exe")&&(r.has("fd2.exe")||r.has("dos4gw.exe")||r.has("dig.ini")||r.has("mdi.ini"))}function M(e,t,n){return Math.min(Math.max(e,t),n)}
