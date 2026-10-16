import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { listLocations, listPosts, listSpecialties } from "@/lib/repository";

/**
 * Only indexable, canonical URLs. Demo therapist profiles are `noindex`, so they are
 * intentionally excluded; add them back (via listTherapists) once real, verified data is used.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [specs, locs, posts] = await Promise.all([listSpecialties(), listLocations(), listPosts()]);
  const paths = [
    "/", "/christian-couples-therapy/", "/therapists/", "/specialties/", "/locations/", "/online-therapy/", "/blog/",
    "/about/", "/trust-and-safety/", "/for-therapists/", "/contact/",
    ...specs.map((s) => `/specialties/${s.slug}/`),
    ...locs.flatMap((s) => [`/locations/${s.slug}/`, ...s.cities.map((c) => `/locations/${s.slug}/${c.slug}/`)]),
    ...posts.map((p) => `/blog/${p.slug}/`),
  ];
  const modified = new Map(posts.map((p) => [`/blog/${p.slug}/`, new Date(`${p.publishedOn}T00:00:00Z`)]));
  return paths.map((p) => ({ url: absoluteUrl(p), lastModified: modified.get(p) }));
}
