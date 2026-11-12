"use client";

import { useId, useRef } from "react";
import { GroupLink } from "@/components/ui/group-link";
import { WhatsAppMark } from "@/components/ui/icons";

export function CouponGate() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <button type="button" className="coupon-covered" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        <span className="coupon-covered-code" aria-hidden="true">ACHA+ · CUPONS</span>
        <span className="coupon-covered-label">Os próximos cupons estão no grupo <span aria-hidden="true">↗</span></span>
      </button>
      <dialog ref={dialog} className="coupon-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="coupon-dialog-panel">
          <button type="button" className="coupon-dialog-close" onClick={() => dialog.current?.close()} aria-label="Fechar convite">×</button>
          <span className="coupon-dialog-icon" aria-hidden="true"><WhatsAppMark /></span>
          <span className="coupon-dialog-eyebrow">MAIS CUPONS NO SEU WHATSAPP</span>
          <h2 id={titleId}>O próximo desconto pode ser seu.</h2>
          <p id={descriptionId}>Entre no grupo do Acha+ para receber cupons e achadinhos. Confira as regras de cada cupom e aproveite o que fizer sentido para você.</p>
          <GroupLink className="coupon-dialog-join">Quero receber os cupons</GroupLink>
          <small>É grátis. É seguro. Saia quando quiser.</small>
        </div>
      </dialog>
      <noscript><style>{".coupon-covered { display: none; }"}</style><GroupLink className="coupon-fallback">Receber cupons no grupo</GroupLink></noscript>
    </>
  );
}
