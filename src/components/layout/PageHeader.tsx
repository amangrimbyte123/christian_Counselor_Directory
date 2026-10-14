import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

/** Consistent top-of-page block: breadcrumbs, a single <h1>, intro and optional actions. */
export function PageHeader({ crumbs, title, intro, children }: { crumbs: Crumb[]; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-sand-200 bg-gradient-to-b from-brand-50 to-sand-50">
      <div className="container-page pb-8 sm:pb-10">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro && <div className="mt-3 max-w-3xl text-lg text-ink-600">{intro}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
