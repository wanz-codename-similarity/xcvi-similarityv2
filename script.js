/*
═════════════════════════════
            🔰 WANZ OFFICIAL               
══════════════════════════════
 ⚠️  JANGAN HAPUS CREDIT DEVELOPER
══════════════════════════════
 📱 WhatsApp : wa.me/6283898286223
 📸 Instagram : instagram.com/wan_xzyaa
═════════════════════════════
*/

const MAINTENANCE_BYPASS_ROLES = ["developer"];

const buyPremiumBtn = document.getElementById("buyPremiumBtn");
const premiumPopup = document.getElementById("premiumPopup");
const popupContent = document.querySelector(".popup-content");

buyPremiumBtn.onclick = () => {
  premiumPopup.style.display = "flex";
};

const sendBtnEl = document.getElementById('sendBtn');
const setSendBusy = (v) => {
  if (!sendBtnEl) return;
  sendBtnEl.disabled = !!v;
  sendBtnEl.setAttribute('aria-busy', !!v ? 'true' : 'false');
};

// Klik di luar kotak → tutup popup
premiumPopup.addEventListener("click", (event) => {
  if (!popupContent.contains(event.target)) {
    premiumPopup.style.display = "none";
  }
});

function closePopup() {
  premiumPopup.style.display = "none";
}
/* ====================== */
/* SIDEBAR PUSH FUNCTION (Optimized Smooth Version) */
/* ====================== */
const sidebar = document.getElementById("sidebar");
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn");
const whatsappLogo = document.querySelector(".topbar .brand img[alt='wa']");

let sidebarOpen = false;
let clickLock = false;

function openSidebar() {
  if (sidebarOpen || clickLock) return;
  clickLock = true;
  sidebar.classList.add("active");
  document.body.classList.add("sidebar-open");
  sidebarOpen = true;
  
  sidebar.focus();

  setTimeout(() => (clickLock = false), 300);
}


function closeSidebar() {
  if (!sidebarOpen || clickLock) return;
  clickLock = true;
  sidebar.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  sidebarOpen = false;
  setTimeout(() => (clickLock = false), 300);
}


whatsappLogo.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebarOpen ? closeSidebar() : openSidebar();
});


document.addEventListener("click", (e) => {
  if (
    sidebarOpen &&
    !sidebar.contains(e.target) &&
    !whatsappLogo.contains(e.target)
  ) {
    closeSidebar();
  }
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebarOpen) closeSidebar();
});

logoutSidebarBtn.addEventListener("click", () => {
  clearAuth?.();
  showAppIfAuthed?.();
  showToast?.("Logged out");
  log?.("User logged out");
  closeSidebar();
});

const DB_URL = "https://raw.githubusercontent.com/wanz-code/dbbug/refs/heads/main/wanz.json";

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
function showToast(msg, opts = {}) {
  const duration = typeof opts.duration === 'number' ? opts.duration : 2200;
  if (toast._timeout) clearTimeout(toast._timeout);
  toastText.textContent = msg;
  toast.classList.remove('hide'); toast.classList.add('show');
  toast._timeout = setTimeout(()=>{ toast.classList.add('hide'); setTimeout(()=>{ toast.classList.remove('show','hide'); },400); }, duration);
}

window.toast = showToast;

window.addEventListener('load', () => {
    if (typeof fillUserInfo === 'function') fillUserInfo();
  });
  
  // 🎵 MUSIC CONTROL HANDLER
const audio = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('musicProgress');

if (audio) {
  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
  });

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '&#10073;&#10073;'; // pause icon
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '&#9658;'; // play icon
    }
  });

  prevBtn.addEventListener('click', () => {
    audio.currentTime = 0; // mulai ulang lagu
  });

  nextBtn.addEventListener('click', () => {
    audio.currentTime = audio.duration; // skip ke akhir (auto replay)
  });
}


// ===== FIXED

let selectedEndpoint = "send";
let selectedLabel = "Force Close";

