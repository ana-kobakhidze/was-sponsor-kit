import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "./_prompts.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parseBody(req) {
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body || "{}"); } catch { return {}; }
  }
  return req.body ?? {};
}

const MAX_TOKENS = {
  full_proposal: 8000,
  one_page_pitch: 1500,
  outreach_email: 1000,
  tier_card: 800,
};

const VALID_VARIANTS = ["full_proposal", "one_page_pitch", "outreach_email", "tier_card"];

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, message: "Missing ANTHROPIC_API_KEY env var." });
  }

  const body = parseBody(req);
  const { variant, dataModel, variantParams } = body;

  if (!variant || !VALID_VARIANTS.includes(variant)) {
    return res.status(400).json({ ok: false, message: `Invalid variant. Must be one of: ${VALID_VARIANTS.join(", ")}` });
  }

  if (!dataModel || typeof dataModel !== "object") {
    return res.status(400).json({ ok: false, message: "dataModel is required." });
  }

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: MAX_TOKENS[variant] || 1500,
      temperature: 0.7,
      system: buildSystemPrompt(),
      messages: [
        { role: "user", content: buildUserPrompt(variant, dataModel, variantParams) },
      ],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n\n");

    return res.status(200).json({ ok: true, text });
  } catch (e) {
    const msg = e?.message || String(e);
    const status = e?.status || 500;
    return res.status(status >= 400 && status < 600 ? status : 500).json({
      ok: false,
      message: msg,
    });
  }
}
