"use server";

export interface FormState {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message" | "consent", string>>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demo handler for appointment requests and contact messages.
 * It validates on the server but intentionally stores/sends nothing.
 * Replace the marked line with a real email/CRM/database call when connecting a backend.
 */
export async function submitRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";

  const errors: NonNullable<FormState["errors"]> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write at least a short sentence (10+ characters).";
  if (!consent) errors.consent = "Please confirm you understand how this demo handles your message.";
  if (Object.keys(errors).length) return { ok: false, errors };

  // TODO(backend): deliver `{ name, email, message, therapist: formData.get("therapist") }` here.
  return { ok: true, message: "Thanks! In a live directory your request would now be sent. Nothing was stored or emailed because this is a demo." };
}
