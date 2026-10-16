import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { getPost, listPosts, specialtyLabel } from "@/lib/repository";

type Props = { params: Promise<{ slug: string }> };
const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return { title: "Article not found", robots: { index: false } };
  return buildMetadata({ title: p.seoTitle ?? p.title, description: p.excerpt, path: `/blog/${p.slug}/`, type: "article",
    // Article photos are wide crops; ask the image CDN for the 1200x630 share size
    image: p.image && { ...p.image, src: p.image.src.replace("w=1600", "w=1200&h=630") } });
}

export default async function PostPage({ params }: Props) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const others = (await listPosts()).filter((o) => o.slug !== p.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt,
        datePublished: p.publishedOn, dateModified: p.publishedOn, author: { "@type": "Organization", name: p.author },
        ...(p.image ? { image: p.image.src } : {}), keywords: p.keywords?.join(", "),
        publisher: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: absoluteUrl(`/blog/${p.slug}/`),
      }} />
      <PageHeader crumbs={[{ name: "Resources", href: "/blog/" }, { name: p.title, href: `/blog/${p.slug}/` }]} title={p.title}
        intro={<p>{p.category} · {fmtDate(p.publishedOn)} · {p.readMinutes} min read · By {p.author}</p>} />
      <div className="container-page grid gap-12 py-10 lg:grid-cols-[1fr_320px]">
        <article className="max-w-3xl text-lg leading-relaxed text-ink-700">
          <p className="mb-6 rounded-lg bg-sand-100 p-4 text-base text-ink-600">General information only. This article is not medical advice and is not a substitute for care from a licensed professional.</p>
          {p.body.map((b, i) => (
            <section key={i} className="mb-6">
              {b.h && <h2 className="mb-2 text-2xl">{b.h}</h2>}
              <p>{b.p}</p>
            </section>
          ))}
        </article>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl2 border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-xl">Ready to find a counselor?</h2>
            <p className="mb-4 mt-2 text-ink-600">Browse counseling practices by state and city.</p>
            <ButtonLink href="/christian-couples-therapy/" className="w-full">Find Christian couples therapy</ButtonLink>
            <p className="mt-4 flex flex-wrap gap-2">
              {p.relatedSpecialties.map((s) => <Link key={s} href={`/specialties/${s}/`} className="rounded-full border border-brand-200 bg-white px-3 py-1 text-sm text-brand-800 hover:bg-brand-100">{specialtyLabel(s)}</Link>)}
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">More reading</h2>
            <ul className="space-y-2">
              {others.map((o) => <li key={o.slug}><Link className="font-medium text-brand-800 underline underline-offset-2" href={`/blog/${o.slug}/`}>{o.title}</Link></li>)}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
