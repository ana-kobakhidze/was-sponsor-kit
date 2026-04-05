import { Link } from "react-router-dom";
import { useEffect, useRef, useCallback, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   Women's Alpine School — Strategic Brainstorm (Phase 1 page)
   All text is inline-editable. Save persists to /api/phase1-draft (Supabase).
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Data layer ──────────────────────────────────────────────────────────────

type Phase1Data = Record<string, string>;
type Ctx = { d: Phase1Data; set: (k: string, v: string) => void };
const Phase1Ctx = createContext<Ctx>({ d: {}, set: () => {} });

const LS_KEY = "was_phase1_content_v2";
const DRAFT_ID = "phase1-shared-draft";

const DEFAULTS: Phase1Data = {
  cover_title: "Women's Alpine School",
  cover_subtitle: "Brand Foundation · Phase Strategy · Sponsor Roadmap",
  cover_location: "Tbilisi, Georgia · 2026",

  s01_title: "Who We Are",
  s01_intro: "Women's Alpine School is a Georgia-based community founded by Popo — a 40-year-old architect, mother, and mountaineer who started climbing at 33 in the Caucasus. Last year she led 35 women to the summit of Kazbegi. She teaches from her home, charges nothing, and mentors 30–50 women at a time. Now 150 of us have gathered around her to build this into something lasting.",
  s01_sub1: "The Real Version",
  s01_p1: "In Georgia, the mountains have always been masculine territory. The Caucasus produced extraordinary women alpinists — Alexandra Japaridze, Marina Utmelidze — but for most women, the alpine world remained closed. The gear was not made for you. The teams did not invite you. The culture did not expect you.",
  s01_p2: "Popo did not care. She started climbing at 33, and once she proved herself, she did not walk through that door alone — she held it open. She began teaching other women, sharing knowledge, making the path shorter for those coming after her.",
  s01_p3: "She does not ask how old you are. She does not ask where you come from. She teaches anyone who shows up. Often from her own home. Often for free.",
  s01_p4: "That is how Women's Alpine School was born — not from a business plan, but from one woman's refusal to let other women face the mountain alone.",
  s01_status: JSON.stringify(["150+ community members rallying around Popo's mission","30–50 women actively training and climbing each season","35 women summited Kazbegi last year under Popo's guidance","Grant secured from Tbilisi mayor's office for a training facility","Building secured — renovation funding still needed","Gear shortage during climbing season remains a critical bottleneck","No formal brand presence, social media strategy, or sponsor relationships yet"]),

  s02_title: "Brand Foundation",
  s02_mission: "To open the mountains of Georgia to every woman who wants to climb — regardless of age, background, or experience — through free education, community, and the stubborn belief that the summit belongs to anyone willing to try.",
  s02_vision: "A Georgia where no woman has to prove she deserves to be on a mountain. Where the alpine world is as welcoming to a 40-year-old mother from Tbilisi as it is to anyone else. Where the Caucasus belongs to everyone brave enough to climb.",
  s02_values: JSON.stringify([
    { label: "Open Summits", desc: "The mountains belong to everyone. We remove barriers — financial, cultural, and psychological — that keep women from climbing." },
    { label: "Earned Through Effort", desc: "You do not need anyone's approval to climb. You only need to show up and work." },
    { label: "Teach, Don't Gate-Keep", desc: "Knowledge flows freely. Popo teaches from her home for free. That generosity is our DNA." },
    { label: "Strength in Sisterhood", desc: "The mountain is easier when you are not alone. We climb together, fail together, summit together." },
    { label: "Quiet Power", desc: "We do not shout. We let 35 women standing on Kazbegi speak for itself." },
  ]),
  s02_voiceIntro: "WAS speaks like Popo leads — direct, warm, no-nonsense, and deeply generous. We do not use corporate language. We do not perform inspiration. We tell real stories about real women on real mountains.",
  s02_card1_label: "We sound like", s02_card1_title: "A trusted guide", s02_card1_body: "Confident but not arrogant. Warm but not soft. Like Popo telling you to check your harness one more time.",
  s02_card2_label: "We never sound like", s02_card2_title: "A wellness brand", s02_card2_body: "Not a fitness influencer. Not a motivational poster. Not a charity. We are a school, not a support group.",
  s02_card3_label: "Our tone shifts", s02_card3_title: "With the moment", s02_card3_body: "Serious on safety. Proud on summits. Playful in the mess. Always honest. When things are funny — we laugh.",

  s03_title: "The Three Phases",
  s03_intro: "Each phase tells our story to the public and maps to an organizational goal. They are sequential — each builds credibility and audience for the next.",
  s03_p1_tag: "\"Nothing will work for you.\"", s03_p1_desc: "The Inner Voice — name the doubt, make women feel seen.", s03_p1_goal: "Awareness + followers",
  s03_p2_tag: "\"Try anyway.\"", s03_p2_desc: "The Path — show the work, build trust and community.", s03_p2_goal: "Engagement + community",
  s03_p3_tag: "\"Nothing will work — until it does.\"", s03_p3_desc: "The Summit — prove the model, attract partners.", s03_p3_goal: "Sponsorships + sustainability",

  ph1_tagline: "Nothing will work for you.",
  ph1_geo: "თუ არც გამოვა",
  ph1_innerVoice_title: "The Inner Voice",
  ph1_innerVoice_intro: "This phrase is not something society says to women from the outside. Most of the time, it is something women say to themselves — and it's never poetic. It's the 2am Google search. The excuse that sounds reasonable. The joke you make about yourself before anyone else can:",
  ph1_voice_selfRoast: JSON.stringify(["You're 35 and you've never been on skis. This is going to be embarrassing.","Everyone else started when they were twelve. You started last Tuesday."]),
  ph1_voice_anxious: JSON.stringify(["What if you're the slowest one and everyone has to wait for you?","You can't even keep a plant alive and you want to summit Kazbegi?"]),
  ph1_voice_almostQuit: JSON.stringify(["Maybe next year. When I'm more prepared.","This is a hobby for people who have their life together."]),
  ph1_voice_laugh: JSON.stringify(["I fell getting OFF the ski lift. Not on the slope. Off the lift.","My 'mountain gear' is a Zara jacket and borrowed gloves."]),
  ph1_naming: "Phase 1 names this voice out loud. Not to defeat it — but to show every woman watching that she is not the only one who hears it.",
  ph1_emotional: "Make women feel seen in their doubt. Most empowerment content skips to triumph. We start with truth: that most women talk themselves out of things before anyone else has a chance to. Phase 1 says: we know. We hear it too. And we're going anyway.",
  ph1_strategic: "Build initial audience through emotional resonance. Content should make women smile with self-recognition, nod their heads, and hit share. It should travel beyond our 150 members to reach women who do not know WAS exists yet.",
  ph1_ski_title: "The Ski Touring Trip",
  ph1_ski_intro: "During Phase 1, WAS will organize a ski touring trip where most participants do not know how to ski. This is intentional.",
  ph1_ski_p1: "The activities include skiing, paragliding, climbing, and going to the mountains — all things most participants have never done, and many thought they were \"too late\" to start.",
  ph1_ski_p2: "The goal is not perfect performance. The goal is real emotions captured honestly:",
  ph1_ski_bullets: JSON.stringify(["Falling — and the face you make right before you fall","Struggling — and the moment you realize everyone else is struggling too","Laughing — because it turns out this is actually fun","Frustration — the honest kind, not performed for camera","Trying again — because what else are you going to do","The surprise moment — when you realize you almost forgot to be afraid"]),
  ph1_ski_p3: "Women watching should recognize themselves. They should have a knowing smile. The content should feel like looking in a mirror, not watching a highlight reel.",
  ph1_fun_title: "The Fun Factor",
  ph1_fun_p1: "The trap with vulnerability content is that it becomes heavy, sad, and performative. Phase 1 is not a therapy session. It is a group of women falling on skis and laughing about it. The absurdity of trying paragliding when you have never been comfortable on a chairlift. The moment when fear turns into a grin.",
  ph1_fun_quote: "Yes, I told myself nothing would work. And then I did it anyway. And it was terrible. And it was hilarious. And I want to do it again.",
  ph1_mental_title: "The Mental Health Connection",
  ph1_mental_p1: "When you are focused on movement — on balance, on breathing, on the next step — something happens: the noise disappears. Problems pause. Overthinking stops. For a moment, you are simply present.",
  ph1_mental_p2: "This is one of the strongest experiences the mountains give people. Particularly powerful for women carrying the weight of self-doubt, anxiety, and the pressure to be everything for everyone.",
  ph1_mental_p3: "We do not market this as therapy. We show it. A woman's face when she reaches a ridge and realizes she has not thought about her inbox in three hours. That is the content.",
  ph1_pillars: JSON.stringify([
    { label: "The Inner Voice Series", desc: "Short-form content featuring real WAS women sharing their specific doubt before starting. Text overlays on mountain footage. The doubt in large text, then what happened next." },
    { label: "Ski Trip Documentary", desc: "Raw behind-the-scenes footage. Falls, laughter, frustration, first attempts. Short clips for Reels/TikTok and longer recap for YouTube. The anchor content of Phase 1." },
    { label: "Popo's Origin Story", desc: "The founding narrative across multiple posts. Started at 33. Architect. Mother. Teaches from home for free. The hero story that anchors the brand." },
    { label: "Georgia's Women Alpinists", desc: "Posts honoring Japaridze, Utmelidze, and others. Reclaiming their stories to show women have always belonged in the Caucasus." },
    { label: "The Numbers", desc: "Infographics: women vs. men in Georgian climbing, gear costs, female mountain guides. Data that makes the problem visible and shareable." },
    { label: "\"I Almost Forgot\" Moments", desc: "The moment during activity where a woman forgets her fear and is just present. Slow-motion, quiet music, real faces. Tagline: \"Almost forgot it's for fun.\"" },
  ]),
  ph1_calendar: JSON.stringify([
    { day: "01", ig: "Logo reveal + \"We are WAS\"", tt: "—", st: "Countdown teaser" },
    { day: "02", ig: "Popo Part 1: Started at 33", tt: "—", st: "Old climbing photos" },
    { day: "03", ig: "—", tt: "Inner Voice #1: \"Too old\"", st: "Poll: What did you tell yourself?" },
    { day: "05", ig: "Georgia's women alpinists", tt: "—", st: "History: Japaridze" },
    { day: "07", ig: "Popo Part 2: Teaching", tt: "Inner Voice #2: \"Not for you\"", st: "Popo Q&A" },
    { day: "09", ig: "The Numbers infographic", tt: "—", st: "Reactions to the data" },
    { day: "10", ig: "—", tt: "Ski teaser: \"None of us can ski\"", st: "Gear packing chaos" },
    { day: "12", ig: "Ski Day 1: falls + laughs", tt: "Every fall compilation", st: "Live from the mountain" },
    { day: "14", ig: "\"Almost Forgot\" moment", tt: "Before vs. after first run", st: "Week 2 recap" },
  ]),
  ph1_metrics: JSON.stringify(["Follower growth rate — target: 1,000–2,000 in first 8 weeks","Share and save rate on posts","DMs and comments from women saying \"this is me\"","Ski trip content performance (views, engagement, reach)","Email list signups from landing page"]),
  ph1_questions: JSON.stringify(["How raw do we go? Are women comfortable on camera with self-doubt stories?","Do we lead with Popo's story or the collective Inner Voice series?","Hashtag: #WomensAlpineSchool? Something in Georgian?","Language: Georgian only, bilingual, or English-first?","Instagram + TikTok simultaneously, or Instagram first?","Do we have a videographer for the ski trip?","Should we invite women from outside the community?"]),

  ph2_tagline: "Try anyway. Trust the process.",
  ph2_intro: "The doubt has been named. Now we show what happens when you ignore it.",
  ph2_bullets: JSON.stringify(["The shift from doubt to persistence","Training diaries: documenting real progress","First-timer arcs: zero to first summit","Popo Teaches: educational short-form content","The gear reality: honest content seeding Phase 3","Community moments: sisterhood in action","The facility renovation story"]),
  ph3_tagline: "Nothing will work — until it does.",
  ph3_intro: "The summit — literally and strategically. WAS has a story, documented proof, and is ready for sponsors.",
  ph3_bullets: JSON.stringify(["Summit stories: professional photos and video","Impact numbers: women trained, summits completed","Transformation arcs: before/after stories","\"Until It Does\" series: same women from Phase 1, now on the summit","Partnership announcements","Vision: what comes next for WAS"]),

  s04_title: "Sponsor Roadmap",
  s04_intro: "Sponsorship does not start with asking. It starts with building something so visible and compelling that companies want to be associated with it.",
  s04_stage1: JSON.stringify(["Professional photos of training and summits","Video content showing the community in action","Clear numbers: women trained, summits, community size","Active social media with consistent engagement","The facility story (grant, renovation plans)","Press coverage, even from small local outlets"]),
  s04_stage2: JSON.stringify(["One-page brand overview","Sponsor deck (PDF, 8–12 pages, designed)","Sponsorship tiers with clear value proposition","Budget breakdown: renovation, gear, events"]),
  s04_tiers: JSON.stringify([
    { label: "Tier 1: Outdoor / Gear", desc: "The North Face, Mammut, Salomon, Georgian retailers. Gear sponsorship or equipment loans." },
    { label: "Tier 2: Georgian Corporate", desc: "TBC, Bank of Georgia, Magti, Silknet. CSR partnership, women's empowerment alignment." },
    { label: "Tier 3: International NGOs", desc: "Women's empowerment, sports access funding. Grant applications with proven impact data." },
    { label: "Tier 4: Tourism / Government", desc: "Georgian Tourism Administration, Ministry of Sport. Adventure tourism narrative." },
  ]),
  s04_sponsorGets: JSON.stringify(["Association with a genuine grassroots women's movement","Authentic content in real mountain settings","Access to a growing, engaged community","Photo and video rights for their marketing","Popo and WAS story for CSR storytelling"]),

  s05_title: "Content Strategy",
  s05_card1_label: "Primary", s05_card1_title: "Instagram", s05_card1_body: "Reels for reach, Stories for daily connection, carousels for education. The visual home of WAS.",
  s05_card2_label: "Reach", s05_card2_title: "TikTok", s05_card2_body: "Short-form video for discovery. Inner Voice series, training clips, mountain POVs. Women 18–35.",
  s05_card3_label: "Community", s05_card3_title: "Facebook", s05_card3_body: "Private group for active members. Events, training schedules, gear sharing.",
  s05_frequency: JSON.stringify(["Instagram Feed: 3–4 posts/week","Stories: daily during season, 3–4×/week off-season","Reels: 2–3/week","TikTok: 3–5/week","Facebook Group: as needed"]),
  s05_seasons: JSON.stringify([
    { name: "Spring", sub: "Pre-Season", body: "Training prep. Registration. Fitness challenges. New member spotlights." },
    { name: "Summer", sub: "Climbing Season", body: "Maximum output. Summit content. Daily stories. Real-time updates." },
    { name: "Autumn", sub: "Post-Season", body: "Reflection. Recaps. Transformation stories. Sponsor outreach." },
    { name: "Winter", sub: "Off-Season", body: "Community. Indoor training. Popo's teachings. Ski trip. Fundraising." },
  ]),

  s06_title: "Next Steps",
  s06_decisions: JSON.stringify(["Language strategy: Georgian only, bilingual, or English-first?","Popo's role: public face, or featured but behind the scenes?","Content team: who films, edits, posts?","Legal: should WAS register as NGO for grant eligibility?","Photography: do we have someone for the ski trip?","Handle: confirm @WomensAlpineSchool across platforms."]),
  s06_actions: JSON.stringify(["Set up Instagram and TikTok with consistent branding.","Gather 5–10 Inner Voice stories from WAS women.","Write and photograph Popo's origin story.","Research Georgian women alpinists for history series.","Create one-page brand guidelines.","Build a landing page.","Plan the ski touring trip content shoot.","Begin documenting everything."]),
  s06_buildNext: JSON.stringify(["Visual identity system (templates from WAS logo colors)","Social media templates","Phase 1 launch content pack (2 weeks, ready to publish)","Sponsor deck (PDF, designed)","Landing page","Phase 2 and 3 deep dives"]),

  closing_quote: "Nothing will work for you.",
  closing_attrib: "— said everyone, before 35 women stood on the summit of Kazbegi.",
};

// ── Editable text component ─────────────────────────────────────────────────

function E({ k, className }: { k: string; className?: string }) {
  const { d, set } = useContext(Phase1Ctx);
  const ref = useRef<HTMLDivElement>(null);
  const val = d[k] ?? DEFAULTS[k] ?? "";

  useEffect(() => {
    if (ref.current && ref.current.textContent !== val) ref.current.textContent = val;
  }, [val]);

  return (
    <span
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => { const t = ref.current?.textContent ?? ""; if (t !== val) set(k, t); }}
      className={`outline-none cursor-text rounded-sm transition-shadow hover:ring-1 hover:ring-[#409090]/25 focus:ring-1 focus:ring-[#409090]/50 focus:bg-[#132840]/50 ${className ?? ""}`}
    />
  );
}

