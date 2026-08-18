import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mountain } from "lucide-react";
import { useCallback } from "react";
import { BestTimeMatrix, MonthStripMini } from "@/components/site/BestTime";
import { ctaGhostLight, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { DestinationMap } from "@/components/site/DestinationMap";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, StatStrip } from "@/components/site/Section";
import { TrailLine } from "@/components/site/TrailLine";
import {
  bestTimeMatrix,
  destinations,
  enquiryBenefits,
  kilimanjaroActivities,
  kilimanjaroFacts,
  kilimanjaroLodging,
  kilimanjaroMonths,
  kilimanjaroZones,
} from "@/data/destinations";
import { images } from "@/data/tours";
import { breadcrumbs, itemListSchema, jsonLd, KEYWORDS, seo } from "@/lib/seo";

export const Route = createFileRoute("/destinations/")({
  head: () => {
    const { meta, links } = seo({
      title: "Tanzania Safari Destinations",
      description:
        "Six northern-circuit destinations with park sizes, drive times from Arusha and a best-time-to-visit matrix by activity and month, plus Kilimanjaro in full.",
      path: "/destinations",
      image: "/og/destinations.jpg",
      keywords: [...KEYWORDS.destinations, ...KEYWORDS.core],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
          ]),
        ),
        jsonLd(
          itemListSchema(
            "Tanzania safari destinations",
            destinations.map((d) => `/destinations/${d.slug}`),
          ),
        ),
      ],
    };
  },
  component: DestinationsPage,
});

