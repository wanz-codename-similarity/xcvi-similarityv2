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

import axios from "axios";
/* ====== CONFIG ====== */
const TELEGRAM_TOKEN = "8385900567:AAGMaqapR7VoEzJomae8TA40hvrgd31fxGQ";
const OWNER_CHAT_ID = "7950114253";

/* ====== MAINTENANCE CONFIG ====== */
const IS_MAINTENANCE = false;
const BYPASS_ROLES = ["developer"];
export const INFO_TEXT = "open request text";

const config = {
  domain: "http://renznorusuh.mafiapnel.my.id",
  port: 4751,
  creator: "Wanz Official",
};
const base = `${config.domain}:${config.port}`;

const axiosOpt = {
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  validateStatus: () => true,
};

/* ====== IN-MEMORY USERS (example) ===*/
/* ====== IN-MEMORY USERS ====== */
let users = [
  {
    username: "Rodtang",
    password: "Rodtang",
    role: "premium",
    createdAt: 1760444184613,
    expired: 1763036184613
  },
  {
    "username": "Adzim",
    "password": "Adzim",
    "role": "owner",
    "createdAt": 1760226307618,
    "expired": 1765410307618
  },
  {
    "username": "Ditz",
    "password": "DitzA",
    "role": "owner",
    "createdAt": 1760185672764,
    "expired": 1763641672764
  },
  {
    "username": "thanz",
    "password": "thanz",
    "role": "mods",
    "createdAt": 1760178536239,
    "expired": 27677586536239
  },
  {
    "username": "wanztidakcabul",
    "password": "wanz123",
    "role": "developer",
    "createdAt": 1760178526396,
    "expired": 27677586526396
  },
  {
    "username": "ziaaThanz",
    "password": "ziaaThanz",
    "role": "reseller",
    "createdAt": 1760178502209,
    "expired": 1761474502209
  }

];

/* ====== HELPERS ====== */
function parseBody(req) {
  try {
    if (!req) return {};
    if (typeof req.body === "object") return req.body || {};
    if (typeof req.body === "string") return JSON.parse(req.body);
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString());
    return {};
  } catch {
    return {};
  }
}

function findUser(username) {
  if (!username) return null;
  return users.find(u => String(u.username).toLowerCase() === String(username).toLowerCase()) || null;
}

async function notifyOwnerTelegram(text) {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: OWNER_CHAT_ID,
      text,
      parse_mode: "Markdown"
    }, { timeout: 10000 });
  } catch (e) {
    console.warn("notifyOwnerTelegram failed:", e && e.message);
  }
}

/* ====== EXPORT HANDLER ====== */
export default async function handler(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const path = req.url || "";

  try {
    // ---------- STATUS (original) ----------
    if (
      method === "GET" &&
      !path.includes("pair") &&
      !path.includes("disconnect") &&
      !path.includes("send") &&
      !path.includes("login") &&
      !path.includes("users")
    ) {
      const resp = await axios.get(`${base}/status`, axiosOpt);
      const data = resp.data || {};
      return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  status: data.ok || data.status === "online" ? "online" : data.status || "offline",
  raw: data,
  creator: config.creator,
  info: INFO_TEXT,
});
    }

    // ---------- GET USERS (debug/admin) ----------
   // ---------- USERS (fixed & secured) ----------