(function initAttackModal() {
  document.addEventListener("DOMContentLoaded", () => {
    const openBtn =
  document.getElementById("mainOptionBtn") ||
  document.getElementById("openAttackModalBtn");
    const modal = document.getElementById("attackModal");
    const modalClose = document.getElementById("attackModalClose");
    const optionsContainer = document.getElementById("attackOptions");
    const confirmBtn = document.getElementById("attackSelectConfirm");
    const cancelBtn = document.getElementById("attackSelectCancel");
    const mainOptionBtn = document.getElementById("mainOptionBtn");

    // pastikan semua elemen tersedia
    if (!openBtn || !modal || !optionsContainer || !mainOptionBtn) return;

    selectedEndpoint = selectedEndpoint || "send";
selectedLabel = selectedLabel || "Force Close";

    // helper
    function showAttackModal() {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      const cur =
        optionsContainer.querySelector(".attack-item.selected") ||
        optionsContainer.querySelector(".attack-item");
      if (cur) {
        setTimeout(() => cur.scrollIntoView({ behavior: "smooth", inline: "center" }), 80);
      }
    }

    function hideAttackModal() {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }

    // open modal
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAttackModal();
    });

    // close handlers
    if (modalClose) modalClose.addEventListener("click", hideAttackModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideAttackModal);
    modal.addEventListener("click", (ev) => {
      if (ev.target === modal) hideAttackModal();
    });

    // pilih item
function clearSelected() {
  optionsContainer
    .querySelectorAll(".attack-item")
    .forEach((it) => it.classList.remove("selected"));
}

function setSelectedItem(el) {
  if (!el) return;
  clearSelected();
  el.classList.add("selected");
  selectedEndpoint = el.dataset.endpoint || "";
  selectedLabel = el.textContent.trim() || "";
  mainOptionBtn.textContent = `Attack: ${selectedLabel}`;
  if (confirmBtn) {
    confirmBtn.style.display = "inline-block";
    confirmBtn.textContent = `Pilih ${selectedLabel}`;
  }

  try {
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.dataset.endpoint = selectedEndpoint;
      sendBtn.dataset.label = selectedLabel;
      sendBtn.setAttribute("title", `Kirim attack (${selectedLabel})`);
      const txt = sendBtn.querySelector(".send-text");
      if (txt) txt.textContent = `Send ${selectedLabel}`;
      sendBtn.disabled = false;
      sendBtn.setAttribute("aria-busy", "false");
    }
  } catch (e) {
    console.warn("Gagal sync sendBtn:", e);
  }
}

// klik item attack
optionsContainer.addEventListener("click", (ev) => {
  const item = ev.target.closest(".attack-item");
  if (!item) return;
  item.scrollIntoView({ behavior: "smooth", inline: "center" });
  setSelectedItem(item);
  setTimeout(() => {
    hideAttackModal();
    if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
  }, 300);
});

// keyboard navigation
optionsContainer.addEventListener("keydown", (e) => {
  const focused = document.activeElement;
  if (!focused || !focused.classList.contains("attack-item")) return;
  if (e.key === "ArrowRight") {
    const nxt = focused.nextElementSibling;
    if (nxt) {
      nxt.focus();
      nxt.scrollIntoView({ inline: "center", behavior: "smooth" });
    }
  } else if (e.key === "ArrowLeft") {
    const prev = focused.previousElementSibling;
    if (prev) {
      prev.focus();
      prev.scrollIntoView({ inline: "center", behavior: "smooth" });
    }
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    setSelectedItem(focused);
    hideAttackModal();
    if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
  }
});

// buat item fokusable
optionsContainer.querySelectorAll(".attack-item").forEach((it) => (it.tabIndex = 0));

// default pilih pertama
const first = optionsContainer.querySelector(".attack-item");
if (first) setSelectedItem(first);

// tombol confirm manual
if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    hideAttackModal();
    if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
  });
}





/* ======== Session storage helpers ======= */
function setSession(obj) {
  localStorage.setItem('wanz_session', JSON.stringify(obj || {}));
}

function getSession() {
  try {

    const globalSender = localStorage.getItem('senderGlobal');
    if (globalSender) {
      const sg = JSON.parse(globalSender);
      if (sg && sg.name && sg.phone) {
        return { ...sg, isGlobal: true };
      }
    }

    return JSON.parse(localStorage.getItem('wanz_session') || '{}');
  } catch (e) {
    console.warn('[getSession] parse error:', e);
    return {};
  }
}

function clearSession() {

  localStorage.removeItem('wanz_session');
  localStorage.removeItem('senderGlobal');
}


function setAuth(a) {
  localStorage.setItem('wanz_auth', JSON.stringify(a || {}));
}

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem('wanz_auth') || '{}');
  } catch (e) {
    console.warn('[getAuth] parse error:', e);
    return {};
  }
}

function clearAuth() {
  localStorage.removeItem('wanz_auth');
}

/* ========== DOM elements ========== */
const loginRoot = document.getElementById('loginRoot');
const loginBtn = document.getElementById('loginBtn');
const tryFetchBtn = document.getElementById('tryFetchBtn');
const loginError = document.getElementById('loginError');
const loginUser = document.getElementById('loginUser');
const loginPass = document.getElementById('loginPass');
const logoutLocalBtn = document.getElementById('logoutLocalBtn');

// app panel elements
const appPanel = document.getElementById('appPanel');
const statusBox = document.getElementById('statusBox');
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.removeEventListener('click', sendBtnAction); // safe
    sendBtn.addEventListener('click', sendBtnAction);
  }
});
const pairSection = document.getElementById('pairSection');
const sendSection = document.getElementById('sendSection');
const logBox = document.getElementById('log');
const modalClose = document.getElementById('modalClose');
const overlay = document.getElementById('overlay');
const loader = document.getElementById('loader');
const modalHint = document.getElementById('modalHint');
const modalCodes = document.getElementById('modalCodes');

/* ========== Authentication flow ========= */


/* ====== TRY LOGIN ====== */
async function tryLogin(username, password) {
  loginError.style.display = 'none';
  try {
    // panggil backend login endpoint
    const res = await fetch('/api/connect?login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json().catch(() => ({}));

    if (!data.ok) {
      return { ok: false, error: data.error || 'Login gagal. Periksa username atau password.' };
    }

    // ambil payload auth dari backend atau fallback lokal
    const auth = data.auth || { username, loggedAt: Date.now() };

    // --- HAPUS PASSWORD AGAR TIDAK TERSIMPAN DI CLIENT ---
    const safeAuth = { ...auth };
    if (safeAuth.password) delete safeAuth.password;

    // --- VALIDASI EXPIRED (frontend) ---
    const maybeExpired = safeAuth.expired ?? safeAuth.expires ?? safeAuth.expire ?? null;
    if (maybeExpired != null) {
      const expNum = (typeof maybeExpired === 'number') ? maybeExpired : Number(maybeExpired);
      if (!Number.isNaN(expNum) && isFinite(expNum)) {
        const now = Date.now();
        if (now > expNum) {
          const d = new Date(expNum);
          const opts = {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
          };
          const formatted = d.toLocaleString('id-ID', opts).replace(',', ' | ') + ' WIB';
          return { ok: false, error: `Akun sudah kedaluwarsa sejak ${formatted}` };
        }
      }
    }

    // semua oke — simpan auth aman & lanjut
    setAuth(safeAuth);
    return { ok: true, auth: safeAuth };

  } catch (e) {
    return { ok: false, error: '⚠️ Gagal terhubung ke server: ' + (e.message || e) };
  }
}

function showLoginError(msg) {
  loginError.style.display = 'block';
  loginError.textContent = msg;
}

// ---------- USER INFO HELPERS ----------

/* ==================================== 
 FORMAT TANGGAL & WAKTU
 =================================== */

// Format waktu lengkap WIB: contoh "Sen, 06 Okt 2025 | 21:30 WIB"
function formatWIB(ts) {
  if (!ts) return '-';
  const t = Number(ts);
  if (!t || Number.isNaN(t)) return '-';
  const d = new Date(t);
  const opts = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };
  return d.toLocaleString('id-ID', opts).replace(',', ' | ') + ' WIB';
}

