import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { listLocations, listPosts, listSpecialties, listTherapists } from "@/lib/repository";

/** Only indexable, canonical URLs. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [specs, locs, posts, practices] = await Promise.all([listSpecialties(), listLocations(), listPosts(), listTherapists()]);
  const paths = [
    "/", "/christian-couples-therapy/", "/therapists/", "/specialties/", "/locations/", "/online-therapy/", "/blog/",
    "/about/", "/trust-and-safety/", "/for-therapists/", "/contact/",
    ...specs.map((s) => `/specialties/${s.slug}/`),
    ...locs.flatMap((s) => [`/locations/${s.slug}/`, ...s.cities.map((c) => `/locations/${s.slug}/${c.slug}/`)]),
    ...posts.map((p) => `/blog/${p.slug}/`),
    ...practices.map((t) => `/therapists/${t.slug}/`),
  ];
  const modified = new Map(posts.map((p) => [`/blog/${p.slug}/`, new Date(`${p.publishedOn}T00:00:00Z`)]));
  return paths.map((p) => ({ url: absoluteUrl(p), lastModified: modified.get(p) }));
}
