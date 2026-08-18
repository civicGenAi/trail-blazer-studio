import { useEffect, useRef, useState } from "react";

/** Horizontal dotted trail line that draws in when scrolled into view. */
export function TrailLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`trail-dotted-x ${visible ? "trail-draw-x" : ""} ${className}`} aria-hidden />
  );
}

/** Vertical route strip used down the left edge of each itinerary day. */
export function TrailNode({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center self-stretch">
      <span className="field-note flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold">
        {label}
      </span>
      <div className="trail-dotted-y mt-2 flex-1" />
    </div>
  );
}
