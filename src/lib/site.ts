export const SITE = {
  name: "Christian Couples Directory",
  tagline: "Find a Christian couples counselor who fits",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  pageSize: 9,
  /** Minimum therapists a state/city needs before it gets an indexable landing page. */
  minForLocationPage: 2,
  demoNotice:
    "Christian Couples Directory is a demonstration. All counselor profiles, credentials and fees shown are fictional sample data and have not been verified.",
} as const;

/** Absolute URL for a site path (paths always end with a trailing slash). */
export const absoluteUrl = (path: string) => `${SITE.url}${path}`;
