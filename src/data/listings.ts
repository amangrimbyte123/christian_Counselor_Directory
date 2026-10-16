import data from "./listings.json";

/** One practice as written by gmb_scraper/build_site_data.py. */
export interface RawListing {
  slug: string;
  name: string;
  category: string;
  profession: string;
  address: string;
  street?: string;
  city: string;
  cityKey: string;
  stateAbbr: string;
  zip?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  rating?: number;
  ratingCount?: number;
  hours?: { day: string; time: string }[];
  placeId?: string;
  cid?: string;
}

export const rawListings = data.listings as RawListing[];
export const LISTINGS_SOURCE = { name: data.source, builtOn: data.builtOn };
