import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Counselors: Listing Your Christian Couples Practice",
  description: "How Christian couples and marriage counselors will be able to create and verify a profile on Christian Couples Directory.",
  path: "/for-therapists/",
});

export default function ForTherapistsPage() {
  return (
    <ProsePage title="For counselors" path="/for-therapists/" intro="Listings are not open yet: this is a demo.">
      <p>This directory lists counselors who work with couples and integrate Christian faith at the couple&apos;s request. In a live version, counselors would create a profile, submit licence details for verification and manage availability and fees.</p>
      <h2>Planned profile checklist</h2>
      <ul>
        <li>Licence type, number and state (verified against the licensing board).</li>
        <li>Couples services (such as marriage, premarital or affair recovery), couples-therapy training and approaches, languages and session formats.</li>
        <li>How you integrate Christian faith, such as prayer, scripture or shared values, and how you work with couples who see faith differently.</li>
        <li>Fees, sliding scale and availability.</li>
      </ul>
      <p>Want to see what a profile looks like? <Link href="/therapists/">Browse the sample directory</Link>. Questions? <Link href="/contact/">Contact us</Link>.</p>
    </ProsePage>
  );
}
