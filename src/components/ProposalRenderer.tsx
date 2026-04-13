import * as React from "react";
import type { ProposalData } from "@/lib/proposal-types";

interface Props {
  proposalData: ProposalData;
  docRef: React.RefObject<HTMLDivElement | null>;
}

// All CSS scoped under .proposal-doc to avoid conflicts with app styles
const PROPOSAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

  .proposal-doc {
    --pd-navy: #1E2B4A;
    --pd-navy-light: #2C3E6B;
    --pd-navy-card: #243454;
    --pd-coral: #E8645A;
    --pd-coral-dark: #B8483F;
    --pd-teal: #3AADA8;
    --pd-cream: #F5F1EA;
    --pd-muted: #8B94A8;
  }

  .proposal-doc * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .proposal-doc {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: var(--pd-navy);
    color: var(--pd-cream);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  .proposal-doc h1,
  .proposal-doc h2,
  .proposal-doc h3,
  .proposal-doc .display {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }

  .proposal-doc .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    letter-spacing: 0;
  }

  .proposal-doc .page {
    max-width: 960px;
    margin: 0 auto;
  }

  /* Navigation */
  .proposal-doc .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
    background: rgba(30, 43, 74, 0.88);
    border-bottom: 1px solid rgba(232, 100, 90, 0.25);
    padding: 14px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .proposal-doc .nav-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .proposal-doc .nav-logo {
    width: 44px;
    height: 30px;
    object-fit: contain;
  }

  .proposal-doc .nav-title {
    font-family: 'Montserrat';
    font-weight: 800;
    letter-spacing: 0.5px;
    font-size: 16px;
  }

  .proposal-doc .nav-sub {
    font-size: 10px;
    opacity: 0.7;
    letter-spacing: 1.5px;
    margin-top: 2px;
  }

  .proposal-doc .nav-right {
    text-align: right;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--pd-coral);
    font-weight: 700;
  }

  /* Sections */
  .proposal-doc section {
    padding: 72px 40px;
    border-bottom: 1px solid rgba(232, 100, 90, 0.1);
  }

  .proposal-doc .section-num {
    display: inline-block;
    color: var(--pd-coral);
    font-weight: 800;
    font-family: 'Montserrat';
    letter-spacing: 1.5px;
    font-size: 11px;
    margin-right: 16px;
  }

  .proposal-doc .section-eyebrow {
    display: inline-block;
    color: var(--pd-cream);
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 11px;
    text-transform: uppercase;
    border-bottom: 2px solid var(--pd-coral);
    padding-bottom: 6px;
    margin-bottom: 32px;
  }

  /* Cover */
  .proposal-doc .cover {
    position: relative;
    min-height: 100vh;
    padding: 0;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .proposal-doc .cover-content {
    max-width: 600px;
    padding: 40px;
  }

  .proposal-doc .cover-tagline {
    font-family: 'Instrument Serif', serif;
    font-size: 24px;
    font-style: italic;
    color: var(--pd-coral);
    margin-bottom: 24px;
    line-height: 1.4;
  }

  .proposal-doc .cover-summary {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 40px;
    opacity: 0.95;
  }

  .proposal-doc .cover-year {
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--pd-teal);
    text-transform: uppercase;
  }

  /* Headlines and content */
  .proposal-doc h2 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 24px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .proposal-doc .key-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin: 32px 0;
    padding: 24px;
    background: var(--pd-navy-card);
    border-left: 4px solid var(--pd-coral);
  }

  .proposal-doc .key-stat-item {
    display: flex;
    flex-direction: column;
  }

  .proposal-doc .key-stat-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--pd-teal);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .proposal-doc .key-stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--pd-cream);
    line-height: 1.2;
  }

  /* Prose content */
  .proposal-doc .content {
    font-size: 15px;
    line-height: 1.7;
    margin: 32px 0;
    color: var(--pd-cream);
  }

  .proposal-doc .content p {
    margin-bottom: 16px;
  }

  /* Tables */
  .proposal-doc table {
    width: 100%;
    border-collapse: collapse;
    margin: 32px 0;
    background: var(--pd-navy-card);
  }

  .proposal-doc th {
    background: var(--pd-navy-light);
    color: var(--pd-coral);
    font-weight: 700;
    text-align: left;
    padding: 16px;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid var(--pd-coral);
  }

  .proposal-doc td {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(232, 100, 90, 0.1);
    font-size: 14px;
  }

  .proposal-doc tr:last-child td {
    border-bottom: none;
  }

  /* Metrics/cards layout */
  .proposal-doc .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
    margin: 32px 0;
  }

  .proposal-doc .metric-card {
    background: var(--pd-navy-card);
    padding: 24px;
    border-left: 4px solid var(--pd-teal);
  }

  .proposal-doc .metric-value {
    font-size: 32px;
    font-weight: 800;
    color: var(--pd-coral);
    margin-bottom: 8px;
  }

  .proposal-doc .metric-label {
    font-size: 12px;
    color: var(--pd-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Contact footer */
  .proposal-doc .contact {
    background: var(--pd-navy-light);
    padding: 48px 40px;
    border-top: 1px solid rgba(232, 100, 90, 0.2);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }

  .proposal-doc .contact-block h3 {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--pd-teal);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .proposal-doc .contact-block p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  .proposal-doc .contact-email {
    color: var(--pd-coral);
    text-decoration: none;
  }

  .proposal-doc .contact-email:hover {
    text-decoration: underline;
  }

  /* Editable text highlighting */
  .proposal-doc [contenteditable="true"] {
    outline: 1px dashed rgba(232, 100, 90, 0.3);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .proposal-doc [contenteditable="true"]:focus {
    outline: 2px solid var(--pd-teal);
    outline-offset: 2px;
  }

  /* Page break control */
  .proposal-doc .pd-no-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .proposal-doc .pd-page-break-before {
    page-break-before: always;
    break-before: page;
  }
`;

export default function ProposalRenderer({ proposalData, docRef }: Props) {
  const [editedData, setEditedData] = React.useState<ProposalData>(() =>
    structuredClone(proposalData)
  );

  const patchCoverField = React.useCallback(
    (field: "taglineKa" | "taglineEn" | "summaryKa" | "summaryEn" | "year", value: string) => {
      setEditedData((prev) => {
        const next = structuredClone(prev);
        if (field === "year") {
          next.cover.year = parseInt(value) || new Date().getFullYear();
        } else {
          (next.cover[field] as unknown) = value;
        }
        return next;
      });
    },
    []
  );

  const patchSection = React.useCallback(
    (
      index: number,
      field:
        | "titleEn"
        | "headlineEn"
        | "contentEn"
        | "titleKa"
        | "headlineKa"
        | "contentKa",
      value: string
    ) => {
      setEditedData((prev) => {
        const next = structuredClone(prev);
        const section = next.sections[index] as unknown as Record<string, unknown>;
        if (field in section) {
          section[field] = value;
        }
        return next;
      });
    },
    []
  );

  const patchContact = React.useCallback((field: keyof typeof editedData.contact, value: string) => {
    setEditedData((prev) => {
      const next = structuredClone(prev);
      next.contact[field] = value;
      return next;
    });
  }, []);

  const renderKeyStats = (stats: Record<string, string>) => {
    return (
      <div className="key-stats">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="key-stat-item pd-no-break">
            <div className="key-stat-label">{label}</div>
            <div className="key-stat-value">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = (section: typeof editedData.sections[0]) => {
    if (!section.tableData) {
      return null;
    }
    const { headersEn, rowsEn } = section.tableData;
    return (
      <table className="pd-no-break">
        <thead>
          <tr>
            {headersEn.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsEn.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderSectionContent = (section: typeof editedData.sections[0], index: number) => {
    switch (section.type) {
      case "table":
        return (
          <>
            {renderKeyStats(section.keyStatsEn)}
            {renderTable(section)}
            <div
              className="content"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => patchSection(index, "contentEn", e.currentTarget.textContent || "")}
            >
              {section.contentEn}
            </div>
          </>
        );
      case "metrics":
        return (
          <>
            <div className="metrics-grid">
              {Object.entries(section.keyStatsEn).map(([label, value]) => (
                <div key={label} className="metric-card pd-no-break">
                  <div className="metric-value">{value}</div>
                  <div className="metric-label">{label}</div>
                </div>
              ))}
            </div>
            <div
              className="content"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => patchSection(index, "contentEn", e.currentTarget.textContent || "")}
            >
              {section.contentEn}
            </div>
          </>
        );
      case "cards":
      case "text":
      default:
        return (
          <>
            {renderKeyStats(section.keyStatsEn)}
            <div
              className="content"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => patchSection(index, "contentEn", e.currentTarget.textContent || "")}
            >
              {section.contentEn}
            </div>
          </>
        );
    }
  };

  return (
    <div ref={docRef} className="proposal-doc">
      <style>{PROPOSAL_STYLES}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-title">WAS PROPOSAL</div>
          <div className="nav-sub">{editedData.cover.year}</div>
        </div>
        <div className="nav-right">Women's Alpine School</div>
      </nav>

      {/* Cover */}
      <section className="cover">
        <div className="cover-content">
          <div
            className="cover-tagline serif"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => patchCoverField("taglineEn", e.currentTarget.textContent || "")}
          >
            {editedData.cover.taglineEn}
          </div>
          <div
            className="cover-summary"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => patchCoverField("summaryEn", e.currentTarget.textContent || "")}
          >
            {editedData.cover.summaryEn}
          </div>
          <div className="cover-year">{editedData.cover.year}</div>
        </div>
      </section>

      {/* Numbered sections */}
      {editedData.sections.map((section, idx) => (
        <section
          key={section.number}
          className={parseInt(section.number) >= 5 ? "pd-page-break-before" : ""}
        >
          <div className="section-eyebrow">
            <span className="section-num">{section.number}</span>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => patchSection(idx, "titleEn", e.currentTarget.textContent || "")}
            >
              {section.titleEn}
            </span>
          </div>

          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => patchSection(idx, "headlineEn", e.currentTarget.textContent || "")}
          >
            {section.headlineEn}
          </h2>

          {renderSectionContent(section, idx)}
        </section>
      ))}

      {/* Contact footer */}
      <section className="contact">
        <div className="contact-block">
          <h3>Primary Contact</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => patchContact("name", e.currentTarget.textContent || "")}
          >
            {editedData.contact.name}
          </p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => patchContact("title", e.currentTarget.textContent || "")}
          >
            {editedData.contact.title}
          </p>
        </div>
        <div className="contact-block">
          <h3>Contact Info</h3>
          <p>
            <a
              className="contact-email"
              href={`mailto:${editedData.contact.email}`}
              onClick={(e) => e.stopPropagation()}
            >
              {editedData.contact.email}
            </a>
          </p>
          <p>{editedData.contact.location}</p>
        </div>
      </section>
    </div>
  );
}
