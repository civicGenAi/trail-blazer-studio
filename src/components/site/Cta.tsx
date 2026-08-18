import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WHATSAPP_URL } from "./nav-data";

/*
 * Three button roles, and only three. Trail Gold is reserved for one
 * outlined CTA per screen and is never used as a fill.
 */

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition-colors duration-300";

export const ctaGold = `${base} border border-summit text-summit hover:bg-summit/10`;
export const ctaSolid = `${base} bg-primary text-primary-foreground hover:bg-savanna`;
export const ctaGhostLight = `${base} border border-border text-foreground hover:border-primary`;
export const ctaGhostDark = `${base} border border-mist/40 text-mist hover:border-mist`;

export function WhatsAppLink({
  message,
  className = ctaGhostLight,
  children = "WhatsApp us",
}: {
  message?: string;
  className?: string;
  children?: ReactNode;
}) {
  const href = message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export function BookLink({
  className = ctaGold,
  children = "Book Safari",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link to="/contact" className={className}>
      {children}
    </Link>
  );
}