// Format tanggal singkat: contoh "30 Sep 2025"
function formatDateShort(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/* ==================================== 
  ISI DATA USER DI SIDEBAR 
 ================================== */
function fillUserInfo() {
  const a = getAuth() || {};

  // elemen di sidebar
  const uiUsername = document.getElementById('ui-username');
  const uiRole = document.getElementById('ui-role');
  const uiCreated = document.getElementById('ui-created');
  const uiExpired = document.getElementById('ui-expired');
  const uiPassword = document.getElementById('ui-password');
  const togglePassBtn = document.getElementById('togglePass');

  // isi data user
  uiUsername.textContent = a.username || '-';
  uiRole.textContent = a.role || '-';
  uiCreated.textContent = a.createdAt ? formatDateShort(a.createdAt) : '-';
  uiExpired.textContent = a.expired ? formatDateShort(a.expired) : '-';

  // jangan tampilkan password asli — tunjukkan masked placeholder
  if (uiPassword) {
    uiPassword.value = '••••••';
    uiPassword.setAttribute('readonly', 'readonly');
  }

  if (togglePassBtn) togglePassBtn.style.display = 'none';
}

async function showAppIfAuthed() {
  const a = getAuth();
  const sidebar = document.querySelector('.sidebar') || document.getElementById('sidebar');

  if (a && a.username) {
    // user login → tampilkan panel utama dan sidebar
    loginRoot.style.display = 'none';
    appPanel.style.display = 'block';
    logoutLocalBtn.style.display = 'inline-block';
    if (sidebar) sidebar.style.display = 'block';

    showToast('Welcome bro');
    fillUserInfo(); // isi profil user di sidebar

    checkStatus();
    setInterval(checkStatus, 9000000);
    updateUI();
    return true;
  } else {
    loginRoot.style.display = 'flex';
    appPanel.style.display = 'none';
    logoutLocalBtn.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    return false;
  }
}

/* tombol login (with music autoplay) */
loginBtn.onclick = async () => {
  const u = loginUser.value.trim();
  const p = loginPass.value.trim();

  // validasi input kosong
  if (!u || !p) {
    showLoginError('Isi username & password');
    return;
  }

  showToast('account validation...');

  // proses login ke backend
  const r = await tryLogin(u, p);
  if (r.ok) {
    const bypassFromBackend = !!r.maintenance_bypass;
    const isMaintenance = !!r.maintenance;

    // cek mode maintenance
    if (isMaintenance && !bypassFromBackend) {
      showMaintenance();
    }

    // tampilkan panel utama
    await showAppIfAuthed();
    loginUser.value = '';
    loginPass.value = '';
    log('Login berhasil: ' + r.auth.username);

    try {
      const bgMusic = document.getElementById('bgMusic');
      if (bgMusic) {
        bgMusic.volume = 0.6; // volume sedang
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("🎶 Musik autoplay berhasil dijalankan");
            })
            .catch(err => {
              console.warn("Autoplay diblokir browser:", err);
            });
        }
      }
    } catch (err) {
      console.warn("Music autoplay error:", err);
    }

  } else {
    // login gagal
    showLoginError(r.error || 'Gagal login');
    log('Login gagal: ' + (r.error || 'unknown'));
  }
};



/* logout local (clear auth only) */
logoutLocalBtn.onclick = () => {
  clearAuth();
  showAppIfAuthed();
  showToast('Logged out');
  log('User logged out locally');
};

/* ========== Existing panel logic (pair/send/status) ========= */

/* STATUS CHECK (enhanced with info banner) */
async function checkStatus() {
  try {
    const r = await fetch('/api/connect');
    const d = await r.json().catch(() => ({}));

    // === STATUS ONLINE/OFFLINE UI ===
    const s = (d.status || d.connection || d.message || '').toString().toLowerCase();
    if (s.includes('online') || s === 'true') {
      statusBox.textContent = 'ONLINE';
      statusBox.className = 'statusBox';
    } else if (s.includes('offline') || s === 'false') {
      statusBox.textContent = 'OFFLINE ❌';
      statusBox.className = 'statusBox bad';
    } else {
      statusBox.textContent = 'UNKNOWN ⚠️';
      statusBox.className = 'statusBox warn';
      console.log('Unknown status data:', d);
    }

    // === CEK MAINTENANCE MODE ===
    const isMaintenance = !!d.maintenance;
    if (isMaintenance) {
      const currentAuth = getAuth() || {};
      const role = currentAuth.role || '';
      const bypass = ['developer'].includes(role);

      if (!bypass) {
        showMaintenance();
      } else {
        showToast('🔧 Maintenance aktif — akses diberikan ke developer');
      }
    }

    // === INFO BANNER HANDLER ===
    let banner = document.getElementById('infoBanner');
    // kalau belum ada di HTML, buat otomatis tepat di bawah topbar
    if (!banner) {
      const topbar = document.querySelector('.topbar');
      banner = document.createElement('div');
      banner.id = 'infoBanner';
      banner.innerHTML = `<marquee behavior="scroll" direction="left" scrollamount="2">Memuat info...</marquee>`;
      topbar.insertAdjacentElement('afterend', banner);
    }

    const marquee = banner.querySelector('marquee');
    if (d.info && marquee) {
      marquee.textContent = d.info;

      // refresh teks setiap 50 detik (jaga kalau server update)
      if (!window._infoBannerInterval) {
        window._infoBannerInterval = setInterval(() => {
          marquee.textContent = d.info;
        }, 50000);
      }
    }

  } catch (e) {
    statusBox.textContent = 'OFFLINE ❌';
    statusBox.className = 'statusBox bad';
  }
}

