import { PageHeader } from "@/components/layout/PageHeader";
import { RequestForm } from "@/components/therapist/RequestForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Christian Couples Directory",
  description: "Questions about the directory? Send us a message. This demo form validates input but does not store or send it.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Contact", href: "/contact/" }]} title="Contact us" intro="Questions, feedback or safety concerns? Send a note. This is a demo form: your message is validated but not stored or sent." />
      <div className="container-page py-10">
        <div className="max-w-xl rounded-xl2 border border-sand-200 bg-white p-6 shadow-card">
          <RequestForm idp="contact" submitLabel="Send message" messageLabel="How can we help?" />
        </div>
        <p className="mt-6 max-w-xl text-sm text-ink-600">Not an emergency service. In the US, call or text 988 in a crisis.</p>
      </div>
    </>
  );
}
