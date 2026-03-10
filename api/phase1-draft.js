const DEFAULT_TABLE = "sponsor_drafts";
const DEFAULT_DRAFT_ID = "phase1-shared-draft";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parseBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body || "{}");
    } catch {
      return {};
    }
  }
  return req.body ?? {};
}

function buildHeaders(serviceRoleKey) {
  return {
    "Content-Type": "application/json",
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };
}

function trimDraftId(raw) {
  const id = String(raw ?? "").trim();
  return id || DEFAULT_DRAFT_ID;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_DRAFTS_TABLE || DEFAULT_TABLE;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ ok: false, message: "Missing Supabase env vars." });
  }

  try {
    if (req.method === "GET") {
      const draftId = trimDraftId(req.query?.draftId);
      const url =
        `${supabaseUrl}/rest/v1/${table}` +
        `?draft_id=eq.${encodeURIComponent(draftId)}` +
        "&select=data,updated_at" +
        "&order=updated_at.desc&limit=1";
      const r = await fetch(url, { method: "GET", headers: buildHeaders(serviceRoleKey) });
      const rows = await r.json().catch(() => []);
      if (!r.ok) return res.status(500).json({ ok: false, message: "Failed to read draft." });
      const row = Array.isArray(rows) ? rows[0] ?? null : null;
      if (!row) return res.status(200).json({ ok: true, found: false });
      return res.status(200).json({ ok: true, found: true, data: row.data ?? {} });
    }

    if (req.method === "POST") {
      const body = parseBody(req);
      const draftId = trimDraftId(body?.draftId);
      if (!body?.data || typeof body.data !== "object") {
        return res.status(400).json({ ok: false, message: "data is required." });
      }
      const payload = {
        draft_id: draftId,
        data: body.data,
        submitted: {},
        active_index: 0,
        query: "",
        updated_at: new Date().toISOString(),
      };
      const upsertUrl = `${supabaseUrl}/rest/v1/${table}?on_conflict=draft_id`;
      const r = await fetch(upsertUrl, {
        method: "POST",
        headers: {
          ...buildHeaders(serviceRoleKey),
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify(payload),
      });
      const rows = await r.json().catch(() => []);
      if (!r.ok) {
        return res.status(500).json({
          ok: false,
          message: Array.isArray(rows) ? "Failed to save." : rows?.message || "Failed to save.",
        });
      }
      return res.status(200).json({ ok: true, saved: true });
    }

    return res.status(405).json({ ok: false, message: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e?.message || e) });
  }
}
