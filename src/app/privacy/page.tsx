import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy (Demo)",
  description: "How the CounselorDirectory demo handles your information.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy policy" path="/privacy/" intro="Placeholder policy for the demo site.">
      <p>This demonstration site does not store, sell or send the information you enter in forms. Search filters are kept in the page address only.</p>
      <h2>Before going live</h2>
      <p>A production directory handling health-related enquiries needs a reviewed privacy policy, cookie/consent handling where applicable, and legal advice on health-data rules in your jurisdiction.</p>
    </ProsePage>
  );
}
