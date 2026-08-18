import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useMemo } from "react";
import { Reveal } from "@/components/site/Reveal";
import { StatStrip } from "@/components/site/Section";
import { TourCard } from "@/components/site/TourCard";
import { TrailLine } from "@/components/site/TrailLine";
import { browseByType } from "@/components/site/nav-data";
import { tours } from "@/data/tours";

const ANY = "Any";
const durations = [ANY, "1–5 days", "6–8 days", "9+ days"] as const;
const prices = [ANY, "Under $2,500", "$2,500–3,500", "Over $3,500"] as const;
const difficulties = [ANY, "Easy", "Moderate", "Challenging"] as const;
const sorts = ["Popularity", "Price: low to high", "Price: high to low", "Duration"] as const;

/**
 * Every filter lives in the URL, so a link from the nav mega-menu, the footer or
 * a shared link all land on the same filtered grid — and the back button works.
 */
type Search = {
  type?: string;
  destination?: string;
  duration?: string;
  price?: string;
  difficulty?: string;
  sort?: string;
};

const str = (v: unknown) => (typeof v === "string" && v !== ANY ? v : undefined);

export const Route = createFileRoute("/safaris/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    if (str(search["type"])) out.type = search["type"] as string;
    if (str(search["destination"])) out.destination = search["destination"] as string;
    if (str(search["duration"])) out.duration = search["duration"] as string;
    if (str(search["price"])) out.price = search["price"] as string;
    if (str(search["difficulty"])) out.difficulty = search["difficulty"] as string;
    if (str(search["sort"])) out.sort = search["sort"] as string;
    return out;
  },
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

function SafarisIndex() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const activeType = search.type ?? ANY;
  const destination = search.destination ?? ANY;
  const duration = search.duration ?? ANY;
  const price = search.price ?? ANY;
  const difficulty = search.difficulty ?? ANY;
  const sort = search.sort ?? sorts[0];

  const set = (key: keyof Search) => (value: string) => {
    void navigate({
      search: (prev: Search) => ({ ...prev, [key]: value === ANY ? undefined : value }),
      replace: true,
    });
  };

  const destinationOptions = useMemo(
    () => [ANY, ...Array.from(new Set(tours.map((t) => t.destination)))],
    [],
  );

  const filtered = useMemo(() => {
    const list = tours.filter((t) => {
      if (activeType !== ANY && t.type !== activeType) return false;
      if (destination !== ANY && t.destination !== destination) return false;
      if (difficulty !== ANY && t.difficulty !== difficulty) return false;
      if (duration === "1–5 days" && t.duration_days > 5) return false;
      if (duration === "6–8 days" && (t.duration_days < 6 || t.duration_days > 8)) return false;
      if (duration === "9+ days" && t.duration_days < 9) return false;
      if (price === "Under $2,500" && t.price_from_usd >= 2500) return false;
      if (price === "$2,500–3,500" && (t.price_from_usd < 2500 || t.price_from_usd > 3500))
        return false;
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

  const active = (
    [
      ["type", activeType],
      ["destination", destination],
      ["duration", duration],
      ["price", price],
      ["difficulty", difficulty],
    ] as [keyof Search, string][]
  ).filter(([, v]) => v !== ANY);

  const days = tours.map((t) => t.duration_days);
  const priceValues = tours.map((t) => t.price_from_usd);
  const averageRating =
    Math.round((tours.reduce((n, t) => n + t.rating, 0) / tours.length) * 10) / 10;

  return (
    <>
      <section className="grain-dark pb-14 pt-14">
        <div className="container-editorial">
          <p className="eyebrow">Safari tours</p>
          <TrailLine className="mt-4 w-full max-w-xs" />
          <h1 className="mt-6 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            Six itineraries, run with our own vehicles and guides
          </h1>
          <p className="mt-5 max-w-xl text-cream/70">
            Private departures only, maximum six guests per vehicle. Park fees, full board and the
            4WD are in every price below.
          </p>
          <div className="mt-10">
            <StatStrip
              dark
              stats={[
                { value: String(tours.length), label: "Itineraries" },
                { value: `${Math.min(...days)}–${Math.max(...days)}`, label: "Days" },
                {
                  value: `$${(Math.min(...priceValues) / 1000).toFixed(2)}k–${(Math.max(...priceValues) / 1000).toFixed(2)}k`,
                  label: "Price from, per person",
                },
                { value: averageRating.toFixed(1), label: "Average rating" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sticky top-[4.5rem] z-30 border-b border-border bg-secondary/95 py-5 backdrop-blur">
        <div className="container-editorial">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Field
              label="Type"
              value={activeType}
              onChange={set("type")}
              options={[ANY, ...browseByType]}
            />
            <Field
              label="Destination"
              value={destination}
              onChange={set("destination")}
              options={destinationOptions}
            />
            <Field
              label="Duration"
              value={duration}
              onChange={set("duration")}
              options={[...durations]}
            />
            <Field label="Price" value={price} onChange={set("price")} options={[...prices]} />
            <Field
              label="Difficulty"
              value={difficulty}
              onChange={set("difficulty")}
              options={[...difficulties]}
            />
            <Field label="Sort by" value={sort} onChange={set("sort")} options={[...sorts]} />
          </div>

          {active.length > 0 && (
            <ul className="mt-4 flex flex-wrap items-center gap-2">
              {active.map(([key, value]) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => set(key)(ANY)}
                    className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs transition-colors duration-300 hover:border-gold"
                  >
                    {value}
                    <X className="h-3 w-3 text-muted-foreground" aria-hidden />
                    <span className="sr-only">Remove {key} filter</span>
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/safaris"
                  search={{}}
                  replace
                  className="ml-1 text-xs text-primary link-underline"
                >
                  Clear all
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>

      <section className="py-14">
        <div className="container-editorial">
          <p className="field-note text-muted-foreground">
            Showing {filtered.length} of {tours.length}
          </p>
          {filtered.length === 0 ? (
            <div className="mt-8 border border-border p-10">
              <p className="text-lg">No itineraries match these filters.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Widen the price or duration filter, or ask us to build a custom route.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/safaris"
                  search={{}}
                  replace
                  className="border border-border px-4 py-2.5 text-sm transition-colors duration-300 hover:border-primary"
                >
                  Clear filters
                </Link>
                <Link
                  to="/contact"
                  className="bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
                >
                  Ask for a custom trip
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 3) * 70}>
                  <TourCard tour={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="field-note text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-field w-full truncate"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
