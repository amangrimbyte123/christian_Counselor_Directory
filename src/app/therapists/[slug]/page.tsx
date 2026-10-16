import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, Badge, DataNotice, Faq, Rating, SectionHeading } from "@/components/ui/Misc";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { TherapistCard } from "@/components/directory/TherapistCard";
import { BackToResults } from "@/components/therapist/BackToResults";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { mapsUrl, telHref, websiteLabel } from "@/lib/listing";
import {
  cityLabel, getCity, getRelatedTherapists, getTherapist, getTherapistRedirect, listTherapists, stateLabel,
} from "@/lib/repository";
import type { Therapist } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listTherapists()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTherapist((await params).slug);
  if (!t) return { title: "Practice not found", robots: { index: false } };
  const st = stateLabel(t.state);
  const where = `${cityLabel(t.city)}, ${st?.abbr}`;
  return buildMetadata({
    title: `${t.name}: ${t.category} in ${where}`,
    description: `${t.name} is a ${t.category.toLowerCase()} at ${t.address}.${t.phone ? ` Call ${t.phone}.` : ""} See hours, directions and nearby Christian couples counseling in ${where}.`,
    path: `/therapists/${t.slug}/`,
  });
}

const faqsFor = (t: Therapist, where: string) => [
  { q: `Where is ${t.name} located?`, a: `${t.name} is at ${t.address}.` },
  ...(t.phone || t.website
    ? [{ q: `How do I contact ${t.name}?`, a: [t.phone && `Call ${t.phone}`, t.website && `visit ${websiteLabel(t.website)}`].filter(Boolean).join(" or ") + ". Ask about availability, fees, insurance and online sessions." }]
    : []),
  { q: `Does ${t.name} offer Christian couples counseling?`, a: `This practice appeared in Google Maps searches for Christian couples therapy in ${where}, but we have not confirmed how it includes faith. Ask directly how they work with couples and how much faith is part of sessions.` },
  { q: `Is ${t.name} licensed?`, a: "We have not checked licences for this listing. Ask for the counselor's full name and licence number, then look it up with your state's licensing board." },
];

