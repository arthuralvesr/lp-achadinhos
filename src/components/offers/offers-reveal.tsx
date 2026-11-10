"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function OffersReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!preference.matches) {
          animations.push(entry.target.animate(
            [{ opacity: 0, transform: "translate3d(0, 32px, 0) scale(.96)" }, { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }],
            { duration: 750, delay: Number((entry.target as HTMLElement).dataset.offerReveal) * 100, easing: "cubic-bezier(.16,.8,.25,1)", fill: "backwards" },
          ));
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: .15 });
    element.querySelectorAll("[data-offer-reveal]").forEach((target) => observer.observe(target));
    function stopMotion() {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
    }
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return <div className="offers-container" ref={ref}>{children}</div>;
}
