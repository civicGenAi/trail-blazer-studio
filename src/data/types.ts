export type TourType =
  | "Wildlife"
  | "Migration"
  | "Trekking"
  | "Honeymoon"
  | "Family"
  | "Beach Holiday"
  | "Balloon Safari"
  | "Photography";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type ItineraryDay = {
  day_number: number;
  title: string;
  lodge_name: string;
  route_from: string;
  route_to: string;
  distance_km: number;
  drive_time: string;
  narrative_text: string;
  meals_included: string;
  activities: string[];
  notes: string[];
};

export type Tour = {
  slug: string;
  title: string;
  type: TourType;
  destination: string;
  difficulty: Difficulty;
  duration_days: number;
  duration_nights: number;
  price_from_usd: number;
  max_pax: number;
  meal_plan: string;
  vehicle_type: string;
  rating: number;
  reviews: number;
  hero_image: string;
  gallery: string[];
  teaser: string;
  about_text: string;
  highlights: string[];
  included: string[];
  not_included: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  hero_image: string;
  description: string;
  best_time: string;
  highlight_tags: string[];
  related_tour_slugs: string[];
  featured?: boolean;
  /** map pin position in percent of the map frame */
  pin: { x: number; y: number };
};
