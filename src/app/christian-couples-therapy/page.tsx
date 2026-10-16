import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { Faq } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PopularSearches } from "@/components/ui/PopularSearches";
import { faqJsonLd, listingMetadata } from "@/lib/seo";
import { cleanQueryRedirect, parseSearchParams } from "@/lib/params";
import { countOnline, listLocations, listSpecialties, listTherapists } from "@/lib/repository";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const PATH = "/christian-couples-therapy/";

const FAQS = [
  { q: "What is Christian couples therapy?", a: "It is couples therapy with a counselor who welcomes your Christian faith into the work. Sessions use established methods such as the Gottman Method or emotionally focused therapy, and can include prayer, scripture or conversations about your shared beliefs if you both want that." },
  { q: "Is Christian couples therapy different from marriage counseling?", a: "The two overlap a lot. Couples therapy is the broader term and also covers engaged and dating couples, while marriage counseling focuses on married partners. Many counselors offer both, so look at the issues they work with rather than the label." },
  { q: "Does Christian-based couples therapy work?", a: "Research supports couples therapy in general, especially approaches like emotionally focused therapy and the Gottman Method. Studies on faith-integrated therapy suggest it works about as well for religious clients, and many couples say it helps to feel their values are understood." },
  { q: "Can we try it if only one of us is a Christian?", a: "Yes. A good counselor will ask how much faith each of you wants in sessions and will not pressure either partner. Say early on that you see faith differently, so the counselor can make room for both of you." },
  { q: "How do we find Christian couples therapy near me?", a: "Browse by state and city below, or filter the directory by location. If there is no one close by, many counselors offer online sessions to couples anywhere in the state where they are licensed." },
  { q: "Can we do Christian couples therapy online?", a: "Many counselors offer secure video sessions. Online therapy widens your choice, but the counselor generally needs to be licensed in the state where you are when you meet." },
  { q: "How much does it cost, and does insurance cover it?", a: "Fees vary by location and profession; the sample profiles here range from about $80 to $275 a session, and some list a sliding scale. Insurance often covers couples work only when it is tied to a diagnosis, so ask your plan and the counselor directly." },
  { q: "How many sessions do couples usually need?", a: "Many couples meet weekly for 8 to 20 sessions, though it depends on what you are working through. Your counselor should talk with you about goals and check in on progress along the way." },
];

const STEPS = [
  { icon: "users", title: "Research-based couples methods", text: "Approaches like the Gottman Method and emotionally focused therapy help you break negative cycles and feel close again." },
  { icon: "cross", title: "Faith at the pace you choose", text: "Prayer, scripture and conversations about your beliefs are part of sessions only as much as you both want." },
  { icon: "shield", title: "Licensed and accountable", text: "Licensed clinicians answer to a state board. Always check a licence before you book, whatever the counselor's faith." },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return listingMetadata({
    title: "Christian Couples Therapy: Find a Faith-Integrated Couples Therapist",
    description: "What Christian couples therapy involves, what it costs and how to find a faith-integrated couples therapist near you or online. Browse sample counselors (demo data).",
    path: PATH,
    params: parseSearchParams(await searchParams),
  });
}

