import { Link } from "@tanstack/react-router";
import { Star, Users, Utensils, Truck } from "lucide-react";
import type { Tour } from "@/data/types";
import { WHATSAPP_URL } from "./nav-data";

export function TourCard({ tour, showItineraryPreview = false }: { tour: Tour; showItineraryPreview?: boolean }) {
  return (
    <article className="group card-slow flex flex-col border border-border bg-card">
      <div className="relative overflow-hidden">
        <img
          src={tour.hero_image}
          alt={tour.title}
          className="img-zoom-slow h-56 w-full object-cover"
          width={1200}
          height={900}
          loading="lazy"
        />
        <span className="absolute left-0 top-4 flex items-center gap-1.5 border-y border-r border-gold/50 bg-savanna/90 px-3 py-1.5 text-xs text-cream">
          <Star className="h-3.5 w-3.5 text-gold" aria-hidden />
          <span className="font-mono">{tour.rating.toFixed(1)}</span>
          <span className="text-cream/50">({tour.reviews})</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="field-note text-muted-foreground">
          {tour.duration_days} days · {tour.type} · {tour.destination} · {tour.difficulty}
        </p>
        <h3 className="mt-3 text-2xl">
          <Link to="/safaris/$slug" params={{ slug: tour.slug }} className="hover:text-primary">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{tour.teaser}</p>

        <ul className="mt-4 space-y-1.5 text-sm">
          {tour.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2 h-1 w-3 shrink-0 bg-gold" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {showItineraryPreview && (
          <div className="mt-5 border-t border-border pt-4">
            <p className="field-note text-muted-foreground">Day-by-day preview</p>
            <ol className="mt-2 space-y-1 text-sm">
              {tour.itinerary.slice(0, 4).map((d) => (
                <li key={d.day_number} className="flex gap-3">
                  <span className="price text-xs">{String(d.day_number).padStart(2, "0")}</span>
                  <span className="text-muted-foreground">{d.title}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1.5 text-xs" title={tour.meal_plan}>
            <Utensils className="h-4 w-4" aria-hidden /> {tour.meal_plan}
          </span>
          <span className="flex items-center gap-1.5 text-xs" title={tour.vehicle_type}>
            <Truck className="h-4 w-4" aria-hidden /> 4WD
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Users className="h-4 w-4" aria-hidden /> max {tour.max_pax}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
          <p>
            <span className="field-note block text-muted-foreground">From, per person</span>
            <span className="price text-xl">${tour.price_from_usd.toLocaleString()}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Question about ${tour.title}`)}`}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-3 py-2 text-xs text-foreground transition-colors duration-300 hover:border-primary"
            >
              WhatsApp
            </a>
            <Link
              to="/safaris/$slug"
              params={{ slug: tour.slug }}
              className="bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
