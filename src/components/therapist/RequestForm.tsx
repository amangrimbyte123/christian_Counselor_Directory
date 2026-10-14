"use client";

import { useActionState } from "react";
import { submitRequest, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const initial: FormState = { ok: false };

export function RequestForm({ therapistSlug, therapistName, idp = "rf", submitLabel = "Send request", messageLabel }: {
  therapistSlug?: string; therapistName?: string; idp?: string; submitLabel?: string; messageLabel?: string;
}) {
  const [state, action, pending] = useActionState(submitRequest, initial);

  if (state.ok) {
    return (
      <div role="status" className="rounded-xl bg-sage-50 p-4 text-sage-600">
        <p className="flex items-center gap-2 font-semibold"><Icon name="check" className="h-5 w-5" /> Request received (demo)</p>
        <p className="mt-1 text-sm text-ink-700">{state.message}</p>
      </div>
    );
  }

  const e = state.errors ?? {};
  const field = (key: keyof typeof e) => ({
    "aria-invalid": e[key] ? true : undefined,
    "aria-describedby": e[key] ? `${idp}-${key}-err` : undefined,
  });
  const err = (key: keyof typeof e) => e[key] && <p id={`${idp}-${key}-err`} className="mt-1 text-sm text-coral-700">{e[key]}</p>;

  return (
    <form action={action} noValidate className="space-y-4">
      {therapistSlug && <input type="hidden" name="therapist" value={therapistSlug} />}
      <div>
        <label htmlFor={`${idp}-name`} className="mb-1.5 block text-sm font-semibold">Your name</label>
        <input id={`${idp}-name`} name="name" autoComplete="name" className="input" {...field("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${idp}-email`} className="mb-1.5 block text-sm font-semibold">Email</label>
        <input id={`${idp}-email`} name="email" type="email" autoComplete="email" className="input" {...field("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={`${idp}-message`} className="mb-1.5 block text-sm font-semibold">{messageLabel ?? (therapistName ? `What would you like to work on with ${therapistName.split(" ")[0]}?` : "Your message")}</label>
        <textarea id={`${idp}-message`} name="message" rows={4} className="input" {...field("message")} />
        {err("message")}
        <p className="mt-1 text-xs text-ink-500">Please do not include sensitive health details or emergencies here.</p>
      </div>
      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-700">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-sand-300 text-brand-700" {...field("consent")} />
          <span>I understand this is a demo: my message is validated but not stored or sent.</span>
        </label>
        {err("consent")}
      </div>
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Sending…" : submitLabel}</Button>
    </form>
  );
}
