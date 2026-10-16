import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import { hasActiveFilters, toQueryString } from "./params";
import type { ImageRef, SearchParams } from "@/types";

/** Default share image: a site photo cropped to the 1200x630 Open Graph size. */
const SHARE_IMAGE: ImageRef = {
  src: "https://images.unsplash.com/photo-1604881990409-b9f246db39da?auto=format&fit=crop&w=1200&h=630&q=80",
  alt: "Two people holding hands across a table: Christian couples therapy and marriage counseling",
};

interface MetaInput {
  title: string; // page-specific, the root template appends the site name
  description: string;
  path: string; // canonical path with trailing slash, no query string
  noindex?: boolean;
  type?: "website" | "article";
  image?: ImageRef;
}

export function buildMetadata({ title, description, path, noindex, type = "website", image = SHARE_IMAGE }: MetaInput): Metadata {
  const images = [{ url: image.src, width: 1200, height: 630, alt: image.alt }];
  return {
    title,
    description,
    alternates: { canonical: path }, // resolved against metadataBase
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: path, siteName: SITE.name, type, images },
    twitter: { card: "summary_large_image", title, description, images },
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
