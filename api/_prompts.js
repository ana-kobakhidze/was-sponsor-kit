/**
 * WAS Generation Prompt Templates
 * Imported by api/generate.js — NOT a Vercel route (underscore prefix).
 */

export function buildSystemPrompt() {
  return `You are the generation engine for Women's Alpine School (WAS / ქალთა ალპური სკოლა), a Georgian mountaineering organization that teaches women to climb — for free, on a volunteer model. Founded by Popo (Popo Chelidze), a 40-year-old architect who began climbing at 33 and has since led dozens of women to the summit of Kazbegi. Community: 150+ members.

Your job is to transform structured form data (a DataModel JSON) into a complete, high-quality sponsorship proposal. You write in WAS's voice — which is:
- Direct and earned, not corporate
- Honest about what exists and what doesn't yet
- Georgian-specific and culturally grounded
- Failure-forward: we didn't start perfect, we started anyway
- Never wellness-brand soft, never motivational-poster hollow

You produce BILINGUAL output: every section appears first in Georgian (ქართული), then immediately in English. Mark Georgian sections with 🇬🇪 and English with 🏔️.

If a DataModel field is empty or missing, do NOT invent data. Instead, use a clear placeholder: [FIELD NEEDED: field name]. This makes gaps visible without fabricating credibility.

Tone calibration:
- To sponsors: professional, specific, ROI-aware
- About the community: warm, real, specific names and stories where available
- About the mission: urgent but grounded — this is a real gap, not a marketing angle
- Never: "empowering women", "inspiring journey", "breaking barriers" as empty phrases — only use if backed by specific data in the DataModel`;
}

function field(val) {
  const s = (val ?? "").trim();
  return s || null;
}

function f(val, fieldName) {
  const s = (val ?? "").trim();
  return s || `[FIELD NEEDED: ${fieldName}]`;
}

