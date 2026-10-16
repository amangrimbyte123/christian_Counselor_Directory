import Link from "next/link";
import type { Therapist } from "@/types";
import { Avatar, Rating } from "@/components/ui/Misc";
import { Icon } from "@/components/ui/Icon";
import { cityLabel, stateLabel } from "@/lib/repository";
import { websiteLabel } from "@/lib/listing";

export function TherapistCard({ t }: { t: Therapist }) {
  const st = stateLabel(t.state);
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
          <p className="mt-0.5 truncate text-sm text-ink-700">{t.category}</p>
          <Rating rating={t.rating} count={t.ratingCount} className="mt-1" />
        </div>
      </div>

      <dl className="mb-5 mt-5 grid gap-2 text-sm text-ink-600">
        <div className="flex items-start gap-2">
          <dt className="sr-only">Address</dt>
          <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <dd>{t.street ? <>{t.street}<br /></> : null}{cityLabel(t.city)}, {st?.abbr} {t.zip}</dd>
        </div>
        {t.phone && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Phone</dt>
            <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-600" />
            <dd>{t.phone}</dd>
          </div>
        )}
        {t.website && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Website</dt>
            <Icon name="globe" className="h-4 w-4 shrink-0 text-brand-600" />
            <dd className="truncate">{websiteLabel(t.website)}</dd>
          </div>
        )}
      </dl>

      <div className="mt-auto flex items-center justify-end border-t border-sand-200 pt-4">
        <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
          View details <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>

      {/* Visible focus ring for keyboard users on the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl2 ring-2 ring-transparent ring-offset-2 group-has-[a:focus-visible]:ring-brand-600" />
    </article>
  );
}
