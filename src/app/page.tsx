import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TopicGrid } from "@/components/home/TopicGrid";
import { SupportTypes } from "@/components/home/SupportTypes";
import { FeaturedTherapists } from "@/components/home/FeaturedTherapists";
import { LocationBrowse } from "@/components/home/LocationBrowse";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BASICS, TherapyBasics } from "@/components/home/TherapyBasics";
import { ResourceGrid } from "@/components/home/ResourceGrid";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Faq, SectionHeading } from "@/components/ui/Misc";
import { RevealObserver } from "@/components/ui/Reveal";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { countBySpecialty, countOnline, listFeaturedTherapists, listLocations, listPosts, listSpecialties } from "@/lib/repository";

export const metadata = buildMetadata({
  title: "Find a Therapist, Counselor or Psychologist",
  description: "Explore therapists and counselors by what you're going through, your location, and online or in-person sessions. A calm, honest directory (demo with sample data).",
  path: "/",
});
// buildMetadata title for "/" should not be templated twice
metadata.title = { absolute: `${SITE.name}: Find a therapist who fits` };

// Kept distinct from the "What to expect" questions above it
const FAQS = [
  { q: "Do I need a diagnosis to start therapy?", a: "No. You can start therapy for any reason: stress, life changes, relationships, or simply wanting to understand yourself better." },
  { q: "How much does therapy cost?", a: "It varies by location, profession and session length. Each profile shows a fee range up front, and some therapists list a sliding scale. Ask about insurance or reimbursement directly, as coverage differs between plans." },
  { q: "Is my search private?", a: "You can browse and search without an account, and we don't ask about your health to show results. Search filters only appear in the page address so you can share or bookmark them." },
  { q: "Are the therapists on this site real?", a: "No. This is a demo. All profiles are fictional sample data and none are verified. See our trust and safety page for how to verify real clinicians." },
  { q: "What if I am in crisis?", a: "In the US call or text 988, or call 911. This directory is not an emergency service." },
];

export default async function HomePage() {
  const [specs, counts, featured, locs, posts, online] = await Promise.all([
    listSpecialties(), countBySpecialty(), listFeaturedTherapists(6), listLocations(), listPosts(), countOnline(),
  ]);
  // Articles already linked from "What to expect" are left out of the resources grid
  const basicsLinks = new Set(BASICS.map((b) => b.href));
  const resources = posts.filter((p) => !basicsLinks.has(`/blog/${p.slug}/`));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") }} />
      <JsonLd data={faqJsonLd([...BASICS.map(({ q, a }) => ({ q, a })), ...FAQS])} />
      <RevealObserver />

      <Hero />
      <TopicGrid specialties={specs} counts={counts} />
      <SupportTypes />
      <FeaturedTherapists therapists={featured} />
      <LocationBrowse states={locs} />
      <HowItWorks onlineCount={online} />
      <TherapyBasics />
      <ResourceGrid posts={resources} />

      <section className="section" aria-labelledby="faq">
        <div className="container-page max-w-3xl">
          <div data-reveal><SectionHeading id="faq" align="center" eyebrow="FAQ" title="Frequently asked questions" /></div>
          <div className="mt-10" data-reveal><Faq items={FAQS} /></div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl2 bg-sage-50 p-6 sm:flex-row sm:items-center" data-reveal>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brand-700"><Icon name="shield" className="h-5 w-5" /></span>
            <p className="flex-1 text-ink-700"><strong className="text-ink-900">Honest by design.</strong> Sample data is always labelled, we never show invented reviews, and crisis support is one tap away in the footer.</p>
            <Link href="/trust-and-safety/" className="link-arrow shrink-0 text-sm">Trust &amp; safety <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
