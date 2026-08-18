import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoCompact from "@/assets/logo-compact-reversed.png";
import { getTour } from "@/data/tours";
import { browseByType, featuredNavSafaris, moreLinks, navDestinations } from "./nav-data";

type MenuId = "safaris" | "more" | null;

export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MenuId>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const barRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Any navigation closes everything, including a link to the current page.
  useEffect(() => {
    setMobileOpen(false);
    setMobileGroup(null);
    setOpenMenu(null);
  }, [pathname]);

  // The mobile sheet covers the viewport, so stop the page behind it scrolling.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // The bar sits over the hero photograph, so it only grows a background once
  // the page has moved. Above the fold it stays transparent.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes an open mega menu, and clicking outside the bar does too.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [openMenu]);

  // A short grace period on leave, so a diagonal cursor path from the trigger
  // to the panel does not close the menu underneath the pointer.
  const open = (id: MenuId) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <>
      {/*
       * Sibling of the bar, not a child: backdrop-blur on the header makes it a
       * containing block, which would clip this fixed overlay to the bar's height.
       */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-savanna/80 transition-opacity duration-500 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        ref={barRef}
        onMouseLeave={scheduleClose}
        className={`sticky top-0 z-50 transition-colors duration-500 ${
          scrolled || openMenu || mobileOpen
            ? "border-b border-mist/10 bg-savanna/95 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-savanna/80 to-transparent"
        }`}
      >
        <div className="container-editorial flex h-[4.5rem] items-center gap-6 lg:h-20">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Arusha Wildlife Safaris, home"
            onMouseEnter={scheduleClose}
          >
            <img
              src={logoCompact}
              alt="Arusha Wildlife Safaris"
              className="h-11 w-auto transition-transform duration-500 hover:scale-[1.03] sm:h-14"
              width={463}
              height={247}
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Main">
            <NavLink to="/" exact onHover={scheduleClose}>
              Home
            </NavLink>

            <MenuTrigger
              label="Safaris"
              id="safaris"
              openMenu={openMenu}
              onOpen={open}
              to="/safaris"
            />

            <NavLink to="/migration" onHover={scheduleClose}>
              Migration
            </NavLink>
            <NavLink to="/destinations" onHover={scheduleClose}>
              Destinations
            </NavLink>
            <NavLink to="/blog" onHover={scheduleClose}>
              Blog
            </NavLink>
            <NavLink to="/contact" onHover={scheduleClose}>
              Contact
            </NavLink>

            <MenuTrigger label="More" id="more" openMenu={openMenu} onOpen={open} />
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-6">
            <Link
              to="/contact"
              onMouseEnter={scheduleClose}
              className="group hidden items-center gap-2 border border-summit px-5 py-2.5 text-sm text-summit transition-colors duration-300 hover:bg-summit hover:text-savanna sm:inline-flex"
            >
              Book Safari
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Desktop mega menus. Full bleed, so they read as a panel rather than a tooltip. */}
        <MegaPanel
          open={openMenu === "safaris"}
          onEnter={() => open("safaris")}
          onLeave={scheduleClose}
        >
          <SafarisMenu />
        </MegaPanel>
        <MegaPanel open={openMenu === "more"} onEnter={() => open("more")} onLeave={scheduleClose}>
          <MoreMenu />
        </MegaPanel>

        <MobileNav
          open={mobileOpen}
          group={mobileGroup}
          setGroup={setMobileGroup}
          close={() => setMobileOpen(false)}
        />
      </header>
    </>
  );
}

/* -------------------------------------------------------------- desktop bar */

const linkBase =
  "relative px-3 py-2 text-[0.9rem] text-mist/80 transition-colors duration-300 hover:text-mist";

/** Underline grows from the centre on hover and stays put on the active route. */
function NavLink({
  to,
  children,
  exact = false,
  onHover,
}: {
  to: string;
  children: ReactNode;
  exact?: boolean;
  onHover?: () => void;
}) {
  return (
    <Link
      to={to}
      onMouseEnter={onHover}
      className={`${linkBase} group`}
      activeProps={{ className: "text-mist" }}
      activeOptions={{ exact }}
    >
      {children}
      <span
        className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-summit transition-transform duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100"
        aria-hidden
      />
    </Link>
  );
}

