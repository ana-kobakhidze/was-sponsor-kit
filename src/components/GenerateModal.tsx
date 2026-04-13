import * as React from "react";
import type { DataModel } from "@/lib/types";
import { generateProposal } from "@/lib/generate-api";
import type { ProposalData } from "@/lib/proposal-types";

type Props = {
  open: boolean;
  onClose: () => void;
  dataModel: DataModel;
  onProposalReady: (data: ProposalData) => void;
};

function countFilledSections(dm: DataModel): number {
  let count = 0;
  for (const section of Object.values(dm)) {
    const fields = Object.values(section as Record<string, string>);
    if (fields.some((v) => v.trim().length > 0)) count++;
  }
  return count;
}

export default function GenerateModal({ open, onClose, dataModel, onProposalReady }: Props) {
  const [status, setStatus] = React.useState<"idle" | "generating" | "done" | "error">("idle");
  const [result, setResult] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Reset when modal opens
  React.useEffect(() => {
    if (open) {
      setStatus("idle");
      setResult("");
      setErrorMsg("");
      setCopied(false);
    }
  }, [open]);

  const filledSections = React.useMemo(() => countFilledSections(dataModel), [dataModel]);

  const handleGenerate = React.useCallback(async () => {
    setStatus("generating");
    setResult("");
    setErrorMsg("");
    setCopied(false);

    const res = await generateProposal("full_proposal", dataModel);

    if (res.ok) {
      try {
        const parsed = JSON.parse(res.text) as ProposalData;
        onProposalReady(parsed);
        onClose();
      } catch (err) {
        // JSON parse error — show raw text as fallback
        setResult(res.text);
        setErrorMsg("Error parsing proposal JSON. Showing raw output below.");
        setStatus("done");
      }
    } else {
      setErrorMsg(res.message);
      setStatus("error");
    }
  }, [dataModel, onProposalReady, onClose]);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [result]);

  if (!open) return null;

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
          {/* Data completeness warning */}
          {filledSections < 3 && (
            <div className="rounded-sm border border-[#d4a855]/30 bg-[#d4a855]/10 px-4 py-3 text-sm text-[#d4a855]">
              შეავსეთ მინიმუმ 3 სექცია უკეთესი შედეგისთვის. ახლა შევსებულია: {filledSections}/11
            </div>
          )}

          {/* Full proposal timeout warning */}
          <div className="rounded-sm border border-[#7a90a8]/20 bg-[#132840] px-4 py-3 text-xs text-[#7a90a8]">
            სრული წინადადების გენერაცია შეიძლება 30–60 წამი გაგრძელდეს. Vercel-ის უფასო გეგმაზე შეიძლება timeout მოხდეს.
          </div>

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
                  GENERATING… ~30–60 წმ
                </span>
              ) : (
                "GENERATE FULL PROPOSAL"
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

          {/* Parse error fallback (raw JSON) */}
          {status === "done" && result && errorMsg && (
            <div className="space-y-3">
              <div className="rounded-sm border border-[#d06060]/30 bg-[#d06060]/10 px-4 py-3 text-sm text-[#d06060]">
                {errorMsg}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7a90a8]">RAW OUTPUT</div>
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
