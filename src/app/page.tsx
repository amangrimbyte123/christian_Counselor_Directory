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
import { PopularSearches } from "@/components/ui/PopularSearches";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { countTherapists, listFeaturedTherapists, listLocations, listPosts, listSpecialties } from "@/lib/repository";

export const metadata = buildMetadata({
  title: "Christian Couples Therapy & Marriage Counseling Near You",
  description: "Find Christian couples therapy near you or online. Compare Christian couples and marriage counseling practices by location, with Google ratings, phone numbers and directions.",
  path: "/",
});
// buildMetadata title for "/" should not be templated twice
metadata.title = { absolute: `Christian Couples Therapy & Marriage Counseling Near You | ${SITE.name}` };

// Kept distinct from the "What to expect" questions above it
const FAQS = [
  { q: "Do we need to be in crisis to start couples counseling?", a: "No. Couples come for many reasons: recurring arguments, a big life change, preparing for marriage, or simply wanting to grow closer to each other and to God." },
  { q: "How much does couples counseling cost?", a: "It varies by location, profession and session length. Call the practice to ask about fees, any sliding scale and whether they take your insurance, as coverage differs between plans." },
  { q: "Is my search private?", a: "You can browse and search without an account, and we don't ask about your health to show results. Search filters only appear in the page address so you can share or bookmark them." },
  { q: "Where do these listings come from?", a: "From public Google Maps information for counseling practices. We have not verified licences, faith approach or availability, so please confirm these directly. Our trust and safety page explains how to check a licence." },
  { q: "What if I am in crisis or feel unsafe at home?", a: "In the US call or text 988, or call 911. For domestic violence, call the National Domestic Violence Hotline at 1-800-799-7233. This directory is not an emergency service." },
];

export default async function HomePage() {
  const [specs, featured, locs, posts, total] = await Promise.all([
    listSpecialties(), listFeaturedTherapists(6), listLocations(), listPosts(), countTherapists(),
  ]);
  // Articles already linked from "What to expect" are left out of the resources grid
  const basicsLinks = new Set(BASICS.map((b) => b.href));
  const resources = posts.filter((p) => !basicsLinks.has(`/blog/${p.slug}/`));

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: absoluteUrl("/"),
        potentialAction: { "@type": "SearchAction", target: `${absoluteUrl("/therapists/")}?q={search_term_string}`, "query-input": "required name=search_term_string" },
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: absoluteUrl("/"), description: "A directory for finding Christian couples therapy and marriage counseling, in person and online." }} />
      <JsonLd data={faqJsonLd([...BASICS.map(({ q, a }) => ({ q, a })), ...FAQS])} />
      <RevealObserver />

      <Hero />
      <div className="container-page"><PopularSearches className="border-y border-sand-200 py-6" /></div>
      <TopicGrid specialties={specs} />
      <SupportTypes />
      <FeaturedTherapists therapists={featured} />
      <LocationBrowse states={locs} />
      <HowItWorks total={total} />
      <TherapyBasics />
      <ResourceGrid posts={resources} />

      <section className="section" aria-labelledby="faq">
        <div className="container-page max-w-3xl">
          <div data-reveal><SectionHeading id="faq" align="center" eyebrow="FAQ" title="Frequently asked questions" /></div>
          <div className="mt-10" data-reveal><Faq items={FAQS} /></div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl2 bg-sage-50 p-6 sm:flex-row sm:items-center" data-reveal>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brand-700"><Icon name="shield" className="h-5 w-5" /></span>
            <p className="flex-1 text-ink-700"><strong className="text-ink-900">Honest by design.</strong> We show where every listing comes from, never write reviews ourselves, and crisis support is one tap away in the footer.</p>
            <Link href="/trust-and-safety/" className="link-arrow shrink-0 text-sm">Trust &amp; safety <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
