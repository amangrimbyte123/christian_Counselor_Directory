import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Christian Couples Directory",
  description: "Christian Couples Directory is a demonstration directory showing how a calm, trustworthy search for Christian couples counselors can work.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <ProsePage title="About Christian Couples Directory" path="/about/" intro="A calmer, clearer way for Christian couples to find marriage support.">
      <p>Christian Couples Directory is a demonstration project: a fully working directory of Christian couples and marriage counselors built on <strong>fictional sample data</strong>. It shows how searching, filtering, profiles and requests can feel simple and trustworthy.</p>
      <h2>What we believe</h2>
      <ul>
        <li><strong>Clarity over pressure.</strong> No countdown timers, no fake scarcity.</li>
        <li><strong>Honesty about data.</strong> Anything that is sample or unverified is labelled as such.</li>
        <li><strong>Fit matters.</strong> The right counselor is about connection with you both, and respect for your faith, as much as credentials.</li>
        <li><strong>Faith on your terms.</strong> Every couple decides how much prayer, scripture or shared values belongs in their sessions.</li>
      </ul>
      <p>Ready to look around? <Link href="/therapists/">Browse the sample directory</Link> or read our <Link href="/trust-and-safety/">trust and safety</Link> notes.</p>
    </ProsePage>
  );
}
