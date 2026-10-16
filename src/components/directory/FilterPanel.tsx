import Link from "next/link";
import type { SearchParams } from "@/types";
import { PROFESSION_LABELS, PROFESSION_OPTIONS, hasActiveFilters } from "@/lib/params";
import { Button } from "@/components/ui/Button";

const label = "mb-1.5 block text-sm font-semibold text-ink-900";
const select = "input";

/**
 * Filter form. Plain GET form → works without JS and produces shareable URLs.
 * `hide` lists filters already fixed by the page (e.g. location on a city page).
 */
function Fields({ params, hide, idp }: { params: SearchParams; hide: string[]; idp: string }) {
  return (
    <>
      <div>
        <label htmlFor={`${idp}q`} className={label}>Name or keyword</label>
        <input id={`${idp}q`} name="q" defaultValue={params.q} placeholder="e.g. practice name" className="input" />
      </div>
      {!hide.includes("location") && (
        <div>
          <label htmlFor={`${idp}location`} className={label}>City, state or ZIP</label>
          <input id={`${idp}location`} name="location" defaultValue={params.location} placeholder="e.g. Lubbock, TX or 79401" className="input" />
        </div>
      )}
      <div>
        <label htmlFor={`${idp}profession`} className={label}>Practice type</label>
        <select id={`${idp}profession`} name="profession" defaultValue={params.profession ?? ""} className={select}>
          <option value="">Any type</option>
          {PROFESSION_OPTIONS.map((p) => <option key={p} value={p}>{PROFESSION_LABELS[p]}</option>)}
        </select>
      </div>
      {params.sort !== "recommended" && <input type="hidden" name="sort" value={params.sort} />}
    </>
  );
}

export function FilterPanel({ params, basePath, hide = [] }: { params: SearchParams; basePath: string; hide?: string[] }) {
  const active = hasActiveFilters(params, hide);
  const form = (idp: string) => (
    <form action={basePath} method="get" className="space-y-4">
      <Fields params={params} hide={hide} idp={idp} />
      <div className="flex items-center gap-3 pt-1">
        <Button type="submit" className="flex-1">Apply filters</Button>
        {active && <Link href={basePath} className="text-sm font-medium text-brand-800 underline underline-offset-2">Clear all</Link>}
      </div>
    </form>
  );
  return (
    <>
      {/* Mobile / tablet: collapsible */}
      <details className="rounded-xl2 border border-sand-200 bg-white p-4 lg:hidden" open={active || undefined}>
        <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
          Filters{active ? " (active)" : ""}
        </summary>
        <div className="mt-4">{form("m-")}</div>
      </details>
      {/* Desktop: sticky rail */}
      <aside aria-label="Filters" className="sticky top-24 hidden rounded-xl2 border border-sand-200 bg-white p-5 lg:block">
        <h2 className="mb-4 font-sans text-base font-semibold">Filter results</h2>
        {form("d-")}
      </aside>
    </>
  );
}
