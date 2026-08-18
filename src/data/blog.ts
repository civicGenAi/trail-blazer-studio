import { images } from "./tours";

export type BlogPost = {
  slug: string;
  title: string;
  category: "Timing" | "Routes" | "Wildlife" | "Practical";
  date: string;
  readMinutes: number;
  author: string;
  hero_image: string;
  excerpt: string;
  /** Body as a small block list so the template stays typed and simple. */
  body: ({ h?: string; p: string } | { h?: string; list: string[] })[];
  related_tour_slugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "when-mara-river-crossings-happen",
    title: "When the Mara River crossings actually happen",
    category: "Timing",
    date: "2026-06-12",
    readMinutes: 6,
    author: "Emmanuel Kimaro",
    hero_image: images.migrationCrossing,
    excerpt:
      "Crossings run from late June to late October, but the useful question is which bank to be sitting on. Here is what our 2023–2025 trip logs show.",
    body: [
      {
        p: "A crossing is not scheduled. Herds gather on a bank and wait, sometimes for six hours, then move in under four minutes. Nothing about that is predictable to the day, which is why the honest planning question is not 'when will it happen' but 'how many hours can I be in position'.",
      },
      {
        h: "What the logs show",
        p: "Across 61 northern-sector departures between 2023 and 2025 we recorded at least one crossing on 78% of trips that held three or more nights at Kogatende. Trips with two nights dropped to 54%. One night dropped to 31%. The single largest factor was nights on the river, not the month.",
      },
      {
        h: "Month by month",
        list: [
          "Late June: first crossings at the Grumeti, further south and smaller.",
          "July: herds reach the Mara line. Crossing points at Kogatende start working.",
          "August: highest frequency of the year. Also the highest camp rates.",
          "September: herds move back and forth across the river; crossings both directions.",
          "October: return crossings south as the north dries out. Quieter, and rates fall.",
        ],
      },
      {
        h: "The practical version",
        p: "If you can only take one week, take it in the second half of August and spend three nights inside the northern corridor rather than on the park boundary. If you want the same odds at a lower rate, take late September and add a night.",
      },
    ],
    related_tour_slugs: ["northern-serengeti-river-crossings"],
  },
  {
    slug: "six-or-seven-days-on-machame",
    title: "Six or seven days on Machame: what the extra night buys",
    category: "Routes",
    date: "2026-05-02",
    readMinutes: 5,
    author: "Neema Laizer",
    hero_image: images.kilimanjaro,
    excerpt:
      "The seven-day profile adds one night at Karanga at 3,995 m. In our own 2024 figures it moved summit success from 73% to 89%.",
    body: [
      {
        p: "Machame is the most-walked route on Kilimanjaro after Marangu. It is sold in six days and in seven. The difference is a single night at Karanga camp, and it is the most consequential USD 180 on the whole mountain.",
      },
      {
        h: "Why the night matters",
        p: "On the six-day profile you walk Barranco to Barafu in one push and arrive at 4,673 m with about seven hours before a midnight start. On the seven-day profile you stop at Karanga at 3,995 m, sleep, and arrive at Barafu the following afternoon rested. Acclimatisation is a function of time at altitude, and that is the cheapest time you can buy on the route.",
      },
      {
        h: "Our 2024 numbers",
        list: [
          "Six-day departures: 41 climbers, 30 reached Uhuru Peak (73%).",
          "Seven-day departures: 88 climbers, 78 reached Uhuru Peak (89%).",
          "Turnarounds for altitude sickness: 7 on six-day, 4 on seven-day.",
        ],
      },
      {
        h: "What we recommend",
        p: "Take seven days unless you have slept above 4,000 m in the last two months. If your calendar is fixed at six days, Lemosho over eight is a better use of the same fitness than Machame over six.",
      },
    ],
    related_tour_slugs: ["machame-route-kilimanjaro"],
  },
  {
    slug: "february-in-ndutu",
    title: "February in Ndutu: 8,000 calves a day and what follows them",
    category: "Wildlife",
    date: "2026-02-18",
    readMinutes: 4,
    author: "Emmanuel Kimaro",
    hero_image: images.heroSavanna,
    excerpt:
      "Calving concentrates roughly 500,000 births into three weeks on the short-grass plains, and every predator in the ecosystem knows it.",
    body: [
      {
        p: "The short grass on the Ndutu plains grows on volcanic ash from Ol Doinyo Lengai. It is unusually high in calcium and phosphorus, which is what a lactating wildebeest needs. That soil chemistry is the reason the herds calve here and nowhere else.",
      },
      {
        h: "What you see",
        p: "Births peak in the first three weeks of February, roughly 8,000 a day. A calf is standing within six minutes and running with the herd inside a day, which is the entire evolutionary point of compressing the season. For predators, it is the one time of year when hunting is not the limiting factor.",
      },
      {
        h: "Why photographers pick it",
        list: [
          "Herds are stationary, so you work the same subjects across several days.",
          "Off-road driving is permitted in the Ndutu concession, unlike the national park.",
          "Cheetah hunt in daylight on open ground with clean backgrounds.",
          "Predator density is the highest of the year: lion, hyena, cheetah and jackal within one plain.",
        ],
      },
      {
        h: "One caveat",
        p: "February is the short dry spell inside the wet season. Afternoon storms are normal and black-cotton soil holds water. This is a trip for a vehicle with a winch and a guide who knows which tracks flood.",
      },
    ],
    related_tour_slugs: ["calving-season-ndutu"],
  },
  {
    slug: "what-park-fees-actually-cost",
    title: "What park fees actually cost in 2026",
    category: "Practical",
    date: "2026-01-20",
    readMinutes: 5,
    author: "Neema Laizer",
    hero_image: images.ngorongoro,
    excerpt:
      "Park fees are 30–40% of a northern-circuit quote. Here is the line-by-line so you can check any operator's pricing, including ours.",
    body: [
      {
        p: "Fees are set by TANAPA and the Ngorongoro Conservation Area Authority, published in USD, and charged per 24 hours from the moment you pass the gate. They are not negotiable and they are the same for every operator, so a quote that is far below the market is usually cutting nights, not fees.",
      },
      {
        h: "The main lines, per person per 24 hours",
        list: [
          "Serengeti National Park: USD 70, plus 18% VAT.",
          "Tarangire National Park: USD 53, plus 18% VAT.",
          "Ngorongoro Conservation Area entry: USD 70.",
          "Ngorongoro crater service fee: USD 295 per vehicle per descent.",
          "Public campsite: USD 35. Special campsite: USD 59.",
          "Concession fee inside private areas: USD 60–90, set by the concession.",
        ],
      },
      {
        h: "How to read a quote",
        p: "Multiply the per-day figures by your nights in each park and add the crater descent. On a seven-day northern circuit for two people sharing that lands at roughly USD 1,150 before accommodation, vehicle, fuel and guide. If a quote for the same route comes in under that, ask which nights were removed.",
      },
      {
        h: "Where the rest goes",
        p: "Accommodation is the next largest line, then vehicle and fuel. A northern circuit covers about 1,180 km, most of it on corrugated gravel. Guide salary, workshop time and insurance make up the balance.",
      },
    ],
    related_tour_slugs: ["classic-northern-circuit"],
  },
  {
    slug: "choosing-between-tarangire-and-ngorongoro",
    title: "Tarangire or Ngorongoro if you only have one day",
    category: "Routes",
    date: "2025-11-08",
    readMinutes: 4,
    author: "Emmanuel Kimaro",
    hero_image: images.tarangire,
    excerpt:
      "Both are within a half day of Arusha. They reward completely different trips, and the deciding factor is usually the month.",
    body: [
      {
        p: "A one-day question comes up constantly from guests adding a safari to a Kilimanjaro climb or a conference. The two realistic answers are Tarangire, two and a half hours from Arusha, and the Ngorongoro Crater, four hours away.",
      },
      {
        h: "Tarangire",
        p: "Best from July to October, when the river is the only water for 60 km and elephant groups of over 100 gather on it. Outside the dry season the animals disperse across 2,850 km² and a single day can be thin. Baobab country, and the least crowded of the northern parks.",
      },
      {
        h: "Ngorongoro Crater",
        p: "Consistent year-round, because the caldera holds roughly 25,000 animals inside 260 km² and they do not leave. It is the most reliable single day of game viewing in Tanzania and the best black rhino odds in the country. It is also the busiest: expect other vehicles at every sighting, and a 06:30 descent to get ahead of them.",
      },
      {
        h: "The short answer",
        list: [
          "July to October, want elephants and space: Tarangire.",
          "Any month, want the widest species list in one day: Ngorongoro.",
          "Want a rhino: Ngorongoro, and start at the Lerai forest.",
        ],
      },
    ],
    related_tour_slugs: ["classic-northern-circuit", "safari-and-zanzibar"],
  },
  {
    slug: "packing-for-a-northern-circuit",
    title: "Packing for a northern circuit, by temperature",
    category: "Practical",
    date: "2025-09-30",
    readMinutes: 4,
    author: "Neema Laizer",
    hero_image: images.serengeti,
    excerpt:
      "The crater rim reaches 6°C before dawn and the Serengeti hits 30°C by midday. One trip, a 24-degree spread, one soft bag.",
    body: [
      {
        p: "Almost every packing mistake we see comes from planning for the average temperature instead of the range. A northern circuit runs from 6°C on the Ngorongoro rim at 06:00 to 30°C on the Serengeti plains at 13:00, on the same day.",
      },
      {
        h: "The layer that matters",
        p: "A fleece or light down jacket for game drives before 09:00. Vehicle roofs are open and 40 km/h of moving air at 8°C is the coldest most guests get on the whole trip.",
      },
      {
        h: "Bag and quantities",
        list: [
          "Soft duffel, 15 kg. Hard cases do not fit the vehicle load bay or light aircraft.",
          "Three neutral shirts and two trousers; laundry runs at most lodges for USD 2–4 an item.",
          "Closed shoes for the crater floor and Barranco-style scrambles, sandals for camp.",
          "8×42 binoculars per person, not one pair shared. It is the single best-value item you will bring.",
          "Dust-proof bag or dry bag for camera bodies; the gravel roads produce fine dust for six hours a day.",
        ],
      },
      {
        h: "Leave behind",
        p: "Camouflage clothing is restricted in Tanzania and can be confiscated. Drones require a permit applied for months in advance. Single-use plastic bags are banned at entry.",
      },
    ],
    related_tour_slugs: ["classic-northern-circuit"],
  },
];

export const blogCategories = ["All", "Timing", "Routes", "Wildlife", "Practical"] as const;

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
