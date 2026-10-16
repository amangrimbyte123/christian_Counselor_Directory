import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { listingMetadata } from "@/lib/seo";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { getState, listLocations } from "@/lib/repository";

type Props = { params: Promise<{ state: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateStaticParams() {
  return (await listLocations()).map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const s = await getState((await params).state);
  if (!s) return { title: "Location not found", robots: { index: false } };
  return listingMetadata({
    title: `Christian Couples Therapy in ${s.name}: Counselors`,
    description: `Browse ${s.count} Christian couples and marriage counseling practices in ${s.name}${s.cities.length ? `, including ${s.cities.slice(0, 3).map((c) => c.name).join(", ")}` : ""}. Google ratings, phone numbers and directions.`,
    path: `/locations/${s.slug}/`,
    params: parseSearchParams(await searchParams),
  });
}

export default async function StatePage({ params, searchParams }: Props) {
  const s = await getState((await params).state);
  if (!s) notFound();
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`/locations/${s.slug}/${clean}`);
  const sp = parseSearchParams(raw);
  return (
    <>
      <PageHeader crumbs={[{ name: "Locations", href: "/locations/" }, { name: s.name, href: `/locations/${s.slug}/` }]}
        title={`Christian couples therapy in ${s.name}`}
        intro={`${s.count} counseling practices for Christian couples therapy in ${s.name}. Choose a city, or filter the full list below. Many practices also offer online sessions, so ask when you call.`}>
        <ul className="flex flex-wrap gap-2" aria-label={`Cities in ${s.name}`}>
          {s.cities.map((c) => (
            <li key={c.slug}><Link href={`/locations/${s.slug}/${c.slug}/`} className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800 hover:bg-brand-50">{c.name} ({c.count})</Link></li>
          ))}
        </ul>
      </PageHeader>
      <div className="container-page py-10">
        <DirectoryView params={sp} fixed={{ state: s.slug }} hide={["location"]} basePath={`/locations/${s.slug}/`} />
      </div>
    </>
  );
}
