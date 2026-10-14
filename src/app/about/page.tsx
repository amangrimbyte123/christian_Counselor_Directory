import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About CounselorDirectory",
  description: "CounselorDirectory is a demonstration directory showing how a calm, trustworthy therapist search can work.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <ProsePage title="About CounselorDirectory" path="/about/" intro="A calmer, clearer way to find mental health support.">
      <p>CounselorDirectory is a demonstration project: a fully working therapist directory built on <strong>fictional sample data</strong>. It shows how searching, filtering, profiles and requests can feel simple and trustworthy.</p>
      <h2>What we believe</h2>
      <ul>
        <li><strong>Clarity over pressure.</strong> No countdown timers, no fake scarcity.</li>
        <li><strong>Honesty about data.</strong> Anything that is sample or unverified is labelled as such.</li>
        <li><strong>Fit matters.</strong> The right therapist is about connection as much as credentials.</li>
      </ul>
      <p>Ready to look around? <Link href="/therapists/">Browse the sample directory</Link> or read our <Link href="/trust-and-safety/">trust and safety</Link> notes.</p>
    </ProsePage>
  );
}
