"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface ConcernSlide {
  src: string;
  alt: string;
  label: string;
  text: string;
  href: string;
  cta: string;
}

const INTERVAL = 6000;

/**
 * Hero image card that auto-slides through common concerns (arrows, thumbnails, swipe). Holds while a keyboard
 * user is inside it, has a visible pause control, and never auto-plays for people who prefer reduced motion.
 */
export function HeroGallery({ slides }: { slides: ConcernSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // user-chosen pause (button)
  const [held, setHeld] = useState(false); // temporary pause while keyboard focus is inside
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = !paused && !held && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, index, slides.length]);

  const current = slides[index];
  const touchX = useRef<number | null>(null);
  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div
      // Hold only for keyboard users; a mouse click also focuses the button, which must not stop autoplay
      onFocus={(e) => setHeld(e.target.matches(":focus-visible"))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false); }}
      aria-roledescription="carousel" aria-label="Common reasons people reach out"
      role="region"
    >
      <div className="photo-frame relative aspect-[4/3] touch-pan-y overflow-hidden bg-sand-200 shadow-lift lg:aspect-square"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}>
        {/* Sliding track: every photo sits side by side and the row moves one card width per slide */}
        <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={s.src} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
              <Image src={s.src} alt={i === index ? s.alt : ""} fill
                preload={i === 0} sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[50%_30%]" />
            </div>
          ))}
        </div>

        {/* Previous / next */}
        <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          {([[-1, "Previous slide", "M15 6l-6 6 6 6"], [1, "Next slide", "M9 6l6 6-6 6"]] as const).map(([dir, label, d]) => (
            <button key={label} type="button" onClick={() => go(dir)} aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink-900 shadow-card backdrop-blur transition hover:bg-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
            </button>
          ))}
        </div>

        {/* Caption for the current concern */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 via-ink-900/40 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
          <div aria-live={playing ? "off" : "polite"} className="text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-100">
              {index + 1} / {slides.length} · Common reasons people reach out
            </p>
            <p className="mt-1 font-serif text-2xl sm:text-3xl">{current.label}</p>
            <p className="mt-1 text-sm text-white/85">{current.text}</p>
          </div>
          <Link href={current.href}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-white">
            {current.cta} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        {!reduced && (
          <button type="button" onClick={() => setPaused((p) => !p)}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink-900 backdrop-blur transition-colors hover:bg-white"
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
            {paused
              ? <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              : <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
          </button>
        )}
      </div>

      {/* Thumbnails double as slide picker */}
      <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
        {slides.map((s, i) => (
          <li key={s.src}>
            <button type="button" onClick={() => setIndex(i)} aria-current={i === index ? "true" : undefined}
              aria-label={`Show: ${s.label}`}
              className={`group relative block aspect-square w-full overflow-hidden rounded-xl ring-offset-2 ring-offset-sand-50 transition ${i === index ? "ring-2 ring-brand-700" : "opacity-70 hover:opacity-100"}`}>
              <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-105" />
              {i === index && playing && (
                <span aria-hidden="true" key={index} className="absolute inset-x-0 bottom-0 h-1 origin-left animate-[progress_6s_linear] bg-white/90" />
              )}
            </button>
            <span className="mt-1.5 hidden truncate text-center text-xs text-ink-600 sm:block">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