export default async function ChristianCouplesTherapyPage({ searchParams }: Props) {
  const raw = await searchParams;
  const clean = cleanQueryRedirect(raw);
  if (clean !== null) redirect(`${PATH}${clean}`);
  const sp = parseSearchParams(raw);
  const [all, locs, specs, online] = await Promise.all([listTherapists(), listLocations(), listSpecialties(), countOnline()]);

  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHeader crumbs={[{ name: "Christian couples therapy", href: PATH }]} title="Christian couples therapy"
        intro={`Couples therapy with a counselor who respects your faith and brings it into the room as much as you'd like. Browse ${all.length} sample counselors in person and online, and learn what to expect before you book.`}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.title} className="rounded-xl bg-white p-4 shadow-card">
              <p className="flex items-center gap-2.5 font-medium text-ink-900"><Icon name={s.icon} className="h-5 w-5 text-brand-700" />{s.title}</p>
              <p className="mt-1.5 text-sm text-ink-600">{s.text}</p>
            </li>
          ))}
        </ul>
        <PopularSearches exclude={PATH} className="mt-8" />
      </PageHeader>

      <div className="container-page py-10">
        <DirectoryView params={sp} basePath={PATH} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <article className="max-w-3xl space-y-10 text-ink-700">
            <section aria-labelledby="what">
              <h2 id="what" className="text-3xl">What Christian-based couples therapy looks like</h2>
              <p className="mt-4">The core of the work is the same as any good couples therapy: understanding the patterns that keep you stuck, learning to talk and listen without escalating, and rebuilding trust and closeness. What changes is that your faith is treated as a strength rather than something to leave at the door.</p>
              <p className="mt-3">Depending on what you both want, a counselor might open with prayer, draw on scripture about love and forgiveness, or help you talk about how your beliefs shape expectations around roles, money, sex or conflict. For some couples faith stays in the background; for others it is central. <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/what-is-christian-couples-counseling/">Read more about how faith fits into counseling</Link>.</p>
            </section>

            <section aria-labelledby="approaches">
              <h2 id="approaches" className="text-3xl">Approaches you will come across</h2>
              <p className="mt-4">Most counselors combine faith with one or two research-based methods. The Gottman Method focuses on friendship, managing conflict and shared meaning. Emotionally focused therapy (EFT) helps partners understand the needs underneath arguments. Prepare/Enrich is widely used with engaged couples and in churches. <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/gottman-eft-or-imago-couples-therapy-approaches/">Compare Gottman, EFT and Imago</Link>.</p>
            </section>

            <section aria-labelledby="who">
              <h2 id="who" className="text-3xl">Licensed therapist or pastoral counselor?</h2>
              <p className="mt-4">Licensed marriage and family therapists, professional counselors, social workers and psychologists are regulated by a state board and trained in mental health. Pastoral and biblical counselors may have strong theological training but often hold no state licence. Both can help; it is worth knowing which you are choosing. <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/licensed-therapist-vs-pastoral-counselor/">See how they differ</Link>.</p>
            </section>

            <section aria-labelledby="formats">
              <h2 id="formats" className="text-3xl">Weekly sessions, intensives and reading together</h2>
              <p className="mt-4">Most couples meet weekly or every other week, in person or by video. Some choose a two- to four-day intensive when things feel urgent or weekly sessions have stalled; <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/christian-couples-therapy-retreats-and-intensives/">see how retreats and intensives compare</Link>. Reading together between sessions can help too: here is <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/christian-couples-therapy-books/">a reading list for Christian couples</Link>. If physical intimacy is part of the struggle, <Link className="font-medium text-brand-800 underline underline-offset-2" href="/blog/sex-therapy-for-christian-couples/">sex therapy for Christian couples</Link> is talk therapy that can respect your faith.</p>
            </section>

            <section aria-labelledby="services">
              <h2 id="services" className="text-3xl">What couples come to therapy for</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {specs.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/specialties/${s.slug}/`} className="flex h-full items-start gap-3 rounded-xl border border-sand-200 bg-white p-4 hover:border-brand-300 hover:bg-brand-50">
                      <Icon name={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <span><span className="block font-medium text-ink-900">{s.name}</span><span className="text-sm text-ink-600">{s.summary}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="faq">
              <h2 id="faq" className="mb-4 text-3xl">Christian couples therapy: common questions</h2>
              <Faq items={FAQS} />
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-labelledby="near">
            <div className="rounded-xl2 border border-sand-200 bg-white p-6">
              <h2 id="near" className="text-2xl">Find Christian couples therapy near you</h2>
              <p className="mt-2 text-sm text-ink-600">Choose your state or city to see counselors who meet in person nearby.</p>
              <ul className="mt-4 space-y-3">
                {locs.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/locations/${s.slug}/`} className="font-medium text-brand-800 underline-offset-2 hover:underline">{s.name}</Link>
                    {s.cities.length > 0 && (
                      <span className="text-sm text-ink-600">
                        {": "}
                        {s.cities.map((c, i) => (
                          <span key={c.slug}>{i > 0 && ", "}<Link href={`/locations/${s.slug}/${c.slug}/`} className="hover:text-brand-800 hover:underline">{c.name}</Link></span>
                        ))}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl2 bg-sage-50 p-6">
              <p className="flex items-center gap-2.5 font-medium text-ink-900"><Icon name="video" className="h-5 w-5 text-brand-700" />Prefer to meet from home?</p>
              <p className="mt-2 text-sm text-ink-700">{online} sample counselors offer online Christian couples therapy by secure video.</p>
              <Link href="/online-therapy/" className="link-arrow mt-3 text-sm">Online couples therapy <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
