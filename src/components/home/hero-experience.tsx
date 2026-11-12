"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { WhatsAppMark } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import type { GroupPreviewMessage } from "@/content/hero";
import { WhatsAppPhone } from "./whatsapp-phone";
import { WhatsAppMessage } from "./whatsapp-message";
import { PhoneModel } from "./phone-model";

const positions = ["near-left", "near-right", "far-left", "far-right"];

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function HeroExperience({ messages, children }: { messages: GroupPreviewMessage[]; children: ReactNode }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [inView, setInView] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [commerceStage, setCommerceStage] = useState<"waiting" | "tap" | "product" | "delivery" | "done">("waiting");
  const rootRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const interactionTimer = useRef<number | undefined>(undefined);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => true);
  const displayedCount = reducedMotion ? messages.length : visibleCount;
  const finished = displayedCount >= messages.length;
  const products = messages.filter((message) => message.image);
  const settled = hasLanded || reducedMotion;
  const running = inView && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    if (!reducedMotion) return;
    const frame = window.requestAnimationFrame(() => setHasLanded(true));
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(interactionTimer.current), []);

  useEffect(() => {
    if (!settled || !running || finished) return;
    const timers: number[] = [];
    if (visibleCount === 1 && commerceStage !== "done") {
      if (commerceStage === "waiting") timers.push(window.setTimeout(() => setCommerceStage("tap"), 1000));
      if (commerceStage === "tap") timers.push(window.setTimeout(() => setCommerceStage("product"), 500));
      if (commerceStage === "product") timers.push(window.setTimeout(() => setCommerceStage("delivery"), 1600));
      if (commerceStage === "delivery") timers.push(window.setTimeout(() => setCommerceStage("done"), 2400));
    } else {
      timers.push(window.setTimeout(() => setIncoming(true), visibleCount === 0 ? 160 : 450));
      timers.push(window.setTimeout(() => {
        setVisibleCount((count) => Math.min(count + 1, messages.length));
        setIncoming(false);
      }, visibleCount === 0 ? 2100 : 2800));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [settled, running, finished, visibleCount, messages.length, commerceStage]);

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;
    chat.scrollTo({ top: displayedCount <= 1 ? 0 : chat.scrollHeight, behavior: reducedMotion ? "instant" : "smooth" });
  }, [displayedCount, reducedMotion]);

  function pauseForInteraction() {
    setPaused(true);
    setIncoming(false);
    window.clearTimeout(interactionTimer.current);
    interactionTimer.current = window.setTimeout(() => setPaused(false), 6500);
  }
  function closeProductPreview() {
    setCommerceStage("done");
    pauseForInteraction();
    window.requestAnimationFrame(() => chatRef.current?.focus({ preventScroll: true }));
  }

  return (
    <div ref={rootRef} className="hero-experience" data-step={displayedCount} data-commerce={commerceStage} data-phase={settled ? "ready" : "entering"} data-running={running}>
      <noscript><style>{`.hero-experience .phone-model,.hero-experience .phone-arrival{animation:none!important;transform:none}.hero-experience .floating-offer{opacity:1;visibility:visible;transform:rotate(var(--tilt))}.wa-conversation[data-empty="true"] .wa-message{visibility:visible}`}</style></noscript>
      {children}
      <span className="sr-only" id="offer-interaction-help">Ao focar, a promoção vem para a frente. Pressione Enter ou Espaço para mantê-la em destaque.</span>
      {products.map((product, index) => {
        const visible = settled && (reducedMotion || index < visibleCount);
        return (
          <div className={`offer-float offer-float--${positions[index]}`} key={product.id} data-visible={visible} data-selected={selectedOffer === product.id} role="group" aria-label={`Promoção: ${product.shortTitle}`} aria-describedby="offer-interaction-help" tabIndex={visible ? 0 : -1} inert={!visible} onClickCapture={() => setSelectedOffer(product.id)} onKeyDown={(event) => {
            if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              setSelectedOffer(product.id);
            }
          }}>
            <div className="offer-drift"><div className="floating-offer"><WhatsAppMessage message={product} compact /><a className="hero-offer-summary" href={siteConfig.links.group} target="_blank" rel="noopener noreferrer"><WhatsAppMark /><span><small>WhatsApp<span>agora</span></small><span className="hero-summary-sender">Acha+ | Achadinhos</span><strong>{product.headline}</strong></span><span className="sr-only">Entrar no grupo do WhatsApp (abre em uma nova aba)</span></a></div></div>
          </div>
        );
      })}
      <div className="hero-preview" id="previa" role="group" aria-label="Demonstração com achados reais no formato das mensagens do grupo">
        <div className="stage-glow" aria-hidden="true" />
        <div className="stage-orbit" aria-hidden="true" />
        <div className="central-phone">
          <PhoneModel settled={settled} onLand={() => setHasLanded(true)}>
            <WhatsAppPhone messages={messages.slice(0, Math.max(1, displayedCount))} incoming={settled && incoming && !reducedMotion ? messages[visibleCount] : undefined} chatRef={chatRef} empty={displayedCount === 0} finished={finished} tapCue={commerceStage === "tap" && !reducedMotion} productPreview={!reducedMotion && (commerceStage === "product" || commerceStage === "delivery") ? products[0] : undefined} delivered={commerceStage === "delivery"} onClosePreview={closeProductPreview} onInteract={pauseForInteraction} />
          </PhoneModel>
        </div>
        <div className="phone-landing-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
