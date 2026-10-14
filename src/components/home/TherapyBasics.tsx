import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";
import { revealDelay } from "@/lib/motion";

/** Short, general answers for first-timers, each pointing to a fuller guide. Not medical advice. */
export const BASICS = [
  {
    q: "How do we find the right Christian couples counselor?",
    a: "Look for someone trained in couples therapy who works with what you're facing, then consider how they integrate faith, location or online, fees and availability. Feeling comfortable with them as a couple matters most, so a short first call is a good way to check.",
    href: "/blog/how-to-find-a-christian-marriage-counselor/", cta: "Step-by-step guide",
  },
  {
    q: "What happens in a first couples session?",
    a: "Usually a conversation: what brings you in, a bit of your story together, and what you'd each like to change. You can ask questions too, about their approach, how they include faith, or how long counseling might take.",
    href: "/blog/what-to-expect-in-your-first-couples-counseling-session/", cta: "What to expect",
  },
  {
    q: "Should we see a licensed therapist or a pastoral counselor?",
    a: "Licensed marriage and family therapists and counselors are regulated by a state board; many pastoral counselors are not. Both can be supportive, and many couples combine a licensed counselor with support from their church.",
    href: "/blog/licensed-therapist-vs-pastoral-counselor/", cta: "Options explained",
  },
  {
    q: "Can we do couples counseling online?",
    a: "Yes. Many counselors offer secure video sessions you can join together from home. Counselors generally need to be licensed in the state where you live.",
    href: "/blog/online-vs-in-person-christian-couples-counseling/", cta: "Online vs in person",
  },
];

export function TherapyBasics() {
  return (
    <section className="section" aria-labelledby="basics">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading id="basics" align="center" eyebrow="New to couples counseling?" title="What to expect from couples counseling"
            intro="It's normal to have questions before you start. Here are honest, plain-language answers to the ones we hear most." />
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {BASICS.map((b, i) => (
            <li key={b.q} data-reveal style={revealDelay((i % 2) * 90)}>
              <article className="flex h-full flex-col border-l-2 border-brand-200 bg-white/70 py-1 pl-6 pr-2 transition-colors hover:border-brand-600">
                <span className="font-serif text-sm italic text-brand-700">0{i + 1}</span>
                <h3 className="mt-1 text-xl sm:text-2xl">{b.q}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-600">{b.a}</p>
                <Link href={b.href} className="link-arrow mt-4 text-sm">
                  {b.cta}<span className="sr-only">: {b.q}</span> <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
