"""
Turn scraped Google Maps listings (output/*/listings.json) into the site's data file.

Keeps only US addresses in counseling-type Google categories, removes duplicates across
keywords (by Google place ID), and writes src/data/listings.json.

Usage:
  python build_site_data.py
"""

import glob
import json
import re
from collections import Counter
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR / "output"
SITE_DATA = SCRIPT_DIR.parent / "src" / "data" / "listings.json"

# Google category -> site profession. Anything not listed here is dropped.
CATEGORIES = {
    "Marriage or relationship counselor": "marriage-family-therapist",
    "Family counselor": "marriage-family-therapist",
    "Psychologist": "psychologist",
    "Social worker": "social-worker",
    "Counselor": "counselor",
    "Psychotherapist": "counselor",
    "EMDR psychotherapist": "counselor",
    "Mental health service": "counselor",
    "Mental health clinic": "counselor",
    "Sexologist": "counselor",
}

US_STATES = {
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
    "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
    "WV", "WI", "WY",
}

# "..., City, ST 12345" (street part optional)
ADDRESS = re.compile(r"^(?:(?P<street>.+),\s*)?(?P<city>[^,]+),\s*(?P<state>[A-Z]{2})\s+(?P<zip>\d{5})(?:-\d{4})?$")

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower().replace("&", " and ").replace("'", "")).strip("-")


def clean_text(text: str) -> str:
    # Google uses narrow no-break and thin spaces in hours ("9 AM–5 PM")
    return re.sub(r"[   ]", " ", text).strip()


def load_places() -> list[dict]:
    seen, places = set(), []
    for path in sorted(glob.glob(str(OUTPUT_DIR / "*" / "listings.json"))):
        for p in json.loads(Path(path).read_text(encoding="utf-8")):
            uid = p.get("placeId") or p.get("cid") or f"{p.get('title')}|{p.get('address')}"
            if uid in seen:
                continue
            seen.add(uid)
            places.append(p)
    return places


def build() -> None:
    places = load_places()
    dropped = Counter()
    listings, slugs = [], Counter()

    for p in places:
        category = p.get("type") or ""
        profession = CATEGORIES.get(category)
        if not profession:
            dropped[f"category: {category or 'none'}"] += 1
            continue
        m = ADDRESS.match(clean_text(p.get("address", "")))
        if not m or m["state"] not in US_STATES:
            dropped["not a US street address"] += 1
            continue

        name = clean_text(p["title"])
        city = m["city"].strip()
        slug = slugify(f"{name} {city}")
        slugs[slug] += 1
        if slugs[slug] > 1:
            slug = f"{slug}-{slugs[slug]}"

        hours = p.get("openingHours") or {}
        listing = {
            "slug": slug,
            "name": name,
            "category": category,
            "profession": profession,
            "address": clean_text(p["address"]),
            "street": m["street"],
            "city": city,
            "cityKey": slugify(city),
            "stateAbbr": m["state"],
            "zip": m["zip"],
            "lat": p.get("latitude"),
            "lng": p.get("longitude"),
            "phone": p.get("phoneNumber"),
            "website": p.get("website"),
            "rating": p.get("rating"),
            "ratingCount": p.get("ratingCount"),
            "hours": [{"day": d, "time": clean_text(hours[d])} for d in DAYS if d in hours] or None,
            "placeId": p.get("placeId"),
            "cid": p.get("cid"),
        }
        listings.append({k: v for k, v in listing.items() if v not in (None, "")})

    listings.sort(key=lambda x: (x["stateAbbr"], x["city"], x["name"]))
    SITE_DATA.write_text(
        json.dumps({"source": "Google Maps via Serper", "builtOn": date.today().isoformat(), "listings": listings},
                   indent=1, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Unique places scraped: {len(places)}")
    print(f"Imported: {len(listings)} -> {SITE_DATA}")
    print("Dropped:")
    for reason, n in dropped.most_common():
        print(f"  {n:4}  {reason}")
    print("By state:", ", ".join(f"{s} {n}" for s, n in Counter(x["stateAbbr"] for x in listings).most_common()))


if __name__ == "__main__":
    build()
