import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Editorial photography (free Unsplash licence). Swap for self-hosted images later.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" }],
    qualities: [75],
  },
  async redirects() {
    return [
      // Legacy / alternate URLs → canonical URLs (301)
      { source: "/therapist", destination: "/therapists/", permanent: true },
      { source: "/counselors", destination: "/therapists/", permanent: true },
      { source: "/specialty", destination: "/specialties/", permanent: true },
      { source: "/states", destination: "/locations/", permanent: true },
      { source: "/online", destination: "/online-therapy/", permanent: true },
      { source: "/articles", destination: "/blog/", permanent: true },
    ];
  },
};

export default nextConfig;
