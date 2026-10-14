import Link from "next/link";
import type { Specialty } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";
import { GuidedBrowse } from "./GuidedBrowse";
import { revealDelay } from "@/lib/motion";

/** Everyday wording for each topic; each links to its existing specialty page. */
const TOPICS = [
  { slug: "anxiety-therapy", title: "Anxiety & stress", text: "Racing thoughts, worry that won't switch off, or feeling tense most days.", tone: "bg-brand-50 text-brand-700" },
  { slug: "depression-therapy", title: "Low mood & depression", text: "When things feel flat, heavy, or harder to enjoy than they used to.", tone: "bg-sand-100 text-ink-700" },
  { slug: "relationship-counseling", title: "Relationships & couples", text: "Communication, conflict, trust, or feeling disconnected from a partner.", tone: "bg-coral-50 text-coral-700" },
  { slug: "family-therapy", title: "Family", text: "Navigating family tension, parenting challenges or changes at home.", tone: "bg-sage-100 text-sage-600" },
  { slug: "trauma-therapy", title: "Trauma & emotional healing", text: "Making peace with difficult experiences, at a pace that feels safe.", tone: "bg-brand-50 text-brand-700" },
  { slug: "life-transitions-therapy", title: "Personal growth & life changes", text: "New chapters, big decisions, or simply wanting to understand yourself.", tone: "bg-sand-100 text-ink-700" },
];

export function TopicGrid({ specialties, counts }: { specialties: Specialty[]; counts: Record<string, number> }) {
  const bySlug = new Map(specialties.map((s) => [s.slug, s]));
  return (
    <section className="section" aria-labelledby="topics">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal>
          <SectionHeading id="topics" eyebrow="Explore by topic" title={<>What would you like <em className="text-brand-700">support</em> with?</>}
            intro="You don't need a diagnosis or the perfect words. Start with whatever is on your mind, and learn how therapy can help." />
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
                      <span className="text-ink-500">{counts[t.slug] ?? 0} sample therapists</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-800">Explore <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-ink-600 sm:text-left">
            Looking for something else? <Link href="/specialties/" className="link-arrow">See all {specialties.length} topics <Icon name="arrow" className="h-4 w-4" /></Link>
          </p>
        </div>
      </div>
    </section>
  );
}
