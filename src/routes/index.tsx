import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, StatStrip } from "@/components/site/Section";
import { TourCard } from "@/components/site/TourCard";
import { TrailLine } from "@/components/site/TrailLine";
import { ctaGhostDark, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { browseByType } from "@/components/site/nav-data";
import { migrationMonths, migrationStats } from "@/data/migration";
import { testimonials, trustPoints, whyUs } from "@/data/site";
import { images, tours } from "@/data/tours";
import { itemListSchema, jsonLd, SITE_URL } from "@/lib/seo";

// The root route supplies this page's title, description and social card, since
// they double as the site-wide defaults. Only the canonical is declared here,
// because the root cannot declare one without duplicating it on every page.
export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      jsonLd(
        itemListSchema(
          "Featured Tanzania safari itineraries",
          tours.filter((t) => t.featured).map((t) => `/safaris/${t.slug}`),
        ),
      ),
    ],
  }),
  component: Index,
});

function Index() {
  const featured = tours.filter((t) => t.featured).slice(0, 3);
  const currentMonth = new Date().getMonth();
  const current = migrationMonths[currentMonth]!;
  const priceFloor = Math.min(...tours.map((t) => t.price_from_usd));

  return (
    <>
      <Hero priceFloor={priceFloor} />

      {/* Trust bar */}
      <section className="grain-dark border-t border-cream/10">
        <div className="container-editorial py-10">
          <StatStrip dark stats={trustPoints} />
        </div>
      </section>

      {/* Featured safaris, on the offset editorial grid */}
      <section className="py-20 md:py-28">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="Featured safaris"
              title={
                <>
                  Three routes we run <em className="font-normal italic">most often</em>
                </>
              }
              intro="Every itinerary below is priced with park fees, full board and a private 4WD included. Dates are private departures, not shared groups."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((t, i) => (
              <Reveal key={t.slug} delay={i * 90}>
                <TourCard tour={t} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              to="/safaris"
              className="inline-flex items-center gap-2 text-sm text-primary link-underline"
            >
              View all {tours.length} safari tours <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Browse by type */}
      <section className="border-y border-border bg-secondary py-16">
        <div className="container-editorial">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Browse by type</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Start from what you want to do</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Filters carry through to the safari list, so a pill here lands on the same filtered
              grid.
            </p>
          </Reveal>
          <Reveal className="mt-8" delay={80}>
            <ul className="flex flex-wrap gap-2.5">
              {browseByType.map((t) => (
                <li key={t}>
                  <Link
                    to="/safaris"
                    search={{ type: t }}
                    className="inline-block border border-border bg-background px-4 py-2.5 text-sm transition-colors duration-300 hover:border-gold"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why us, asymmetric two-column */}
      <section className="py-20 md:py-28">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Why book with us</p>
            <TrailLine className="mt-3 w-24" />
            <h2 className="mt-5 text-4xl md:text-5xl">
              Four things that
              <br />
              <em className="font-normal italic">change the trip</em>
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              None of these are about scenery. They are the operational decisions that decide
              whether a route works.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm text-primary link-underline"
            >
              How we operate <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <ol className="grid gap-px bg-border sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} as="li" delay={i * 70} className="bg-background p-7">
                <span className="field-note text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Migration teaser, full-bleed photograph breaking the container */}
      <section className="relative isolate grain-dark py-24 md:py-32">
        <img
          src={images.migrationCrossing}
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
            <p className="eyebrow">The Great Migration</p>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl lg:text-6xl">
              Right now the herds are at <em className="font-normal italic">{current.region}</em>
            </h2>
            <p className="mt-5 max-w-xl text-cream/75">
              {current.line} The migration is a continuous 800 km loop through the Serengeti–Mara
              ecosystem, so the useful question is not when to go but where to sleep in the month
              you can travel.
            </p>
            <div className="mt-9">
              <StatStrip dark stats={migrationStats.slice(0, 4)} />
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/migration" className={ctaGold}>
                See the month-by-month map
              </Link>
              <Link to="/safaris" search={{ type: "Migration" }} className={ctaGhostDark}>
                Migration itineraries
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="From recent trips"
              title="What guests said afterwards"
              intro="Collected after return, and reproduced with the trip and month attached so you can judge the context."
            />
          </Reveal>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                as="article"
                delay={i * 90}
                className="flex flex-col bg-background p-8"
              >
                <Quote className="h-6 w-6 text-gold" aria-hidden />
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 border-t border-border pt-5">
                  <p className="text-sm">{t.name}</p>
                  <p className="field-note mt-1.5 text-muted-foreground">{t.detail}</p>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grain-dark py-20 md:py-24">
        <div className="container-editorial grid gap-10 md:grid-cols-[1.25fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Next step</p>
            <TrailLine className="mt-3 w-24" />
            <h2 className="mt-5 text-4xl text-cream md:text-5xl">
              Send dates and group size. We reply within one working day.
            </h2>
            <p className="mt-5 max-w-xl text-cream/70">
              You get a day-by-day draft with named lodges, drive times and an itemised price. Two
              rounds of changes are included, and nothing is payable until you confirm.
            </p>
          </Reveal>
          <Reveal delay={90} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className={ctaGold}>
              Plan my safari
            </Link>
            <WhatsAppLink className={ctaGhostDark} message="Hello, I'd like to plan a safari.">
              WhatsApp us
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Hero({ priceFloor }: { priceFloor: number }) {
  return (
    <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
      <img
        src={images.heroSavanna}
        alt="Acacia and open grassland on the Serengeti plains at first light"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1920}
        height={1280}
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 photo-scrim" aria-hidden />

      <div className="container-editorial pb-16 pt-32 md:pb-24 md:pt-40">
        <p className="rise eyebrow">Arusha, Tanzania · Est. 2014</p>

        {/* The trail line draws in on load, like a compass bearing */}
        <div className="rise-1 mt-5 max-w-md">
          <TrailLine className="w-full" />
        </div>

        <h1 className="rise-2 mt-7 max-w-4xl text-5xl text-cream sm:text-6xl lg:text-8xl">
          Explore Tanzania.
          <br />
          <em className="font-normal italic">Experience</em> the wild.
        </h1>

        <p className="rise-3 mt-7 max-w-xl text-lg text-cream/80">
          Northern-circuit safaris, Great Migration trips and Kilimanjaro routes, run from Arusha
          with our own vehicles and salaried guides. From ${priceFloor.toLocaleString()} per person.
        </p>

        <div className="rise-4 mt-10 flex flex-wrap gap-3">
          <Link to="/safaris" className={ctaGold}>
            Browse safaris
          </Link>
          <Link to="/migration" className={ctaGhostDark}>
            Where the herds are now
          </Link>
        </div>

        <dl className="rise-5 mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-cream/15 pt-7 sm:grid-cols-4">
          {[
            { k: "Parks", v: "6" },
            { k: "Itineraries", v: String(tours.length) },
            { k: "Max per vehicle", v: "6" },
            { k: "Reply time", v: "1 day" },
          ].map((s) => (
            <div key={s.k}>
              <dt className="field-note text-cream/50">{s.k}</dt>
              <dd className="mt-1.5 font-mono text-2xl text-cream">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