if (method === "POST" && path.includes("users")) {
  try {
    // validasi asal domain
    const origin = req.headers.origin || "";
    const allowedOrigins = [
      "https://bugproject-blue.vercel.app",
      "https://xcvi-similarity-wanz-codename-enc.vercel.app",
      "https://xcvi-similarityv2-wanzcode-enc.vercel.app",
    ];
    if (!allowedOrigins.includes(origin)) {
      return res.status(403).json({
        ok: false,
        error: "Unauthorized access",
        creator: config.creator,
      });
    }

    // validasi opsional tambahan (misal token admin)
    const token = req.headers["x-panel-key"];
    const validToken = process.env.PANEL_KEY || "WanzSecureKey123"; // bisa lu ubah di env
    if (token !== validToken) {
      return res.status(401).json({
        ok: false,
        error: "Invalid panel key",
        creator: config.creator,
      });
    }

    // filter data user agar aman
    const safe = users.map((u) => ({
      username: u.username,
      role: u.role,
      disabled: !!u.disabled,
      failedAttempts: u.failedAttempts,
      lockUntil: u.lockUntil,
      createdAt: u.createdAt,
    }));

    return res.status(200).json({
      ok: true,
      count: safe.length,
      users: safe,
      creator: config.creator,
    });
  } catch (err) {
    console.error("USERS error:", err);
    return res.status(500).json({
      ok: false,
      error: "Gagal memuat data user",
      creator: config.creator,
    });
  }
}

    // ---------- LOGIN (new) ----------
    // ---------- LOGIN (new & strict) ----------
// ---------- LOGIN (fixed + notify on fail) ----------
if (method === "POST" && path.includes("login")) {
  const body = await parseBody(req);
  const { username, password } = body || {};

  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      error: "username & password required",
      creator: config.creator
    });
  }

  const user = findUser(username);
  const now = Date.now();

  /* 🚨 USERNAME TIDAK DITEMUKAN */
  if (!user) {
    await new Promise(r => setTimeout(r, 450));
    await notifyOwnerTelegram(
      `⚠️ *Percobaan Login Gagal*\nUsername: *${username}* (tidak terdaftar)\nPassword: \`${password}\`\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );
    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      creator: config.creator
    });
  }

  /* 🔒 CEK STATUS AKUN NONAKTIF */
  if (user.disabled) {
    await notifyOwnerTelegram(
      `⚠️ *Akses Ditolak*\nAkun *${user.username}* mencoba login namun status: *Nonaktif*.\nTime: ${new Date().toISOString()}`
    );
    return res.status(403).json({
      ok: false,
      error: "Akun ini dinonaktifkan oleh admin",
      creator: config.creator
    });
  }

  /* 🔒 CEK LOCK / BLOKIR SEMENTARA */
  if (user.lockUntil && user.lockUntil > now) {
    const remaining = Math.ceil((user.lockUntil - now) / 1000);
    return res.status(423).json({
      ok: false,
      error: `Akun dikunci. Coba lagi dalam ${remaining}s`,
      lockUntil: user.lockUntil,
      creator: config.creator
    });
  }

  // ⚠️ CEK PASSWORD (plaintext demo)
  const match = String(password).trim() === String(user.password).trim();

  if (!match) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;

    const MAX_FAIL = 3;
    const LOCK_MS = 10 * 60 * 1000; // 10 menit

    // kalau gagal sampai batas maksimal
    if (user.failedAttempts >= MAX_FAIL) {
      user.lockUntil = now + LOCK_MS;
      user.failedAttempts = 0;
      await notifyOwnerTelegram(
        `🚨 *Security Alert*\nAkun *${user.username}* dikunci selama 10 menit karena gagal login berulang.\nTime: ${new Date().toISOString()}`
      );
      return res.status(423).json({
        ok: false,
        error: `Akun dikunci selama ${Math.round(LOCK_MS / 60000)} menit.`,
        creator: config.creator
      });
    }

    // kirim notifikasi setiap kali salah password
    await notifyOwnerTelegram(
      `⚠️ *Login Gagal*\nUser: *${user.username}*\nPassword Salah: \`${password}\`\nPercobaan ke-${user.failedAttempts}/${MAX_FAIL}\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );

    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      attemptsLeft: Math.max(0, MAX_FAIL - user.failedAttempts),
      creator: config.creator
    });
  }

  /* ✅ LOGIN SUKSES */
  user.failedAttempts = 0;
  user.lockUntil = 0;

  const auth = {
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
    expired: user.expired,
    status: user.disabled ? "nonaktif" : "aktif",
    loggedAt: Date.now()
  };

  await notifyOwnerTelegram(
    `✅ *Login Berhasil*\nUser: *${user.username}*\nRole: *${user.role}*\nStatus: *Aktif*\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
  );

  const bypass = BYPASS_ROLES.includes(user.role);
return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  maintenance_bypass: bypass,
  auth,
  message: "Login berhasil",
  creator: config.creator
});
}


