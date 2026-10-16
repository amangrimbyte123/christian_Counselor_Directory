import type { Therapist } from "@/types";

/** Google Maps link for a practice: its place page when we have the ID, otherwise an address search. */
export function mapsUrl(t: Pick<Therapist, "name" | "address" | "placeId">) {
  const q = encodeURIComponent(`${t.name}, ${t.address}`);
  return t.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${t.placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** "(806) 555-0100" → "tel:+18065550100" */
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")}`;

/** Bare domain for display, e.g. "example.com". */
export function websiteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
