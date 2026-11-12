"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { Offer } from "@/content/offers";
import "./cart-to-group-transition.css";

type Product = Pick<Offer, "id" | "image" | "shortTitle">;
type Point = { x: number; y: number };
type Stop = Point & { scroll: number };
type Geometry = {
  start: number;
  end: number;
  deposit: number;
  pickup: number[];
  sources: Point[];
  stops: Stop[];
  destination: Point;
  scale: number;
  height: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const smooth = (progress: number) => progress * progress * (3 - 2 * progress);

function followRoute(stops: Stop[], scroll: number): Point {
  const index = Math.max(1, stops.findIndex((stop) => stop.scroll >= scroll));
  const from = stops[index - 1];
  const to = stops[index];
  const progress = clamp((scroll - from.scroll) / (to.scroll - from.scroll));
  return {
    x: mix(from.x, to.x, smooth(progress)),
    // Linear document Y keeps the cart in view even on the longer mobile layout.
    y: mix(from.y, to.y, progress) - Math.sin(progress * Math.PI) * 28,
  };
}

export function CartToGroupTransition({ products }: { products: Product[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.closest("section");
    const destination = section?.closest("main")?.querySelector<HTMLElement>("[data-cart-destination]");
    const sources = products.map((product) => section?.querySelector<HTMLElement>(`[data-cart-source="${product.id}"] .offer-photo`));
    const cart = root?.querySelector<HTMLElement>(".cart-collection-cart");
    const count = root?.querySelector<HTMLElement>(".cart-collection-count");
    const label = root?.querySelector<HTMLElement>(".cart-collection-label");
    const copies = root ? Array.from(root.querySelectorAll<HTMLElement>(".cart-collection-product")) : [];
    if (!root || !section || !destination || !cart || !count || !label || sources.some((source) => !source) || copies.length !== 3) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let geometry: Geometry | null = null;
    let frame = 0;
    let needsMeasure = true;
    let disposed = false;

    function hide() {
      if (root) root.dataset.active = "false";
      destination?.style.removeProperty("--cart-delivery");
    }

    function measure() {
      const height = window.innerHeight;
      const scroll = window.scrollY;
      const points = sources.map((source) => {
        const box = source!.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + scroll + box.height / 2 };
      });
      const target = destination!.getBoundingClientRect();
      const targetPoint = { x: target.left + target.width / 2, y: target.top + scroll + target.height / 2 };
      const start = points[0].y - height * .65;
      const pickup = points.map((point, index) => Math.max(start + height * (.12 + index * .18), point.y - height * .52));
      const deposit = Math.max(pickup[2] + height * .4, targetPoint.y - height * .62);
      const end = deposit + height * .25;
      const scale = window.innerWidth <= 600 ? .76 : 1;
      const approach = { x: Math.max(90, targetPoint.x - 85 * scale), y: targetPoint.y + 12 };
      geometry = {
        start, end, deposit, pickup, sources: points, destination: targetPoint, scale, height,
        stops: [
          { x: -110, y: points[0].y + 45, scroll: start },
          ...points.map((point, index) => ({ x: point.x, y: point.y + 45 * scale, scroll: pickup[index] })),
          { ...approach, scroll: deposit },
          { x: approach.x + 20, y: approach.y, scroll: end },
        ],
      };
    }

    function render() {
      frame = 0;
      if (disposed || !root || !destination || !cart || !count || !label) return;
      if (needsMeasure) {
        measure();
        needsMeasure = false;
      }
      if (!geometry || preference.matches || document.visibilityState !== "visible") {
        hide();
        return;
      }
      const scroll = window.scrollY;
      const { start, end, deposit, pickup, sources: points, destination: target, scale, height, stops } = geometry;
      if (scroll <= start || scroll >= end) {
        hide();
        return;
      }

      const progress = clamp((scroll - start) / (end - start));
      const delivery = clamp((scroll - deposit) / (end - deposit));
      const position = followRoute(stops, scroll);
      const cartScale = scale * mix(1, .3, smooth(delivery));
      const cartOpacity = clamp((scroll - start) / (height * .05)) * (1 - smooth(clamp((delivery - .35) / .65)));
      const collected = pickup.filter((moment) => scroll >= moment + height * .065).length;
      root.dataset.active = "true";
      root.dataset.phase = scroll < pickup[2] + height * .065 ? "collecting" : delivery > 0 ? "delivering" : "travelling";
      root.dataset.progress = progress.toFixed(3);
      cart.style.transform = `translate3d(${position.x - 80}px, ${position.y - scroll - 65}px, 0) scale(${cartScale}) rotate(${Math.sin(progress * Math.PI * 3) * 4}deg)`;
      cart.style.opacity = String(cartOpacity);
      cart.style.setProperty("--wheel-turn", `${(scroll - start) * .8}deg`);
      count.textContent = String(collected);
      count.dataset.visible = String(collected > 0);
      label.textContent = delivery > 0 ? "Seus achados, no grupo" : "Levando os achados pro grupo";
      destination.style.setProperty("--cart-delivery", String(Math.sin(delivery * Math.PI)));

      copies.forEach((copy, index) => {
        const pick = clamp((scroll - pickup[index] + height * .065) / (height * .13));
        const slot = { x: position.x + (index - 1) * 28 * scale, y: position.y - 25 * scale };
        const toss = clamp((scroll - deposit - index * height * .025) / (height * .16));
        let point: Point;
        if (scroll < deposit) {
          point = { x: mix(points[index].x, slot.x, smooth(pick)), y: mix(points[index].y, slot.y, smooth(pick)) - Math.sin(pick * Math.PI) * 85 };
        } else {
          point = { x: mix(slot.x, target.x + (index - 1) * 16, smooth(toss)), y: mix(slot.y, target.y, smooth(toss)) - Math.sin(toss * Math.PI) * 95 };
        }
        copy.dataset.state = toss > 0 ? "delivering" : pick === 1 ? "collected" : "flying";
        copy.style.opacity = String(pick === 0 ? 0 : (1 - smooth(clamp((toss - .7) / .3))));
        copy.style.transform = `translate3d(${point.x - 24}px, ${point.y - scroll - 24}px, 0) rotate(${mix((index - 1) * 12, 0, toss)}deg) scale(${scale * mix(1, .5, toss)})`;
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }
    function invalidate() {
      needsMeasure = true;
      schedule();
    }

    const observer = new ResizeObserver(invalidate);
    observer.observe(section);
    observer.observe(destination);
    observer.observe(destination.closest("section")!);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", invalidate);
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", schedule);
    document.fonts.ready.then(() => { if (!disposed) invalidate(); });
    schedule();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", schedule);
      hide();
    };
  }, [products]);

  return (
    <div ref={rootRef} className="cart-collection" data-active="false" aria-hidden="true">
      {products.map((product) => <div className="cart-collection-product" key={product.id}><Image src={product.image} alt="" width={42} height={42} /></div>)}
      <div className="cart-collection-cart">
        <span className="cart-collection-label">Levando os achados pro grupo</span>
        <span className="cart-collection-count" data-visible="false">0</span>
        <svg className="cart-collection-drawing" viewBox="0 0 160 130" fill="none">
          <defs><linearGradient id={gradientId} x1="38" y1="38" x2="135" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="var(--brand-gold)" /><stop offset="1" stopColor="var(--brand-orange)" /></linearGradient></defs>
          <ellipse cx="85" cy="121" rx="57" ry="5" fill="#3b210e" fillOpacity=".2" />
          <path d="M9 19h15l21 76h87" stroke="var(--surface)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 39h113l-13 46H43L32 39Z" fill={`url(#${gradientId})`} stroke="#834210" strokeWidth="3" strokeLinejoin="round" />
          <path d="m57 48 5 28m25-28v28m27-28-5 28M43 62h94" stroke="#ad5b0a" strokeWidth="2" strokeOpacity=".55" />
          {[54, 123].map((x) => <g key={x}><circle cx={x} cy="109" r="10" fill="var(--ink)" stroke="var(--surface)" strokeWidth="3" /><g className="cart-collection-spokes"><path d={`M${x - 4} 109h8m-4-4v8`} stroke="var(--brand-gold)" strokeWidth="2" /></g></g>)}
        </svg>
      </div>
    </div>
  );
}
