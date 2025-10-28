/* KAPO Easter Eggs (tema yok) — Konami → Menü (Kapo Dansı, Mini Oyun) */
(function () {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const GAME_DURATION = 30;      // saniye
  const SPAWN_EVERY_MS = 500;    // hedef doğurma aralığı
  const NS = 'kapo-eggs';

  // --- Style  ---
  const style = document.createElement('style');
  style.textContent = `
    .${NS}-overlay{position:fixed;inset:0;z-index:2147483645;background:rgba(2,6,23,.55);backdrop-filter:saturate(160%) blur(6px);display:flex;align-items:center;justify-content:center}
    .${NS}-card{background:#0b1220;color:#e5e7eb;border:1px solid #1f2a44;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.45);width:min(480px,92vw);padding:18px 18px 14px}
    .${NS}-card h3{margin:0 0 10px;font:600 16px/1.2 system-ui,Segoe UI,Roboto,sans-serif;letter-spacing:.2px}
    .${NS}-grid{display:grid;grid-template-columns:1fr 1fr; gap:10px}
    .${NS}-btn{cursor:pointer;border:1px solid #263555;background:#0f1a33;color:#e5e7eb;border-radius:12px;padding:12px 10px;font:500 14px/1 system-ui,Segoe UI,Roboto,sans-serif;display:flex;align-items:center;justify-content:center;gap:8px}
    .${NS}-btn:hover{filter:brightness(1.08)}
    .${NS}-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .${NS}-sm{opacity:.75;font-size:12px}
    .${NS}-close{background:transparent;border:none;color:#9ca3af;font-size:22px;cursor:pointer}
    .${NS}-hint{margin-top:10px;color:#94a3b8;font-size:12px}
    .${NS}-dancer{position:fixed;width:56px;height:56px;border-radius:50%;z-index:2147483646;pointer-events:none;box-shadow:0 10px 24px rgba(0,0,0,.35)}
    @keyframes ${NS}-orbit {
      0%{ transform: translate(0,0) rotate(0deg);}
      25%{ transform: translate(20vw,-10vh) rotate(90deg);}
      50%{ transform: translate(2vw,-35vh) rotate(180deg);}
      75%{ transform: translate(-18vw,-10vh) rotate(270deg);}
      100%{ transform: translate(0,0) rotate(360deg);}
    }
    .${NS}-dancer.${NS}-run { animation:${NS}-orbit 4.5s ease-in-out both; }
    .${NS}-dancer.${NS}-float { animation:${NS}-orbit 6s ease-in-out both; filter:drop-shadow(0 12px 22px rgba(99,102,241,.45)); }
    .${NS}-game{position:fixed;inset:0;z-index:2147483645;background:rgba(2,6,23,.6);backdrop-filter:saturate(160%) blur(6px);display:flex;align-items:center;justify-content:center}
    .${NS}-gamebox{background:#0b1220;color:#e5e7eb;border:1px solid #1f2a44;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.45);width:min(680px,94vw);min-height:420px;display:flex;flex-direction:column}
    .${NS}-hud{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #1f2a44}
    .${NS}-hud b{font:600 14px/1 system-ui,Segoe UI,Roboto,sans-serif}
    .${NS}-board{ position:relative;flex:1;overflow:hidden;border-radius:0 0 16px 16px;
  display:flex;               
  flex-direction:column;      
  align-items:center;        
  justify-content:center;     }
    .${NS}-start{margin:16px;  padding:10px 14px;border-radius:10px; align-self:center; border:1px solid #334155;background:#0f1a33;color:#fff;cursor:pointer}
    .${NS}-target{position:absolute; width:52px; height:52px; display:flex; align-items:center; justify-content:center;
                  border-radius:50%; background:linear-gradient(180deg,#273b7a,#1d2b55); color:#fff; border:1px solid #3b4b8c;
                  box-shadow:0 8px 18px rgba(0,0,0,.35); cursor:pointer; user-select:none}
    .${NS}-target svg{width:24px;height:24px}
    .${NS}-target.${NS}-hit{transform:scale(.85);opacity:.4}
  `;
  document.head.appendChild(style);

  // Konami dinleyici
  let buffer = [], lastAt = 0;
  window.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const now = Date.now();
    if (now - lastAt > 2000) buffer = [];
    lastAt = now;
    buffer.push(e.key);
    if (buffer.length > KONAMI.length) buffer.shift();
    if (KONAMI.every((k,i)=>buffer[i]===k)) { buffer = []; openMenu(); }
  });

  // Menü ( Dans + Oyun)
  function openMenu() {
    if (document.querySelector(`.${NS}-overlay`)) return;
    const ov = el('div', `${NS}-overlay`);
    const card = el('div', `${NS}-card`);
    const top = el('div', `${NS}-row`);
    top.append(
      el('h3', '', '🧩 Kapo Eğlence Alanı'),
      el('button', `${NS}-close`, '×', { title:'Kapat', 'aria-label':'Kapat', onclick:()=>ov.remove() })
    );
    const grid = el('div', `${NS}-grid`);
    grid.append(
      el('button', `${NS}-btn`, '🤖 Kapo Dansı', { onclick:()=>{ ov.remove(); kapoDance(); } }),
      el('button', `${NS}-btn`, '🎮 Kapo Yakala', { onclick:()=>{ ov.remove(); openGame(); } }),
    );
    const hint = el('div', `${NS}-hint`, 'Kapo Yakala oyununda yaptığınız skoru mail olarak atıp süprizler kazanabilirsiniz.');
    card.append(top, grid, hint);
    ov.append(card);
    document.body.appendChild(ov);
    ov.addEventListener('click', (ev)=>{ if(ev.target===ov) ov.remove(); });
    window.addEventListener('keydown', escCloseOnce(ov), { once:true });
  }

  // Kapo Dansı
  function kapoDance() {
    const fab = document.querySelector('.cb-fab');
    let dancer;
    if (fab) {
      const rect = fab.getBoundingClientRect();
      dancer = fab.cloneNode(true);
      Object.assign(dancer.style, { left:`${rect.left}px`, top:`${rect.top}px` });
      dancer.classList.add(`${NS}-dancer`, `${NS}-run`);
    } else {
      dancer = el('div', `${NS}-dancer ${NS}-float`);
      dancer.style.right = '20px'; dancer.style.bottom = '20px';
      dancer.style.background = '#8b5cf6';
      dancer.innerHTML = robotSVG();
    }
    document.body.appendChild(dancer);
    setTimeout(()=>{ dancer.remove(); }, 5200);
  }

  // Mini Oyun
  // --- Mini Oyun ---
