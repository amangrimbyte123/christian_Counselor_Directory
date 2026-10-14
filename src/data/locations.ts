import type { City, State } from "@/types";

export const states: State[] = [
  { slug: "california", name: "California", abbr: "CA", region: "West" },
  { slug: "washington", name: "Washington", abbr: "WA", region: "West" },
  { slug: "colorado", name: "Colorado", abbr: "CO", region: "West" },
  { slug: "texas", name: "Texas", abbr: "TX", region: "South" },
  { slug: "florida", name: "Florida", abbr: "FL", region: "South" },
  { slug: "georgia", name: "Georgia", abbr: "GA", region: "South" },
  { slug: "illinois", name: "Illinois", abbr: "IL", region: "Midwest" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", region: "Midwest" },
  { slug: "new-york", name: "New York", abbr: "NY", region: "Northeast" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", region: "Northeast" },
];

export const cities: City[] = [
  { slug: "los-angeles", name: "Los Angeles", stateSlug: "california", zipPrefixes: ["900", "901"] },
  { slug: "san-francisco", name: "San Francisco", stateSlug: "california", zipPrefixes: ["941"] },
  { slug: "san-diego", name: "San Diego", stateSlug: "california", zipPrefixes: ["919", "920", "921"] },
  { slug: "seattle", name: "Seattle", stateSlug: "washington", zipPrefixes: ["981"] },
  { slug: "denver", name: "Denver", stateSlug: "colorado", zipPrefixes: ["802"] },
  { slug: "austin", name: "Austin", stateSlug: "texas", zipPrefixes: ["787"] },
  { slug: "houston", name: "Houston", stateSlug: "texas", zipPrefixes: ["770", "772"] },
  { slug: "miami", name: "Miami", stateSlug: "florida", zipPrefixes: ["331", "332"] },
  { slug: "atlanta", name: "Atlanta", stateSlug: "georgia", zipPrefixes: ["303"] },
  { slug: "chicago", name: "Chicago", stateSlug: "illinois", zipPrefixes: ["606", "607", "608"] },
  { slug: "minneapolis", name: "Minneapolis", stateSlug: "minnesota", zipPrefixes: ["554"] },
  { slug: "new-york", name: "New York", stateSlug: "new-york", zipPrefixes: ["100", "101", "102"] },
  { slug: "brooklyn", name: "Brooklyn", stateSlug: "new-york", zipPrefixes: ["112"] },
  { slug: "boston", name: "Boston", stateSlug: "massachusetts", zipPrefixes: ["021", "022"] },
];
