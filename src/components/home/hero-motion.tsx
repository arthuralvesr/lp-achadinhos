"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Isola a animação; texto, imagens e celulares continuam renderizados no servidor. */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const section = element?.closest("section");
    if (!element || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function render() {
      frame = 0;
      if (!element || !section) return;
      const distance = Math.max(220, Math.min(650, section.offsetHeight - window.innerHeight));
      const progress = reducedMotion.matches
        ? 0
        : Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
      element.style.setProperty("--scroll-progress", progress.toFixed(4));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={ref} className="hero-art">{children}</div>;
}