/* SESSION HANDLER */
function updateUI() {
  const session = getSession();
  const pairSection = document.getElementById("pairSection");
  const sendSection = document.getElementById("sendSection");
  const disconnectBtn = document.getElementById("disconnectBtn");

  if (session && session.phone) {
    pairSection.style.display = "none";
    sendSection.style.display = "block";

    if (session.isGlobal) {
      disconnectBtn.textContent = "Out Session";
      disconnectBtn.onclick = outSenderGlobal;
    } else {
      disconnectBtn.textContent = "Disconnect";
      // ✅ pakai handler langsung ke endpoint query
      disconnectBtn.onclick = async () => {
        const s = getSession();
        if (!s.name || !s.phone) {
          clearSession(); updateUI();
          showToast('No session to disconnect locally.');
          log('No session stored locally.');
          return;
        }
        showToast('Disconnecting session...');
        try {
          const res = await fetch('/api/connect?disconnect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: s.name, phone: s.phone })
          });
          const data = await res.json().catch(()=>({ ok:false, error: 'Invalid JSON' }));
          if (res.ok && data.ok) {
            clearSession(); updateUI();
            showToast('Disconnected');
            log(`Disconnected ${s.name}_${s.phone}`);
          } else {
            showToast('Gagal disconnect ❌');
            log('Disconnect failed: '+(data.error||res.statusText));
          }
        } catch (e) {
          showToast('Server tidak merespon ❌');
          log('Disconnect fetch error: '+e.message);
        }
      };
    }

    const info = session.isGlobal
      ? `🌍 Sender Global Aktif: ${session.name} (${session.phone})`
      : `🔗 Tersambung: ${session.name} (${session.phone})`;
    showToast(info);
  } else {
    pairSection.style.display = "block";
    sendSection.style.display = "none";
  }
}

function showOverlay(show){ overlay.classList.toggle('show', !!show); }