function MenuTrigger({
  label,
  id,
  openMenu,
  onOpen,
  to,
}: {
  label: string;
  id: Exclude<MenuId, null>;
  openMenu: MenuId;
  onOpen: (id: MenuId) => void;
  to?: string;
}) {
  const isOpen = openMenu === id;
  const inner = (
    <>
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        aria-hidden
      />
      <span
        className={`absolute inset-x-3 bottom-1 h-px origin-center bg-summit transition-transform duration-300 ${
          isOpen ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden
      />
    </>
  );
  const className = `${linkBase} inline-flex items-center gap-1.5 ${isOpen ? "text-mist" : ""}`;

  // The Safaris trigger is still a link, so it works without a pointer.
  return to ? (
    <Link
      to={to}
      className={className}
      onMouseEnter={() => onOpen(id)}
      onFocus={() => onOpen(id)}
      aria-expanded={isOpen}
    >
      {inner}
    </Link>
  ) : (
    <button
      type="button"
      className={className}
      onMouseEnter={() => onOpen(id)}
      onFocus={() => onOpen(id)}
      onClick={() => onOpen(isOpen ? null : id)}
      aria-expanded={isOpen}
    >
      {inner}
    </button>
  );
}

/** Full-bleed panel that drops from the bar. Height animates, so nothing jumps. */
function MegaPanel({
  open,
  children,
  onEnter,
  onLeave,
}: {
  open: boolean;
  children: ReactNode;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`absolute inset-x-0 top-full hidden overflow-hidden border-b border-mist/10 bg-savanna-deep transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
        open ? "max-h-[34rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
      }`}
    >
      <div
        className={`container-editorial py-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "-translate-y-3"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function SafarisMenu() {
  return (
    <div className="grid grid-cols-[2fr_0.8fr_1fr] gap-10 xl:gap-14">
      <div>
        <MenuHeading>Featured safaris</MenuHeading>
        <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
          {featuredNavSafaris.map((s) => {
            const tour = getTour(s.slug);
            return (
              <li key={s.slug}>
                <Link
                  to="/safaris/$slug"
                  params={{ slug: s.slug }}
                  className="group flex gap-4 border border-transparent p-2 transition-colors duration-300 hover:border-mist/15 hover:bg-mist/[0.04]"
                >
                  {tour && (
                    <span className="h-[4.5rem] w-24 shrink-0 overflow-hidden">
                      <img
                        src={tour.hero_image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={240}
                        height={180}
                        loading="lazy"
                      />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-col justify-center">
                    <span className="line-clamp-2 text-[0.9rem] leading-snug text-mist/90 group-hover:text-mist">
                      {s.title}
                    </span>
                    {/* Sentence case here: the mono field-note is too wide to fit. */}
                    <span className="mt-1.5 block truncate text-[0.7rem] text-mist/45">
                      {s.days} days · {s.destination.split(",")[0]}
                    </span>
                    <span className="price mt-1 block text-xs">
                      from ${s.price.toLocaleString()}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to="/safaris"
          className="group mt-5 inline-flex items-center gap-2 text-sm text-summit"
        >
          View all safari tours
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>

      <div className="flex flex-col">
        <MenuHeading>Browse by type</MenuHeading>
        <ul className="mt-5 flex flex-wrap gap-2">
          {browseByType.map((t) => (
            <li key={t}>
              <Link
                to="/safaris"
                search={{ type: t }}
                className="inline-block border border-mist/20 px-3 py-1.5 text-xs text-mist/75 transition-colors duration-300 hover:border-summit hover:text-mist"
              >
                {t}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-mist/10 pt-5">
          <p className="text-sm text-mist/60">Not sure which fits your dates?</p>
          <Link
            to="/contact"
            className="group mt-2 inline-flex items-center gap-2 text-sm text-summit"
          >
            Ask us to build one
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      <div>
        <MenuHeading>By destination</MenuHeading>
        <ul className="mt-4 grid grid-cols-2 gap-x-6">
          {navDestinations.map((d) => (
            <li key={d.slug}>
              <Link to="/destinations/$slug" params={{ slug: d.slug }} className="group block py-2">
                <span className="block text-sm leading-snug text-mist/85 group-hover:text-summit">
                  {d.name}
                </span>
                <span className="mt-0.5 block text-[0.7rem] leading-snug text-mist/40">
                  {d.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MoreMenu() {
  return (
    <div className="grid grid-cols-[1fr_1.4fr] gap-12">
      <div>
        <MenuHeading>More from us</MenuHeading>
        <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-mist/55">
          The pages that answer the questions people ask before they book.
        </p>
        <Link
          to="/contact"
          className="group mt-5 inline-flex items-center gap-2 text-sm text-summit"
        >
          Talk to a guide
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {moreLinks.map((m) => (
          <li key={m.to}>
            <Link
              to={m.to}
              className="group block border border-transparent p-4 transition-colors duration-300 hover:border-mist/15 hover:bg-mist/[0.04]"
            >
              <span className="flex items-center gap-2 text-[0.95rem] text-mist/90 group-hover:text-mist">
                {m.title}
                <ArrowRight
                  className="h-3.5 w-3.5 text-summit opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  aria-hidden
                />
              </span>
              <span className="mt-1.5 block text-xs text-mist/45">{m.descriptor}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuHeading({ children }: { children: ReactNode }) {
  return <p className="field-note border-b border-mist/10 pb-3 text-summit">{children}</p>;
}

/* ------------------------------------------------------------------- mobile */

/** Three bars that morph into a cross, rather than swapping one icon for another. */
function MenuIcon({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 h-px w-6 bg-mist transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span className="relative block h-4 w-6" aria-hidden>
      <span className={`${bar} ${open ? "top-2 rotate-45" : "top-0"}`} />
      <span className={`${bar} top-2 ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`${bar} ${open ? "top-2 -rotate-45" : "top-4"}`} />
    </span>
  );
}

function MobileNav({
  open,
  group,
  setGroup,
  close,
}: {
  open: boolean;
  group: MenuId;
  setGroup: (g: MenuId) => void;
  close: () => void;
}) {
  return (
    <div
      id="mobile-nav"
      className={`absolute inset-x-0 top-full overflow-hidden bg-savanna-deep transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        open ? "max-h-[calc(100dvh-4.5rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
      }`}
    >
      <nav
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
        aria-label="Mobile"
      >
        <div className="container-editorial pb-8 pt-2">
          <MobileRow open={open} index={0}>
            <MobileLink to="/" label="Home" onClick={close} />
          </MobileRow>

          <MobileRow open={open} index={1}>
            <MobileGroup
              label="Safaris"
              expanded={group === "safaris"}
              onToggle={() => setGroup(group === "safaris" ? null : "safaris")}
            >
              <p className="field-note pt-1 text-summit">Featured safaris</p>
              <ul className="mt-3 space-y-3">
                {featuredNavSafaris.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/safaris/$slug"
                      params={{ slug: s.slug }}
                      onClick={close}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="min-w-0 text-sm text-mist/85">{s.title}</span>
                      <span className="price shrink-0 text-xs">${s.price.toLocaleString()}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="field-note pt-6 text-summit">Browse by type</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {browseByType.map((t) => (
                  <li key={t}>
                    <Link
                      to="/safaris"
                      search={{ type: t }}
                      onClick={close}
                      className="inline-block border border-mist/20 px-3 py-1.5 text-xs text-mist/75"
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/safaris"
                onClick={close}
                className="mt-6 inline-flex items-center gap-2 text-sm text-summit"
              >
                View all safari tours <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </MobileGroup>
          </MobileRow>

          {[
            { to: "/migration", label: "Migration" },
            { to: "/destinations", label: "Destinations" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ].map((l, i) => (
            <MobileRow key={l.to} open={open} index={2 + i}>
              <MobileLink to={l.to} label={l.label} onClick={close} />
            </MobileRow>
          ))}

          <MobileRow open={open} index={6}>
            <MobileGroup
              label="More"
              expanded={group === "more"}
              onToggle={() => setGroup(group === "more" ? null : "more")}
            >
              <ul className="space-y-4 pt-1">
                {moreLinks.map((m) => (
                  <li key={m.to}>
                    <Link to={m.to} onClick={close} className="block">
                      <span className="block text-sm text-mist/90">{m.title}</span>
                      <span className="mt-0.5 block text-xs text-mist/45">{m.descriptor}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileGroup>
          </MobileRow>

          <MobileRow open={open} index={7}>
            <Link
              to="/contact"
              onClick={close}
              className="mt-6 flex items-center justify-center gap-2 border border-summit px-4 py-3.5 text-sm text-summit"
            >
              Book Safari <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </MobileRow>
        </div>
      </nav>
    </div>
  );
}

/** Staggered entry, so the panel unfolds rather than appearing all at once. */
function MobileRow({
  open,
  index,
  children,
}: {
  open: boolean;
  index: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: open ? `${90 + index * 45}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function MobileGroup({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-mist/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 text-left text-[0.95rem] text-mist"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-summit transition-transform duration-400 ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block border-b border-mist/10 py-4 text-[0.95rem] text-mist/85 transition-colors duration-300 hover:text-mist"
      activeProps={{ className: "text-mist" }}
    >
      {label}
    </Link>
  );
}
