import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-black.png.asset.json";
import { WHATSAPP_URL, browseByType, moreLinks } from "./nav-data";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-savanna text-cream">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src={logoDark.url} alt="Arusha Wildlife Safaris" className="h-16 w-auto" width={240} height={160} loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-cream/60">
            Arusha-based safari operator. Northern circuit, Kilimanjaro routes and Zanzibar extensions, run with our own
            vehicles and guides.
          </p>
          <p className="field-note mt-5 text-cream/40">03°22′S 36°41′E · Arusha, Tanzania</p>
        </div>

        <div>
          <p className="eyebrow">Safaris</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {browseByType.slice(0, 6).map((t) => (
              <li key={t}>
                <Link to="/safaris" search={{ type: t }} className="hover:text-cream">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {moreLinks.map((m) => (
              <li key={m.to}>
                <Link to={m.to} className="hover:text-cream">
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>
              <a href="mailto:book@arushawildlifesafaris.com" className="hover:text-cream">
                book@arushawildlifesafaris.com
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-cream">
                WhatsApp: +255 700 000 000
              </a>
            </li>
            <li className="text-cream/50">Replies within one working day</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-editorial flex flex-col gap-2 py-5 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arusha Wildlife Safaris. Explore Tanzania · Experience the Wild.</p>
          <p className="field-note">TALA licence pending · TATO member</p>
        </div>
      </div>
    </footer>
  );
}
