export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  const endpoint = process.env.SHEETS_ENDPOINT;
  if (!endpoint) return res.status(500).json({ ok: false, message: "SHEETS_ENDPOINT is not set" });

  try {
    const parsedBody =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : (req.body ?? {});

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedBody),
    });

    const text = await r.text();
    return res.status(r.ok ? 200 : 500).send(text);
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e) });
  }
}
