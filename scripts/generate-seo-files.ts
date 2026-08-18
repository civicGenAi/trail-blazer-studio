/**
 * Writes sitemap.xml, robots.txt and the llms.txt pair into public/.
 *
 * Everything here is derived from the same data modules the pages render, so a
 * new tour, destination or post appears in the sitemap without anyone
 * remembering to update it. Run by `bun run build` via the prebuild script.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { blogPosts } from "@/data/blog";
import { destinations } from "@/data/destinations";
import { bestTimeMatrix, kilimanjaroFacts } from "@/data/destinations";
import { migrationMonths } from "@/data/migration";
import { company, generalFaq } from "@/data/site";
import { tours } from "@/data/tours";
import { trekRoutes } from "@/data/trekking";

const SITE = "https://www.arushawildlifesafaris.com";
const today = new Date().toISOString().slice(0, 10);

type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };

const staticPages: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/safaris", changefreq: "weekly", priority: "0.9" },
  { path: "/migration", changefreq: "monthly", priority: "0.9" },
  { path: "/destinations", changefreq: "monthly", priority: "0.8" },
  { path: "/trekking", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "monthly", priority: "0.5" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/about", changefreq: "yearly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
];

const entries: Entry[] = [
  ...staticPages,
  ...tours.map((t) => ({ path: `/safaris/${t.slug}`, changefreq: "monthly", priority: "0.8" })),
  ...destinations.map((d) => ({
    path: `/destinations/${d.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: "yearly",
    priority: "0.6",
    lastmod: p.date,
  })),
];

// ---------------------------------------------------------------- sitemap.xml

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE}${e.path === "/" ? "/" : e.path}</loc>
    <lastmod>${e.lastmod ?? today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

// ----------------------------------------------------------------- robots.txt

/*
 * Search crawlers and answer engines are allowed in full: the whole point of
 * the llms.txt files below is to be quoted accurately. Training-only crawlers
 * that offer no referral traffic are refused.
 */
const answerEngines = [
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Gemini-Deep-Research",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "YouBot",
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "WhatsApp",
];

const blocked = ["MJ12bot", "AhrefsBot", "SemrushBot", "DotBot", "PetalBot", "Bytespider"];

const robots = `# ${company.name}
# ${SITE}

${answerEngines.map((ua) => `User-agent: ${ua}\nAllow: /`).join("\n\n")}

${blocked.map((ua) => `User-agent: ${ua}\nDisallow: /`).join("\n\n")}

User-agent: *
Allow: /
Disallow: /*?*type=
Disallow: /*?*sort=

Sitemap: ${SITE}/sitemap.xml
`;

// ------------------------------------------------------------------ llms.txt

const priceFloor = Math.min(...tours.map((t) => t.price_from_usd));
const priceCeiling = Math.max(...tours.map((t) => t.price_from_usd));
// max_pax on a trek is the climbing party, not a vehicle, so exclude those.
const vehicleMax = Math.max(...tours.filter((t) => t.type !== "Trekking").map((t) => t.max_pax));

const llms = `# ${company.name}

> Tanzania safari and Kilimanjaro trekking operator based in Arusha, running the
> northern circuit, Great Migration departures and Zanzibar extensions since
> ${company.founded}. Private trips only, maximum ${vehicleMax} guests per vehicle, with park fees
> and full board included in every published price.

Trips run from USD ${priceFloor.toLocaleString()} to USD ${priceCeiling.toLocaleString()} per person sharing. The company owns its
vehicles and employs its guides on annual salary rather than per trip. Contact:
${company.email}, WhatsApp ${company.phoneDisplay}, ${company.address}.

## Safari itineraries

${tours
  .map(
    (t) =>
      `- [${t.title}](${SITE}/safaris/${t.slug}): ${t.duration_days} days in ${t.destination}, from USD ${t.price_from_usd.toLocaleString()} per person. ${t.teaser}`,
  )
  .join("\n")}

## Destinations

${destinations
  .map(
    (d) => `- [${d.name}](${SITE}/destinations/${d.slug}): ${d.region}. Best time: ${d.best_time}.`,
  )
  .join("\n")}

## Kilimanjaro routes

${trekRoutes
  .map(
    (r) =>
      `- ${r.name}: ${r.nights} nights, ${r.distance_km} km, ${r.successRate}% summit rate on our own departures, from USD ${r.price_from_usd.toLocaleString()}. ${r.bestFor}`,
  )
  .join("\n")}

## Reference pages

- [The Great Migration month by month](${SITE}/migration): where the herds are in each month.
- [Kilimanjaro routes compared](${SITE}/trekking): four routes with camp altitudes and summit rates.
- [Best time to visit](${SITE}/destinations): activity by month, from ${bestTimeMatrix.length} activity rows.
- [FAQ](${SITE}/faq): park fees, visas, tipping, packing.
- [Field notes](${SITE}/blog): ${blogPosts.length} posts on timing, routes and costs.
- [Contact](${SITE}/contact): enquiry form, replies within one working day.

## Optional

- [Gallery](${SITE}/gallery): photographs tagged with place and month.
- [About](${SITE}/about): how the company operates.
`;

