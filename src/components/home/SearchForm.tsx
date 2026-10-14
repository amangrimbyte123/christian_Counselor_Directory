import { listSpecialties } from "@/lib/repository";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const FORMATS = [
  { value: "", label: "Either", icon: "sparkle" },
  { value: "online", label: "Online", icon: "video" },
  { value: "in-person", label: "In person", icon: "home" },
];

/** Homepage search. A plain GET form to /therapists/ so it works without JavaScript. */
export async function SearchForm() {
  const specs = await listSpecialties();
  const label = "mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink-900";
  return (
    <form action="/therapists/" method="get" role="search" aria-label="Find a counselor"
      className="rounded-[1.5rem] border border-sand-200 bg-white p-4 shadow-lift sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hs-specialty" className={label}><Icon name="heart" className="h-4 w-4 text-brand-600" />What would you like help with as a couple?</label>
          <select id="hs-specialty" name="specialty" className="input h-12" defaultValue="">
            <option value="">I&apos;m not sure yet / anything</option>
            {specs.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hs-location" className={label}><Icon name="pin" className="h-4 w-4 text-brand-600" />City, state or ZIP code</label>
          <input id="hs-location" name="location" placeholder="e.g. Austin, TX or 78701" autoComplete="off" className="input h-12" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <fieldset className="min-w-0 flex-1">
          <legend className={label}>How would you like to meet?</legend>
          <div className="grid grid-cols-3 gap-1 rounded-full bg-sand-100 p-1">
            {FORMATS.map((f, i) => (
              <label key={f.label}
                className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full text-sm font-medium text-ink-700 transition-colors hover:text-brand-800 has-[:checked]:bg-white has-[:checked]:text-brand-800 has-[:checked]:shadow-card has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
                <input type="radio" name="format" value={f.value} defaultChecked={i === 0} className="sr-only" />
                <Icon name={f.icon} className="hidden h-4 w-4 sm:block" />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="lg" className="h-12 w-full whitespace-nowrap sm:w-auto">
          <Icon name="search" className="h-5 w-5" /> Find a counselor
        </Button>
      </div>
    </form>
  );
}
