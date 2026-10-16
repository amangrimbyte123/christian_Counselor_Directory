"""
Scrape Google Maps (GMB) listings for every keyword in the keyword CSV using Serper.

For each keyword a folder is created under gmb_scraper/output/<keyword-slug>/ containing:
  - raw_page_<n>.json   raw Serper response per page
  - listings.json       all listings combined
  - listings.csv        all listings flattened to a spreadsheet
  - summary.json        keyword, listing count, scrape time

Usage:
  python scrape_gmb.py                     # all keywords, 1 page each
  python scrape_gmb.py --pages 3           # up to 3 pages (~20 listings/page)
  python scrape_gmb.py --limit 5           # only the first 5 keywords
  python scrape_gmb.py --keyword "christian couples therapy toledo ohio"
  python scrape_gmb.py --force             # re-scrape keywords already done

API key is read from SERPER_API_KEY (environment or gmb_scraper/.env).
"""

import argparse
import csv
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests

SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_CSV = SCRIPT_DIR.parent / "src" / "files" / "google_us_christian-couples-th_matching-terms_2026-10-14_16-41-18.csv"
OUTPUT_DIR = SCRIPT_DIR / "output"
SERPER_URL = "https://google.serper.dev/maps"

CSV_FIELDS = [
    "position", "title", "address", "phoneNumber", "website", "rating", "ratingCount",
    "type", "types", "category", "latitude", "longitude", "priceLevel", "description",
    "openingHours", "thumbnailUrl", "cid", "fid", "placeId", "bookingLinks",
]


def load_api_key() -> str:
    key = os.environ.get("SERPER_API_KEY")
    env_file = SCRIPT_DIR / ".env"
    if not key and env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            if line.strip().startswith("SERPER_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        sys.exit("SERPER_API_KEY not set (add it to gmb_scraper/.env or the environment).")
    return key


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:120] or "keyword"


def read_keywords(csv_path: Path) -> list[str]:
    # Ahrefs exports are sometimes UTF-16; fall back gracefully.
    for enc in ("utf-8-sig", "utf-16"):
        try:
            with open(csv_path, newline="", encoding=enc) as f:
                rows = list(csv.DictReader(f, delimiter="\t" if enc == "utf-16" else ","))
            break
        except UnicodeError:
            continue
    seen, keywords = set(), []
    for row in rows:
        kw = (row.get("Keyword") or "").strip()
        if kw and kw.lower() not in seen:
            seen.add(kw.lower())
            keywords.append(kw)
    return keywords


def fetch_page(session: requests.Session, keyword: str, page: int, gl: str, hl: str, ll: str | None = None) -> dict:
    payload = {"q": keyword, "gl": gl, "hl": hl, "page": page}
    # Serper requires a GPS location for page > 1; page 1 returns one in its "ll" field.
    if ll:
        payload["ll"] = ll
    for attempt in range(3):
        try:
            resp = session.post(SERPER_URL, json=payload, timeout=30)
            if resp.status_code == 429:
                time.sleep(5 * (attempt + 1))
                continue
            if resp.status_code >= 400:
                msg = resp.json().get("message", resp.text) if resp.headers.get("content-type", "").startswith("application/json") else resp.text
                if "credit" in msg.lower() or resp.status_code in (401, 403):
                    sys.exit(f"Serper API error: {msg}")
                raise requests.HTTPError(f"{resp.status_code}: {msg}")
            return resp.json()
        except requests.RequestException as e:
            # 4xx means the request itself is wrong; retrying won't help.
            if attempt == 2 or str(e).startswith("4"):
                raise
            print(f"    retry {attempt + 1} after error: {e}")
            time.sleep(2 * (attempt + 1))
    return {}


def to_csv_value(value):
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False)
    return value


