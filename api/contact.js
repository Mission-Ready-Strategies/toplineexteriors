// Vercel serverless function: receives the contact form and sends it via Resend.
// The Resend API key NEVER ships to the browser. It is read from a server-side
// environment variable (RESEND_API_KEY) that you set in the Vercel dashboard.
//
// Required env vars (set in Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY   your NEW (rotated) Resend key
//   CONTACT_TO       inbox that receives leads, e.g. quote@toplineinstall.com
//   MAIL_FROM        verified sender, e.g. "Top Line Exteriors <quote@toplineinstall.com>"
//   ALLOWED_ORIGIN   site origin allowed to call this, e.g. https://toplineinstall.com

export default async function handler(req, res) {
  const allowed = process.env.ALLOWED_ORIGIN || "https://toplineinstall.com";
  res.setHeader("Access-Control-Allow-Origin", allowed);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  let data = req.body;
  if (typeof data === "string") { try { data = JSON.parse(data); } catch { data = {}; } }
  data = data || {};

  // Honeypot: real users never fill this hidden field.
  if (data.company) return res.status(200).json({ ok: true });

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const phone = String(data.phone || "").trim();
  const service = String(data.service || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Please provide your name and a valid email." });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "quote@toplineinstall.com";
  const from = process.env.MAIL_FROM || "Top Line Exteriors <quote@toplineinstall.com>";
  if (!key) return res.status(500).json({ ok: false, error: "Server is not configured yet." });

  const text =
    "New estimate request from toplineinstall.com\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + (phone || "(not provided)") + "\n" +
    "Service: " + (service || "(not specified)") + "\n\n" +
    "Message:\n" + (message || "(none)") + "\n";

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "New estimate request from " + name,
        text,
      }),
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: "Email failed to send." });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "Email failed to send." });
  }
}
