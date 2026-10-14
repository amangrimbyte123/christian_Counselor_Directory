import type { CSSProperties } from "react";

/** Stagger for `data-reveal` elements (see components/ui/Reveal). */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
