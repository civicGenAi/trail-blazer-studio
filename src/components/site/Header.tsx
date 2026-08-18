import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import logoCompact from "@/assets/logo-compact-reversed.png";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_URL, browseByType, featuredNavSafaris, moreLinks } from "./nav-data";

const linkBase =
  "px-3 py-2 text-[0.9rem] text-cream/85 transition-colors duration-300 hover:text-cream";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"safaris" | "more" | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Any navigation closes the mobile sheet, including a link to the current page.
  useEffect(() => {
    setOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  // The sheet covers the viewport on small screens; stop the page behind it scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-savanna/95 backdrop-blur">
      <div className="container-editorial flex h-[4.5rem] items-center gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Arusha Wildlife Safaris, home"
        >
          <img
            src={logoCompact}
            alt="Arusha Wildlife Safaris"
            className="h-11 w-auto sm:h-14"
            width={463}
            height={247}
          />
        </Link>

        <nav className="ml-auto hidden items-center lg:flex" aria-label="Main">
          <Link
            to="/"
            className={linkBase}
            activeProps={{ className: "text-cream" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          {/* Safaris mega dropdown */}
          <div className="group relative">
            <Link
              to="/safaris"
              className={`${linkBase} inline-flex items-center gap-1`}
              activeProps={{ className: "text-cream" }}
            >
              Safaris <ChevronDown className="h-3.5 w-3.5" aria-hidden />
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
                          <span className="price text-sm whitespace-nowrap">
                            ${s.price.toLocaleString()}
                          </span>
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
                    View all safari tours <ArrowRight className="h-4 w-4" aria-hidden />
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
              More <ChevronDown className="h-3.5 w-3.5" aria-hidden />
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
            {open ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile accordion nav */}
      {open && (
        <nav
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-cream/10 bg-savanna-deep lg:hidden"
          aria-label="Mobile"
        >
          <div className="container-editorial py-4">
            <MobileLink to="/" label="Home" onClick={() => setOpen(false)} />

            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-cream"
              onClick={() => setMobileGroup((g) => (g === "safaris" ? null : "safaris"))}
              aria-expanded={mobileGroup === "safaris"}
            >
              Safaris{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileGroup === "safaris" ? "rotate-180" : ""}`}
              />
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
                <Link
                  to="/safaris"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block text-sm text-gold"
                >
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
              More{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileGroup === "more" ? "rotate-180" : ""}`}
              />
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
