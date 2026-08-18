import { images } from "./tours";

export type GalleryItem = {
  src: string;
  caption: string;
  place: string;
  month: string;
  category: "Wildlife" | "Landscape" | "Migration" | "Mountain" | "Coast";
  /** Grid emphasis: wide items span two columns on desktop. */
  span?: "wide" | "tall";
};

export const galleryItems: GalleryItem[] = [
  {
    src: images.migrationCrossing,
    caption: "Herds entering the Mara at crossing point four, about 400 animals in the first push",
    place: "Kogatende, northern Serengeti",
    month: "August",
    category: "Migration",
    span: "wide",
  },
  {
    src: images.heroSavanna,
    caption: "Short-grass plains an hour after sunrise, calving herds spread to the horizon",
    place: "Ndutu",
    month: "February",
    category: "Landscape",
  },
  {
    src: images.serengeti,
    caption: "Kopje at first light in the Seronera valley, a reliable lion lookout",
    place: "Seronera, central Serengeti",
    month: "July",
    category: "Wildlife",
  },
  {
    src: images.ngorongoro,
    caption: "The crater floor from the descent road, 610 m below the rim",
    place: "Ngorongoro Crater",
    month: "June",
    category: "Landscape",
    span: "tall",
  },
  {
    src: images.tarangire,
    caption: "Baobab and elephant on the river line, where the dry season concentrates the herds",
    place: "Tarangire National Park",
    month: "September",
    category: "Wildlife",
  },
  {
    src: images.balloon,
    caption: "Lift-off at 06:10, one hour over the Seronera valley before breakfast on the plains",
    place: "Central Serengeti",
    month: "July",
    category: "Landscape",
  },
  {
    src: images.kilimanjaro,
    caption: "Kibo from the Shira plateau at 3,850 m, two days before the summit push",
    place: "Mount Kilimanjaro",
    month: "September",
    category: "Mountain",
    span: "wide",
  },
  {
    src: images.zanzibar,
    caption: "Low tide at Matemwe, the reef 1.5 km offshore",
    place: "North-east Zanzibar",
    month: "August",
    category: "Coast",
  },
];

export const galleryCategories = [
  "All",
  "Wildlife",
  "Landscape",
  "Migration",
  "Mountain",
  "Coast",
] as const;
