/**
 * One place for everything a crawler or a language model reads: canonical URLs,
 * social cards, keyword sets and JSON-LD. Routes call `seo()` in their `head()`
 * so no page can quietly ship without a canonical or an og:image.
 */

export const SITE_URL = "https://www.arushawildlifesafaris.com";
export const SITE_NAME = "Arusha Wildlife Safaris";
export const SITE_TAGLINE = "Explore Tanzania, Experience the Wild";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;
export const TWITTER_HANDLE = "@arushawildlife";

/**
 * Trim a description to what a search snippet actually shows, cutting at a
 * sentence boundary rather than mid-word.
 */
export function snippet(text: string, limit = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const stop = cut.lastIndexOf(". ");
  return stop > 80 ? cut.slice(0, stop + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}...`;
}

/** Absolute URL for a site-relative path. Crawlers need absolute, always. */
export function absolute(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

export type SeoInput = {
  /** Shown in the tab and in results. Keep under about 60 characters. */
  title: string;
  description: string;
  /** Site-relative, no trailing slash except the home page. */
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "product";
  /** ISO date, articles only. */
  publishedTime?: string;
  author?: string;
  noindex?: boolean;
};

export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  type = "website",
  publishedTime,
  author,
  noindex = false,
}: SeoInput): { meta: MetaTag[]; links: LinkTag[] } {
  const url = absolute(path);
  // Google truncates around 60 characters. Append the brand only when the
  // result still fits, so long tour and post titles are not cut mid-word.
  const TITLE_LIMIT = 65;
  const branded = `${title} | ${SITE_NAME}`;
  const fullTitle = title.includes(SITE_NAME) || branded.length > TITLE_LIMIT ? title : branded;

  const meta: MetaTag[] = [
    { title: fullTitle },
    { name: "description", content: snippet(description) },
    { name: "author", content: author ?? SITE_NAME },

    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: snippet(description) },
    { property: "og:url", content: url },
    { property: "og:image", content: absolute(image) },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: "en_US" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: snippet(description) },
    { name: "twitter:image", content: absolute(image) },
  ];

  if (keywords.length > 0) meta.push({ name: "keywords", content: keywords.join(", ") });
  if (publishedTime) {
    meta.push({ property: "article:published_time", content: publishedTime });
    meta.push({ property: "article:author", content: author ?? SITE_NAME });
  }
  meta.push({
    name: "robots",
    content: noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  });

  return { meta, links: [{ rel: "canonical", href: url }] };
}

/** JSON-LD goes in `head().scripts`; this keeps the shape consistent. */
export function jsonLd(schema: object) {
  return { type: "application/ld+json", children: JSON.stringify(schema) };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function itemListSchema(name: string, urls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: urls.length,
    itemListElement: urls.map((url, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(url),
    })),
  };
}

/**
 * Keyword sets. These describe what a page is actually about, in the words a
 * traveller would type. No stuffing: search engines discount it, and language
 * models summarising the page will repeat whatever is here.
 */
export const KEYWORDS = {
  brand: ["Arusha Wildlife Safaris", "Tanzania safari operator", "Arusha safari company"],
  core: [
    "Tanzania safari",
    "Serengeti safari",
    "Ngorongoro Crater tour",
    "northern circuit safari",
    "Arusha safari operator",
  ],
  migration: [
    "Great Migration safari",
    "Mara River crossing",
    "wildebeest migration Tanzania",
    "Serengeti calving season",
    "migration month by month",
  ],
  trekking: [
    "Kilimanjaro trek",
    "Machame route",
    "Lemosho route",
    "Marangu route",
    "Kilimanjaro summit success rate",
  ],
  destinations: [
    "Serengeti National Park",
    "Ngorongoro Conservation Area",
    "Tarangire National Park",
    "Ndutu calving",
    "Zanzibar beach extension",
    "best time to visit Tanzania",
  ],
  practical: [
    "Tanzania park fees",
    "Tanzania safari cost",
    "Tanzania visa",
    "what to pack for safari",
    "Tanzania safari FAQ",
  ],
} as const;
