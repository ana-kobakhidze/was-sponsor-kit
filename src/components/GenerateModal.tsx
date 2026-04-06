import * as React from "react";
import type { DataModel } from "@/lib/types";
import type { Variant, VariantParams } from "@/lib/generate-api";
import { generateProposal } from "@/lib/generate-api";

type Props = {
  open: boolean;
  onClose: () => void;
  dataModel: DataModel;
  defaultVariant: Variant;
};

const VARIANT_META: Record<Variant, { label: string; labelEn: string; estimate: string }> = {
  one_page_pitch: { label: "1-გვერდიანი პიჩი", labelEn: "One-Page Pitch", estimate: "~10 წმ" },
  full_proposal: { label: "სრული წინადადება", labelEn: "Full Proposal", estimate: "~30–60 წმ" },
  outreach_email: { label: "გასვლის ელფოსტა", labelEn: "Outreach Email", estimate: "~10 წმ" },
  tier_card: { label: "სპონსორობის პაკეტი", labelEn: "Tier Card", estimate: "~8 წმ" },
};

const VARIANTS: Variant[] = ["one_page_pitch", "full_proposal", "outreach_email", "tier_card"];

function countFilledSections(dm: DataModel): number {
  let count = 0;
  for (const section of Object.values(dm)) {
    const fields = Object.values(section as Record<string, string>);
    if (fields.some((v) => v.trim().length > 0)) count++;
  }
  return count;
}

