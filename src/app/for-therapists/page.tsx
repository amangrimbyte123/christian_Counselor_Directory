import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Therapists: Listing Your Practice",
  description: "How therapists will be able to create and verify a profile on CounselorDirectory.",
  path: "/for-therapists/",
});

export default function ForTherapistsPage() {
  return (
    <ProsePage title="For therapists" path="/for-therapists/" intro="Listings are not open yet: this is a demo.">
      <p>In a live version, clinicians would create a profile, submit licence details for verification and manage availability and fees.</p>
      <h2>Planned profile checklist</h2>
      <ul>
        <li>Licence type, number and state (verified against the licensing board).</li>
        <li>Specialties, approaches, languages and session formats.</li>
        <li>Fees, sliding scale and availability.</li>
      </ul>
      <p>Want to see what a profile looks like? <Link href="/therapists/">Browse the sample directory</Link>. Questions? <Link href="/contact/">Contact us</Link>.</p>
    </ProsePage>
  );
}
