import Link from "next/link";
import type { Therapist } from "@/types";
import { TherapistCard } from "@/components/directory/TherapistCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";
import { revealDelay } from "@/lib/motion";

export function FeaturedTherapists({ therapists }: { therapists: Therapist[] }) {
  return (
    <section className="section" aria-labelledby="featured">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <SectionHeading id="featured" eyebrow="Meet the people" title={<>Get to know a counselor <em className="text-brand-700">before</em> you reach out</>}
            intro="Profiles show what matters up front: marriage focus areas, how they work, where they meet and what sessions cost. These are fictional sample profiles, shown so you can see how the directory works." />
          <Link href="/therapists/" className="link-arrow">Browse all counselors <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.map((t, i) => (
            // Three on phones keeps the page short; the rest are a tap away
            <li key={t.id} className={i >= 3 ? "hidden sm:block" : undefined} data-reveal style={revealDelay((i % 3) * 80)}>
              <TherapistCard t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
