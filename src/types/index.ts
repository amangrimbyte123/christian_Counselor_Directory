export type SessionFormat = "online" | "in-person";

export type Profession =
  | "psychologist"
  | "psychiatrist"
  | "counselor"
  | "social-worker"
  | "marriage-family-therapist";

export interface Specialty {
  slug: string; // e.g. "anxiety-therapy"
  name: string; // e.g. "Anxiety"
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

export interface Therapist {
  id: string;
  slug: string;
  name: string;
  credentials: string; // display string, e.g. "PhD, Licensed Psychologist"
  profession: Profession;
  title: string; // e.g. "Licensed Clinical Psychologist"
  statement: string; // 1-sentence headline
  bio: string[]; // paragraphs
  city: string; // city slug
  state: string; // state slug
  serviceAreas: string[]; // extra city slugs (in-person radius)
  formats: SessionFormat[];
  specialties: string[]; // specialty slugs
  approaches: string[]; // approach slugs
  languages: string[]; // language slugs
  feeMin: number; // USD per session
  feeMax: number;
  slidingScale: boolean;
  freeConsult: boolean;
  acceptingClients: boolean;
  yearsExperience: number;
  ages: string[]; // "Adults", "Teens" ...
  featured: boolean;
  avatarHue: number; // for generated placeholder avatar
  faqs: { q: string; a: string }[];
  /** Mock data is NEVER verified. A real data source sets this after checking a licensing board. */
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
  specialty?: string;
  format?: "online" | "in-person";
  profession?: Profession;
  language?: string;
  approach?: string;
  maxFee?: number;
  sort: "recommended" | "name" | "fee-low" | "fee-high" | "experience";
  page: number;
}

export interface SearchResult {
  items: Therapist[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
