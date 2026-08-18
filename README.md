# Trail Blazer Studio

Arusha Wildlife Safaris — Design System & Lovable Build Prompt (v3)

0. The signature idea

"The Trail Line." A single hand-drawn-style dotted route line threads the whole site: draws in on the hero like a compass bearing, becomes the route strip on every itinerary day, and animates month-by-month across the map on the Migration page as you scroll. It's structural, not decorative — an itinerary genuinely is a route.

1. Color — 5 named tokens

Name Hex Use Savanna Night #14231C Primary dark bg (hero, footer, section breaks) Deep Canopy #1F5C33 Core brand green (from logo) — light-section primary Trail Gold #C8963C The ONLY warm accent — trail line, prices, one CTA/screen Dust Cream #EFE7D8 Light bg / text-on-dark Charcoal Ink #201C16 Body text on light

Rule: Trail Gold never fills a background or badge — line, price, one CTA only.

2. Type — 3 roles

Display: Fraunces — expressive serif, tight leading, occasional italic on emphasis words.

Body/UI: Instrument Sans — warm humanist grotesk.

Field-note face (day numbers, coordinates, distances, prices): Space Mono.

3. Layout, motion — unchanged from v2

Asymmetric editorial grid, full-bleed photography breaking the container, offset text columns. One orchestrated hero-load sequence, scroll-driven trail extension, slow (400ms+) card-hover. Nothing else animates. Respect reduced-motion.

4. Navigation architecture (mirrors a proven safari-site pattern, restyled)

Header, desktop: Logo | Home | Safaris ▾ (mega-dropdown) | Migration | Destinations | Blog | Contact | More ▾ | [WhatsApp icon] | [Book Safari — sticky, Trail Gold]

Safaris ▾ mega-dropdown contents: a "Featured Safaris" column (3–4 highlighted tours, each showing title + destination + price), a "Browse by Type" pill row (Wildlife, Migration, Trekking, Honeymoon, Family, Beach Holiday, Balloon Safari, Photography…), and a "View all safari tours" link at the bottom.

More ▾ dropdown contents: Mountain Trekking, About Us, FAQ, Blog, Contact — each shown as a title + one-line descriptor (e.g. "Mountain Trekking — Machame, Lemosho, Marangu routes").

Mobile: hamburger → accordion nav with the same two groupings (Safaris expands to show featured + type pills + "view all"; More expands to show the five links).

5. Page specs

5a. Tour Detail (/safaris/[slug]) — reusable dynamic template

Gallery carousel → breadcrumb → title/type/destination/rating strip → quick-facts bar → About text → Highlights list → Included/Not Included → tabbed day-by-day itinerary (route strip: lodge → from/to → distance/time → narrative → meals → activities → notes, using the elevation-profile trail-line strip from v2) → sticky booking sidebar (price, trust badges, Book / WhatsApp / Ask a Question) → "You Might Also Like" related-tours carousel.

5b. Safaris grid (/safaris)

Filter bar (type, destination, duration, price, difficulty) + sort. Stat strip up top (total safaris, day-range, price-range — three numbers, no filler copy around them). Cards: image, popularity/rating badge, duration + type + destination + difficulty, title, one-line teaser (not a paragraph), 3 highlight bullets, price, meal/vehicle icons, View + quick-WhatsApp icon.

5c. Great Migration (/migration)

Hero: full-bleed photo, season/status badge, headline + one-sentence subhead, two CTAs (View Packages / Ask Us).

Stats bar: 4 blocks — herd size, crossing window, calving window, Big Five — each just a big number + short label, no paragraph.

One short section explaining why the migration is a continuous loop (2–3 sentences, factual, your own words — not a travel-brochure paragraph).

Migration-specific tour card variant: same card as the general grid, plus a compact "Day-by-day preview" (first 3–4 day titles only) before the price/CTA row.

Month-by-month strip: 12 months, each tagged with a phase (Calving / On the Move / River Crossings / Peak Crossings), region, and one line — current month visually marked ("You are here"). This is where the trail line animates as the visitor scrolls across it.

FAQ accordion (migration-specific questions).

Closing CTA band with urgency framing (e.g. camps book out early) + WhatsApp/booking.

5d. Destinations (/destinations)

Hero with an interactive map (pins for each park/region + the two airports).

At-a-glance stat row (park count, Big Five locations, Kilimanjaro elevation, Zanzibar one-liner) — numbers + short labels only.

Destination card grid: image, "Featured" badge, region label, name, one tight paragraph (not three), 3 highlight tags, "Explore" + "Book Custom Trip" buttons.

Kilimanjaro gets an expanded card/section: wildlife-by-elevation-zone icon row, a "things to do" stat row, a mini best-time-by-month rating strip, a quick-facts table (summit height, routes, duration, distance from Arusha, success rate), and an accommodation-tier table (mountain lodge / tented camp / hut, with price bands).

"Best Time to Visit" matrix: activity rows (Wildlife Safari, Great Migration, Kilimanjaro Trek, Zanzibar Beach, Birdwatching, Budget Safari) × month columns, color-coded Peak/Good/Not Recommended.

