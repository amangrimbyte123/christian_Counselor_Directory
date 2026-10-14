import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Icon } from "./Icon";

/** Visual breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-600">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-ink-900">{c.name}</span>
              ) : (
                <Link href={c.href} className="underline-offset-2 hover:text-brand-800 hover:underline">{c.name}</Link>
              )}
              {!last && <Icon name="chevron" className="h-3.5 w-3.5 text-ink-500" />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </nav>
  );
}
