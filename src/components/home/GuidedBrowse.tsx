"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Plain-language starting points mapped to specialties. Nothing is stored or sent anywhere. */
const PROMPTS = [
  { id: "worry", text: "I worry a lot or feel on edge", specs: ["anxiety-therapy", "stress-and-burnout-therapy"] },
  { id: "heavy", text: "Things have felt heavy or flat for a while", specs: ["depression-therapy", "grief-counseling"] },
  { id: "tired", text: "I'm exhausted and stretched too thin", specs: ["stress-and-burnout-therapy", "anxiety-therapy"] },
  { id: "relationship", text: "A relationship feels strained", specs: ["relationship-counseling", "family-therapy"] },
  { id: "loss", text: "I've lost someone or something important", specs: ["grief-counseling", "life-transitions-therapy"] },
  { id: "past", text: "Something from the past still affects me", specs: ["trauma-therapy"] },
  { id: "change", text: "I'm going through a big change", specs: ["life-transitions-therapy", "stress-and-burnout-therapy"] },
  { id: "child", text: "I'd like support for my child or teen", specs: ["teen-therapy", "family-therapy"] },
  { id: "self", text: "I'd like to understand myself better", specs: ["life-transitions-therapy"] },
];

export function GuidedBrowse({ specialties }: { specialties: { slug: string; name: string; summary: string }[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const prompt = PROMPTS.find((p) => p.id === picked);
  const suggestions = prompt ? prompt.specs.map((s) => specialties.find((x) => x.slug === s)).filter((x) => x !== undefined) : [];

  return (
    <div className="rounded-xl2 border border-sand-200 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-coral-50 text-coral-700"><Icon name="compass" className="h-5 w-5" /></span>
        <h3 className="text-xl">Not sure where to start?</h3>
      </div>
      <p className="mt-2 text-ink-600">Pick whatever feels closest. It&apos;s only a starting point, not an assessment, and nothing you choose is saved.</p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="What feels closest to you right now?">
        {PROMPTS.map((p) => {
          const on = p.id === picked;
          return (
            <button key={p.id} type="button" aria-pressed={on} onClick={() => setPicked(on ? null : p.id)}
              className={`rounded-full border px-3.5 py-2 text-left text-sm font-medium transition-colors ${on ? "border-brand-700 bg-brand-700 text-white" : "border-sand-300 bg-sand-50 text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"}`}>
              {p.text}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-5">
        {prompt && suggestions.length > 0 && (
          <div className="rounded-xl bg-brand-50 p-4 sm:p-5">
            <p className="text-sm font-semibold text-brand-800">You might like to explore:</p>
            <ul className="mt-3 grid gap-2">
              {suggestions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/specialties/${s.slug}/`} className="group flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 transition-shadow hover:shadow-card">
                    <span><span className="block font-medium text-ink-900 group-hover:text-brand-800">{s.name}</span><span className="text-sm text-ink-600">{s.summary}</span></span>
                    <Icon name="arrow" className="h-4 w-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/therapists/?specialty=${suggestions[0].slug}`} className="link-arrow mt-4 text-sm">
              See therapists who focus on {suggestions[0].name.toLowerCase()} <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        )}
        {!prompt && (
          <p className="text-sm text-ink-500">Or skip this and <Link href="/specialties/" className="font-medium text-brand-800 underline underline-offset-2">browse every topic</Link>.</p>
        )}
      </div>
    </div>
  );
}
