import Link from "next/link";
import { Logo } from "./Header";
import { listLocations, listSpecialties } from "@/lib/repository";
import { SITE } from "@/lib/site";

export async function Footer() {
  const [specs, locs] = await Promise.all([listSpecialties(), listLocations()]);
  const col = "space-y-2.5 text-[15px]";
  const a = "text-ink-600 hover:text-brand-800 hover:underline underline-offset-2";
  return (
    <footer className="mt-auto border-t border-sand-200 bg-sand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-ink-600">A calm, honest place for Christian couples to find a marriage counselor who fits.</p>
          <p className="mt-4 max-w-sm rounded-lg border border-sand-300 bg-white p-3 text-sm text-ink-600">
            <strong className="text-ink-900">In crisis?</strong> In the US call or text <a className="font-semibold text-brand-800 underline" href="tel:988">988</a> (Suicide &amp; Crisis Lifeline), or call 911 for emergencies. This directory is not an emergency service.
          </p>
        </div>
        <nav aria-label="Services">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">Services</h2>
          <ul className={col}>
            {specs.slice(0, 8).map((s) => <li key={s.slug}><Link className={a} href={`/specialties/${s.slug}/`}>{s.name}</Link></li>)}
            <li><Link className={`${a} font-medium`} href="/specialties/">All services</Link></li>
          </ul>
        </nav>
        <nav aria-label="Locations">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">States</h2>
          <ul className={col}>
            {locs.slice(0, 6).map((s) => <li key={s.slug}><Link className={a} href={`/locations/${s.slug}/`}>{s.name}</Link></li>)}
            <li><Link className={`${a} font-medium`} href="/locations/">All locations</Link></li>
          </ul>
        </nav>
        <nav aria-label="Getting started">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">Getting started</h2>
          <ul className={col}>
            <li><Link className={a} href="/blog/how-to-find-a-christian-marriage-counselor/">Finding a counselor</Link></li>
            <li><Link className={a} href="/blog/what-to-expect-in-your-first-couples-counseling-session/">Your first session</Link></li>
            <li><Link className={a} href="/blog/licensed-therapist-vs-pastoral-counselor/">Licensed or pastoral?</Link></li>
            <li><Link className={a} href="/blog/online-vs-in-person-christian-couples-counseling/">Online or in person?</Link></li>
            <li><Link className={`${a} font-medium`} href="/blog/">All resources</Link></li>
          </ul>
        </nav>
        <nav aria-label="About">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">Directory</h2>
          <ul className={col}>
            <li><Link className={a} href="/therapists/">All counselors</Link></li>
            <li><Link className={a} href="/online-therapy/">Online counseling</Link></li>
            <li><Link className={a} href="/blog/">Resources</Link></li>
            <li><Link className={a} href="/trust-and-safety/">Trust &amp; safety</Link></li>
            <li><Link className={a} href="/for-therapists/">For counselors</Link></li>
            <li><Link className={a} href="/about/">About</Link></li>
            <li><Link className={a} href="/contact/">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-sand-200">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-ink-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Demo site: all profiles are fictional sample data.</p>
          <p className="flex gap-4"><Link className={a} href="/privacy/">Privacy</Link><Link className={a} href="/terms/">Terms</Link></p>
        </div>
      </div>
    </footer>
  );
}
