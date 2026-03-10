import * as React from "react";
import { Link } from "react-router-dom";
import { Save, CheckCircle2, Plus, X } from "lucide-react";

const PHASE1_KEY = "was_phase1_draft_v1";
const PHASE1_DRAFT_ID = "phase1-shared-draft";

// ── types ────────────────────────────────────────────────────────────────────

type Goal = { id: string; icon: string; text: string };

type Team = {
  id: string;
  emoji: string;
  name: string;
  role: string;
  color: string;
  alpinist: string;
  tasks: string[];
  leader: string;
  members: string[];
  fullWidth?: boolean;
};

type Story = {
  id: string;
  story: string;
  teamLabel: string;
  leader: string;
  status: "todo" | "progress" | "done";
  deadline: string;
};

type Volunteer = {
  id: string;
  name: string;
  skills: string;
  hours: string;
  team: string;
};

type Phase1Data = {
  header: { emoji: string; title: string; subtitle: string };
  props: {
    status: string;
    startDate: string;
    endDate: string;
    owner: string;
    teamsCount: string;
    targetSponsors: string;
  };
  callout: string;
  goals: Goal[];
  teams: Team[];
  stories: Story[];
  sync: { reports: string[]; rules: string[] };
  volunteers: Volunteer[];
};

// ── default data ─────────────────────────────────────────────────────────────