Closing enquiry section: 4 short benefit bullets + contact form + WhatsApp.

6. Copy voice — clean, not fluffy

This is the actual instruction to bake into every placeholder string and into the prompt you give Lovable: plain verbs, specific nouns, sentence case, no stacked adjectives, no "embark on the adventure of a lifetime" filler. A number does more work than an adjective. Say what happens, where, for how long.

Fluffy (avoid) Clean (use) "Embark on the adventure of a lifetime through the breathtaking wonders of untamed Africa" "Six days across the Serengeti's northern corridor, timed to the Mara River crossings." "Experience the magic of nature's greatest spectacle" "1.5 million wildebeest and zebra move through the Serengeti–Mara ecosystem year-round." "Discover unforgettable memories that will last a lifetime" "Includes park fees, full board, and a private 4WD guide."

Same rule for UI copy: buttons say what they do ("Book This Safari," "Ask a Question"), empty/loading states describe what's happening, not personality.

7. Tour / Destination data schema (unchanged from v1/v2)

Tour {
  slug, title, type, destination, difficulty, duration_days, duration_nights,
  price_from_usd, max_pax, meal_plan, vehicle_type, rating, hero_image, gallery[],
  about_text, highlights[], included[], not_included[],
  itinerary: [{ day_number, title, lodge_name, route_from, route_to, distance_km,
    drive_time, narrative_text, meals_included, activities[], notes[] }]
}
Destination {
  slug, name, region, hero_image, description, best_time, highlight_tags[],
  related_tour_slugs[]
}


8. Ready-to-paste Lovable prompt

Build a premium editorial-style safari website for Arusha Wildlife Safaris ("Explore Tanzania • Experience the Wild"). Uploading two logo files (black-bg and white-bg transparent) — black-bg on dark sections, white-bg on light.

Design system (follow exactly): Colors — Savanna Night #14231C, Deep Canopy #1F5C33, Trail Gold #C8963C (only warm accent: trail line, prices, one CTA/screen, never a fill), Dust Cream #EFE7D8, Charcoal Ink #201C16. Type — Fraunces (display), Instrument Sans (body/UI), Space Mono (day numbers, coordinates, distances, prices). Signature — a hand-drawn dotted "trail line" that draws in on hero load, forms every itinerary's route strip, and animates across the migration month-calendar on scroll. Asymmetric editorial layout, full-bleed photography, offset text columns — not centered cards-on-white. One orchestrated hero-load animation, scroll-driven trail extension, slow card-hover; nothing else animates; respect reduced-motion.

Copy voice for all placeholder content: plain verbs, specific numbers over adjectives, sentence case, no travel-brochure filler ("embark on the adventure of a lifetime"). See voice table: prefer "Six days across the Serengeti's northern corridor" over "Experience the breathtaking wonders of untamed Africa."

Navigation: Header with Home, a Safaris mega-dropdown (Featured Safaris column + Browse-by-Type pill row + "View all"), Migration, Destinations, Blog, Contact, and a More dropdown (Mountain Trekking, About, FAQ, Blog, Contact — each with a one-line descriptor), plus a WhatsApp icon and sticky "Book Safari" CTA. Mobile: hamburger → accordion with the same two groupings.

Pages, each with [CONTENT TBD] placeholders driven by the typed data model:

Home — hero, trust bar, featured-safaris grid, browse-by-type pills, why-us, migration teaser, testimonials, CTA.

Safaris grid — filter bar, stat strip (count/day-range/price-range as bare numbers), tour cards.

Tour Detail template — gallery, quick facts, about, highlights, included/excluded, tabbed day-by-day itinerary with the trail-line route strip, sticky booking sidebar, related tours.

Great Migration — hero with status badge, 4-stat bar, short loop-explainer, migration tour cards with day-by-day preview, animated month-by-month calendar (phase + region + one line per month, current month marked), FAQ, closing CTA.

Destinations — interactive map, at-a-glance stat row, destination card grid, expanded Kilimanjaro section (wildlife-by-zone, things-to-do stats, best-time strip, quick-facts table, accommodation-tier table), best-time-to-visit activity × month matrix, closing enquiry section.

Mountain Trekking — route comparison cards linking into the tour template.

About, Gallery, Blog, FAQ, Contact — as previously specced.

Responsiveness: mobile-first; simplify the trail-line sequence to a fade+rise per section on mobile; stack offset columns full-width; itinerary strip becomes a vertical line down the left edge of each day card. Test 375/768/1024/1440px.

Quality bar: visible keyboard focus, real contrast ratios checked both ways, no CSS specificity collisions between section- and component-level spacing rules.

9. Next steps

Upload both logos before running the prompt.

Build the shell first, then ask for one page/component at a time.

When ready for real content, I can draft original copy in this exact voice from factual itinerary data — never copied from another operator's site.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/454d861e-a8dc-49f3-bb9e-161b4d6d9944).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