function buildFullProposal(dm) {
  const year = new Date().getFullYear();
  return `Generate a FULL SPONSORSHIP PROPOSAL for Women's Alpine School using the DataModel below.

OUTPUT FORMAT: Bilingual (Georgian first, then English per section). Use the section structure below exactly. Where data is missing, write [FIELD NEEDED: field_name].

---

## PROPOSAL STRUCTURE

### COVER
🇬🇪 ${f(dm.coreIdentity?.officialName, "officialName")} — სპონსორის წინადადება ${year}
🏔️ ${f(dm.coreIdentity?.officialName, "officialName")} — Sponsorship Proposal ${year}

Tagline (generate from brandEssence if filled, otherwise from coreIdentity):
🇬🇪 [1 line, Georgian]
🏔️ [1 line, English]

Contact block: Instagram: ${f(dm.visibility?.instagram, "instagram")}, Website: ${f(dm.visibility?.website, "website")}

---

### SECTION 1 — ვინ ვართ / WHO WE ARE
Pull from coreIdentity:
- Official Name: ${f(dm.coreIdentity?.officialName, "officialName")}
- Legal Form: ${f(dm.coreIdentity?.legalForm, "legalForm")}
- Founders: ${f(dm.coreIdentity?.founders, "founders")}
- Instructors: ${f(dm.coreIdentity?.instructors, "instructors")}
- Certifications: ${f(dm.coreIdentity?.instructorCertifications, "instructorCertifications")}
- Years Operating: ${f(dm.coreIdentity?.yearsOperating, "yearsOperating")}

🇬🇪 Write 2–3 paragraphs. Lead with the human story — Popo, the founding moment, the first cohort. Then state the legal form and operating structure. End with the instructor team and their certifications.

🏔️ Same content in English. Do not translate mechanically — rewrite for an international reader who has no Georgia context.

Training history (render as a clean list):
${f(dm.coreIdentity?.previousExpeditionsHistory, "previousExpeditionsHistory")}

---

### SECTION 2 — პრობლემა / THE PROBLEM
- Needs/Gaps: ${f(dm.problem?.womenPercent, "womenPercent")}
- Barriers: ${f(dm.problem?.barriers, "barriers")}
- Safety Gaps: ${f(dm.problem?.safetyGaps, "safetyGaps")}
- Media Visibility Gap: ${f(dm.problem?.mediaVisibilityGap, "mediaVisibilityGap")}
- Evidence Links: ${f(dm.problem?.evidenceLinks, "evidenceLinks")}

🇬🇪 State the specific gaps WAS addresses. Use the exact language from the DataModel.
🏔️ Same in English. Frame for an international sponsor.

---

### SECTION 3 — ვის ვემსახურებით / WHO WE SERVE
- Age Range: ${f(dm.audience?.ageRange, "ageRange")}
- Level: ${f(dm.audience?.level, "level")}
- Urban/Rural: ${f(dm.audience?.urbanRural, "urbanRural")}
- Background: ${f(dm.audience?.studentProfessional, "studentProfessional")}
- Women Per Year: ${f(dm.audience?.womenPerYear, "womenPerYear")}

🇬🇪 Paint a specific picture of a WAS participant.
🏔️ English version.

---

### SECTION 4 — პროგრამა / THE PROGRAM
- Duration: ${f(dm.program?.duration, "duration")}
- Training Days/Month: ${f(dm.program?.trainingDaysPerMonth, "trainingDaysPerMonth")}
- Indoor/Outdoor: ${f(dm.program?.indoorOutdoor, "indoorOutdoor")}
- High Altitude Component: ${f(dm.program?.highAltitudeComponent, "highAltitudeComponent")}
- Final Expedition Goal: ${f(dm.program?.finalExpeditionGoal, "finalExpeditionGoal")}
- Safety Protocols: ${f(dm.program?.safetyProtocols, "safetyProtocols")}

🇬🇪 Describe the program structure clearly.
🏔️ English version. Emphasize structured, safety-first approach.

---

### SECTION 5 — ბიუჯეტი / BUDGET & ASK
- Equipment: ${f(dm.budget?.equipmentListWithQty, "equipmentListWithQty")}
- Operational Costs: ${f(dm.budget?.operationalCosts, "operationalCosts")}
- Media Production: ${f(dm.budget?.mediaProduction, "mediaProduction")}
- Emergency Reserve: ${f(dm.budget?.emergencyReserve, "emergencyReserve")}
- Total Estimate: ${f(dm.budget?.totalEstimate, "totalEstimate")}
- Sponsorship Tiers: ${f(dm.budget?.sponsorshipTiers, "sponsorshipTiers")}

🇬🇪 Render the budget and sponsorship tiers as formatted cards.
🏔️ English version with same tier card format.

---

### SECTION 6 — ზეგავლენა / IMPACT & ROI
- Metrics: ${f(dm.impact?.metricsList, "metricsList")}
- Targets: ${f(dm.impact?.targets, "targets")}
- How to Measure: ${f(dm.impact?.howToMeasure, "howToMeasure")}
- Reporting Cadence: ${f(dm.impact?.reportingCadence, "reportingCadence")}

🇬🇪 Specific metrics, targets, measurement methods. Real accountability.
🏔️ English version framing ROI for international sponsors.

---

### SECTION 7 — სპონსორი იღებს / WHAT THE SPONSOR GETS
- Instagram: ${f(dm.visibility?.instagram, "instagram")}
- Website: ${f(dm.visibility?.website, "website")}
- Logo/Branding: ${f(dm.visibility?.logoBranding, "logoBranding")}
- Photo/Video Assets: ${f(dm.visibility?.photoVideoAssets, "photoVideoAssets")}
- Press Contacts: ${f(dm.visibility?.pressContacts, "pressContacts")}
- Sponsor Benefits List: ${f(dm.visibility?.sponsorBenefitsList, "sponsorBenefitsList")}
- Content Plan: ${f(dm.visibility?.contentPlan, "contentPlan")}
- Brand Essence: ${f(dm.branding?.brandEssence, "brandEssence")}
- Voice/Tone: ${f(dm.branding?.voiceTone, "voiceTone")}

🇬🇪 List every deliverable. Show the content plan. Include channel stats.
🏔️ English version. Add one paragraph about the cultural moment angle.

---

### SECTION 8 — პარტნიორები / ECOSYSTEM & PARTNERS
- Local Guides: ${f(dm.partnerships?.localGuides, "localGuides")}
- Rescue Services: ${f(dm.partnerships?.rescueServices, "rescueServices")}
- Federations: ${f(dm.partnerships?.federations, "federations")}
- Women NGOs: ${f(dm.partnerships?.womenNGOs, "womenNGOs")}
- Universities: ${f(dm.partnerships?.universities, "universities")}
- Outdoor Shops: ${f(dm.partnerships?.outdoorShops, "outdoorShops")}
- Status Notes: ${f(dm.partnerships?.statusNotes, "statusNotes")}

🇬🇪 Structured list by category with status.
🏔️ English version.

---

### SECTION 9 — იურიდიული და უსაფრთხოება / LEGAL & SAFETY
- Waivers: ${f(dm.legalRisk?.waivers, "waivers")}
- Insurance: ${f(dm.legalRisk?.insurance, "insurance")}
- Emergency Protocol: ${f(dm.legalRisk?.emergencyProtocol, "emergencyProtocol")}
- Certified Instructors: ${f(dm.legalRisk?.certifiedInstructors, "certifiedInstructors")}
- Risk Mitigation: ${f(dm.legalRisk?.riskMitigation, "riskMitigation")}

🇬🇪 Factual, specific. Remove sponsor doubt about liability.
🏔️ English version: "Here is how WAS protects participants, and by extension, its partners."

---

### SECTION 10 — ხედვა / VISION & LONGEVITY
- Season Model: ${f(dm.vision?.oneSeasonVsAnnual, "oneSeasonVsAnnual")}
- Expansion Plan: ${f(dm.vision?.expansionPlan, "expansionPlan")}
- Future Expedition Team: ${f(dm.vision?.futureExpeditionTeam, "futureExpeditionTeam")}
- Sustainability Plan: ${f(dm.vision?.sustainabilityPlan, "sustainabilityPlan")}

🇬🇪 Where is this going? End with the sustainability model.
🏔️ English version. Frame as: sponsoring WAS now = being part of a Georgian mountaineering institution in the making.

---

### CLOSING / CALL TO ACTION

🇬🇪
${f(dm.coreIdentity?.officialName, "officialName")} არ ეძებს მხარდამჭერს — ის ეძებს პარტნიორს, ვინც ხედავს იმავეს.
Instagram: ${f(dm.visibility?.instagram, "instagram")} | Website: ${f(dm.visibility?.website, "website")}

🏔️
${f(dm.coreIdentity?.officialName, "officialName")} is not looking for a donor. We are looking for a partner who sees what we see.
Instagram: ${f(dm.visibility?.instagram, "instagram")} | Website: ${f(dm.visibility?.website, "website")}`;
}