function DestinationsPage() {
  const scrollToCard = useCallback((slug: string) => {
    document.getElementById(`dest-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Hero with the schematic map */}
      <section className="grain-dark pb-16 pt-14 md:pb-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="rise eyebrow">Destinations</p>
            <TrailLine className="rise-1 mt-3 w-24" />
            <h1 className="rise-2 mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
              Six places, two airports,
              <br />
              <em className="font-normal italic">one loop</em>
            </h1>
            <p className="rise-3 mt-5 max-w-md text-cream/70">
              Everything on this page is within a day of Arusha except Zanzibar, which is an hour
              and twenty by air. The map is schematic: it shows the order a route runs in, not
              scale.
            </p>
          </div>
          <div className="rise-4">
            <DestinationMap onSelect={scrollToCard} />
          </div>
        </div>

        <div className="container-editorial mt-12">
          <StatStrip
            dark
            stats={[
              { value: "6", label: "Parks and regions" },
              { value: "4", label: "Big Five locations" },
              { value: "5,895 m", label: "Kilimanjaro summit" },
              { value: "1h20", label: "Arusha to Zanzibar by air" },
            ]}
          />
        </div>
      </section>

      {/* Destination card grid */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="The places"
              title="Where each one earns its days"
              intro="Park size, drive time and the months that work. Every card links to the itineraries that reach it."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {destinations.map((d, i) => (
              <Reveal
                key={d.slug}
                as="article"
                delay={(i % 2) * 90}
                className="group card-slow flex flex-col border border-border bg-card"
              >
                <div id={`dest-${d.slug}`} className="relative scroll-mt-28 overflow-hidden">
                  <img
                    src={d.hero_image}
                    alt={d.name}
                    className="img-zoom-slow h-60 w-full object-cover"
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                  {d.featured && (
                    <span className="field-note absolute left-0 top-4 border-y border-r border-gold/50 bg-savanna/90 px-3 py-1.5 text-gold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="field-note text-muted-foreground">{d.region}</p>
                  <h3 className="mt-3 text-3xl">{d.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{d.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {d.highlight_tags.map((t) => (
                      <li
                        key={t}
                        className="border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <p className="field-note mt-5 text-muted-foreground">
                    Best time <span className="text-foreground normal-case">{d.best_time}</span>
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-6">
                    <Link
                      to="/destinations/$slug"
                      params={{ slug: d.slug }}
                      className="bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
                    >
                      Explore
                    </Link>
                    <Link
                      to="/contact"
                      className="border border-border px-4 py-2.5 text-sm transition-colors duration-300 hover:border-primary"
                    >
                      Book Custom Trip
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <KilimanjaroSection />

      {/* Best time matrix */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="Best time to visit"
              title="Activity by month"
              intro="Peak means conditions are at their best and rates are highest. Not recommended usually means the long rains, when tracks flood and some camps close."
            />
          </Reveal>
          <Reveal className="mt-10" delay={80}>
            <BestTimeMatrix rows={bestTimeMatrix} />
          </Reveal>
        </div>
      </section>

      {/* Closing enquiry */}
      <section className="border-t border-border bg-secondary py-20 md:py-24">
        <div className="container-editorial grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Plan it with us</p>
            <TrailLine className="mt-3 w-24" />
            <h2 className="mt-5 text-4xl md:text-5xl">Tell us which of these you want</h2>
            <ul className="mt-7 space-y-3">
              {enquiryBenefits.map((b) => (
                <li key={b} className="flex gap-3 text-sm">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppLink
                className={ctaGhostLight}
                message="Hello, I'd like help choosing destinations."
              >
                WhatsApp us instead
              </WhatsAppLink>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function KilimanjaroSection() {
  return (
    <section className="relative isolate grain-dark py-20 md:py-28">
      <img
        src={images.kilimanjaro}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1920}
        height={1080}
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 photo-scrim-soft" aria-hidden />

      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">In detail</p>
          <h2 className="mt-4 text-3xl text-cream sm:text-4xl lg:text-6xl">
            Kilimanjaro, <em className="font-normal italic">zone by zone</em>
          </h2>
          <p className="mt-5 text-cream/75">
            Five ecological zones in five days of walking, from farmland at 800 m to permanent ice
            at 5,895 m. The climb is a walk, with no technical sections, but the altitude is the
            whole problem to solve.
          </p>
        </Reveal>

        {/* Wildlife by elevation zone */}
        <Reveal className="mt-12" delay={70}>
          <ol className="grid gap-px bg-cream/10 md:grid-cols-5">
            {kilimanjaroZones.map((z) => (
              <li key={z.zone} className="bg-savanna/85 p-5 backdrop-blur">
                <Mountain className="h-5 w-5 text-gold" aria-hidden />
                <p className="mt-4 text-lg text-cream">{z.zone}</p>
                <p className="field-note mt-1.5 text-gold">{z.range}</p>
                <p className="mt-2 text-xs text-cream/60">{z.life}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Things to do + best-time strip */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="field-note text-cream/50">Things to do</p>
            <dl className="mt-4 grid grid-cols-2 gap-px bg-cream/10 sm:grid-cols-4">
              {kilimanjaroActivities.map((a) => (
                <div key={a.label} className="bg-savanna/85 p-5 backdrop-blur">
                  <dd className="font-mono text-3xl text-cream">{a.value}</dd>
                  <dt className="field-note mt-2 text-cream/50">{a.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal
            delay={80}
            className="min-w-0 border border-cream/15 bg-savanna/85 p-6 backdrop-blur"
          >
            <div className="[&_.field-note]:text-cream/50">
              <MonthStripMini months={kilimanjaroMonths} label="Trekking conditions by month" />
            </div>
            <p className="mt-4 text-xs text-cream/60">
              April, May and November are the rains. The routes stay open, but the rock is wet and
              summit success drops.
            </p>
          </Reveal>
        </div>

        {/* Quick facts + accommodation tiers */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal className="min-w-0 border border-cream/15 bg-savanna/85 p-7 backdrop-blur">
            <h3 className="text-2xl text-cream">Quick facts</h3>
            <dl className="mt-5 divide-y divide-cream/10">
              {kilimanjaroFacts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-sm text-cream/65">{f.label}</dt>
                  <dd className="price text-base">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={80}
            className="min-w-0 border border-cream/15 bg-savanna/85 p-7 backdrop-blur"
          >
            <h3 className="text-2xl text-cream">Where you sleep</h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[17rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-cream/15">
                    <th scope="col" className="field-note py-3 text-cream/50">
                      Tier
                    </th>
                    <th scope="col" className="field-note py-3 text-cream/50">
                      Basis
                    </th>
                    <th scope="col" className="field-note py-3 text-right text-cream/50">
                      Band
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kilimanjaroLodging.map((l) => (
                    <tr key={l.tier} className="border-b border-cream/10 last:border-0">
                      <td className="py-3 text-sm text-cream">{l.tier}</td>
                      <td className="py-3 text-xs text-cream/60">{l.basis}</td>
                      <td className="price py-3 text-right text-sm">{l.band}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/trekking" className={ctaGold}>
                Compare the routes
              </Link>
              <Link
                to="/safaris/$slug"
                params={{ slug: "machame-route-kilimanjaro" }}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm text-cream/80 hover:text-cream"
              >
                Machame in seven days <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
