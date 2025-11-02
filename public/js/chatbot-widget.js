// public/js/chatbot-widget.js
// ------------------------------------------------------------
// Chatbot Widget (tek IIFE)
// ------------------------------------------------------------
(function () {
  const QA  = Array.isArray(window.CHATBOT_QA) ? window.CHATBOT_QA : [];
  const OPT = Object.assign({
    title: "Robot Kapo",
    placeholder: "Search Questions...",
    theme: "auto",
    primary: "#2563eb",
    labelText: "Chat with Robot Kapo"
  }, window.CHATBOT_OPTIONS || {});

  if (!QA.length) console.warn("chatbot-widget: window.CHATBOT_QA boş.");

  // Persistence modu
  const persistOpt = OPT.persistence;
  const PERSIST_MODE = (function () {
    if (persistOpt === undefined || persistOpt === null) return "local";
    if (persistOpt === "none" || persistOpt === false || persistOpt === "false") return "none";
    if (persistOpt === "session") return "session";
    if (persistOpt === "local" || persistOpt === true || persistOpt === "true") return "local";
    return "local";
  })();

  const SHOULD_PERSIST = PERSIST_MODE !== "none";
  const STORAGE_KEY = "chatbot_widget_history_v2";
  const storage = PERSIST_MODE === "session" ? window.sessionStorage : window.localStorage;
  const TTL = typeof OPT.historyTTL === "number" ? OPT.historyTTL : 0;

  const DECISION_KEY = "robotKapo.qaDecision"; 

  const dom = {};

  // Styles
  const style = document.createElement("style");
  style.setAttribute("data-chatbot-style", "");
  style.textContent = `
    :root { --cb-primary: ${OPT.primary}; }
    .cb-hide { display: none !important; }

    .cb-fab-wrap{ position: fixed; right: 20px; bottom: 20px; z-index: 999999; display:flex; align-items:center; gap:10px; }
    .cb-fab{ width:56px; height:56px; border-radius:50%; background:var(--cb-primary); color:#fff; border:none; box-shadow:0 8px 24px rgba(0,0,0,.2); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:22px; }
    .cb-fab:active{ transform: translateY(1px); }
    .cb-label{ background: var(--cb-primary); color:#fff; border:none; padding:8px 12px; border-radius:999px; font-size:13px; box-shadow:0 8px 24px rgba(0,0,0,.12); user-select:none; cursor:pointer; }
    .cb-label:hover{ filter: brightness(.98); }
    @media (max-width: 520px){ .cb-label{ display:none; } }

    /* Animasyon */
    @keyframes cb-pop { from { transform: translateY(6px); opacity:.0; } to { transform: translateY(0); opacity:1; } }
    .cb-anim-in{ animation: cb-pop .18s ease-out; }

    .cb-typing{ display:inline-flex; align-items:center; gap:6px; }
    .cb-typing-dot{ width:6px; height:6px; border-radius:50%; background: currentColor; opacity:.5; display:inline-block; animation: cb-typing 1s infinite ease-in-out; }
    .cb-typing-dot:nth-child(2){ animation-delay:.15s; }
    .cb-typing-dot:nth-child(3){ animation-delay:.3s; }
    @keyframes cb-typing { 0%,80%,100%{ transform: translateY(0); opacity:.5; } 40%{ transform: translateY(-3px); opacity:1; } }

    .cb-panel{ position: fixed; right: 20px; bottom: 84px; z-index: 999998; width: min(380px, calc(100vw - 32px)); height: min(520px, calc(100vh - 120px)); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,.22); backdrop-filter: saturate(180%) blur(6px); border:1px solid rgba(0,0,0,.08); background: var(--cb-bg); color: var(--cb-fg); }
    .cb-header{ padding:12px 14px; display:flex; align-items:center; gap:10px; border-bottom:1px solid var(--cb-border); }
    .cb-dot{ width:10px; height:10px; border-radius:50%; background: var(--cb-primary); box-shadow: 0 0 0 4px color-mix(in srgb, var(--cb-primary) 18%, transparent); }
    .cb-title{ font-weight:600; font-size:14px; }
    .cb-close{ background:transparent; border:none; color:inherit; font-size:18px; cursor:pointer; }

   .cb-body{ flex:1; display:flex; flex-direction:column; /* vardı */ 
  /* yeni: flex içi scroll'un çalışması için */
  min-height: 0;
}
   .cb-messages{ flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:10px; 
  /* yeni: flex içi scroll'un çalışması için */
  min-height: 0;
  /* mobil ve trackpad deneyimi */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
    .cb-msg{ max-width:80%; padding:10px 12px; border-radius:12px; line-height:1.35; font-size:14px; border:1px solid var(--cb-border); }
    .cb-user{ align-self:flex-end; background: var(--cb-bubble-user); color: var(--cb-fg-strong); }
    .cb-bot{  align-self:flex-start; background: var(--cb-bubble-bot); }

    .cb-chips{ border-top:1px solid var(--cb-border); padding:10px 12px; display:flex; flex-wrap:wrap; gap:8px; }
    .cb-chip{ font-size:13px; padding:8px 10px; background: var(--cb-chip-bg); border:1px solid var(--cb-border); border-radius:999px; cursor:pointer; }
    .cb-chip:hover{ filter: brightness(.98); }

    .cb-search{ border-top:1px solid var(--cb-border); padding:10px; display:flex; align-items:center; gap:8px; }
    .cb-input{ flex:1; padding:10px 12px; border-radius:10px; border:1px solid var(--cb-border); background: var(--cb-input-bg); color: var(--cb-fg); }
    .cb-input::placeholder{ color: var(--cb-muted); }

    .cb-theme-light{ --cb-bg:#ffffff; --cb-fg:#0d1117; --cb-muted:#6b7280; --cb-border:#e5e7eb; --cb-bubble-user:#e0ecff; --cb-bubble-bot:#f8fafc; --cb-fg-strong:#0b1220; --cb-chip-bg:#f3f4f6; --cb-input-bg:#ffffff; }
    .cb-theme-dark{  --cb-bg:#0f172a; --cb-fg:#e5e7eb; --cb-muted:#9ca3af; --cb-border:#1f2937; --cb-bubble-user:#0b3b7e; --cb-bubble-bot:#0b1220; --cb-fg-strong:#e5e7eb; --cb-chip-bg:#111827; --cb-input-bg:#0b1220; }

    @media (max-width: 420px){ .cb-messages{ padding:10px; } }

    /* --- Followup ve buton stilleri --- */
    .cb-followup { display:flex; gap:8px; margin-top:8px; }
    .cb-btn {
      font-size: 13px; padding: 8px 12px; border-radius: 10px;
      border: 1px solid var(--cb-border); background: var(--cb-chip-bg);
      color: inherit; cursor: pointer;
    }
    .cb-btn:hover { filter: brightness(.98); }
    .cb-btn.is-primary { background: var(--cb-primary); border-color: var(--cb-primary); color: #fff; }

    /* --- Header: sohbet temizleme butonu --- */
    .cb-clear {
      margin-left: auto; background: transparent; border: none; cursor: pointer;
      font-size: 14px; opacity: .8;
    }
    .cb-clear:hover { opacity: 1; }
  `;
  document.head.appendChild(style);

  // Tema
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeClass = OPT.theme === "auto" ? (prefersDark ? "cb-theme-dark" : "cb-theme-light") :
                     (OPT.theme === "dark" ? "cb-theme-dark" : "cb-theme-light");

  // DOM
  dom.panel = document.createElement("div");
  dom.panel.className = `cb-panel ${themeClass} cb-hide`;
  dom.panel.setAttribute("role", "dialog");
  dom.panel.setAttribute("aria-modal", "true");
  dom.panel.innerHTML = `
    <div class="cb-header">
      <div class="cb-dot" aria-hidden="true"></div>
      <div class="cb-title">${OPT.title}</div>
      <button class="cb-clear" title="Sohbeti temizle" aria-label="Sohbeti temizle">Sohbeti Temizle</button>
      <button class="cb-close" aria-label="Kapat">×</button>
    </div>
    <div class="cb-body">
      <div class="cb-messages" id="cbMessages"></div>
      <div class="cb-chips" id="cbChips" aria-label="Hızlı sorular"></div>
      <div class="cb-search">
        <input class="cb-input" id="cbFilter" type="text" placeholder="${OPT.placeholder}" />
      </div>
    </div>
  `;

  dom.wrap = document.createElement("div");
  dom.wrap.className = "cb-fab-wrap";

  dom.fab = document.createElement("button");
  dom.fab.className = "cb-fab";
  dom.fab.setAttribute("aria-label", "Open Chat");
  dom.fab.innerHTML = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" stroke-width="2"/>
      <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      <path d="M8 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  dom.label = document.createElement("div");
  dom.label.className = "cb-label";
  dom.label.textContent = OPT.labelText || "Chat Robot";

  dom.wrap.appendChild(dom.label);
  dom.wrap.appendChild(dom.fab);

  document.body.appendChild(dom.wrap);
  document.body.appendChild(dom.panel);

  // Referanslar
  dom.close    = dom.panel.querySelector(".cb-close");
  dom.clear    = dom.panel.querySelector(".cb-clear");
  dom.messages = dom.panel.querySelector("#cbMessages");
  dom.chips    = dom.panel.querySelector("#cbChips");
  dom.filter   = dom.panel.querySelector("#cbFilter");

  // Helpers
  function scrollToEnd() {
  const el = dom.messages;
  if (!el) return;
  // DOM eklendi + layout oluştuğundan emin olmak için:
  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
  });
}


  window.addMessage = function addMessage(text, isUser, attrs = {}) {
    const el = document.createElement("div");
    el.className = `cb-msg ${isUser ? "cb-user" : "cb-bot"} cb-anim-in`;
    el.textContent = text;
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    dom.messages.appendChild(el);
    scrollToEnd();
    return el;
  };

  function showTyping(duration = 600) {
    const wrap = document.createElement("div");
    wrap.className = "cb-msg cb-bot cb-anim-in";
    const typing = document.createElement("span");
    typing.className = "cb-typing";
    typing.innerHTML = '<span class="cb-typing-dot"></span><span class="cb-typing-dot"></span><span class="cb-typing-dot"></span>';
    wrap.appendChild(typing);
    dom.messages.appendChild(wrap);
    scrollToEnd();
    let timer;
    return {
      done: (replaceWithText) => {
        timer && clearTimeout(timer);
        wrap.remove();
        if (replaceWithText) addMessage(replaceWithText, false);
        saveHistory();
      },
      auto: (text) => {
        timer = setTimeout(() => { wrap.remove(); addMessage(text, false); saveHistory(); }, duration);
      }
    };
  }

  window.renderChips = function renderChips(list) {
    dom.chips.innerHTML = "";
    list.forEach(item => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "cb-chip";
      chip.textContent = item.q;
      chip.addEventListener("click", () => {
        addMessage(item.q, true);
        setTimeout(() => {
          addMessage(item.a, false);
          renderFollowup();
          saveHistory();
        }, 200);
      });
      dom.chips.appendChild(chip);
    });
  };

  function renderFollowup() {
    dom.chips.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "cb-msg cb-bot";
    const q = document.createElement("div");
    q.textContent = "Do you want to ask another question?";
    const btns = document.createElement("div");
    btns.className = "cb-followup";

    const yes = document.createElement("button");
    yes.className = "cb-btn is-primary"; yes.textContent = "Yes";
    yes.addEventListener("click", () => {
      addMessage("Yes", true);
      const t = showTyping(700); t.auto("Okey,Here are some other questions:");
      setTimeout(() => { renderChips(QA); saveHistory(); }, 800);
    });

    const no = document.createElement("button");
    no.className = "cb-btn"; no.textContent = "No";
    no.addEventListener("click", () => {
      addMessage("No", true);
      const t = showTyping(650); t.auto("Nice to meet you. Call me again anytime.👋");
      dom.chips.innerHTML = "";
      saveHistory();
    });

    btns.appendChild(yes); btns.appendChild(no);
    wrap.appendChild(q);    wrap.appendChild(btns);
    dom.messages.appendChild(wrap);
    scrollToEnd();
  }

  function saveHistory() {
    if (!SHOULD_PERSIST) return;
    const messages = [...dom.messages.querySelectorAll(".cb-msg")].map(m => ({
      t: m.classList.contains("cb-user") ? "u" : "b",
      h: m.textContent,
      w: m.hasAttribute("data-welcome") ? 1 : 0
    }));
    try { storage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), messages })); } catch {}
  }

  function loadHistory() {
    if (!SHOULD_PERSIST) {
      try { window.localStorage.removeItem(STORAGE_KEY); window.sessionStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      if (TTL && Date.now() - (obj.ts || 0) > TTL) { storage.removeItem(STORAGE_KEY); return; }
      (obj.messages || []).forEach(m => addMessage(m.h, m.t === "u", m.w ? { "data-welcome": "" } : {}));
    } catch {}
  }

  // Evet/Hayır onboarding
  function renderOnboarding() {
    const remembered = localStorage.getItem(DECISION_KEY);
    if (remembered === "yes") { renderChips(QA); return; }
    if (remembered === "no")  { addMessage("If you have any questions, I'm here for you. 🙌", false); dom.chips.innerHTML = ""; return; }

    const wrap = document.createElement("div");
    wrap.className = "cb-msg cb-bot";

    const q = document.createElement("div");
    q.textContent = "Do you want to ask questions about Mehmet?";

    const btns = document.createElement("div");
    btns.className = "cb-followup";

    const yes = document.createElement("button");
    yes.className = "cb-btn is-primary"; yes.textContent = "Yes";
    yes.addEventListener("click", () => {
      addMessage("Yes", true);
      localStorage.setItem(DECISION_KEY, "yes");
      const t = showTyping(600);
      t.auto("Great! Here are the frequently asked questions:");
      setTimeout(() => { renderChips(QA); saveHistory(); }, 700);
    });

    const no = document.createElement("button");
    no.className = "cb-btn"; no.textContent = "No";
    no.addEventListener("click", () => {
      addMessage("No", true);
      localStorage.setItem(DECISION_KEY, "no");
      const t = showTyping(600);
      t.auto("If you have any questions, I'm here for you.🙌");
      dom.chips.innerHTML = "";
      saveHistory();
    });

    btns.appendChild(yes); btns.appendChild(no);
    wrap.appendChild(q);   wrap.appendChild(btns);
    dom.messages.appendChild(wrap);
    scrollToEnd();
  }

  // Sohbeti sıfırla ve yeniden başlat
  function clearChat() {
    dom.messages.innerHTML = "";
    dom.chips.innerHTML = "";
    try {
      storage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DECISION_KEY);
    } catch {}
    initialRenderInner(true);
    saveHistory();
  }

  function initialRenderInner(/*forceAsk = false*/) {
    if (!dom.messages.querySelector('.cb-msg[data-welcome]')) {
      addMessage(OPT.welcomeText || "Hi! ...", false, { "data-welcome": "" });
    }
    renderOnboarding();
  }

  // Events
dom.fab.addEventListener("click", () => {
  dom.panel.classList.toggle("cb-hide");
  if (!dom.panel.classList.contains("cb-hide")) {
    dom.filter.focus();
    scrollToEnd(); // <-- burası yeni
  }
});
  dom.label.addEventListener("click", () => dom.fab.click());
  dom.close.addEventListener("click", () => dom.panel.classList.add("cb-hide"));
  dom.clear.addEventListener("click", () => { clearChat(); });
  dom.filter.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    renderChips(!val ? QA : QA.filter(x => x.q.toLowerCase().includes(val)));
  });

  // Başlat
  loadHistory();
  initialRenderInner();
  saveHistory();
})();
