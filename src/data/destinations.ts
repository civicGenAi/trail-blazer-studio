import { images } from "./tours";
import type { Destination } from "./types";

export const destinations: Destination[] = [
  {
    slug: "serengeti",
    name: "Serengeti National Park",
    region: "Northern circuit",
    hero_image: images.serengeti,
    description:
      "14,750 km² of grassland and kopjes. Resident lion, leopard and cheetah year-round; the migration herds pass through the south in February and the north from July.",
    best_time: "June to October, and February for calving",
    highlight_tags: ["Big cats", "Migration", "Balloon flights"],
    related_tour_slugs: ["northern-serengeti-river-crossings", "serengeti-balloon-and-plains"],
    featured: true,
    quick_facts: [
      { label: "Area", value: "14,750 km²" },
      { label: "Lion population", value: "~3,000" },
      { label: "Park fee, per day", value: "$70" },
      { label: "Drive from Arusha", value: "8h" },
    ],
    wildlife: [
      "Lion",
      "Leopard",
      "Cheetah",
      "Wildebeest",
      "Zebra",
      "Spotted hyena",
      "Giraffe",
      "Elephant",
    ],
    access:
      "Eight hours by road from Arusha via Ngorongoro, or 1h20 by light aircraft to Seronera or Kogatende.",
    short: "Serengeti",
    pin: { x: 20, y: 26 },
  },
  {
    slug: "ngorongoro",
    name: "Ngorongoro Crater",
    region: "Conservation area",
    hero_image: images.ngorongoro,
    description:
      "A 260 km² caldera holding about 25,000 large animals, including one of the few reliable black rhino populations in Tanzania. The floor is reached by a single descent road.",
    best_time: "Year-round; drier June to October",
    highlight_tags: ["Black rhino", "Big Five", "Crater floor"],
    related_tour_slugs: ["classic-northern-circuit"],
    featured: true,
    quick_facts: [
      { label: "Caldera floor", value: "260 km²" },
      { label: "Rim altitude", value: "2,286 m" },
      { label: "Large animals", value: "~25,000" },
      { label: "Crater fee, per vehicle", value: "$295" },
    ],
    wildlife: ["Black rhino", "Lion", "Elephant", "Buffalo", "Flamingo", "Golden jackal", "Serval"],
    access:
      "Four hours by road from Arusha. One descent road in, one out, both gravel and 4WD only.",
    short: "Ngorongoro",
    pin: { x: 40, y: 60 },
  },
  {
    slug: "tarangire",
    name: "Tarangire National Park",
    region: "Northern circuit",
    hero_image: images.tarangire,
    description:
      "Baobab country, two and a half hours from Arusha. In the dry season the river holds the animals and elephant groups of over 100 are common.",
    best_time: "July to October",
    highlight_tags: ["Elephant herds", "Baobabs", "Birdlife"],
    related_tour_slugs: ["classic-northern-circuit", "safari-and-zanzibar"],
    quick_facts: [
      { label: "Area", value: "2,850 km²" },
      { label: "Largest elephant group", value: "100+" },
      { label: "Bird species", value: "550" },
      { label: "Drive from Arusha", value: "2h30" },
    ],
    wildlife: [
      "Elephant",
      "Lion",
      "Leopard",
      "Fringe-eared oryx",
      "Lesser kudu",
      "Yellow-collared lovebird",
    ],
    access:
      "Two and a half hours by road from Arusha on tar to the gate. The closest park to the city.",
    short: "Tarangire",
    pin: { x: 55, y: 76 },
  },
  {
    slug: "kilimanjaro",
    name: "Mount Kilimanjaro",
    region: "Kilimanjaro region",
    hero_image: images.kilimanjaro,
    description:
      "5,895 m at Uhuru Peak, the highest point in Africa and the tallest free-standing mountain in the world. Seven established routes, no technical climbing required.",
    best_time: "January to March, June to October",
    highlight_tags: ["Uhuru Peak", "Seven routes", "No technical climbing"],
    related_tour_slugs: ["machame-route-kilimanjaro"],
    featured: true,
    quick_facts: [
      { label: "Summit", value: "5,895 m" },
      { label: "Established routes", value: "7" },
      { label: "Typical climb", value: "6–9 days" },
      { label: "Distance from Arusha", value: "80 km" },
    ],
    wildlife: [
      "Colobus monkey",
      "Blue monkey",
      "Bushbuck",
      "Hartlaub's turaco",
      "White-necked raven",
    ],
    access:
      "Ninety minutes by road from Arusha to Machame or Marangu gate; three hours to Londorossi for Lemosho.",
    short: "Kilimanjaro",
    pin: { x: 79, y: 40 },
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    region: "Indian Ocean",
    hero_image: images.zanzibar,
    description:
      "An island 35 km off the coast, one hour by air from Arusha. Stone Town on the west, reef and white sand on the east and north-east.",
    best_time: "June to October, December to February",
    highlight_tags: ["Mnemba reef", "Stone Town", "Dhow sailing"],
    related_tour_slugs: ["safari-and-zanzibar"],
    quick_facts: [
      { label: "Distance offshore", value: "35 km" },
      { label: "Flight from Arusha", value: "1h20" },
      { label: "Reef at Mnemba", value: "8 km out" },
      { label: "Water temperature", value: "26–29°C" },
    ],
    wildlife: ["Green turtle", "Bottlenose dolphin", "Red colobus", "Whale shark (Oct–Feb)"],
    access:
      "One hour twenty by air from Arusha, or direct from Seronera airstrip so you skip the return drive.",
    short: "Zanzibar",
    pin: { x: 92, y: 84 },
  },
  {
    slug: "ndutu",
    name: "Ndutu and the southern plains",
    region: "Conservation area",
    hero_image: images.heroSavanna,
    description:
      "Short-grass plains on the Serengeti–Ngorongoro boundary. The calving ground: roughly 500,000 wildebeest are born here across three weeks in February.",
    best_time: "January to March",
    highlight_tags: ["Calving", "Off-road permitted", "Predator density"],
    related_tour_slugs: ["calving-season-ndutu"],
    quick_facts: [
      { label: "Calves born", value: "~500,000" },
      { label: "Peak births per day", value: "8,000" },
      { label: "Season", value: "Jan–Mar" },
      { label: "Drive from Arusha", value: "6h" },
    ],
    wildlife: ["Wildebeest", "Cheetah", "Lion", "Spotted hyena", "Golden jackal", "Bat-eared fox"],
    access:
      "Six hours by road via Karatu, or fly to Ndutu airstrip. Off-road driving is permitted in the concession.",
    short: "Ndutu",
    pin: { x: 28, y: 48 },
  },
];

