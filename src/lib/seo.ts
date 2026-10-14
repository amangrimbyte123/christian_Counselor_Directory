import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import { hasActiveFilters, toQueryString } from "./params";
import type { SearchParams } from "@/types";

interface MetaInput {
  title: string; // page-specific, the root template appends the site name
  description: string;
  path: string; // canonical path with trailing slash, no query string
  noindex?: boolean;
  type?: "website" | "article";
}

export function buildMetadata({ title, description, path, noindex, type = "website" }: MetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path }, // resolved against metadataBase
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: path, siteName: SITE.name, type },
    twitter: { card: "summary", title, description },
  };
}

export interface Crumb { name: string; href: string }

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.href),
  })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Metadata for list pages: base URL is indexable; filtered/sorted views are noindex with canonical → base. */
export function listingMetadata(opts: { title: string; description: string; path: string; params: SearchParams; ignore?: string[] }): Metadata {
  const thin = hasActiveFilters(opts.params, opts.ignore) || opts.params.sort !== "recommended";
  const title = opts.params.page > 1 ? `${opts.title} (Page ${opts.params.page})` : opts.title;
  return buildMetadata({
    title,
    description: opts.description,
    path: thin ? opts.path : `${opts.path}${toQueryString(opts.params, { page: opts.params.page })}`,
    noindex: thin,
  });
}
