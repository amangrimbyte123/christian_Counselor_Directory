import Link from "next/link";
import type { Therapist } from "@/types";
import { Avatar } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { cityLabel, specialtyLabel, stateLabel } from "@/lib/repository";

export function TherapistCard({ t }: { t: Therapist }) {
  const st = stateLabel(t.state);
  const online = t.formats.includes("online");
  const inPerson = t.formats.includes("in-person");
  return (
    <article className="group relative flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift focus-within:border-brand-300">
      <div className="flex items-center gap-4">
        <Avatar name={t.name} hue={t.avatarHue} size={60} />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl leading-tight">
            {/* The whole card is clickable via this stretched link */}
            <Link href={`/therapists/${t.slug}/`} className="after:absolute after:inset-0 after:rounded-xl2 after:content-[''] focus-visible:outline-none group-hover:text-brand-800">
              {t.name}
            </Link>
          </h3>
          <p className="mt-0.5 truncate text-sm text-ink-700">{t.title}</p>
          <p className="truncate text-xs text-ink-500">{t.credentials}</p>
          <span className="mt-1.5 inline-block rounded-full bg-sand-100 px-2 py-0.5 text-[11px] font-medium text-ink-600">Sample profile</span>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-[15px] leading-relaxed text-ink-700">{t.statement}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Specialties">
        {t.specialties.slice(0, 3).map((s) => (
          <li key={s} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">{specialtyLabel(s)}</li>
        ))}
      </ul>

      <dl className="mb-5 mt-5 grid gap-2 text-sm text-ink-600">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <Icon name="pin" className="h-4 w-4 shrink-0 text-brand-600" />
          <dd>{cityLabel(t.city)}, {st?.abbr}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Session types</dt>
          <Icon name={online ? "video" : "home"} className="h-4 w-4 shrink-0 text-brand-600" />
          <dd>{online && inPerson ? "Online & in person" : online ? "Online only" : "In person only"}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-sand-200 pt-4">
        <div className="text-sm">
          <span className="block font-semibold text-ink-900">${t.feeMin}–${t.feeMax} <span className="font-normal text-ink-500">/ session</span></span>
          <span className={`mt-0.5 flex items-center gap-1.5 ${t.acceptingClients ? "text-sage-600" : "text-ink-500"}`}>
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${t.acceptingClients ? "bg-sage-600" : "bg-ink-500"}`} />
            {t.acceptingClients ? "Accepting new clients" : "Currently full"}
          </span>
        </div>
        <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
          View profile <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>

      {/* Visible focus ring for keyboard users on the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl2 ring-2 ring-transparent ring-offset-2 group-has-[a:focus-visible]:ring-brand-600" />
    </article>
  );
}
