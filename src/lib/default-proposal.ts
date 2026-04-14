import type { ProposalData } from "./proposal-types";

/**
 * Default proposal template shown when API generation fails.
 * Contains all 12 sections with WAS sample content, bilingual (Georgian + English).
 * Used as fallback when Claude generation API is unavailable or times out.
 */
export const DEFAULT_PROPOSAL_DATA: ProposalData = {
  cover: {
    taglineKa: "ქალთა ალპური სკოლა — თავისუფლად სიმაღლეზე",
    taglineEn: "Women's Alpine School — Freedom at Heights",
    summaryKa:
      "დაამტკიცეთ ქალთა ალპური სკოლა (WAS), სადაც თავისუფლად ვასწავლით რუსული მწვერვალების დაპყრობას. პროგრამა უფასოა, ხელოვნურია, და ფოკუსირებულია ქალთა უსაფრთხოებაზე.",
    summaryEn:
      "Support Women's Alpine School (WAS), where we teach Georgian women to climb the Caucasus — for free, entirely volunteer-run. Our program is safe, inclusive, and transformative.",
    year: 2025,
  },
  sections: [
    {
      number: "01",
      titleKa: "ვინ ვართ",
      titleEn: "Who We Are",
      headlineKa: "ქალათა მთიანი სკოლა — რამდენიმე წლის დროს გაკრეფილი გაბაতონება",
      headlineEn: "Women's Alpine School — Built by climbers, run by volunteers",
      keyStatsKa: { დაარსება: "2021", აქტიური_წევრი: "45+", ადგილი: "სამეგრელო" },
      keyStatsEn: { Founded: "2021", Active_Members: "45+", Location: "Samegrelo" },
      contentKa:
        "ქალთა ალპური სკოლა დაიმე 2021 წელს ორმა დამაფუძნებელმა რომლებიც მიზნად დაისახეს თავისუფლად ქალებს სიმაღლეზე აწვნელი. ა მხოლოდ სამეგრელოს გორაკებში, ამა დროს უკვე 45-მდე აქტიური წევრი გვაქვს და ინტერნაციონალური ქსელი. საეკიპაჟე ხელოვნურია, დაფინანსება მინიმალური, და ყველაფერი ქალებისთვის თავისუფალია.",
      contentEn:
        "Women's Alpine School was founded in 2021 by two climbers determined to teach Georgian women mountaineering — for free. What started in a small village has grown to 45+ members, a full training curriculum, and international partnerships. Our coaches are all volunteers. We charge nothing. Every program is built on safety and solidarity.",
      type: "text",
    },
    {
      number: "02",
      titleKa: "რატომ სჭირდება WAS",
      titleEn: "Why WAS Matters",
      headlineKa: "ქალაბი მთიანობაში ცოტაა. ჩვენ ეს ვცვლით.",
      headlineEn: "Women are scarce on Georgia's mountains. We're changing that.",
      keyStatsKa: { ქალა_მთიელი: "8%", დაბეჭდილი_ფობია: "42%", სამოტ_წარჩენილი: "0" },
      keyStatsEn: { Women_Climbers: "8%", Report_Anxiety: "42%", Dropouts: "0" },
      contentKa:
        "გეორგიულ მთებში, განსაკუთრებით კავკასიაში, მთიელთა 92% მამაკაცია. ქალა კლიმბერებს აკრძალავენ ოჯახი, დროვანი ქალაბი რომლებიც თან არ მიდიან, და პირადი უსაფრთხოების შიში. WAS ამ ბარიერებს წყვეტს: სპეციალიზებული ტრენინგი, დამხმარე გარემო, და ქალებისთვის უსაფრთხო სივრცე. ჩვენი პროგრამის 100% მოწაბე სულ დამთავრებული აქვს.",
      contentEn:
        "In the Georgian Caucasus, women make up just 8% of climbers. Fear, family pressure, and lack of safe peer groups keep most away. WAS removes these barriers. Our coaches are female. Our climbing partners are female. Our environment is safe. Our retention rate is 100%.",
      type: "text",
    },
    {
      number: "03",
      titleKa: "ვის გეწოდებათ",
      titleEn: "Who We Serve",
      headlineKa: "18-დან 65 წლემდე ქალათ რომელთაც აქვთ ქარ ღრმა",
      headlineEn: "Women aged 18–65 ready to climb higher than they ever imagined",
      keyStatsKa: { საშუ_ასაკი: "32", გეოგრაფია: "5_ქვეყნი", პროფი: "ექიმი,_ინჟინერი,_მშენებელი,_მასწავლებელი" },
      keyStatsEn: { Avg_Age: "32", Geography: "5_Countries", Professions: "Doctor,_Engineer,_Builder,_Teacher" },
      contentKa:
        "ჩვენი მხარდამჭერი ქალაბი დიდი დიაპაზონია: 18 წლიდან 65 წლემდე. მათ პროფესიაა სხვადსხვა — ექიმი, ინჟინერი, მშენებელი, მასწავლებელი. რაც გაბიძრებთ მათ: ორბი სიმაღლეზე, დამოუკიდებლობა, და ქალებთან დაკავშირება. ამ მოწაბეებმა სამკუთხედი პიკი დააკმაყოფილეს, აიცრნენ თანამედროვე ღაზაფთან, და აღმოაჩინეს რა შეუძლიათ.",
      contentEn:
        "Our members range from 18 to 65. Some are teachers, some are engineers, some doctors. What unites them: the desire to climb, the need to prove themselves, and the solidarity of learning alongside other women. They've summited peaks, befriended each other, and found confidence they didn't know they had.",
      type: "text",
    },
    {
      number: "04",
      titleKa: "პროგრამა",
      titleEn: "The Program",
      headlineKa: "8 კვირა ტრენინგი → 3 მეწამული ელიმინაცია → მე-4 მწვერვალი",
      headlineEn: "8 weeks conditioning → 3 technical summits → Peaks of a lifetime",
      keyStatsKa: { თვე_სიხშირე: "4x_თვეში", ასაკობით_ძიძე: "400მ", უსაფ_სტანდარტი: "UIAA_Level_3" },
      keyStatsEn: { Frequency: "4x_per_month", Elevation_Gain: "400m_average", Safety_Standard: "UIAA_Level_3" },
      contentKa:
        "პროგრამა სტრუქტურირებულია ოთხი ფაზა: (1) რუტინა და რეზილიენცია ქვემოთ სიმაღლეზე, (2) ტექნიკური უნარი და მოღვაწეობა, (3) მეწამული მწვერვალი სამკუთხედი აკკლიმატიზაციის გამოცდის სახით, (4) დღელი მწვერვალი და რეტროსპექტივა. თითოეული პროგრამა დამთავრებული ხელოვნურმა მოწაბემ აღებული აქვს ვერცხლის ღირებული ღირებული წაკითხული.",
      contentEn:
        "Our program has four phases: Foundation (fitness and confidence-building on lower peaks), Technical Skills (rock climbing, rope work, self-rescue), Acclimatization (3-day expedition to 3,500m), and Summit (the main peak). Each phase is structured around peer support, continuous assessment, and celebration. No one is left behind.",
      type: "text",
    },
    {
      number: "05",
      titleKa: "ბიუჯეტის მიმოხილვა",
      titleEn: "Budget Overview",
      headlineKa: "კრიტიკული დაფინანსება სამი განმეორებული სფეროში",
      headlineEn: "Three critical areas where funding accelerates impact",
      keyStatsKa: { მოწაბე_ღირებულება: "120$_გ_წელს", დაწყობილი_ღირებულება: "8000$_წელ", გაკრეფილი: "20%" },
      keyStatsEn: { Cost_Per_Member: "$120_annually", Operating_Cost: "$8,000_yr", Raised: "20%" },
      contentKa:
        "სამი ძირითადი ღირებულება: (1) დარჩენილი აღরთვისა და თავისუფალი კოუჩინგი (რეკრუტმენტი, ლოჯისტიკა, უსაფ მდელი), (2) აღჭურვილობა და დაცვა (სამაჯური, თოკი, ჟანდარმი, მედიკამენტი), (3) გარემოს პასუხი (დაძღვან, კვება, გადაზიდვა). მე მხოლოდ 20% გაკრიფილი გვაქვს. მოითხოვა დახმარება.",
      contentEn:
        "Three budget buckets: (1) Program Delivery — instructor salaries, logistics, permit fees ($4,000), (2) Equipment & Safety — harnesses, ropes, first aid, insurance ($2,500), (3) Operations — accommodation, meals, transport, admin ($1,500). We've raised $1,600 so far. We need $6,400 more.",
      type: "metrics",
    },
    {
      number: "06",
      titleKa: "რეაბილიტაცია ბიუჯეტი",
      titleEn: "Renovation Budget",
      headlineKa: "გაუმჯობესება ბაზა ფიზიკა და უსაფ ჯანმრთელი",
      headlineEn: "Upgrading our training basecamp for safety and accessibility",
      keyStatsKa: { პირველი_აწყოთ: "2024_სექტემბერი", მოწმო_ღირებულება: "5500$", ასაკ_გამოიყენება: "დღეული" },
      keyStatsEn: { Project_Start: "September_2024", Total_Cost: "$5,500", Usage: "Daily" },
      contentKa:
        "ჩვენი ბეისკემპი (პატარა სოფელი სამეგრელოში) სჭირდება დაჯგება. ელექტრო სისტემა ძველია, სამეფო სოფლის ღეფი აბაზის დაკარგული, და მედიკ ოთახი იკრიმებოდა. ეს პროექტი მოაკეთებს ელექტრო, პიტნის ქვემოთ, და პირველი დახმარების კაბინეტი.",
      contentEn:
        "Our basecamp sits in a rural village. It needs electricity upgrades, a functional kitchen, and a medical station. The renovation will take 3 months and prepare the space for 6-month-long expeditions.",
      type: "table",
      tableData: {
        headersEn: ["Item", "Cost", "Total"],
        headersKa: ["ელემენტი", "ღირებულება", "ჯამი"],
        rowsEn: [
          ["Electrical rewiring", "$1,200", "$1,200"],
          ["Kitchen equipment", "$1,800", "$1,800"],
          ["Medical station setup", "$800", "$800"],
          ["Roof repair", "$1,200", "$1,200"],
          ["Labor (volunteer + partial)", "$500", "$500"],
        ],
        rowsKa: [
          ["ელექტრო გაცხელება", "1200$", "1200$"],
          ["სამზარეულო აღჭურვილობა", "1800$", "1800$"],
          ["მედიკ სტანცია", "800$", "800$"],
          ["სახურავი შეკეთება", "1200$", "1200$"],
          ["შრომა", "500$", "500$"],
        ],
      },
    },
    {
      number: "07",
      titleKa: "კედელი და გაფორმება",
      titleEn: "Walls & Fit-Out",
      headlineKa: "დახაზული კედელი ადგილობრივი ტრენინგი და უნარ-ჩვენება",
      headlineEn: "Indoor climbing wall for year-round training and skill-building",
      keyStatsKa: { სიმაღლე: "12მ", კონტაქტი: "15_კლიმბერი", ღირებულება: "3200$" },
      keyStatsEn: { Height: "40ft", Capacity: "15_climbers", Cost: "$3,200" },
      contentKa:
        "ღრიელი კედელი დაიშვა ბეისკემპის მიერ, 12 მეტრი მაღალი, 15 ადამიანი ერთდროულად სავარჯიშო. აშ აღბეჭდავ წელიწად, ხან ღია ღეფი.",
      contentEn:
        "An indoor climbing wall at basecamp allows us to train year-round, regardless of weather. It's 40 feet tall, accommodates 15 people, and includes diverse routes for all skill levels.",
      type: "table",
      tableData: {
        headersEn: ["Feature", "Specification", "Capacity"],
        headersKa: ["ფუნქცია", "სპეციფიკა", "ტევადობა"],
        rowsEn: [
          ["Wall height", "40 feet (12m)", "15 climbers"],
          ["Route grades", "5.5 to 5.11", "4–6 routes"],
          ["Surface material", "Plywood + resin coating", "1,200 sq ft"],
          ["Anchoring system", "Bolt grid 18-inch spacing", "80+ bolt points"],
        ],
        rowsKa: [
          ["კედელი სიმაღლე", "40 ფიტი (12მ)", "15 კლიმბერი"],
          ["სირთულის დონე", "5.5-დან 5.11-მდე", "4–6 გზა"],
          ["ზედაპირი", "გარუჯული თელი", "1200 კვ.ფი"],
          ["წაკითხვის სისტემა", "მკრთალი 45სმ მანძილი", "80+ ღერო"],
        ],
      },
    },
    {
      number: "08",
      titleKa: "ექსპედიცია აღჭურვილობა",
      titleEn: "Expedition Gear",
      headlineKa: "უსაფ აღჭურვილობა ყველა 45 წევრი — სამაჯური, თოკი, თოვლი თოკი",
      headlineEn: "Safety-rated equipment for all 45 members — harnesses, ropes, protection",
      keyStatsKa: { დაკომპლექტება: "45", პროფილი: "UIAA_ლიცენცია", პერიოდი: "5_წელი" },
      keyStatsEn: { Sets: "45", Certified: "UIAA_certified", Lifespan: "5_years" },
      contentKa:
        "მხოლოდ უსაფ, სერტიფიცირებული აღჭურვილობა ხდება. თითოეული წევრი ქვემოთ პიტნის სამაჯური, პირადი თოკი, და დაზღვაული გამოცდილება.",
      contentEn:
        "Every member gets a complete, certified kit: a climbing harness rated for 5+ years, a dynamic rope, carabiners, and protection gear. All equipment is regularly inspected and maintained.",
      type: "table",
      tableData: {
        headersEn: ["Gear Item", "Quantity", "Cost per Unit"],
        headersKa: ["აღჭურვილობა", "რაოდენობა", "ღირებულება", "ჯამი"],
        rowsEn: [
          ["Climbing harnesses (UIAA)", "45", "$85"],
          ["Dynamic ropes (50m, 9.8mm)", "15", "$180"],
          ["Carabiners (screw-lock)", "90", "$12"],
          ["Protection set (nuts + cams)", "15", "$250"],
          ["First aid kits", "5", "$75"],
        ],
        rowsKa: [
          ["სამაჯური", "45", "85$"],
          ["მძლიანი თოკი 50მ", "15", "180$"],
          ["ყარაქებული რგოლი", "90", "12$"],
          ["დაცვა კომპლექტი", "15", "250$"],
          ["პირველი დახმარება", "5", "75$"],
        ],
      },
    },
    {
      number: "09",
      titleKa: "სპორტული სიმძლავრე",
      titleEn: "Gym Capacity",
      headlineKa: "45 აქტიური წევრი, 60-100 მოწვევილი წელი, დღეული გამოყენება",
      headlineEn: "45 active members, 100+ visitors annually, growing daily",
      keyStatsKa: { აქტიური: "45", ნახევარწელი_მოწვევილი: "100+", დღეული_გამოცდილება: "15-20" },
      keyStatsEn: { Active_Members: "45", Annual_Visitors: "100+", Daily_Capacity: "15-20" },
      contentKa:
        "ჩვენი სიმძლავრე სწრაფად გაიზარდა. 45 სრული წევრი სარწმუნო მხარდამჭერ, და 100+ ბენეფიციარი წელი გავვლენილი. ბეისკემპი დღეულ გამოიყენება 15-20 კაციანი კომფორტი, უსაფ, და მხიბლავი.",
      contentEn:
        "Our membership has grown 300% in two years. We have 45 committed members, host 100+ visitors annually, and run daily training sessions for groups of 15–20. The basecamp is at comfortable capacity.",
      type: "metrics",
    },
    {
      number: "10",
      titleKa: "ბრენდი ხილვადობა",
      titleEn: "Brand Visibility",
      headlineKa: "ინსტაგრამი, ლოკალური მედია, და ახალი ხაკი პიკი",
      headlineEn: "Social media, local press, and sponsorship recognition",
      keyStatsKa: { ინსტ_მომხმარებელი: "3200", მედია_ნახსენი: "12", ლოგო_თვალი: "5_ადგილი" },
      keyStatsEn: { Instagram_Followers: "3,200", Press_Mentions: "12", Logo_Placements: "5_visible" },
      contentKa:
        "ჩვენი ბრენდი აღმოჩნდა ლოკალური მედია, ინსტაგრამი, და ქალაბი გეორგიის მთიანობაში. სპონსორი მიიღებს ლოგო პლეისმენტი ჩვენი ვებისეიტი, ცვილი, სოციალური მედია, და თავის მეწამული დროს.",
      contentEn:
        "We've been featured in 12 local media outlets. Our Instagram has 3,200 followers and sees 15–20% engagement. Sponsors get prominent logo placement on our website, social media, summit certificates, and expedition kit.",
      type: "text",
    },
    {
      number: "11",
      titleKa: "სპონსორი დონეები",
      titleEn: "Partnership Tiers",
      headlineKa: "ოთხი დონე დაშორებული ქვემოთ მდელი სპონსორი მოხმობის ზე",
      headlineEn: "Four tiers of partnership — choose your level of impact",
      keyStatsKa: { მინიმ: "500$", მაქსიმ: "10000$", პაკეტი_სახელი: "ოქროს_კიდე" },
      keyStatsEn: { Minimum: "$500", Maximum: "$10,000+", Top_Tier: "Emerald_Peak" },
      contentKa:
        "ოთხი დონე სპონსორი: ბრინჯაო (500$), ვერცხლა (2000$), ოქროს (5000$), და სმარაგდი (10000$+). თითოეული დონე გთავაზობთ ლოგო, პიარი, კოორდინაცია, და რეალური ზეგავლენა ქალაბი მთიანობაში.",
      contentEn:
        "Bronze ($500): Logo on website + annual report. Silver ($2,000): Logo on gear + social mention + annual summit naming. Gold ($5,000): Full branding package + expedition sponsorship + PR rights. Emerald ($10,000+): Everything above + naming rights + advisor role.",
      type: "table",
      tableData: {
        headersEn: ["Tier", "Investment", "Key Benefits"],
        headersKa: ["დონე", "ინვესტიცია", "ძირითადი სარგებელი"],
        rowsEn: [
          ["Bronze Peak", "$500", "Website logo + annual report"],
          ["Silver Ridge", "$2,000", "Gear branding + social media feature + summit naming"],
          ["Gold Summit", "$5,000", "Expedition sponsor + PR package + expedition briefing"],
          ["Emerald Peak", "$10,000+", "Naming rights + advisor status + exclusive updates"],
        ],
        rowsKa: [
          ["ბრინჯაო მწვერვალი", "500$", "ვებ ლოგო + წლიური ანგარიში"],
          ["ვერცხლა რიჯი", "2000$", "აღჭურვილობა ბრენდი + სოციალური ახსნა"],
          ["ოქროს მწვერვალი", "5000$", "ექსპედიცია სპონსორი + საჯაროობა"],
          ["სმარაგდი მწვერვალი", "10000$+", "სახელი უფლება + კონსულტანტი ფოლკი"],
        ],
      },
    },
    {
      number: "12",
      titleKa: "აშენი",
      titleEn: "Let's Build",
      headlineKa: "გაფართოვებული ქალაბი მხარდამჭერი ღრმა სიმაღლე",
      headlineEn: "Help us expand women's mountaineering in the Caucasus",
      keyStatsKa: { მთავარი_გამოწვევა: "დაფინანსება", მოწაბე_რეტენცია: "100%", შემდეგი_მწვერვალი: "2025_ზაფრანი" },
      keyStatsEn: { Main_Challenge: "Funding", Retention_Rate: "100%", Next_Peak: "Summer_2025" },
      contentKa:
        "ჩვენი მოწაბე ნდობა. მათ პირველი დაპირი ხელოვნურია, მათ მეორე სახელი, მათ მესამე ადგილი. მხოლოდ დაფინანსება გაცხელებულია. სპონსორი ხელოვნური აშენებული ეს პროგრამა მოცემული ქალაბი გეორგიის მთებში. ერთად, ჩვენ წავსვამთ უფრო მაღალ მწვერვალი.",
      contentEn:
        "Our members are ready. Our coaches are trained. Our logistics are solid. What we need is you. Your sponsorship builds confidence, expands our reach, and puts women on peaks they've never dared to imagine. In 2025, we're climbing higher. Join us.",
      type: "text",
    },
  ],
  contact: {
    name: "Women's Alpine School",
    title: "Founder, Women's Alpine School",
    email: "contact@womensalpineschool.ge",
    location: "Tbilisi, Georgia",
  },
};
