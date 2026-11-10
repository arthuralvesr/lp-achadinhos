"use client";

import { useState } from "react";
import Image from "next/image";
import { benefitsContent } from "@/content/benefits";
import { BenefitsNotifications } from "./benefits-notifications";

export function BenefitsCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  return (
    <div className="benefits-cards" role="group" aria-label="Vantagens do grupo. Toque ou foque um card para destacar.">
      <div className="benefits-track" data-expanded={active !== null} onPointerLeave={() => setHovered(null)}>
        {[0, 2].map((start) => (
          <div className="benefits-pair" key={start}>
            {benefitsContent.items.slice(start, start + 2).map((item, offset) => {
              const index = start + offset;
              return (
                <article className={`benefit-card benefit-card--${item.tone}`} data-active={active === index} data-benefit-reveal={index} key={item.id} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(index); }}>
                  <div className="benefit-photo"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 600px) 55vw, (max-width: 900px) 65vw, 550px" style={{ objectPosition: item.imagePosition }} /></div>
                  <div className="benefit-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
                  <button className="benefit-card-toggle" type="button" aria-label={`Destacar: ${item.title}`} aria-pressed={selected === index} onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} onClick={() => setSelected((current) => current === index ? null : index)} />
                </article>
              );
            })}
          </div>
        ))}
      </div>
      <BenefitsNotifications />
    </div>
  );
}
