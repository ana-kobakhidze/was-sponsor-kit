/**
 * WAS Generation Prompt Templates — JSON Output
 * Imported by api/generate.js — NOT a Vercel route (underscore prefix).
 *
 * Generates structured JSON that maps to the WAS Sponsor Proposal PDF design.
 */

export function buildSystemPrompt() {
  return `You are the generation engine for Women's Alpine School (WAS / ქალთა ალპური სკოლა), a Georgian mountaineering organization that teaches women to climb — for free, on a volunteer model.

Your voice is:
- Direct and earned, not corporate
- Honest about what exists and what doesn't
- Georgian-specific and culturally grounded
- Failure-forward: we didn't start perfect, we started anyway

CRITICAL: Output ONLY valid JSON. No markdown, no extra text.

If a DataModel field is empty, use: [FIELD NEEDED: field_name]

Bilingual approach: Every section has "ka" (Georgian) and "en" (English) fields.`;
}

function f(val, fieldName) {
  const s = (val ?? "").trim();
  return s || `[FIELD NEEDED: ${fieldName}]`;
}

function buildFullProposalJSON(dm) {
  const year = new Date().getFullYear();

  return `Generate a complete PDF proposal structure as JSON. Output ONLY the JSON object, no other text.

DataModel:
${JSON.stringify(dm, null, 2)}

Generate this exact JSON structure (fill in Georgian + English for all text fields):

{
  "cover": {
    "taglineKa": "string (1 line, Georgian)",
    "taglineEn": "string (1 line, English)",
    "summaryKa": "string (2-3 sentences, Georgian)",
    "summaryEn": "string (2-3 sentences, English)",
    "year": ${year}
  },
  "sections": [
    {
      "number": "01",
      "titleKa": "section title (Georgian)",
      "titleEn": "section title (English)",
      "headlineKa": "large bold headline or quote (Georgian)",
      "headlineEn": "large bold headline or quote (English)",
      "keyStatsKa": { "label": "value" },
      "keyStatsEn": { "label": "value" },
      "contentKa": "main body text (Georgian)",
      "contentEn": "main body text (English)",
      "type": "text|table|cards|metrics",
      "tableData": {
        "headersKa": ["column1", "column2"],
        "headersEn": ["column1", "column2"],
        "rowsKa": [["item", "value"], ...],
        "rowsEn": [["item", "value"], ...]
      }
    }
  ],
  "contact": {
    "name": "${f(dm.coreIdentity?.founders, "founders")}",
    "title": "Founder, ${f(dm.coreIdentity?.officialName, "officialName")}",
    "email": "[contact email]",
    "location": "Tbilisi, Georgia"
  }
}

SECTIONS TO GENERATE (use DataModel to populate):
1. WHO WE ARE (coreIdentity, previousExpeditionsHistory) — type: text
2. WHY WAS (problem, barriers, evidence) — type: text
3. WHO WE SERVE (audience demographics) — type: text
4. THE PROGRAM (duration, training, safety) — type: text
5. BUDGET OVERVIEW (three budget buckets with costs) — type: metrics
6. RENOVATION BUDGET (detailed line items as table) — type: table [INCLUDE tableData with: headersEn=["Item", "Cost", "Total"], rowsEn=[...]]
7. WALLS & FIT-OUT (climbing wall details as table) — type: table [INCLUDE tableData with: headersEn=["Feature", "Dimensions", "Capacity"], rowsEn=[...]]
8. EXPEDITION GEAR (gear inventory as table) — type: table [INCLUDE tableData with: headersEn=["Gear Item", "Quantity", "Condition"], rowsEn=[...]]
9. GYM CAPACITY (visitor stats, capacity metrics) — type: metrics
10. BRAND VISIBILITY (logo placement, visibility) — type: text
11. PARTNERSHIP TIERS (sponsorship table) — type: table [INCLUDE tableData with: headersEn=["Tier", "Investment", "Benefits"], rowsEn=[...]]
12. LET'S BUILD (closing call-to-action) — type: text

IMPORTANT INSTRUCTIONS FOR TABLE SECTIONS (06, 07, 08, 11):
- For sections with "type": "table", you MUST also include a "tableData" object
- tableData structure: { "headersEn": [...], "headersKa": [...], "rowsEn": [[...], ...], "rowsKa": [[...], ...] }
- Each row is an array of strings matching the column count
- Include both Georgian (Ka) and English (En) versions of all table data
- Keep contentEn/contentKa as narrative text to accompany the table

Design approach:
- Large section numbers (01, 02, etc.)
- Bold headlines with key metric in color
- Statistics highlighted as key values
- Budget/gear items as structured tables
- Bilingual Georgian (🇬🇪) + English (🏔️)

Generate only the JSON. No markdown. No extra text.`;
}

