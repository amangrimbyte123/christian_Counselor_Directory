/**
 * The ONLY module that knows where data comes from.
 * To move to a real database, re-implement these functions (keep the signatures)
 * and delete the imports from "@/data/*". No page or component reads /data directly.
 */
import type { City, Post, SearchParams, SearchResult, Specialty, State, Therapist, Approach, Language } from "@/types";
import { therapists, slugRedirects } from "@/data/therapists";
import { specialties } from "@/data/specialties";
import { cities, states } from "@/data/locations";
import { languages } from "@/data/languages";
import { approaches } from "@/data/approaches";
import { posts } from "@/data/posts";
import { searchList } from "./search";
import { SITE } from "./site";

export async function searchTherapists(params: SearchParams, pageSize = SITE.pageSize): Promise<SearchResult> {
  return searchList(therapists, params, pageSize);
}

export async function getTherapist(slug: string): Promise<Therapist | undefined> {
  return therapists.find((t) => t.slug === slug);
}
/** Returns the current slug if `slug` is a retired one. */
export async function getTherapistRedirect(slug: string): Promise<string | undefined> {
  return slugRedirects[slug];
}
export async function listTherapists(): Promise<Therapist[]> {
  return therapists;
}
export async function listFeaturedTherapists(limit = 6): Promise<Therapist[]> {
  return therapists.filter((t) => t.featured).slice(0, limit);
}

export async function listSpecialties(): Promise<Specialty[]> { return specialties; }
export async function getSpecialty(slug: string) { return specialties.find((s) => s.slug === slug); }
export async function listApproaches(): Promise<Approach[]> { return approaches; }
export async function listLanguages(): Promise<Language[]> { return languages; }

export async function listPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}
export async function getPost(slug: string) { return posts.find((p) => p.slug === slug); }

export interface StateSummary extends State { count: number; cities: (City & { count: number })[] }

/** States/cities with at least `min` therapists. Thin locations are excluded so they are never indexed. */
export async function listLocations(min = SITE.minForLocationPage): Promise<StateSummary[]> {
  const cityCount = (slug: string) => therapists.filter((t) => t.city === slug).length;
  return states
    .map((s) => {
      const cs = cities
        .filter((c) => c.stateSlug === s.slug)
        .map((c) => ({ ...c, count: cityCount(c.slug) }))
        .filter((c) => c.count >= min);
      const count = therapists.filter((t) => t.state === s.slug).length;
      return { ...s, count, cities: cs };
    })
    .filter((s) => s.count >= min);
}
export async function getState(slug: string) {
  return (await listLocations()).find((s) => s.slug === slug);
}
export async function getCity(stateSlug: string, citySlug: string) {
  const st = await getState(stateSlug);
  const city = st?.cities.find((c) => c.slug === citySlug);
  return st && city ? { state: st, city } : undefined;
}

export async function getRelatedTherapists(t: Therapist, limit = 3): Promise<Therapist[]> {
  return therapists
    .filter((o) => o.id !== t.id)
    .map((o) => ({
      o,
      score:
        o.specialties.filter((s) => t.specialties.includes(s)).length * 3 +
        (o.city === t.city ? 2 : 0) +
        (o.state === t.state ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.o.name.localeCompare(b.o.name))
    .slice(0, limit)
    .map((x) => x.o);
}

export async function countBySpecialty(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const t of therapists) for (const s of t.specialties) out[s] = (out[s] ?? 0) + 1;
  return out;
}
export async function countOnline(): Promise<number> {
  return therapists.filter((t) => t.formats.includes("online")).length;
}

export const cityLabel = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;
export const stateLabel = (slug: string) => states.find((s) => s.slug === slug);
export const specialtyLabel = (slug: string) => specialties.find((s) => s.slug === slug)?.name ?? slug;
export const approachLabel = (slug: string) => approaches.find((a) => a.slug === slug)?.name ?? slug;
export const languageLabel = (slug: string) => languages.find((l) => l.slug === slug)?.name ?? slug;
