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
import { reportLovableError } from "../lib/lovable-error-reporting";
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
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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
  name: "Arusha Wildlife Safaris",
  slogan: "Explore Tanzania · Experience the Wild",
  email: "book@arushawildlifesafaris.com",
  telephone: "+255700000000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Njiro Road",
    addressLocality: "Arusha",
    addressCountry: "TZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: -3.3667, longitude: 36.6833 },
  areaServed: ["Serengeti", "Ngorongoro", "Tarangire", "Kilimanjaro", "Zanzibar"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "630" },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arusha Wildlife Safaris — Tanzania safaris and Kilimanjaro treks" },
      {
        name: "description",
        content:
          "Arusha-based operator running northern-circuit safaris, Great Migration trips, Kilimanjaro routes and Zanzibar extensions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
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
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
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
