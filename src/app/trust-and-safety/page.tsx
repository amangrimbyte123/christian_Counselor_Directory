import Link from "next/link";
import { ProsePage } from "@/components/layout/ProsePage";
import { Faq } from "@/components/ui/Misc";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trust and Safety: How to Choose a Christian Couples Counselor Safely",
  description: "How to verify a counselor's licence, what to expect from ethical couples counseling, and where to go in a crisis.",
  path: "/trust-and-safety/",
});

export default function TrustPage() {
  return (
    <ProsePage title="Trust and safety" path="/trust-and-safety/" intro="What this directory does, what it does not do, and how to protect yourself.">
      <div className="rounded-xl2 border border-coral-100 bg-coral-50 p-5 text-coral-700">
        <strong>If you are in crisis or danger:</strong> in the US, call or text <a href="tel:988">988</a>, or call 911. For domestic violence, call the National Domestic Violence Hotline at 1-800-799-7233. Outside the US, contact your local emergency number. This site cannot provide emergency help.
      </div>
      <h2>About this demo</h2>
      <p>All counselors, credentials, fees and biographies on this site are fictional sample data. Profiles are labelled &ldquo;sample&rdquo; and credentials show as &ldquo;not verified&rdquo;. There are no reviews or ratings.</p>
      <h2>How to verify a real counselor</h2>
      <ul>
        <li>Ask for their licence type and number, then look it up on your state licensing board&apos;s public search.</li>
        <li>Check that the licence is active and has no disciplinary actions.</li>
        <li>For online counseling, confirm they are licensed in the state where you are during sessions.</li>
        <li>Ask about specific training in couples therapy, not just individual counseling.</li>
      </ul>
      <h2>What ethical care looks like</h2>
      <ul>
        <li>Clear explanation of confidentiality and its limits.</li>
        <li>No guarantees of results, and no pressure to commit to long packages.</li>
        <li>Fairness to both partners, without taking sides.</li>
        <li>Respect for your faith, culture and boundaries, and no pressure to include more or less faith than you want.</li>
        <li>Safety first: joint couples counseling is not usually recommended where there is abuse.</li>
      </ul>
      <h2>Licensed counselors and pastoral counselors</h2>
      <p>Some Christian counselors are licensed clinicians regulated by a state board. Many pastoral or biblical counselors are not state-licensed. Both can be supportive, but only a licence can be checked with a board, so ask directly and verify. <Link href="/blog/licensed-therapist-vs-pastoral-counselor/">Read more about the differences</Link>.</p>
      <h2>Common questions</h2>
      <Faq items={[
        { q: "Does the directory verify credentials?", a: "In this demo, no. A live directory should verify licences with state boards and display the date of the last check." },
        { q: "How is my information used?", a: "In this demo, nothing you type into forms is stored or sent." },
        { q: "How do I report a concern about a counselor?", a: "Contact your state licensing board. You can also tell us through the contact page." },
      ]} />
      <p><Link href="/contact/">Contact us</Link> with safety questions.</p>
    </ProsePage>
  );
}
