import type { Metadata } from "next";
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
  { q: "Is online therapy as effective as in-person therapy?", a: "For many common concerns such as anxiety and depression, research finds video therapy can be comparably effective. Fit with your therapist matters more than the format." },
  { q: "Can I see any therapist online from anywhere?", a: "Not always. Therapists generally need to be licensed in the state where you are located during the session. Always confirm this before booking." },
  { q: "What do I need for a video session?", a: "A private space, a stable internet connection, a phone, tablet or computer with a camera, and headphones if possible." },
  { q: "Is online therapy private?", a: "Ask your therapist which platform they use and how it protects your data. Reputable clinicians use secure, privacy-compliant video tools." },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return listingMetadata({
    title: "Online Therapy: Find Therapists Offering Video Sessions",
    description: "Browse therapists and counselors offering online therapy by video. Filter by specialty, language and fee. Sample data for demonstration.",
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
      <PageHeader crumbs={[{ name: "Online therapy", href: "/online-therapy/" }]} title="Online therapy"
        intro={`${count} sample therapists offer secure video sessions. Meet from home, on your schedule, without a commute.`}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[["video", "Secure video sessions"], ["clock", "Flexible scheduling"], ["globe", "Wider choice of specialists"]].map(([i, t]) => (
            <li key={t} className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-ink-700 shadow-card"><Icon name={i} className="h-5 w-5 text-brand-700" />{t}</li>
          ))}
        </ul>
      </PageHeader>
      <div className="container-page py-10">
        <DirectoryView params={sp} fixed={{ format: "online" }} hide={["format"]} basePath="/online-therapy/" />
        <section className="mt-16 max-w-3xl" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-3xl">Online therapy: common questions</h2>
          <Faq items={FAQS} />
        </section>
      </div>
    </>
  );
}