function EBlock({ k, className }: { k: string; className?: string }) {
  const { d, set } = useContext(Phase1Ctx);
  const ref = useRef<HTMLDivElement>(null);
  const val = d[k] ?? DEFAULTS[k] ?? "";

  useEffect(() => {
    if (ref.current && ref.current.innerText !== val) ref.current.innerText = val;
  }, [val]);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => { const t = ref.current?.innerText ?? ""; if (t !== val) set(k, t); }}
      className={`outline-none cursor-text rounded-sm transition-shadow hover:ring-1 hover:ring-[#409090]/25 focus:ring-1 focus:ring-[#409090]/50 focus:bg-[#132840]/50 ${className ?? ""}`}
    />
  );
}

// ── Editable list (JSON array of strings) ───────────────────────────────────

function EList({ k, render }: { k: string; render: (items: string[], onChange: (i: number, v: string) => void, onRemove: (i: number) => void, onAdd: () => void) => ReactNode }) {
  const { d, set } = useContext(Phase1Ctx);
  const raw = d[k] ?? DEFAULTS[k] ?? "[]";
  let items: string[];
  try { items = JSON.parse(raw); } catch { items = []; }

  const onChange = (i: number, v: string) => { const next = [...items]; next[i] = v; set(k, JSON.stringify(next)); };
  const onRemove = (i: number) => { set(k, JSON.stringify(items.filter((_, idx) => idx !== i))); };
  const onAdd = () => { set(k, JSON.stringify([...items, "New item"])); };

  return <>{render(items, onChange, onRemove, onAdd)}</>;
}

