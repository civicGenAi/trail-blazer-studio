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
    pin: { x: 22, y: 34 },
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
    pin: { x: 38, y: 52 },
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
    pin: { x: 52, y: 60 },
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
    pin: { x: 74, y: 44 },
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
    pin: { x: 88, y: 74 },
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
    pin: { x: 30, y: 50 },
  },
];

export const airports = [
  { name: "Kilimanjaro International (JRO)", pin: { x: 66, y: 50 } },
  { name: "Arusha Airport (ARK)", pin: { x: 58, y: 54 } },
];

export const bestTimeMatrix: {
  activity: string;
  months: ("peak" | "good" | "no")[];
}[] = [
  { activity: "Wildlife safari", months: ["good", "good", "good", "no", "no", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
  { activity: "Great Migration", months: ["peak", "peak", "peak", "good", "good", "good", "peak", "peak", "peak", "good", "good", "good"] },
  { activity: "Kilimanjaro trek", months: ["peak", "peak", "good", "no", "no", "peak", "peak", "peak", "peak", "good", "no", "good"] },
  { activity: "Zanzibar beach", months: ["peak", "peak", "good", "no", "no", "peak", "peak", "peak", "peak", "good", "good", "peak"] },
  { activity: "Birdwatching", months: ["peak", "peak", "peak", "good", "good", "good", "good", "good", "good", "good", "peak", "peak"] },
  { activity: "Budget safari", months: ["good", "good", "good", "peak", "peak", "good", "no", "no", "no", "good", "peak", "good"] },
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
