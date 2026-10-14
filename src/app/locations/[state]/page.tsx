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
    title: `Therapists and Counselors in ${s.name}`,
    description: `Browse ${s.count} sample therapists in ${s.name}${s.cities.length ? `, including ${s.cities.slice(0, 3).map((c) => c.name).join(", ")}` : ""}. Filter by specialty, language and session type.`,
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
        title={`Therapists and counselors in ${s.name}`}
        intro={`${s.count} sample profiles in ${s.name}. Choose a city, or filter the full list below. Online sessions are also available from many therapists.`}>
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