// ── Editable labeled items (JSON array of {label, desc}) ────────────────────

function ELabeledList({ k }: { k: string }) {
  const { d, set } = useContext(Phase1Ctx);
  const raw = d[k] ?? DEFAULTS[k] ?? "[]";
  let items: Array<{ label: string; desc: string }>;
  try { items = JSON.parse(raw); } catch { items = []; }

  const update = (i: number, field: "label" | "desc", v: string) => {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set(k, JSON.stringify(next));
  };
  const remove = (i: number) => set(k, JSON.stringify(items.filter((_, idx) => idx !== i)));
  const add = () => set(k, JSON.stringify([...items, { label: "New Label", desc: "Description" }]));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="reveal group border-l-2 border-[#1a3250] py-3 pl-5 transition-colors hover:border-[#409090]">
          <div className="flex items-start justify-between">
            <EditInline value={item.label} onChange={(v) => update(i, "label", v)} className="mb-1 text-[15px] font-medium text-[#50b8b0]" />
            <button onClick={() => remove(i)} className="ml-2 text-[#4a6070] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#d06060] text-xs">×</button>
          </div>
          <EditInline value={item.desc} onChange={(v) => update(i, "desc", v)} className="text-[15px] leading-relaxed text-[#7a90a8]" />
        </div>
      ))}
      <button onClick={add} className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[#409090] hover:text-[#50b8b0] transition-colors">+ ADD ITEM</button>
    </div>
  );
}

