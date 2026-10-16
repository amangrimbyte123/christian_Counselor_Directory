export const SITE = {
  name: "Christian Couples Directory",
  tagline: "Find a Christian couples counselor who fits",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://christiancrush.com").replace(/\/$/, ""),
  pageSize: 9,
  /** Minimum practices a state/city needs before it gets an indexable landing page. */
  minForLocationPage: 2,
  /** Shown wherever listings appear: where the data comes from and what has not been checked. */
  dataNotice:
    "Listings come from public Google Maps information and may be out of date. We have not verified licences, faith approach or availability, so please confirm directly with each practice.",
} as const;

/** Absolute URL for a site path (paths always end with a trailing slash). */
export const absoluteUrl = (path: string) => `${SITE.url}${path}`;
