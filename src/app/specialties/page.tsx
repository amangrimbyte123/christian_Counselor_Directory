import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import { countBySpecialty, listSpecialties } from "@/lib/repository";

export const metadata = buildMetadata({
  title: "Therapy Specialties: Anxiety, Depression, Trauma and More",
  description: "Explore therapy specialties, learn what each involves and browse therapists who focus on them.",
  path: "/specialties/",
});

export default async function SpecialtiesPage() {
  const [specs, counts] = await Promise.all([listSpecialties(), countBySpecialty()]);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Specialties", href: "/specialties/" }]}
        title="Therapy specialties"
        intro="Not sure where to start? Pick the concern that feels closest. Each page explains what the therapy involves and lists therapists who focus on it."
      />
      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => (
            <li key={s.slug}>
              <Link href={`/specialties/${s.slug}/`} className="group flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={s.icon} className="h-6 w-6" /></span>
                <h2 className="mt-4 text-2xl group-hover:text-brand-800">{s.name}</h2>
                <p className="mt-1.5 flex-1 text-ink-600">{s.summary}</p>
                <p className="mt-4 text-sm font-medium text-brand-800">{counts[s.slug] ?? 0} sample therapists →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