// ── Generic inline editable (for array items) ───────────────────────────────

function EditInline({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) ref.current.textContent = value;
  }, [value]);
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => { const t = ref.current?.textContent ?? ""; if (t !== value) onChange(t); }}
      className={`outline-none cursor-text rounded-sm transition-shadow hover:ring-1 hover:ring-[#409090]/25 focus:ring-1 focus:ring-[#409090]/50 focus:bg-[#132840]/50 ${className ?? ""}`}
    />
  );
}

// ── Scroll reveal ───────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const observe = useCallback(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(observe, [observe]);
  return ref;
}

// ── Layout primitives ───────────────────────────────────────────────────────

const Divider = () => <div className="mx-auto h-px w-full" style={{ background: "linear-gradient(to right, transparent, #1a3250, transparent)" }} />;
const Spacer = ({ h = 24 }: { h?: number }) => <div style={{ height: h }} />;
const MetaLabel = ({ children }: { children: string }) => (
  <div className="reveal mt-10 mb-3 border-t border-[#1a3250] pt-4 font-mono text-[10px] font-normal uppercase tracking-[0.4em] text-[#4a6070]">{children}</div>
);
const SectionLabel = ({ num }: { num: string }) => (
  <div className="reveal font-mono text-[10px] tracking-[0.5em] text-[#409090]">{num}</div>
);

