export const WHATSAPP_URL = "https://wa.me/255700000000";

/** Featured column of the Safaris mega menu, with the image each card shows. */
export const featuredNavSafaris = [
  {
    slug: "northern-serengeti-river-crossings",
    title: "Northern Serengeti river crossings",
    destination: "Serengeti",
    days: 6,
    price: 3450,
  },
  {
    slug: "classic-northern-circuit",
    title: "Classic northern circuit",
    destination: "Tarangire, Ngorongoro, Serengeti",
    days: 7,
    price: 2890,
  },
  {
    slug: "machame-route-kilimanjaro",
    title: "Machame route, Kilimanjaro",
    destination: "Kilimanjaro",
    days: 7,
    price: 2150,
  },
  {
    slug: "serengeti-balloon-and-plains",
    title: "Serengeti balloon and plains",
    destination: "Serengeti",
    days: 4,
    price: 2680,
  },
];

export const browseByType = [
  "Wildlife",
  "Migration",
  "Trekking",
  "Honeymoon",
  "Family",
  "Beach Holiday",
  "Balloon Safari",
  "Photography",
];

/** Destinations column of the mega menu. */
export const navDestinations: { slug: string; name: string; note: string }[] = [
  { slug: "serengeti", name: "Serengeti", note: "Big cats and the migration" },
  { slug: "ngorongoro", name: "Ngorongoro Crater", note: "Black rhino, Big Five in a day" },
  { slug: "tarangire", name: "Tarangire", note: "Elephant herds and baobabs" },
  { slug: "ndutu", name: "Ndutu", note: "February calving grounds" },
  { slug: "kilimanjaro", name: "Kilimanjaro", note: "Seven routes to 5,895 m" },
  { slug: "zanzibar", name: "Zanzibar", note: "Reef and Stone Town" },
];

/*
 * The More menu holds only what is not already in the main bar. Blog and
 * Contact have their own top-level links, so repeating them here would give the
 * same page two entries in one nav.
 */
export const moreLinks: { to: string; title: string; descriptor: string }[] = [
  {
    to: "/trekking",
    title: "Mountain Trekking",
    descriptor: "Machame, Lemosho, Marangu and Rongai compared",
  },
  {
    to: "/about",
    title: "About Us",
    descriptor: "Arusha-based, own vehicles, guides on salary",
  },
  { to: "/faq", title: "FAQ", descriptor: "Visas, park fees, tipping, what to pack" },
  { to: "/gallery", title: "Gallery", descriptor: "Photographs tagged with place and month" },
];
