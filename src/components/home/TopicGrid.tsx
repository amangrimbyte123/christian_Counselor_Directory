import Link from "next/link";
import type { Specialty } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";
import { GuidedBrowse } from "./GuidedBrowse";
import { revealDelay } from "@/lib/motion";

/** Everyday wording for each service; each links to its service page. */
const TOPICS = [
  { slug: "christian-marriage-counseling", title: "Christian marriage counseling", text: "Strengthening your marriage with faith welcome in the room, as much or as little as you like.", tone: "bg-brand-50 text-brand-700" },
  { slug: "christian-couples-communication", title: "Communication & conflict", text: "The same arguments on repeat, or conversations that shut down too fast.", tone: "bg-sand-100 text-ink-700" },
  { slug: "christian-affair-recovery", title: "Infidelity & trust repair", text: "Healing after an affair, secrecy or betrayal, and deciding what comes next.", tone: "bg-coral-50 text-coral-700" },
  { slug: "christian-premarital-counseling", title: "Premarital counseling", text: "Preparing for marriage by talking through money, family, roles and faith.", tone: "bg-sage-100 text-sage-600" },
  { slug: "christian-intimacy-counseling", title: "Intimacy & connection", text: "Feeling like roommates, or wanting to rekindle closeness and affection.", tone: "bg-brand-50 text-brand-700" },
  { slug: "christian-marriage-reconciliation", title: "Separation & reconciliation", text: "When divorce has been mentioned, or you're living apart and unsure.", tone: "bg-sand-100 text-ink-700" },
  { slug: "christian-couples-life-transitions", title: "Seasons of marriage", text: "New baby, blended family, grief or an empty nest: changing together.", tone: "bg-sage-100 text-sage-600" },
  { slug: "faith-and-spiritual-connection", title: "Faith & spiritual connection", text: "Growing together spiritually, even when you see faith differently.", tone: "bg-coral-50 text-coral-700" },
];

export function TopicGrid({ specialties, counts }: { specialties: Specialty[]; counts: Record<string, number> }) {
  const bySlug = new Map(specialties.map((s) => [s.slug, s]));
  return (
    <section className="section" aria-labelledby="topics">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal>
          <SectionHeading id="topics" eyebrow="Explore by need" title={<>What would you like <em className="text-brand-700">help</em> with as a couple?</>}
            intro="You don't need to be in crisis or have the perfect words. Start with whatever is on your hearts, and learn how Christian couples counseling can help." />
          <div className="mt-8"><GuidedBrowse specialties={specialties.map(({ slug, name, summary }) => ({ slug, name, summary }))} /></div>
        </div>

        <div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TOPICS.filter((t) => bySlug.has(t.slug)).map((t, i) => {
              const s = bySlug.get(t.slug)!;
              return (
                <li key={t.slug} data-reveal style={revealDelay((i % 2) * 90)}>
                  <Link href={`/specialties/${t.slug}/`}
                    className="group flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${t.tone}`}><Icon name={s.icon} className="h-6 w-6" /></span>
                    <h3 className="mt-5 text-xl group-hover:text-brand-800">{t.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{t.text}</p>
                    <span className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-ink-500">{counts[t.slug] ?? 0} sample counselors</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-800">Explore <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-ink-600 sm:text-left">
            Want the full picture? <Link href="/specialties/" className="link-arrow">See all {specialties.length} services <Icon name="arrow" className="h-4 w-4" /></Link>
          </p>
        </div>
      </div>
    </section>
  );
}
