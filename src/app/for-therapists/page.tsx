import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Counselors: Listing Your Christian Couples Practice",
  description: "Is your practice listed on Christian Couples Directory? How to correct or remove a listing, and what verified profiles will include.",
  path: "/for-therapists/",
});

export default function ForTherapistsPage() {
  return (
    <ProsePage title="For counselors" path="/for-therapists/" intro="Is your practice listed? Here is where the information comes from and how to change it.">
      <p>Listings are built from public Google Maps information for practices that appear in searches for Christian couples therapy. If your practice is listed and something is wrong, or you would like it removed, <Link href="/contact/">contact us</Link> and we will update it. Updating your Google Business Profile also helps, as we refresh listings from it.</p>
      <p>We plan to let counselors claim their listing, verify their licence and add the details couples ask about most.</p>
      <h2>Planned profile checklist</h2>
      <ul>
        <li>Licence type, number and state (verified against the licensing board).</li>
        <li>Couples services (such as marriage, premarital or affair recovery), couples-therapy training and approaches, languages and session formats.</li>
        <li>How you integrate Christian faith, such as prayer, scripture or shared values, and how you work with couples who see faith differently.</li>
        <li>Fees, sliding scale and availability.</li>
      </ul>
      <p>Want to see what a profile looks like? <Link href="/therapists/">Browse the directory</Link>. Questions? <Link href="/contact/">Contact us</Link>.</p>
    </ProsePage>
  );
}
