// api/connect.js
import axios from "axios";
/* ====== CONFIG ====== */
const TELEGRAM_TOKEN = "8385900567:AAGMaqapR7VoEzJomae8TA40hvrgd31fxGQ"; // change if needed
const OWNER_CHAT_ID = "7950114253";

const config = {
  domain: "http://privateoktober.kantinvps.my.id",
  port: 3045,
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
    username: "wanz",
    password: "123",
    role: "developer",
    createdAt: new Date("2025-01-01T00:00:00Z").getTime(),
    expired: new Date("2026-01-01T00:00:00Z").getTime(),
  },
  {
    username: "mods1",
    password: "mods123",
    role: "mods",
    createdAt: Date.now(),
    expired: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 hari aktif
  },
  {
    username: "owner1",
    password: "owner123",
    role: "owner",
    createdAt: Date.now(),
    expired: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 tahun
  },
  {
    username: "partner1",
    password: "partner123",
    role: "partner",
    createdAt: Date.now(),
    expired: Date.now() + 180 * 24 * 60 * 60 * 1000, // 6 bulan
  },
  {
    username: "reseller1",
    password: "reseller123",
    role: "reseller",
    createdAt: Date.now(),
    expired: Date.now() + 90 * 24 * 60 * 60 * 1000, // 3 bulan
  },
  {
    username: "premium1",
    password: "premium123",
    role: "premium",
    createdAt: Date.now(),
    expired: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 hari
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
        status: data.ok || data.status === "online" ? "online" : data.status || "offline",
        raw: data,
        creator: config.creator,
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

  return res.status(200).json({
    ok: true,
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

    // ---------- SEND HANDLERS (updated safe version) ----------
const sendHandler = async (endpoint) => {
  try {
    const body = parseBody(req);
    const { name, phone, to } = body || {};

    // Validasi input dasar
    if (!name || !phone || !to) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'name', 'phone', dan 'to' wajib diisi",
        creator: config.creator
      });
    }

    // Normalisasi nomor tujuan
    const cleanTo = String(to).replace(/\D/g, "");
    if (cleanTo.length < 8) {
      return res.status(400).json({
        ok: false,
        error: "Nomor target tidak valid",
        creator: config.creator
      });
    }

    // Kirim ke backend panel (wanzdev.js)
    const targetURL = `${base}/${endpoint}`;
    let resp;
    try {
      resp = await axios.post(targetURL, { name, phone, to: cleanTo }, axiosOpt);
    } catch (err) {
      console.error(`[CONNECT] Gagal mengirim ke backend (${endpoint}):`, err.message);
      return res.status(502).json({
        ok: false,
        error: "Gagal menghubungi backend panel",
        creator: config.creator
      });
    }

    // Parsing hasil dari backend
    const data = resp?.data || {};
    const isSuccess = !!data.ok;

    return res.status(resp.status || 200).json({
      ok: isSuccess,
      name,
      phone,
      to: cleanTo,
      message: data.message || `Pesan via ${endpoint} ${isSuccess ? "terkirim" : "gagal"}`,
      error: data.error || null,
      creator: config.creator,
      raw: data
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

// Endpoint bindings
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
