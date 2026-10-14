import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

/** Shared layout for text pages (about, privacy, terms…). */
export function ProsePage({ title, intro, path, children }: { title: string; intro?: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, href: path }]} title={title} intro={intro} />
      <div className="container-page py-10">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-700 [&_h2]:mt-10 [&_h2]:text-3xl [&_a]:text-brand-800 [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </>
  );
}
