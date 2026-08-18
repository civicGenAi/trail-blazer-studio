import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "./nav-data";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Appears only after the hero has scrolled past, so it never competes with the
 * one gold CTA above the fold.
 */
export function WhatsAppFloat() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-gold/60 bg-savanna px-4 py-3 text-sm text-cream shadow-lg transition-all duration-500 hover:bg-savanna-deep ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-5 w-5 text-gold" />
      <span className="hidden sm:inline">Message us</span>
    </a>
  );
}
