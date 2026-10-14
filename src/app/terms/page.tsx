import { ProsePage } from "@/components/layout/ProsePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use (Demo)",
  description: "Terms for using the CounselorDirectory demonstration site.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <ProsePage title="Terms of use" path="/terms/" intro="Placeholder terms for the demo site.">
      <p>This site is a demonstration. Profiles are fictional, information is general and not medical advice, and nothing here creates a therapist–client relationship.</p>
      <p>If you are in crisis, call or text 988 (US) or your local emergency number.</p>
      <h2>Before going live</h2>
      <p>Replace this page with terms reviewed by a qualified lawyer.</p>
    </ProsePage>
  );
}
