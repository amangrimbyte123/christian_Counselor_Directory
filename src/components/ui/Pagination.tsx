import Link from "next/link";

/** Server-rendered pagination. `hrefFor(page)` builds the URL so filters are preserved. */
export function Pagination({ page, totalPages, hrefFor }: { page: number; totalPages: number; hrefFor: (p: number) => string }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );
  const item = "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium";
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={`${item} border border-sand-300 bg-white hover:bg-brand-50`}>Previous</Link>
      ) : (
        <span className={`${item} text-ink-500`} aria-disabled="true">Previous</span>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1] > 1 && <span aria-hidden="true" className="px-1 text-ink-500">…</span>}
          {p === page ? (
            <span aria-current="page" className={`${item} bg-brand-700 text-white`}>{p}</span>
          ) : (
            <Link href={hrefFor(p)} aria-label={`Page ${p}`} className={`${item} border border-sand-300 bg-white hover:bg-brand-50`}>{p}</Link>
          )}
        </span>
      ))}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={`${item} border border-sand-300 bg-white hover:bg-brand-50`}>Next</Link>
      ) : (
        <span className={`${item} text-ink-500`} aria-disabled="true">Next</span>
      )}
    </nav>
  );
}
