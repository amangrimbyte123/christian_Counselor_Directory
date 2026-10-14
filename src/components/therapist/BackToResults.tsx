"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

/**
 * Returns to the exact results page (filters + page) the visitor came from when the
 * previous page was a listing on this site; otherwise falls back to the full directory.
 */
export function BackToResults() {
  const router = useRouter();
  return (
    <Link
      href="/therapists/"
      onClick={(e) => {
        try {
          const ref = new URL(document.referrer);
          const fromListing = ref.origin === location.origin && /^\/(therapists\/(\?.*)?|specialties\/|locations\/|online-therapy\/)/.test(ref.pathname + ref.search);
          if (fromListing && history.length > 1) {
            e.preventDefault();
            router.back();
          }
        } catch {
          /* no referrer: follow the link */
        }
      }}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-800 hover:underline"
    >
      <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to results
    </Link>
  );
}
