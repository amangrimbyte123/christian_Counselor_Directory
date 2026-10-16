import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { Faq } from "@/components/ui/Misc";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, listingMetadata } from "@/lib/seo";
import type { City, State } from "@/types";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { getCity, listLocations, listSpecialties } from "@/lib/repository";

const cityFaqs = (city: City, state: State) => {
  const place = city.areaLabel ?? city.name;
  return [
    { q: `How do we find Christian couples therapy in ${place}?`, a: `Browse the practices listed above, open one to see its hours and contact details, and call to ask about a first conversation. Ask each counselor how they integrate faith and whether they are licensed in ${state.name}.` },
    { q: `Can we have online sessions with a counselor in ${state.name}?`, a: `Yes, many practices offer secure video sessions. They generally need to be licensed in ${state.name} if you are in ${state.name} during the session, so check before you book.` },
    { q: `How much does couples therapy cost in ${city.name}?`, a: `Fees vary by profession and experience, so ask each practice when you call. Some offer a sliding scale or a free first call. Ask your insurer whether couples sessions are covered.` },
    { q: "Do we both need to share the same faith?", a: "No. A good counselor asks how much faith each of you wants in sessions and makes room for both partners, including when you see faith differently." },
  ];
};

type Props = { params: Promise<{ state: string; city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateStaticParams() {
  return (await listLocations()).flatMap((s) => s.cities.map((c) => ({ state: s.slug, city: c.slug })));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const found = await getCity(state, city);
  if (!found) return { title: "Location not found", robots: { index: false } };
  return listingMetadata({
    title: found.city.areaLabel ? `Christian Couples Therapy in ${found.city.areaLabel}` : `Christian Couples Therapy in ${found.city.name}, ${found.state.abbr}: Counselors`,
    description: `Looking for Christian couples therapy in ${found.city.name}? Compare ${found.city.count} counseling practices in ${found.city.name}, ${found.state.name}, with Google ratings, phone numbers, hours and directions.`,
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
  const place = found.city.areaLabel ?? `${found.city.name}, ${found.state.abbr}`;
  const faqs = cityFaqs(found.city, found.state);
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        crumbs={[
          { name: "Locations", href: "/locations/" },
          { name: found.state.name, href: `/locations/${state}/` },
          { name: found.city.name, href: `/locations/${state}/${city}/` },
        ]}
        title={`Christian couples therapy in ${place}`}
        intro={<>
          <p>{found.city.count} counseling practices for Christian couples therapy and marriage counseling in {found.city.name}. Compare ratings and locations, then call or visit their website to ask about availability.</p>
          {found.city.blurb && <p className="mt-2">{found.city.blurb}</p>}
        </>}
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
              <Link href="/christian-couples-therapy/" className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm hover:bg-brand-50">About Christian couples therapy</Link>
            </p>
          </section>
        </div>
        <section className="mt-14 max-w-3xl" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-3xl">Christian couples therapy in {found.city.name}: common questions</h2>
          <Faq items={faqs} />
        </section>
      </div>
    </>
  );
}
