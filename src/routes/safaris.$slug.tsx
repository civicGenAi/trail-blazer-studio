import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Star, Check, X, MapPin, Clock, Users, Utensils } from "lucide-react";
import { useState } from "react";
import { TrailLine, TrailNode } from "@/components/site/TrailLine";
import { WHATSAPP_URL } from "@/components/site/nav-data";
import { TourCard } from "@/components/site/TourCard";
import { getTour, tours } from "@/data/tours";

export const Route = createFileRoute("/safaris/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Safari not found" }, { name: "robots", content: "noindex" }] };
    }
    const t = loaderData.tour;
    const title = `${t.title} — ${t.duration_days} days from $${t.price_from_usd.toLocaleString()}`;
    return {
      meta: [
        { title },
        { name: "description", content: t.teaser },
        { property: "og:title", content: title },
        { property: "og:description", content: t.teaser },
      ],
    };
  },
  component: TourDetail,
});

function TourDetail() {
  const { tour } = Route.useLoaderData();
  const [shot, setShot] = useState(0);
  const [activeDay, setActiveDay] = useState(1);
  const day = tour.itinerary.find((d) => d.day_number === activeDay) ?? tour.itinerary[0]!;
  const related = tours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <>
      {/* Gallery */}
      <section className="bg-savanna">
        <div className="relative">
          <img
            src={tour.gallery[shot] ?? tour.hero_image}
            alt={`${tour.title} — photograph ${shot + 1} of ${tour.gallery.length}`}
            className="h-[52vh] w-full object-cover md:h-[64vh]"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 photo-scrim"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
            <div className="flex gap-2 overflow-x-auto">
              {tour.gallery.map((g, i) => (
                <button
                  key={g + i}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`Show photo ${i + 1} of ${tour.gallery.length}`}
                  aria-current={i === shot}
                  className={`h-14 w-20 shrink-0 overflow-hidden border-2 transition-colors duration-300 ${
                    i === shot ? "border-gold" : "border-cream/30 hover:border-cream/70"
                  }`}
                >
                  <img
                    src={g}
                    alt=""
                    className="h-full w-full object-cover"
                    width={200}
                    height={140}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            <p className="field-note shrink-0 text-cream/70">
              {String(shot + 1).padStart(2, "0")} / {String(tour.gallery.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb + title strip */}
      <section className="grain-dark py-10">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-cream/50">
            <Link to="/" className="hover:text-cream">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/safaris" className="hover:text-cream">
              Safaris
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cream/80">{tour.title}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl text-3xl sm:text-4xl lg:text-6xl">{tour.title}</h1>
          <p className="field-note mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-cream/60">
            <span>{tour.type}</span>
            <span>{tour.destination}</span>
            <span>{tour.difficulty}</span>
            <span className="flex items-center gap-1.5 text-gold">
              <Star className="h-3.5 w-3.5" aria-hidden /> {tour.rating.toFixed(1)} / {tour.reviews}{" "}
              reviews
            </span>
          </p>
          <TrailLine className="mt-8 w-full" />
          <dl className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-5">
            <Fact
              icon={<Clock className="h-4 w-4" />}
              label="Duration"
              value={`${tour.duration_days}d / ${tour.duration_nights}n`}
            />
            <Fact icon={<MapPin className="h-4 w-4" />} label="Starts" value="Arusha" />
            <Fact
              icon={<Users className="h-4 w-4" />}
              label="Max group"
              value={`${tour.max_pax}`}
            />
            <Fact icon={<Utensils className="h-4 w-4" />} label="Meals" value={tour.meal_plan} />
            <Fact icon={<MapPin className="h-4 w-4" />} label="Vehicle" value={tour.vehicle_type} />
          </dl>
        </div>
      </section>

      <div className="container-editorial grid gap-12 py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-3xl">About this route</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{tour.about_text}</p>

          <h2 className="mt-14 text-3xl">Highlights</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {tour.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-l-2 border-gold pl-4 text-sm">
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl">Included</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {tour.included.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl">Not included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {tour.not_included.map((i) => (
                  <li key={i} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Itinerary */}
          <h2 className="mt-16 text-3xl">Day by day</h2>
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Itinerary days">
            {tour.itinerary.map((d) => (
              <button
                key={d.day_number}
                type="button"
                role="tab"
                aria-selected={activeDay === d.day_number}
                onClick={() => setActiveDay(d.day_number)}
                className={`field-note border px-3 py-2 transition-colors duration-300 ${
                  activeDay === d.day_number
                    ? "border-gold text-gold"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                Day {String(d.day_number).padStart(2, "0")}
              </button>
            ))}
          </div>

          <article className="mt-6 flex gap-5 border border-border bg-card p-6">
            <TrailNode label={String(day.day_number).padStart(2, "0")} />
            <div className="min-w-0">
              <h3 className="text-2xl">{day.title}</h3>
              <p className="field-note mt-3 text-muted-foreground">
                {day.route_from} → {day.route_to}
                {day.distance_km > 0 && <> · {day.distance_km} km</>} · {day.drive_time}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{day.narrative_text}</p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="field-note text-muted-foreground">Lodge</dt>
                  <dd className="mt-1 text-sm">{day.lodge_name}</dd>
                </div>
                <div>
                  <dt className="field-note text-muted-foreground">Meals</dt>
                  <dd className="mt-1 font-mono text-sm">{day.meals_included}</dd>
                </div>
                <div>
                  <dt className="field-note text-muted-foreground">Activities</dt>
                  <dd className="mt-1 text-sm">{day.activities.join(", ") || "—"}</dd>
                </div>
              </dl>
              {day.notes.length > 0 && (
                <ul className="mt-5 space-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
                  {day.notes.map((n) => (
                    <li key={n}>Note: {n}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border bg-card p-6">
            <p className="field-note text-muted-foreground">From, per person sharing</p>
            <p className="price mt-1 text-4xl">${tour.price_from_usd.toLocaleString()}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {tour.duration_days} days · park fees and full board included
            </p>
            <Link
              to="/contact"
              className="mt-6 block border border-gold px-4 py-3 text-center text-sm text-gold transition-colors duration-300 hover:bg-gold/10"
            >
              Book This Safari
            </Link>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`I'd like to ask about ${tour.title}`)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block bg-primary px-4 py-3 text-center text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
            >
              WhatsApp the guide
            </a>
            <Link
              to="/contact"
              className="mt-3 block border border-border px-4 py-3 text-center text-sm transition-colors duration-300 hover:border-primary"
            >
              Ask a Question
            </Link>
            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <li>No payment taken until the itinerary is confirmed</li>
              <li>Free date changes up to 45 days out</li>
              <li>Licensed Tanzanian operator, own vehicles</li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="border-t border-border bg-secondary py-16">
        <div className="container-editorial">
          <h2 className="text-3xl">You might also like</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="field-note flex items-center gap-2 text-cream/50">
        <span className="text-gold">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-cream">{value}</dd>
    </div>
  );
}
