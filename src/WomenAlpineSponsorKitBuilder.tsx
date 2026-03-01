/* src/WomenAlpineSponsorKitBuilder.tsx
   Single-file React + Tailwind + shadcn/ui UI preview
   - 3-column desktop layout
   - Completeness per step + overall
   - Right-side live preview summary
   - Per-step validation + Submit (POST to VITE_SHEETS_ENDPOINT if provided)
   - No localStorage
*/

import * as React from "react";
import {
  MountainSnow,
  ShieldAlert,
  Target,
  Users,
  ListChecks,
  Wallet,
  Ruler,
  Image as ImageIcon,
  Handshake,
  Scale,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  Wand2,
  FileDown,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type StepKey =
  | "coreIdentity"
  | "problem"
  | "audience"
  | "program"
  | "budget"
  | "impact"
  | "visibility"
  | "partnerships"
  | "legalRisk"
  | "vision";

type StepDef = {
  key: StepKey;
  title: string;
  subtitle: string;
  instruction: string;
  icon: React.ReactNode;
};

type DataModel = {
  coreIdentity: {
    officialName: string;
    legalForm: string;
    founders: string;
    instructorCertifications: string;
    yearsOperating: string;
    previousExpeditionsHistory: string;
  };
  problem: {
    womenPercent: string; // allow "estimate + source"
    barriers: string;
    safetyGaps: string;
    mediaVisibilityGap: string;
    evidenceLinks: string;
  };
  audience: {
    ageRange: string;
    level: string; // beginner/intermediate/mixed
    urbanRural: string;
    studentProfessional: string;
    womenPerYear: string;
  };
  program: {
    duration: string;
    trainingDaysPerMonth: string;
    indoorOutdoor: string;
    highAltitudeComponent: string;
    finalExpeditionGoal: string;
    safetyProtocols: string;
  };
  budget: {
    equipmentListWithQty: string;
    operationalCosts: string;
    mediaProduction: string;
    emergencyReserve: string;
    totalEstimate: string;
    sponsorshipTiers: string;
  };
  impact: {
    metricsList: string;
    targets: string;
    howToMeasure: string;
    reportingCadence: string;
  };
  visibility: {
    instagram: string;
    website: string;
    logoBranding: string;
    photoVideoAssets: string;
    pressContacts: string;
    sponsorBenefitsList: string;
    contentPlan: string;
  };
  partnerships: {
    localGuides: string;
    rescueServices: string;
    federations: string;
    womenNGOs: string;
    universities: string;
    outdoorShops: string;
    statusNotes: string; // contacted/confirmed etc
  };
  legalRisk: {
    waivers: string;
    insurance: string;
    emergencyProtocol: string;
    certifiedInstructors: string;
    riskMitigation: string;
  };
  vision: {
    oneSeasonVsAnnual: string;
    expansionPlan: string;
    futureExpeditionTeam: string;
    sustainabilityPlan: string;
  };
};

const emptyData: DataModel = {
  coreIdentity: {
    officialName: "",
    legalForm: "",
    founders: "",
    instructorCertifications: "",
    yearsOperating: "",
    previousExpeditionsHistory: "",
  },
  problem: {
    womenPercent: "",
    barriers: "",
    safetyGaps: "",
    mediaVisibilityGap: "",
    evidenceLinks: "",
  },
  audience: {
    ageRange: "",
    level: "",
    urbanRural: "",
    studentProfessional: "",
    womenPerYear: "",
  },
  program: {
    duration: "",
    trainingDaysPerMonth: "",
    indoorOutdoor: "",
    highAltitudeComponent: "",
    finalExpeditionGoal: "",
    safetyProtocols: "",
  },
  budget: {
    equipmentListWithQty: "",
    operationalCosts: "",
    mediaProduction: "",
    emergencyReserve: "",
    totalEstimate: "",
    sponsorshipTiers: "",
  },
  impact: {
    metricsList: "",
    targets: "",
    howToMeasure: "",
    reportingCadence: "",
  },
  visibility: {
    instagram: "",
    website: "",
    logoBranding: "",
    photoVideoAssets: "",
    pressContacts: "",
    sponsorBenefitsList: "",
    contentPlan: "",
  },
  partnerships: {
    localGuides: "",
    rescueServices: "",
    federations: "",
    womenNGOs: "",
    universities: "",
    outdoorShops: "",
    statusNotes: "",
  },
  legalRisk: {
    waivers: "",
    insurance: "",
    emergencyProtocol: "",
    certifiedInstructors: "",
    riskMitigation: "",
  },
  vision: {
    oneSeasonVsAnnual: "",
    expansionPlan: "",
    futureExpeditionTeam: "",
    sustainabilityPlan: "",
  },
};

const steps: StepDef[] = [
  {
    key: "coreIdentity",
    title: "Core identity (Foundation)",
    subtitle: "Who you are, officially.",
    instruction:
      "Define the school as an entity sponsors can trust: legal form, leadership, and track record.",
    icon: <MountainSnow className="h-4 w-4" />,
  },
  {
    key: "problem",
    title: "Problem",
    subtitle: "What gap you solve.",
    instruction:
      "Make the problem measurable: representation, barriers, safety gaps, and evidence links.",
    icon: <Target className="h-4 w-4" />,
  },
  {
    key: "audience",
    title: "Target audience",
    subtitle: "Who you serve, exactly.",
    instruction:
      "Be specific about who joins: age range, level, background, and annual cohort size.",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "program",
    title: "Program structure",
    subtitle: "What participants do.",
    instruction:
      "Describe the training: schedule, environments, altitude components, and safety protocols.",
    icon: <ListChecks className="h-4 w-4" />,
  },
  {
    key: "budget",
    title: "Budget reality",
    subtitle: "Costs and tiers.",
    instruction:
      "List gear and operational costs, then define sponsorship tiers sponsors can pick quickly.",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    key: "impact",
    title: "Impact measurement",
    subtitle: "Proof, not vibes.",
    instruction:
      "Pick metrics, set targets, define how you measure, and how often you report back.",
    icon: <Ruler className="h-4 w-4" />,
  },
  {
    key: "visibility",
    title: "Visibility assets",
    subtitle: "What sponsors get.",
    instruction:
      "Show your channels and deliverables: brand assets, content plan, and sponsor benefits.",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    key: "partnerships",
    title: "Partnerships",
    subtitle: "Who backs you.",
    instruction:
      "List real partners and current status (contacted / confirmed). This builds credibility fast.",
    icon: <Handshake className="h-4 w-4" />,
  },
  {
    key: "legalRisk",
    title: "Legal & risk",
    subtitle: "Safety + liability.",
    instruction:
      "Document waivers, insurance, emergency protocol, certified instructors, and risk mitigation.",
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  {
    key: "vision",
    title: "Long-term vision",
    subtitle: "Where this goes next.",
    instruction:
      "Define whether this is seasonal or annual, how it scales, and how it becomes sustainable.",
    icon: <Sparkles className="h-4 w-4" />,
  },
];

type FieldDef<T extends StepKey> = {
  key: keyof DataModel[T] & string;
  label: string;
  placeholder: string;
  kind: "input" | "textarea";
  required?: boolean;
};

const fieldsByStep: { [K in StepKey]: FieldDef<K>[] } = {
  coreIdentity: [
    {
      key: "officialName",
      label: "Official name",
      placeholder: "Women Alpine School (or your final official name)",
      kind: "input",
      required: true,
    },
    {
      key: "legalForm",
      label: "Legal form",
      placeholder: "NGO / LLC / informal group",
      kind: "input",
      required: true,
    },
    {
      key: "founders",
      label: "Founders",
      placeholder: "Names + roles",
      kind: "textarea",
      required: true,
    },
    {
      key: "instructorCertifications",
      label: "Instructor certifications",
      placeholder: "Certifications, licenses, affiliations",
      kind: "textarea",
      required: true,
    },
    {
      key: "yearsOperating",
      label: "Years operating",
      placeholder: "e.g., 1, 2, 5+ (or 'starting this season')",
      kind: "input",
      required: true,
    },
    {
      key: "previousExpeditionsHistory",
      label: "Previous expeditions / training history",
      placeholder: "List notable trainings, trips, outcomes",
      kind: "textarea",
      required: true,
    },
  ],
  problem: [
    {
      key: "womenPercent",
      label: "% women in alpinism",
      placeholder: "If unknown: estimate + source",
      kind: "input",
      required: true,
    },
    {
      key: "barriers",
      label: "Barriers (social / financial / cultural)",
      placeholder: "What blocks women from entering and staying in alpinism?",
      kind: "textarea",
      required: true,
    },
    {
      key: "safetyGaps",
      label: "Safety gaps",
      placeholder: "Training gaps, risk factors, access to skills/mentorship",
      kind: "textarea",
      required: true,
    },
    {
      key: "mediaVisibilityGap",
      label: "Media visibility gap",
      placeholder: "What is missing in coverage / role models / storytelling?",
      kind: "textarea",
      required: true,
    },
    {
      key: "evidenceLinks",
      label: "Evidence / links",
      placeholder: "Links to stats, articles, reports, or credible observations",
      kind: "textarea",
      required: true,
    },
  ],
  audience: [
    {
      key: "ageRange",
      label: "Age range",
      placeholder: "e.g., 18–25, 25–40, mixed",
      kind: "input",
      required: true,
    },
    {
      key: "level",
      label: "Beginner / intermediate / mixed",
      placeholder: "Beginner / Intermediate / Mixed",
      kind: "input",
      required: true,
    },
    {
      key: "urbanRural",
      label: "Urban / rural",
      placeholder: "Urban / Rural / Mixed",
      kind: "input",
      required: true,
    },
    {
      key: "studentProfessional",
      label: "Student / professional",
      placeholder: "Students / Professionals / Mixed",
      kind: "input",
      required: true,
    },
    {
      key: "womenPerYear",
      label: "Women per year",
      placeholder: "e.g., 12, 20, 40",
      kind: "input",
      required: true,
    },
  ],
  program: [
    {
      key: "duration",
      label: "Program duration",
      placeholder: "e.g., 10 weeks, 3 months, one season",
      kind: "input",
      required: true,
    },
    {
      key: "trainingDaysPerMonth",
      label: "Training days / month",
      placeholder: "e.g., 6–8 days/month",
      kind: "input",
      required: true,
    },
    {
      key: "indoorOutdoor",
      label: "Indoor / outdoor",
      placeholder: "Indoor + Outdoor split",
      kind: "input",
      required: true,
    },
    {
      key: "highAltitudeComponent",
      label: "High-altitude component",
      placeholder: "Yes/No + details",
      kind: "textarea",
      required: true,
    },
    {
      key: "finalExpeditionGoal",
      label: "Final expedition goal",
      placeholder: "Target mountain / route / achievement",
      kind: "textarea",
      required: true,
    },
    {
      key: "safetyProtocols",
      label: "Safety protocols",
      placeholder: "Medical checks, rescue plan, supervision, gear checks",
      kind: "textarea",
      required: true,
    },
  ],
  budget: [
    {
      key: "equipmentListWithQty",
      label: "Equipment list (with qty)",
      placeholder: "Harness x12, Helmet x12, Rope x2, etc.",
      kind: "textarea",
      required: true,
    },
    {
      key: "operationalCosts",
      label: "Operational costs",
      placeholder: "Transport, permits, coaches, venues, logistics",
      kind: "textarea",
      required: true,
    },
    {
      key: "mediaProduction",
      label: "Media production",
      placeholder: "Photographer, video, editing, design",
      kind: "textarea",
      required: true,
    },
    {
      key: "emergencyReserve",
      label: "Emergency reserve",
      placeholder: "e.g., 10% buffer or fixed amount",
      kind: "input",
      required: true,
    },
    {
      key: "totalEstimate",
      label: "Total estimate",
      placeholder: "e.g., $12,000 or ₾30,000 (choose one currency and be consistent)",
      kind: "input",
      required: true,
    },
    {
      key: "sponsorshipTiers",
      label: "Sponsorship tiers",
      placeholder: "Tier names + amounts + benefits",
      kind: "textarea",
      required: true,
    },
  ],
  impact: [
    {
      key: "metricsList",
      label: "Metrics list",
      placeholder: "Completion rate, certifications earned, expeditions completed, etc.",
      kind: "textarea",
      required: true,
    },
    {
      key: "targets",
      label: "Targets",
      placeholder: "What success looks like this season",
      kind: "textarea",
      required: true,
    },
    {
      key: "howToMeasure",
      label: "How to measure",
      placeholder: "Surveys, attendance logs, instructor assessments, certifications",
      kind: "textarea",
      required: true,
    },
    {
      key: "reportingCadence",
      label: "Reporting cadence",
      placeholder: "Monthly, end-of-season, per expedition",
      kind: "input",
      required: true,
    },
  ],
  visibility: [
    {
      key: "instagram",
      label: "Instagram",
      placeholder: "@yourhandle or link",
      kind: "input",
      required: true,
    },
    {
      key: "website",
      label: "Website",
      placeholder: "yourdomain.com or link",
      kind: "input",
      required: true,
    },
    {
      key: "logoBranding",
      label: "Logo / branding",
      placeholder: "Describe current status and what exists",
      kind: "textarea",
      required: true,
    },
    {
      key: "photoVideoAssets",
      label: "Photo / video assets",
      placeholder: "What you already have (or plan to create)",
      kind: "textarea",
      required: true,
    },
    {
      key: "pressContacts",
      label: "Press contacts",
      placeholder: "Journalists, outlets, PR partners",
      kind: "textarea",
      required: true,
    },
    {
      key: "sponsorBenefitsList",
      label: "Sponsor benefits list",
      placeholder: "Logo placement, posts, events, gear testing, mentions",
      kind: "textarea",
      required: true,
    },
    {
      key: "contentPlan",
      label: "Content plan",
      placeholder: "Posting frequency, key moments, deliverables",
      kind: "textarea",
      required: true,
    },
  ],
  partnerships: [
    {
      key: "localGuides",
      label: "Local guides",
      placeholder: "Names/organizations + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "rescueServices",
      label: "Rescue services",
      placeholder: "Who supports safety + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "federations",
      label: "Federations",
      placeholder: "National/regional federations + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "womenNGOs",
      label: "Women NGOs",
      placeholder: "NGOs + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "universities",
      label: "Universities",
      placeholder: "Partners + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "outdoorShops",
      label: "Outdoor shops",
      placeholder: "Shops/brands + status",
      kind: "textarea",
      required: true,
    },
    {
      key: "statusNotes",
      label: "Status notes",
      placeholder: "Contacted / confirmed / next steps",
      kind: "textarea",
      required: true,
    },
  ],
  legalRisk: [
    {
      key: "waivers",
      label: "Waivers",
      placeholder: "Waiver approach and required signatures",
      kind: "textarea",
      required: true,
    },
    {
      key: "insurance",
      label: "Insurance",
      placeholder: "Insurance coverage and provider plan",
      kind: "textarea",
      required: true,
    },
    {
      key: "emergencyProtocol",
      label: "Emergency protocol",
      placeholder: "Emergency plan, escalation, rescue coordination",
      kind: "textarea",
      required: true,
    },
    {
      key: "certifiedInstructors",
      label: "Certified instructors",
      placeholder: "Who is certified and what level",
      kind: "textarea",
      required: true,
    },
    {
      key: "riskMitigation",
      label: "Risk mitigation",
      placeholder: "Concrete steps to reduce risk",
      kind: "textarea",
      required: true,
    },
  ],
  vision: [
    {
      key: "oneSeasonVsAnnual",
      label: "One-season vs annual",
      placeholder: "One season pilot or annual program",
      kind: "input",
      required: true,
    },
    {
      key: "expansionPlan",
      label: "Expansion plan",
      placeholder: "How you scale beyond the first cohort",
      kind: "textarea",
      required: true,
    },
    {
      key: "futureExpeditionTeam",
      label: "Future expedition team",
      placeholder: "How alumni move into expedition teams",
      kind: "textarea",
      required: true,
    },
    {
      key: "sustainabilityPlan",
      label: "Sustainability plan",
      placeholder: "How this continues financially and operationally",
      kind: "textarea",
      required: true,
    },
  ],
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function isFilled(v: string) {
  return v.trim().length > 0;
}

function stepCompleteness(data: DataModel, key: StepKey) {
  const defs = fieldsByStep[key] as Array<FieldDef<StepKey>>;
  const total = defs.length;
  const filled = defs.filter((f) => {
    const value = (data[key] as any)[f.key] as string;
    return isFilled(value);
  }).length;
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}

function overallCompleteness(data: DataModel) {
  const vals = steps.map((s) => stepCompleteness(data, s.key));
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg);
}

function validateStep(data: DataModel, key: StepKey) {
  const defs = fieldsByStep[key] as Array<FieldDef<StepKey>>;
  const missing: string[] = [];
  defs.forEach((f) => {
    if (!f.required) return;
    const value = (data[key] as any)[f.key] as string;
    if (!isFilled(value)) missing.push(f.label);
  });
  return { ok: missing.length === 0, missing };
}

function pickBullets(data: DataModel) {
  const pool: Array<{ label: string; value: string }> = [
    { label: "Barriers", value: data.problem.barriers },
    { label: "Safety gaps", value: data.problem.safetyGaps },
    { label: "Program", value: data.program.finalExpeditionGoal },
    { label: "Safety", value: data.program.safetyProtocols },
    { label: "Impact", value: data.impact.metricsList },
    { label: "Sponsor benefits", value: data.visibility.sponsorBenefitsList },
    { label: "Partners", value: data.partnerships.statusNotes },
    { label: "Risk mitigation", value: data.legalRisk.riskMitigation },
    { label: "Vision", value: data.vision.expansionPlan },
  ];

  const bullets = pool
    .map((p) => {
      const cleaned = p.value.trim();
      if (!cleaned) return null;
      const firstLine = cleaned.split("\n").map((x) => x.trim()).filter(Boolean)[0] ?? cleaned;
      const shortened = firstLine.length > 120 ? `${firstLine.slice(0, 117)}...` : firstLine;
      return `${p.label}: ${shortened}`;
    })
    .filter(Boolean) as string[];

  return bullets.slice(0, 5);
}

function gradientButtonClass(extra?: string) {
  return cx(
    "relative overflow-hidden border border-white/10 text-white",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "hover:brightness-110 active:brightness-95",
    "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.35)]",
    extra
  );
}

function glassCardClass(extra?: string) {
  return cx(
    "rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur",
    "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.55)]",
    extra
  );
}

async function postSubmission(payload: any) {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => "");
  if (!res.ok) {
    return { ok: false as const, skipped: false as const, message: text || `HTTP ${res.status}` };
  }
  return { ok: true as const, skipped: false as const, message: text || "Saved." };
}

export default function WomenAlpineSponsorKitBuilder() {
  const [data, setData] = React.useState<DataModel>(emptyData);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>("");

  // Per-step save status (for UI feedback)
  const [submitted, setSubmitted] = React.useState<Record<StepKey, boolean>>({
    coreIdentity: false,
    problem: false,
    audience: false,
    program: false,
    budget: false,
    impact: false,
    visibility: false,
    partnerships: false,
    legalRisk: false,
    vision: false,
  });

  const [submitState, setSubmitState] = React.useState<{
    status: "idle" | "saving" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const activeStep = steps[activeIndex];
  const activeKey = activeStep.key;

  const filteredSteps = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return steps;
    return steps.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.instruction.toLowerCase().includes(q)
    );
  }, [query]);

  const overall = overallCompleteness(data);
  const stepPct = stepCompleteness(data, activeKey);
  const validation = validateStep(data, activeKey);

  const goPrev = React.useCallback(() => {
    setActiveIndex((i) => clamp(i - 1, 0, steps.length - 1));
    setSubmitState({ status: "idle", message: "" });
  }, []);

  const goNext = React.useCallback(() => {
    setActiveIndex((i) => clamp(i + 1, 0, steps.length - 1));
    setSubmitState({ status: "idle", message: "" });
  }, []);

  function onPickStep(key: StepKey) {
    const idx = steps.findIndex((s) => s.key === key);
    if (idx >= 0) {
      setActiveIndex(idx);
      setSubmitState({ status: "idle", message: "" });
    }
  }

  function updateField(stepKey: StepKey, fieldKey: string, value: string) {
    setData((prev) => ({
      ...prev,
      [stepKey]: {
        ...(prev as any)[stepKey],
        [fieldKey]: value,
      },
    }));
  }

  function resetDraft() {
    setData(emptyData);
    setSubmitted({
      coreIdentity: false,
      problem: false,
      audience: false,
      program: false,
      budget: false,
      impact: false,
      visibility: false,
      partnerships: false,
      legalRisk: false,
      vision: false,
    });
    setSubmitState({ status: "idle", message: "" });
    setActiveIndex(0);
    setQuery("");
  }

  async function submitCurrentStep() {
    const check = validateStep(data, activeKey);
    if (!check.ok) {
      setSubmitState({
        status: "error",
        message: `Missing required: ${check.missing.join(", ")}`,
      });
      return;
    }

    setSubmitState({ status: "saving", message: "Saving…" });

    const payload = {
      submittedAt: new Date().toISOString(),
      stepKey: activeKey,
      stepTitle: activeStep.title,
      stepCompleteness: stepCompleteness(data, activeKey),
      overallCompleteness: overallCompleteness(data),
      data: data[activeKey],
      fullDraft: data, // save everything each time (latest snapshot)
    };

    try {
      const res = await postSubmission(payload);
      if (!res.ok) {
        setSubmitState({ status: "error", message: res.message || "Save failed." });
        return;
      }
      setSubmitted((p) => ({ ...p, [activeKey]: true }));
      setSubmitState({ status: "success", message: "Saved ✅" });
    } catch (e: any) {
      setSubmitState({
        status: "error",
        message: e?.message ? String(e.message) : "Save failed.",
      });
    }
  }

  const preview = React.useMemo(() => {
    const name = data.coreIdentity.officialName || "Women Alpine School";
    const cohort = data.audience.womenPerYear || "—";
    const duration = data.program.duration || "—";
    const budget = data.budget.totalEstimate || "—";
    const bullets = pickBullets(data);

    return {
      name,
      cohort,
      duration,
      budget,
      bullets,
    };
  }, [data]);

  const stepIconMap: Record<StepKey, React.ReactNode> = {
    coreIdentity: <MountainSnow className="h-4 w-4" />,
    problem: <Target className="h-4 w-4" />,
    audience: <Users className="h-4 w-4" />,
    program: <ListChecks className="h-4 w-4" />,
    budget: <Wallet className="h-4 w-4" />,
    impact: <Ruler className="h-4 w-4" />,
    visibility: <ImageIcon className="h-4 w-4" />,
    partnerships: <Handshake className="h-4 w-4" />,
    legalRisk: <ShieldAlert className="h-4 w-4" />,
    vision: <Sparkles className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-200">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/40 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-slate-950/60">
              <MountainSnow className="h-4 w-4 text-slate-200" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Women Alpine School – Sponsor Kit Builder</div>
              <div className="text-xs text-slate-400">Aim for 80%+ before approaching sponsors.</div>
            </div>
          </div>

          <div className="ml-auto flex w-[520px] flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Overall completeness</span>
              <span className="font-medium text-white">{overall}%</span>
            </div>
            <Progress value={overall} />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Badge
              className={cx(
                "border border-white/10 bg-slate-950/60 text-slate-200",
                overall >= 80 && "bg-emerald-500/10 text-emerald-200 border-emerald-400/20"
              )}
            >
              {overall >= 80 ? "Sponsor-ready range" : "Draft"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-[320px_1fr_420px] gap-6 px-6 py-6">
        {/* Left sidebar */}
        <Card className={glassCardClass("h-[calc(100vh-112px)]")}>
          <div className="flex h-full flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections…"
                  className="pl-9 bg-slate-950/40 border-white/10 text-slate-200 placeholder:text-slate-500"
                />
              </div>
            </div>
            <Separator className="bg-white/10" />

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredSteps.map((s) => {
                  const pct = stepCompleteness(data, s.key);
                  const isActive = s.key === activeKey;
                  const done = submitted[s.key];
                  return (
                    <button
                      key={s.key}
                      onClick={() => onPickStep(s.key)}
                      className={cx(
                        "w-full rounded-2xl px-3 py-3 text-left transition",
                        "border border-transparent hover:border-white/10 hover:bg-white/5",
                        isActive && "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cx(
                            "mt-0.5 grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-slate-950/60",
                            isActive && "bg-slate-950/80"
                          )}
                        >
                          {stepIconMap[s.key]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="truncate text-sm font-semibold text-white">{s.title}</div>
                            {done && (
                              <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                                Submitted
                              </Badge>
                            )}
                          </div>
                          <div className="mt-0.5 truncate text-xs text-slate-400">{s.subtitle}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                              {pct}%
                            </Badge>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-white/40"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>

            <Separator className="bg-white/10" />

            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  variant="secondary"
                  onClick={goNext}
                  disabled={activeIndex === steps.length - 1}
                  className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Center editor */}
        <Card className={glassCardClass("h-[calc(100vh-112px)]")}>
          <div className="flex h-full flex-col">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                      Step {activeIndex + 1} / {steps.length}
                    </Badge>
                    <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                      {stepPct}% complete
                    </Badge>
                    {submitted[activeKey] && (
                      <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                        Submitted
                      </Badge>
                    )}
                  </div>
                  <h1 className="mt-3 text-xl font-semibold text-white">{activeStep.title}</h1>
                  <p className="mt-1 text-sm text-slate-400">{activeStep.instruction}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={resetDraft}
                    className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset draft
                  </Button>
                  <Button
                    onClick={() => alert("Placeholder: sponsor pitch generator will be added here.")}
                    className={gradientButtonClass("h-10")}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate sponsor pitch text
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Separator className="bg-white/10" />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-5 px-6 pb-6">
                {(fieldsByStep[activeKey] as Array<FieldDef<StepKey>>).map((f) => {
                  const value = (data[activeKey] as any)[f.key] as string;
                  const missing =
                    f.required && submitState.status === "error" && !isFilled(value) && !validation.ok;

                  return (
                    <div key={f.key}>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white">
                          {f.label}
                          {f.required ? <span className="ml-1 text-fuchsia-300">*</span> : null}
                        </label>
                        {missing ? (
                          <Badge className="border border-rose-400/20 bg-rose-500/10 text-rose-200">
                            Required
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-2">
                        {f.kind === "input" ? (
                          <Input
                            value={value}
                            onChange={(e) => updateField(activeKey, f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className={cx(
                              "bg-slate-950/40 border-white/10 text-slate-200 placeholder:text-slate-500",
                              missing && "border-rose-400/40"
                            )}
                          />
                        ) : (
                          <Textarea
                            value={value}
                            onChange={(e) => updateField(activeKey, f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className={cx(
                              "min-h-[110px] bg-slate-950/40 border-white/10 text-slate-200 placeholder:text-slate-500",
                              missing && "border-rose-400/40"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                <Separator className="bg-white/10" />

                {/* Validation + Submit */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {submitState.status === "idle" ? (
                      <div className="text-sm text-slate-400">
                        Submit this step to store it (and snapshot the full draft).
                      </div>
                    ) : submitState.status === "saving" ? (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {submitState.message}
                      </div>
                    ) : submitState.status === "success" ? (
                      <div className="flex items-center gap-2 text-sm text-emerald-200">
                        <CheckCircle2 className="h-4 w-4" />
                        {submitState.message}
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-sm text-rose-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4" />
                        <span className="break-words">{submitState.message}</span>
                      </div>
                    )}

                    {!validation.ok ? (
                      <div className="mt-2 text-xs text-slate-500">
                        Required fields missing:{" "}
                        <span className="text-slate-300">{validation.missing.join(", ")}</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-500">
                        All required fields look good.
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => alert("Placeholder: will generate a 1-page pitch text block.")}
                      className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview pitch text
                    </Button>

                    <Button
                      onClick={submitCurrentStep}
                      disabled={submitState.status === "saving"}
                      className={gradientButtonClass("h-10")}
                    >
                      {submitState.status === "saving" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Submit this step
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Storage note</div>
                      <div className="mt-1 text-xs text-slate-400">
                        If <span className="text-slate-200">VITE_SHEETS_ENDPOINT</span> is set, submissions will be posted
                        to your Google Apps Script Web App. Otherwise, it only marks the step as submitted in the UI.
                      </div>
                    </div>
                    <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                      No localStorage
                    </Badge>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Right preview */}
        <div className="space-y-6">
          <Card className={glassCardClass()}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">Sponsor-ready preview</div>
                  <div className="mt-1 text-xs text-slate-400">
                    1-page pitch draft (auto-summarized from filled data)
                  </div>
                </div>
                <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                  Live
                </Badge>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="space-y-4">
                <div>
                  <div className="text-lg font-semibold text-white">{preview.name}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Cohort size: <span className="text-slate-200">{preview.cohort}</span> • Duration:{" "}
                    <span className="text-slate-200">{preview.duration}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    Total budget estimate: <span className="text-slate-200">{preview.budget}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold text-white">Highlights</div>
                  {preview.bullets.length === 0 ? (
                    <div className="mt-2 text-sm text-slate-500">
                      Fill a few sections to see 3–5 bullet highlights here.
                    </div>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {preview.bullets.map((b, idx) => (
                        <li key={idx} className="text-sm text-slate-300">
                          • {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold text-white">Sponsor ask (placeholder)</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Your tiers will appear here once filled in <span className="text-slate-200">Budget reality</span>.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={glassCardClass()}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">Suggested sponsors</div>
                  <div className="mt-1 text-xs text-slate-400">Placeholder list</div>
                </div>
                <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                  Draft
                </Badge>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="space-y-2">
                {[
                  "Outdoor gear brand (equipment tier)",
                  "Local bank or fintech (women empowerment)",
                  "Tourism / travel company (storytelling + reach)",
                  "University partner (student cohort support)",
                  "Media partner (visibility + PR)",
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2"
                  >
                    <div className="text-sm text-slate-300">{s}</div>
                    <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                      Draft
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={() => alert("Placeholder: generate 1-page PDF.")}
              className="h-11 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Generate 1-page PDF
            </Button>

            <Button
              onClick={() => alert("Placeholder: export full proposal (10–15 pages).")}
              className={gradientButtonClass("h-11")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export full proposal
            </Button>
          </div>

          <Card className={glassCardClass("p-5")}>
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 text-slate-300" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">Tip</div>
                <div className="mt-1 text-xs text-slate-400">
                  Sponsors don’t fund dreams — they fund clarity. Fill budget + impact + visibility early.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-[1600px] px-6 pb-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Theme:</span> dark glass • bg #070A12 • cards slate-950/60
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Endpoint:</span>{" "}
            <span className="text-slate-200">
              /api/submit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