function ECard({ labelKey, titleKey, bodyKey, labelColor }: { labelKey: string; titleKey: string; bodyKey: string; labelColor: string }) {
  return (
    <div className="rounded-sm bg-[#132840] p-6 transition-colors hover:bg-[#1a3250]">
      <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: labelColor }}><E k={labelKey} /></div>
      <div className="mb-3 font-serif text-[1.15rem] text-[#edf0f5]"><E k={titleKey} /></div>
      <div className="text-[14px] leading-relaxed text-[#7a90a8]"><E k={bodyKey} /></div>
    </div>
  );
}

function VoiceGroup({ label, k, color }: { label: string; k: string; color: string }) {
  return (
    <EList k={k} render={(items, onChange, onRemove, onAdd) => (
      <div className="my-5 group/vg">
        <div className="mb-2 pl-8 font-mono text-[9px] uppercase tracking-[0.4em] text-[#4a6070]">{label}</div>
        {items.map((item, i) => (
          <div key={i} className="reveal relative py-1.5 pl-8 pr-6 group font-serif text-[1.15rem] italic" style={{ color }}>
            <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 opacity-30" style={{ background: color }} />
            &ldquo;<EditInline value={item} onChange={(v) => onChange(i, v)} className="inline" />&rdquo;
            <button onClick={() => onRemove(i)} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4a6070] opacity-0 group-hover:opacity-100 hover:text-[#d06060] text-xs">×</button>
          </div>
        ))}
        <button onClick={onAdd} className="ml-8 mt-1 font-mono text-[9px] tracking-[0.2em] text-[#409090] opacity-0 group-hover/vg:opacity-100 hover:text-[#50b8b0] transition-opacity">+ ADD</button>
      </div>
    )} />
  );
}

function ECalendar({ k }: { k: string }) {
  const { d, set } = useContext(Phase1Ctx);
  const raw = d[k] ?? DEFAULTS[k] ?? "[]";
  let rows: Array<{ day: string; ig: string; tt: string; st: string }>;
  try { rows = JSON.parse(raw); } catch { rows = []; }

  const update = (i: number, field: string, v: string) => {
    const next = rows.map((r, idx) => idx === i ? { ...r, [field]: v } : r);
    set(k, JSON.stringify(next));
  };
  const remove = (i: number) => set(k, JSON.stringify(rows.filter((_, idx) => idx !== i)));
  const add = () => set(k, JSON.stringify([...rows, { day: "—", ig: "—", tt: "—", st: "—" }]));

  const dim = "text-[#4a6070]"; const normal = "text-[#b8c8d8]";
  return (
    <div className="reveal overflow-x-auto">
      <table className="w-full border-collapse">
        <thead><tr className="bg-[#1a3250]">
          <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.3em] text-[#50b8b0]">Day</th>
          <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.3em] text-[#50b8b0]">Instagram</th>
          <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.3em] text-[#50b8b0]">TikTok</th>
          <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.3em] text-[#50b8b0]">Stories</th>
          <th className="w-6"></th>
        </tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`group ${i % 2 === 0 ? "bg-[#132840]" : "bg-[#0e1e30]"}`}>
              <td className="px-3 py-2.5 font-mono text-xs"><EditInline value={r.day} onChange={(v) => update(i, "day", v)} className={dim} /></td>
              <td className="px-3 py-2.5 text-sm"><EditInline value={r.ig} onChange={(v) => update(i, "ig", v)} className={r.ig === "—" ? dim : normal} /></td>
              <td className="px-3 py-2.5 text-sm"><EditInline value={r.tt} onChange={(v) => update(i, "tt", v)} className={r.tt === "—" ? dim : normal} /></td>
              <td className="px-3 py-2.5 text-sm"><EditInline value={r.st} onChange={(v) => update(i, "st", v)} className={r.st === "—" ? dim : normal} /></td>
              <td><button onClick={() => remove(i)} className="text-[#4a6070] opacity-0 group-hover:opacity-100 hover:text-[#d06060] text-xs">×</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={add} className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[#409090] hover:text-[#50b8b0] transition-colors">+ ADD ROW</button>
    </div>
  );
}

