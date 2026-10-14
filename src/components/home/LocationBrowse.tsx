import Link from "next/link";
import type { StateSummary } from "@/lib/repository";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";

export function LocationBrowse({ states }: { states: StateSummary[] }) {
  const cities = states
    .flatMap((s) => s.cities.map((c) => ({ ...c, state: s })))
    .sort((a, b) => b.count - a.count)
    .slice(0, 9); // 1 large tile (2x2) + 8 small fills a 4-column grid

  return (
    <section className="section bg-sand-100" aria-labelledby="locations">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div data-reveal>
          <SectionHeading id="locations" eyebrow="Near you" title="Browse therapists by location"
            intro="Prefer to meet in person? Start with your state or city. Many therapists also see clients online across their state. Counts reflect sample data." />
          <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-wider text-ink-700">States</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {states.map((s) => (
              <li key={s.slug}>
                <Link href={`/locations/${s.slug}/`} className="chip">
                  {s.name} <span className="text-xs text-ink-500">{s.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/locations/" className="link-arrow mt-6">All locations <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>

        <div data-reveal>
          <h3 className="sr-only">Popular cities</h3>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {cities.map((c, i) => (
              <li key={c.slug} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
                <Link href={`/locations/${c.state.slug}/${c.slug}/`}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl2 border border-sand-200 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-5 ${i === 0 ? "min-h-[10rem] bg-brand-800 text-white" : "min-h-[7.5rem] bg-white"}`}>
                  <Icon name="pin" className={`h-5 w-5 ${i === 0 ? "text-brand-200" : "text-brand-600"}`} />
                  <span>
                    <span className={`block font-serif leading-tight ${i === 0 ? "text-3xl" : "text-lg text-ink-900 group-hover:text-brand-800"}`}>{c.name}</span>
                    <span className={`mt-1 flex items-center justify-between text-xs ${i === 0 ? "text-brand-100" : "text-ink-500"}`}>
                      {c.state.abbr} · {c.count} {i === 0 ? "sample therapists" : "listed"}
                      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
