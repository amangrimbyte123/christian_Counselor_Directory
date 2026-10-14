import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Badge({ children, tone = "neutral", icon }: { children: ReactNode; tone?: "neutral" | "brand" | "sage" | "coral" | "sand"; icon?: string }) {
  const tones = {
    neutral: "bg-white text-ink-700 border-sand-300",
    brand: "bg-brand-50 text-brand-800 border-brand-200",
    sage: "bg-sage-100 text-sage-600 border-sage-200",
    coral: "bg-coral-50 text-coral-700 border-coral-100",
    sand: "bg-sand-100 text-ink-700 border-sand-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

/** Generated placeholder avatar (initials on a soft gradient). Clearly not a real photo. */
export function Avatar({ name, hue, size = 64 }: { name: string; hue: number; size?: number }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const id = `av${hue}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`Placeholder avatar for ${name}`} className="shrink-0 rounded-full ring-4 ring-white">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 42% 88%)`} />
          <stop offset="1" stopColor={`hsl(${(hue + 35) % 360} 36% 74%)`} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${id})`} />
      {/* soft abstract shoulders keep it human without pretending to be a photo */}
      <circle cx="32" cy="74" r="26" fill="rgba(255,255,255,.28)" />
      <text x="32" y="38" textAnchor="middle" fontSize="21" fontFamily="var(--font-serif), Georgia, serif" fill="rgba(28,43,45,.78)">{initials}</text>
    </svg>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "left", id }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center"; id?: string }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="display mt-3 text-[2rem] sm:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-600">{intro}</p>}
    </div>
  );
}

/** Native <details> accordion: accessible, no client JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-sand-200 rounded-xl2 border border-sand-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Icon name="chevron" className="h-5 w-5 shrink-0 text-brand-700 transition-transform group-open:rotate-90" />
          </summary>
          <p className="mt-3 text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-coral-100 bg-coral-50 px-3.5 py-2.5 text-sm text-coral-700">
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children ?? "Sample profile. Demo data only: not a real person, and credentials are not verified."}</span>
    </p>
  );
}
