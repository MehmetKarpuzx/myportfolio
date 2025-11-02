(function () {
  const NS = 'kapo-joy';

  const gamepadSVG = `
    <svg viewBox="0 0 24 24" width="35" height="35" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <g class="kp-stick" fill="currentColor">
        <rect x="6" y="10.6" width="4" height="1.6" rx="0.8"/>
        <rect x="7.2" y="9.2"  width="1.6" height="4"   rx="0.8"/>
      </g>
      <circle class="kp-a" cx="15.7" cy="11"   r="1.25" fill="currentColor"/>
      <circle class="kp-b" cx="18.0" cy="13.1" r="1.25" fill="currentColor"/>
    </svg>`;

  // --- STYLES (mevcut stillerin aynısı; gerekirse sende zaten var)
  const style = document.createElement('style');
  style.textContent = `
    .cb-fab-anchor{ position:relative; width:56px; height:56px; display:inline-flex; align-items:center; justify-content:center; }
    .${NS}-btn{
      position:absolute; left:50%; top:-64px; transform:translateX(-50%);
      width:56px; height:56px; border-radius:50%;
      background:var(--cb-primary,#2563eb); color:#fff; border:none;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 8px 18px rgba(0,0,0,.22); cursor:pointer; z-index:3;
      transition:transform .08s ease, filter .15s ease;
    }
    .${NS}-btn:hover{ filter:brightness(1.05); }
    .${NS}-btn:active{ transform:translateX(-50%) scale(.98); }
    .${NS}-pill{
      position:absolute; top:-55px; right:64px; left:auto; transform:none;
      display:inline-flex; align-items:center; gap:8px; white-space:nowrap; cursor:pointer; user-select:none;
      background:var(--cb-primary,#2563eb); color:#fff; border:none; padding:8px 14px; border-radius:999px;
      font:600 13px/1 system-ui,Segoe UI,Roboto,sans-serif; letter-spacing:.2px; box-shadow:0 8px 24px rgba(0,0,0,.12);
    }
    .${NS}-pill:hover{ filter:brightness(.98); }
    .${NS}-pill svg{ width:16px; height:16px; }
    @media (max-width:520px){ .${NS}-pill{ display:none; } }
  `;
  document.head.appendChild(style);

  ready(mount);

  function mount(){
    const wrap = document.querySelector('.cb-fab-wrap');
    const fab  = wrap && wrap.querySelector('.cb-fab');
    if (!wrap || !fab) return watchForFab();

    let anchor = wrap.querySelector('.cb-fab-anchor');
    if (!anchor){
      anchor = document.createElement('div');
      anchor.className = 'cb-fab-anchor';
      wrap.replaceChild(anchor, fab);
      anchor.appendChild(fab);
    }

    // eski öğeleri temizle
    anchor.querySelectorAll(`.${NS}-btn, .${NS}-pill`).forEach(n => n.remove());

    // joystick
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `${NS}-btn`;
    btn.setAttribute('aria-label','Kapo Menüsü');
    btn.title = 'Kapo Menüsü (Shift: oyun, basılı tut: dans)';
    btn.innerHTML = gamepadSVG;

    // pill
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `${NS}-pill`;
    pill.innerHTML = `<span>Game with Robot Kapo</span>`;

    anchor.appendChild(btn);
    anchor.appendChild(pill);

    // etkileşimler (tema kaldırıldı; uzun basınca dans)
    let pressTimer;
    btn.addEventListener('mousedown', () => {
      pressTimer = setTimeout(() => { window.KAPO?.dance?.(); }, 600); // uzun bas: dans
    });
    ['mouseup','mouseleave','blur'].forEach(ev => btn.addEventListener(ev, () => clearTimeout(pressTimer)));

    function handleClick(e){
      if (!window.KAPO){ alert('kapo-eggs.js yüklenmemiş.'); return; }
      if (e.shiftKey && window.KAPO.game) { window.KAPO.game(); return; } // Shift+Click -> direkt oyun
      window.KAPO.menu?.(); // normal tık -> menü
    }
    btn.addEventListener('click', handleClick);
    pill.addEventListener('click', handleClick);

    // >>>>> YENİ: Sohbet aç/kapat ile joystick/pill otomatik gizle-göster
    const panel = document.querySelector('.cb-panel');
    const hideJoy = (hide) => {
      const display = hide ? 'none' : '';
      btn.style.display = display;
      pill.style.display = display;
    };

    const syncWithPanel = () => {
      const isOpen = panel && !panel.classList.contains('cb-hide');
      hideJoy(isOpen);
      if (isOpen) {
        // sohbet açılırken oyun/dans overlay'lerini kapat
        document.querySelectorAll('.kapo-eggs-overlay, .kapo-eggs-game').forEach(n => n.remove());
      }
    };

    // ilk durum
    syncWithPanel();

    // panel class değişimini izle
    if (panel){
      const mo = new MutationObserver(syncWithPanel);
      mo.observe(panel, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function watchForFab(){
    const mo = new MutationObserver(() => {
      const ok = document.querySelector('.cb-fab-wrap .cb-fab');
      if (ok){ mo.disconnect(); mount(); }
    });
    mo.observe(document.documentElement, { childList:true, subtree:true });
  }

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
})();
