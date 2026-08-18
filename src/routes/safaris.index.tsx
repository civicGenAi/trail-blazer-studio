import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StatStrip } from "@/components/site/Section";
import { TourCard } from "@/components/site/TourCard";
import { browseByType } from "@/components/site/nav-data";
import { tours } from "@/data/tours";

type Search = { type?: string };

export const Route = createFileRoute("/safaris/")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["type"] === "string" ? { type: search["type"] } : {},
  head: () => ({
    meta: [
      { title: "Safari tours in Tanzania — Arusha Wildlife Safaris" },
      {
        name: "description",
        content:
          "Filter 6 safari itineraries by type, destination, duration and price. Park fees, full board and a private 4WD included.",
      },
      { property: "og:title", content: "Safari tours in Tanzania" },
      {
        property: "og:description",
        content: "Six itineraries from 4 to 10 days, from USD 2,150 per person.",
      },
    ],
  }),
  component: SafarisIndex,
});

const durations = ["Any", "1–5 days", "6–8 days", "9+ days"] as const;
const prices = ["Any", "Under $2,500", "$2,500–3,500", "Over $3,500"] as const;
const difficulties = ["Any", "Easy", "Moderate", "Challenging"] as const;
const sorts = ["Popularity", "Price: low to high", "Price: high to low", "Duration"] as const;

function SafarisIndex() {
  const { type } = Route.useSearch();
  const [activeType, setActiveType] = useState<string>(type ?? "Any");
  const [destination, setDestination] = useState("Any");
  const [duration, setDuration] = useState<string>("Any");
  const [price, setPrice] = useState<string>("Any");
  const [difficulty, setDifficulty] = useState<string>("Any");
  const [sort, setSort] = useState<string>("Popularity");

  const destinationOptions = useMemo(
    () => ["Any", ...Array.from(new Set(tours.map((t) => t.destination)))],
    [],
  );

  const filtered = useMemo(() => {
    const list = tours.filter((t) => {
      if (activeType !== "Any" && t.type !== activeType) return false;
      if (destination !== "Any" && t.destination !== destination) return false;
      if (difficulty !== "Any" && t.difficulty !== difficulty) return false;
      if (duration === "1–5 days" && t.duration_days > 5) return false;
      if (duration === "6–8 days" && (t.duration_days < 6 || t.duration_days > 8)) return false;
      if (duration === "9+ days" && t.duration_days < 9) return false;
      if (price === "Under $2,500" && t.price_from_usd >= 2500) return false;
      if (price === "$2,500–3,500" && (t.price_from_usd < 2500 || t.price_from_usd > 3500)) return false;
      if (price === "Over $3,500" && t.price_from_usd <= 3500) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price_from_usd - b.price_from_usd);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price_from_usd - a.price_from_usd);
    if (sort === "Duration") sorted.sort((a, b) => a.duration_days - b.duration_days);
    if (sort === "Popularity") sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [activeType, destination, duration, price, difficulty, sort]);

  const days = tours.map((t) => t.duration_days);
  const priceValues = tours.map((t) => t.price_from_usd);

  return (
    <>
      <section className="grain-dark pb-16 pt-14">
        <div className="container-editorial">
          <p className="eyebrow">Safari tours</p>
          <h1 className="mt-4 max-w-3xl text-5xl md:text-6xl">
            Six itineraries, run with our own vehicles and guides
          </h1>
          <div className="mt-10">
            <StatStrip
              dark
              stats={[
                { value: String(tours.length), label: "Itineraries" },
                { value: `${Math.min(...days)}–${Math.max(...days)}`, label: "Days" },
                {
                  value: `$${Math.min(...priceValues).toLocaleString()}–${Math.max(...priceValues).toLocaleString()}`,
                  label: "Price from, per person",
                },
                { value: "4.8", label: "Average rating" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-6">
        <div className="container-editorial flex flex-wrap items-end gap-4">
          <Field label="Type">
            <select value={activeType} onChange={(e) => setActiveType(e.target.value)} className="select-field">
              {["Any", ...browseByType].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Destination">
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="select-field">
              {destinationOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Duration">
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="select-field">
              {durations.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Price">
            <select value={price} onChange={(e) => setPrice(e.target.value)} className="select-field">
              {prices.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="select-field">
              {difficulties.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Sort by">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-field">
              {sorts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="py-14">
        <div className="container-editorial">
          <p className="field-note text-muted-foreground">
            Showing {filtered.length} of {tours.length}
          </p>
          {filtered.length === 0 ? (
            <div className="mt-8 border border-border p-10">
              <p>No itineraries match these filters.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Widen the price or duration filter, or ask us to build a custom route.
              </p>
              <Link to="/contact" className="mt-5 inline-block bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                Ask for a custom trip
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="field-note text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