function log(msg) {
  const box = document.getElementById("log");
  if (!box) return console.log(msg); // fallback ke console
  const line = document.createElement("div");
  const time = new Date().toLocaleTimeString("id-ID", {hour12:false});
  line.textContent = `[${time}] ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}


/* ========== VERIFIKASI KETAT & COOLDOWN (UPGRADED) ========== */
const TELEGRAM_TOKEN = "8385900567:AAGY2tT9NvpHoDDkiLLdWHO-lXoWcyEjJh4";
const OWNER_CHAT_ID = "7950114253";

/* ---- storage helpers ---- */
function getCooldowns(){ try { return JSON.parse(localStorage.getItem('cooldownList') || '{}'); } catch { return {}; } }
function setCooldowns(obj){ localStorage.setItem('cooldownList', JSON.stringify(obj)); }
function getWarningCount(){ return parseInt(localStorage.getItem('warningCount')||'0'); }
function setWarningCount(n){ localStorage.setItem('warningCount', String(n)); }

/* ---- notify owner ---- */
async function notifyOwner(username, msg){
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: `🚨 *SPAM DETECTED*\nUser: ${username}\n${msg}`,
        parse_mode: 'Markdown'
      })
    });
  } catch (e) { console.warn('Gagal kirim notifikasi Telegram:', e && e.message); }
}

/* ---- bot detection (frontend) ----
   - reject common CLI / libraries / automation UA strings
   - also check navigator.webdriver (selenium, puppeteer)
*/
function isBotClient(){
  try{
    const ua = (navigator.userAgent || '').toLowerCase();
    const botIndicators = [
      'bot','spider','crawl','crawler','wget','curl','python-requests','python','scrapy',
      'postmanruntime','okhttp','java','php','libwww-perl','go-http-client','java-http-client',
      'axios','node-fetch','httpclient','httpclient','curl/',
    ];
    for(const s of botIndicators){
      if(ua.includes(s)) return true;
    }
    // webdriver / headless automation indicators
    if (navigator.webdriver) return true;
    // some headless browsers expose window properties
    if (window.__nightmare || window.callPhantom || window._phantom) return true;
    return false;
  }catch(e){
    return false;
  }
}

/* ---- elegant popup (no alert) ---- */
function showPopup(title, message, opts = {}) {
  // opts: { type: 'warn'|'error'|'info', autoCloseSeconds: number }
  const type = opts.type || 'warn';
  const autoClose = typeof opts.autoCloseSeconds === 'number' ? opts.autoCloseSeconds : 6;

  // remove existing
  const prev = document.querySelector('.wanz-popup-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.className = 'wanz-popup-overlay';

  const box = document.createElement('div');
  box.className = 'wanz-popup';

  const icon = document.createElement('div');
  icon.className = 'wanz-icon';
  icon.textContent = type === 'error' ? '🚫' : (type === 'info' ? 'ℹ️' : '⚠️');

  const body = document.createElement('div');
  body.className = 'wanz-body';

  const h = document.createElement('h4');
  h.textContent = title || (type==='error' ? 'Error' : 'Peringatan');

  const p = document.createElement('p');
  p.textContent = message || '';

  const small = document.createElement('div');
  small.className = 'small-muted';
  small.textContent = opts.footer || '';

  const actions = document.createElement('div');
  actions.className = 'wanz-actions';

  const close = document.createElement('button');
  close.className = 'btn';
  close.textContent = 'Tutup';
  close.onclick = () => overlay.remove();

  const ok = document.createElement('button');
  ok.className = 'btn primary';
  ok.textContent = 'OK';
  ok.onclick = () => overlay.remove();

  actions.appendChild(close);
  actions.appendChild(ok);

  body.appendChild(h);
  body.appendChild(p);
  if (small.textContent) body.appendChild(small);
  body.appendChild(actions);

  box.appendChild(icon);
  box.appendChild(body);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  if (autoClose > 0) {
    setTimeout(() => { if (document.body.contains(overlay)) overlay.remove(); }, autoClose*1000);
  }
}

/* ---- cooldown validation ---- */
async function validateCooldown(name, phone){
  // bot detection first: stronger security
  if (isBotClient()) {
    showPopup('Klien Tidak Diterima', 'Detected automated client (bot). Akses generate pairing diblokir.', {type:'error', autoCloseSeconds:8, footer:'Jika ini keliru, gunakan browser biasa.'});
    // log + notify owner
    setWarningCount(getWarningCount() + 1);
    await notifyOwner(name, `Automated client/UA detected trying to pair: ${phone} (UA: ${navigator.userAgent})`);
    return false;
  }

  const cooldowns = getCooldowns();
  const now = Date.now();

  // if still cooldown
  if (cooldowns[phone] && cooldowns[phone] > now) {
    const remaining = Math.ceil((cooldowns[phone] - now) / 1000);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    const warning = getWarningCount() + 1;
    setWarningCount(warning);

    const msg = `Nomor sedang cooldown.\nTunggu ${mins}m ${secs}s lagi.\n(Percobaan ke-${warning}/5)`;
    showToast(msg);
    showPopup('Cooldown Aktif', msg, { type:'warn', autoCloseSeconds:6, footer:'Jangan spam generate kode. Jika perlu, hubungi admin.' });

    if (warning >= 5) {
      // block & notify owner
      clearAuth();
      clearSession();
      setWarningCount(0);
      showToast('Kamu diblokir sementara karena spam.');
      showPopup('Akses Diblokir', 'Terlalu banyak percobaan.', {type:'error', autoCloseSeconds:6});
      await notifyOwner(name, `User ${name} melebihi batas percobaan spam generate pairing ke nomor ${phone}. UA: ${navigator.userAgent}`);
      // small delay to let user see popup
      setTimeout(() => { location.reload(); }, 2800);
    }
    return false;
  }

  // set new cooldown (5 minutes)
  cooldowns[phone] = now + (5 * 60 * 1000);
  setCooldowns(cooldowns);
  return true;
}


/* CONNECT (PAIRING) */
connectBtn.onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // === VALIDASI NAMA DAN NOMOR ===
  if (!name || !phone) {
    showToast("Isi semua kolom!");
    showPopup('Isi Data', 'Isi nama & nomor terlebih dahulu.', { type: 'warn' });
    return;
  }

  // 🚫 Tidak boleh ada spasi, underscore (_), atau slash (/)
  if (/\s|_|\/|\\/g.test(name)) {
    showToast("Nama tidak boleh mengandung spasi, garis bawah (_), atau slash (/).");
    showPopup(
      'Nama Tidak Valid',
      'Nama tidak boleh mengandung spasi, garis bawah (_), atau tanda slash (/). ' +
      'Gunakan huruf, angka, titik (.) atau strip (-) saja.',
      { type: 'error' }
    );
    return;
  }

  // ✅ Validasi karakter yang diizinkan (A-Z, a-z, 0-9, -, .)
  const validName = /^[a-zA-Z0-9\-.]+$/.test(name);
  if (!validName) {
    showToast("Nama hanya boleh huruf, angka, titik (.) dan strip (-)");
    showPopup(
      'Nama Tidak Valid',
      'Nama hanya boleh menggunakan huruf (A-Z), angka (0-9), titik (.) dan strip (-).',
      { type: 'error' }
    );
    return;
  }

  // VALIDASI (bot + cooldown)
  const ok = await validateCooldown(name, phone);
  if (!ok) return;

  // tampil overlay + loading animasi
  showOverlay(true);
  modalHint.textContent = 'Generate pairing code...';
  modalCodes.innerHTML = '';
  loader.style.display = 'block';

  try {
    const res = await fetch('/api/connect?pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });

    const data = await res.json();
    loader.style.display = 'none';

    // pairing sukses
    if (data.ok && data.pairing_code) {
      modalHint.textContent = 'Masukkan kode di WhatsApp:';
      modalCodes.innerHTML = data.pairing_code
        .split('-')
        .map(p => `<span class="codeSegment">${p}</span>`)
        .join('');

      // simpan session user
      const sessionData = { name, phone, timestamp: Date.now() };
      setSession(sessionData);
      setWarningCount(0);

      showToast('Kode pairing berhasil dibuat ✅');
      updateUI();
      log(`Pairing code untuk ${name} (${phone}): ${data.pairing_code}`);

    } else {
      // gagal generate code
      const errMsg = data.error || 'Server tidak merespon dengan benar';
      modalHint.textContent = 'Gagal: ' + errMsg;
      showToast('Gagal generate code ❌');
      showPopup('Gagal Generate', errMsg, { type: 'error', autoCloseSeconds: 6 });
      log(`Pairing gagal: ${errMsg}`);
    }

  } catch (e) {
    loader.style.display = 'none';
    modalHint.textContent = 'Error: ' + e.message;
    showToast('Error koneksi ❌');
    showPopup('Error Jaringan', 'Gagal terhubung ke server. Coba lagi nanti.', { type: 'error' });
    console.error('Pairing error:', e);
  }
};


/* DISCONNECT */
disconnectBtn.onclick = async () => {
  const s = getSession();
  if (!s.name || !s.phone) {
    clearSession(); updateUI(); showToast('No session to disconnect locally.'); log('No session stored locally.'); return;
  }
  showToast('Disconnecting session...');
  try {
    const res = await fetch('/api/connect?disconnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: s.name, phone: s.phone })
    });
    const data = await res.json().catch(()=>({ ok:false, error: 'Invalid JSON' }));
    if (res.ok && data.ok) {
      clearSession(); updateUI(); showToast('Disconnected'); log(`Disconnected ${s.name}_${s.phone}`);
    } else {
      showToast('Gagal disconnect ❌'); log('Disconnect failed: '+(data.error||res.statusText));
    }
  } catch (e) {
    showToast('Server tidak merespon ❌'); log('Disconnect fetch error: '+e.message);
  }
};


/* ===================== */
/*  SEND BUTTON ACTION  */
/* ===================== */
async function sendBtnAction() {
  const s = typeof getSession === 'function' ? (getSession() || {}) : {};
  const toInput = document.getElementById('targetInput');
  const to = (toInput ? toInput.value : '').trim();
  const btn = document.getElementById('sendBtn') || {
    disabled: false,
    setAttribute: () => {},
    querySelector: () => null,
    dataset: {},
  };

  // ambil label dan endpoint dari data tombol atau variabel global
  const endpoint = (btn?.dataset?.endpoint) || (typeof selectedEndpoint !== 'undefined' && selectedEndpoint) || 'send';
  const label = (btn?.dataset?.label) || (typeof selectedLabel !== 'undefined' && selectedLabel) || endpoint;

  // helper safe functions
  const safeShowToast = (t) => { if (typeof showToast === 'function') try { showToast(t); } catch(e){} };
  const safeShowPopup = (title, msg, opt) => { if (typeof showPopup === 'function') try { showPopup(title, msg, opt); } catch(e){} };
  const safeLog = (m) => { if (typeof log === 'function') try { log(m); } catch(e){} };

  // basic validation
  if (!to) {
    safeShowToast('Isi nomor target dulu bro!');
    safeShowPopup('Nomor Target Kosong', 'Masukkan nomor target (contoh: 628xx) sebelum mengirim.', { type: 'warn' });
    return;
  }
  if (!s.name || !s.phone) {
    safeShowToast('Belum ada session aktif. Pair dulu!');
    safeShowPopup('Session Kosong', 'Generate pairing code dulu untuk membuat session sebelum mengirim.', { type: 'warn' });
    return;
  }

  // normalize digits
  const onlyDigits = String(to).replace(/\D/g, '');
  if (onlyDigits.length < 8) {
    safeShowToast('Nomor target tampak tidak valid!');
    safeShowPopup('Nomor Tidak Valid', 'Periksa kembali nomor target (pastikan diawali 62 dan minimal 8 digit).', { type: 'warn' });
    return;
  }

  // disable tombol sementara (safely)
  try {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    const btnTextEl = btn.querySelector ? btn.querySelector('.send-text') : null;
    if (btnTextEl) btnTextEl.textContent = `Processing ${label}...`;
  } catch (e) {}

  safeShowToast(`Process → ${label}...`);
  safeLog && safeLog(`Sending ${label} to ${onlyDigits} via session ${s.name || 'unknown'}_${s.phone || 'unknown'}`);

  // modal / matrix elements (guarded)
  const sendModal = document.getElementById('sendModal');
  const matrixPre = document.getElementById('matrixPre');
  const sendInfo = document.getElementById('sendInfo');
  const sendSuccess = document.getElementById('sendSuccess');
  const sendTarget = document.getElementById('sendTarget');
  const sendOption = document.getElementById('sendOption');
  const sendMatrix = document.getElementById('sendMatrix');

  let intv = null;
  try {
    if (sendModal && matrixPre) {
      // reset modal state
      matrixPre.textContent = '';
      if (sendInfo) sendInfo.style.display = 'none';
      if (sendSuccess) sendSuccess.style.display = 'none';
      if (sendMatrix) sendMatrix.style.display = 'block';
      sendModal.classList.add('show');
      sendModal.setAttribute('aria-hidden', 'false');

      if (sendTarget) sendTarget.textContent = onlyDigits;
      if (sendOption) sendOption.textContent = label;

      // matrix animation (safe)
      const chars = '01█▒▓░<>[]()#@*+—\\/|';
      const lines = 12;
      const len = 48;
      const buffer = new Array(lines).fill('').map(() => {
        let s0 = '';
        for (let i = 0; i < len; i++) s0 += chars.charAt(Math.floor(Math.random() * chars.length));
        return s0;
      });
      matrixPre.textContent = buffer.join('\n');

      function randomLine() {
        let s0 = '';
        for (let i = 0; i < len; i++) s0 += chars.charAt(Math.floor(Math.random() * chars.length));
        return s0;
      }

      intv = setInterval(() => {
        try {
          buffer.shift();
          buffer.push(randomLine());
          // occasionally inject target string
          if (Math.random() < 0.12) {
            const mid = Math.floor(Math.random() * lines);
            const arr = buffer[mid].split('');
            const text = `> ${onlyDigits}:${label} <`;
            const pos = Math.max(0, Math.floor((arr.length - text.length) / 2));
            for (let i = 0; i < text.length && (pos + i) < arr.length; i++) arr[pos + i] = text[i];
            buffer[mid] = arr.join('');
          }
          matrixPre.textContent = buffer.join('\n');
        } catch (e) {
          // ignore per-interval errors
        }
      }, 80);

      // hide matrix & show info after short delay
      setTimeout(() => {
        try {
          if (intv) { clearInterval(intv); intv = null; }
          if (sendMatrix) sendMatrix.style.display = 'none';
          if (sendInfo) sendInfo.style.display = 'block';
        } catch (e) {}
      }, 2200);
    }
  } catch (e) {
    safeLog('Matrix animation error: ' + (e && e.message));
  }

  // simple sleep
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // fetch with abort and robust parsing (supports JSON or streaming text)
  const controller = new AbortController();
  const fetchTimeout = 20000; // 20s
  const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

  try {
    const body = { name: s.name, phone: s.phone, to: onlyDigits };

    // Use explicit query param that still includes endpoint in URL so connect.js path.includes works
    const url = `/api/connect?action=${encodeURIComponent(endpoint)}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // if non-OK status, try to read body for message
    if (!res.ok) {
      let errText = `Status ${res.status}`;
      try { errText = await res.text(); } catch (e) {}
      safeShowToast(`❌ Gagal kirim (${res.status})`);
      safeLog('Send non-ok response: ' + String(errText).slice(0, 400));
      // show modal error if present
      if (sendModal && sendInfo) {
        sendInfo.innerHTML = `<div style="color:#f55;text-align:center;">${String(errText).slice(0,300)}</div>`;
        setTimeout(() => {
          if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
        }, 1800);
      }
      if (res.status >= 500) safeShowPopup('Server Error', `Backend error (${res.status}). Cek server.`, { type: 'error' });
      throw new Error('Non-OK response: ' + res.status);
    }

    // handle JSON or text stream
    const contentType = (res.headers.get('content-type') || '').toLowerCase();

    // If response is application/json => normal parse
    if (contentType.includes('application/json')) {
      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        const raw = await res.text().catch(()=>'[no body]');
        safeShowToast('Server balas bukan JSON ❌');
        safeLog('Raw response (not json): ' + String(raw).slice(0,400));
        throw new Error('Invalid JSON from server');
      }

      // give animation/time to show modal nicely
      await sleep(1000);

      if (data && data.ok) {
        safeShowToast(`Success → ${label}`);
        safeLog(`Terkirim: ${label} -> ${onlyDigits} (session: ${s.name || ''}_${s.phone || ''})`);
        if (sendModal) {
          try {
            if (sendInfo) sendInfo.style.display = 'none';
            if (sendSuccess) sendSuccess.style.display = 'block';
            setTimeout(() => {
              if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
            }, 1600);
          } catch (e) {}
        }
      } else {
        const errMsg = (data && (data.error || data.message)) || `Unknown error (status ${res.status})`;
        safeShowToast(`❌ Gagal kirim (${errMsg})`);
        safeLog(`Send error: ${errMsg}`);
        if (sendModal && sendInfo) sendInfo.innerHTML = `<div style="color:#f55;text-align:center;">${errMsg}</div>`;
        setTimeout(() => {
          if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
        }, 1800);
        if (res.status >= 500) safeShowPopup('Server Error', `Backend error (${res.status}). Cek server.`, { type: 'error' });
      }

    } else if (res.body && typeof res.body.getReader === 'function') {
      // 非-JSON: try streaming read and parse lines for JSON fragments (connect.js may stream)
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let lastParsed = null;

      // if there's a visible info area, show progress lines
      const pushProgress = (txt) => {
        safeLog('[progress] ' + txt);
        if (sendInfo) {
          try {
            const el = document.createElement('div');
            el.style.fontSize = '13px';
            el.style.padding = '6px 0';
            el.style.color = '#bfe';
            el.textContent = String(txt).slice(0,200);
            sendInfo.appendChild(el);
            // keep scroll bottom
            sendInfo.scrollTop = sendInfo.scrollHeight;
          } catch (e) {}
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        // split lines
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          // try parse JSON line
          try {
            const j = JSON.parse(line);
            lastParsed = j;
            if (j.stage || j.message || j.error) {
              pushProgress(j.stage || j.message || j.error);
            }
          } catch {
            // not a JSON line — push raw
            pushProgress(line);
          }
        }
      }

      // try parse leftover buffer
      if (buffer.trim()) {
        try {
          const j = JSON.parse(buffer);
          lastParsed = j;
        } catch {
          // ignore
        }
      }

      // evaluate final
      const finalData = lastParsed || { ok: true, message: 'Selesai (stream finished)' };
      await sleep(300);

      if (finalData.ok) {
        safeShowToast(`Success → ${label}`);
        safeLog(`Terkirim (stream): ${onlyDigits}`);
        if (sendModal) {
          try {
            if (sendInfo) sendInfo.style.display = 'none';
            if (sendSuccess) sendSuccess.style.display = 'block';
            setTimeout(() => {
              if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
            }, 1200);
          } catch (e) {}
        }
      } else {
        const em = finalData.error || finalData.message || 'Unknown stream error';
        safeShowToast(`❌ Gagal kirim (${em})`);
        safeLog('Final stream error: ' + em);
        if (sendModal && sendInfo) sendInfo.innerHTML = `<div style="color:#f55;text-align:center;">${em}</div>`;
        setTimeout(() => {
          if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
        }, 1600);
      }

    } else {
      // unknown content-type, fallback to text
      const raw = await res.text().catch(()=>'[no body]');
      safeShowToast('Server responded (text). Check logs.');
      safeLog('Raw text response: ' + String(raw).slice(0,400));
      if (sendModal && sendInfo) {
        sendInfo.innerHTML = `<div style="color:#bfe;text-align:center;">${String(raw).slice(0,300)}</div>`;
        setTimeout(() => {
          if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
        }, 1600);
      }
    }

  } catch (err) {
    const msg = err?.name === 'AbortError' ? 'Request timeout' : (err?.message || String(err));
    safeShowToast('❌ Server tidak merespon');
    safeLog('Fetch/send error: ' + msg);
    safeShowPopup('Error Koneksi', 'Gagal terhubung ke server. Cek koneksi atau backend.', { type: 'error' });

    if (sendModal && sendInfo) {
      try {
        sendInfo.innerHTML = `<div style="color:#f55;text-align:center;">${msg}</div>`;
        setTimeout(() => {
          if (sendModal) { sendModal.classList.remove('show'); sendModal.setAttribute('aria-hidden', 'true'); }
        }, 1800);
      } catch (e) {}
    }
  } finally {
    // cleanup interval & modal
    try {
      if (intv) { clearInterval(intv); intv = null; }
      if (sendMatrix) sendMatrix.style.display = 'none';
      if (sendInfo) sendInfo.style.display = 'none';
      if (sendSuccess) sendSuccess.style.display = 'none';
      if (sendModal) {
        sendModal.classList.remove('show');
        sendModal.setAttribute('aria-hidden', 'true');
      }
    } catch (e) {}

    // restore button
    try {
      btn.disabled = false;
      btn.setAttribute('aria-busy', 'false');
      const btnTextEl2 = btn.querySelector ? btn.querySelector('.send-text') : null;
      if (btnTextEl2) btnTextEl2.textContent = 'Send Bug';
    } catch (e) {}
  }
}

