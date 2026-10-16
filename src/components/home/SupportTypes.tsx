import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";

const TYPES = [
  { href: "/specialties/christian-marriage-counseling/", icon: "heart", title: "Marriage counseling", text: "Support for husbands and wives, together." },
  { href: "/specialties/christian-premarital-counseling/", icon: "sprout", title: "Premarital counseling", text: "Preparation for engaged couples." },
  { href: "/specialties/christian-marriage-reconciliation/", icon: "repeat", title: "Marriage restoration", text: "When you're separated or close to it." },
  { href: "/specialties/faith-and-spiritual-connection/", icon: "cross", title: "Faith-integrated sessions", text: "Prayer and scripture, if you both want them." },
  { href: "/online-therapy/", icon: "video", title: "Online couples counseling", text: "Secure video, together from home." },
  { href: "/therapists/?format=in-person", icon: "home", title: "In-person counseling", text: "Meet face to face in a local office." },
];

export function SupportTypes() {
  return (
    <section className="section bg-sand-100" aria-labelledby="support-types">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <SectionHeading id="support-types" eyebrow="Ways to meet" title="Find the right kind of couples support"
            intro="Counseling can look different depending on your season of marriage and how you'd like to meet." />
        </div>
        <ul className="mt-10 grid overflow-hidden rounded-xl2 border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 1 }} data-reveal>
          {TYPES.map((t) => (
            <li key={t.title} className="bg-white">
              <Link href={t.href} className="group flex h-full items-center gap-4 p-5 transition-colors hover:bg-brand-50 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={t.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg text-ink-900 group-hover:text-brand-800">{t.title}</span>
                  <span className="block text-sm text-ink-600">{t.text}</span>
                </span>
                <Icon name="chevron" className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
