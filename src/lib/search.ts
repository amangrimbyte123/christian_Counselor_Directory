import type { SearchParams, SearchResult, Therapist } from "@/types";
import { cities, states } from "@/data/locations";
import { specialties } from "@/data/specialties";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;
const stateOf = (slug: string) => states.find((s) => s.slug === slug);

/** Pure filter/sort/paginate over an in-memory list. A database adapter can replace this wholesale. */
export function searchList(all: Therapist[], p: SearchParams, pageSize: number): SearchResult {
  const q = p.q ? norm(p.q) : "";
  const loc = p.location ? norm(p.location) : "";
  // US ZIP (12345 or 12345-6789): resolve to a city by its 3-digit prefix
  const zip = /^(\d{5})(-\d{4})?$/.exec(loc)?.[1];
  const zipCity = zip ? (cities.find((c) => c.zipPrefixes?.includes(zip.slice(0, 3)))?.slug ?? null) : undefined;

  const matched = all.filter((t) => {
    if (p.state && t.state !== p.state) return false;
    if (p.city && t.city !== p.city && !t.serviceAreas.includes(p.city)) return false;
    if (p.specialty && !t.specialties.includes(p.specialty)) return false;
    if (p.approach && !t.approaches.includes(p.approach)) return false;
    if (p.language && !t.languages.includes(p.language)) return false;
    if (p.profession && t.profession !== p.profession) return false;
    if (p.format && !t.formats.includes(p.format)) return false;
    if (p.maxFee && t.feeMin > p.maxFee) return false;

    if (zipCity !== undefined) {
      // A ZIP we can't place matches nobody, so the empty state explains it
      if (!zipCity || (t.city !== zipCity && !t.serviceAreas.includes(zipCity))) return false;
    } else if (loc) {
      const st = stateOf(t.state);
      const places = [t.city, ...t.serviceAreas].map(cityName);
      const hay = [...places, st?.name ?? "", st?.abbr ?? ""].map(norm);
      // "Los Angeles, CA" style input: every comma/space-separated chunk must match something
      const parts = loc.split(/[,]+/).map((x) => x.trim()).filter(Boolean);
      if (!parts.every((part) => hay.some((h) => h === part || h.includes(part)))) return false;
    }

    if (q) {
      const hay = norm(
        [
          t.name, t.credentials, t.title, t.statement,
          ...t.specialties.map((s) => specialties.find((x) => x.slug === s)?.name ?? s),
        ].join(" "),
      );
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  const sorted = [...matched].sort(compare(p.sort));
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(p.page, totalPages);
  return { items: sorted.slice((page - 1) * pageSize, page * pageSize), total, page, pageSize, totalPages };
}

function compare(sort: SearchParams["sort"]) {
  switch (sort) {
    case "name": return (a: Therapist, b: Therapist) => a.name.localeCompare(b.name);
    case "fee-low": return (a: Therapist, b: Therapist) => a.feeMin - b.feeMin || a.name.localeCompare(b.name);
    case "fee-high": return (a: Therapist, b: Therapist) => b.feeMax - a.feeMax || a.name.localeCompare(b.name);
    case "experience": return (a: Therapist, b: Therapist) => b.yearsExperience - a.yearsExperience || a.name.localeCompare(b.name);
    default:
      // Recommended: available first, featured next, then experience (stable, deterministic)
      return (a: Therapist, b: Therapist) =>
        Number(b.acceptingClients) - Number(a.acceptingClients) ||
        Number(b.featured) - Number(a.featured) ||
        b.yearsExperience - a.yearsExperience ||
        a.name.localeCompare(b.name);
  }
}
