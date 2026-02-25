import React, { useMemo, useState } from "react";
import {
  Mountain,
  Shield,
  Users,
  LayoutGrid,
  Coins,
  BarChart3,
  Camera,
  Handshake,
  Scale,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Wand2,
  FileDown,
  PackageOpen,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    percentWomenInAlpinism: string;
    estimateAndSource: string;
    barriers: string;
    safetyGaps: string;
    mediaVisibilityGap: string;
    evidenceLinks: string;
  };
  audience: {
    ageRange: string;
    level: string;
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
    outdoorShopsStatus: string;
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
    percentWomenInAlpinism: "",
    estimateAndSource: "",
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
    outdoorShopsStatus: "",
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

type StepDef = {
  key: StepKey;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  instruction: string;
};

const steps: StepDef[] = [
  {
    key: "coreIdentity",
    title: "ბირთვული იდენტობა",
    subtitle: "ფუნდამენტი",
    icon: <Mountain className="h-4 w-4" />,
    instruction: "დააფიქსირე საფუძველი: ვინ ხარ, ლეგიტიმაცია და გამოცდილება.",
  },
  {
    key: "problem",
    title: "პრობლემა",
    subtitle: "რატომ არის ეს მნიშვნელოვანი",
    icon: <Shield className="h-4 w-4" />,
    instruction: "განსაზღვრე ხარვეზი: წარმომადგენლობა, ბარიერები, უსაფრთხოება და მტკიცებულება.",
  },
  {
    key: "audience",
    title: "სამიზნე აუდიტორია",
    subtitle: "ვის ემსახურები",
    icon: <Users className="h-4 w-4" />,
    instruction: "დააზუსტე კოჰორტის პროფილი და წლიური მოცვა.",
  },
  {
    key: "program",
    title: "პროგრამის სტრუქტურა",
    subtitle: "როგორ მუშაობს",
    icon: <LayoutGrid className="h-4 w-4" />,
    instruction: "გაწერე გრაფიკი, ფორმატი, უსაფრთხოება და ფინალური მიზანი.",
  },
  {
    key: "budget",
    title: "ბიუჯეტის რეალობა",
    subtitle: "რა ღირს",
    icon: <Coins className="h-4 w-4" />,
    instruction: "აქციე აქტივობები რიცხვებად: აღჭურვილობა, ოპერაციები, მედია, რეზერვი, ტიერები.",
  },
  {
    key: "impact",
    title: "ზემოქმედების გაზომვა",
    subtitle: "მტკიცებულება და რეპორტინგი",
    icon: <BarChart3 className="h-4 w-4" />,
    instruction: "განსაზღვრე მეტრიკები, მიზნები, გაზომვის მეთოდები და პერიოდულობა.",
  },
  {
    key: "visibility",
    title: "ხილვადობის აქტივები",
    subtitle: "რას იღებს სპონსორი",
    icon: <Camera className="h-4 w-4" />,
    instruction: "ჩამოთვალე არხები, აქტივები, ბენეფიტები და კონტენტ-გეგმა.",
  },
  {
    key: "partnerships",
    title: "პარტნიორობები",
    subtitle: "სანდოობის ქსელი",
    icon: <Handshake className="h-4 w-4" />,
    instruction: "დოკუმენტირებ პარტნიორები და სტატუსი: კონტაქტი/დადასტურებული.",
  },
  {
    key: "legalRisk",
    title: "იურიდიული და რისკები",
    subtitle: "უსაფრთხოება და შესაბამისობა",
    icon: <Scale className="h-4 w-4" />,
    instruction: "შეაჯამე დოკუმენტები, დაზღვევა, საგანგებო გეგმა და რისკის შემცირება.",
  },
  {
    key: "vision",
    title: "გრძელვადიანი ხედვა",
    subtitle: "საით მიდის",
    icon: <Sparkles className="h-4 w-4" />,
    instruction: "აჩვენე რეალისტური ტრაექტორია: წლიური მოდელი, გაფართოება, მდგრადობა.",
  },
];

type FieldDef = {
  key: string;
  label: string;
  placeholder: string;
  type: "input" | "textarea";
};

const fieldsByStep: Record<StepKey, FieldDef[]> = {
  coreIdentity: [
    { key: "officialName", label: "ოფიციალური დასახელება", placeholder: "ქალთა ალპური სკოლა", type: "input" },
    { key: "legalForm", label: "იურიდიული ფორმა", placeholder: "NGO / ასოციაცია / კომპანია / არაოფიციალური ჯგუფი", type: "input" },
    { key: "founders", label: "დამფუძნებლები", placeholder: "სახელები, როლები, მოკლე სანდოობის ხაზი", type: "textarea" },
    { key: "instructorCertifications", label: "ინსტრუქტორების სერტიფიკაციები", placeholder: "სერტიფიკაციები, ორგანოები, წლები", type: "textarea" },
    { key: "yearsOperating", label: "რამდენი წელია ფუნქციონირებს", placeholder: "მაგ., 2 წელი (2024-დან)", type: "input" },
    {
      key: "previousExpeditionsHistory",
      label: "წინა ექსპედიციები / ტრენინგების ისტორია",
      placeholder: "წინა კურსები, მარშრუტები, პარტნიორები, შედეგები (ბულეტებიც შეიძლება)",
      type: "textarea",
    },
  ],
  problem: [
    { key: "percentWomenInAlpinism", label: "ქალების % ალპინიზმში", placeholder: "მაგ., 15% (ან დატოვე ცარიელი)", type: "input" },
    {
      key: "estimateAndSource",
      label: "შეფასება + წყარო (თუ უცნობია)",
      placeholder: "მაგ., შეფასება: 10–20% ფედერაციის წევრობის სტატისტიკაზე დაყრდნობით + ბმული",
      type: "textarea",
    },
    { key: "barriers", label: "ბარიერები (სოციალური / ფინანსური / კულტურული)", placeholder: "ჩამოწერე რეალური ბლოკერები", type: "textarea" },
    { key: "safetyGaps", label: "უსაფრთხოების ხარვეზები", placeholder: "წვდომა, ტრენინგი, მენტორინგი, პროტოკოლები", type: "textarea" },
    { key: "mediaVisibilityGap", label: "მედია ხილვადობის ხარვეზი", placeholder: "რა აკლია გაშუქებას და წარმომადგენლობას", type: "textarea" },
    { key: "evidenceLinks", label: "მტკიცებულება / ბმულები", placeholder: "ბმულები, კვლევები, ფედერაციის ანგარიშები, სტატიები", type: "textarea" },
  ],
  audience: [
    { key: "ageRange", label: "ასაკობრივი დიაპაზონი", placeholder: "მაგ., 18–35", type: "input" },
    { key: "level", label: "დამწყები / საშუალო / შერეული", placeholder: "დამწყები / საშუალო / შერეული", type: "input" },
    { key: "urbanRural", label: "ქალაქი / სოფელი", placeholder: "ქალაქი / სოფელი / შერეული", type: "input" },
    { key: "studentProfessional", label: "სტუდენტი / პროფესიონალი", placeholder: "სტუდენტი / პროფესიონალი / შერეული", type: "input" },
    { key: "womenPerYear", label: "ქალები წელიწადში", placeholder: "მაგ., 40 მონაწილე წელიწადში", type: "input" },
  ],
  program: [
    { key: "duration", label: "ხანგრძლივობა", placeholder: "მაგ., 12 კვირა", type: "input" },
    { key: "trainingDaysPerMonth", label: "სატრენინგო დღეები / თვეში", placeholder: "მაგ., 6 დღე/თვეში", type: "input" },
    { key: "indoorOutdoor", label: "შიდა / გარე", placeholder: "შიდა + გარე განაწილება", type: "input" },
    { key: "highAltitudeComponent", label: "მაღალმთიანი კომპონენტი", placeholder: "თუ არის, აღწერე სიმაღლე და გეგმა", type: "textarea" },
    { key: "finalExpeditionGoal", label: "ფინალური ექსპედიციის მიზანი", placeholder: "პიკი / მარშრუტი / მიზანი + კრიტერიუმები", type: "textarea" },
    { key: "safetyProtocols", label: "უსაფრთხოების პროტოკოლები", placeholder: "აღჭურვილობის შემოწმება, buddy სისტემა, rescue გეგმა, სკრინინგი და ა.შ.", type: "textarea" },
  ],
  budget: [
    {
      key: "equipmentListWithQty",
      label: "აღჭურვილობის სია (რაოდენობით)",
      placeholder: "მაგ., აღკაზმულობა x20, ჩაფხუტი x20, თოკი x6 (ერთი ხაზზე ერთი)",
      type: "textarea",
    },
    { key: "operationalCosts", label: "ოპერაციული ხარჯები", placeholder: "სივრცე, ტრანსპორტი, პერსონალი, ნებართვები და ა.შ.", type: "textarea" },
    { key: "mediaProduction", label: "მედია წარმოება", placeholder: "ფოტო/ვიდეო, მონტაჟი, დიზაინერი, დისტრიბუცია", type: "textarea" },
    { key: "emergencyReserve", label: "საგანგებო რეზერვი", placeholder: "მაგ., 10% კონტინგენტური რეზერვი", type: "input" },
    { key: "totalEstimate", label: "სრული შეფასება", placeholder: "მაგ., $38,000", type: "input" },
    { key: "sponsorshipTiers", label: "სპონსორობის ტიერები", placeholder: "ტიერის სახელი + თანხა + ბენეფიტები (ერთი ხაზზე ერთი)", type: "textarea" },
  ],
  impact: [
    { key: "metricsList", label: "მეტრიკების სია", placeholder: "მაგ., კურსდამთავრებულები, მცდელობები, სერტიფიკაციები, რეტენცია", type: "textarea" },
    { key: "targets", label: "მიზნები", placeholder: "მაგ., 40 ქალი, 80% დასრულება, 0 სერიოზული ინციდენტი", type: "textarea" },
    { key: "howToMeasure", label: "როგორ იზომება", placeholder: "სერვეები, ლოგები, დასწრება, უნარების შეფასება", type: "textarea" },
    { key: "reportingCadence", label: "რეპორტინგის პერიოდულობა", placeholder: "მაგ., ყოველთვიური განახლება + სეზონის ბოლოს ანგარიში", type: "input" },
  ],
  visibility: [
    { key: "instagram", label: "Instagram", placeholder: "ჰენდლი ან ბმული", type: "input" },
    { key: "website", label: "ვებგვერდი", placeholder: "ბმული", type: "input" },
    { key: "logoBranding", label: "ლოგო / ბრენდინგი", placeholder: "სტატუსი: მზადაა / პროცესშია / საჭიროა", type: "input" },
    { key: "photoVideoAssets", label: "ფოტო / ვიდეო აქტივები", placeholder: "რა გაქვს (ან რა უნდა შეიქმნას)", type: "textarea" },
    { key: "pressContacts", label: "პრეს-კონტაქტები", placeholder: "კონტაქტები/მედია ან გეგმა პრესთან გასასვლელად", type: "textarea" },
    { key: "sponsorBenefitsList", label: "სპონსორის ბენეფიტების სია", placeholder: "ლოგოს განთავსება, გამოსვლა, პოსტები, პრეს-მოხსენიება და ა.შ.", type: "textarea" },
    { key: "contentPlan", label: "კონტენტის გეგმა", placeholder: "სიხშირე + ფორმატები + სეზონის სთორილაინი", type: "textarea" },
  ],
  partnerships: [
    { key: "localGuides", label: "ადგილობრივი გიდები (სტატუსი)", placeholder: "კონტაქტი / დადასტურებული + სახელები", type: "textarea" },
    { key: "rescueServices", label: "სამაშველო სერვისები (სტატუსი)", placeholder: "კონტაქტი / დადასტურებული + დეტალები", type: "textarea" },
    { key: "federations", label: "ფედერაციები (სტატუსი)", placeholder: "კონტაქტი / დადასტურებული + დეტალები", type: "textarea" },
    { key: "womenNGOs", label: "ქალთა NGO-ები (სტატუსი)", placeholder: "კონტაქტი / დადასტურებული + დეტალები", type: "textarea" },
    { key: "universities", label: "უნივერსიტეტები (სტატუსი)", placeholder: "კონტაქტი / დადასტურებული + დეტალები", type: "textarea" },
    { key: "outdoorShopsStatus", label: "Outdoor მაღაზიები + სტატუსი", placeholder: "მაღაზია + კონტაქტი/დადასტურებული + მოთხოვნა", type: "textarea" },
  ],
  legalRisk: [
    { key: "waivers", label: "უეივერები", placeholder: "მონაწილეთა პასუხისმგებლობის უარყოფა და თანხმობა", type: "textarea" },
    { key: "insurance", label: "დაზღვევა", placeholder: "ტიპი, პროვაიდერი, დაფარვის მოცვა", type: "textarea" },
    { key: "emergencyProtocol", label: "საგანგებო პროტოკოლი", placeholder: "ნაბიჯ-ნაბიჯ რეაგირების გეგმა", type: "textarea" },
    { key: "certifiedInstructors", label: "სერტიფიცირებული ინსტრუქტორები", placeholder: "ვინ არის სერტიფიცირებული და რაში", type: "textarea" },
    { key: "riskMitigation", label: "რისკის შემცირება", placeholder: "ტრენინგი, სკრინინგი, მარშრუტები, ამინდის პოლიტიკა", type: "textarea" },
  ],
  vision: [
    { key: "oneSeasonVsAnnual", label: "ერთ-სეზონიანი vs წლიური", placeholder: "რა არის მოდელი და რატომ", type: "textarea" },
    { key: "expansionPlan", label: "გაფართოების გეგმა", placeholder: "კოჰორტების/რეგიონების/კურსების სკეილინგი", type: "textarea" },
    { key: "futureExpeditionTeam", label: "მომავალი ექსპედიციის გუნდი", placeholder: "როგორ შექმნი და დაუჭერ მხარს advanced გუნდს", type: "textarea" },
    { key: "sustainabilityPlan", label: "მდგრადობის გეგმა", placeholder: "ფინანსური მოდელი, პარტნიორობები, აღჭურვილობის ციკლი", type: "textarea" },
  ],
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function isFilled(v: unknown) {
  if (typeof v === "string") return v.trim().length > 0;
  return Boolean(v);
}

function percentFilled(obj: Record<string, unknown>) {
  const keys = Object.keys(obj);
  if (keys.length === 0) return 0;
  const filled = keys.reduce((acc, k) => acc + (isFilled(obj[k]) ? 1 : 0), 0);
  return Math.round((filled / keys.length) * 100);
}

function pickFirstNonEmpty(...vals: Array<string | undefined>) {
  for (const v of vals) {
    if (v && v.trim().length > 0) return v.trim();
  }
  return "";
}

function normalizeLine(v: string) {
  return v.replace(/\s+/g, " ").trim();
}

export default function WomenAlpineSponsorKitBuilder() {
  const [data, setData] = useState<DataModel>({ ...emptyData });
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = steps[activeIndex];

  const stepCompleteness = useMemo(() => {
    const map: Record<StepKey, number> = {
      coreIdentity: percentFilled(data.coreIdentity as unknown as Record<string, unknown>),
      problem: percentFilled(data.problem as unknown as Record<string, unknown>),
      audience: percentFilled(data.audience as unknown as Record<string, unknown>),
      program: percentFilled(data.program as unknown as Record<string, unknown>),
      budget: percentFilled(data.budget as unknown as Record<string, unknown>),
      impact: percentFilled(data.impact as unknown as Record<string, unknown>),
      visibility: percentFilled(data.visibility as unknown as Record<string, unknown>),
      partnerships: percentFilled(data.partnerships as unknown as Record<string, unknown>),
      legalRisk: percentFilled(data.legalRisk as unknown as Record<string, unknown>),
      vision: percentFilled(data.vision as unknown as Record<string, unknown>),
    };
    return map;
  }, [data]);

  const overallCompleteness = useMemo(() => {
    const values = steps.map((s) => stepCompleteness[s.key]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(avg);
  }, [stepCompleteness]);

  const filteredSteps = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return steps;
    return steps.filter((s) => `${s.title} ${s.subtitle}`.toLowerCase().includes(q));
  }, [search]);

  const onChangeField = (stepKey: StepKey, fieldKey: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [stepKey]: {
        ...(prev as any)[stepKey],
        [fieldKey]: value,
      },
    }));
  };

  const goPrev = () => setActiveIndex((i) => clamp(i - 1, 0, steps.length - 1));
  const goNext = () => setActiveIndex((i) => clamp(i + 1, 0, steps.length - 1));

  const resetDraft = () => setData({ ...emptyData });

  const previewName = pickFirstNonEmpty(data.coreIdentity.officialName, "ქალთა ალპური სკოლა");
  const previewCohort = pickFirstNonEmpty(data.audience.womenPerYear, "კოჰორტის ზომა არ არის მითითებული");
  const previewDuration = pickFirstNonEmpty(data.program.duration, "პროგრამის ხანგრძლივობა არ არის მითითებული");
  const previewBudget = pickFirstNonEmpty(data.budget.totalEstimate, "ბიუჯეტი არ არის მითითებული");
  const previewLocation = pickFirstNonEmpty("", "ლოკაცია არ არის მითითებული");

  const bulletCandidates = useMemo(() => {
    const candidates: string[] = [];
    const add = (s: string) => {
      const t = normalizeLine(s);
      if (t.length > 0) candidates.push(t);
    };

    add(data.problem.barriers ? `ბარიერები, რომელთა გადალახვაც ხდება: ${data.problem.barriers}` : "");
    add(data.problem.safetyGaps ? `უსაფრთხოების ფოკუსი: ${data.problem.safetyGaps}` : "");
    add(data.program.safetyProtocols ? `უსაფრთხოების პროტოკოლები: ${data.program.safetyProtocols}` : "");
    add(data.program.finalExpeditionGoal ? `ფინალური მიზანი: ${data.program.finalExpeditionGoal}` : "");
    add(data.impact.targets ? `ზემოქმედების მიზნები: ${data.impact.targets}` : "");
    add(data.visibility.sponsorBenefitsList ? `სპონსორის ბენეფიტები: ${data.visibility.sponsorBenefitsList}` : "");
    add(data.visibility.contentPlan ? `კონტენტის გეგმა: ${data.visibility.contentPlan}` : "");

    const flattened: string[] = [];
    for (const c of candidates) {
      const parts = c
        .split("\n")
        .map((p) => normalizeLine(p))
        .filter((p) => p.length > 0);
      for (const p of parts) flattened.push(p);
    }

    return flattened.slice(0, 5);
  }, [data]);

  const suggestedSponsors = [
    { name: "Outdoor აღჭურვილობის ბრენდი (დრაფტი)", tag: "დრაფტი" },
    { name: "ლოკალური კლაიმბინგ ჯიმი (დრაფტი)", tag: "დრაფტი" },
    { name: "დაზღვევის პარტნიორი (დრაფტი)", tag: "დრაფტი" },
    { name: "ქალთა გაძლიერების NGO (დრაფტი)", tag: "დრაფტი" },
    { name: "Adventure მედია (დრაფტი)", tag: "დრაფტი" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#070A12] text-slate-200">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-4">
          <div className="flex w-full items-center gap-4">
            <div className="min-w-[220px]">
              <div className="text-sm font-medium text-white">საერთო შევსებულობა</div>
              <div className="text-xs text-slate-400">სპონსორებთან მისვლამდე მიზნად დაისახე 80%+.</div>
            </div>
            <div className="flex w-full items-center gap-3">
              <Progress value={overallCompleteness} className="h-2 bg-white/10" />
              <Badge variant="secondary" className="border border-white/10 bg-slate-950/60 text-slate-200">
                {overallCompleteness}%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-[320px_1fr_420px] gap-5 px-6 py-6">
        <Card className="h-[calc(100vh-110px)] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">სპონსორის პაკეტის კონსტრუქტორი</CardTitle>
            <CardDescription className="text-slate-400">
              ააწყე სპონსორისთვის მზადყოფნაში მყოფი კონცეფციის დოკუმენტი (10–15 გვერდი) + 1-გვერდიანი პიჩი.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="სექციებში ძებნა…"
                className="h-10 border-white/10 bg-white/5 pl-9 text-slate-200 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-white/20"
              />
            </div>

            <Separator className="bg-white/10" />

            <ScrollArea className="flex-1 pr-3">
              <div className="flex flex-col gap-2">
                {filteredSteps.map((s) => {
                  const idx = steps.findIndex((x) => x.key === s.key);
                  const isActive = idx === activeIndex;
                  const pct = stepCompleteness[s.key];

                  return (
                    <button
                      key={s.key}
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "group flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition",
                        isActive
                          ? "border-white/20 bg-white/5"
                          : "border-white/10 bg-transparent hover:border-white/20 hover:bg-white/5",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl border",
                          isActive ? "border-white/20 bg-white/5" : "border-white/10 bg-white/5",
                        ].join(" ")}
                      >
                        <div className="text-slate-200">{s.icon}</div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate text-sm font-semibold text-white">{s.title}</div>
                          <Badge
                            variant="secondary"
                            className={[
                              "shrink-0 border text-xs",
                              pct >= 80
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                                : "border-white/10 bg-slate-950/60 text-slate-300",
                            ].join(" ")}
                          >
                            {pct}%
                          </Badge>
                        </div>
                        <div className="truncate text-xs text-slate-400">{s.subtitle}</div>
                      </div>
                    </button>
                  );
                })}

                {filteredSteps.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    ძებნას შესაბამისი სექცია ვერ მოიძებნა.
                  </div>
                )}
              </div>
            </ScrollArea>

            <Separator className="bg-white/10" />

            <div className="grid grid-cols-2 gap-2 pb-1">
              <Button
                variant="secondary"
                onClick={() => setActiveIndex((i) => clamp(i - 1, 0, steps.length - 1))}
                disabled={activeIndex === 0}
                className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                უკან
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActiveIndex((i) => clamp(i + 1, 0, steps.length - 1))}
                disabled={activeIndex === steps.length - 1}
                className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
              >
                შემდეგ
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-110px)] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <CardTitle className="truncate text-white">{activeStep.title}</CardTitle>
                <CardDescription className="text-slate-400">{activeStep.instruction}</CardDescription>
              </div>

              <Badge variant="secondary" className="border border-white/10 bg-slate-950/60 text-slate-200" title="Step completeness">
                {stepCompleteness[activeStep.key]}%
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-4">
            <ScrollArea className="flex-1 pr-3">
              <div className="space-y-4 pb-2">
                {fieldsByStep[activeStep.key].map((f) => {
                  const value = (data as any)[activeStep.key][f.key] as string;

                  return (
                    <div key={f.key} className="space-y-2">
                      <div className="text-sm font-medium text-white">{f.label}</div>
                      {f.type === "input" ? (
                        <Input
                          value={value}
                          onChange={(e) => onChangeField(activeStep.key, f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="h-10 border-white/10 bg-white/5 text-slate-200 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                      ) : (
                        <Textarea
                          value={value}
                          onChange={(e) => onChangeField(activeStep.key, f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="min-h-[110px] resize-y border-white/10 bg-white/5 text-slate-200 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <Separator className="bg-white/10" />

            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <Button
                variant="secondary"
                onClick={resetDraft}
                className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                დრაფტის განულება
              </Button>

              <Button
                onClick={() => {
                  // Placeholder generation hook
                  // eslint-disable-next-line no-console
                  console.log("Generate sponsor pitch text (placeholder)");
                }}
                className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                სპონსორის პიჩის ტექსტის გენერაცია
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex h-[calc(100vh-110px)] flex-col gap-5">
          <Card className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">სპონსორისთვის მზადყოფნაში მყოფი პრევიუ</CardTitle>
              <CardDescription className="text-slate-400">1-გვერდიანი პიჩის დრაფტი (ცოცხალი შეჯამება)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">{previewName}</div>
                <div className="mt-1 text-sm text-slate-400">{previewLocation}</div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-xs text-slate-400">კოჰორტა</div>
                    <div className="mt-1 text-sm font-medium text-slate-200">{previewCohort}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-xs text-slate-400">ხანგრძლივობა</div>
                    <div className="mt-1 text-sm font-medium text-slate-200">{previewDuration}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-xs text-slate-400">ბიუჯეტი</div>
                    <div className="mt-1 text-sm font-medium text-slate-200">{previewBudget}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-xs text-slate-400">მზაობა</div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={[
                          "border",
                          overallCompleteness >= 80
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                            : "border-white/10 bg-slate-950/60 text-slate-300",
                        ].join(" ")}
                      >
                        {overallCompleteness}%
                      </Badge>
                      <span className="text-xs text-slate-400">საერთო</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-medium text-white">მთავარი პუნქტები</div>
                  <ul className="mt-2 space-y-2">
                    {bulletCandidates.length > 0 ? (
                      bulletCandidates.map((b, i) => (
                        <li key={`${b}-${i}`} className="flex gap-2 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                          <span className="line-clamp-2">{b}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-500">შეავსე რამდენიმე სექცია და აქ გამოჩნდება 3–5 მთავარი პუნქტი.</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">შემოთავაზებული სპონსორები</CardTitle>
              <CardDescription className="text-slate-400">პლასჰოლდერის სია (დრაფტ მიზნები)</CardDescription>
            </CardHeader>
            <CardContent className="flex h-full flex-col gap-4">
              <div className="space-y-2">
                {suggestedSponsors.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-200">{s.name}</div>
                      <div className="text-xs text-slate-500">კონტაქტი არ არის დამყარებული</div>
                    </div>
                    <Badge variant="secondary" className="border border-white/10 bg-slate-950/60 text-slate-300">
                      {s.tag}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Placeholder export hook
                    // eslint-disable-next-line no-console
                    console.log("Generate 1-page PDF (placeholder)");
                  }}
                  className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  1-გვერდიანი PDF-ის გენერაცია
                </Button>

                <Button
                  onClick={() => {
                    // Placeholder export hook
                    // eslint-disable-next-line no-console
                    console.log("Export full proposal (placeholder)");
                  }}
                  className="h-10 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-sm shadow-fuchsia-500/10 hover:opacity-95"
                >
                  <PackageOpen className="mr-2 h-4 w-4" />
                  სრული წინადადების ექსპორტი
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pb-8">
        <div className="text-xs text-slate-500">
          რჩევა: სპონსორებისთვის მთავარია სიცხადე, სანდოობა და გაზომვადი შედეგები. განცხადებები გაამკაცრე და მტკიცებულებით გაამაგრე.
        </div>
      </div>
    </div>
  );
}