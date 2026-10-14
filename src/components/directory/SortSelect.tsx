"use client";

import { useRouter } from "next/navigation";

/** Sort dropdown. Each option carries a server-built href, so filters are preserved. */
export function SortSelect({ value, options }: { value: string; options: { value: string; label: string; href: string }[] }) {
  const router = useRouter();
  return (
    <label className="flex items-center gap-2 text-sm text-ink-700">
      <span className="font-medium">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const o = options.find((x) => x.value === e.target.value);
          if (o) router.push(o.href);
        }}
        className="rounded-lg border border-sand-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
