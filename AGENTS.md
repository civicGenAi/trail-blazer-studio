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

Every colour is sampled from the logo. The mark holds two families and nothing
else: a deep forest green carrying the wordmark, and a lighter lime lighting the
mountain.

| Token | Hex | Role |
| --- | --- | --- |
| `--savanna` | `#0B1B0E` | dark ground, the wordmark hue at 7.5% lightness |
| `--canopy` | `#0C5418` | the wordmark green, 60% of the mark |
| `--summit` | `#80B927` | the mountain's lightest ink, accent on dark |
| `--summit-ink` | `#457213` | same hue darkened, accent on light |
| `--mist` | `#ECF1E9` | light ground |
| `--ink` | `#132315` | body text on light |

Summit is a line, a price, or one outlined CTA per section, and never a
background fill. Do not hardcode either accent: `.eyebrow` and `.price` read
`--accent-ink`, which flips to the bright tone inside `.grain-dark`,
`.bg-savanna` or anything marked `.on-dark`. Bright Summit reaches only 2.2:1 on
Mist, so a hand-picked accent on a light surface will fail contrast.

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
