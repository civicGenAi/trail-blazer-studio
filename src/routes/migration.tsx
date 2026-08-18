import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AccordionRow } from "@/components/site/Accordion";
import { StatStrip } from "@/components/site/Section";
import { TourCard } from "@/components/site/TourCard";
import { WHATSAPP_URL } from "@/components/site/nav-data";
import { migrationFaq, migrationMonths, migrationStats } from "@/data/migration";
import { images, tours } from "@/data/tours";
import { breadcrumbs, faqSchema, jsonLd, KEYWORDS, seo } from "@/lib/seo";

export const Route = createFileRoute("/migration")({
  head: () => {
    const { meta, links } = seo({
      title: "Great Migration Month by Month",
      description:
        "Where the 1.5 million wildebeest are each month, when the Mara River crossings happen, and which Tanzania itineraries reach them. From our own trip logs.",
      path: "/migration",
      image: "/og/migration.jpg",
      keywords: [...KEYWORDS.migration, ...KEYWORDS.core],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "The Great Migration", path: "/migration" },
          ]),
        ),
        jsonLd(faqSchema(migrationFaq)),
      ],
    };
  },
  component: MigrationPage,
});

const phaseColor: Record<string, string> = {
  Calving: "text-primary",
  "On the move": "text-muted-foreground",
  "River crossings": "text-gold",
  "Peak crossings": "text-gold",
};

function MigrationPage() {
  const currentMonth = new Date().getMonth();
  const current = migrationMonths[currentMonth]!;
  const migrationTours = tours.filter((t) => t.type === "Migration" || t.type === "Photography");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate">
        <img
          src={images.migrationCrossing}
          alt="Wildebeest crossing the Mara River"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-savanna/75" />
        <div className="container-editorial py-28 md:py-36">
          <span className="rise field-note inline-flex items-center gap-2 border border-gold/60 px-3 py-1.5 text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {current.month} status: {current.phase} · {current.region}
          </span>
          <h1 className="rise-1 mt-6 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-7xl">
            The migration is a <em className="font-normal italic">loop</em>, not a season
          </h1>
          <p className="rise-2 mt-5 max-w-xl text-cream/75">
            1.5 million wildebeest and 300,000 zebra move through the Serengeti–Mara ecosystem
            year-round. Where they are decides where you should sleep.
          </p>
          <div className="rise-3 mt-8 flex flex-wrap gap-3">
            <Link
              to="/safaris"
              search={{ type: "Migration" }}
              className="border border-gold px-5 py-3 text-sm text-gold transition-colors duration-300 hover:bg-gold/10"
            >
              View Packages
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-cream/40 px-5 py-3 text-sm text-cream transition-colors duration-300 hover:border-cream"
            >
              Ask Us
            </a>
          </div>
        </div>
      </section>

      <section className="grain-dark py-2">
        <div className="container-editorial py-10">
          <StatStrip dark stats={migrationStats} />
        </div>
      </section>

      {/* Loop explainer */}
      <section className="py-16">
        <div className="container-editorial grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <h2 className="text-4xl md:text-5xl">Why it never stops</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Rain determines everything. Short grass on the southern plains holds the most
              nutrients, so the herds calve there in February. As those plains dry out, the animals
              move north-west toward permanent water.
            </p>
            <p>
              By July the only reliable water left is the Mara River, which is why the crossings
              happen when they do. When the short rains return in November the herds walk south
              again. It is one continuous circuit of about 800 km, not a one-way journey.
            </p>
          </div>
        </div>
      </section>

      {/* Month strip */}
      <MonthStrip currentMonth={currentMonth} />

      {/* Migration tours */}
      <section className="py-16">
        <div className="container-editorial">
          <p className="eyebrow">Trips that reach the herds</p>
          <h2 className="mt-4 text-4xl">Migration itineraries</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {migrationTours.map((t) => (
              <TourCard key={t.slug} tour={t} showItineraryPreview />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary py-16">
        <div className="container-editorial max-w-3xl">
          <h2 className="text-4xl">Migration questions</h2>
          <div className="mt-8 border-t border-border">
            {migrationFaq.map((f) => (
              <AccordionRow key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grain-dark py-20">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Booking window</p>
            <h2 className="mt-4 text-4xl text-cream md:text-5xl">
              Kogatende camps for August sell out 9–12 months ahead
            </h2>
            <p className="mt-4 max-w-xl text-cream/70">
              There are roughly 40 camps within reach of the crossing points. Send dates and group
              size and we will tell you what is still open.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="border border-gold px-5 py-3 text-sm text-gold hover:bg-gold/10"
            >
              Check availability
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-cream/40 px-5 py-3 text-sm text-cream hover:border-cream"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MonthStrip({ currentMonth }: { currentMonth: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // The trail line extends as the strip crosses the viewport. It is the one piece of
  // scroll-driven motion on this page.
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height + window.innerHeight * 0.5;
      const p = (window.innerHeight * 0.85 - rect.top) / span;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="border-y border-border bg-background py-16 md:py-20">
      <div className="container-editorial">
        <p className="eyebrow">Month by month</p>
        <h2 className="mt-4 text-3xl md:text-4xl">Where the herds are</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          One line per month: the phase, the region, and what is actually happening on the ground.
        </p>

        <div ref={ref} className="relative mt-10">
          {/* Vertical trail down the markers on narrow screens */}
          <div
            className="trail-dotted-y absolute left-[1.06rem] top-4 md:hidden"
            style={{ height: `${progress * 100}%`, backgroundSize: "100% 100%" }}
            aria-hidden
          />
          {/* Horizontal trail through the marker row once all twelve fit on one line */}
          <div
            className="trail-dotted-x absolute left-0 top-[1.06rem] hidden xl:block"
            style={{ width: `${progress * 100}%`, backgroundSize: "100% 100%" }}
            aria-hidden
          />

          <ol className="grid gap-6 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-12 xl:gap-x-3">
            {migrationMonths.map((m) => {
              const isNow = m.index === currentMonth;
              return (
                <li key={m.month} className="relative flex gap-4 xl:block">
                  <span
                    className={`field-note z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      isNow
                        ? "border-gold bg-gold text-savanna"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {m.month.slice(0, 1)}
                  </span>
                  <div className="min-w-0 xl:mt-5">
                    <p className="font-mono text-sm">{m.month}</p>
                    <p className={`field-note mt-1 ${phaseColor[m.phase] ?? ""}`}>{m.phase}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{m.region}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
                      {m.line}
                    </p>
                    {isNow && (
                      <p className="field-note mt-2.5 inline-block border border-gold/50 px-2 py-1 text-gold">
                        You are here
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