export default async function TherapistPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTherapist(slug);
  if (!t) {
    const next = await getTherapistRedirect(slug);
    if (next) permanentRedirect(`/therapists/${next}/`);
    notFound();
  }
  const st = stateLabel(t.state)!;
  const cityPage = await getCity(t.state, t.city);
  // Small towns have no page of their own: link to the state instead
  const areaHref = cityPage ? `/locations/${t.state}/${t.city}/` : `/locations/${t.state}/`;
  const areaName = cityPage ? cityLabel(t.city) : st.name;
  const related = await getRelatedTherapists(t, 3);
  const where = `${cityLabel(t.city)}, ${st.abbr}`;
  const faqs = faqsFor(t, where);
  const row = "flex gap-3 py-3";
  const dt = "w-32 shrink-0 text-sm font-semibold text-ink-900";

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: t.name,
        url: absoluteUrl(`/therapists/${t.slug}/`),
        ...(t.website && { sameAs: t.website }),
        ...(t.phone && { telephone: t.phone }),
        address: {
          "@type": "PostalAddress",
          ...(t.street && { streetAddress: t.street }),
          addressLocality: cityLabel(t.city),
          addressRegion: st.abbr,
          ...(t.zip && { postalCode: t.zip }),
          addressCountry: "US",
        },
        ...(t.lat != null && t.lng != null && { geo: { "@type": "GeoCoordinates", latitude: t.lat, longitude: t.lng } }),
      }} />
      <PageHeader
        crumbs={[
          { name: "Counselors", href: "/therapists/" },
          { name: areaName, href: areaHref },
          { name: t.name, href: `/therapists/${t.slug}/` },
        ]}
        title={t.name}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={t.name} hue={t.avatarHue} size={96} />
          <div>
            <p className="text-lg text-ink-700">{t.category}</p>
            <p className="mt-1 flex items-center gap-1.5 text-ink-600"><Icon name="pin" className="h-4 w-4 text-brand-600" />{where}</p>
            <Rating rating={t.rating} count={t.ratingCount} className="mt-2" />
            <p className="mt-3 flex flex-wrap gap-2">
              <Badge tone="neutral" icon="info">Licence not verified</Badge>
            </p>
          </div>
        </div>
      </PageHeader>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <BackToResults />
          <DataNotice>{SITE.dataNotice}</DataNotice>

          <section aria-labelledby="details">
            <h2 id="details" className="text-3xl">Practice details</h2>
            <dl className="mt-4 divide-y divide-sand-200 rounded-xl2 border border-sand-200 bg-white px-5">
              <div className={row}><dt className={dt}>Type</dt><dd>{t.category}</dd></div>
              <div className={row}><dt className={dt}>Address</dt><dd>{t.address}</dd></div>
              {t.phone && <div className={row}><dt className={dt}>Phone</dt><dd><a className="text-brand-800 underline" href={telHref(t.phone)}>{t.phone}</a></dd></div>}
              {t.website && <div className={row}><dt className={dt}>Website</dt><dd className="min-w-0 break-words"><a className="text-brand-800 underline" href={t.website} target="_blank" rel="noopener nofollow">{websiteLabel(t.website)}</a></dd></div>}
              {t.rating && <div className={row}><dt className={dt}>Google rating</dt><dd><Rating rating={t.rating} count={t.ratingCount} /></dd></div>}
              <div className={row}><dt className={dt}>Licence</dt><dd>Not verified by us. See <Link href="/trust-and-safety/" className="text-brand-800 underline">how to check a licence</Link>.</dd></div>
            </dl>
          </section>

          {t.hours && (
            <section aria-labelledby="hours">
              <h2 id="hours" className="text-3xl">Opening hours</h2>
              <table className="mt-4 w-full max-w-md overflow-hidden rounded-xl2 border border-sand-200 bg-white text-left">
                <tbody className="divide-y divide-sand-200">
                  {t.hours.map((h) => (
                    <tr key={h.day}><th scope="row" className="px-5 py-2.5 text-sm font-semibold text-ink-900">{h.day}</th><td className="px-5 py-2.5 text-ink-700">{h.time}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-sm text-ink-500">Hours from Google Maps. Holiday hours may differ.</p>
            </section>
          )}

          <section aria-labelledby="faq">
            <h2 id="faq" className="mb-4 text-3xl">Questions about {t.name}</h2>
            <Faq items={faqs} />
          </section>
        </div>

        <aside aria-label="Contact this practice" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl2 border border-sand-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl">Contact this practice</h2>
            <p className="mb-5 mt-1 text-sm text-ink-600">Reach out directly to ask about availability, fees, insurance and how they include faith in couples counseling.</p>
            <div className="grid gap-3">
              {t.phone && <a href={telHref(t.phone)} className={buttonClass("primary")}><Icon name="phone" className="h-5 w-5" /> Call {t.phone}</a>}
              {t.website && <a href={t.website} target="_blank" rel="noopener nofollow" className={buttonClass("secondary")}><Icon name="globe" className="h-5 w-5" /> Visit website</a>}
              <a href={mapsUrl(t)} target="_blank" rel="noopener" className={buttonClass("ghost")}><Icon name="pin" className="h-5 w-5" /> Get directions</a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-sand-200 bg-sand-100 py-14" aria-labelledby="related">
          <div className="container-page">
            <SectionHeading title="Other practices nearby" intro={`Counseling practices closest to ${t.name} in ${st.name}.`} />
            <h2 id="related" className="sr-only">Nearby practices</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <li key={r.id}><TherapistCard t={r} /></li>)}
            </ul>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              <Link className="font-medium text-brand-800 underline" href={areaHref}>All counselors in {areaName}</Link>
              <Link className="font-medium text-brand-800 underline" href="/therapists/">Back to all results</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
