"use client";

import { useEffect } from "react";

/**
 * Fades in elements marked `data-reveal` as they scroll into view.
 * Content is fully visible without JS; anything already on screen is shown before hiding starts, so nothing flickers.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      else io.observe(el);
    }
    document.documentElement.classList.add("js-reveal");

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
