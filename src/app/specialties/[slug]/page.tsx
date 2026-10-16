import type { Metadata } from "next";
import { topicLower } from "@/lib/text";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { Faq } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, listingMetadata } from "@/lib/seo";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { getSpecialty, listLocations, listSpecialties, listPosts } from "@/lib/repository";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateStaticParams() {
  return (await listSpecialties()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const s = await getSpecialty((await params).slug);
  if (!s) return { title: "Service not found", robots: { index: false } };
  return listingMetadata({
    title: `${s.name}: Christian Couples Counselors`,
    description: `${s.summary} Learn what ${topicLower(s.name)} involves and browse sample counselors who focus on it.`,
    path: `/specialties/${s.slug}/`,
    params: parseSearchParams(await searchParams),
    ignore: ["specialty"],
  });
}

export default async function SpecialtyPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const s = await getSpecialty(slug);
  if (!s) notFound();
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`/specialties/${slug}/${clean}`);
  const sp = parseSearchParams(raw);
  const [all, locs, posts] = await Promise.all([listSpecialties(), listLocations(), listPosts()]);
  const others = all.filter((o) => o.slug !== s.slug);
  const guides = posts.filter((p) => p.relatedSpecialties.includes(s.slug)).slice(0, 2);

  return (
    <>
      <JsonLd data={faqJsonLd(s.faqs)} />
      <PageHeader crumbs={[{ name: "Services", href: "/specialties/" }, { name: s.name, href: `/specialties/${s.slug}/` }]}
        title={s.name} intro={s.description} />
      <div className="container-page py-10">
        <div className="mb-10 rounded-xl2 border border-sand-200 bg-white p-6">
          <h2 className="text-2xl">Common signs your marriage might benefit</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {s.signs.map((x) => <li key={x} className="flex gap-2.5 text-ink-700"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{x}</li>)}
          </ul>
          <p className="mt-4 text-sm text-ink-600">These are general descriptions, not a diagnosis. A licensed professional can help you understand what is going on.</p>
        </div>

        <DirectoryView params={sp} fixed={{ specialty: s.slug }} hide={["specialty"]} basePath={`/specialties/${s.slug}/`} />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="faq">
            <h2 id="faq" className="mb-4 text-3xl">{s.name}: common questions</h2>
            <Faq items={s.faqs} />
          </section>
          <section aria-labelledby="explore">
            <h2 id="explore" className="mb-4 text-3xl">Keep exploring</h2>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">By location</h3>
            <p className="mt-2 flex flex-wrap gap-2">
              {locs.slice(0, 6).map((l) => <Link key={l.slug} href={`/locations/${l.slug}/`} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm hover:bg-brand-50">{l.name}</Link>)}
            </p>
            <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">Related services</h3>
            <p className="mt-2 flex flex-wrap gap-2">
              {others.map((o) => <Link key={o.slug} href={`/specialties/${o.slug}/`} className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm text-brand-800 hover:bg-brand-100">{o.name}</Link>)}
            </p>
            {guides.length > 0 && (
              <>
                <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">Helpful reading</h3>
                <ul className="mt-2 space-y-2">
                  {guides.map((g) => <li key={g.slug}><Link className="font-medium text-brand-800 underline underline-offset-2" href={`/blog/${g.slug}/`}>{g.title}</Link></li>)}
                </ul>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
