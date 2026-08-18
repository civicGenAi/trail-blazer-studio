import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { ctaGhostDark, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, StatStrip } from "@/components/site/Section";
import { TrailLine } from "@/components/site/TrailLine";
import { trekIncluded, trekNotIncluded, trekPrep, trekRoutes, trekHero } from "@/data/trekking";
import type { TrekRoute } from "@/data/trekking";
import { breadcrumbs, jsonLd, KEYWORDS, seo } from "@/lib/seo";

export const Route = createFileRoute("/trekking")({
  head: () => {
    const { meta, links } = seo({
      title: "Kilimanjaro Routes Compared",
      description:
        "Four Kilimanjaro routes side by side: nights, distance, camp altitudes and our own summit rates, 68% on Marangu to 92% on Lemosho. From USD 1,890.",
      path: "/trekking",
      image: "/og/trekking.jpg",
      keywords: [...KEYWORDS.trekking, "climb Kilimanjaro", "Kilimanjaro route comparison"],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Mountain trekking", path: "/trekking" },
          ]),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Kilimanjaro routes",
          numberOfItems: trekRoutes.length,
          itemListElement: trekRoutes.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "TouristTrip",
              name: `${r.name} route, Kilimanjaro`,
              description: r.summary,
              touristType: "Trekkers",
              offers: {
                "@type": "Offer",
                price: r.price_from_usd,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            },
          })),
        }),
      ],
    };
  },
  component: TrekkingPage,
});

function TrekkingPage() {
  const best = trekRoutes.reduce((a, b) => (b.successRate > a.successRate ? b : a));
  const floor = Math.min(...trekRoutes.map((r) => r.price_from_usd));

  return (
    <>
      <section className="on-dark relative isolate flex min-h-[70vh] items-end">
        <img
          src={trekHero}
          alt="Kibo peak seen from the Shira plateau"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 photo-scrim" aria-hidden />
        <div className="container-editorial pb-16 pt-32">
          <p className="rise eyebrow">Mountain trekking</p>
          <TrailLine className="rise-1 mt-4 w-full max-w-sm" />
          <h1 className="rise-2 mt-6 max-w-3xl text-4xl text-mist sm:text-5xl lg:text-7xl">
            Four routes to <em className="font-normal italic">5,895 m</em>
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-mist/75">
            No technical climbing on any of them. What separates the routes is how much time they
            give you above 3,500 m, and that is what decides whether you summit.
          </p>
          <div className="rise-4 mt-9 flex flex-wrap gap-3">
            <Link to="/safaris" search={{ type: "Trekking" }} className={ctaGold}>
              Trekking itineraries
            </Link>
            <WhatsAppLink className={ctaGhostDark} message="Hello, I'd like to climb Kilimanjaro.">
              Ask about a climb
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="grain-dark border-t border-mist/10">
        <div className="container-editorial py-10">
          <StatStrip
            dark
            stats={[
              { value: "5,895 m", label: "Uhuru Peak" },
              { value: `${best.successRate}%`, label: `Best summit rate (${best.name})` },
              { value: "1:3", label: "Guides to climbers" },
              { value: `$${floor.toLocaleString()}`, label: "From, per climber" },
            ]}
          />
        </div>
      </section>

      {/* Route comparison cards */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="Route comparison"
              title="Pick by profile, not by name"
              intro="Success rates below are our own departures, not park-wide averages. Each card shows the camp altitudes so you can see where the acclimatisation happens."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {trekRoutes.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 2) * 90}>
                <RouteCard route={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Included / not included */}
      <section className="border-y border-border bg-secondary py-20">
        <div className="container-editorial grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl">Included on every climb</h2>
            <ul className="mt-6 space-y-2.5 text-sm">
              {trekIncluded.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-3xl">Not included</h2>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              {trekNotIncluded.map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Preparation */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal>
            <SectionHead eyebrow="Preparation" title="What the mountain asks of you" />
          </Reveal>
          <ol className="mt-12 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
            {trekPrep.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 70} className="bg-background p-7">
                <span className="field-note text-summit">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="grain-dark py-20">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Booking window</p>
            <h2 className="mt-4 text-4xl text-mist md:text-5xl">
              Climbing permits are capped per gate per day
            </h2>
            <p className="mt-5 max-w-xl text-mist/70">
              January to March and June to October fill first. Send your dates and we will confirm
              gate availability before you book flights.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className={ctaGold}>
              Check dates
            </Link>
            <WhatsAppLink className={ctaGhostDark} message="Which Kilimanjaro dates are open?">
              WhatsApp us
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function RouteCard({ route }: { route: TrekRoute }) {
  return (
    <article className="card-slow flex h-full flex-col border border-border bg-card p-7">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="field-note text-muted-foreground">{route.approach} approach</p>
          <h3 className="mt-2 text-3xl">{route.name}</h3>
        </div>
        <p className="text-right">
          <span className="field-note block text-muted-foreground">From</span>
          <span className="price text-xl">${route.price_from_usd.toLocaleString()}</span>
        </p>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{route.summary}</p>

      <ElevationTrail profile={route.profile} />

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-3">
        <Stat label="Nights" value={String(route.nights)} />
        <Stat label="Distance" value={`${route.distance_km} km`} />
        <Stat label="Summit rate" value={`${route.successRate}%`} />
        <Stat label="Sleeping" value={route.sleeping} />
        <Stat label="Scenery" value={route.scenery} />
        <Stat label="Traffic" value={route.traffic} />
      </dl>

      <p className="mt-5 text-sm">
        <span className="field-note text-muted-foreground">Best for </span>
        {route.bestFor}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
        {route.tour_slug ? (
          <Link
            to="/safaris/$slug"
            params={{ slug: route.tour_slug }}
            className="bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
          >
            View the itinerary
          </Link>
        ) : (
          <Link
            to="/contact"
            className="bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
          >
            Request dates
          </Link>
        )}
        <WhatsAppLink
          className="border border-border px-4 py-2.5 text-sm transition-colors duration-300 hover:border-primary"
          message={`Question about the ${route.name} route.`}
        >
          WhatsApp
        </WhatsAppLink>
      </div>
    </article>
  );
}

/** The trail line as an elevation profile: camps plotted by altitude. */
function ElevationTrail({ profile }: { profile: TrekRoute["profile"] }) {
  const min = 1500;
  const max = 6000;
  const points = profile.map((p, i) => {
    const x = (i / (profile.length - 1)) * 100;
    const y = 100 - ((p.altitude - min) / (max - min)) * 100;
    return { ...p, x, y };
  });

  return (
    <div className="mt-6">
      <div className="relative h-28">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          role="presentation"
        >
          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--summit)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
          {points.map((p) => (
            <circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r="1.4"
              fill="var(--summit)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      <ol className="mt-2 flex justify-between gap-1 overflow-hidden">
        {points.map((p, i) => (
          <li
            key={p.label}
            className={`field-note min-w-0 truncate text-[0.55rem] text-muted-foreground ${
              i !== 0 && i !== points.length - 1 ? "hidden sm:block" : ""
            }`}
          >
            {p.label}
            <span className="block text-summit">{p.altitude.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="field-note text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm">{value}</dd>
    </div>
  );
}
