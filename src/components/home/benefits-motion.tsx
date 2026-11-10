"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function BenefitsMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!preference.matches) {
          animations.push(entry.target.animate(
            [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 650, delay: Number((entry.target as HTMLElement).dataset.benefitReveal) * 70, easing: "cubic-bezier(.2,.75,.25,1)" },
          ));
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: .18 });
    root.querySelectorAll("[data-benefit-reveal]").forEach((element) => observer.observe(element));
    function stopMotion() {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
    }
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopMotion);
    };
  }, []);

  return <div ref={ref} className="benefits-content">{children}</div>;
}
