import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import logoFull from "@/assets/logo-reversed.png";
import { browseByType, moreLinks } from "./nav-data";
import { company } from "@/data/site";

const explore = [
  { to: "/safaris", label: "All safari tours" },
  { to: "/migration", label: "The Great Migration" },
  { to: "/destinations", label: "Destinations" },
  { to: "/trekking", label: "Mountain trekking" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Field notes" },
];

const company_links = [
  ...moreLinks
    .filter((m) => m.to === "/about" || m.to === "/faq")
    .map((m) => ({
      to: m.to,
      label: m.title,
    })),
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-mist/10 bg-savanna text-mist">
      <div className="container-editorial py-12 md:py-14">
        {/* Brand block. Full width on mobile, first column from md up. */}
        <div className="grid gap-y-0 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="mb-8 md:mb-0">
            <img
              src={logoFull}
              alt="Arusha Wildlife Safaris. Explore Tanzania, Experience the Wild"
              className="h-16 w-auto sm:h-20"
              width={463}
              height={314}
              loading="lazy"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/60">
              Arusha-based safari operator. Northern circuit, Kilimanjaro routes and Zanzibar
              extensions, run with our own vehicles and guides.
            </p>
            <div
              className="trail-dotted-x mt-6 w-24"
              style={{ backgroundSize: "100% 100%" }}
              aria-hidden
            />
            <p className="field-note mt-5 text-mist/40">
              {company.coordinates}
              <span className="mt-1 block">{company.address}</span>
            </p>
          </div>

          {/*
           * Below md these three columns would stack into a very long scroll, so
           * they collapse into accordions and only open as flat lists from md up.
           */}
          <FooterColumn title="Explore">
            <LinkList items={explore} />
          </FooterColumn>

          <FooterColumn title="By type">
            <LinkList
              items={browseByType.map((t) => ({ to: "/safaris", label: t, search: { type: t } }))}
            />
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-2.5 text-sm text-mist/70">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="break-all transition-colors duration-300 hover:text-mist"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phoneDisplay.replace(/\s/g, "")}`}
                  className="transition-colors duration-300 hover:text-mist"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="text-mist/45">{company.officeHours}</li>
              <li className="text-mist/45">Replies within one working day</li>
            </ul>

            <p className="field-note mt-7 text-summit">Company</p>
            <ul className="mt-3 space-y-2.5 text-sm text-mist/70">
              {company_links.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="transition-colors duration-300 hover:text-mist">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-mist/10">
        {/* Extra bottom padding keeps the legal line clear of the floating button. */}
        <div className="container-editorial flex flex-col gap-3 py-5 pb-24 text-xs text-mist/45 sm:flex-row sm:items-center sm:justify-between sm:pb-5 sm:pr-52">
          <p>
            © {new Date().getFullYear()} {company.name}. {company.tagline}
          </p>
          <p className="field-note">TALA licence pending · TATO member</p>
        </div>
      </div>
    </footer>
  );
}

/** Accordion under md, plain heading and list from md up. */
function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-mist/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4.5 text-left md:hidden"
      >
        <span className="field-note text-summit">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-summit transition-transform duration-400 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <p className="field-note hidden text-summit md:block">{title}</p>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:!grid-rows-[1fr] md:opacity-100 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden md:overflow-visible">
          <div className="pb-5 md:mt-4 md:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

function LinkList({
  items,
}: {
  items: { to: string; label: string; search?: Record<string, string> }[];
}) {
  return (
    <ul className="space-y-2.5 text-sm text-mist/70">
      {items.map((i) => (
        <li key={i.label}>
          <Link
            to={i.to}
            search={i.search ?? {}}
            className="transition-colors duration-300 hover:text-mist"
          >
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