function buildOnePagePitchJSON(dm) {
  return `Generate a ONE-PAGE sponsor pitch as JSON (condensed version of full proposal).

DataModel:
${JSON.stringify(dm, null, 2)}

Output ONLY this JSON (no other text):

{
  "title": {
    "taglineKa": "string",
    "taglineEn": "string"
  },
  "sections": [
    {
      "titleKa": "string",
      "titleEn": "string",
      "headlineKa": "string",
      "headlineEn": "string",
      "contentKa": "string",
      "contentEn": "string"
    }
  ]
}

Include:
1. Tagline + summary (who you are)
2. The problem (why this matters)
3. The ask (what you need)
4. Key metrics (why we'll succeed)
5. Contact info

Keep each section to 2-3 sentences. Bilingual. JSON only.`;
}

function buildOutreachEmailJSON(dm, params) {
  return `Generate a SPONSOR OUTREACH EMAIL as JSON.

Company: ${params?.companyName || "[COMPANY NAME]"}
Industry: ${params?.industry || "[INDUSTRY]"}
Contact: ${params?.contactName || "[CONTACT NAME]"}
Tier Interest: ${params?.tier || "[TIER]"}
Why good fit: ${params?.whyGoodFit || "[WHY PARTNERSHIP WORKS]"}

DataModel:
${JSON.stringify(dm, null, 2)}

Output ONLY this JSON:

{
  "subject": {
    "ka": "subject line (Georgian)",
    "en": "subject line (English)"
  },
  "greeting": {
    "ka": "greeting (Georgian)",
    "en": "greeting (English)"
  },
  "bodySections": [
    {
      "titleKa": "string",
      "titleEn": "string",
      "contentKa": "string",
      "contentEn": "string"
    }
  ],
  "closing": {
    "ka": "closing (Georgian)",
    "en": "closing (English)"
  },
  "signature": {
    "name": "name",
    "title": "title",
    "email": "email"
  }
}

Personalize for the company. Address ${params?.contactName || "contact"}. Mention ${params?.industry || "industry"}.
Make it warm, specific, not generic. 200-300 words total.`;
}

function buildTierCardJSON(dm, params) {
  return `Generate a SPONSORSHIP TIER CARD as JSON.

Tier Name: ${params?.tier || "[TIER NAME]"}

DataModel:
${JSON.stringify(dm, null, 2)}

Output ONLY this JSON:

{
  "tierName": {
    "ka": "tier name (Georgian)",
    "en": "tier name (English)"
  },
  "costKa": "amount (Georgian)",
  "costEn": "amount (English)",
  "benefits": [
    {
      "iconKa": "description",
      "textKa": "benefit text (Georgian)",
      "textEn": "benefit text (English)"
    }
  ],
  "description": {
    "ka": "what this tier includes (Georgian)",
    "en": "what this tier includes (English)"
  }
}

Include 5-7 specific benefits. Be concrete (not "brand visibility" but "logo on climbing wall, Instagram monthly post, etc.").`;
}

export function buildUserPrompt(variant, dataModel, variantParams) {
  switch (variant) {
    case "full_proposal":
      return buildFullProposalJSON(dataModel);
    case "one_page_pitch":
      return buildOnePagePitchJSON(dataModel);
    case "outreach_email":
      return buildOutreachEmailJSON(dataModel, variantParams);
    case "tier_card":
      return buildTierCardJSON(dataModel, variantParams);
    default:
      return buildFullProposalJSON(dataModel);
  }
}