/* overlay close (pastikan element ada) */
try { if (modalClose) modalClose.onclick = () => showOverlay(false); } catch(e) {}

/* ======= SENDER GLOBAL FEATURE ======== */
const globalSenderBtn = document.getElementById("globalSenderBtn");
const globalPopup = document.getElementById("globalSenderPopup");
const closeGlobalPopup = document.getElementById("closeGlobalPopup");
const senderList = document.getElementById("senderList");

// buka popup
globalSenderBtn.addEventListener("click", async () => {
  globalPopup.classList.add("show");
  senderList.innerHTML = `<div class="loading">Memuat daftar sender...</div>`;
  try {
    const res = await fetch("/api/connect?senders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await res.json();

    if (!data.ok || !data.senders || !data.senders.length) {
      senderList.innerHTML = `<div class="loading">Belum ada sender global yang aktif.</div>`;
      return;
    }

    senderList.innerHTML = data.senders
      .map(
        (s, i) => `
        <div class="sender-card">
          <strong>${s.name}</strong><br>
          <small>${s.phone}</small><br>
          <small>Status: ${s.connected ? "🟢 Online" : "🔴 Offline"}</small><br>
          <button onclick="useGlobalSender('${s.name}','${s.phone}')">Gunakan</button>
        </div>`
      )
      .join("");
  } catch (e) {
    console.error("Gagal ambil sender:", e);
    senderList.innerHTML = `<div class="loading">Gagal memuat sender global.</div>`;
  }
});

// tutup popup
closeGlobalPopup.addEventListener("click", () => {
  globalPopup.classList.remove("show");
});

// fungsi saat pilih sender
function useGlobalSender(name, phone) {
  localStorage.setItem("senderGlobal", JSON.stringify({ name, phone }));
  globalPopup.classList.remove("show");

  // skip pairing langsung ke send panel
  document.getElementById("pairSection").style.display = "none";
  document.getElementById("sendSection").style.display = "block";

  // ubah tombol disconnect jadi "Out Session"
  const disconnectBtn = document.getElementById("disconnectBtn");
  disconnectBtn.textContent = "Out Session";
  disconnectBtn.onclick = outSenderGlobal;

  showToast(`Menggunakan sender global: ${name} (${phone})`);
}

// lepas session global (hanya user)
async function outSenderGlobal() {
  const s = JSON.parse(localStorage.getItem("senderGlobal") || "{}");
  if (!s.name) return showToast("Tidak ada session global aktif.");

  try {
    await fetch("/api/connect/out-sender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: s.name, phone: s.phone }),
    });
  } catch (e) {
    console.warn("Out sender global error:", e);
  }

  // hapus semua jejak global session
  localStorage.removeItem("senderGlobal");
  localStorage.removeItem("wanz_session");

  // update UI langsung tanpa reload
  document.getElementById("sendSection").style.display = "none";
  document.getElementById("pairSection").style.display = "block";

  showToast("Keluar dari sender global.");
  log("User keluar dari sender global.");
}

