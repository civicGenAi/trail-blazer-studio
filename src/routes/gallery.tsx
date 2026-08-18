import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ctaGhostDark, ctaGold } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { TrailLine } from "@/components/site/TrailLine";
import { galleryCategories, galleryItems } from "@/data/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — northern Tanzania, month and place noted" },
      {
        name: "description",
        content:
          "Photographs from our own departures, each captioned with where it was taken and in which month.",
      },
      { property: "og:title", content: "Gallery" },
      {
        property: "og:description",
        content:
          "Serengeti, Ngorongoro, Tarangire, Kilimanjaro and Zanzibar, with place and month on every frame.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shown = galleryItems.filter((g) => filter === "All" || g.category === filter);
  const open = lightbox === null ? null : shown[lightbox];

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % shown.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown.length]);

  return (
    <>
      <section className="grain-dark py-16">
        <div className="container-editorial">
          <p className="rise eyebrow">Gallery</p>
          <TrailLine className="rise-1 mt-4 w-full max-w-xs" />
          <h1 className="rise-2 mt-6 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            Where and <em className="font-normal italic">when</em>, on every frame
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-cream/70">
            Every photograph carries the place and the month it was taken, because a picture without
            a season tells you nothing about what you would see.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-5">
        <div className="container-editorial">
          <ul className="flex flex-wrap gap-2" role="list">
            {galleryCategories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => {
                    setFilter(c);
                    setLightbox(null);
                  }}
                  aria-pressed={filter === c}
                  className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                    filter === c
                      ? "border-gold text-gold"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="container-editorial">
          <p className="field-note text-muted-foreground">
            Showing {shown.length} of {galleryItems.length}
          </p>
          <ul className="mt-6 grid auto-rows-[16rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((g, i) => (
              <Reveal
                key={g.caption}
                as="li"
                delay={(i % 3) * 70}
                className={
                  g.span === "wide" ? "sm:col-span-2" : g.span === "tall" ? "row-span-2" : ""
                }
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block h-full w-full overflow-hidden text-left"
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="img-zoom-slow h-full w-full object-cover"
                    width={1200}
                    height={900}
                    loading="lazy"
                  />
                  <span className="absolute inset-x-0 bottom-0 photo-scrim p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="field-note block text-gold">
                      {g.place} · {g.month}
                    </span>
                    <span className="mt-1.5 block text-sm text-cream">{g.caption}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-savanna/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 p-2 text-cream"
            aria-label="Close"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={open.caption} className="max-h-[72vh] w-full object-contain" />
            <figcaption className="mt-4">
              <p className="field-note text-gold">
                {open.place} · {open.month} · {open.category}
              </p>
              <p className="mt-2 text-sm text-cream/85">{open.caption}</p>
              <p className="field-note mt-3 text-cream/40">
                Use the arrow keys to move, Escape to close
              </p>
            </figcaption>
          </figure>
        </div>
      )}

      <section className="grain-dark py-20">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <Reveal>
            <h2 className="text-4xl text-cream md:text-5xl">
              Want the frame at the top of this page?
            </h2>
            <p className="mt-5 max-w-xl text-cream/70">
              That is Kogatende in August. The trip that reaches it holds three nights on the river.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/safaris" search={{ type: "Migration" }} className={ctaGold}>
              Migration itineraries
            </Link>
            <Link to="/safaris" className={ctaGhostDark}>
              All safaris
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
