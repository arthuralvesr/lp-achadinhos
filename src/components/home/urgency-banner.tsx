"use client";

import { useEffect, useRef, useState } from "react";
import "./urgency-banner.css";

const countdownSeconds = 15 * 60;
const demoNames = [
  "Mariana S.", "Lucas A.", "Camila R.", "Pedro M.", "Juliana C.",
  "Rafael L.", "Fernanda B.", "Bruno T.", "Amanda F.", "Gabriel P.",
  "Larissa D.", "Thiago V.", "Beatriz G.", "Diego N.", "Carolina O.",
];

export function UrgencyBanner() {
  const bannerRef = useRef<HTMLElement>(null);
  const [entries, setEntries] = useState<string[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(countdownSeconds);
  const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  useEffect(() => {
    const deadline = Date.now() + countdownSeconds * 1000;
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) clearInterval(interval);
    };
    const interval = setInterval(updateCountdown, 1000);
    document.addEventListener("visibilitychange", updateCountdown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", updateCountdown);
    };
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const remainingNames = [...demoNames];

    const schedule = () => {
      clearTimeout(timer);
      if (!visible || document.hidden || remainingNames.length === 0) return;

      timer = setTimeout(() => {
        const index = Math.floor(Math.random() * remainingNames.length);
        const [name] = remainingNames.splice(index, 1);
        setEntries((previous) => [...previous, name]);
        schedule();
      }, 6000 + Math.random() * 5000);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(banner);
    document.addEventListener("visibilitychange", schedule);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return (
    <aside ref={bannerRef} className="urgency-banner" aria-label="Contagem regressiva e entradas no grupo">
      <div className="urgency-banner-inner page-container">
        <div className="urgency-banner-main">
          <p className="urgency-banner-copy">
            <svg className="urgency-banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m13.5 2-9 12H11l-.5 8 9-12H13l.5-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <strong>Últimas vagas!</strong>
          </p>
          <div className="urgency-banner-timer" role="timer" aria-label="Tempo restante" aria-live="off">
            <strong>{minutes}:{seconds}</strong>
          </div>
        </div>
        <div className="urgency-banner-activity" role="status" aria-live="polite" aria-atomic="true">
          {entries.length > 0 ? (
            <p className="urgency-banner-entry" key={entries.length}>
              <span className="urgency-banner-avatar" aria-hidden="true">{entries.at(-1)?.charAt(0)}</span>
              <span><strong>{entries.at(-1)}</strong> entrou agora</span>
            </p>
          ) : <p className="urgency-banner-waiting">Seu próximo achado começa no grupo.</p>}
        </div>
      </div>
    </aside>
  );
}
