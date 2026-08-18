# Arusha Wildlife Safaris

Marketing site for Arusha Wildlife Safaris, a Tanzania safari and Kilimanjaro
trekking operator based in Arusha.

Production: https://www.arushawildlifesafaris.com

## Stack

- TanStack Start (file-based routing, SSR) on Vite 8
- React 19
- Tailwind CSS v4
- Nitro for the production server build

## Getting started

```bash
bun install
bun run dev
```

The dev server runs on http://localhost:5173.

## Commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server with HMR |
| `bun run build` | Production build into `.output/` |
| `bun run preview` | Serve the production build |
| `bun run lint` | ESLint, including Prettier formatting rules |
| `bun run format` | Rewrite files with Prettier |
| `npx tsc --noEmit` | Type check |

## Deploying

`bun run build` produces a Nitro server bundle in `.output/`. Nitro detects the
host from the build environment, so Vercel, Netlify and Cloudflare all work
without configuration. With no host detected it builds a plain Node server that
runs with `node .output/server/index.mjs`.

## Where content lives

All copy and trip data sits in typed modules under `src/data/`:

| File | Contents |
| --- | --- |
| `tours.ts` | Itineraries, including day-by-day routes |
| `destinations.ts` | Parks and regions, best-time matrix, Kilimanjaro detail |
| `migration.ts` | Month-by-month migration calendar and FAQ |
| `trekking.ts` | Kilimanjaro route comparison and elevation profiles |
| `blog.ts` | Field notes |
| `gallery.ts` | Photographs with place and month |
| `site.ts` | Company facts, testimonials, booking steps, general FAQ |

Adding a tour or a post means adding an object to the relevant array. Routes and
the sitemap pick it up automatically.

## Design system

Five colors, three type roles, and one signature device: a dotted trail line that
threads the site. `AGENTS.md` has the full rules, including the copy voice.