function ESeasons({ k }: { k: string }) {
  const { d, set } = useContext(Phase1Ctx);
  const raw = d[k] ?? DEFAULTS[k] ?? "[]";
  let items: Array<{ name: string; sub: string; body: string }>;
  try { items = JSON.parse(raw); } catch { items = []; }
  const accents = ["#50b8b0", "#edf0f5", "#d06060", "#d4a855"];

  const update = (i: number, field: string, v: string) => {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    set(k, JSON.stringify(next));
  };

  return (
    <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-[#1a3250] md:grid-cols-4">
      {items.map((s, i) => (
        <div key={i} className="bg-[#132840] p-5">
          <div className="font-serif text-[1.1rem]" style={{ color: accents[i % accents.length] }}><EditInline value={s.name} onChange={(v) => update(i, "name", v)} /></div>
          <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.3em] text-[#4a6070]"><EditInline value={s.sub} onChange={(v) => update(i, "sub", v)} /></div>
          <div className="text-[13px] leading-relaxed text-[#7a90a8]"><EditInline value={s.body} onChange={(v) => update(i, "body", v)} /></div>
        </div>
      ))}
    </div>
  );
}

// ── Bullet list renderers ───────────────────────────────────────────────────

function EBullets({ k }: { k: string }) {
  return (
    <EList k={k} render={(items, onChange, onRemove, onAdd) => (
      <div>
        <ul className="list-none space-y-0">
          {items.map((item, i) => (
            <li key={i} className="reveal relative py-1 pl-6 pr-6 group text-[#b8c8d8] before:absolute before:left-0 before:content-['–'] before:text-[#4a6070]">
              <EditInline value={item} onChange={(v) => onChange(i, v)} className="inline" />
              <button onClick={() => onRemove(i)} className="absolute right-0 top-1 text-[#4a6070] opacity-0 group-hover:opacity-100 hover:text-[#d06060] text-xs">×</button>
            </li>
          ))}
        </ul>
        <button onClick={onAdd} className="ml-6 mt-2 font-mono text-[10px] tracking-[0.2em] text-[#409090] hover:text-[#50b8b0] transition-colors">+ ADD BULLET</button>
      </div>
    )} />
  );
}

function ENums({ k }: { k: string }) {
  return (
    <EList k={k} render={(items, onChange, onRemove, onAdd) => (
      <div>
        <ol className="list-none space-y-0">
          {items.map((item, i) => (
            <li key={i} className="reveal relative py-1.5 pl-8 pr-6 group text-[#b8c8d8]">
              <span className="absolute left-0 top-1.5 font-mono text-xs text-[#409090]">{String(i + 1).padStart(2, "0")}</span>
              <EditInline value={item} onChange={(v) => onChange(i, v)} className="inline" />
              <button onClick={() => onRemove(i)} className="absolute right-0 top-1.5 text-[#4a6070] opacity-0 group-hover:opacity-100 hover:text-[#d06060] text-xs">×</button>
            </li>
          ))}
        </ol>
        <button onClick={onAdd} className="ml-8 mt-2 font-mono text-[10px] tracking-[0.2em] text-[#409090] hover:text-[#50b8b0] transition-colors">+ ADD ITEM</button>
      </div>
    )} />
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function Phase1() {
  const rootRef = useReveal();
  const [data, setData] = useState<Phase1Data>({ ...DEFAULTS });
  const [saved, setSaved] = useState<Phase1Data>({ ...DEFAULTS });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [loaded, setLoaded] = useState(false);

  const isDirty = JSON.stringify(data) !== JSON.stringify(saved);

  const set = useCallback((k: string, v: string) => {
    setData((prev) => ({ ...prev, [k]: v }));
  }, []);

  // Load from API then localStorage fallback
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/phase1-draft?draftId=${DRAFT_ID}`);
        const json = await r.json();
        if (!cancelled && json.ok && json.found && json.data) {
          const merged = { ...DEFAULTS, ...json.data };
          setData(merged);
          setSaved(merged);
          setLoaded(true);
          return;
        }
      } catch { /* fall through */ }
      // Fallback to localStorage
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw && !cancelled) {
          const parsed = JSON.parse(raw);
          const merged = { ...DEFAULTS, ...parsed };
          setData(merged);
          setSaved(merged);
        }
      } catch { /* ignore */ }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Auto-save to localStorage on change
  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
    }
  }, [data, loaded]);

  // Save to API
  const saveToApi = useCallback(async () => {
    setSaveStatus("saving");
    try {
      const r = await fetch("/api/phase1-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: DRAFT_ID, data }),
      });
      const json = await r.json();
      if (json.ok) {
        setSaved({ ...data });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [data]);

  const ctx = { d: data, set };

  return (
    <Phase1Ctx.Provider value={ctx}>
      <div ref={rootRef} className="min-h-screen bg-[#0a1520]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "256px" }} />

        {/* SAVE BAR */}
        {isDirty && (
          <div className="fixed top-4 right-4 z-[10000] flex items-center gap-3 rounded-sm border border-[#1a3250] bg-[#0e1e30]/95 px-4 py-2.5 shadow-lg backdrop-blur">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#d4a855]">UNSAVED CHANGES</div>
            <button
              onClick={saveToApi}
              disabled={saveStatus === "saving"}
              className="rounded-sm bg-[#409090] px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#50b8b0] disabled:opacity-50"
            >
              {saveStatus === "saving" ? "SAVING…" : "SAVE"}
            </button>
          </div>
        )}
        {saveStatus === "saved" && !isDirty && (
          <div className="fixed top-4 right-4 z-[10000] rounded-sm border border-[#409090]/30 bg-[#0e1e30]/95 px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[#50b8b0] shadow-lg backdrop-blur">
            SAVED ✓
          </div>
        )}
        {saveStatus === "error" && (
          <div className="fixed top-4 right-4 z-[10000] rounded-sm border border-[#d06060]/30 bg-[#0e1e30]/95 px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[#d06060] shadow-lg backdrop-blur">
            SAVE FAILED — TRY AGAIN
          </div>
        )}

        {/* COVER */}
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="font-mono text-[10px] tracking-[0.5em] text-[#7a90a8]">STRATEGIC BRAINSTORM</div>
          <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-tight text-[#edf0f5]"><E k="cover_title" /></h1>
          <div className="mx-auto my-8 h-px w-28 bg-[#4a6070]" />
          <div className="font-serif text-[1.2rem] font-light text-[#7a90a8]"><E k="cover_subtitle" /></div>
          <div className="mt-auto pb-12">
            <div className="mb-2 font-mono text-[9px] tracking-[0.4em] text-[#d06060]">WORKING DOCUMENT</div>
            <div className="text-sm text-[#4a6070]"><E k="cover_location" /></div>
            <Link to="/" className="mt-4 inline-block font-mono text-[10px] tracking-[0.3em] text-[#4a6070] transition-colors hover:text-[#409090]">← SPONSOR KIT BUILDER</Link>
          </div>
        </div>

        <Divider />

        {/* 01 WHO WE ARE */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="01" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s01_title" /></h2>
          <p className="reveal mb-4 font-serif text-[1.2rem] leading-[1.9] text-[#b8c8d8]"><EBlock k="s01_intro" /></p>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]"><E k="s01_sub1" /></h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s01_p1" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s01_p2" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s01_p3" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] italic text-[#7a90a8]"><EBlock k="s01_p4" /></p>
          <MetaLabel>Current Status</MetaLabel>
          <EBullets k="s01_status" />
        </section>

        <Divider />

        {/* 02 BRAND FOUNDATION */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="02" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s02_title" /></h2>
          <MetaLabel>Mission</MetaLabel>
          <blockquote className="reveal my-8 border-l-2 border-[#409090] py-3 pl-6 pr-6 font-serif text-[1.15rem] italic leading-relaxed text-[#7a90a8]"><EBlock k="s02_mission" /></blockquote>
          <MetaLabel>Vision</MetaLabel>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s02_vision" /></p>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]">Values</h3>
          <ELabeledList k="s02_values" />
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]">Voice</h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s02_voiceIntro" /></p>
          <Spacer h={16} />
          <div className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#1a3250] md:grid-cols-3">
            <ECard labelKey="s02_card1_label" titleKey="s02_card1_title" bodyKey="s02_card1_body" labelColor="#50b8b0" />
            <ECard labelKey="s02_card2_label" titleKey="s02_card2_title" bodyKey="s02_card2_body" labelColor="#d06060" />
            <ECard labelKey="s02_card3_label" titleKey="s02_card3_title" bodyKey="s02_card3_body" labelColor="#d4a855" />
          </div>
        </section>

        <Divider />

        {/* 03 THREE PHASES */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="03" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s03_title" /></h2>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s03_intro" /></p>
          <Spacer h={16} />
          <div className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#1a3250] md:grid-cols-3">
            {([
              { num: "01", tagKey: "s03_p1_tag", descKey: "s03_p1_desc", goalKey: "s03_p1_goal", accent: "#d06060" },
              { num: "02", tagKey: "s03_p2_tag", descKey: "s03_p2_desc", goalKey: "s03_p2_goal", accent: "#50b8b0" },
              { num: "03", tagKey: "s03_p3_tag", descKey: "s03_p3_desc", goalKey: "s03_p3_goal", accent: "#d4a855" },
            ]).map((p) => (
              <div key={p.num} className="flex flex-col gap-2 bg-[#132840] p-6">
                <div className="font-mono text-[9px] tracking-[0.5em]" style={{ color: p.accent }}>PHASE {p.num}</div>
                <div className="font-serif text-[1.1rem] text-[#edf0f5]"><E k={p.tagKey} /></div>
                <div className="mt-auto border-t border-[#203c5a] pt-3 text-sm text-[#4a6070]"><E k={p.descKey} /></div>
                <div className="font-mono text-[10px] text-[#4a6070]"><E k={p.goalKey} /></div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PHASE 1 DEEP DIVE */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <div className="reveal py-8">
            <div className="mb-3 font-mono text-[10px] tracking-[0.6em] text-[#d06060]">PHASE 01</div>
            <div className="border-b border-[#1a3250] pb-5 font-serif text-[clamp(1.6rem,4vw,2.5rem)] font-light text-[#edf0f5]">
              &ldquo;<E k="ph1_tagline" />&rdquo;
            </div>
            <div className="mt-3 font-serif text-[1.1rem] italic text-[#d06060]"><E k="ph1_geo" /></div>
          </div>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]"><E k="ph1_innerVoice_title" /></h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_innerVoice_intro" /></p>
          <VoiceGroup label="The self-roast" k="ph1_voice_selfRoast" color="#d06060" />
          <VoiceGroup label="The anxious spiral" k="ph1_voice_anxious" color="#f08060" />
          <VoiceGroup label="The almost-talked-herself-out-of-it" k="ph1_voice_almostQuit" color="#7a90a8" />
          <VoiceGroup label="The laugh-at-yourself" k="ph1_voice_laugh" color="#d4a855" />
          <Spacer h={16} />
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_naming" /></p>
          <MetaLabel>Emotional Purpose</MetaLabel>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_emotional" /></p>
          <MetaLabel>Strategic Purpose</MetaLabel>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_strategic" /></p>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]"><E k="ph1_ski_title" /></h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><strong className="text-[#edf0f5]"><EBlock k="ph1_ski_intro" /></strong></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_ski_p1" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_ski_p2" /></p>
          <EBullets k="ph1_ski_bullets" />
          <Spacer h={8} />
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_ski_p3" /></p>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]"><E k="ph1_fun_title" /></h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_fun_p1" /></p>
          <blockquote className="reveal my-8 border-l-2 border-[#409090] py-3 pl-6 pr-6 font-serif text-[1.15rem] italic leading-relaxed text-[#7a90a8]"><EBlock k="ph1_fun_quote" /></blockquote>
          <h3 className="reveal mt-10 mb-3 font-serif text-[1.5rem] font-normal leading-snug text-[#edf0f5]"><E k="ph1_mental_title" /></h3>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_mental_p1" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="ph1_mental_p2" /></p>
          <p className="reveal mb-4 text-[17px] leading-[1.85] italic text-[#7a90a8]"><EBlock k="ph1_mental_p3" /></p>
          <MetaLabel>Content Pillars</MetaLabel>
          <ELabeledList k="ph1_pillars" />
          <MetaLabel>Content Calendar — First 2 Weeks</MetaLabel>
          <ECalendar k="ph1_calendar" />
          <MetaLabel>Key Metrics</MetaLabel>
          <EBullets k="ph1_metrics" />
          <MetaLabel>Open Questions</MetaLabel>
          <EBullets k="ph1_questions" />
        </section>

        <Divider />

        {/* PHASE 2 + 3 */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <div className="reveal py-8">
            <div className="mb-3 font-mono text-[10px] tracking-[0.6em] text-[#50b8b0]">PHASE 02</div>
            <div className="border-b border-[#1a3250] pb-5 font-serif text-[clamp(1.6rem,4vw,2.5rem)] font-light text-[#edf0f5]">
              &ldquo;<E k="ph2_tagline" />&rdquo;
            </div>
          </div>
          <p className="reveal mb-4 text-[17px] leading-[1.85] italic text-[#7a90a8]"><EBlock k="ph2_intro" /></p>
          <EBullets k="ph2_bullets" />
          <p className="reveal mt-6 mb-4 text-[17px] leading-[1.85] italic text-[#50b8b0]">→ Ready to develop when you are.</p>
          <Spacer h={48} />
          <div className="reveal py-8">
            <div className="mb-3 font-mono text-[10px] tracking-[0.6em] text-[#d4a855]">PHASE 03</div>
            <div className="border-b border-[#1a3250] pb-5 font-serif text-[clamp(1.6rem,4vw,2.5rem)] font-light text-[#edf0f5]">
              &ldquo;<E k="ph3_tagline" />&rdquo;
            </div>
          </div>
          <p className="reveal mb-4 text-[17px] leading-[1.85] italic text-[#7a90a8]"><EBlock k="ph3_intro" /></p>
          <EBullets k="ph3_bullets" />
          <p className="reveal mt-6 mb-4 text-[17px] leading-[1.85] italic text-[#d4a855]">→ Ready to develop when you are.</p>
        </section>

        <Divider />

        {/* 04 SPONSOR ROADMAP */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="04" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s04_title" /></h2>
          <p className="reveal mb-4 text-[17px] leading-[1.85] text-[#b8c8d8]"><EBlock k="s04_intro" /></p>
          <MetaLabel>Stage 1 — Build the Proof</MetaLabel>
          <EBullets k="s04_stage1" />
          <MetaLabel>Stage 2 — Create Pitch Materials</MetaLabel>
          <EBullets k="s04_stage2" />
          <MetaLabel>Stage 3 — Approach Sponsors</MetaLabel>
          <ELabeledList k="s04_tiers" />
          <MetaLabel>What Sponsors Get</MetaLabel>
          <EBullets k="s04_sponsorGets" />
        </section>

        <Divider />

        {/* 05 CONTENT STRATEGY */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="05" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s05_title" /></h2>
          <MetaLabel>Platforms</MetaLabel>
          <div className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#1a3250] md:grid-cols-3">
            <ECard labelKey="s05_card1_label" titleKey="s05_card1_title" bodyKey="s05_card1_body" labelColor="#50b8b0" />
            <ECard labelKey="s05_card2_label" titleKey="s05_card2_title" bodyKey="s05_card2_body" labelColor="#d06060" />
            <ECard labelKey="s05_card3_label" titleKey="s05_card3_title" bodyKey="s05_card3_body" labelColor="#7a90a8" />
          </div>
          <MetaLabel>Frequency</MetaLabel>
          <EBullets k="s05_frequency" />
          <MetaLabel>Seasonal Calendar</MetaLabel>
          <ESeasons k="s05_seasons" />
        </section>

        <Divider />

        {/* 06 NEXT STEPS */}
        <section className="mx-auto max-w-[820px] px-6 py-24">
          <SectionLabel num="06" />
          <h2 className="reveal mt-2 mb-8 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-[#edf0f5]"><E k="s06_title" /></h2>
          <MetaLabel>Decisions Needed</MetaLabel>
          <ENums k="s06_decisions" />
          <MetaLabel>First Actions — This Month</MetaLabel>
          <ENums k="s06_actions" />
          <MetaLabel>What We Build Next</MetaLabel>
          <EBullets k="s06_buildNext" />
        </section>

        <Divider />

        {/* CLOSING */}
        <div className="py-32 text-center">
          <div className="mx-auto mb-12 h-px w-16 bg-[#1a3250]" />
          <div className="font-serif text-[1.5rem] font-light text-[#7a90a8]">&ldquo;<E k="closing_quote" />&rdquo;</div>
          <div className="mt-4 text-[15px] italic text-[#409090]"><E k="closing_attrib" /></div>
          <div className="mt-16 font-mono text-[9px] tracking-[0.5em] text-[#4a6070]">WOMEN'S ALPINE SCHOOL · 2026</div>
          <Link to="/" className="mt-6 inline-block font-mono text-[10px] tracking-[0.3em] text-[#4a6070] transition-colors hover:text-[#409090]">← SPONSOR KIT BUILDER</Link>
        </div>

        <style>{`
          .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
          .reveal.visible { opacity: 1; transform: translateY(0); }
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-mono { font-family: 'DM Mono', monospace; }
          [contenteditable]:empty:before { content: 'Click to edit...'; color: #4a6070; font-style: italic; }
        `}</style>
      </div>
    </Phase1Ctx.Provider>
  );
}
