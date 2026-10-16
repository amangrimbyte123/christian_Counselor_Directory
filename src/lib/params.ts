import type { Profession, SearchParams } from "@/types";

type RawParams = Record<string, string | string[] | undefined>;

const PROFESSIONS: Profession[] = ["marriage-family-therapist", "counselor", "psychologist", "social-worker"];
const SORTS: SearchParams["sort"][] = ["recommended", "rating", "reviews", "name"];

export const PROFESSION_LABELS: Record<Profession, string> = {
  psychologist: "Psychologist",
  counselor: "Counselor or therapist",
  "social-worker": "Social worker",
  "marriage-family-therapist": "Marriage & family counselor",
};
export const SORT_LABELS: Record<SearchParams["sort"], string> = {
  recommended: "Recommended",
  rating: "Highest rated",
  reviews: "Most reviews",
  name: "Name (A–Z)",
};
export const PROFESSION_OPTIONS = PROFESSIONS;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

/** Parse untrusted URL params into a validated SearchParams object. */
export function parseSearchParams(raw: RawParams): SearchParams {
  const profession = first(raw.profession);
  const sort = first(raw.sort);
  const page = Math.floor(Number(first(raw.page)));
  return {
    q: first(raw.q)?.slice(0, 80),
    location: first(raw.location)?.slice(0, 80),
    profession: PROFESSIONS.includes(profession as Profession) ? (profession as Profession) : undefined,
    sort: SORTS.includes(sort as SearchParams["sort"]) ? (sort as SearchParams["sort"]) : "recommended",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

/** Filters that came from the URL path (landing pages) are passed separately and never serialised. */
const KEYS = ["q", "location", "profession", "sort", "page"] as const;

/** Build a query string, omitting defaults. `overrides` replaces values (use undefined to remove). */
export function toQueryString(p: SearchParams, overrides: Partial<Record<(typeof KEYS)[number], string | number | undefined>> = {}, omit: string[] = []) {
  const out = new URLSearchParams();
  const merged: Record<string, string | number | undefined> = { ...p, ...overrides };
  // Any filter change resets pagination unless page is set explicitly.
  if (!("page" in overrides)) merged.page = undefined;
  for (const k of KEYS) {
    const v = merged[k];
    if (v === undefined || v === "" || omit.includes(k)) continue;
    if (k === "sort" && v === "recommended") continue;
    if (k === "page" && Number(v) <= 1) continue;
    out.set(k, String(v));
  }
  const s = out.toString();
  return s ? `?${s}` : "";
}

/** True when any user-chosen filter (not sort/page) is active. */
export const hasActiveFilters = (p: SearchParams, ignore: string[] = []) =>
  KEYS.some((k) => !["sort", "page", ...ignore].includes(k) && p[k] !== undefined);

/**
 * GET forms submit every field, including empty ones (`?q=&location=&…`).
 * Returns the cleaned query string when the raw URL contains empty values (so the page can redirect
 * to a tidy, shareable URL), or null when nothing needs cleaning.
 */
export function cleanQueryRedirect(raw: RawParams): string | null {
  const hasEmpty = Object.values(raw).some((v) => (Array.isArray(v) ? v : [v]).some((x) => x === ""));
  if (!hasEmpty) return null;
  const p = parseSearchParams(raw);
  return toQueryString(p, { page: p.page });
}
