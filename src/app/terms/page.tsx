import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use (Demo)",
  description: "Terms for using the Christian Couples Directory demonstration site.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <ProsePage title="Terms of use" path="/terms/" intro="Placeholder terms for the demo site.">
      <p>Practice listings come from public Google Maps information and are not verified by us. Information on this site is general and not medical advice, and nothing here creates a counselor–client relationship.</p>
      <p>If you are in crisis, call or text 988 (US) or your local emergency number.</p>
      <h2>Before going live</h2>
      <p>Replace this page with terms reviewed by a qualified lawyer.</p>
    </ProsePage>
  );
}
