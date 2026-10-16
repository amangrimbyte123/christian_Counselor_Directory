import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Christian Couples Directory",
  description: "Christian Couples Directory helps Christian couples find marriage and couples counseling practices near them, with clear information and no pressure.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <ProsePage title="About Christian Couples Directory" path="/about/" intro="A calmer, clearer way for Christian couples to find marriage support.">
      <p>Christian Couples Directory lists counseling practices across the US that come up when couples search for Christian couples therapy and marriage counseling. Listings are built from <strong>public Google Maps information</strong>: name, address, phone, website, hours and Google rating. We have not verified licences or how each practice includes faith, so we encourage you to ask.</p>
      <h2>What we believe</h2>
      <ul>
        <li><strong>Clarity over pressure.</strong> No countdown timers, no fake scarcity.</li>
        <li><strong>Honesty about data.</strong> We say where every listing comes from and what we have not checked.</li>
        <li><strong>Fit matters.</strong> The right counselor is about connection with you both, and respect for your faith, as much as credentials.</li>
        <li><strong>Faith on your terms.</strong> Every couple decides how much prayer, scripture or shared values belongs in their sessions.</li>
      </ul>
      <p>Ready to look around? <Link href="/therapists/">Browse the directory</Link> or read our <Link href="/trust-and-safety/">trust and safety</Link> notes.</p>
    </ProsePage>
  );
}