export const airports = [
  { name: "Kilimanjaro International (JRO)", short: "JRO", pin: { x: 73, y: 50 } },
  { name: "Arusha Airport (ARK)", short: "ARK", pin: { x: 58, y: 57 } },
];

/** Where every route starts. Not a destination card, so it lives on its own. */
export const originPin = { name: "Arusha", pin: { x: 66, y: 66 } };

export const bestTimeMatrix: {
  activity: string;
  months: ("peak" | "good" | "no")[];
}[] = [
  {
    activity: "Wildlife safari",
    months: [
      "good",
      "good",
      "good",
      "no",
      "no",
      "peak",
      "peak",
      "peak",
      "peak",
      "peak",
      "good",
      "good",
    ],
  },
  {
    activity: "Great Migration",
    months: [
      "peak",
      "peak",
      "peak",
      "good",
      "good",
      "good",
      "peak",
      "peak",
      "peak",
      "good",
      "good",
      "good",
    ],
  },
  {
    activity: "Kilimanjaro trek",
    months: [
      "peak",
      "peak",
      "good",
      "no",
      "no",
      "peak",
      "peak",
      "peak",
      "peak",
      "good",
      "no",
      "good",
    ],
  },
  {
    activity: "Zanzibar beach",
    months: [
      "peak",
      "peak",
      "good",
      "no",
      "no",
      "peak",
      "peak",
      "peak",
      "peak",
      "good",
      "good",
      "peak",
    ],
  },
  {
    activity: "Birdwatching",
    months: [
      "peak",
      "peak",
      "peak",
      "good",
      "good",
      "good",
      "good",
      "good",
      "good",
      "good",
      "peak",
      "peak",
    ],
  },
  {
    activity: "Budget safari",
    months: [
      "good",
      "good",
      "good",
      "peak",
      "peak",
      "good",
      "no",
      "no",
      "no",
      "good",
      "peak",
      "good",
    ],
  },
];

export const kilimanjaroFacts = [
  { label: "Summit height", value: "5,895 m" },
  { label: "Established routes", value: "7" },
  { label: "Typical duration", value: "6–9 days" },
  { label: "Distance from Arusha", value: "80 km" },
  { label: "Our 7-day success rate", value: "89%" },
  { label: "Summit night start", value: "23:30" },
];

export const kilimanjaroZones = [
  { zone: "Cultivation", range: "800–1,800 m", life: "Farmland, blue monkey" },
  { zone: "Rainforest", range: "1,800–2,800 m", life: "Colobus, bushbuck, turaco" },
  { zone: "Moorland", range: "2,800–4,000 m", life: "Giant lobelia, ravens" },
  { zone: "Alpine desert", range: "4,000–5,000 m", life: "Lichen, almost no fauna" },
  { zone: "Arctic", range: "5,000–5,895 m", life: "Ice and rock" },
];

export const kilimanjaroLodging = [
  { tier: "Mountain lodge (pre/post)", basis: "Per night", band: "$90–180" },
  { tier: "Tented camp on route", basis: "Per climber per night", band: "Included" },
  { tier: "Hut (Marangu only)", basis: "Per climber per night", band: "Included" },
];

/** Things-to-do counts for the Kilimanjaro section — numbers, no filler. */
export const kilimanjaroActivities = [
  { value: "7", label: "Routes to the summit" },
  { value: "5", label: "Ecological zones crossed" },
  { value: "1", label: "Day hike to Shira (no summit)" },
  { value: "3", label: "Waterfall and coffee-farm day trips" },
];

/** Mini best-time strip for Kilimanjaro only: 12 ratings, Jan first. */
export const kilimanjaroMonths: ("peak" | "good" | "no")[] = [
  "peak",
  "peak",
  "good",
  "no",
  "no",
  "peak",
  "peak",
  "peak",
  "peak",
  "good",
  "no",
  "good",
];

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const enquiryBenefits = [
  "A day-by-day draft within one working day",
  "Named lodges and drive times, not 'or similar'",
  "Park fees itemised in the quote",
  "Two rounds of changes before you pay anything",
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
