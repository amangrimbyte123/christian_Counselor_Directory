import Link from "next/link";
import { Icon } from "./Icon";

/** What couples search for most (from US keyword research), each linked to the page that answers it. */
const SEARCHES = [
  { label: "Christian couples therapy", href: "/christian-couples-therapy/" },
  { label: "Christian couples therapy near me", href: "/locations/" },
  { label: "Online Christian couples therapy", href: "/online-therapy/" },
  { label: "Christian marriage counseling", href: "/specialties/christian-marriage-counseling/" },
  { label: "Christian couples therapy in Lubbock, TX", href: "/locations/texas/lubbock/" },
  { label: "Christian couples therapy in Tempe, AZ", href: "/locations/arizona/tempe/" },
  { label: "Christian couples therapy in Newport Beach, CA", href: "/locations/california/newport-beach/" },
  { label: "Christian couples therapy in northwest Ohio", href: "/locations/ohio/toledo/" },
  { label: "Christian premarital counseling", href: "/specialties/christian-premarital-counseling/" },
  { label: "Intimacy counseling for Christian couples", href: "/specialties/christian-intimacy-counseling/" },
  { label: "Affair recovery for Christian couples", href: "/specialties/christian-affair-recovery/" },
  { label: "Sex therapy for Christian couples", href: "/blog/sex-therapy-for-christian-couples/" },
  { label: "Christian couples therapy retreats", href: "/blog/christian-couples-therapy-retreats-and-intensives/" },
  { label: "Christian couples therapy books", href: "/blog/christian-couples-therapy-books/" },
];

export function PopularSearches({ exclude, className = "" }: { exclude?: string; className?: string }) {
  const items = SEARCHES.filter((s) => s.href !== exclude);
  return (
    <section aria-labelledby="popular-searches" className={className}>
      <h2 id="popular-searches" className="flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">
        <Icon name="search" className="h-4 w-4 text-brand-700" />What couples are searching for
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="inline-flex rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-sm text-brand-800 hover:bg-brand-50">{s.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
