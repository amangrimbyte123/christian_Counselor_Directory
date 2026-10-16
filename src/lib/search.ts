import type { SearchParams, SearchResult, Therapist } from "@/types";
import { cities, states } from "@/data/locations";
import { ratingScore } from "@/data/therapists";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;
const stateOf = (slug: string) => states.find((s) => s.slug === slug);

/** Pure filter/sort/paginate over an in-memory list. A database adapter can replace this wholesale. */
export function searchList(all: Therapist[], p: SearchParams, pageSize: number): SearchResult {
  const q = p.q ? norm(p.q) : "";
  const loc = p.location ? norm(p.location) : "";
  // US ZIP (12345 or 12345-6789): exact ZIP first, otherwise the same 3-digit area
  const zip = /^(\d{5})(-\d{4})?$/.exec(loc)?.[1];

  const matched = all.filter((t) => {
    if (p.state && t.state !== p.state) return false;
    if (p.city && t.city !== p.city && !t.serviceAreas.includes(p.city)) return false;
    if (p.profession && t.profession !== p.profession) return false;

    if (zip) {
      if (t.zip?.slice(0, 3) !== zip.slice(0, 3)) return false;
    } else if (loc) {
      const st = stateOf(t.state);
      const places = [t.city, ...t.serviceAreas].map(cityName);
      const hay = [...places, st?.name ?? "", st?.abbr ?? ""].map(norm);
      // "Austin, TX" style input: every comma-separated chunk must match something
      const parts = loc.split(/[,]+/).map((x) => x.trim()).filter(Boolean);
      if (!parts.every((part) => hay.some((h) => h === part || h.includes(part)))) return false;
    }

    if (q) {
      const hay = norm([t.name, t.category, t.address].join(" "));
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  let sorted = [...matched].sort(compare(p.sort));
  // A ZIP search lists the exact ZIP before the rest of its area
  if (zip) sorted = [...sorted.filter((t) => t.zip === zip), ...sorted.filter((t) => t.zip !== zip)];
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(p.page, totalPages);
  return { items: sorted.slice((page - 1) * pageSize, page * pageSize), total, page, pageSize, totalPages };
}

function compare(sort: SearchParams["sort"]) {
  switch (sort) {
    case "name": return (a: Therapist, b: Therapist) => a.name.localeCompare(b.name);
    case "rating": return (a: Therapist, b: Therapist) =>
      (b.rating ?? 0) - (a.rating ?? 0) || (b.ratingCount ?? 0) - (a.ratingCount ?? 0) || a.name.localeCompare(b.name);
    case "reviews": return (a: Therapist, b: Therapist) => (b.ratingCount ?? 0) - (a.ratingCount ?? 0) || a.name.localeCompare(b.name);
    default:
      // Recommended: rating weighted by review count, then practices with contact details (stable, deterministic)
      return (a: Therapist, b: Therapist) =>
        ratingScore(b) - ratingScore(a) ||
        Number(!!b.phone || !!b.website) - Number(!!a.phone || !!a.website) ||
        a.name.localeCompare(b.name);
  }
}
