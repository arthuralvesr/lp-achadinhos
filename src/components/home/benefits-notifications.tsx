"use client";

import { useEffect, useRef } from "react";
import { NotificationPreview } from "@/components/ui/notification-preview";

const notifications = [
  { id: "find", title: "Olha esse achado 👀", text: "Uma descoberta para facilitar a sua rotina." },
  { id: "coupon", title: "Tem cupom no grupo! 🎟️", text: "Confira o código e as regras para aproveitar." },
  { id: "daily", title: "Seu garimpo chegou ✨", text: "Shopee e Mercado Livre, no seu WhatsApp." },
];

export function BenefitsNotifications() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    function update() {
      if (element) element.dataset.running = String(visible && document.visibilityState === "visible");
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: .15 });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={ref} className="benefits-notifications" data-running="false" aria-hidden="true">
      {notifications.map((notification) => (
        <NotificationPreview className={`benefits-notification benefits-notification--${notification.id}`} key={notification.id} title={notification.title} description={notification.text} />
      ))}
    </div>
  );
}