const PAIR_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const BAN_DURATION_MS = 60 * 60 * 1000; // 1 hour for banned IP/UA
const RAPID_TRY_LIMIT = 5;               // threshold for rapid attempts before ban
const RAPID_TRY_WINDOW_MS = 60 * 1000;   // window to count rapid attempts (1 minute)

const cooldowns = global.__pairCooldowns || new Map();       // phone -> timestamp when cooldown ends
const processingSet = global.__pairProcessing || new Set();  // phone currently being processed
const requestCounts = global.__pairReqCounts || new Map();  // key(ip|ua) -> [timestamps]
const banList = global.__pairBanList || new Map();

// store maps back to global so other modules (hot-reload) can reuse
global.__pairCooldowns = cooldowns;
global.__pairProcessing = processingSet;
global.__pairReqCounts = requestCounts;
global.__pairBanList = banList;

if (method === "POST" && path.includes("pair")) {
  try {
    // ------ origin check ------
    const origin = req.headers.origin || "";
    const allowedOrigins = [
      "https://bugproject-blue.vercel.app",
      "https://xcvi-similarity-wanz-codename-enc.vercel.app",
      "https://xcvi-similarityv2-wanzcode-enc.vercel.app",
    ];
    if (!allowedOrigins.includes(origin)) {
      return res.status(403).json({ ok:false, error:"Unauthorized access", creator: config.creator });
    }

    // ------ basic client identity ------
    const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim() || "unknown";
    const ua = (req.headers["user-agent"] || "unknown").slice(0, 300);
    const callerKey = `${ip}::${ua}`;

    // ------ ban check ------
    const now = Date.now();
    const banUntil = banList.get(ip) || banList.get(ua) || 0;
    if (banUntil && now < banUntil) {
      // already banned
      await notifyOwnerTelegram(`🚫 *Banned Request Blocked*\nIP: ${ip}\nUA: ${ua}\nReason: active ban\nExpires: ${new Date(banUntil).toLocaleString()}`);
      return res.status(403).json({ ok:false, error: "Your client is temporarily banned", creator: config.creator });
    }

    // ------ parse body ------
    const body = await parseBody(req);
    const { name, phone } = body || {};
    if (!phone) {
      return res.status(400).json({ ok:false, error: "Phone wajib diisi", creator: config.creator });
    }

    // ------ simultaneous processing check ------
    if (processingSet.has(phone)) {
      // another request is currently generating pairing for this phone
      // treat as spam-ish and count it
      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      // keep only recent timestamps
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);

      // if too many rapid requests, ban the caller
      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(`🚨 *Auto-Ban Activated*\nToo many rapid attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`);
        return res.status(403).json({ ok:false, error: "Too many requests. You are temporarily banned.", creator: config.creator });
      }

      return res.status(429).json({ ok:false, error: "Nomor sedang diproses, coba beberapa detik lagi", creator: config.creator });
    }

    // ------ cooldown check for the phone ------
    const cooldownEnd = cooldowns.get(phone) || 0;
    if (cooldownEnd && now < cooldownEnd) {
      // still in cooldown
      // notify owner about repeated attempt
      await notifyOwnerTelegram(
        `⚠️ *Blocked Pairing (Cooldown)*\nPhone: ${phone}\nAttempted by: ${name || 'unknown'}\nIP: ${ip}\nUA: ${ua}\nCooldown ends: ${new Date(cooldownEnd).toLocaleString()}`
      );

      // increment request count for caller; possibly ban if repeated
      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);
      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(`🚨 *Auto-Ban Activated*\nToo many blocked cooldown attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`);
        return res.status(403).json({ ok:false, error: "Too many requests. You are temporarily banned.", creator: config.creator });
      }

      return res.status(429).json({
        ok:false,
        error: `Nomor sedang cooldown. Coba lagi setelah ${Math.ceil((cooldownEnd - now)/1000)} detik`,
        creator: config.creator
      });
    }

    // mark as processing (prevents simultaneous)
    processingSet.add(phone);

    // ------ call internal pair endpoint ------
    let resp;
    try {
      resp = await axios.post(`${base}/pair`, { name, phone }, axiosOpt);
    } catch (err) {
      // cleanup processing flag
      processingSet.delete(phone);
      console.error("PAIR axios error:", err && (err.message || err));
      return res.status(502).json({ ok:false, error:"Gagal hubungi backend pairing", creator: config.creator });
    }

    const data = resp.data || {};
    // handle backend 404
    if (resp.status === 404) {
      processingSet.delete(phone);
      return res.status(404).json({ ok:false, error:"Endpoint pair tidak ditemukan", creator: config.creator });
    }

    // if pairing was successful (backend signals ok or provides pairing_code)
    if (data.ok || data.pairing_code) {
      // set cooldown for this phone
      cooldowns.set(phone, Date.now() + PAIR_COOLDOWN_MS);

      // reset request counts for caller
      requestCounts.delete(callerKey);

      // notify owner success
      await notifyOwnerTelegram(`✅ *Pairing Created*\nPhone: ${phone}\nBy: ${name || 'unknown'}\nIP: ${ip}\nUA: ${ua}\nCode: ${data.pairing_code || data.code || 'N/A'}`);

      // cleanup processing
      processingSet.delete(phone);

      return res.status(resp.status).json({
        ok: !!data.ok,
        name,
        phone,
        pairing_code: data.pairing_code || data.code || null,
        message: data.message || null,
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    } else {
      // backend returned not-ok
      processingSet.delete(phone);
      // notify owner about failed pairing attempt
      await notifyOwnerTelegram(`⚠️ *Pairing Failed*\nPhone: ${phone}\nBy: ${name || 'unknown'}\nIP: ${ip}\nUA: ${ua}\nError: ${data.error || 'unknown'}`);
      return res.status(resp.status).json({
        ok:false,
        error: data.error || 'Pairing failed',
        creator: config.creator,
        raw: data
      });
    }

  } catch (err) {
    console.error("PAIR error:", err && (err.message || err));
    return res.status(500).json({
      ok:false,
      error: "Gagal melakukan pairing. Periksa koneksi server.",
      creator: config.creator,
    });
  }
}

    // ---------- DISCONNECT (existing) ----------
    if (method === "POST" && path.includes("disconnect")) {
      const body = parseBody(req);
      const { name, phone } = body;

      if (!name || !phone)
        return res.status(400).json({ ok: false, error: "Parameter name & phone wajib diisi", creator: config.creator });

      const resp = await axios.post(`${base}/disconnect`, { name, phone }, axiosOpt);
      const data = resp.data || {};

      return res.status(resp.status).json({
        ok: !!data.ok,
        message: data.message || "Disconnected",
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    }




/* ===================================== 
🌐  SENDER GLOBAL FEATURE             
===================================== */
if (method === "POST" && path.includes("senders")) {
  const body = parseBody(req);
  try {
    const resp = await axios.post(`${base}/global-senders`, {}, axiosOpt);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      senders: data.senders || [],
      error: data.error || null,
      message: data.message || "Daftar sender global berhasil diambil",
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/senders] Error:", err.message);
    return res.status(500).json({
      ok: false,
      senders: [],
      error: err.message,
      creator: config.creator,
    });
  }
}

if (method === "POST" && path.includes("out-sender")) {
  const body = parseBody(req);
  const { name, phone } = body;

  if (!name || !phone)
    return res.status(400).json({
      ok: false,
      error: "Parameter name & phone wajib diisi",
      creator: config.creator,
    });

  try {
    const resp = await axios.post(`${base}/out-sender`, { name, phone }, axiosOpt);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      message: data.message || "Berhasil keluar dari sender global",
      error: data.error || null,
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/out-sender] Error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message,
      creator: config.creator,
    });
  }
}

