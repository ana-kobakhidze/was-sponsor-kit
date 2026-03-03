/* src/WomenAlpineSponsorKitBuilder.tsx
   Single-file React + Tailwind + shadcn/ui UI preview
   - 3-column desktop layout
   - Completeness per step + overall
   - Right-side live preview summary
   - Per-step validation + Submit (POST to VITE_SHEETS_ENDPOINT if provided)
   - Optional local draft save/load via localStorage
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
  Palette,
  Scale,
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
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
import waLogo from "@/assets/wa.png";

type StepKey =
  | "coreIdentity"
  | "problem"
  | "audience"
  | "program"
  | "budget"
  | "impact"
  | "visibility"
  | "branding"
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

type HistoryCard = {
  trainer: string;
  courseName: string;
  courseIncluded: string[];
  format: string;
  level: string;
};

type UploadedImage = {
  name: string;
  dataUrl: string;
};

const LOCAL_DRAFT_KEY = "was_sponsor_kit_draft_v1";

type DataModel = {
  coreIdentity: {
    officialName: string;
    legalForm: string;
    founders: string;
    instructors: string;
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
  branding: {
    brandEssence: string;
    targetFeeling: string;
    brandPersonality: string;
    primaryColors: string;
    secondaryColors: string;
    logoFiles: string;
    typography: string;
    logoUsageRules: string;
    visualStyle: string;
    voiceTone: string;
    mandatoryAssets: string;
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
    legalForm: "NGO",
    founders: "ფოფო ჭელიძე",
    instructors: "ფოფო ჭელიძე, თემო სამსონაძე, დეა, ლაშა, ტატა მერაბიშვილი",
    instructorCertifications: "გიდების ასოციაცია",
    yearsOperating: "",
    previousExpeditionsHistory: JSON.stringify([
      {
        trainer: "თემო სამსონაძე",
        courseName: "საბაზისო ალპინისტური მომზადება",
        format: "თეორია + პრაქტიკა",
        level: "დამწყები",
        courseIncluded: [
          "თოკთან მუშაობის საფუძვლები",
          "კვანძები და საბელე ტექნიკა",
          "უსაფრთხოების წესები",
          "კლდეზე გადაადგილების ტექნიკა",
        ],
      },
      {
        trainer: "ქეთ ფალიანი",
        courseName: "ნავიგაცია და მეტეოროლოგია",
        format: "თეორია + საველე პრაქტიკა",
        level: "ყველა დონე",
        courseIncluded: [
          "რუკისა და კომპასის გამოყენება",
          "GPS საფუძვლები",
          "ამინდის შეფასება",
          "მარშრუტის დაგეგმვა",
        ],
      },
      {
        trainer: "დეა ფოფო გვარი შემახსენე",
        courseName: "აღჭურვილობა, ზურგჩანთა და Layering სისტემა",
        format: "პრაქტიკული ვორქშოპი",
        level: "ყველა დონე",
        courseIncluded: [
          "ზურგჩანთის სწორად ჩალაგება",
          "წონის ბალანსი და პრიორიტეტები",
          "სამოსის ფენების პრინციპი (base / mid / shell)",
          "ამინდის მიხედვით ჩაცმის სტრატეგია",
        ],
      },
      {
        trainer: "მაჯლაჯუნა ლუ",
        courseName: "ჯანსაღი კვება და ფიზიკური მომზადება",
        format: "თეორია + სავარჯიშო გეგმა",
        level: "ყველა დონე",
        courseIncluded: [
          "ენერგიის მართვა მთაში",
          "საბაზისო სპორტული კვების პრინციპები",
          "გამძლეობის და ძალის ვარჯიშები",
          "აღდგენა და ჰიდრატაცია",
        ],
      },
      {
        trainer: "სახელი გვარი",
        courseName: "სამაშველო და უსაფრთხოების კურსი",
        format: "პრაქტიკული სცენარები",
        level: "ყველა დონე",
        courseIncluded: [
          "სამაშველო სისტემების აწყობა",
          "დაშავებულის ევაკუაცია",
          "საგანგებო სიტუაციებში მოქმედება",
          "პირველადი დახმარება",
        ],
      },
      {
        trainer: "ტატა მერაბიშვილი",
        courseName: "მყინვარულ და ყინულზე მოძრაობა",
        format: "პრაქტიკა მყინვარზე",
        level: "საშუალო",
        courseIncluded: [
          "კრემპონებისა და ცულის გამოყენება",
          "მყინვარზე გადაადგილება",
          "ნაპრალში ჩავარდნისგან გადარჩენა",
          "ყინულზე დაცვა",
        ],
      },
      {
        trainer: "გუგა დაბრუნდაშვილი",
        courseName: "კლდეზე მარშრუტის დაგეგმარება",
        format: "თეორია + პრაქტიკა რეალურ კლდეზე",
        level: "საშუალო / მოწინავე",
        courseIncluded: [
          "მარშრუტის სწორი ხაზის შერჩევა",
          "კლდის სტრუქტურის ამოცნობა",
          "თოკის ტიპები და გამოყენება",
          "დაცვითი საშუალებების განთავსება",
        ],
      },
      {
        trainer: "ბიძინა გუჯაბიძე",
        courseName: "ყინულზე ცოცვა (Ice Climbing)",
        format: "პრაქტიკა გაყინულ ჩანჩქერზე / ყინულის მარშრუტზე",
        level: "საშუალო / მოწინავე",
        courseIncluded: [
          "ყინულის იარაღების (ice tools) გამოყენება",
          "ტექნიკური მოძრაობა ვერტიკალურ ყინულზე",
          "უსაფრთხო დაშვება და დაზღვევა",
        ],
      },
      {
        trainer: "ალექსანდრე თელია",
        courseName: "მაღალმთიანი ალპინიზმი",
        format: "საველე ბანაკი",
        level: "მოწინავე",
        courseIncluded: [
          "სიმაღლეზე ადაპტაცია",
          "ბანაკის მოწყობა",
          "ენერგიის მართვა",
          "სამიტზე გასვლის სტრატეგია",
        ],
      },
    ]),
  },
  problem: {
    womenPercent: "აღჭურვილობა, გიდები, სივრცე",
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
  branding: {
    brandEssence: "",
    targetFeeling: "",
    brandPersonality: "გაბედული, სანდო, პროფესიონალური",
    primaryColors: "#0B132B, #3A86FF, #00B4D8",
    secondaryColors: "#F72585, #22C55E",
    logoFiles: "",
    typography: "",
    logoUsageRules: "",
    visualStyle: "",
    voiceTone: "",
    mandatoryAssets: "ლოგო SVG, ლოგო PNG, სოციალური მედიის შაბლონი, პრეზენტაციის ყდა",
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
    key: "branding",
    title: "ბრენდინგი",
    subtitle: "ბრენდის გზამკვლევი.",
    instruction:
      "დააფიქსირეთ ბრენდის სტილი: ფერები, ტონი, ვიზუალური წესები და სავალდებულო ბრენდ მასალები.",
    icon: <Palette className="h-4 w-4" />,
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
  kind: "input" | "textarea" | "chips" | "select" | "historyCards" | "images";
  options?: string[];
  required?: boolean;
};

const fieldsByStep: { [K in StepKey]: FieldDef<K>[] } = {
  coreIdentity: [
    {
      key: "officialName",
      label: "ოფიციალური დასახელება",
      placeholder: "ქალთა ალპური სკოლა (იქნებ მოვიფიქროთ მოკლე ვერსიაც?)",
      kind: "input",
      required: true,
    },
    {
      key: "legalForm",
      label: "იურიდიული ფორმა",
      placeholder: "ა(ა)იპ / შპს / არაფორმალური ჯგუფი",
      kind: "select",
      options: ["NGO", "LLC", "არაფორმალური ჯგუფი"],
      required: true,
    },
    {
      key: "founders",
      label: "დამფუძნებლები",
      placeholder: "დაამატეთ დამფუძნებელი (Enter)",
      kind: "chips",
      required: true,
    },
    {
      key: "instructors",
      label: "ინსტრუქტორები | გასვლის ხელმძღვანელები",
      placeholder: "დაამატეთ ინსტრუქტორი (Enter)",
      kind: "chips",
      required: true,
    },
    {
      key: "instructorCertifications",
      label: "ინსტრუქტორების სერტიფიკაციები",
      placeholder: "დაამატეთ სერტიფიკაცია (Enter)",
      kind: "chips",
      required: true,
    },
    {
      key: "previousExpeditionsHistory",
      label: "წინა ექსპედიციების / ტრენინგების ისტორია",
      placeholder: "ტრენერის სახელი",
      kind: "historyCards",
      required: true,
    },
  ],
  problem: [
    {
      key: "womenPercent",
      label: "არ გვაქვს და გვჭირდება",
      placeholder: "დაამატეთ ჩიპი (Enter)",
      kind: "chips",
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
      label: "რატო არ გვაქვს",
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
  branding: [
    {
      key: "brandEssence",
      label: "ბრენდის არსი",
      placeholder: "ერთი მოკლე ფრაზა: ვინ ხართ და რატომ არსებობთ",
      kind: "input",
      required: true,
    },
    {
      key: "targetFeeling",
      label: "რა გრძნობა უნდა დატოვოს ბრენდმა",
      placeholder: "მაგ.: თავდაჯერებულობა, უსაფრთხოება, თავგადასავალი",
      kind: "input",
      required: true,
    },
    {
      key: "brandPersonality",
      label: "ბრენდის ხასიათი",
      placeholder: "დაამატეთ ხასიათის სიტყვა (Enter)",
      kind: "chips",
      required: true,
    },
    {
      key: "primaryColors",
      label: "ძირითადი ფერები",
      placeholder: "დაამატეთ ფერი (hex ან სახელი)",
      kind: "chips",
      required: true,
    },
    {
      key: "secondaryColors",
      label: "დამხმარე ფერები",
      placeholder: "დაამატეთ დამატებითი ფერი",
      kind: "chips",
      required: true,
    },
    {
      key: "logoFiles",
      label: "ლოგოების ატვირთვა (PNG/SVG/JPG)",
      placeholder: "ატვირთეთ ლოგოები",
      kind: "images",
      required: true,
    },
    {
      key: "typography",
      label: "ტიპოგრაფია",
      placeholder: "ძირითადი/დამხმარე ფონტები და გამოყენების წესები",
      kind: "textarea",
      required: true,
    },
    {
      key: "logoUsageRules",
      label: "ლოგოს გამოყენების წესები",
      placeholder: "მინ. ზომა, დაცვითი არე, აკრძალული გამოყენება",
      kind: "textarea",
      required: true,
    },
    {
      key: "visualStyle",
      label: "ვიზუალური სტილი",
      placeholder: "ფოტო სტილი, გრაფიკული ელემენტები, კომპოზიციის პრინციპები",
      kind: "textarea",
      required: true,
    },
    {
      key: "voiceTone",
      label: "კომუნიკაციის ტონი",
      placeholder: "როგორ ვწერთ/ვლაპარაკობთ (ფორმალური, მეგობრული, ენერგიული და ა.შ.)",
      kind: "textarea",
      required: true,
    },
    {
      key: "mandatoryAssets",
      label: "სავალდებულო ბრენდ მასალები",
      placeholder: "დაამატეთ სავალდებულო asset (Enter)",
      kind: "chips",
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

function parseChips(value: string) {
  return value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseHistoryCards(value: string): HistoryCard[] {
  if (!value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => {
        const trainer = typeof x?.trainer === "string" ? x.trainer.trim() : "";
        const courseName = typeof x?.courseName === "string" ? x.courseName.trim() : "";
        const format = typeof x?.format === "string" && x.format.trim() ? x.format.trim() : "თეორია + პრაქტიკა";
        const level = typeof x?.level === "string" && x.level.trim() ? x.level.trim() : "დამწყები";
        const courseIncluded = Array.isArray(x?.courseIncluded)
          ? x.courseIncluded.map((y: unknown) => String(y).trim()).filter(Boolean)
          : [];
        if (!trainer && !courseName && courseIncluded.length === 0) return null;
        return { trainer, courseName, format, level, courseIncluded } as HistoryCard;
      })
      .filter(Boolean) as HistoryCard[];
  } catch {
    return [];
  }
}

function parseUploadedImages(value: string): UploadedImage[] {
  if (!value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => {
        const name = typeof x?.name === "string" ? x.name : "";
        const dataUrl = typeof x?.dataUrl === "string" ? x.dataUrl : "";
        if (!name || !dataUrl) return null;
        return { name, dataUrl } as UploadedImage;
      })
      .filter(Boolean) as UploadedImage[];
  } catch {
    return [];
  }
}

const historyFormatOptions = [
  "თეორია + პრაქტიკა",
  "თეორია + პრაქტიკა რეალურ კლდეზე",
  "თეორია + საველე პრაქტიკა",
  "პრაქტიკული სცენარები",
  "პრაქტიკული ვორქშოპი",
  "პრაქტიკა მყინვარზე",
  "საველე ბანაკი",
  "პრაქტიკა გაყინულ ჩანჩქერზე / ყინულის მარშრუტზე",
  "თეორია + სავარჯიშო გეგმა",
];

const historyLevelOptions = ["დამწყები", "საშუალო", "მოწინავე", "საშუალო / მოწინავე", "ყველა დონე"];

const INITIAL_SUBMITTED_STATE: Record<StepKey, boolean> = {
  coreIdentity: false,
  problem: false,
  audience: false,
  program: false,
  budget: false,
  impact: false,
  visibility: false,
  branding: false,
  partnerships: false,
  legalRisk: false,
  vision: false,
};

function mergeDataModel(partial: Partial<DataModel>): DataModel {
  const merged = { ...emptyData } as any;
  (Object.keys(emptyData) as StepKey[]).forEach((k) => {
    merged[k] = { ...(emptyData as any)[k], ...((partial as any)?.[k] ?? {}) };
  });
  return merged as DataModel;
}

function ChipInputField(props: {
  value: string;
  placeholder: string;
  missing?: boolean;
  onChange: (next: string) => void;
}) {
  const { value, placeholder, missing, onChange } = props;
  const [draft, setDraft] = React.useState("");
  const chips = React.useMemo(() => parseChips(value), [value]);

  function addChip(raw: string) {
    const next = raw.trim();
    if (!next) return;
    if (chips.some((c) => c.toLowerCase() === next.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...chips, next].join(", "));
    setDraft("");
  }

  function removeChip(idx: number) {
    const next = chips.filter((_, i) => i !== idx);
    onChange(next.join(", "));
  }

  return (
    <div
      className={cx(
        "rounded-md border bg-slate-950/40 p-2",
        "border-white/10 focus-within:border-[#3FA7A3]/70 focus-within:ring-2 focus-within:ring-[#3FA7A3]/30",
        missing && "border-rose-400/40"
      )}
    >
      <div className="mb-2 flex flex-wrap gap-2">
        {chips.map((chip, idx) => (
          <span
            key={`${chip}-${idx}`}
            className="inline-flex items-center gap-1 rounded-full border border-[#3FA7A3]/30 bg-[#3FA7A3]/10 px-2.5 py-1 text-xs text-[#CDEDEC]"
          >
            {chip}
            <button
              type="button"
              onClick={() => removeChip(idx)}
              className="text-[#CDEDEC]/80 hover:text-white"
              aria-label={`remove ${chip}`}
            >
              x
            </button>
          </span>
        ))}
      </div>
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip(draft);
          }
        }}
        onBlur={() => addChip(draft)}
        placeholder={placeholder}
        className="h-9 border-white/10 bg-slate-950/30 text-slate-200 placeholder:text-slate-500"
      />
    </div>
  );
}

function HistoryCardsField(props: {
  value: string;
  missing?: boolean;
  onChange: (next: string) => void;
}) {
  const { value, missing, onChange } = props;
  const [trainer, setTrainer] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [courseIncludedDraft, setCourseIncludedDraft] = React.useState("");
  const [format, setFormat] = React.useState<string>(historyFormatOptions[0]);
  const [level, setLevel] = React.useState<string>(historyLevelOptions[0]);
  const cards = React.useMemo(() => parseHistoryCards(value), [value]);

  function saveCards(next: HistoryCard[]) {
    onChange(JSON.stringify(next));
  }

  function addCard() {
    const cleanedTrainer = trainer.trim();
    const cleanedCourseName = courseName.trim();
    const included = courseIncludedDraft
      .split("\n")
      .map((x) => x.replace(/^[-•\d.)\s]+/, "").trim())
      .filter(Boolean);
    if (!cleanedTrainer || !cleanedCourseName || included.length === 0) return;
    saveCards([
      ...cards,
      {
        trainer: cleanedTrainer,
        courseName: cleanedCourseName,
        format,
        level,
        courseIncluded: included,
      },
    ]);
    setTrainer("");
    setCourseName("");
    setCourseIncludedDraft("");
    setFormat(historyFormatOptions[0]);
    setLevel(historyLevelOptions[0]);
  }

  function removeCard(idx: number) {
    saveCards(cards.filter((_, i) => i !== idx));
  }

  return (
    <div
      className={cx(
        "rounded-md border bg-slate-950/40 p-3",
        "border-white/10 focus-within:border-[#3FA7A3]/70 focus-within:ring-2 focus-within:ring-[#3FA7A3]/30",
        missing && "border-rose-400/40"
      )}
    >
      <div className="mb-2 text-xs font-medium text-slate-300">არსებული ბარათები</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card, idx) => (
          <div
            key={`${card.trainer}-${card.courseName}-${idx}`}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#3FA7A3]/35 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-[#1A4C57]/55 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-[#3FA7A3]/15 blur-2xl" />
            <div className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center rounded-full border border-[#E07A83]/25 bg-[#E07A83]/10 px-2 py-0.5 text-[11px] font-medium text-[#F6D0D4]">
                    ტრენინგი
                  </div>
                  <div className="text-sm font-semibold text-white">{card.courseName}</div>
                  <div className="mt-1 inline-flex items-center rounded-full border border-[#3FA7A3]/25 bg-[#3FA7A3]/10 px-2 py-0.5 text-xs text-[#CDEDEC]">
                    ტრენერი: {card.trainer}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeCard(idx)}
                  className="rounded-md border border-rose-400/35 bg-rose-500/10 px-2 py-1 text-xs text-rose-100 hover:bg-rose-500/20"
                >
                  წაშლა
                </button>
              </div>
            </div>
            <div className="border-t border-white/10 py-3">
              <ul className="space-y-1.5 text-xs text-slate-100">
                {card.courseIncluded.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#84CFCB]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-[#1E3A63]/25 bg-[#1E3A63]/10 px-2 py-0.5 text-[11px] text-[#BFD0EA]">
                  ფორმატი: {card.format}
                </span>
                <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-100">
                  დონე: {card.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-3">
        <div className="mb-3 text-xs font-medium text-slate-300">ახალი ბარათის დამატება</div>
        <div className="grid gap-2">
        <Input
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          placeholder="ტრენერის სახელი"
          className="bg-slate-950/30 border-white/10 text-slate-200 placeholder:text-slate-500"
        />
        <Input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="კურსის სახელი"
          className="bg-slate-950/30 border-white/10 text-slate-200 placeholder:text-slate-500"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-slate-950/30 px-3 py-1 text-sm text-slate-200 border-white/10 focus-visible:outline-none focus-visible:border-[#3FA7A3]/70 focus-visible:ring-2 focus-visible:ring-[#3FA7A3]/30"
          >
            {historyFormatOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                ფორმატი: {opt}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-slate-950/30 px-3 py-1 text-sm text-slate-200 border-white/10 focus-visible:outline-none focus-visible:border-[#3FA7A3]/70 focus-visible:ring-2 focus-visible:ring-[#3FA7A3]/30"
          >
            {historyLevelOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                დონე: {opt}
              </option>
            ))}
          </select>
        </div>
        <Textarea
          value={courseIncludedDraft}
          onChange={(e) => setCourseIncludedDraft(e.target.value)}
          placeholder={"კურსში შედიოდა (თითო პუნქტი ახალ ხაზზე)\n• თოკთან მუშაობის საფუძვლები"}
          className="min-h-[90px] bg-slate-950/30 border-white/10 text-slate-200 placeholder:text-slate-500"
        />
        <Button type="button" variant="secondary" onClick={addCard} className="h-9 w-fit">
          ბარათის დამატება
        </Button>
        </div>
      </div>
    </div>
  );
}

function ImageUploadField(props: {
  value: string;
  missing?: boolean;
  onChange: (next: string) => void;
}) {
  const { value, missing, onChange } = props;
  const images = React.useMemo(() => parseUploadedImages(value), [value]);

  function save(next: UploadedImage[]) {
    onChange(JSON.stringify(next));
  }

  function removeAt(idx: number) {
    save(images.filter((_, i) => i !== idx));
  }

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const next = [...images];

    for (const file of files) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ""));
        reader.onerror = () => reject(new Error("file read failed"));
        reader.readAsDataURL(file);
      }).catch(() => "");
      if (!dataUrl) continue;
      next.push({ name: file.name, dataUrl });
    }

    save(next);
    e.target.value = "";
  }

  return (
    <div
      className={cx(
        "rounded-md border bg-slate-950/40 p-3",
        "border-white/10 focus-within:border-[#3FA7A3]/70 focus-within:ring-2 focus-within:ring-[#3FA7A3]/30",
        missing && "border-rose-400/40"
      )}
    >
      <div className="mb-3">
        <input
          type="file"
          accept="image/*,.svg"
          multiple
          onChange={onPickFiles}
          className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-md file:border file:border-[#3FA7A3]/35 file:bg-[#3FA7A3]/10 file:px-3 file:py-1.5 file:text-[#CDEDEC] hover:file:bg-[#3FA7A3]/20"
        />
      </div>
      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {images.map((img, idx) => (
            <div key={`${img.name}-${idx}`} className="rounded-xl border border-white/10 bg-slate-900/60 p-2">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-xs text-slate-300">{img.name}</div>
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="rounded-md border border-rose-400/35 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-100 hover:bg-rose-500/20"
                >
                  remove
                </button>
              </div>
              <img
                src={img.dataUrl}
                alt={img.name}
                className="mt-2 h-28 w-full rounded-md border border-white/10 bg-white/90 object-contain p-1"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs text-slate-500">Upload one or more logo images to preview here.</div>
      )}
    </div>
  );
}

function gradientButtonClass(extra?: string) {
  return cx(
    "relative overflow-hidden border border-white/10 text-white",
    "bg-gradient-to-r from-[#E07A83] to-[#3FA7A3]",
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
  const [localSaveMessage, setLocalSaveMessage] = React.useState<string>("");
  const [draftId] = React.useState<string>(() => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  });

  // Per-step save status (for UI feedback)
  const [submitted, setSubmitted] = React.useState<Record<StepKey, boolean>>(INITIAL_SUBMITTED_STATE);

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

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        data?: Partial<DataModel>;
        submitted?: Partial<Record<StepKey, boolean>>;
        activeIndex?: number;
        query?: string;
      };
      if (parsed.data) setData(mergeDataModel(parsed.data));
      if (parsed.submitted) setSubmitted({ ...INITIAL_SUBMITTED_STATE, ...parsed.submitted });
      if (typeof parsed.activeIndex === "number") {
        setActiveIndex(clamp(parsed.activeIndex, 0, steps.length - 1));
      }
      if (typeof parsed.query === "string") setQuery(parsed.query);
      setLocalSaveMessage("Loaded saved draft.");
    } catch {
      // ignore invalid local draft payload
    }
  }, []);

  function saveDraftLocal() {
    try {
      const payload = {
        data,
        submitted,
        activeIndex,
        query,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(payload));
      setLocalSaveMessage("Saved locally.");
    } catch {
      setLocalSaveMessage("Local save failed.");
    }
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

  const headerLogoDataUrl = React.useMemo(() => {
    const first = parseUploadedImages(data.branding.logoFiles)[0];
    return first?.dataUrl ?? null;
  }, [data.branding.logoFiles]);
  const headerLogoSrc = headerLogoDataUrl ?? waLogo;
  const [headerLogoFailed, setHeaderLogoFailed] = React.useState(false);
  React.useEffect(() => {
    setHeaderLogoFailed(false);
  }, [headerLogoSrc]);

  const stepIconMap: Record<StepKey, React.ReactNode> = {
    coreIdentity: <MountainSnow className="h-4 w-4" />,
    problem: <Target className="h-4 w-4" />,
    audience: <Users className="h-4 w-4" />,
    program: <ListChecks className="h-4 w-4" />,
    budget: <Wallet className="h-4 w-4" />,
    impact: <Ruler className="h-4 w-4" />,
    visibility: <ImageIcon className="h-4 w-4" />,
    branding: <Palette className="h-4 w-4" />,
    partnerships: <Handshake className="h-4 w-4" />,
    legalRisk: <ShieldAlert className="h-4 w-4" />,
    vision: <Sparkles className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-200">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-[#3FA7A3]/20 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center">
              {!headerLogoFailed ? (
                <img
                  src={headerLogoSrc}
                  alt="Logo"
                  className="h-12 w-auto max-w-[170px] object-contain"
                  onError={() => setHeaderLogoFailed(true)}
                />
              ) : (
                <MountainSnow className="h-4 w-4 text-slate-200" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Progress value={overall} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-white">{overall}%</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {!headerLogoFailed ? (
                  <img
                    src={headerLogoSrc}
                    alt="Logo"
                    className="h-14 w-auto max-w-[190px] object-contain"
                    onError={() => setHeaderLogoFailed(true)}
                  />
                ) : (
                  <MountainSnow className="h-4 w-4 text-slate-200" />
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">ქალთა ალპური სკოლა</div>
                <div className="text-xs text-slate-300">სპონსორებთან გასვლამდე უნდა მივაღწიოთ 80%+</div>
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
                  "border border-[#3FA7A3]/25 bg-[#3FA7A3]/10 text-[#CDEDEC]",
                  overall >= 80 && "bg-emerald-500/10 text-emerald-200 border-emerald-400/20"
                )}
              >
                {overall >= 80 ? "სპონსორისთვის მზად" : "დრაფტი"}
              </Badge>
            </div>
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
                          "border border-transparent hover:border-[#3FA7A3]/25 hover:bg-[#3FA7A3]/5",
                          "focus-visible:outline-none focus-visible:border-[#3FA7A3]/70 focus-visible:ring-2 focus-visible:ring-[#3FA7A3]/30",
                          isActive && "border-[#3FA7A3]/35 bg-[#3FA7A3]/10 shadow-[0_0_0_1px_rgba(63,167,163,0.2)]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cx(
                              "mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-[#3FA7A3]/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-[#CDEDEC] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                              isActive && "border-[#3FA7A3]/45 from-[#3FA7A3]/20 to-[#1E3A63]/20 text-[#E6F7F6]"
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
                            <div className="mt-0.5 truncate text-xs text-slate-300">{s.subtitle}</div>
                            <div className="mt-2 flex items-center gap-2">
                            <Badge className="border border-[#1E3A63]/25 bg-[#1E3A63]/10 text-[#BFD0EA]">
                              {pct}%
                            </Badge>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-[#E07A83] via-[#1E3A63] to-[#3FA7A3]"
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
                        "border border-transparent hover:border-[#3FA7A3]/25 hover:bg-[#3FA7A3]/5",
                        "focus-visible:outline-none focus-visible:border-[#3FA7A3]/70 focus-visible:ring-2 focus-visible:ring-[#3FA7A3]/30",
                        isActive && "border-[#3FA7A3]/35 bg-[#3FA7A3]/10 shadow-[0_0_0_1px_rgba(63,167,163,0.2)]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cx(
                            "mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-[#3FA7A3]/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-[#CDEDEC] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                            isActive && "border-[#3FA7A3]/45 from-[#3FA7A3]/20 to-[#1E3A63]/20 text-[#E6F7F6]"
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
                          <div className="mt-0.5 truncate text-xs text-slate-300">{s.subtitle}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className="border border-[#1E3A63]/25 bg-[#1E3A63]/10 text-[#BFD0EA]">
                              {pct}%
                            </Badge>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-[#E07A83] via-[#1E3A63] to-[#3FA7A3]"
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
              <div className="mb-4 xl:hidden">
                <div className="flex items-center">
                  <Button
                    variant="secondary"
                    onClick={() => setMobileNavOpen(true)}
                    className="h-10 w-10 border border-white/10 bg-slate-950/60 p-0 text-slate-200 hover:bg-white/5"
                    aria-label="სექციების მენიუ"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-[#E07A83]/25 bg-[#E07A83]/10 text-[#F6D0D4]">
                    ეტაპი {activeIndex + 1} / {steps.length}
                  </Badge>
                  <Badge className="border border-[#3FA7A3]/25 bg-[#3FA7A3]/10 text-[#CDEDEC]">
                    {stepPct}% შევსებული
                  </Badge>
                  {submitted[activeKey] && (
                    <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                      გაგზავნილი
                    </Badge>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h1 className="max-w-4xl text-xl font-semibold leading-tight text-white xl:text-2xl">
                      {activeStep.title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-slate-300">{activeStep.subtitle}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      className="h-10 border border-white/10 bg-slate-950/60 px-3 text-slate-200 hover:bg-white/5 sm:px-4"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">უკან</span>
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={goNext}
                      disabled={activeIndex === steps.length - 1}
                      className="h-10 border border-white/10 bg-slate-950/60 px-3 text-slate-200 hover:bg-white/5 sm:px-4"
                    >
                      <span className="hidden sm:inline">შემდეგი</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
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
                          {f.required ? <span className="ml-1 text-[#ECA8B0]">*</span> : null}
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
                        ) : f.kind === "select" ? (
                          <select
                            value={value}
                            onChange={(e) => updateField(activeKey, f.key, e.target.value)}
                            className={cx(
                              "flex h-10 w-full rounded-md border bg-slate-950/40 px-3 py-1 text-sm text-slate-200",
                              "border-white/10 focus-visible:outline-none focus-visible:border-[#3FA7A3]/70 focus-visible:ring-2 focus-visible:ring-[#3FA7A3]/30",
                              missing && "border-rose-400/40"
                            )}
                          >
                            {(f.options ?? []).map((opt) => (
                              <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : f.kind === "chips" ? (
                          <ChipInputField
                            value={value}
                            placeholder={f.placeholder}
                            missing={missing}
                            onChange={(next) => updateField(activeKey, f.key, next)}
                          />
                        ) : f.kind === "historyCards" ? (
                          <HistoryCardsField
                            value={value}
                            missing={missing}
                            onChange={(next) => updateField(activeKey, f.key, next)}
                          />
                        ) : f.kind === "images" ? (
                          <ImageUploadField
                            value={value}
                            missing={missing}
                            onChange={(next) => updateField(activeKey, f.key, next)}
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
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                      variant="secondary"
                      onClick={() => alert("დროებითი: გენერირდება 1-გვერდიანი პიჩის ტექსტის ბლოკი.")}
                      className="h-10 w-full border border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/5 sm:w-auto"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      პიჩის ტექსტის წინასწარი ნახვა
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={saveDraftLocal}
                      className="h-10 w-full border border-[#3FA7A3]/30 bg-[#3FA7A3]/10 text-[#CDEDEC] hover:bg-[#3FA7A3]/20 sm:w-auto"
                    >
                      შენახვა (local)
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

                  <div className="min-w-0">
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
                    {localSaveMessage ? (
                      <div className="mt-2 text-xs text-[#84CFCB]">{localSaveMessage}</div>
                    ) : null}
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
                      localStorage enabled
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
                <Badge className="border border-[#3FA7A3]/25 bg-[#3FA7A3]/10 text-[#CDEDEC]">
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
                <Badge className="border border-[#E07A83]/25 bg-[#E07A83]/10 text-[#F6D0D4]">
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
                    <Badge className="border border-[#E07A83]/25 bg-[#E07A83]/10 text-[#F6D0D4]">
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
