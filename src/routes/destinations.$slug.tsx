import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ctaGhostDark, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { TrailLine } from "@/components/site/TrailLine";
import { destinations, getDestination } from "@/data/destinations";
import { tours } from "@/data/tours";
import { absolute, breadcrumbs, jsonLd, KEYWORDS, seo } from "@/lib/seo";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Destination not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const d = loaderData.destination;
    const path = `/destinations/${d.slug}`;
    const { meta, links } = seo({
      title: `${d.name}: When to Go and What It Costs`,
      description: d.description,
      path,
      image: d.slug === "zanzibar" ? "/og/zanzibar.jpg" : "/og/destinations.jpg",
      keywords: [
        d.name,
        `${d.name} safari`,
        `best time to visit ${d.name}`,
        ...d.highlight_tags,
        ...KEYWORDS.core,
      ],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: d.name, path },
          ]),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: d.name,
          description: d.description,
          url: absolute(path),
          touristType: ["Wildlife watchers", "Photographers", "Families"],
          includesAttraction: (d.highlight_tags ?? []).map((tag) => ({
            "@type": "TouristAttraction",
            name: tag,
          })),
          isAccessibleForFree: false,
          address: { "@type": "PostalAddress", addressCountry: "TZ" },
        }),
      ],
    };
  },
  component: DestinationDetail,
});

function DestinationDetail() {
  const { destination: d } = Route.useLoaderData();
  const related = tours.filter((t) => d.related_tour_slugs.includes(t.slug));
  const others = destinations.filter((x) => x.slug !== d.slug).slice(0, 3);

  return (
    <>
      <section className="on-dark relative isolate flex min-h-[58vh] items-end">
        <img
          src={d.hero_image}
          alt={d.name}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 photo-scrim" aria-hidden />
        <div className="container-editorial pb-14 pt-28">
          <nav
            aria-label="Breadcrumb"
            className="rise flex items-center gap-2 text-xs text-mist/60"
          >
            <Link to="/" className="hover:text-mist">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <Link to="/destinations" className="hover:text-mist">
              Destinations
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-mist/85">{d.name}</span>
          </nav>
          <p className="rise-1 field-note mt-6 text-summit">{d.region}</p>
          <h1 className="rise-2 mt-3 max-w-3xl text-4xl text-mist sm:text-5xl lg:text-7xl">
            {d.name}
          </h1>
          <TrailLine className="rise-3 mt-7 w-full max-w-md" />
        </div>
      </section>

      {/* Quick facts */}
      {d.quick_facts && (
        <section className="grain-dark border-t border-mist/10">
          <div className="container-editorial py-10">
            <dl className="grid grid-cols-2 gap-px bg-mist/10 md:grid-cols-4">
              {d.quick_facts.map((f) => (
                <div key={f.label} className="bg-savanna p-6">
                  <dt className="field-note text-mist/50">{f.label}</dt>
                  <dd className="mt-2 font-mono text-3xl text-mist">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">What it is</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{d.description}</p>
            {d.access && (
              <>
                <h3 className="mt-12 text-2xl">Getting there</h3>
                <p className="mt-4 text-muted-foreground">{d.access}</p>
              </>
            )}
            {d.wildlife && d.wildlife.length > 0 && (
              <>
                <h3 className="mt-12 text-2xl">What you are likely to see</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {d.wildlife.map((w) => (
                    <li key={w} className="border border-border px-3 py-1.5 text-sm">
                      {w}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal delay={80} className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card p-7">
              <p className="field-note text-muted-foreground">Best time to visit</p>
              <p className="mt-2 text-2xl">{d.best_time}</p>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {d.highlight_tags.map((t) => (
                  <li
                    key={t}
                    className="border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`${ctaGold} mt-7 w-full`}>
                Build a trip around this
              </Link>
              <WhatsAppLink
                className="mt-3 block bg-primary px-4 py-3 text-center text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
                message={`I'd like to include ${d.name} in a trip.`}
              >
                Ask about {d.name.split(" ")[0]}
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trips that go there */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary py-20">
          <div className="container-editorial">
            <p className="eyebrow">Itineraries</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Trips that go there</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={i * 80}>
                  <TourCard tour={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next destinations */}
      <section className="grain-dark py-16">
        <div className="container-editorial">
          <p className="eyebrow">Also on the circuit</p>
          <ul className="mt-8 grid gap-px bg-mist/10 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="bg-savanna">
                <Link
                  to="/destinations/$slug"
                  params={{ slug: o.slug }}
                  className="flex h-full flex-col p-6 transition-colors duration-300 hover:bg-savanna-deep"
                >
                  <span className="field-note text-mist/45">{o.region}</span>
                  <span className="mt-2 font-display text-xl text-mist">{o.name}</span>
                  <span className="mt-3 text-xs text-mist/55">{o.best_time}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/destinations" className={ctaGhostDark}>
              All destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