const DEFAULT_DATA: Phase1Data = {
  header: {
    emoji: "🏔️",
    title: "SPA Project kickoff \nმარ–აპრ 2026",
    subtitle: "დრო: 4 კვირა · 3 პარალელური გუნდი · 25+ მოხალისე",
  },
  props: {
    status: "🟢 მიმდინარე",
    startDate: "მარ 10, 2026",
    endDate: "აპრ 7, 2026",
    owner: "ფოფო",
    teamsCount: "3 გუნდი",
    targetSponsors: "5 კომპანია",
  },
  callout:
    "ყველა 3 გუნდი მუშაობს პარალელურად, რათა ბრენდინგი → კონტენტი → აუთრიჩი → ავტომატიზაცია მოხდეს ერთდროულად. ყოველ კვირას 30 წთ-იანი სინქი.",
  goals: [
    { id: "g1", icon: "🚀 დავიწყოთ პროექტზე მუშაობა ", text: "დავიწყოთ პროექტზე მუშაობა" },
    { id: "g2", icon: "🤝 ვიპოვოთ 5 კომპანია ღირებულებების შესაბამისად", text: "ვიპოვოთ 5 კომპანია ღირებულებების შესაბამისად" },
    { id: "g3", icon: "📅წინასწარ შევქმნათ 1 თვის კონტენტი", text: "წინასწარ შევქმნათ 1 თვის კონტენტი" },
    { id: "g4", icon: "📱📱 დავიწყოთ სოც. ქსელებში აქტიურობა", text: "დავიწყოთ სოც. ქსელებში აქტიურობა" },
  ],
  teams: [
    {
      id: "marine",
      emoji: "🏔️ ფბ ",
      name: 'გუნდი "მარინე"',
      role: "ბრენდინგი",
      color: "#2d5a3d",
      alpinist: "მიზანი -თვის ბოლოს გვყავდეს 2K ფოლოუერი",
      tasks: [
        "ბრენდის ღირებულებების განსაზღვრა (3–5)",
        "მოკლე ბრენდის დოკუმენტი (1 გვერდი)",
        "სოც. მედიის ვიზუალური სტილი",
        "3 პოსტის შაბლონი",
      ],
      leader: "👑 ლიდერი",
      members: ["სოფია ჩ.", "ნანუკა ქ.", "ნატა ქ.", "მეგი ჩ.", "ანა ჩ."],
    },
    {
      id: "aleksandra",
      emoji: "⛰️ ინსტა",
      name: 'გუნდი "ალექსანდრა"',
      role: "სპონსორები & გრანტები",
      color: "#5a3d2d",
      alpinist: "მიზანი -თვის ბოლოს გვყავდეს 2K ფოლოუერი",
      tasks: [
        "20 კანდიდატ-კომპანიის სია",
        "ტოპ 5 შორტლისტი კამპანიების მიხედვით",
        "აუთრიჩის პაკეტი + ფოლოუაფები",
        "ლოკ. & საერთ. გრანტების კვლევა",
      ],
      leader: "👑 ლიდერი",
      members: ["მარიამ შ.", "ლელი ქ.", "თამარი კ.", "მარიამ გ.", "ნიცა ღ."],
    },
    {
      id: "lamara",
      emoji: "📸 ტიკტოკი",
      name: 'გუნდი "ლამარა"',
      role: "სოც. მედია & კონტენტი",
      color: "#2d3d5a",
      alpinist: "მიზანი -თვის ბოლოს გვყავდეს 2K ფოლოუერი",
      tasks: [
        "1 თვის კონტენტ კალენდარი",
        "LinkedIn (აუცილებელი), Instagram, TikTok",
        "გადაღებების დაგეგმვა",
        "თანამშრომლობა ბრენდინგ გუნდთან",
      ],
      leader: "👑 ლიდი - სახელი ",
      members: ["მარიამ მ.", "თამთა ტ.", "ანი ყ.", "მარი ზ.", "ანა კ."],
    },
    {
      id: "nino",
      emoji: "⚙️ ტექი",
      name: 'გუნდი "ნინო"',
      role: "ტექნიკა & ავტომატიზაცია",
      color: "#4a2d5a",
      alpinist: "პოსტების დადება განთავსება  მაქსიმალიურად გამარტივდეს",
      tasks: [
        "Buffer / Later-ის სქედიულინგის დაყენება",
        "სასპონსორო კიტის გენერატორი",
        "1 თვის პოსტების სქედიულინგი",
        "ყოველკვირეული რეპორტინგი",
      ],
      leader: "👑 ლიდი - სახელი ",
      members: ["ელენე დ.", "ანი ბ.", "ნინო სნ.", "სალომე კ.", "ეკა ა."],
    },
    {
      id: "maia",
      emoji: "🧭 ბრენდინგი",
      name: 'გუნდი "მაია"',
      role: "გასვლები & ტრენინგები",
      color: "#5a4a2d",
      alpinist: " მიზანი -გვქონდეს ვიზუალური ინდეტობა ",
      tasks: [
        "ბრენდის ღირებულებების განსაზღვრა (3–5)",
        "მოკლე ბრენდის დოკუმენტი (1 გვერდი)",
        "ყოველ აქტივობას — კონტენტის გეგმა",
        "სოც. მედიის ვიზუალური სტილი",
      ],
      leader: "👑  ლიდი - სახელი ",
      members: ["მარიამ ლ.", "ანა ჩანგ.", "თამარ გ.", "სალომე ც.", "ანი ზ."],
      fullWidth: true,
    },
  ],
  stories: [
    { id: "s1", story: "ბრენდის ღირებულებების განსაზღვრა", teamLabel: "მარინე", leader: "ვაკანტური — 🙋 მოხალისე?", status: "todo", deadline: "კვ. 1" },
    { id: "s2", story: "20 კომპანიის სიის შედგენა", teamLabel: "ალექსანდრა", leader: "ვაკანტური — 🙋 მოხალისე?", status: "todo", deadline: "კვ. 1" },
    { id: "s3", story: "სოც. მედია კალენდარი (აპრილი)", teamLabel: "ლამარა", leader: "ვაკანტური — 🙋 მოხალისე?", status: "todo", deadline: "კვ. 2" },
    { id: "s4", story: "Buffer-ის სქედიულინგის დაყენება", teamLabel: "ნინო", leader: "ვაკანტური — 🙋 მოხალისე?", status: "todo", deadline: "კვ. 1" },
    { id: "s5", story: "პირველი სრიალის გასვლა", teamLabel: "მაია", leader: "ვაკანტური — 🙋 მოხალისე?", status: "todo", deadline: "კვ. 2" },
  ],
  sync: {
    reports: [
      "რა დასრულდა ამ კვირაში",
      "რა ბლოკავს პროგრესს",
      "შემდეგი კვირის პრიორიტეტები",
      "ვის / რა სჭირდება დახმარება",
      "",
    ],
    rules: [
      "ყველა კითხვა იკვრება ფოფოსთან",
      "გუნდებს შორის კომუნიკაცია — Notion-ში",
      "ლიდერი ირჩევა ყოველ სტორიზე ახლიდან",
      "ნებისმიერს შეუძლია მოხალისეობა",
    ],
  },
  volunteers: [
    { id: "v1",  name: "მარიამ მათიაშვილი",  skills: "სოც.მედია, ფოტო/ვიდეო",    hours: "3–5 სთ",   team: "ლამარა" },
    { id: "v2",  name: "სოფია ჩოხელი",        skills: "დიზაინი, ფოტო/ვიდეო",     hours: "3–5 სთ",   team: "მარინე" },
    { id: "v3",  name: "მარი ზედგინიძე",       skills: "სოც.მედია",               hours: "1–2 სთ",   team: "ლამარა" },
    { id: "v4",  name: "ნანუკა ქეშელაშვილი",   skills: "დიზაინი, ფოტო/ვიდეო",     hours: "ხანდახან", team: "მარინე" },
    { id: "v5",  name: "ელენე დონაძე",          skills: "ვებ / PM",                hours: "3–5 სთ",   team: "ნინო" },
    { id: "v6",  name: "მარიამ ლომიძე",         skills: "სოც.მედია, ფოტო/ვიდეო",   hours: "3–5 სთ",   team: "მაია" },
    { id: "v7",  name: "ნინო სნჯოიანი",         skills: "სოც.მედია, ფოტო/ვიდეო",   hours: "3–5 სთ",   team: "ნინო" },
    { id: "v8",  name: "ანა კეკუა",             skills: "სოც.მედია, ლოჯისტიკა",    hours: "3–5 სთ",   team: "ლამარა" },
    { id: "v9",  name: "ლელი ქურასბედიანი",     skills: "სოც.მედია, სპონს.",       hours: "ხანდახან", team: "ალექსანდრა" },
    { id: "v10", name: "მარიამ შათირიშვილი",    skills: "სპონს., ლოჯისტ.",         hours: "3–5 სთ",   team: "ალექსანდრა" },
    { id: "v11", name: "ნატა ქავთარაძე",        skills: "დიზაინი, ფოტო/ვიდეო",     hours: "ხანდახან", team: "მარინე" },
    { id: "v12", name: "ანი ზანკალიანი",         skills: "დიზაინი, ლოჯისტ.",        hours: "ხანდახან", team: "მაია" },
    { id: "v13", name: "თამთა ტრაპაიძე",        skills: "სოც.მედია, ფოტო/ვიდეო",   hours: "3–5 სთ",   team: "ლამარა" },
    { id: "v14", name: "ანი ყავლაშვილი",        skills: "სოც.მედია, ფოტო/ვიდეო",   hours: "3–5 სთ",   team: "ლამარა" },
    { id: "v15", name: "თამარი კაპანაძე",       skills: "სოც.მედია, სპონს.",        hours: "3–5 სთ",   team: "ალექსანდრა" },
    { id: "v16", name: "ნიცა ღლონტი",           skills: "IT PM, ლოჯისტ.",          hours: "1–2 სთ",   team: "ალექსანდრა" },
    { id: "v17", name: "სალომე კაჭკაჭაშვილი",   skills: "ფოტო/ვიდეო, ლოჯისტ.",    hours: "3–5 სთ",   team: "ნინო" },
    { id: "v18", name: "ეკა ავსაჯანიშვილი",     skills: "PM",                      hours: "სხვა",     team: "ნინო" },
    { id: "v19", name: "ანა ჩანგიანი",          skills: "ფოტო/ვიდეო",             hours: "1–2 სთ",   team: "მაია" },
    { id: "v20", name: "მეგი ჩუბინიძე",         skills: "დიზაინი, სოც.მედია",      hours: "ხანდახან", team: "მარინე" },
    { id: "v21", name: "მარიამ გიორგაძე",       skills: "სოც.მედია, სპონს.",        hours: "3–5 სთ",   team: "ალექსანდრა" },
    { id: "v22", name: "თამარ გელაშვილი",       skills: "ფოტო/ვიდეო",             hours: "3–5 სთ",   team: "მაია" },
    { id: "v23", name: "ანი ბერუაშვილი",        skills: "Frontend Dev",            hours: "3–5 სთ",   team: "ნინო" },
    { id: "v24", name: "ანა ჩუბინიძე",          skills: "დიზაინი, Android Dev",    hours: "3–5 სთ",   team: "მარინე" },
    { id: "v25", name: "სალომე ცისკაძე",        skills: "ფოტო/ვიდეო",             hours: "1–2 სთ",   team: "მაია" },
  ],
};