export default function GenerateModal({ open, onClose, dataModel, defaultVariant }: Props) {
  const [variant, setVariant] = React.useState<Variant>(defaultVariant);
  const [status, setStatus] = React.useState<"idle" | "generating" | "done" | "error">("idle");
  const [result, setResult] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Outreach email params
  const [companyName, setCompanyName] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [tier, setTier] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [whyGoodFit, setWhyGoodFit] = React.useState("");

  // Reset when modal opens with a different default
  React.useEffect(() => {
    if (open) {
      setVariant(defaultVariant);
      setStatus("idle");
      setResult("");
      setErrorMsg("");
      setCopied(false);
    }
  }, [open, defaultVariant]);

  const filledSections = React.useMemo(() => countFilledSections(dataModel), [dataModel]);

  const handleGenerate = React.useCallback(async () => {
    setStatus("generating");
    setResult("");
    setErrorMsg("");
    setCopied(false);

    const params: VariantParams | undefined =
      variant === "outreach_email"
        ? { companyName, industry, tier, contactName, whyGoodFit }
        : variant === "tier_card"
          ? { tier }
          : undefined;

    const res = await generateProposal(variant, dataModel, params);

    if (res.ok) {
      setResult(res.text);
      setStatus("done");
    } else {
      setErrorMsg(res.message);
      setStatus("error");
    }
  }, [variant, dataModel, companyName, industry, tier, contactName, whyGoodFit]);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [result]);

  if (!open) return null;

  const needsOutreachInputs = variant === "outreach_email";
  const needsTierInput = variant === "tier_card";

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-sm border border-[#1a3250] bg-[#0e1e30] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a3250] px-6 py-4">
          <div>
            <div className="font-serif text-lg text-[#edf0f5]">AI გენერატორი</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#4a6070]">CLAUDE API · BILINGUAL OUTPUT</div>
          </div>
          <button onClick={onClose} className="text-[#4a6070] transition-colors hover:text-[#edf0f5] text-xl leading-none">&times;</button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Variant selector */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#4a6070]">OUTPUT TYPE</div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => { setVariant(v); setStatus("idle"); setResult(""); }}
                  className={`rounded-sm px-3 py-2.5 text-left transition-colors ${
                    v === variant
                      ? "border border-[#409090] bg-[#132840] text-[#50b8b0]"
                      : "border border-[#1a3250] bg-[#0a1520] text-[#7a90a8] hover:border-[#409090]/40 hover:text-[#b8c8d8]"
                  }`}
                >
                  <div className="text-xs font-medium">{VARIANT_META[v].label}</div>
                  <div className="mt-0.5 font-mono text-[9px] text-[#4a6070]">{VARIANT_META[v].estimate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Data completeness warning */}
          {filledSections < 3 && (
            <div className="rounded-sm border border-[#d4a855]/30 bg-[#d4a855]/10 px-4 py-3 text-sm text-[#d4a855]">
              შეავსეთ მინიმუმ 3 სექცია უკეთესი შედეგისთვის. ახლა შევსებულია: {filledSections}/11
            </div>
          )}

          {/* Full proposal timeout warning */}
          {variant === "full_proposal" && (
            <div className="rounded-sm border border-[#7a90a8]/20 bg-[#132840] px-4 py-3 text-xs text-[#7a90a8]">
              სრული წინადადების გენერაცია შეიძლება 30–60 წამი გაგრძელდეს. Vercel-ის უფასო გეგმაზე შეიძლება timeout მოხდეს — გამოიყენეთ 1-გვერდიანი პიჩი ალტერნატივად.
            </div>
          )}

          {/* Outreach email inputs */}
          {needsOutreachInputs && (
            <div className="space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4a6070]">OUTREACH DETAILS</div>
              <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="კომპანიის სახელი / Company name" className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090]" />
              <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="ინდუსტრია / Industry" className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090]" />
              <input value={tier} onChange={(e) => setTier(e.target.value)} placeholder="სპონსორობის პაკეტი / Tier + amount" className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090]" />
              <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="საკონტაქტო პირი / Contact name (optional)" className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090]" />
              <textarea value={whyGoodFit} onChange={(e) => setWhyGoodFit(e.target.value)} placeholder="რატომ ეს კომპანია? / Why this company specifically?" rows={2} className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090] resize-none" />
            </div>
          )}

          {/* Tier card input */}
          {needsTierInput && !needsOutreachInputs && (
            <div className="space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4a6070]">TIER DETAILS</div>
              <input value={tier} onChange={(e) => setTier(e.target.value)} placeholder="პაკეტის სახელი + თანხა / Tier name + amount" className="w-full rounded-sm border border-[#1a3250] bg-[#0a1520] px-3 py-2 text-sm text-[#edf0f5] placeholder:text-[#4a6070] outline-none focus:border-[#409090]" />
            </div>
          )}

          {/* Generate button */}
          {status !== "done" && (
            <button
              onClick={handleGenerate}
              disabled={status === "generating"}
              className="w-full rounded-sm bg-gradient-to-r from-[#d06060] via-[#1a3250] to-[#409090] px-4 py-3 font-mono text-[11px] tracking-[0.2em] text-white transition-all hover:brightness-110 disabled:opacity-50"
            >
              {status === "generating" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  GENERATING… {VARIANT_META[variant].estimate}
                </span>
              ) : (
                `GENERATE ${VARIANT_META[variant].labelEn.toUpperCase()}`
              )}
            </button>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="space-y-2">
              <div className="rounded-sm border border-[#d06060]/30 bg-[#d06060]/10 px-4 py-3 text-sm text-[#d06060]">
                {errorMsg}
              </div>
              <button
                onClick={handleGenerate}
                className="font-mono text-[10px] tracking-[0.2em] text-[#409090] hover:text-[#50b8b0] transition-colors"
              >
                RETRY
              </button>
            </div>
          )}

          {/* Result */}
          {status === "done" && result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#409090]">RESULT</div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="rounded-sm border border-[#409090]/30 bg-[#409090]/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#50b8b0] transition-colors hover:bg-[#409090]/20"
                  >
                    {copied ? "COPIED ✓" : "COPY"}
                  </button>
                  <button
                    onClick={() => { setStatus("idle"); setResult(""); }}
                    className="rounded-sm border border-[#1a3250] px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#7a90a8] transition-colors hover:text-[#b8c8d8]"
                  >
                    REGENERATE
                  </button>
                </div>
              </div>
              <div className="max-h-[50vh] overflow-y-auto rounded-sm border border-[#1a3250] bg-[#0a1520] p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-[#b8c8d8]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
