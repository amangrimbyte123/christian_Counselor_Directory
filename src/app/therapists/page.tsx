import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { buildMetadata } from "@/lib/seo";
import { cleanQueryRedirect, hasActiveFilters, parseSearchParams, toQueryString } from "@/lib/params";
import { listTherapists } from "@/lib/repository";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = parseSearchParams(await searchParams);
  // Filtered / sorted views are for people, not search engines: noindex, canonical to the base page.
  const thin = hasActiveFilters(p) || p.sort !== "recommended";
  return buildMetadata({
    title: p.page > 1 ? `Browse Christian Couples Counselors (Page ${p.page})` : "Browse Christian Couples Counselors",
    description: "Search and filter Christian couples and marriage counselors by service, location, session type, language and fee.",
    path: thin ? "/therapists/" : `/therapists/${toQueryString(p, { page: p.page })}`,
    noindex: thin,
  });
}

export default async function TherapistsPage({ searchParams }: Props) {
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`/therapists/${clean}`);
  const params = parseSearchParams(raw);
  const total = (await listTherapists()).length;
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Counselors", href: "/therapists/" }]}
        title="Find a counselor who fits"
        intro={`Browse ${total} sample profiles. Narrow by service, location, session type, language and fee, then open a profile to request an appointment.`}
      />
      <div className="container-page py-8 sm:py-10">
        <DirectoryView params={params} basePath="/therapists/" />
      </div>
    </>
  );
}
