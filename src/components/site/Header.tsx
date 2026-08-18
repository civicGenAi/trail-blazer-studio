import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import logoDark from "@/assets/logo-black.png.asset.json";
import { WHATSAPP_URL, browseByType, featuredNavSafaris, moreLinks } from "./nav-data";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.12-.41-2.13-1.32-.79-.7-1.32-1.57-1.47-1.87-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44 0 1.44 1.05 2.83 1.2 3.03.15.2 2.06 3.28 5.02 4.47 2.96 1.19 2.96.79 3.5.74.53-.05 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.42 9.41Zm8.01-17.42A11.28 11.28 0 0 0 12.03 1C5.8 1 .74 6.06.74 12.28c0 1.99.52 3.93 1.51 5.64L.6 24l6.22-1.63a11.26 11.26 0 0 0 5.21 1.33h.01c6.22 0 11.29-5.06 11.29-11.28 0-3.01-1.18-5.85-3.28-7.98Z" />
    </svg>
  );
}

const linkBase =
  "px-3 py-2 text-[0.9rem] text-cream/85 transition-colors duration-300 hover:text-cream";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"safaris" | "more" | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-savanna/95 backdrop-blur">
      <div className="container-editorial flex h-[4.5rem] items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Arusha Wildlife Safaris — home">
          <img src={logoDark.url} alt="Arusha Wildlife Safaris" className="h-12 w-auto" width={180} height={120} />
        </Link>

        <nav className="ml-auto hidden items-center lg:flex" aria-label="Main">
          <Link to="/" className={linkBase} activeProps={{ className: "text-cream" }} activeOptions={{ exact: true }}>
            Home
          </Link>

          {/* Safaris mega dropdown */}
          <div className="group relative">
            <Link to="/safaris" className={`${linkBase} inline-flex items-center gap-1`}>
              Safaris <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[46rem] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-[1.1fr_1fr] gap-8 border border-cream/10 bg-savanna-deep p-7 shadow-2xl">
                <div>
                  <p className="eyebrow">Featured safaris</p>
                  <ul className="mt-4 space-y-3">
                    {featuredNavSafaris.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/safaris/$slug"
                          params={{ slug: s.slug }}
                          className="group/i flex items-baseline justify-between gap-4 text-cream/85 transition-colors duration-300 hover:text-cream"
                        >
                          <span>
                            <span className="block text-[0.95rem] leading-snug">{s.title}</span>
                            <span className="field-note text-cream/45">{s.destination}</span>
                          </span>
                          <span className="price text-sm whitespace-nowrap">${s.price.toLocaleString()}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col">
                  <p className="eyebrow">Browse by type</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {browseByType.map((t) => (
                      <Link
                        key={t}
                        to="/safaris"
                        search={{ type: t }}
                        className="border border-cream/20 px-3 py-1.5 text-xs text-cream/80 transition-colors duration-300 hover:border-gold hover:text-cream"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/safaris"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-gold hover:underline"
                  >
                    View all safari tours <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="/migration" className={linkBase} activeProps={{ className: "text-cream" }}>
            Migration
          </Link>
          <Link to="/destinations" className={linkBase} activeProps={{ className: "text-cream" }}>
            Destinations
          </Link>
          <Link to="/blog" className={linkBase} activeProps={{ className: "text-cream" }}>
            Blog
          </Link>
          <Link to="/contact" className={linkBase} activeProps={{ className: "text-cream" }}>
            Contact
          </Link>

          {/* More dropdown */}
          <div className="group relative">
            <button type="button" className={`${linkBase} inline-flex items-center gap-1`}>
              More <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute right-0 top-full w-[22rem] pt-3 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="border border-cream/10 bg-savanna-deep p-3 shadow-2xl">
                {moreLinks.map((m) => (
                  <li key={m.to}>
                    <Link
                      to={m.to}
                      className="block px-3 py-2.5 transition-colors duration-300 hover:bg-cream/5"
                    >
                      <span className="block text-[0.95rem] text-cream/90">{m.title}</span>
                      <span className="block text-xs text-cream/50">{m.descriptor}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Message us on WhatsApp"
            className="p-2 text-cream/80 transition-colors duration-300 hover:text-cream"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link
            to="/contact"
            className="hidden border border-gold px-4 py-2.5 text-sm text-gold transition-colors duration-300 hover:bg-gold/10 sm:inline-block"
          >
            Book Safari
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-cream lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile accordion nav */}
      {open && (
        <nav className="border-t border-cream/10 bg-savanna-deep lg:hidden" aria-label="Mobile">
          <div className="container-editorial py-4">
            <MobileLink to="/" label="Home" onClick={() => setOpen(false)} />

            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-cream"
              onClick={() => setMobileGroup((g) => (g === "safaris" ? null : "safaris"))}
              aria-expanded={mobileGroup === "safaris"}
            >
              Safaris <ChevronDown className={`h-4 w-4 transition-transform ${mobileGroup === "safaris" ? "rotate-180" : ""}`} />
            </button>
            {mobileGroup === "safaris" && (
              <div className="pb-4 pl-1">
                <p className="eyebrow">Featured safaris</p>
                <ul className="mt-3 space-y-2">
                  {featuredNavSafaris.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/safaris/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-3 text-sm text-cream/85"
                      >
                        <span>{s.title}</span>
                        <span className="price text-xs">${s.price.toLocaleString()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {browseByType.map((t) => (
                    <Link
                      key={t}
                      to="/safaris"
                      search={{ type: t }}
                      onClick={() => setOpen(false)}
                      className="border border-cream/20 px-2.5 py-1 text-xs text-cream/80"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
                <Link to="/safaris" onClick={() => setOpen(false)} className="mt-4 inline-block text-sm text-gold">
                  View all safari tours
                </Link>
              </div>
            )}

            <MobileLink to="/migration" label="Migration" onClick={() => setOpen(false)} />
            <MobileLink to="/destinations" label="Destinations" onClick={() => setOpen(false)} />
            <MobileLink to="/blog" label="Blog" onClick={() => setOpen(false)} />
            <MobileLink to="/contact" label="Contact" onClick={() => setOpen(false)} />

            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-cream"
              onClick={() => setMobileGroup((g) => (g === "more" ? null : "more"))}
              aria-expanded={mobileGroup === "more"}
            >
              More <ChevronDown className={`h-4 w-4 transition-transform ${mobileGroup === "more" ? "rotate-180" : ""}`} />
            </button>
            {mobileGroup === "more" && (
              <ul className="pb-4">
                {moreLinks.map((m) => (
                  <li key={m.to}>
                    <Link to={m.to} onClick={() => setOpen(false)} className="block py-2">
                      <span className="block text-sm text-cream/90">{m.title}</span>
                      <span className="block text-xs text-cream/50">{m.descriptor}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 block border border-gold px-4 py-3 text-center text-sm text-gold"
            >
              Book Safari
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function MobileLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick} className="block border-b border-cream/5 py-3 text-cream/85">
      {label}
    </Link>
  );
}
