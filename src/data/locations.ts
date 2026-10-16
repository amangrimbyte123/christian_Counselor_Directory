import type { City, State } from "@/types";
import { rawListings } from "./listings";

export const states: State[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", region: "South" },
  { slug: "alaska", name: "Alaska", abbr: "AK", region: "West" },
  { slug: "arizona", name: "Arizona", abbr: "AZ", region: "West" },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", region: "South" },
  { slug: "california", name: "California", abbr: "CA", region: "West" },
  { slug: "colorado", name: "Colorado", abbr: "CO", region: "West" },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", region: "Northeast" },
  { slug: "delaware", name: "Delaware", abbr: "DE", region: "South" },
  { slug: "district-of-columbia", name: "District of Columbia", abbr: "DC", region: "South" },
  { slug: "florida", name: "Florida", abbr: "FL", region: "South" },
  { slug: "georgia", name: "Georgia", abbr: "GA", region: "South" },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", region: "West" },
  { slug: "idaho", name: "Idaho", abbr: "ID", region: "West" },
  { slug: "illinois", name: "Illinois", abbr: "IL", region: "Midwest" },
  { slug: "indiana", name: "Indiana", abbr: "IN", region: "Midwest" },
  { slug: "iowa", name: "Iowa", abbr: "IA", region: "Midwest" },
  { slug: "kansas", name: "Kansas", abbr: "KS", region: "Midwest" },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", region: "South" },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", region: "South" },
  { slug: "maine", name: "Maine", abbr: "ME", region: "Northeast" },
  { slug: "maryland", name: "Maryland", abbr: "MD", region: "South" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", region: "Northeast" },
  { slug: "michigan", name: "Michigan", abbr: "MI", region: "Midwest" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", region: "Midwest" },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", region: "South" },
  { slug: "missouri", name: "Missouri", abbr: "MO", region: "Midwest" },
  { slug: "montana", name: "Montana", abbr: "MT", region: "West" },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", region: "Midwest" },
  { slug: "nevada", name: "Nevada", abbr: "NV", region: "West" },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", region: "Northeast" },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", region: "Northeast" },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", region: "West" },
  { slug: "new-york", name: "New York", abbr: "NY", region: "Northeast" },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", region: "South" },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", region: "Midwest" },
  { slug: "ohio", name: "Ohio", abbr: "OH", region: "Midwest" },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", region: "South" },
  { slug: "oregon", name: "Oregon", abbr: "OR", region: "West" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", region: "Northeast" },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", region: "Northeast" },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", region: "South" },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", region: "Midwest" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", region: "South" },
  { slug: "texas", name: "Texas", abbr: "TX", region: "South" },
  { slug: "utah", name: "Utah", abbr: "UT", region: "West" },
  { slug: "vermont", name: "Vermont", abbr: "VT", region: "Northeast" },
  { slug: "virginia", name: "Virginia", abbr: "VA", region: "South" },
  { slug: "washington", name: "Washington", abbr: "WA", region: "West" },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", region: "South" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", region: "Midwest" },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", region: "West" },
];

/** Hand-written extras for cities we target by name. Merged onto the cities found in the data. */
const CITY_EXTRAS: Record<string, Partial<City> & { stateSlug: string }> = {
  "newport-beach": { stateSlug: "california",
    blurb: "Couples in Newport Beach and across Orange County can meet a counselor in person or ask about online sessions with a California-licensed counselor, which helps when work and commutes make evenings tight." },
  tempe: { stateSlug: "arizona",
    blurb: "Tempe and the wider Phoenix East Valley, including Mesa, Chandler and Gilbert, have a mix of counseling practices. Many couples here are students or young professionals, so premarital and newlywed counseling are common requests." },
  lubbock: { stateSlug: "texas",
    blurb: "In Lubbock and across the South Plains, many couples look for a counselor who shares or respects their church background. If you live outside town, ask practices whether they offer online sessions with a Texas-licensed counselor." },
  toledo: { stateSlug: "ohio", areaLabel: "Toledo & Northwest Ohio",
    blurb: "Couples in Toledo and northwest Ohio, including Perrysburg, Maumee and Sylvania, can find practices below. Call or visit each website to ask how they include faith in couples sessions." },
};

/** Suburbs listed on a bigger city's page too (city slug → cities it also appears under). */
export const METRO: Record<string, string[]> = {
  perrysburg: ["toledo"],
  maumee: ["toledo"],
  sylvania: ["toledo"],
  "bowling-green": ["toledo"],
};

const stateByAbbr = new Map(states.map((s) => [s.abbr, s]));

/** One City per (state, city) found in the imported listings. */
export const cities: City[] = (() => {
  const out = new Map<string, City>();
  for (const l of rawListings) {
    const st = stateByAbbr.get(l.stateAbbr);
    if (!st) continue;
    const key = `${st.slug}/${l.cityKey}`;
    const city = out.get(key) ?? { slug: l.cityKey, name: l.city, stateSlug: st.slug, zipPrefixes: [] };
    const prefix = l.zip?.slice(0, 3);
    if (prefix && !city.zipPrefixes!.includes(prefix)) city.zipPrefixes!.push(prefix);
    out.set(key, city);
  }
  for (const [slug, extra] of Object.entries(CITY_EXTRAS)) {
    const key = `${extra.stateSlug}/${slug}`;
    const city = out.get(key);
    if (city) out.set(key, { ...city, ...extra });
  }
  return [...out.values()];
})();
