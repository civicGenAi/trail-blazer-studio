/**
 * Company-level facts and copy shared across pages.
 * Voice rule: plain verbs, specific numbers, sentence case, no brochure filler.
 */

export const company = {
  name: "Arusha Wildlife Safaris",
  tagline: "Explore Tanzania · Experience the Wild",
  email: "book@arushawildlifesafaris.com",
  phoneDisplay: "+255 700 000 000",
  coordinates: "03°22′S 36°41′E",
  address: "Njiro Road, Arusha, Tanzania",
  founded: 2014,
  officeHours: "Mon–Sat, 08:00–18:00 EAT (UTC+3)",
} as const;

export const trustPoints = [
  { value: "11 yrs", label: "Operating from Arusha" },
  { value: "2,400+", label: "Guests guided" },
  { value: "9", label: "Own Land Cruisers" },
  { value: "4.8 / 5", label: "Average review score" },
];

/** Why-us blocks. Each one states a mechanism, not a mood. */
export const whyUs = [
  {
    title: "We own the vehicles",
    body: "Nine Land Cruisers, serviced in our own Arusha workshop every 5,000 km. No subcontracting, so a breakdown is our problem to fix, not a broker's.",
  },
  {
    title: "Two nights per park",
    body: "Most northern-circuit itineraries move you daily. Ours hold two nights in each park, which buys you a dawn drive you would otherwise spend packing.",
  },
  {
    title: "Guides on salary",
    body: "Our guides are employed year-round, not hired per trip. Average tenure is seven years and every one holds a Tanzanian professional guide licence.",
  },
  {
    title: "Fixed, itemised pricing",
    body: "Park fees, concession fees and full board are priced in the quote. The not-included list is published on every itinerary page before you enquire.",
  },
];

export const testimonials = [
  {
    quote:
      "We spent three full days at the Mara River and saw two crossings on the second afternoon. The guide read the herd behaviour and moved us 40 minutes before it happened.",
    name: "Hannah W.",
    detail: "Northern Serengeti river crossings · August 2025",
  },
  {
    quote:
      "Seven days on Machame with the extra Karanga night. All four of us summited. The oximeter checks each evening made the acclimatisation decisions feel less like guesswork.",
    name: "Marcus D.",
    detail: "Machame route, Kilimanjaro · September 2025",
  },
  {
    quote:
      "The quote itemised park fees to the dollar and did not move. Two nights per park meant we were never repacking at 06:00.",
    name: "Priya R.",
    detail: "Classic northern circuit · February 2025",
  },
];

/** Booking process: four steps, described by what happens. */
export const bookingSteps = [
  {
    step: "01",
    title: "Send dates and group size",
    body: "Use the form or WhatsApp. We reply within one working day with what is available for those dates.",
  },
  {
    step: "02",
    title: "We draft the itinerary",
    body: "A day-by-day plan with named lodges, drive times and an itemised price. Two rounds of changes are included.",
  },
  {
    step: "03",
    title: "Deposit holds the camps",
    body: "30% confirms the booking. Balance is due 45 days before arrival. Dates can be moved free up to that point.",
  },
  {
    step: "04",
    title: "Arrival at JRO",
    body: "We meet you at Kilimanjaro International, run a briefing that evening, and start at first light the next morning.",
  },
];

export const generalFaq: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Before you book",
    items: [
      {
        q: "How far ahead should I book?",
        a: "Six to nine months for June–October and February. Three months is usually enough for April, May and November, when camps are quieter and rates drop.",
      },
      {
        q: "What is the deposit and when is the balance due?",
        a: "30% on confirmation, balance 45 days before arrival. Dates can be changed free of charge up to the 45-day point.",
      },
      {
        q: "Do you run group departures or private trips?",
        a: "Private only. Every itinerary is one vehicle for your party, with a maximum of six guests and a guaranteed window seat each.",
      },
      {
        q: "Can you build a route that is not listed?",
        a: "Yes. Roughly half of what we run is custom. Send the parks you want, your dates and a budget per person and we will draft a day-by-day plan.",
      },
    ],
  },
  {
    category: "Money and paperwork",
    items: [
      {
        q: "What does a Tanzania visa cost?",
        a: "USD 50 for most nationalities, USD 100 for US passport holders. Apply online at the immigration e-services portal or on arrival at JRO.",
      },
      {
        q: "Are park fees included?",
        a: "Yes, on every listed itinerary. Serengeti is USD 70 per person per day, the Ngorongoro crater service fee is USD 295 per vehicle per descent, and both are priced into the quote.",
      },
      {
        q: "What should I budget for tips?",
        a: "USD 20–25 per guest per day for a safari guide. For Kilimanjaro, USD 250–300 per climber covers the whole crew and is pooled at the gate.",
      },
      {
        q: "Which currency and payment methods?",
        a: "Quotes are in USD. Bank transfer or card. Card payments carry a 3.5% processor fee, which we show on the invoice rather than folding into the price.",
      },
    ],
  },
  {
    category: "On the ground",
    items: [
      {
        q: "Do I need vaccinations?",
        a: "Yellow fever proof is required only if you arrive from a country where it is endemic. Malaria prophylaxis is recommended for all safari areas below 1,800 m. Check with a travel clinic six weeks out.",
      },
      {
        q: "What is the luggage limit?",
        a: "Soft bags, 15 kg per person on domestic light aircraft. Vehicles have no practical limit, but the flights do, so pack to the 15 kg figure if your trip includes one.",
      },
      {
        q: "Is there phone signal and power?",
        a: "Vodacom and Airtel cover most of Seronera, Ngorongoro rim and Tarangire. The northern Serengeti is patchy. Every vehicle has 12V charging; camps run generators or solar, typically 06:00–10:00 and 18:00–23:00.",
      },
      {
        q: "What should I pack?",
        a: "Neutral layers, a fleece for the 6°C crater-rim mornings, closed shoes, sun hat, 8×42 binoculars and a dust-proof bag for camera bodies. Laundry is available at most lodges.",
      },
      {
        q: "Is it suitable for children?",
        a: "Yes from about six years old. Ngorongoro and Tarangire have the shortest drives. Some camps set a minimum age of 12 for walking activities, which we flag before you book.",
      },
    ],
  },
];
