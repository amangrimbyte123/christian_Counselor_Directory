import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Misc";
import { buildMetadata } from "@/lib/seo";
import { listPosts } from "@/lib/repository";

export const metadata = buildMetadata({
  title: "Christian Marriage Resources and Guides",
  description: "Plain-language guides for Christian couples on finding a marriage counselor, couples therapy approaches, premarital preparation and rebuilding trust.",
  path: "/blog/",
});

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function BlogPage() {
  const posts = await listPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHeader crumbs={[{ name: "Resources", href: "/blog/" }]} title="Guides for your marriage"
        intro="Plain-language guides to help you and your spouse find the right support. General information only, not medical advice." />
      <div className="container-page py-10">
        <Link href={`/blog/${lead.slug}/`} className="group grid gap-6 rounded-xl2 border border-sand-200 bg-white p-6 shadow-card hover:shadow-lift md:grid-cols-[1fr_1.4fr] md:p-8">
          <div className="grid min-h-40 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-sage-100 font-serif text-5xl text-brand-700" aria-hidden="true">Start here</div>
          <div>
            <Badge tone="brand">{lead.category}</Badge>
            <h2 className="mt-3 text-3xl group-hover:text-brand-800">{lead.title}</h2>
            <p className="mt-2 text-lg text-ink-600">{lead.excerpt}</p>
            <p className="mt-4 text-sm text-ink-500">{fmtDate(lead.publishedOn)} · {lead.readMinutes} min read</p>
          </div>
        </Link>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 shadow-card hover:shadow-lift">
                <Badge tone="sand">{p.category}</Badge>
                <h2 className="mt-3 text-xl group-hover:text-brand-800">{p.title}</h2>
                <p className="mt-2 flex-1 text-ink-600">{p.excerpt}</p>
                <p className="mt-4 text-sm text-ink-500">{fmtDate(p.publishedOn)} · {p.readMinutes} min read</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
