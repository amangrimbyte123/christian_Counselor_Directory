import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PHOTOS } from "@/lib/images";

const STEPS = [
  { icon: "compass", t: "Explore your needs and preferences", d: "Start with what's on your mind, then narrow by location, online or in-person sessions, language and budget." },
  { icon: "users", t: "Compare therapist profiles", d: "Read about each person's focus, approach and fees at your own pace. Shortlisting two or three is a good start." },
  { icon: "message", t: "Contact someone when you're ready", d: "Send a short message or ask about a first call. Many therapists offer a brief consultation to check the fit." },
];

export function HowItWorks({ onlineCount }: { onlineCount: number }) {
  return (
    <section className="section bg-brand-900 text-white" aria-labelledby="how">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div data-reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">How it works</p>
          <h2 id="how" className="display mt-3 text-[2rem] text-white sm:text-[2.6rem]">Three gentle steps, at your own pace</h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative flex gap-5">
                {i < STEPS.length - 1 && <span aria-hidden="true" className="absolute left-6 top-14 h-[calc(100%-1.5rem)] w-px bg-brand-700" />}
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-600 bg-brand-800 text-brand-100">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-brand-200">Step {i + 1}</p>
                  <h3 className="mt-0.5 text-xl text-white sm:text-2xl">{s.t}</h3>
                  <p className="mt-2 max-w-lg text-brand-100">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative" data-reveal>
          <div className="photo-frame relative aspect-[4/3] overflow-hidden bg-brand-800 lg:aspect-[4/5]">
            <Image src={PHOTOS.online.src} alt={PHOTOS.online.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          <div className="relative -mt-16 ml-4 mr-4 rounded-2xl bg-white p-5 text-ink-900 shadow-lift sm:ml-8 sm:mr-auto sm:max-w-sm sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-700"><Icon name="video" className="h-4 w-4" /> Prefer to stay home?</p>
            <p className="mt-2 text-ink-700">{onlineCount} sample therapists offer secure video sessions, so you can choose beyond your own city.</p>
            <ButtonLink href="/online-therapy/" variant="accent" className="mt-4">Explore online therapy</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
