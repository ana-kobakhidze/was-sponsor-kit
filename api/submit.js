export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const endpoint = process.env.SHEETS_ENDPOINT;
  if (!endpoint) {
    return res.status(500).send("Missing SHEETS_ENDPOINT env var on Vercel.");
  }

  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await r.text();
    return res.status(r.status).send(text);
  } catch (e) {
    return res.status(500).send(String(e?.message || e));
  }
}
