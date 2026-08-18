import { Plane, MapPin } from "lucide-react";
import { useState } from "react";
import { airports, destinations, originPin } from "@/data/destinations";

/**
 * Schematic map of the northern circuit. Deliberately a diagram rather than a
 * tile map: what a visitor needs before choosing a route is relative position,
 * the two airports, and the order the parks come in.
 *
 * The read-out sits below the frame rather than over it, so nothing covers a
 * marker at small widths.
 */
export function DestinationMap({ onSelect }: { onSelect?: (slug: string) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = destinations.find((d) => d.slug === active);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full border border-cream/15 bg-savanna-deep sm:aspect-[16/10]">
        <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" role="presentation">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--canopy)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--canopy)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d="M6 26 L16 10 L44 5 L66 10 L90 20 L96 44 L78 58 L36 61 L12 46 Z"
            fill="url(#land)"
            stroke="var(--cream)"
            strokeOpacity="0.12"
            strokeWidth="0.4"
          />
          {/* The Trail Line, in route order: Arusha → Tarangire → Ngorongoro → Ndutu → Serengeti */}
          <polyline
            points="66,41.25 55,47.5 40,37.5 28,30 20,16.25"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="0.5"
            strokeDasharray="1.4 1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Arusha, where every route starts */}
        <span
          style={{ left: `${originPin.pin.x}%`, top: `${originPin.pin.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="block h-2 w-2 rounded-full bg-cream" aria-hidden />
          <span className="field-note absolute left-1/2 top-full mt-1.5 hidden -translate-x-1/2 whitespace-nowrap text-[0.55rem] text-cream/60 sm:block">
            {originPin.name}
          </span>
        </span>

        {destinations.map((d) => {
          const edge = d.pin.x > 78 ? "right" : d.pin.x < 18 ? "left" : "center";
          return (
            <button
              key={d.slug}
              type="button"
              onMouseEnter={() => setActive(d.slug)}
              onMouseLeave={() => setActive((a) => (a === d.slug ? null : a))}
              onFocus={() => setActive(d.slug)}
              onClick={() => onSelect?.(d.slug)}
              style={{ left: `${d.pin.x}%`, top: `${d.pin.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
              aria-label={`${d.name}, ${d.region}`}
            >
              <span
                className={`block h-3 w-3 rotate-45 border transition-colors duration-300 ${
                  active === d.slug
                    ? "border-gold bg-gold"
                    : "border-cream/70 bg-savanna group-hover:border-gold"
                }`}
              />
              <span
                className={`field-note absolute top-full mt-1 hidden whitespace-nowrap text-[0.55rem] transition-colors duration-300 sm:block ${
                  active === d.slug ? "text-gold" : "text-cream/60"
                } ${
                  edge === "right"
                    ? "right-1"
                    : edge === "left"
                      ? "left-1"
                      : "left-1/2 -translate-x-1/2"
                }`}
              >
                {d.short}
              </span>
            </button>
          );
        })}

        {airports.map((a) => (
          <span
            key={a.name}
            style={{ left: `${a.pin.x}%`, top: `${a.pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            title={a.name}
          >
            <Plane className="h-3.5 w-3.5 text-cream/50" aria-hidden />
            <span className="field-note absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 text-[0.5rem] text-cream/40 sm:block">
              {a.short}
            </span>
            <span className="sr-only">{a.name}</span>
          </span>
        ))}
      </div>

      {/* Read-out, below the frame so it never covers a marker */}
      <div
        className="mt-px flex min-h-[4.75rem] items-start gap-2.5 border border-t-0 border-cream/15 bg-savanna p-4"
        aria-live="polite"
      >
        {shown ? (
          <>
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
            <span>
              <span className="field-note block text-gold">{shown.region}</span>
              <span className="mt-1.5 block text-sm text-cream">{shown.name}</span>
              <span className="mt-1 block text-xs text-cream/60">
                Best time · {shown.best_time}
              </span>
            </span>
          </>
        ) : (
          <>
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
            <span className="text-xs text-cream/60">
              Six parks, two airports and Arusha, drawn in route order rather than to scale. Hover
              or focus a marker for the season; select one to jump to its card.
            </span>
          </>
        )}
      </div>
    </div>
  );
}
