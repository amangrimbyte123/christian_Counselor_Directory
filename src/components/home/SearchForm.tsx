import { PROFESSION_LABELS, PROFESSION_OPTIONS } from "@/lib/params";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/** Homepage search. A plain GET form to /therapists/ so it works without JavaScript. */
export function SearchForm() {
  const label = "mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink-900";
  return (
    <form action="/therapists/" method="get" role="search" aria-label="Find a counselor"
      className="rounded-[1.5rem] border border-sand-200 bg-white p-4 shadow-lift sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hs-location" className={label}><Icon name="pin" className="h-4 w-4 text-brand-600" />City, state or ZIP code</label>
          <input id="hs-location" name="location" placeholder="e.g. Lubbock, TX or 79401" autoComplete="off" className="input h-12" />
        </div>
        <div>
          <label htmlFor="hs-profession" className={label}><Icon name="users" className="h-4 w-4 text-brand-600" />Type of practice</label>
          <select id="hs-profession" name="profession" className="input h-12" defaultValue="">
            <option value="">Any type</option>
            {PROFESSION_OPTIONS.map((p) => <option key={p} value={p}>{PROFESSION_LABELS[p]}</option>)}
          </select>
        </div>
      </div>
      <Button type="submit" size="lg" className="mt-4 h-12 w-full whitespace-nowrap">
        <Icon name="search" className="h-5 w-5" /> Find a counselor
      </Button>
    </form>
  );
}
