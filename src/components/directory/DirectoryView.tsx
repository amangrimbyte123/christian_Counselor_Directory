import Link from "next/link";
import type { SearchParams } from "@/types";
import { searchTherapists } from "@/lib/repository";
import { SORT_LABELS, hasActiveFilters, toQueryString } from "@/lib/params";
import { TherapistCard } from "./TherapistCard";
import { FilterPanel } from "./FilterPanel";
import { SortSelect } from "./SortSelect";
import { Pagination } from "@/components/ui/Pagination";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared results UI for /therapists, specialty, location and online pages.
 * `fixed` = filters implied by the page itself (kept out of the URL query);
 * `hide` = filter controls that would be redundant on this page.
 */
export async function DirectoryView({ params, fixed = {}, hide = [], basePath }: {
  params: SearchParams; fixed?: Partial<SearchParams>; hide?: string[]; basePath: string;
}) {
  const result = await searchTherapists({ ...params, ...fixed });
  const filtered = hasActiveFilters(params, hide);
  const qs = (o: Parameters<typeof toQueryString>[1]) => `${basePath}${toQueryString(params, o)}`;

  const sortOptions = (Object.keys(SORT_LABELS) as SearchParams["sort"][]).map((v) => ({
    value: v, label: SORT_LABELS[v], href: qs({ sort: v }),
  }));
  const from = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const to = Math.min(result.page * result.pageSize, result.total);

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
      <div><FilterPanel params={params} basePath={basePath} hide={hide} /></div>
      <section aria-labelledby="results-heading">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="results-heading" className="font-sans text-base font-medium text-ink-700" aria-live="polite">
            {result.total === 0 ? "No counselors found" : <>Showing <strong>{from}–{to}</strong> of <strong>{result.total}</strong> {result.total === 1 ? "counselor" : "counselors"}</>}
          </h2>
          {result.total > 1 && <SortSelect value={params.sort} options={sortOptions} />}
        </div>

        {result.total === 0 ? (
          <div className="rounded-xl2 border border-dashed border-sand-300 bg-white p-8 text-center sm:p-12">
            <Icon name="search" className="mx-auto h-10 w-10 text-brand-600" />
            <h3 className="mt-4 text-2xl">No counselors match those filters</h3>
            <p className="mx-auto mt-2 max-w-md text-ink-600">
              Try removing a filter, checking the spelling of a city or ZIP code, or choosing online sessions, which widens your options.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {filtered && <Link href={basePath} className={buttonClass("primary")}>Clear all filters</Link>}
              <Link href="/online-therapy/" className={buttonClass("secondary")}>Browse online counselors</Link>
              <Link href="/therapists/" className={buttonClass("ghost")}>See all counselors</Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="grid gap-5 sm:grid-cols-2">
              {result.items.map((t) => <li key={t.id}><TherapistCard t={t} /></li>)}
            </ul>
            <Pagination page={result.page} totalPages={result.totalPages} hrefFor={(p) => qs({ page: p })} />
          </>
        )}
      </section>
    </div>
  );
}