function openGame() {
  if (document.querySelector(`.${NS}-game`)) return;
  const ov = el('div', `${NS}-game`);
  const box = el('div', `${NS}-gamebox`);
  const hud = el('div', `${NS}-hud`);
  const scoreEl = el('b', '', 'Skor: 0');
  const timeEl = el('b', '', `Süre: ${GAME_DURATION}`);
  const closeBtn = el('button', `${NS}-close`, '×', { title:'Kapat', 'aria-label':'Kapat', onclick:()=>cleanup() });
  hud.append(scoreEl, timeEl, closeBtn);
  const board = el('div', `${NS}-board`);
  const start = el('button', `${NS}-start`, 'Başla!');
  board.append(start);
  box.append(hud, board);
  ov.append(box);
  document.body.appendChild(ov);
  ov.addEventListener('click', (ev)=>{ if(ev.target===ov) cleanup(); });
  window.addEventListener('keydown', escCloseOnce(ov), { once:true });

  let score = 0, t = GAME_DURATION, spawnTimer = null, clockTimer = null, running = false;

  // PATCH: Oyun başlatmayı tek fonksiyona al
  function beginGame(){
    if (running) return;
    running = true;
    // start varsa kaldır
    const s = board.querySelector(`.${NS}-start`);
    if (s) s.remove();
    tick();
    spawnTimer = setInterval(spawn, SPAWN_EVERY_MS);
    clockTimer = setInterval(() => {
      t--; timeEl.textContent = `Süre: ${t}`;
      if (t <= 0) finish();
    }, 1000);
  }

  // PATCH: Başla butonu artık beginGame'i çağırıyor
  start.onclick = beginGame;

  function spawn() {
    const target = el('button', `${NS}-target`);
    target.innerHTML = robotSVG();
    const bw = board.clientWidth, bh = board.clientHeight;
    const x = Math.max(6, Math.random() * (bw - 58));
    const y = Math.max(6, Math.random() * (bh - 58));
    target.style.left = x + 'px';
    target.style.top  = y + 'px';
    target.onclick = () => {
      target.classList.add(`${NS}-hit`);
      score += 1; scoreEl.textContent = `Skor: ${score}`;
      setTimeout(()=>target.remove(), 80);
    };
    board.appendChild(target);
    setTimeout(()=>target.remove(), 1200 + Math.random()*800);
  }

  function finish() {
  clearInterval(spawnTimer); clearInterval(clockTimer);
  running = false;

  // Hepsini ortalamak için bir sarmalayıcı
  const endwrap = el('div', `${NS}-end`);
  Object.assign(endwrap.style, {
    display:'flex', flexDirection:'column', alignItems:'center', gap:'12px'
  });

  const msg = el('div', '', `Oyun bitti! Skorun: ${score}`);
  Object.assign(msg.style, { fontWeight:'600', textAlign:'center' });

  const again = el('button', `${NS}-start`, 'Tekrar oyna');
  again.onclick = () => {
    // temiz başlangıç
    board.innerHTML = '';
    score = 0; t = GAME_DURATION;
    scoreEl.textContent = 'Skor: 0';
    tick();
    beginGame(); // direkt başlat
  };

  // board içeriğini temizle ve ortalı sarmalayıcıyı ekle
  board.innerHTML = '';
  endwrap.append(msg, again);
  board.append(endwrap);
}


  function cleanup() {
    try { clearInterval(spawnTimer); clearInterval(clockTimer); } catch{}
    ov.remove();
  }

  function tick(){ timeEl.textContent = `Süre: ${t}`; }
}


  // yardımcılar
  function el(tag, cls='', text='', attrs={}) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    Object.entries(attrs).forEach(([k,v]) => { n[k] = v; });
    return n;
  }
  function escCloseOnce(node){
    return function esc(e){ if(e.key==='Escape'){ node.remove(); } };
  }
  function robotSVG(){
    return `
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" stroke-width="2"/>
      <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      <path d="M8 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  // Dışa açılan API (tema kaldırıldı)
  window.KAPO = {
    menu: openMenu,
    dance: kapoDance,
    game: openGame
  };
})();
