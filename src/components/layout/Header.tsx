"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";

export const NAV = [
  { href: "/therapists/", label: "Find a counselor" },
  { href: "/specialties/", label: "Services" },
  { href: "/locations/", label: "Locations" },
  { href: "/online-therapy/", label: "Online counseling" },
  { href: "/blog/", label: "Resources" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Christian Couples Directory home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-white">
        <Icon name="heart" className="h-5 w-5" />
      </span>
      <span className="font-serif text-xl font-semibold text-ink-900">Christian<span className="text-brand-700">Couples</span></span>
    </Link>
  );
}

export function Header() {
  // Menu is "open" only for the path it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openAt === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[15px] font-medium hover:bg-brand-50 ${active ? "bg-brand-50 text-brand-800" : "text-ink-700"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/for-therapists/" className="px-3 py-2 text-[15px] font-medium text-ink-700 hover:text-brand-800">For counselors</Link>
          <Link href="/therapists/" className={buttonClass("primary", "sm")}>Search counselors</Link>
        </div>
        <button type="button" onClick={() => setOpenAt(open ? null : pathname)} aria-expanded={open} aria-controls="mobile-nav"
          className="grid h-11 w-11 place-items-center rounded-full text-ink-900 hover:bg-brand-50 lg:hidden">
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-sand-200 bg-sand-50 lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-lg px-3 py-3 text-lg font-medium text-ink-900 hover:bg-brand-50">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/for-therapists/" className="block rounded-lg px-3 py-3 text-lg font-medium text-ink-900 hover:bg-brand-50">For counselors</Link></li>
            <li className="pt-2"><Link href="/therapists/" className={buttonClass("primary", "md", "w-full")}>Search counselors</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
