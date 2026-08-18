# Arusha Wildlife Safaris

Marketing site for a Tanzania safari and Kilimanjaro trekking operator based in
Arusha. TanStack Start, React 19, Tailwind v4.

## Commands

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Dev server on port 5173 |
| `bun run build` | Production build into `.output/` |
| `bun run preview` | Serve the production build |
| `bun run lint` | ESLint, including Prettier formatting rules |
| `npx tsc --noEmit` | Type check |

Run `lint` and `tsc --noEmit` before committing. Both must be clean.

## Layout

- `src/routes/`: file-based routes. `routeTree.gen.ts` is generated; never edit it.
- `src/components/site/`: components specific to this site.
- `src/components/ui/`: shadcn primitives.
- `src/data/`: all copy and trip data as typed modules. Content changes belong
  here, not inside route components.
- `src/lib/seo.ts`: canonical URLs, meta tags and JSON-LD builders.
- `src/styles.css`: the design system: five named colors, three type roles, and
  the trail-line utilities.

## Design system

Five colors only: Savanna Night `#14231C`, Deep Canopy `#1F5C33`, Trail Gold
`#C8963C`, Dust Cream `#EFE7D8`, Charcoal Ink `#201C16`. Trail Gold is a line, a
price or one outlined CTA per section, and never a background fill.

Three type roles: Fraunces for display, Instrument Sans for body and UI, Space
Mono for day numbers, distances, coordinates and prices.

The trail line is the signature device. It draws in on hero load, forms the route
strip on every itinerary day, plots camp altitudes on the trekking page, and
extends across the migration month calendar on scroll. Nothing else animates
beyond a single fade and rise per section, and every animation respects
`prefers-reduced-motion`.

## Copy voice

Plain verbs, specific nouns, sentence case. A number does more work than an
adjective: say what happens, where, and for how long. No travel-brochure filler.
Do not use em dashes in visible copy; use commas, colons or full stops.
