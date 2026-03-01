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
    title: "იდენტობა",
    subtitle: "ვინ ხართ ოფიციალურად.",
    instruction:
      "სკოლა, როგორც სანდო ორგანიზაცია სპონსორებისთვის: იურიდიული ფორმა, ლიდერობა და გამოცდილება.",
    icon: <MountainSnow className="h-4 w-4" />,
  },
  {
    key: "problem",
    title: "პრობლემა",
    subtitle: "რომელ ხარვეზს ავსებთ.",
    instruction:
      "პრობლემა გაზომვადი გახადეთ: წარმომადგენლობა, ბარიერები, უსაფრთხოების ხარვეზები და მტკიცებულებების ბმულები.",
    icon: <Target className="h-4 w-4" />,
  },
  {
    key: "audience",
    title: "სამიზნე აუდიტორია",
    subtitle: "ზუსტად ვის ემსახურებით.",
    instruction:
      "ზუსტად აღწერეთ ვინ ერთვება: ასაკი, დონე, ფონი და წლიური ნაკადის მოცულობა.",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "program",
    title: "პროგრამის სტრუქტურა",
    subtitle: "რას აკეთებენ მონაწილეები.",
    instruction:
      "აღწერეთ ტრენინგი: განრიგი, გარემო, სიმაღლეზე კომპონენტები და უსაფრთხოების პროტოკოლები.",
    icon: <ListChecks className="h-4 w-4" />,
  },
  {
    key: "budget",
    title: "ბიუჯეტი",
    subtitle: "ხარჯები და პაკეტები.",
    instruction:
      "ჩამოწერეთ ეკიპირების და ოპერაციული ხარჯები, შემდეგ განსაზღვრეთ სპონსორობის პაკეტები სწრაფი არჩევისთვის.",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    key: "impact",
    title: "ზეგავლენის გაზომვა",
    subtitle: "მტკიცებულება და არა შთაბეჭდილება.",
    instruction:
      "აირჩიეთ მეტრიკები, დასახეთ მიზნები, აღწერეთ გაზომვის მეთოდი და ანგარიშგების სიხშირე.",
    icon: <Ruler className="h-4 w-4" />,
  },
  {
    key: "visibility",
    title: "ხილვადობის რესურსები",
    subtitle: "რას იღებს სპონსორი.",
    instruction:
      "აჩვენეთ თქვენი არხები და შედეგები: ბრენდის მასალები, კონტენტის გეგმა და სპონსორის სარგებელი.",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    key: "partnerships",
    title: "პარტნიორობები",
    subtitle: "ვინ გიჭერთ მხარს.",
    instruction:
      "ჩამოთვალეთ რეალური პარტნიორები და მიმდინარე სტატუსი (დაკავშირებული / დადასტურებული). ეს სწრაფად ზრდის სანდოობას.",
    icon: <Handshake className="h-4 w-4" />,
  },
  {
    key: "legalRisk",
    title: "იურიდიული და რისკი",
    subtitle: "უსაფრთხოება + პასუხისმგებლობა.",
    instruction:
      "დააფიქსირეთ თანხმობის ფორმები, დაზღვევა, საგანგებო პროტოკოლი, სერტიფიცირებული ინსტრუქტორები და რისკის შემცირება.",
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  {
    key: "vision",
    title: "გრძელვადიანი ხედვა",
    subtitle: "სად მიდის ეს შემდეგ.",
    instruction:
      "განსაზღვრეთ, არის თუ არა ეს სეზონური თუ წლიური, როგორ მასშტაბირდება და როგორ ხდება მდგრადი.",
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
      label: "ოფიციალური დასახელება",
      placeholder: "ქალთა ალპური სკოლა (ან თქვენი საბოლოო ოფიციალური სახელი)",
      kind: "input",
      required: true,
    },
    {
      key: "legalForm",
      label: "იურიდიული ფორმა",
      placeholder: "ა(ა)იპ / შპს / არაფორმალური ჯგუფი",
      kind: "input",
      required: true,
    },
    {
      key: "founders",
      label: "დამფუძნებლები",
      placeholder: "სახელები + როლები",
      kind: "textarea",
      required: true,
    },
    {
      key: "instructorCertifications",
      label: "ინსტრუქტორების სერტიფიკაციები",
      placeholder: "სერტიფიკატები, ლიცენზიები, ასოცირებები",
      kind: "textarea",
      required: true,
    },
    {
      key: "yearsOperating",
      label: "მოქმედების წლები",
      placeholder: "მაგ.: 1, 2, 5+ (ან „ამ სეზონიდან ვიწყებთ“)",
      kind: "input",
      required: true,
    },
    {
      key: "previousExpeditionsHistory",
      label: "წინა ექსპედიციების / ტრენინგების ისტორია",
      placeholder: "ჩამოთვალეთ მნიშვნელოვანი ტრენინგები, გასვლები, შედეგები",
      kind: "textarea",
      required: true,
    },
  ],
  problem: [
    {
      key: "womenPercent",
      label: "ალპინიზმში ქალების %",
      placeholder: "თუ ზუსტად არ იცით: მიახლოებითი მონაცემი + წყარო",
      kind: "input",
      required: true,
    },
    {
      key: "barriers",
      label: "ბარიერები (სოციალური / ფინანსური / კულტურული)",
      placeholder: "რა უშლის ქალებს ხელს ალპინიზმში შესვლასა და დარჩენაში?",
      kind: "textarea",
      required: true,
    },
    {
      key: "safetyGaps",
      label: "უსაფრთხოების ხარვეზები",
      placeholder: "ტრენინგის ხარვეზები, რისკ-ფაქტორები, უნარებსა და მენტორობაზე წვდომა",
      kind: "textarea",
      required: true,
    },
    {
      key: "mediaVisibilityGap",
      label: "მედიახილვადობის დეფიციტი",
      placeholder: "რა აკლია გაშუქებაში / როლურ მოდელებში / ამბის თხრობაში?",
      kind: "textarea",
      required: true,
    },
    {
      key: "evidenceLinks",
      label: "მტკიცებულებები / ბმულები",
      placeholder: "ბმულები სტატისტიკაზე, სტატიებზე, ანგარიშებზე ან სარწმუნო დაკვირვებებზე",
      kind: "textarea",
      required: true,
    },
  ],
  audience: [
    {
      key: "ageRange",
      label: "ასაკობრივი დიაპაზონი",
      placeholder: "მაგ.: 18–25, 25–40, შერეული",
      kind: "input",
      required: true,
    },
    {
      key: "level",
      label: "დამწყები / საშუალო / შერეული",
      placeholder: "დამწყები / საშუალო / შერეული",
      kind: "input",
      required: true,
    },
    {
      key: "urbanRural",
      label: "ქალაქი / რეგიონი",
      placeholder: "ქალაქი / რეგიონი / შერეული",
      kind: "input",
      required: true,
    },
    {
      key: "studentProfessional",
      label: "სტუდენტი / პროფესიონალი",
      placeholder: "სტუდენტები / პროფესიონალები / შერეული",
      kind: "input",
      required: true,
    },
    {
      key: "womenPerYear",
      label: "ქალების რაოდენობა წელიწადში",
      placeholder: "მაგ.: 12, 20, 40",
      kind: "input",
      required: true,
    },
  ],
  program: [
    {
      key: "duration",
      label: "პროგრამის ხანგრძლივობა",
      placeholder: "მაგ.: 10 კვირა, 3 თვე, ერთი სეზონი",
      kind: "input",
      required: true,
    },
    {
      key: "trainingDaysPerMonth",
      label: "სავარჯიშო დღეები / თვეში",
      placeholder: "მაგ.: 6–8 დღე/თვეში",
      kind: "input",
      required: true,
    },
    {
      key: "indoorOutdoor",
      label: "დახურული / ღია სივრცე",
      placeholder: "დახურული + ღია სივრცის განაწილება",
      kind: "input",
      required: true,
    },
    {
      key: "highAltitudeComponent",
      label: "მაღალსიმაღლური კომპონენტი",
      placeholder: "კი/არა + დეტალები",
      kind: "textarea",
      required: true,
    },
    {
      key: "finalExpeditionGoal",
      label: "ფინალური ექსპედიციის მიზანი",
      placeholder: "სამიზნე მთა / მარშრუტი / მიღწევა",
      kind: "textarea",
      required: true,
    },
    {
      key: "safetyProtocols",
      label: "უსაფრთხოების პროტოკოლები",
      placeholder: "სამედიცინო შემოწმება, სამაშველო გეგმა, ზედამხედველობა, ეკიპირების შემოწმება",
      kind: "textarea",
      required: true,
    },
  ],
  budget: [
    {
      key: "equipmentListWithQty",
      label: "ეკიპირების სია (რაოდენობით)",
      placeholder: "ქამარი x12, ჩაფხუტი x12, თოკი x2 და ა.შ.",
      kind: "textarea",
      required: true,
    },
    {
      key: "operationalCosts",
      label: "ოპერაციული ხარჯები",
      placeholder: "ტრანსპორტი, ნებართვები, მწვრთნელები, ლოკაციები, ლოჯისტიკა",
      kind: "textarea",
      required: true,
    },
    {
      key: "mediaProduction",
      label: "მედია წარმოება",
      placeholder: "ფოტოგრაფი, ვიდეო, მონტაჟი, დიზაინი",
      kind: "textarea",
      required: true,
    },
    {
      key: "emergencyReserve",
      label: "საგანგებო რეზერვი",
      placeholder: "მაგ.: 10%-იანი ბუფერი ან ფიქსირებული თანხა",
      kind: "input",
      required: true,
    },
    {
      key: "totalEstimate",
      label: "საერთო ბიუჯეტის შეფასება",
      placeholder: "მაგ.: $12,000 ან ₾30,000 (აირჩიეთ ერთი ვალუტა და დაიცავით ერთიანობა)",
      kind: "input",
      required: true,
    },
    {
      key: "sponsorshipTiers",
      label: "სპონსორობის პაკეტები",
      placeholder: "პაკეტების სახელები + თანხები + სარგებელი",
      kind: "textarea",
      required: true,
    },
  ],
  impact: [
    {
      key: "metricsList",
      label: "მეტრიკების სია",
      placeholder: "დასრულების მაჩვენებელი, მიღებული სერტიფიკატები, შესრულებული ექსპედიციები და ა.შ.",
      kind: "textarea",
      required: true,
    },
    {
      key: "targets",
      label: "მიზნები",
      placeholder: "რას ნიშნავს წარმატება ამ სეზონში",
      kind: "textarea",
      required: true,
    },
    {
      key: "howToMeasure",
      label: "როგორ იზომება",
      placeholder: "გამოკითხვები, დასწრების ჩანაწერები, ინსტრუქტორის შეფასებები, სერტიფიკაციები",
      kind: "textarea",
      required: true,
    },
    {
      key: "reportingCadence",
      label: "ანგარიშგების სიხშირე",
      placeholder: "ყოველთვიურად, სეზონის ბოლოს, ექსპედიციაზე",
      kind: "input",
      required: true,
    },
  ],
  visibility: [
    {
      key: "instagram",
      label: "ინსტაგრამი",
      placeholder: "@თქვენი_პროფილი ან ბმული",
      kind: "input",
      required: true,
    },
    {
      key: "website",
      label: "ვებსაიტი",
      placeholder: "თქვენიდომენი.com ან ბმული",
      kind: "input",
      required: true,
    },
    {
      key: "logoBranding",
      label: "ლოგო / ბრენდინგი",
      placeholder: "აღწერეთ მიმდინარე მდგომარეობა და არსებული მასალები",
      kind: "textarea",
      required: true,
    },
    {
      key: "photoVideoAssets",
      label: "ფოტო / ვიდეო რესურსები",
      placeholder: "რაც უკვე გაქვთ (ან რის შექმნასაც გეგმავთ)",
      kind: "textarea",
      required: true,
    },
    {
      key: "pressContacts",
      label: "მედია კონტაქტები",
      placeholder: "ჟურნალისტები, მედიასაშუალებები, PR პარტნიორები",
      kind: "textarea",
      required: true,
    },
    {
      key: "sponsorBenefitsList",
      label: "სპონსორის სარგებლის სია",
      placeholder: "ლოგოს განთავსება, პოსტები, ღონისძიებები, აღჭურვილობის ტესტირება, მოხსენიება",
      kind: "textarea",
      required: true,
    },
    {
      key: "contentPlan",
      label: "კონტენტის გეგმა",
      placeholder: "პოსტინგის სიხშირე, საკვანძო მომენტები, მიწოდებადი მასალა",
      kind: "textarea",
      required: true,
    },
  ],
  partnerships: [
    {
      key: "localGuides",
      label: "ადგილობრივი გიდები",
      placeholder: "სახელები/ორგანიზაციები + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "rescueServices",
      label: "სამაშველო სერვისები",
      placeholder: "ვინ უზრუნველყოფს უსაფრთხოებას + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "federations",
      label: "ფედერაციები",
      placeholder: "ეროვნული/რეგიონული ფედერაციები + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "womenNGOs",
      label: "ქალთა NGO-ები",
      placeholder: "ორგანიზაციები + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "universities",
      label: "უნივერსიტეტები",
      placeholder: "პარტნიორები + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "outdoorShops",
      label: "გარე სპორტის მაღაზიები",
      placeholder: "მაღაზიები/ბრენდები + სტატუსი",
      kind: "textarea",
      required: true,
    },
    {
      key: "statusNotes",
      label: "სტატუსის შენიშვნები",
      placeholder: "დაკავშირებული / დადასტურებული / შემდეგი ნაბიჯები",
      kind: "textarea",
      required: true,
    },
  ],
  legalRisk: [
    {
      key: "waivers",
      label: "თანხმობის ფორმები",
      placeholder: "თანხმობის ფორმების მიდგომა და სავალდებულო ხელმოწერები",
      kind: "textarea",
      required: true,
    },
    {
      key: "insurance",
      label: "დაზღვევა",
      placeholder: "დაზღვევის დაფარვა და პროვაიდერის გეგმა",
      kind: "textarea",
      required: true,
    },
    {
      key: "emergencyProtocol",
      label: "საგანგებო პროტოკოლი",
      placeholder: "საგანგებო გეგმა, ესკალაცია, სამაშველოს კოორდინაცია",
      kind: "textarea",
      required: true,
    },
    {
      key: "certifiedInstructors",
      label: "სერტიფიცირებული ინსტრუქტორები",
      placeholder: "ვინ არის სერტიფიცირებული და რა დონით",
      kind: "textarea",
      required: true,
    },
    {
      key: "riskMitigation",
      label: "რისკის შემცირება",
      placeholder: "რისკის შესამცირებელი კონკრეტული ნაბიჯები",
      kind: "textarea",
      required: true,
    },
  ],
  vision: [
    {
      key: "oneSeasonVsAnnual",
      label: "ერთი სეზონი თუ წლიური",
      placeholder: "ერთსეზონიანი პილოტი თუ წლიური პროგრამა",
      kind: "input",
      required: true,
    },
    {
      key: "expansionPlan",
      label: "გაფართოების გეგმა",
      placeholder: "როგორ მასშტაბირდებით პირველი ნაკადის შემდეგ",
      kind: "textarea",
      required: true,
    },
    {
      key: "futureExpeditionTeam",
      label: "მომავალი ექსპედიციის გუნდი",
      placeholder: "როგორ გადადიან კურსდამთავრებულები ექსპედიციის გუნდებში",
      kind: "textarea",
      required: true,
    },
    {
      key: "sustainabilityPlan",
      label: "მდგრადობის გეგმა",
      placeholder: "როგორ გაგრძელდება ეს ფინანსურად და ოპერაციულად",
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
    { label: "ბარიერები", value: data.problem.barriers },
    { label: "უსაფრთხოების ხარვეზები", value: data.problem.safetyGaps },
    { label: "პროგრამა", value: data.program.finalExpeditionGoal },
    { label: "უსაფრთხოება", value: data.program.safetyProtocols },
    { label: "ზეგავლენა", value: data.impact.metricsList },
    { label: "სპონსორის სარგებელი", value: data.visibility.sponsorBenefitsList },
    { label: "პარტნიორები", value: data.partnerships.statusNotes },
    { label: "რისკის შემცირება", value: data.legalRisk.riskMitigation },
    { label: "ხედვა", value: data.vision.expansionPlan },
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
    "rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/75 to-slate-950/65 backdrop-blur",
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
  return { ok: true as const, skipped: false as const, message: text || "შენახულია." };
}

export default function WomenAlpineSponsorKitBuilder() {
  const [data, setData] = React.useState<DataModel>(emptyData);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>("");
  const [mobileNavOpen, setMobileNavOpen] = React.useState<boolean>(false);
  const [draftId] = React.useState<string>(() => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  });

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
      setMobileNavOpen(false);
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
        message: `სავალდებულო ველები აკლია: ${check.missing.join(", ")}`,
      });
      return;
    }

    setSubmitState({ status: "saving", message: "ინახება…" });

    const payload = {
      timestamp: new Date().toISOString(),
      draftId,
      stepKey: activeKey,
      stepData: data[activeKey],
      fullData: data,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",

      // Compatibility fields for older backend readers.
      submittedAt: new Date().toISOString(),
      stepTitle: activeStep.title,
      stepCompleteness: stepCompleteness(data, activeKey),
      overallCompleteness: overallCompleteness(data),
      data: data[activeKey],
      fullDraft: data,
    };

    try {
      const res = await postSubmission(payload);
      if (!res.ok) {
        setSubmitState({ status: "error", message: res.message || "შენახვა ვერ მოხერხდა." });
        return;
      }
      setSubmitted((p) => ({ ...p, [activeKey]: true }));
      setSubmitState({ status: "success", message: "შენახულია ✅" });
    } catch (e: any) {
      setSubmitState({
        status: "error",
        message: e?.message ? String(e.message) : "შენახვა ვერ მოხერხდა.",
      });
    }
  }

  const preview = React.useMemo(() => {
    const name = data.coreIdentity.officialName || "ქალთა ალპური სკოლა";
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
      <div className="sticky top-0 z-30 border-b border-cyan-400/20 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20">
              <MountainSnow className="h-4 w-4 text-slate-200" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">ქალთა ალპური სკოლა – სპონსორების ქითის კონსტრუქტორი</div>
              <div className="text-xs text-slate-400">სპონსორებთან გასვლამდე მიაღწიეთ 80%+ შევსებას.</div>
            </div>
          </div>

          <div className="w-full flex-1 lg:ml-auto lg:max-w-[520px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">საერთო შევსების დონე</span>
              <span className="font-medium text-white">{overall}%</span>
            </div>
            <Progress value={overall} />
          </div>

          <div className="flex items-center gap-2 lg:justify-end">
            <Badge
              className={cx(
                "border border-cyan-400/25 bg-cyan-500/10 text-cyan-100",
                overall >= 80 && "bg-emerald-500/10 text-emerald-200 border-emerald-400/20"
              )}
            >
              {overall >= 80 ? "სპონსორისთვის მზად" : "დრაფტი"}
            </Badge>
          </div>
        </div>
      </div>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            aria-label="მენიუს დახურვა"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <Card className={glassCardClass("absolute inset-y-0 left-0 w-[90%] max-w-sm rounded-none border-y-0 border-l-0")}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-2 p-4">
                <div className="text-sm font-semibold text-white">სექციების ნავიგაცია</div>
                <Button
                  variant="secondary"
                  onClick={() => setMobileNavOpen(false)}
                  className="h-9 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  დახურვა
                </Button>
              </div>

              <div className="px-4 pb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="სექციების ძიება…"
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
                          "border border-transparent hover:border-cyan-400/25 hover:bg-cyan-500/5",
                          "focus-visible:outline-none focus-visible:border-cyan-400/70 focus-visible:ring-2 focus-visible:ring-cyan-400/30",
                          isActive && "border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cx(
                              "mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                              isActive && "border-cyan-300/45 from-cyan-500/20 to-violet-500/20 text-cyan-50"
                            )}
                          >
                            {stepIconMap[s.key]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <div className="truncate text-sm font-semibold text-white">{s.title}</div>
                              {done ? (
                                <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                                  გაგზავნილი
                                </Badge>
                              ) : null}
                            </div>
                            <div className="mt-0.5 truncate text-xs text-slate-400">{s.subtitle}</div>
                            <div className="mt-2 flex items-center gap-2">
                            <Badge className="border border-violet-400/25 bg-violet-500/10 text-violet-100">
                              {pct}%
                            </Badge>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400"
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
            </div>
          </Card>
        </div>
      ) : null}

      {/* Main layout */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[300px_minmax(0,1fr)_380px] 2xl:grid-cols-[320px_minmax(0,1fr)_420px]">
        {/* Left sidebar */}
        <Card className={glassCardClass("hidden xl:block xl:h-[calc(100vh-112px)]")}>
          <div className="flex h-full flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="სექციების ძიება…"
                  className="pl-9 bg-slate-950/40 border-white/10 text-slate-200 placeholder:text-slate-500"
                />
              </div>
            </div>
            <Separator className="bg-white/10" />

            <ScrollArea className="max-h-[45vh] flex-1 xl:max-h-none">
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
                        "border border-transparent hover:border-cyan-400/25 hover:bg-cyan-500/5",
                        "focus-visible:outline-none focus-visible:border-cyan-400/70 focus-visible:ring-2 focus-visible:ring-cyan-400/30",
                        isActive && "border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cx(
                            "mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                            isActive && "border-cyan-300/45 from-cyan-500/20 to-violet-500/20 text-cyan-50"
                          )}
                        >
                          {stepIconMap[s.key]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="truncate text-sm font-semibold text-white">{s.title}</div>
                            {done && (
                              <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                                გაგზავნილი
                              </Badge>
                            )}
                          </div>
                          <div className="mt-0.5 truncate text-xs text-slate-400">{s.subtitle}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className="border border-violet-400/25 bg-violet-500/10 text-violet-100">
                              {pct}%
                            </Badge>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400"
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
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button
                  variant="secondary"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  უკან
                </Button>
                <Button
                  variant="secondary"
                  onClick={goNext}
                  disabled={activeIndex === steps.length - 1}
                  className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                >
                  შემდეგი
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Center editor */}
        <Card className={glassCardClass("xl:h-[calc(100vh-112px)]")}>
          <div className="flex h-full flex-col">
            <div className="p-6">
              <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3 xl:hidden">
                <div className="mb-2 text-xs font-medium text-slate-400">ნავიგაცია</div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Button
                    variant="secondary"
                    onClick={() => setMobileNavOpen(true)}
                    className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                  >
                    სექციების მენიუ
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    უკან
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={goNext}
                    disabled={activeIndex === steps.length - 1}
                    className="h-10 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
                  >
                    შემდეგი
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100">
                      ეტაპი {activeIndex + 1} / {steps.length}
                    </Badge>
                    <Badge className="border border-cyan-400/25 bg-cyan-500/10 text-cyan-100">
                      {stepPct}% შევსებული
                    </Badge>
                    {submitted[activeKey] && (
                      <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                        გაგზავნილი
                      </Badge>
                    )}
                  </div>
                  <h1 className="mt-3 max-w-4xl text-xl font-semibold leading-tight text-white xl:text-2xl">
                    {activeStep.title}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-400">{activeStep.instruction}</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
                  <Button
                    variant="secondary"
                    onClick={resetDraft}
                    className="h-10 w-full border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5 sm:w-auto"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    დრაფტის გასუფთავება
                  </Button>
                  <Button
                    onClick={() => alert("დროებითი: აქ დაემატება სპონსორისთვის პიჩის გენერატორი.")}
                    className={gradientButtonClass("h-10 w-full sm:w-auto")}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    სპონსორის პიჩის ტექსტის გენერირება
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Separator className="bg-white/10" />
              </div>
            </div>

            <ScrollArea className="max-h-[65vh] flex-1 xl:max-h-none">
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
                            სავალდებულო
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
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    {submitState.status === "idle" ? (
                      <div className="text-sm text-slate-400">
                        გაგზავნეთ ეს ეტაპი შესანახად (სრული დრაფტის სნეპშოტთან ერთად).
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
                        აკლია სავალდებულო ველები:{" "}
                        <span className="text-slate-300">{validation.missing.join(", ")}</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-500">
                        ყველა სავალდებულო ველი შევსებულია.
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                    <Button
                      variant="secondary"
                      onClick={() => alert("დროებითი: გენერირდება 1-გვერდიანი პიჩის ტექსტის ბლოკი.")}
                      className="h-10 w-full border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5 sm:w-auto"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      პიჩის ტექსტის წინასწარი ნახვა
                    </Button>

                    <Button
                      onClick={submitCurrentStep}
                      disabled={submitState.status === "saving"}
                      className={gradientButtonClass("h-10 w-full sm:w-auto")}
                    >
                      {submitState.status === "saving" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          იგზავნება…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          ამ ეტაპის გაგზავნა
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">შენახვის შენიშვნა</div>
                      <div className="mt-1 text-xs text-slate-400">
                        ფორმა აგზავნის მონაცემებს <span className="text-slate-200">/api/submit</span>-ზე, ხოლო სერვერი მათ
                        გადაამისამართებს <span className="text-slate-200">SHEETS_ENDPOINT</span>-ზე (Google Apps Script).
                      </div>
                    </div>
                    <Badge className="border border-white/10 bg-slate-950/60 text-slate-200">
                      localStorage არ გამოიყენება
                    </Badge>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Right preview */}
        <div className="hidden space-y-6 xl:block">
          <Card className={glassCardClass()}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">სპონსორისთვის მზა პრივიუ</div>
                  <div className="mt-1 text-xs text-slate-400">
                    1-გვერდიანი პიჩის დრაფტი (ავტომატურად შეჯამებული შევსებული მონაცემებიდან)
                  </div>
                </div>
                <Badge className="border border-cyan-400/25 bg-cyan-500/10 text-cyan-100">
                  ცოცხალი
                </Badge>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="space-y-4">
                <div>
                  <div className="text-lg font-semibold text-white">{preview.name}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    ნაკადის ზომა: <span className="text-slate-200">{preview.cohort}</span> • ხანგრძლივობა:{" "}
                    <span className="text-slate-200">{preview.duration}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    მთლიანი ბიუჯეტის შეფასება: <span className="text-slate-200">{preview.budget}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold text-white">მთავარი ხაზები</div>
                  {preview.bullets.length === 0 ? (
                    <div className="mt-2 text-sm text-slate-500">
                      შეავსეთ რამდენიმე სექცია და აქ გამოჩნდება 3–5 ძირითადი პუნქტი.
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
                  <div className="text-xs font-semibold text-white">სპონსორის შეთავაზება (დროებითი)</div>
                  <div className="mt-2 text-sm text-slate-400">
                    თქვენი პაკეტები აქ გამოჩნდება, როცა შეავსებთ <span className="text-slate-200">ბიუჯეტის რეალობას</span>.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={glassCardClass()}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">შემოთავაზებული სპონსორები</div>
                  <div className="mt-1 text-xs text-slate-400">დროებითი სია</div>
                </div>
                <Badge className="border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100">
                  დრაფტი
                </Badge>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="space-y-2">
                {[
                  "გარე სპორტის ბრენდი (ეკიპირების პაკეტი)",
                  "ადგილობრივი ბანკი ან ფინტექი (ქალთა გაძლიერება)",
                  "ტურიზმის / სამოგზაურო კომპანია (ამბის თხრობა + აუდიტორია)",
                  "უნივერსიტეტის პარტნიორი (სტუდენტური ნაკადის მხარდაჭერა)",
                  "მედია პარტნიორი (ხილვადობა + PR)",
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2"
                  >
                    <div className="text-sm text-slate-300">{s}</div>
                    <Badge className="border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100">
                      დრაფტი
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="secondary"
              onClick={() => alert("დროებითი: გენერირდება 1-გვერდიანი PDF.")}
              className="h-11 border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5"
            >
              <FileDown className="mr-2 h-4 w-4" />
              1-გვერდიანი PDF-ის გენერირება
            </Button>

            <Button
              onClick={() => alert("დროებითი: სრულ წინადადებად ექსპორტი (10–15 გვერდი).")}
              className={gradientButtonClass("h-11")}
            >
              <FileText className="mr-2 h-4 w-4" />
              სრული წინადადების ექსპორტი
            </Button>
          </div>

          <Card className={glassCardClass("p-5")}>
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 text-slate-300" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">რჩევა</div>
                <div className="mt-1 text-xs text-slate-400">
                  სპონსორები ოცნებებს არ აფინანსებენ, ისინი სიცხადეს აფინანსებენ. თავიდანვე შეავსეთ ბიუჯეტი + ზეგავლენა + ხილვადობა.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-[1600px] px-4 pb-8 sm:px-6">
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">თემა:</span> მუქი გლასი • ფონი #070A12 • ბარათები slate-950/60
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">ენდპოინტი:</span>{" "}
            <span className="text-slate-200">
              /api/submit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
