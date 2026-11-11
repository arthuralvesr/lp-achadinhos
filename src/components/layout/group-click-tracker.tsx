"use client";

import { useEffect } from "react";
import { pageview } from "@vercel/analytics";

// O plano Hobby não conta cliques: cada toque num convite do grupo vira uma visita virtual a /clique-no-grupo.
// O link segue direto para o WhatsApp, sem página intermediária.
export function GroupClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='chat.whatsapp.com']");
      if (link) pageview({ route: "/clique-no-grupo", path: "/clique-no-grupo" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