// ── shared helpers ───────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

const editableCls =
  "bg-transparent outline-none w-full min-w-0 border-b border-transparent " +
  "hover:border-[#e8e3db] focus:border-[#2d5a3d] transition-colors placeholder:text-[#c5b8aa]";

function EI({
  value,
  onChange,
  className,
  placeholder,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "…"}
      className={`${editableCls} ${className ?? ""}`}
      style={style}
    />
  );
}

function EA({
  value,
  onChange,
  className,
  placeholder,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "…"}
      className={`${editableCls} resize-none overflow-hidden ${className ?? ""}`}
      style={style}
    />
  );
}

// ── status helpers ───────────────────────────────────────────────────────────

const STATUS_LABELS: Record<Story["status"], string> = {
  todo: "დასაწყები",
  progress: "მიმდინარე",
  done: "დასრულებული",
};
const STATUS_CLS: Record<Story["status"], string> = {
  todo: "bg-[#f0f0f0] text-[#666]",
  progress: "bg-[#fff3cd] text-[#856404]",
  done: "bg-[#e8f0eb] text-[#2d5a3d]",
};

// ── main component ───────────────────────────────────────────────────────────

export default function Phase1() {
  const [data, setData] = React.useState<Phase1Data>(() => {
    try {
      const raw = localStorage.getItem(PHASE1_KEY);
      if (raw) return { ...DEFAULT_DATA, ...(JSON.parse(raw) as Partial<Phase1Data>) };
    } catch { /* ignore */ }
    return DEFAULT_DATA;
  });

  const [saved, setSaved] = React.useState(false);

  // Load from remote on mount; remote wins over localStorage
  React.useEffect(() => {
    fetch(`/api/phase1-draft?draftId=${PHASE1_DRAFT_ID}`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((res: { ok: boolean; found: boolean; data?: Phase1Data } | null) => {
        if (res?.ok && res.found && res.data) {
          setData((local) => ({ ...local, ...res.data }));
        }
      });
  }, []);

  async function save() {
    try {
      localStorage.setItem(PHASE1_KEY, JSON.stringify(data));
      await fetch("/api/phase1-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: PHASE1_DRAFT_ID, data }),
      }).catch(() => {}); // ignore network errors; localStorage save already succeeded
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
  }

  // ── updaters ────────────────────────────────────────────────────────────

  function upHeader(k: keyof Phase1Data["header"], v: string) {
    setData((d) => ({ ...d, header: { ...d.header, [k]: v } }));
  }
  function upProp(k: keyof Phase1Data["props"], v: string) {
    setData((d) => ({ ...d, props: { ...d.props, [k]: v } }));
  }
  function upCallout(v: string) {
    setData((d) => ({ ...d, callout: v }));
  }
  function upGoal(i: number, k: keyof Goal, v: string) {
    setData((d) => {
      const goals = [...d.goals];
      goals[i] = { ...goals[i], [k]: v };
      return { ...d, goals };
    });
  }
  function addGoal() {
    setData((d) => ({ ...d, goals: [...d.goals, { id: uid(), icon: "🎯", text: "" }] }));
  }
  function removeGoal(i: number) {
    setData((d) => ({ ...d, goals: d.goals.filter((_, idx) => idx !== i) }));
  }
  function upTeam(id: string, k: keyof Team, v: string) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => (t.id === id ? { ...t, [k]: v } : t)),
    }));
  }
  function upTeamTask(id: string, ti: number, v: string) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => {
        if (t.id !== id) return t;
        const tasks = [...t.tasks];
        tasks[ti] = v;
        return { ...t, tasks };
      }),
    }));
  }
  function addTeamTask(id: string) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => (t.id === id ? { ...t, tasks: [...t.tasks, ""] } : t)),
    }));
  }
  function removeTeamTask(id: string, ti: number) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => {
        if (t.id !== id) return t;
        return { ...t, tasks: t.tasks.filter((_, i) => i !== ti) };
      }),
    }));
  }
  function upTeamMember(id: string, mi: number, v: string) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => {
        if (t.id !== id) return t;
        const members = [...t.members];
        members[mi] = v;
        return { ...t, members };
      }),
    }));
  }
  function addTeamMember(id: string) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => (t.id === id ? { ...t, members: [...t.members, ""] } : t)),
    }));
  }
  function removeTeamMember(id: string, mi: number) {
    setData((d) => ({
      ...d,
      teams: d.teams.map((t) => {
        if (t.id !== id) return t;
        return { ...t, members: t.members.filter((_, i) => i !== mi) };
      }),
    }));
  }
  function upStory(id: string, k: keyof Story, v: string) {
    setData((d) => ({
      ...d,
      stories: d.stories.map((s) => (s.id === id ? { ...s, [k]: v } : s)),
    }));
  }
  function addStory() {
    setData((d) => ({
      ...d,
      stories: [...d.stories, { id: uid(), story: "", teamLabel: "", leader: "", status: "todo", deadline: "" }],
    }));
  }
  function removeStory(id: string) {
    setData((d) => ({ ...d, stories: d.stories.filter((s) => s.id !== id) }));
  }
  function upSync(col: "reports" | "rules", i: number, v: string) {
    setData((d) => {
      const arr = [...d.sync[col]];
      arr[i] = v;
      return { ...d, sync: { ...d.sync, [col]: arr } };
    });
  }
  function addSync(col: "reports" | "rules") {
    setData((d) => ({ ...d, sync: { ...d.sync, [col]: [...d.sync[col], ""] } }));
  }
  function removeSync(col: "reports" | "rules", i: number) {
    setData((d) => ({ ...d, sync: { ...d.sync, [col]: d.sync[col].filter((_, idx) => idx !== i) } }));
  }
  function upVolunteer(id: string, k: keyof Volunteer, v: string) {
    setData((d) => ({
      ...d,
      volunteers: d.volunteers.map((v2) => (v2.id === id ? { ...v2, [k]: v } : v2)),
    }));
  }
  function addVolunteer() {
    setData((d) => ({
      ...d,
      volunteers: [...d.volunteers, { id: uid(), name: "", skills: "", hours: "", team: "" }],
    }));
  }
  function removeVolunteer(id: string) {
    setData((d) => ({ ...d, volunteers: d.volunteers.filter((v) => v.id !== id) }));
  }

  // ── render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-[#faf8f5] text-[#1a1814]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 overflow-y-auto border-r border-[#e8e3db] bg-white lg:block">
        <div className="p-4 pb-5 border-b border-[#e8e3db]" style={{ fontFamily: "'Playfair Display', serif" }}>
          <div className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">🏔️ ქალთა ალპური სკოლა</div>
        </div>

        <div className="p-3">
          <div className="px-2 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">მთავარი</div>
          <a href="#overview" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#1a1814] hover:bg-[#f0f4f1] font-medium">📋 სპონსორობის გეგმა</a>
          <a href="#teams"    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#6b6459] hover:bg-[#f0f4f1]">👥 გუნდები</a>
          <a href="#stories"  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#6b6459] hover:bg-[#f0f4f1]">📖 სტორები</a>
          <a href="#volunteers" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#6b6459] hover:bg-[#f0f4f1]">🙋 მოხალისეები</a>

          <div className="px-2 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">გუნდები</div>
          {data.teams.map((t) => (
            <a key={t.id} href={`#team-${t.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#6b6459] hover:bg-[#f0f4f1]">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
              {t.name}
            </a>
          ))}

          <div className="px-2 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">სხვა გვერდები</div>
          <Link to="/" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#6b6459] hover:bg-[#f0f4f1]">
            📋 SP გენერატორი →
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 lg:ml-60 px-5 py-10 lg:px-16 lg:py-12 max-w-5xl">

        {/* Save bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-sm text-[#6b6459] hover:text-[#2d5a3d] transition-colors lg:hidden">
            ← SP გენერატორი
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-[#2d5a3d]">
                <CheckCircle2 className="h-4 w-4" /> შენახულია
              </span>
            )}
            <button
              onClick={save}
              className="flex items-center gap-2 rounded-lg bg-[#2d5a3d] px-4 py-2 text-sm font-medium text-white hover:bg-[#245030] transition-colors"
            >
              <Save className="h-4 w-4" />
              შენახვა
            </button>
          </div>
        </div>

        {/* ── Page Header ── */}
        <div id="overview" className="mb-8 border-b border-[#e8e3db] pb-8">
          <div className="mb-3 text-5xl">
            <EI value={data.header.emoji} onChange={(v) => upHeader("emoji", v)} className="w-16 text-5xl" />
          </div>
          <EA
            value={data.header.title}
            onChange={(v) => upHeader("title", v)}
            className="mb-2 w-full text-3xl font-bold leading-tight text-[#1a1814] lg:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" } as React.CSSProperties}
          />
          <EI
            value={data.header.subtitle}
            onChange={(v) => upHeader("subtitle", v)}
            className="mb-5 text-base text-[#6b6459]"
          />
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f0eb] px-3 py-1 text-xs font-medium text-[#2d5a3d]">✅ აქტიური</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf3e1] px-3 py-1 text-xs font-medium text-[#c4973a]">📅 მარ–აპრ 2026</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8edf5] px-3 py-1 text-xs font-medium text-[#2d3d5a]">👥 25 მოხალისე</span>
          </div>
        </div>

        {/* ── Properties ── */}
        <div className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-[#e8e3db] bg-white p-5 sm:grid-cols-3">
          {(
            [
              ["status", "სტატუსი"],
              ["startDate", "დასაწყისი"],
              ["endDate", "დასასრული"],
              ["owner", "პასუხისმგებელი"],
              ["teamsCount", "გუნდები"],
              ["targetSponsors", "მიზნობრივი სპონსორები"],
            ] as [keyof Phase1Data["props"], string][]
          ).map(([k, label]) => (
            <div key={k} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">{label}</span>
              <EI value={data.props[k]} onChange={(v) => upProp(k, v)} className="text-sm font-medium" />
            </div>
          ))}
        </div>

        {/* ── Callout ── */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#c5ddc9] bg-[#e8f0eb] px-5 py-4 text-[#2d5a3d]">
          <span className="mt-0.5 flex-shrink-0 text-lg">💡</span>
          <EA value={data.callout} onChange={upCallout} className="text-sm text-[#2d5a3d]" />
        </div>

        {/* ── Goals ── */}
        <SectionHeading emoji="🎯" title="მიზნები" />
        <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data.goals.map((g, i) => (
            <div key={g.id} className="group flex items-center gap-2 rounded-lg border border-[#e8e3db] bg-white px-3 py-2 hover:shadow-sm transition-shadow">
              <EI value={g.icon} onChange={(v) => upGoal(i, "icon", v)} className="w-7 shrink-0 text-base" />
              <EI value={g.text} onChange={(v) => upGoal(i, "text", v)} className="flex-1 text-sm" />
              <button onClick={() => removeGoal(i)} className="hidden shrink-0 text-[#6b6459] hover:text-rose-500 group-hover:block">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addGoal} className="mb-8 flex items-center gap-1.5 text-sm text-[#6b6459] hover:text-[#2d5a3d]">
          <Plus className="h-4 w-4" /> მიზნის დამატება
        </button>

        <Divider />

        {/* ── Teams ── */}
        <SectionHeading emoji="👥" title="გუნდები" id="teams" />
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.teams.map((team) => (
            <div key={team.id} id={`team-${team.id}`} className={`rounded-xl border border-[#e8e3db] bg-white overflow-hidden hover:shadow-md transition-shadow ${team.fullWidth ? "md:col-span-2" : ""}`}>
              {/* team header */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ background: team.color }}>
                <EI value={team.emoji} onChange={(v) => upTeam(team.id, "emoji", v)} className="w-9 text-2xl text-white border-white/30" />
                <div className="min-w-0 flex-1">
                  <EI value={team.name} onChange={(v) => upTeam(team.id, "name", v)} className="font-semibold text-white text-base border-white/30" style={{ fontFamily: "'Playfair Display', serif" } as React.CSSProperties} />
                  <EI value={team.role} onChange={(v) => upTeam(team.id, "role", v)} className="mt-0.5 text-xs text-white/75 border-white/20" />
                </div>
              </div>

              {/* team body */}
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">
                  <span className="h-px w-4 bg-[#e8e3db]" />
                  <EI value={team.alpinist} onChange={(v) => upTeam(team.id, "alpinist", v)} className="flex-1 text-[10px] uppercase tracking-widest" />
                </div>

                {/* tasks */}
                <ul className="mb-4 space-y-1">
                  {team.tasks.map((task, ti) => (
                    <li key={ti} className="group flex items-center gap-2 border-b border-[#e8e3db] py-1.5 last:border-0">
                      <span className="shrink-0 text-[10px] text-[#6b6459]">◻</span>
                      <EI value={task} onChange={(v) => upTeamTask(team.id, ti, v)} className="flex-1 text-sm text-[#6b6459]" />
                      <button onClick={() => removeTeamTask(team.id, ti)} className="hidden shrink-0 text-[#6b6459] hover:text-rose-500 group-hover:block">
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => addTeamTask(team.id)} className="mb-4 flex items-center gap-1 text-xs text-[#6b6459] hover:text-[#2d5a3d]">
                  <Plus className="h-3 w-3" /> დავალების დამატება
                </button>

                {/* members */}
                <div className="border-t border-[#e8e3db] pt-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">წევრები</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#2d5a3d] bg-[#e8f0eb] px-3 py-1 text-xs font-medium text-[#2d5a3d]">
                      <EI value={team.leader} onChange={(v) => upTeam(team.id, "leader", v)} className="text-xs text-[#2d5a3d]" />
                    </span>
                    {team.members.map((m, mi) => (
                      <span key={mi} className="group flex items-center gap-1 rounded-full border border-[#e8e3db] bg-[#f0f4f1] px-3 py-1 text-xs">
                        <EI value={m} onChange={(v) => upTeamMember(team.id, mi, v)} className="text-xs w-20" />
                        <button onClick={() => removeTeamMember(team.id, mi)} className="hidden text-[#6b6459] hover:text-rose-500 group-hover:block">
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                    <button onClick={() => addTeamMember(team.id)} className="rounded-full border border-dashed border-[#e8e3db] px-3 py-1 text-xs text-[#6b6459] hover:border-[#2d5a3d] hover:text-[#2d5a3d]">
                      + წევრი
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── Story Tracker ── */}
        <SectionHeading emoji="📖" title="სტორი ტრეკერი" id="stories" />
        <div className="mb-6 overflow-hidden rounded-xl border border-[#e8e3db] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e3db] bg-[#f0f4f1]">
                {["სტორი", "გუნდი", "ლიდერი", "სტატუსი", "ვადა", ""].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.stories.map((s) => (
                <tr key={s.id} className="group border-b border-[#e8e3db] last:border-0 hover:bg-[#f0f4f1] transition-colors">
                  <td className="px-4 py-3"><EI value={s.story} onChange={(v) => upStory(s.id, "story", v)} /></td>
                  <td className="px-4 py-3"><EI value={s.teamLabel} onChange={(v) => upStory(s.id, "teamLabel", v)} className="w-24" /></td>
                  <td className="px-4 py-3"><EI value={s.leader} onChange={(v) => upStory(s.id, "leader", v)} /></td>
                  <td className="px-4 py-3">
                    <select
                      value={s.status}
                      onChange={(e) => upStory(s.id, "status", e.target.value)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium outline-none cursor-pointer ${STATUS_CLS[s.status]}`}
                    >
                      {(Object.entries(STATUS_LABELS) as [Story["status"], string][]).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3"><EI value={s.deadline} onChange={(v) => upStory(s.id, "deadline", v)} className="w-16" /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeStory(s.id)} className="hidden text-[#6b6459] hover:text-rose-500 group-hover:block">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addStory} className="mb-8 flex items-center gap-1.5 text-sm text-[#6b6459] hover:text-[#2d5a3d]">
          <Plus className="h-4 w-4" /> სტორის დამატება
        </button>

        <Divider />

        {/* ── Weekly Sync ── */}
        <SectionHeading emoji="🔄" title="ყოველკვირეული სინქი (30 წთ)" />
        <div className="mb-8 grid grid-cols-1 gap-6 rounded-xl border border-[#e8e3db] bg-white p-6 sm:grid-cols-2">
          {(["reports", "rules"] as const).map((col) => (
            <div key={col}>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1a1814]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {col === "reports" ? "📋 ყოველი გუნდი აცნობებს" : "❓ Q&A წესები"}
              </h4>
              {data.sync[col].map((item, i) => (
                <div key={i} className="group flex items-center gap-3 border-b border-[#e8e3db] py-2 last:border-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f0eb] text-[10px] font-bold text-[#2d5a3d]">
                    {col === "rules" ? "✓" : i + 1}
                  </span>
                  <EI value={item} onChange={(v) => upSync(col, i, v)} className="flex-1 text-sm text-[#1a1814]" />
                  <button onClick={() => removeSync(col, i)} className="hidden shrink-0 text-[#6b6459] hover:text-rose-500 group-hover:block">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button onClick={() => addSync(col)} className="mt-2 flex items-center gap-1 text-xs text-[#6b6459] hover:text-[#2d5a3d]">
                <Plus className="h-3 w-3" /> დამატება
              </button>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── Volunteers ── */}
        <SectionHeading emoji="🙋" title="მოხალისეები" id="volunteers" />
        <div className="mb-6 overflow-hidden rounded-xl border border-[#e8e3db] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e3db] bg-[#f0f4f1]">
                {["სახელი", "სფეროები", "დრო კვირაში", "გუნდი", ""].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6b6459]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.volunteers.map((v) => (
                <tr key={v.id} className="group border-b border-[#e8e3db] last:border-0 hover:bg-[#f0f4f1] transition-colors">
                  <td className="px-4 py-2.5"><EI value={v.name} onChange={(val) => upVolunteer(v.id, "name", val)} /></td>
                  <td className="px-4 py-2.5"><EI value={v.skills} onChange={(val) => upVolunteer(v.id, "skills", val)} className="text-[#6b6459]" /></td>
                  <td className="px-4 py-2.5"><EI value={v.hours} onChange={(val) => upVolunteer(v.id, "hours", val)} className="w-24" /></td>
                  <td className="px-4 py-2.5"><EI value={v.team} onChange={(val) => upVolunteer(v.id, "team", val)} className="w-28" /></td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => removeVolunteer(v.id)} className="hidden text-[#6b6459] hover:text-rose-500 group-hover:block">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addVolunteer} className="mb-16 flex items-center gap-1.5 text-sm text-[#6b6459] hover:text-[#2d5a3d]">
          <Plus className="h-4 w-4" /> მოხალისის დამატება
        </button>
      </main>
    </div>
  );
}

// ── small shared UI pieces ────────────────────────────────────────────────────

function SectionHeading({ emoji, title, id }: { emoji: string; title: string; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-4 mt-8 flex items-center gap-2.5 text-xl font-semibold text-[#1a1814] after:ml-2 after:h-px after:flex-1 after:bg-[#e8e3db]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {emoji} {title}
    </h2>
  );
}

function Divider() {
  return <hr className="my-8 border-t border-[#e8e3db]" />;
}