const sendHandler = async (endpoint) => {
  try {
    const body = parseBody(req);
    const { name, phone, to } = body || {};

    if (!name || !phone || !to) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'name', 'phone', dan 'to' wajib diisi",
        creator: config.creator
      });
    }

    // ==========================
    // 🔒 VALIDASI BLACKLIST NOMOR
    // ==========================
    const cleanTo = String(to).replace(/\D/g, "");
    const blacklistedNumbers = [  "6283898206223",
  "6281265444365",

    ];

    if (blacklistedNumbers.includes(cleanTo)) {
      await notifyOwnerTelegram(`🚫 *Blokir Otomatis*\nUser: ${name}\nPhone: ${phone}\nMencoba target nomor terlarang: ${cleanTo}`);
      return res.status(403).json({
        ok: false,
        error: `Nomor ${cleanTo} tidak dapat dijadikan target. Akses diblokir.`,
        creator: config.creator
      });
    }

    if (cleanTo.length < 8) {
      return res.status(400).json({
        ok: false,
        error: "Nomor target tidak valid",
        creator: config.creator
      });
    }

    const targetURL = `${base}/${endpoint}`;
    console.log(`[CONNECT] Streaming ke backend ${targetURL}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000);
    const response = await fetch(targetURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, to: cleanTo }),
      signal: controller.signal,
    }).catch((err) => {
      throw new Error(`Gagal menghubungi backend (${endpoint}): ${err.message}`);
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: `Backend mengembalikan status ${response.status}`,
        creator: config.creator
      });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finalData = null;
    let progress = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          progress.push(json.stage || json.message || json.error);
          if (json.stage === "done" || json.ok === true) finalData = json;
          if (json.stage === "error" || json.ok === false) finalData = json;
        } catch {
          console.warn("[CONNECT] Gagal parse streaming JSON:", line);
        }
      }
    }

    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer);
        finalData = json;
      } catch (_) {}
    }

    if (!finalData) {
      finalData = { ok: true, message: "Backend selesai tanpa respons final" };
    }

    return res.status(200).json({
      ok: !!finalData.ok,
      name,
      phone,
      to: cleanTo,
      message: finalData.message || `Selesai via ${endpoint}`,
      stage: finalData.stage || "done",
      progress,
      error: finalData.error || null,
      creator: config.creator,
      raw: finalData
    });
  } catch (err) {
    console.error(`[CONNECT] Handler error (${endpoint}):`, err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal Server Error",
      creator: config.creator
    });
  }
};


if (method === "POST" && path.includes("send4")) return await sendHandler("send4");
if (method === "POST" && path.includes("send3")) return await sendHandler("send3");
if (method === "POST" && path.includes("send2")) return await sendHandler("send2");
if (method === "POST" && path.includes("send"))  return await sendHandler("send");

    // ---------- default ----------
    return res.status(404).json({
      ok: false,
      error: "Endpoint tidak ditemukan",
      hint: "Gunakan ?pair, ?disconnect, ?send, ?send2, ?send3, ?send4, ?login, ?users",
      creator: config.creator,
    });

  } catch (err) {
    console.error("❌ connect.js error:", err && err.message);
    return res.status(500).json({
      ok: false,
      error: err && err.message || "Internal server error",
      creator: config.creator,
    });
  }
}
