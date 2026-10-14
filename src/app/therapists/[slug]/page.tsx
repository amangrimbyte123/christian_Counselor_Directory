import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, Badge, DemoNotice, Faq, SectionHeading } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { TherapistCard } from "@/components/directory/TherapistCard";
import { BackToResults } from "@/components/therapist/BackToResults";
import { RequestForm } from "@/components/therapist/RequestForm";
import { buildMetadata } from "@/lib/seo";
import { PROFESSION_LABELS } from "@/lib/params";
import {
  approachLabel, cityLabel, getRelatedTherapists, getTherapist, getTherapistRedirect,
  languageLabel, listTherapists, specialtyLabel, stateLabel,
} from "@/lib/repository";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listTherapists()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTherapist((await params).slug);
  if (!t) return { title: "Therapist not found", robots: { index: false } };
  const st = stateLabel(t.state);
  return buildMetadata({
    title: `${t.name}, ${t.credentials.split(",")[0]} | ${t.title} in ${cityLabel(t.city)}, ${st?.abbr} (Sample)`,
    description: `Sample profile: ${t.statement} Specialties: ${t.specialties.slice(0, 3).map(specialtyLabel).join(", ")}. Demo data, not a real clinician.`,
    path: `/therapists/${t.slug}/`,
    // Demo profiles are fictional. Keep them out of search indexes until real, verified data replaces them.
    noindex: t.verified === false,
  });
}

export default async function TherapistPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTherapist(slug);
  if (!t) {
    const next = await getTherapistRedirect(slug);
    if (next) permanentRedirect(`/therapists/${next}/`);
    notFound();
  }
  const st = stateLabel(t.state)!;
  const related = await getRelatedTherapists(t, 3);
  const first = t.name.split(" ")[0];
  const row = "flex gap-3 py-3";
  const dt = "w-36 shrink-0 text-sm font-semibold text-ink-900";

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Therapists", href: "/therapists/" },
          { name: cityLabel(t.city), href: `/locations/${t.state}/${t.city}/` },
          { name: t.name, href: `/therapists/${t.slug}/` },
        ]}
        title={t.name}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={t.name} hue={t.avatarHue} size={96} />
          <div>
            <p className="text-lg text-ink-700">{t.credentials} · {t.title}</p>
            <p className="mt-1 flex items-center gap-1.5 text-ink-600"><Icon name="pin" className="h-4 w-4 text-brand-600" />{cityLabel(t.city)}, {st.name}</p>
            <p className="mt-3 flex flex-wrap gap-2">
              {t.formats.includes("online") && <Badge tone="sage" icon="video">Online sessions</Badge>}
              {t.formats.includes("in-person") && <Badge tone="sand" icon="home">In-person sessions</Badge>}
              <Badge tone={t.acceptingClients ? "sage" : "neutral"} icon="calendar">{t.acceptingClients ? "Accepting new clients" : "Currently full"}</Badge>
              <Badge tone="coral" icon="info">Not verified · sample</Badge>
            </p>
          </div>
        </div>
      </PageHeader>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <BackToResults />
          <DemoNotice>
            This is a fictional sample profile. The name, credentials, fees and text are invented for demonstration and are not verified. Always check a real clinician&apos;s licence with your state board.
          </DemoNotice>

          <section aria-labelledby="about">
            <h2 id="about" className="text-3xl">About {first}</h2>
            <p className="mt-3 font-serif text-xl text-brand-800">&ldquo;{t.statement}&rdquo;</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-700">
              {t.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section aria-labelledby="focus">
            <h2 id="focus" className="text-3xl">Specialties &amp; approach</h2>
            <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">Areas of specialization</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {t.specialties.map((s) => (
                <li key={s}><Link href={`/specialties/${s}/`} className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-800 hover:bg-brand-100">{specialtyLabel(s)}</Link></li>
              ))}
            </ul>
            <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-ink-600">Treatment approaches</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {t.approaches.map((a) => <li key={a}><Badge tone="neutral">{approachLabel(a)}</Badge></li>)}
            </ul>
          </section>

          <section aria-labelledby="details">
            <h2 id="details" className="text-3xl">Practice details</h2>
            <dl className="mt-4 divide-y divide-sand-200 rounded-xl2 border border-sand-200 bg-white px-5">
              <div className={row}><dt className={dt}>Professional type</dt><dd>{PROFESSION_LABELS[t.profession]}</dd></div>
              <div className={row}><dt className={dt}>Experience</dt><dd>{t.yearsExperience} years (sample)</dd></div>
              <div className={row}><dt className={dt}>Session formats</dt><dd>{t.formats.map((f) => (f === "online" ? "Online (video)" : "In person")).join(", ")}</dd></div>
              <div className={row}><dt className={dt}>Location</dt><dd>{cityLabel(t.city)}, {st.name}{t.serviceAreas.length > 0 && <> · also serves {t.serviceAreas.map(cityLabel).join(", ")}</>}</dd></div>
              <div className={row}><dt className={dt}>Languages</dt><dd>{t.languages.map(languageLabel).join(", ")}</dd></div>
              <div className={row}><dt className={dt}>Works with</dt><dd>{t.ages.join(", ")}</dd></div>
              <div className={row}><dt className={dt}>Session fee</dt><dd>${t.feeMin}–${t.feeMax} per session{t.slidingScale && " · sliding scale"}{t.freeConsult && " · free 15-min consultation"}</dd></div>
              <div className={row}><dt className={dt}>Credentials</dt><dd>{t.credentials} <span className="text-coral-700">(sample, not verified)</span>. See <Link href="/trust-and-safety/" className="text-brand-800 underline">how to verify a licence</Link>.</dd></div>
            </dl>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="mb-4 text-3xl">Questions about working with {first}</h2>
            <Faq items={t.faqs} />
          </section>
        </div>

        <aside aria-label="Request an appointment" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl2 border border-sand-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl">Request an appointment</h2>
            <p className="mb-5 mt-1 text-sm text-ink-600">{t.acceptingClients ? `${first} typically replies within 2 business days (sample).` : `${first} is currently full. Send a note to join the waitlist.`}</p>
            <RequestForm therapistSlug={t.slug} therapistName={t.name} idp="appt" submitLabel={t.acceptingClients ? "Send request" : "Join waitlist"} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-sand-200 bg-sand-100 py-14" aria-labelledby="related">
          <div className="container-page">
            <SectionHeading title="Therapists with similar focus" intro="Based on shared specialties and location." />
            <h2 id="related" className="sr-only">Related therapists</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <li key={r.id}><TherapistCard t={r} /></li>)}
            </ul>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              <Link className="font-medium text-brand-800 underline" href={`/locations/${t.state}/${t.city}/`}>All therapists in {cityLabel(t.city)}</Link>
              <Link className="font-medium text-brand-800 underline" href={`/specialties/${t.specialties[0]}/`}>{specialtyLabel(t.specialties[0])} therapists</Link>
              <Link className="font-medium text-brand-800 underline" href="/therapists/">Back to all results</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
