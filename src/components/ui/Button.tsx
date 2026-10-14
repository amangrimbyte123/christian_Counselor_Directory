import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  accent: "bg-coral-600 text-white hover:bg-coral-700",
  secondary: "bg-white text-brand-800 border border-brand-200 hover:bg-brand-50",
  ghost: "text-brand-800 hover:bg-brand-50",
};
const sizes: Record<Size, string> = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5 text-base", lg: "px-7 py-3.5 text-lg" };

export const buttonClass = (variant: Variant = "primary", size: Size = "md", extra = "") =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

export function ButtonLink({ href, variant, size, className = "", children }: { href: string; variant?: Variant; size?: Size; className?: string; children: ReactNode }) {
  return <Link href={href} className={buttonClass(variant, size, className)}>{children}</Link>;
}

export function Button({ variant, size, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button {...props} className={buttonClass(variant, size, className)} />;
}
