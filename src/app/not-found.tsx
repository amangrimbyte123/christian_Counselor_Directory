import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-2 text-5xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-ink-600">The link may be old or mistyped. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/therapists/">Browse therapists</ButtonLink>
        <ButtonLink href="/specialties/" variant="secondary">Specialties</ButtonLink>
        <ButtonLink href="/locations/" variant="secondary">Locations</ButtonLink>
      </div>
      <p className="mt-6 text-sm text-ink-500"><Link href="/" className="underline">Back to the homepage</Link></p>
    </div>
  );
}
