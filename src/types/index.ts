export type SessionFormat = "online" | "in-person";

export type Profession =
  | "psychologist"
  | "counselor"
  | "social-worker"
  | "marriage-family-therapist";

export interface Specialty {
  slug: string; // e.g. "christian-marriage-counseling"
  name: string; // e.g. "Marriage Counseling"
  icon: string; // key into components/ui/Icon
  summary: string;
  description: string;
  signs: string[];
  faqs: { q: string; a: string }[];
}

export interface City {
  slug: string; // "los-angeles"
  name: string;
  stateSlug: string;
  zipPrefixes?: string[]; // first 3 digits of US ZIP codes served, for ZIP search
  areaLabel?: string; // wider name people search for, e.g. "Toledo & Northwest Ohio"
  blurb?: string; // short local intro for the city page
}

export interface State {
  slug: string; // "california"
  name: string;
  abbr: string;
  region: "West" | "Midwest" | "South" | "Northeast";
}

export interface Approach {
  slug: string;
  name: string;
  summary: string;
}

export interface Language {
  slug: string;
  name: string;
}

/** A real counseling practice, imported from public Google Maps data (see gmb_scraper/). */
export interface Therapist {
  id: string;
  slug: string;
  name: string;
  category: string; // Google Maps category, e.g. "Marriage or relationship counselor"
  profession: Profession; // mapped from category, used for filtering
  address: string; // full address as listed on Google Maps
  street?: string;
  city: string; // city slug
  state: string; // state slug
  zip?: string;
  serviceAreas: string[]; // extra city slugs whose page also lists this practice (e.g. Toledo metro)
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  rating?: number; // Google rating, 1–5
  ratingCount?: number; // number of Google reviews
  hours?: { day: string; time: string }[];
  placeId?: string; // Google place ID, used for the directions link
  featured: boolean;
  avatarHue: number; // for generated placeholder avatar
  /** Nobody has checked a licensing board for these practices yet. Set only after a real check. */
  verified: false | { board: string; checkedOn: string };
  /** Slugs this profile used to have; powers redirects. */
  previousSlugs?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedOn: string; // ISO
  author: string;
  body: { h?: string; p: string }[];
  relatedSpecialties: string[];
  image?: ImageRef;
  /** Search title when it should differ from the on-page headline. */
  seoTitle?: string;
  /** Search phrases this article is written to answer. */
  keywords?: string[];
}

/** A remote or local image with its alt text. */
export interface ImageRef {
  src: string;
  alt: string;
}

export interface SearchParams {
  q?: string;
  location?: string; // free text: city, state name or abbreviation
  state?: string;
  city?: string;
  profession?: Profession;
  sort: "recommended" | "rating" | "reviews" | "name";
  page: number;
}

export interface SearchResult {
  items: Therapist[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
