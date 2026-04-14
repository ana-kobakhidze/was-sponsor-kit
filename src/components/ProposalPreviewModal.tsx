import * as React from "react";
import { createPortal } from "react-dom";
import type { ProposalData } from "@/lib/proposal-types";
import { exportProposalToPdf } from "@/lib/export-pdf";
import ProposalRenderer from "./ProposalRenderer";

interface Props {
  proposalData: ProposalData;
  onClose: () => void;
  onRegenerate: () => void;
  apiError?: string;
}

export default function ProposalPreviewModal({ proposalData, onClose, onRegenerate, apiError }: Props) {
  const docRef = React.useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = React.useState(false);

  // Lock body scroll on mount
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleExport = React.useCallback(async () => {
    if (!docRef.current) return;
    setExporting(true);
    try {
      await exportProposalToPdf(docRef.current as HTMLDivElement, proposalData.cover.year, (msg) => {
        console.log("PDF:", msg);
      });
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to export PDF. Check browser console.");
    } finally {
      setExporting(false);
    }
  }, [proposalData.cover.year]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 24px",
          background: "#0e1e30",
          borderBottom: "1px solid #1a3250",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#7a90a8",
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            padding: "8px 0",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#b8c8d8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7a90a8")}
        >
          ← დახურვა
        </button>

        <div style={{ flex: 1 }} />

        <button
          onClick={onRegenerate}
          style={{
            background: "rgba(232, 100, 90, 0.1)",
            border: "1px solid rgba(232, 100, 90, 0.3)",
            color: "#e8645a",
            padding: "8px 16px",
            borderRadius: 4,
            fontSize: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: 0.5,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232, 100, 90, 0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(232, 100, 90, 0.1)")}
        >
          REGENERATE
        </button>

        <button
          onClick={handleExport}
          disabled={exporting}
          style={{
            background: "rgba(58, 173, 168, 0.15)",
            border: "1px solid rgba(58, 173, 168, 0.3)",
            color: exporting ? "#4a6070" : "#3aada8",
            padding: "8px 16px",
            borderRadius: 4,
            fontSize: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            cursor: exporting ? "not-allowed" : "pointer",
            letterSpacing: 0.5,
            opacity: exporting ? 0.6 : 1,
            transition: "all 150ms",
          }}
          onMouseEnter={(e) => {
            if (!exporting) {
              e.currentTarget.style.background = "rgba(58, 173, 168, 0.25)";
            }
          }}
          onMouseLeave={(e) => {
            if (!exporting) {
              e.currentTarget.style.background = "rgba(58, 173, 168, 0.15)";
            }
          }}
        >
          {exporting ? "EXPORTING…" : "DOWNLOAD PDF"}
        </button>
      </div>

      {/* Scrollable proposal */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#1E2B4A",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {apiError && (
          <div
            style={{
              background: "rgba(232, 100, 90, 0.12)",
              borderBottom: "1px solid rgba(232, 100, 90, 0.3)",
              color: "#e8645a",
              padding: "10px 24px",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0,
            }}
          >
            ⚠ API generation failed — showing default template. {apiError}
          </div>
        )}
        <ProposalRenderer proposalData={proposalData} docRef={docRef} />
      </div>
    </div>,
    document.body
  );
}
