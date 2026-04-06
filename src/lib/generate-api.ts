import type { DataModel } from "./types";

export type Variant = "full_proposal" | "one_page_pitch" | "outreach_email" | "tier_card";

export type VariantParams = {
  companyName?: string;
  industry?: string;
  tier?: string;
  contactName?: string;
  whyGoodFit?: string;
};

type GenerateResult =
  | { ok: true; text: string }
  | { ok: false; message: string };

export async function generateProposal(
  variant: Variant,
  dataModel: DataModel,
  variantParams?: VariantParams,
): Promise<GenerateResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant, dataModel, variantParams }),
      signal: controller.signal,
    });

    const text = await res.text();
    if (!text) {
      return { ok: false, message: "Empty response from server. Make sure the app is running with `vercel dev` (not `npm run dev`) so the /api routes are available." };
    }

    try {
      return JSON.parse(text);
    } catch {
      return { ok: false, message: `Invalid response from server (${res.status}): ${text.slice(0, 200)}` };
    }
  } catch (e: unknown) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, message: "Request timed out. Try a shorter variant or try again later." };
    }
    return { ok: false, message: String(e) };
  } finally {
    clearTimeout(timeout);
  }
}
