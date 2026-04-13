/**
 * PDF export using html2pdf.js (which bundles html2canvas + jsPDF).
 * Converts the rendered .proposal-doc DOM element to A4 PDF, preserving styles.
 */

// @ts-ignore - html2pdf.js doesn't have official types
import html2pdf from "html2pdf.js";

export async function exportProposalToPdf(
  element: HTMLElement,
  year: number,
  onProgress?: (msg: string) => void
): Promise<void> {
  onProgress?.("Preparing PDF export...");

  // Temporarily disable contentEditable to prevent outline/cursor rendering in PDF
  const editables = element.querySelectorAll("[contenteditable='true']");
  editables.forEach((el) => {
    (el as HTMLElement).setAttribute("contenteditable", "false");
  });

  try {
    const opt: Record<string, unknown> = {
      margin: [0, 0, 0, 0] as [number, number, number, number],
      filename: `WAS_Proposal_${year}.pdf`,
      image: {
        type: "jpeg",
        quality: 0.95,
      },
      html2canvas: {
        scale: 2, // Retina quality
        useCORS: true, // Allow Google Fonts via @import
        logging: false,
        backgroundColor: "#1E2B4A", // Match --pd-navy so no white flash at page breaks
        windowWidth: 1200, // Fixed render width
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: {
        mode: ["css", "legacy"],
        avoid: ["table", ".pd-no-break"], // Prevent tables from splitting mid-row
      },
    };

    onProgress?.("Rendering proposal to PDF...");
    await html2pdf().set(opt).from(element).save();
    onProgress?.("PDF saved successfully");
  } finally {
    // Re-enable contentEditable
    editables.forEach((el) => {
      (el as HTMLElement).setAttribute("contenteditable", "true");
    });
  }
}
