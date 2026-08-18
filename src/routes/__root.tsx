import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import {
  DEFAULT_OG_IMAGE,
  jsonLd,
  KEYWORDS,
  seo,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

function NotFoundComponent() {
  return (
    <div className="grain-dark flex min-h-[78vh] items-center px-5">
      <div className="container-editorial">
        <p className="eyebrow">Error 404</p>
        <div className="trail-dotted-x trail-draw-x mt-4 w-full max-w-xs" aria-hidden />
        <h1 className="mt-6 max-w-2xl text-4xl text-cream sm:text-5xl lg:text-6xl">
          This page is not on the map
        </h1>
        <p className="mt-5 max-w-lg text-cream/70">
          The link may be out of date. These four cover most of what people are looking for.
        </p>
        <ul className="mt-10 grid max-w-3xl gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/safaris", label: "Safari tours", note: "Six itineraries, filterable" },
            { to: "/migration", label: "Migration", note: "Where the herds are now" },
            { to: "/destinations", label: "Destinations", note: "Six parks and regions" },
            { to: "/contact", label: "Contact", note: "Reply within one working day" },
          ].map((l) => (
            <li key={l.to} className="bg-savanna">
              <Link
                to={l.to}
                className="flex h-full flex-col p-5 transition-colors duration-300 hover:bg-savanna-deep"
              >
                <span className="text-cream">{l.label}</span>
                <span className="field-note mt-2 text-cream/45">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md">
        <p className="eyebrow">Error</p>
        <h1 className="mt-4 text-3xl">This page did not load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Reload the page, or head back home.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-4 py-2.5 text-sm text-primary-foreground"
          >
            Reload
          </button>
          <a href="/" className="border border-border px-4 py-2.5 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Arusha Safaris",
  slogan: SITE_TAGLINE,
  description:
    "Tanzania safari operator based in Arusha, running northern-circuit safaris, Great Migration departures, Kilimanjaro treks and Zanzibar extensions with its own vehicles and salaried guides.",
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  image: DEFAULT_OG_IMAGE,
  email: "book@arushawildlifesafaris.com",
  telephone: "+255700000000",
  foundingDate: "2014",
  priceRange: "$$-$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Bank transfer, Credit card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Njiro Road",
    addressLocality: "Arusha",
    addressRegion: "Arusha Region",
    addressCountry: "TZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: -3.3667, longitude: 36.6833 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: [
    "Serengeti National Park",
    "Ngorongoro Conservation Area",
    "Tarangire National Park",
    "Lake Manyara",
    "Mount Kilimanjaro",
    "Zanzibar",
  ],
  knowsAbout: [
    "Great Migration river crossings",
    "Serengeti calving season",
    "Kilimanjaro route selection",
    "Tanzania park fees",
    "Northern circuit itinerary planning",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "630",
    bestRating: "5",
  },
  sameAs: [
    "https://www.instagram.com/arushawildlifesafaris",
    "https://www.facebook.com/arushawildlifesafaris",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: `${SITE_NAME}. ${SITE_TAGLINE}.`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Base tags for every page. Child routes override title, description and the
// social card by name. The canonical deliberately lives on each route instead:
// link tags from the root and the child are appended, not merged, so declaring
// one here would put a second, wrong canonical on every inner page.
const rootSeo = seo({
  title: `${SITE_NAME} | Tanzania Safaris and Kilimanjaro Treks`,
  description:
    "Arusha-based operator running northern-circuit safaris, Great Migration departures and Kilimanjaro routes. Private trips, park fees and full board included.",
  path: "/",
  image: "/og/default.jpg",
  keywords: [...KEYWORDS.brand, ...KEYWORDS.core],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#14231C" },
      { name: "apple-mobile-web-app-title", content: "Arusha Safaris" },
      { name: "geo.region", content: "TZ-01" },
      { name: "geo.placename", content: "Arusha, Tanzania" },
      { name: "geo.position", content: "-3.3667;36.6833" },
      ...rootSeo.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Instrument+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap",
      },
    ],
    scripts: [
      {
        // Runs before the body paints. Scroll-reveal only hides content once
        // this flag is set, so a page with blocked or broken JS still renders.
        children: 'document.documentElement.setAttribute("data-js","on")',
      },
      jsonLd(organizationSchema),
      jsonLd(websiteSchema),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-savanna focus:px-4 focus:py-3 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="overflow-x-clip">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </QueryClientProvider>
  );
}
