import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { listingMetadata } from "@/lib/seo";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { getCity, listLocations, listSpecialties } from "@/lib/repository";

type Props = { params: Promise<{ state: string; city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateStaticParams() {
  return (await listLocations()).flatMap((s) => s.cities.map((c) => ({ state: s.slug, city: c.slug })));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const found = await getCity(state, city);
  if (!found) return { title: "Location not found", robots: { index: false } };
  return listingMetadata({
    title: `Christian Couples Counselors in ${found.city.name}, ${found.state.abbr}`,
    description: `Browse ${found.city.count} sample therapists in ${found.city.name}, ${found.state.name}. Filter by specialty, language, fee and online or in-person sessions.`,
    path: `/locations/${state}/${city}/`,
    params: parseSearchParams(await searchParams),
  });
}

export default async function CityPage({ params, searchParams }: Props) {
  const { state, city } = await params;
  const found = await getCity(state, city);
  if (!found) notFound();
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`/locations/${state}/${city}/${clean}`);
  const sp = parseSearchParams(raw);
  const specs = (await listSpecialties()).slice(0, 8);
  const neighbors = found.state.cities.filter((c) => c.slug !== city);
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Locations", href: "/locations/" },
          { name: found.state.name, href: `/locations/${state}/` },
          { name: found.city.name, href: `/locations/${state}/${city}/` },
        ]}
        title={`Christian couples counselors in ${found.city.name}, ${found.state.abbr}`}
        intro={`${found.city.count} sample profiles in ${found.city.name}. Compare services, fees and availability, then open a profile to request an appointment.`}
      />
      <div className="container-page py-10">
        <DirectoryView params={sp} fixed={{ state, city }} hide={["location"]} basePath={`/locations/${state}/${city}/`} />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="by-spec">
            <h2 id="by-spec" className="text-2xl">Popular services</h2>
            <p className="mt-3 flex flex-wrap gap-2">
              {specs.map((s) => <Link key={s.slug} href={`/specialties/${s.slug}/`} className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm text-brand-800 hover:bg-brand-100">{s.name}</Link>)}
            </p>
          </section>
          <section aria-labelledby="nearby">
            <h2 id="nearby" className="text-2xl">More in {found.state.name}</h2>
            <p className="mt-3 flex flex-wrap gap-2">
              <Link href={`/locations/${state}/`} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm hover:bg-brand-50">All of {found.state.name}</Link>
              {neighbors.map((c) => <Link key={c.slug} href={`/locations/${state}/${c.slug}/`} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm hover:bg-brand-50">{c.name}</Link>)}
              <Link href="/online-therapy/" className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm hover:bg-brand-50">Online counseling</Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
