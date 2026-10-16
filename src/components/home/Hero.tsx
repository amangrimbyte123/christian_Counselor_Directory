import Link from "next/link";
import { SearchForm } from "./SearchForm";
import { HeroGallery } from "./HeroGallery";
import { Icon } from "@/components/ui/Icon";
import { PHOTOS } from "@/lib/images";

const QUICK = [
  { href: "/specialties/christian-marriage-counseling/", label: "Marriage counseling" },
  { href: "/specialties/christian-premarital-counseling/", label: "Premarital" },
  { href: "/specialties/christian-affair-recovery/", label: "Affair recovery" },
  { href: "/specialties/christian-couples-communication/", label: "Communication" },
  { href: "/christian-couples-therapy/", label: "Couples therapy" },
  { href: "/online-therapy/", label: "Online counseling" },
];

// Only claims that are true of this site today
const TRUST = ["Free to search", "No account or questionnaire", "Real practices with Google ratings", "Call, website and directions in one tap"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="relative">
        {/* Quiet sage panel behind the photo on large screens */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] rounded-bl-[4rem] bg-sage-100/70 lg:block" />

        <div className="container-page relative grid items-center gap-10 pb-14 pt-8 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              <span className="sm:hidden">For Christian couples</span>
              <span className="hidden sm:inline">Christian couples therapy &amp; counseling</span>
            </p>
            <h1 id="hero-title" className="display mt-4 text-balance text-[2.35rem] sm:text-6xl lg:text-[4rem]">
              Strengthen your marriage with a counselor who <em className="text-brand-700">honours&nbsp;your&nbsp;faith</em>.
            </h1>
            <p className="mt-4 max-w-xl text-[1.05rem] text-ink-600 sm:mt-6 sm:text-xl">
              Find counseling practices near you by city, state or ZIP code, and learn what to ask before you call.<span className="hidden sm:inline"> Take your time: there&apos;s no sign-up and no pressure.</span>
            </p>

            <div className="mt-6 sm:mt-8"><SearchForm /></div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-ink-600">Popular:</span>
              {QUICK.map((q) => <Link key={q.href} href={q.href} className="chip">{q.label}</Link>)}
            </div>
          </div>

          <HeroGallery slides={PHOTOS.concerns} />
        </div>
      </div>

      <div className="border-y border-sand-200 bg-white/60">
        <ul className="container-page flex flex-wrap justify-center gap-x-8 gap-y-2 py-4 text-sm text-ink-600 lg:justify-between">
          {TRUST.map((x) => (
            <li key={x} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-600" />{x}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