function showMaintenance() {
  const el = document.getElementById("maintenancePopup");
  if (el) el.style.display = "flex";
}




  (function(){
    const music = document.getElementById('bgMusic');
    if (!music) return;

    music.volume = 0.5;
    music.loop = true;
    music.autoplay = true;
    music.preload = "auto";

    function tryPlay() {
      const p = music.play();
      if (p !== undefined) {
        p.catch(() => {
          window.addEventListener('click', tryPlay, { once: true });
          window.addEventListener('touchstart', tryPlay, { once: true });
        });
      }
    }
    tryPlay();

    // Kalau tab dibuka lagi setelah di-minimize, coba play ulang
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryPlay();
    });
  })();

  (function () {
    const v = document.getElementById('bgVideo');

    
    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    
    function tryPlay() {
      v.play().catch((err) => {

        function onFirstInteract() {
          v.play().catch(()=>{});
          window.removeEventListener('click', onFirstInteract);
          window.removeEventListener('touchstart', onFirstInteract);
        }
        window.addEventListener('click', onFirstInteract, { once: true });
        window.addEventListener('touchstart', onFirstInteract, { once: true });
      });
    }

    
    tryPlay();

    
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      } else {
      }
    });


    v.addEventListener('ended', () => {
      try {
        v.currentTime = 0;
        v.play().catch(()=>{});
      } catch(e) {}
    });

  })();
  
const bg = document.getElementById('bgVideo');
bg.muted = true;
bg.loop = true;
bg.playsInline = true;

function ensurePlay() {
  const p = bg.play();
  if (p !== undefined) {
    p.catch(() => {
      window.addEventListener('click', ensurePlay, { once: true });
      window.addEventListener('touchstart', ensurePlay, { once: true });
    });
  }
}
ensurePlay();



/* ========== Init on load ========== */
(async function init(){
  // if already authed, show app
  await showAppIfAuthed();
  // if not authed, keep login visible
  updateUI();
})();