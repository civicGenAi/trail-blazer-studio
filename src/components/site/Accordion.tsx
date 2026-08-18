import { Minus, Plus } from "lucide-react";
import { useState } from "react";

/**
 * One question per row with a visible open/close indicator. Used by both the
 * migration FAQ and the general FAQ so the two behave identically.
 */
export function AccordionRow({ q, a, dark = false }: { q: string; a: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${dark ? "border-mist/12" : "border-border"}`}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 ${
            dark ? "text-mist hover:text-summit" : "hover:text-primary"
          }`}
        >
          <span className="text-lg">{q}</span>
          <span className="mt-1 shrink-0 text-summit">
            {open ? (
              <Minus className="h-4 w-4" aria-hidden />
            ) : (
              <Plus className="h-4 w-4" aria-hidden />
            )}
          </span>
        </button>
      </h3>
      {open && (
        <p
          className={`max-w-2xl pb-6 text-sm leading-relaxed ${
            dark ? "text-mist/70" : "text-muted-foreground"
          }`}
        >
          {a}
        </p>
      )}
    </div>
  );
}
