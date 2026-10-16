import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { Faq } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, listingMetadata } from "@/lib/seo";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { countOnline } from "@/lib/repository";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const FAQS = [
  { q: "Does online Christian couples therapy work?", a: "Many couples find video sessions work well, and research on online couples therapy is encouraging. Fit with your counselor, including how they handle faith, matters more than the format." },
  { q: "Can we see any counselor online from anywhere?", a: "Not always. Counselors generally need to be licensed in the state where you are located during the session. Always confirm this before booking." },
  { q: "What do we need for a video session together?", a: "A private space where children won't overhear, a stable internet connection, and one computer or tablet with a camera you can both sit in front of." },
  { q: "Is online couples counseling private?", a: "Ask your counselor which platform they use and how it protects your data. Reputable clinicians use secure, privacy-compliant video tools." },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return listingMetadata({
    title: "Online Christian Couples Therapy & Counseling by Video",
    description: "Find online Christian couples therapy: browse counselors offering marriage and couples sessions by secure video. Filter by service, language and fee. Sample data for demonstration.",
    path: "/online-therapy/",
    params: parseSearchParams(await searchParams),
    ignore: ["format"],
  });
}

export default async function OnlinePage({ searchParams }: Props) {
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`/online-therapy/${clean}`);
  const sp = parseSearchParams(raw);
  const count = await countOnline();
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHeader crumbs={[{ name: "Online counseling", href: "/online-therapy/" }]} title="Online Christian couples therapy"
        intro={<>{count} sample counselors offer secure video sessions for couples. Meet together from home, on your schedule, without a commute. Prefer to meet in person? <Link href="/christian-couples-therapy/" className="font-medium text-brand-800 underline underline-offset-2">Find Christian couples therapy near you</Link>.</>}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[["video", "Secure video sessions"], ["clock", "Flexible scheduling"], ["globe", "Wider choice of Christian counselors"]].map(([i, t]) => (
            <li key={t} className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-ink-700 shadow-card"><Icon name={i} className="h-5 w-5 text-brand-700" />{t}</li>
          ))}
        </ul>
      </PageHeader>
      <div className="container-page py-10">
        <DirectoryView params={sp} fixed={{ format: "online" }} hide={["format"]} basePath="/online-therapy/" />
        <section className="mt-16 max-w-3xl" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-3xl">Online couples counseling: common questions</h2>
          <Faq items={FAQS} />
        </section>
      </div>
    </>
  );
}
