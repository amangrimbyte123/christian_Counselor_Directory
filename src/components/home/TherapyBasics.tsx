import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";
import { revealDelay } from "@/lib/motion";

/** Short, general answers for first-timers, each pointing to a fuller guide. Not medical advice. */
export const BASICS = [
  {
    q: "How do I find the right therapist?",
    a: "Look for someone who works with what you're facing, then consider practical fit: location or online, fees and availability. Feeling comfortable with them matters most, so a short first call is a good way to check.",
    href: "/blog/how-to-find-a-therapist/", cta: "Step-by-step guide",
  },
  {
    q: "What happens in a first therapy session?",
    a: "Usually a conversation: what brings you in, a bit of background, and what you'd like to change. You can ask questions too, about their approach, confidentiality or how long therapy might take.",
    href: "/blog/what-to-expect-in-your-first-therapy-session/", cta: "What to expect",
  },
  {
    q: "What's the difference between a therapist and a counselor?",
    a: "The titles overlap. Licensed counselors, social workers, marriage and family therapists and psychologists all provide talk therapy; their training and licences differ. Psychologists can also do formal testing.",
    href: "/blog/therapist-vs-counselor-vs-psychologist/", cta: "Titles explained",
  },
  {
    q: "Can I speak to a therapist online?",
    a: "Yes. Many therapists offer secure video sessions, and research suggests online therapy can work well for many common concerns. Therapists generally need to be licensed in the state where you live.",
    href: "/blog/online-therapy-vs-in-person/", cta: "Online vs in person",
  },
];

export function TherapyBasics() {
  return (
    <section className="section" aria-labelledby="basics">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading id="basics" align="center" eyebrow="New to therapy?" title="What to expect from therapy"
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
