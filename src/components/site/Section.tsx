import type { ReactNode } from "react";
import { TrailLine } from "./TrailLine";

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "offset";
}) {
  return (
    <div className={align === "offset" ? "md:pl-[38%]" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <TrailLine className="mt-3 w-24" />
      <h2 className="mt-5 text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 max-w-xl text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function StatStrip({
  stats,
  dark = false,
}: {
  stats: { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px md:grid-cols-4 ${dark ? "bg-cream/10" : "bg-border"}`}
    >
      {stats.map((s) => (
        <div key={s.label} className={`p-6 ${dark ? "bg-savanna" : "bg-background"}`}>
          <dt className={`field-note ${dark ? "text-cream/50" : "text-muted-foreground"}`}>{s.label}</dt>
          <dd className={`mt-2 font-mono text-3xl ${dark ? "text-cream" : "text-foreground"}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