function buildOnePagePitch(dm) {
  return `OUTPUT TYPE: ONE-PAGE PITCH ONLY (not the full proposal).

Generate a single-page sponsor pitch that contains:
1. Org name + tagline (bilingual)
2. The problem in 2 sentences
3. The program in 3 bullet points
4. Cohort size + budget ask
5. Top 3 sponsor benefits
6. Contact

Maximum 400 words total (200 Georgian + 200 English).
Keep it scannable. No paragraphs longer than 3 lines.

DATA MODEL:
${JSON.stringify(dm, null, 2)}`;
}

function buildOutreachEmail(dm, params) {
  return `OUTPUT TYPE: OUTREACH EMAIL (not the full proposal).

Target company: ${params?.companyName || "[COMPANY NAME]"}
Industry: ${params?.industry || "[INDUSTRY]"}
Sponsorship tier being pitched: ${params?.tier || "[TIER]"}
Contact name (if known): ${params?.contactName || "[CONTACT NAME]"}
Why this company specifically: ${params?.whyGoodFit || "[WHY THIS COMPANY]"}

Generate a bilingual outreach email (Georgian first, English second).

Email rules:
- Subject line: specific, not generic. Reference their product/mission + WAS's mission.
- Opening: one sentence about why WAS is contacting THIS company specifically (not a template opener)
- Body: 3 paragraphs max. Program snapshot → what they get → the ask
- Closing: specific next step (call, meeting, send full proposal)
- Tone: peer-to-peer, not applicant-to-gatekeeper
- No: "I hope this email finds you well", "We are reaching out to", "Please find attached"
- Total length: under 250 words per language

DATA MODEL:
${JSON.stringify(dm, null, 2)}`;
}

function buildTierCard(dm, params) {
  return `OUTPUT TYPE: SPONSORSHIP TIER CARD ONLY.

Tier: ${params?.tier || "[TIER NAME]"}

Generate a formatted tier card (bilingual) that includes:
- Tier name + investment amount
- 5–7 specific sponsor benefits (pulled from visibility.sponsorBenefitsList + budget.sponsorshipTiers)
- One paragraph on why this tier exists and what problem it solves for WAS
- Brand visibility summary (where logo appears, how often, in what contexts)

Format for easy copy-paste into a pitch deck or email.

DATA MODEL:
${JSON.stringify(dm, null, 2)}`;
}

export function buildUserPrompt(variant, dataModel, variantParams) {
  switch (variant) {
    case "full_proposal":
      return buildFullProposal(dataModel);
    case "one_page_pitch":
      return buildOnePagePitch(dataModel);
    case "outreach_email":
      return buildOutreachEmail(dataModel, variantParams);
    case "tier_card":
      return buildTierCard(dataModel, variantParams);
    default:
      return buildOnePagePitch(dataModel);
  }
}
