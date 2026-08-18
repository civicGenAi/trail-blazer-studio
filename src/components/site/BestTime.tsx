import { monthLabels } from "@/data/destinations";

export type Rating = "peak" | "good" | "no";

const ratingClass: Record<Rating, string> = {
  peak: "bg-canopy text-cream",
  good: "bg-canopy/25 text-ink",
  no: "bg-border/60 text-muted-foreground",
};

const ratingLabel: Record<Rating, string> = {
  peak: "Peak",
  good: "Good",
  no: "Not recommended",
};

/** Compact 12-cell strip used inside the Kilimanjaro section. */
export function MonthStripMini({ months, label }: { months: Rating[]; label: string }) {
  return (
    <div>
      <p className="field-note text-muted-foreground">{label}</p>
      <ol className="mt-3 grid grid-cols-12 gap-px">
        {months.map((r, i) => (
          <li key={monthLabels[i]} className="min-w-0">
            <span
              className={`flex h-9 items-center justify-center font-mono text-[0.6rem] ${ratingClass[r]}`}
              title={`${monthLabels[i]}: ${ratingLabel[r]}`}
            >
              {monthLabels[i]?.slice(0, 1)}
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only">
        {months.map((r, i) => `${monthLabels[i]}: ${ratingLabel[r]}.`).join(" ")}
      </p>
    </div>
  );
}

/** Activity × month matrix. Scrolls inside its own container on small screens. */
export function BestTimeMatrix({ rows }: { rows: { activity: string; months: Rating[] }[] }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse">
          <caption className="sr-only">Best time to visit by activity and month</caption>
          <thead>
            <tr>
              <th scope="col" className="field-note w-44 px-3 py-3 text-left text-muted-foreground">
                Activity
              </th>
              {monthLabels.map((m) => (
                <th
                  key={m}
                  scope="col"
                  className="field-note px-1 py-3 text-center text-muted-foreground"
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.activity} className="border-t border-border">
                <th scope="row" className="px-3 py-2.5 text-left text-sm font-normal">
                  {row.activity}
                </th>
                {row.months.map((r, i) => (
                  <td key={monthLabels[i]} className="px-0.5 py-2.5">
                    <span
                      className={`flex h-8 items-center justify-center font-mono text-[0.6rem] ${ratingClass[r]}`}
                    >
                      <span className="sr-only">{`${monthLabels[i]}: ${ratingLabel[r]}`}</span>
                      <span aria-hidden>{r === "peak" ? "●" : r === "good" ? "○" : "×"}</span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {(["peak", "good", "no"] as Rating[]).map((r) => (
          <li key={r} className="flex items-center gap-2">
            <span className={`h-4 w-6 ${ratingClass[r]}`} aria-hidden />
            <span className="field-note text-muted-foreground">{ratingLabel[r]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