def scrape_keyword(session, keyword: str, pages: int, gl: str, hl: str, force: bool) -> int:
    folder = OUTPUT_DIR / slugify(keyword)
    if (folder / "summary.json").exists() and not force:
        count = json.loads((folder / "summary.json").read_text(encoding="utf-8")).get("total_listings", 0)
        print(f"  skip (already scraped, {count} listings)")
        return count

    folder.mkdir(parents=True, exist_ok=True)
    listings, seen_ids = [], set()

    ll = None
    for page in range(1, pages + 1):
        try:
            data = fetch_page(session, keyword, page, gl, hl, ll)
        except requests.RequestException as e:
            if page == 1:
                raise
            print(f"  page {page} failed, keeping earlier pages: {e}")
            break
        ll = ll or data.get("ll")
        if page == 1 and pages > 1 and not ll:
            print("  no location returned on page 1; cannot paginate")
            pages = 1
        (folder / f"raw_page_{page}.json").write_text(
            json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        places = data.get("places", [])
        new = 0
        for place in places:
            uid = place.get("cid") or place.get("placeId") or f"{place.get('title')}|{place.get('address')}"
            if uid in seen_ids:
                continue
            seen_ids.add(uid)
            place["position"] = len(listings) + 1
            listings.append(place)
            new += 1
        print(f"  page {page}: {len(places)} places ({new} new)")
        if not places or new == 0:
            break
        time.sleep(0.5)

    (folder / "listings.json").write_text(json.dumps(listings, indent=2, ensure_ascii=False), encoding="utf-8")

    extra = sorted({k for p in listings for k in p} - set(CSV_FIELDS))
    with open(folder / "listings.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS + extra, extrasaction="ignore")
        writer.writeheader()
        for p in listings:
            writer.writerow({k: to_csv_value(p.get(k, "")) for k in CSV_FIELDS + extra})

    summary = {
        "keyword": keyword,
        "total_listings": len(listings),
        "pages_requested": pages,
        "gl": gl,
        "hl": hl,
        "scraped_at": datetime.now(timezone.utc).isoformat(),
    }
    (folder / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return len(listings)


def main():
    parser = argparse.ArgumentParser(description="Scrape GMB listings for keywords via Serper Maps API")
    parser.add_argument("--csv", type=Path, default=DEFAULT_CSV, help="Keyword CSV (needs a 'Keyword' column)")
    parser.add_argument("--keyword", action="append", help="Scrape this keyword instead of the CSV (repeatable)")
    parser.add_argument("--pages", type=int, default=1, help="Pages per keyword (~20 listings each)")
    parser.add_argument("--limit", type=int, help="Only scrape the first N keywords")
    parser.add_argument("--gl", default="us", help="Country code")
    parser.add_argument("--hl", default="en", help="Language code")
    parser.add_argument("--force", action="store_true", help="Re-scrape keywords that already have output")
    args = parser.parse_args()

    keywords = args.keyword or read_keywords(args.csv)
    if args.limit:
        keywords = keywords[: args.limit]

    session = requests.Session()
    session.headers.update({"X-API-KEY": load_api_key(), "Content-Type": "application/json"})
    OUTPUT_DIR.mkdir(exist_ok=True)

    index = []
    for i, kw in enumerate(keywords, 1):
        print(f"[{i}/{len(keywords)}] {kw}")
        try:
            count = scrape_keyword(session, kw, args.pages, args.gl, args.hl, args.force)
            print(f"  found {count} listings -> output/{slugify(kw)}/")
            index.append({"keyword": kw, "folder": slugify(kw), "total_listings": count})
        except Exception as e:
            print(f"  FAILED: {e}")
            index.append({"keyword": kw, "folder": slugify(kw), "error": str(e)})

    # Rebuild the index from every scraped folder so partial runs don't drop earlier keywords.
    rows = {r["folder"]: r for r in index if "error" in r}
    for summary_file in OUTPUT_DIR.glob("*/summary.json"):
        s = json.loads(summary_file.read_text(encoding="utf-8"))
        rows[summary_file.parent.name] = {"keyword": s["keyword"], "folder": summary_file.parent.name, "total_listings": s["total_listings"]}
    with open(OUTPUT_DIR / "_index.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["keyword", "folder", "total_listings", "error"])
        writer.writeheader()
        writer.writerows(sorted(rows.values(), key=lambda r: r["keyword"]))
    print(f"\nDone. {len(index)} keywords. Index: {OUTPUT_DIR / '_index.csv'}")


if __name__ == "__main__":
    main()
