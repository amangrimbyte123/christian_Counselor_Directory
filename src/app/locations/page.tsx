import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { listLocations } from "@/lib/repository";

export const metadata = buildMetadata({
  title: "Find Christian Couples Counselors by State and City",
  description: "Browse Christian couples counselors by state and city, or choose online counseling to see everyone offering video sessions.",
  path: "/locations/",
});

const REGIONS = ["West", "Midwest", "South", "Northeast"] as const;

export default async function LocationsPage() {
  const states = await listLocations();
  return (
    <>
      <PageHeader crumbs={[{ name: "Locations", href: "/locations/" }]} title="Find Christian couples counselors by location"
        intro="Choose a state to see its cities. Only locations with at least two sample profiles are listed. Prefer not to travel? Online couples counseling works from anywhere a counselor is licensed to practice." />
      <div className="container-page space-y-12 py-10">
        <Link href="/online-therapy/" className="flex items-center justify-between rounded-xl2 border border-brand-200 bg-brand-50 p-5 text-brand-800 hover:bg-brand-100">
          <span><strong className="block text-lg">Looking for online counseling?</strong>See every counselor offering video sessions.</span>
          <span aria-hidden="true">→</span>
        </Link>
        {REGIONS.map((r) => {
          const inRegion = states.filter((s) => s.region === r);
          if (!inRegion.length) return null;
          return (
            <section key={r} aria-labelledby={`r-${r}`}>
              <h2 id={`r-${r}`} className="text-3xl">{r}</h2>
              <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {inRegion.map((s) => (
                  <li key={s.slug} className="rounded-xl2 border border-sand-200 bg-white p-5 shadow-card">
                    <h3 className="text-xl"><Link className="hover:text-brand-800 hover:underline" href={`/locations/${s.slug}/`}>{s.name}</Link></h3>
                    <p className="text-sm text-ink-600">{s.count} sample counselors</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.cities.map((c) => (
                        <li key={c.slug}><Link href={`/locations/${s.slug}/${c.slug}/`} className="inline-flex rounded-full border border-sand-300 px-3 py-1 text-sm hover:bg-brand-50">{c.name} ({c.count})</Link></li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
