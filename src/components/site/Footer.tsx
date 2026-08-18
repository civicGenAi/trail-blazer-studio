import { Link } from "@tanstack/react-router";
import logoFull from "@/assets/logo-reversed.png";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_URL, browseByType, moreLinks } from "./nav-data";
import { company } from "@/data/site";

const explore = [
  { to: "/safaris", label: "All safari tours" },
  { to: "/migration", label: "The Great Migration" },
  { to: "/destinations", label: "Destinations" },
  { to: "/trekking", label: "Mountain trekking" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Field notes" },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-savanna text-cream">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <img
            src={logoFull}
            alt="Arusha Wildlife Safaris. Explore Tanzania, Experience the Wild"
            className="h-20 w-auto"
            width={463}
            height={314}
            loading="lazy"
          />
          <p className="mt-4 max-w-xs text-sm text-cream/60">
            Arusha-based safari operator. Northern circuit, Kilimanjaro routes and Zanzibar
            extensions, run with our own vehicles and guides.
          </p>
          <div
            className="trail-dotted-x mt-6 w-24"
            style={{ backgroundSize: "100% 100%" }}
            aria-hidden
          />
          <p className="field-note mt-5 text-cream/40">
            {company.coordinates} · {company.address}
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {explore.map((e) => (
              <li key={e.to}>
                <Link to={e.to} className="transition-colors duration-300 hover:text-cream">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">By type</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {browseByType.map((t) => (
              <li key={t}>
                <Link
                  to="/safaris"
                  search={{ type: t }}
                  className="transition-colors duration-300 hover:text-cream"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>
              <a
                href={`mailto:${company.email}`}
                className="transition-colors duration-300 hover:text-cream"
              >
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-cream"
              >
                <WhatsAppIcon className="h-4 w-4 text-gold" />
                {company.phoneDisplay}
              </a>
            </li>
            <li className="text-cream/50">{company.officeHours}</li>
            <li className="text-cream/50">Replies within one working day</li>
          </ul>

          <p className="eyebrow mt-8">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {moreLinks
              .filter((m) => ["/about", "/faq", "/contact"].includes(m.to))
              .map((m) => (
                <li key={m.to}>
                  <Link to={m.to} className="transition-colors duration-300 hover:text-cream">
                    {m.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        {/* Extra right padding keeps the legal line clear of the floating WhatsApp button. */}
        <div className="container-editorial flex flex-col gap-2 py-5 pb-20 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:pb-5 sm:pr-52">
          <p>
            © {new Date().getFullYear()} {company.name}. {company.tagline}
          </p>
          <p className="field-note">TALA licence pending · TATO member</p>
        </div>
      </div>
    </footer>
  );
}
