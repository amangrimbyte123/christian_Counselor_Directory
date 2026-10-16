import type { Profession, Therapist } from "@/types";
import { METRO, states } from "./locations";
import { rawListings } from "./listings";

/**
 * REAL PRACTICES imported from public Google Maps listings.
 * Regenerate src/data/listings.json with gmb_scraper/build_site_data.py; do not edit it by hand.
 * Nothing here has been checked against a licensing board, so `verified` stays false.
 */
export { LISTINGS_SOURCE } from "./listings";

const stateByAbbr = new Map(states.map((s) => [s.abbr, s.slug]));

/** Ranking used for "recommended" and featured: a Google rating pulled toward 4.5 when there are few reviews. */
export const ratingScore = (t: Pick<Therapist, "rating" | "ratingCount">) =>
  t.rating ? (t.rating * (t.ratingCount ?? 0) + 4.5 * 5) / ((t.ratingCount ?? 0) + 5) : 0;

const built: Therapist[] = rawListings
  .filter((l) => stateByAbbr.has(l.stateAbbr))
  .map((l, i) => ({
    id: `p_${String(i + 1).padStart(4, "0")}`,
    slug: l.slug,
    name: l.name,
    category: l.category,
    profession: l.profession as Profession,
    address: l.address,
    street: l.street,
    city: l.cityKey,
    state: stateByAbbr.get(l.stateAbbr)!,
    zip: l.zip,
    serviceAreas: METRO[l.cityKey] ?? [],
    lat: l.lat,
    lng: l.lng,
    phone: l.phone,
    website: l.website,
    rating: l.rating,
    ratingCount: l.ratingCount,
    hours: l.hours,
    placeId: l.placeId,
    featured: false,
    avatarHue: (i * 47) % 360,
    verified: false,
  }));

// Featured: the best-rated practice with a solid number of reviews from each of the biggest states
const featuredIds = new Set(
  [...built]
    .filter((t) => (t.ratingCount ?? 0) >= 15)
    .sort((a, b) => ratingScore(b) - ratingScore(a))
    .filter((t, i, arr) => arr.findIndex((o) => o.state === t.state) === i)
    .slice(0, 6)
    .map((t) => t.id),
);

export const therapists: Therapist[] = built.map((t) => ({ ...t, featured: featuredIds.has(t.id) }));

/** Old slug → current slug. Add an entry here whenever a profile slug changes. */
export const slugRedirects: Record<string, string> = {};
