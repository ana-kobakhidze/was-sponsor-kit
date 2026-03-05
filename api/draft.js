const DEFAULT_TABLE = "sponsor_drafts";
const DEFAULT_DRAFT_ID = "women-alpine-shared-draft";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
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

function rowToDraft(row) {
  return {
    data: row?.data ?? {},
    submitted: row?.submitted ?? {},
    activeIndex: typeof row?.active_index === "number" ? row.active_index : 0,
    query: typeof row?.query === "string" ? row.query : "",
    updatedAt: row?.updated_at ?? null,
  };
}

async function fetchLatestRow({ supabaseUrl, table, serviceRoleKey, draftId }) {
  const url =
    `${supabaseUrl}/rest/v1/${table}` +
    `?draft_id=eq.${encodeURIComponent(draftId)}` +
    "&select=draft_id,data,submitted,active_index,query,updated_at" +
    "&order=updated_at.desc&limit=1";
  const r = await fetch(url, { method: "GET", headers: buildHeaders(serviceRoleKey) });
  const rows = await r.json().catch(() => []);
  if (!r.ok) {
    return {
      ok: false,
      message: Array.isArray(rows) ? "Failed to read draft." : rows?.message || "Failed to read draft.",
      row: null,
    };
  }
  return { ok: true, row: Array.isArray(rows) ? rows[0] ?? null : null };
}

async function upsertRow({ supabaseUrl, table, serviceRoleKey, payload }) {
  const url = `${supabaseUrl}/rest/v1/${table}?on_conflict=draft_id`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      ...buildHeaders(serviceRoleKey),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });
  const rows = await r.json().catch(() => []);
  if (!r.ok) {
    return {
      ok: false,
      message: Array.isArray(rows) ? "Failed to save draft." : rows?.message || "Failed to save draft.",
      row: null,
    };
  }
  return { ok: true, row: Array.isArray(rows) ? rows[0] ?? null : null };
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_DRAFTS_TABLE || DEFAULT_TABLE;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      ok: false,
      message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
    });
  }

  try {
    if (req.method === "GET") {
      const draftId = trimDraftId(req.query?.draftId);
      const latest = await fetchLatestRow({ supabaseUrl, table, serviceRoleKey, draftId });
      if (!latest.ok) return res.status(500).json({ ok: false, message: latest.message });
      if (!latest.row) return res.status(200).json({ ok: true, found: false });
      return res.status(200).json({ ok: true, found: true, draft: rowToDraft(latest.row) });
    }

    if (req.method === "POST") {
      const body = parseBody(req);
      const draftId = trimDraftId(body?.draftId);
      const payload = {
        draft_id: draftId,
        data: body?.data ?? {},
        submitted: body?.submitted ?? {},
        active_index: Number.isFinite(body?.activeIndex) ? body.activeIndex : 0,
        query: typeof body?.query === "string" ? body.query : "",
        updated_at: body?.updatedAt || new Date().toISOString(),
      };
      const saved = await upsertRow({ supabaseUrl, table, serviceRoleKey, payload });
      if (!saved.ok) return res.status(500).json({ ok: false, message: saved.message });
      return res.status(200).json({ ok: true, saved: true, draft: rowToDraft(saved.row) });
    }

    if (req.method === "PATCH") {
      const body = parseBody(req);
      const draftId = trimDraftId(body?.draftId ?? req.query?.draftId);
      const stepKey = typeof body?.stepKey === "string" ? body.stepKey.trim() : "";
      const stepData = body?.stepData && typeof body.stepData === "object" ? body.stepData : null;
      if (!stepKey || !stepData) {
        return res.status(400).json({ ok: false, message: "stepKey and stepData are required." });
      }

      const latest = await fetchLatestRow({ supabaseUrl, table, serviceRoleKey, draftId });
      if (!latest.ok) return res.status(500).json({ ok: false, message: latest.message });

      const existingData = latest.row?.data && typeof latest.row.data === "object" ? latest.row.data : {};
      const existingStep = existingData?.[stepKey] && typeof existingData[stepKey] === "object" ? existingData[stepKey] : {};
      const mergedData = {
        ...existingData,
        [stepKey]: {
          ...existingStep,
          ...stepData,
        },
      };
      const nextSubmitted = {
        ...((latest.row?.submitted && typeof latest.row.submitted === "object" ? latest.row.submitted : {}) || {}),
        [stepKey]: true,
      };
      const payload = {
        draft_id: draftId,
        data: mergedData,
        submitted: nextSubmitted,
        active_index: Number.isFinite(body?.activeIndex)
          ? body.activeIndex
          : Number.isFinite(latest.row?.active_index)
            ? latest.row.active_index
            : 0,
        query: typeof body?.query === "string" ? body.query : typeof latest.row?.query === "string" ? latest.row.query : "",
        updated_at: body?.updatedAt || new Date().toISOString(),
      };

      const saved = await upsertRow({ supabaseUrl, table, serviceRoleKey, payload });
      if (!saved.ok) return res.status(500).json({ ok: false, message: saved.message });
      return res.status(200).json({ ok: true, saved: true, draft: rowToDraft(saved.row) });
    }

    return res.status(405).json({ ok: false, message: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, message: String(e?.message || e) });
  }
}
