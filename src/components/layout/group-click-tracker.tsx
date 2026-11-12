"use client";

import { useEffect } from "react";
import { pageview } from "@vercel/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// O plano Hobby não conta cliques: cada toque num convite do grupo vira uma visita virtual a /clique-no-grupo.
// O mesmo toque vira Lead no Pixel da Meta, que é o evento que a campanha otimiza.
// O link segue direto para o WhatsApp, sem página intermediária.
export function GroupClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='chat.whatsapp.com']");
      if (!link) return;
      pageview({ route: "/clique-no-grupo", path: "/clique-no-grupo" });
      window.fbq?.("track", "Lead");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
