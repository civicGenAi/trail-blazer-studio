import { images } from "./tours";

export type TrekRoute = {
  slug: string;
  name: string;
  nights: number;
  distance_km: number;
  successRate: number;
  scenery: "Very high" | "High" | "Moderate";
  traffic: "Busy" | "Moderate" | "Quiet";
  sleeping: "Tents" | "Huts";
  price_from_usd: number;
  approach: string;
  summary: string;
  bestFor: string;
  /** Camp altitudes in metres, used to draw the elevation trail. */
  profile: { label: string; altitude: number }[];
  tour_slug?: string;
};

export const trekRoutes: TrekRoute[] = [
  {
    slug: "machame",
    name: "Machame",
    nights: 6,
    distance_km: 62,
    successRate: 89,
    scenery: "Very high",
    traffic: "Busy",
    sleeping: "Tents",
    price_from_usd: 2150,
    approach: "South-west",
    summary:
      "The climb-high-sleep-low profile at Lava Tower does the acclimatisation work. Steepest single section is the Barranco Wall, a scramble with no ropes.",
    bestFor: "First-time climbers with six spare days who want the best success-to-cost ratio.",
    profile: [
      { label: "Gate", altitude: 1800 },
      { label: "Machame", altitude: 2835 },
      { label: "Shira", altitude: 3750 },
      { label: "Lava Tower", altitude: 4630 },
      { label: "Barranco", altitude: 3960 },
      { label: "Karanga", altitude: 3995 },
      { label: "Barafu", altitude: 4673 },
      { label: "Uhuru", altitude: 5895 },
    ],
    tour_slug: "machame-route-kilimanjaro",
  },
  {
    slug: "lemosho",
    name: "Lemosho",
    nights: 7,
    distance_km: 70,
    successRate: 92,
    scenery: "Very high",
    traffic: "Moderate",
    sleeping: "Tents",
    price_from_usd: 2680,
    approach: "West",
    summary:
      "Two extra days on the Shira plateau before joining the Machame line. The longest approach, and the highest summit rate we run.",
    bestFor: "Climbers who can spare eight days and want the widest acclimatisation margin.",
    profile: [
      { label: "Londorossi", altitude: 2100 },
      { label: "Mti Mkubwa", altitude: 2780 },
      { label: "Shira 1", altitude: 3610 },
      { label: "Shira 2", altitude: 3850 },
      { label: "Lava Tower", altitude: 4630 },
      { label: "Barranco", altitude: 3960 },
      { label: "Karanga", altitude: 3995 },
      { label: "Barafu", altitude: 4673 },
      { label: "Uhuru", altitude: 5895 },
    ],
  },
  {
    slug: "marangu",
    name: "Marangu",
    nights: 5,
    distance_km: 64,
    successRate: 68,
    scenery: "Moderate",
    traffic: "Busy",
    sleeping: "Huts",
    price_from_usd: 1890,
    approach: "South-east",
    summary:
      "The only route with dormitory huts and the only one you ascend and descend on the same path. Gentlest gradient, worst acclimatisation profile.",
    bestFor: "Climbers who need a bed and a roof, or are travelling in the wettest months.",
    profile: [
      { label: "Marangu Gate", altitude: 1860 },
      { label: "Mandara", altitude: 2700 },
      { label: "Horombo", altitude: 3720 },
      { label: "Kibo", altitude: 4700 },
      { label: "Uhuru", altitude: 5895 },
    ],
  },
  {
    slug: "rongai",
    name: "Rongai",
    nights: 6,
    distance_km: 73,
    successRate: 81,
    scenery: "High",
    traffic: "Quiet",
    sleeping: "Tents",
    price_from_usd: 2340,
    approach: "North",
    summary:
      "The only approach from the Kenyan side. The northern slope sits in the rain shadow, so it stays driest when the south is wet.",
    bestFor: "Climbing in the shoulder months, or wanting the fewest people on the trail.",
    profile: [
      { label: "Nalemuru", altitude: 1950 },
      { label: "Simba", altitude: 2625 },
      { label: "Kikelewa", altitude: 3600 },
      { label: "Mawenzi Tarn", altitude: 4330 },
      { label: "Kibo", altitude: 4700 },
      { label: "Uhuru", altitude: 5895 },
    ],
  },
];

export const trekIncluded = [
  "Park, camping and rescue fees",
  "Licensed lead guide plus one assistant per three climbers",
  "Cook, porters and all camp equipment",
  "Four-season tents and a heated mess tent",
  "Three cooked meals a day on the mountain",
  "Two hotel nights in Moshi, before and after",
  "Pulse oximeter checks each evening",
  "Portable oxygen and a hyperbaric bag on every departure",
];

export const trekNotIncluded = [
  "International flights and Tanzania visa",
  "Sleeping bag hire (USD 40 for the trip)",
  "Personal trekking gear and boots",
  "Travel and evacuation insurance",
  "Crew tips, USD 250–300 per climber",
];

export const trekPrep = [
  {
    title: "Fitness",
    body: "Kilimanjaro is a walk, not a climb, but it is a long one. Aim for three sessions a week for eight weeks, including one hike of four hours or more with a loaded daypack.",
  },
  {
    title: "Altitude",
    body: "No level of fitness prevents altitude sickness. What helps is a longer profile, drinking 3–4 litres a day, and walking slowly enough to hold a conversation the whole way.",
  },
  {
    title: "Summit night",
    body: "Leaves Barafu at 23:30, reaches Stella Point around 06:00 and Uhuru Peak 45 minutes later. Temperatures at the crater rim run −10°C to −20°C with wind.",
  },
  {
    title: "Descent",
    body: "Summit day ends with a 2,800 m descent to Mweka. Trekking poles and boots you have already broken in matter more here than anywhere else on the mountain.",
  },
];

export const trekHero = images.kilimanjaro;