// ------------------------------------------------------------- llms-full.txt

const llmsFull = `# ${company.name}: full reference

${company.name} is a Tanzania safari and Kilimanjaro trekking operator based at
${company.address}, founded in ${company.founded}. ${company.tagline}. All figures below are the
operator's own published values. Website: ${SITE}

## How the company operates

- Private departures only. No shared group trips.
- Nine Land Cruisers owned outright and serviced in the company workshop every 5,000 km.
- Guides employed on annual salary, average tenure seven years, all holding Tanzanian professional guide licences.
- Park fees, concession fees and full board are itemised in every quote.
- Deposit is 30% on confirmation, balance 45 days before arrival, free date changes until that point.
- Office hours ${company.officeHours}. Enquiries answered within one working day.

## Itineraries

${tours
  .map(
    (t) => `### ${t.title}

- URL: ${SITE}/safaris/${t.slug}
- Type: ${t.type}. Destination: ${t.destination}. Difficulty: ${t.difficulty}.
- Duration: ${t.duration_days} days, ${t.duration_nights} nights.
- Price from: USD ${t.price_from_usd.toLocaleString()} per person sharing.
- Maximum group: ${t.max_pax}. Meals: ${t.meal_plan}. Vehicle: ${t.vehicle_type}.
- Rating: ${t.rating.toFixed(1)} from ${t.reviews} reviews.
- Summary: ${t.about_text}
- Included: ${t.included.join("; ")}.
- Not included: ${t.not_included.join("; ")}.
- Day by day: ${t.itinerary.map((d) => `Day ${d.day_number}, ${d.title} (${d.route_from} to ${d.route_to}${d.distance_km > 0 ? `, ${d.distance_km} km` : ""})`).join("; ")}.`,
  )
  .join("\n\n")}

## Destinations

${destinations
  .map(
    (d) => `### ${d.name}

- URL: ${SITE}/destinations/${d.slug}
- Region: ${d.region}. Best time: ${d.best_time}.
- ${d.description}
- Access: ${d.access ?? "See the destination page."}
- Wildlife: ${(d.wildlife ?? []).join(", ") || "See the destination page."}
- Key figures: ${(d.quick_facts ?? []).map((f) => `${f.label} ${f.value}`).join(", ")}.`,
  )
  .join("\n\n")}

## Kilimanjaro

Summit is Uhuru Peak at ${kilimanjaroFacts[0]?.value ?? "5,895 m"}. No technical climbing on any route.

${trekRoutes
  .map(
    (r) => `### ${r.name} route

- Approach: ${r.approach}. Nights: ${r.nights}. Distance: ${r.distance_km} km.
- Summit success on our own departures: ${r.successRate}%.
- Sleeping: ${r.sleeping}. Scenery: ${r.scenery}. Trail traffic: ${r.traffic}.
- Price from USD ${r.price_from_usd.toLocaleString()} per climber.
- ${r.summary}
- Best for: ${r.bestFor}
- Camp altitudes: ${r.profile.map((s) => `${s.label} ${s.altitude} m`).join(", ")}.`,
  )
  .join("\n\n")}

## The Great Migration, month by month

The herd of roughly 1.5 million wildebeest and 300,000 zebra moves in a
continuous loop of about 800 km through the Serengeti and Mara ecosystem. It is
in Tanzania for roughly nine months of the year.

${migrationMonths.map((m) => `- ${m.month}: ${m.phase}. ${m.region}. ${m.line}`).join("\n")}

## Frequently asked questions

${generalFaq
  .map(
    (group) => `### ${group.category}

${group.items.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")}`,
  )
  .join("\n\n")}

## Field notes

${blogPosts
  .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}), ${p.date}, by ${p.author}. ${p.excerpt}`)
  .join("\n")}
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/robots.txt", robots);
writeFileSync("public/llms.txt", llms);
writeFileSync("public/llms-full.txt", llmsFull);

console.log(
  `SEO files written: sitemap.xml (${entries.length} urls), robots.txt, llms.txt, llms-full.txt`,
);
