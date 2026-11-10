import Image from "next/image";
import type { RefObject } from "react";
import type { GroupPreviewMessage } from "@/content/hero";
import { ArrowUpRight, WhatsAppMark } from "@/components/ui/icons";
import { GroupLink } from "@/components/ui/group-link";
import { WhatsAppMessage } from "./whatsapp-message";
import { DeliveryPreview } from "./delivery-preview";

export function WhatsAppPhone({ messages, incoming, chatRef, empty, finished, tapCue, productPreview, delivered, onClosePreview, onInteract }: {
  messages: GroupPreviewMessage[];
  incoming?: GroupPreviewMessage;
  chatRef: RefObject<HTMLDivElement | null>;
  empty: boolean;
  finished: boolean;
  tapCue: boolean;
  productPreview?: GroupPreviewMessage;
  delivered: boolean;
  onClosePreview: () => void;
  onInteract: () => void;
}) {
  return (
    <div className="demo-phone" role="group" aria-label="Reprodução visual de uma conversa do WhatsApp" onFocusCapture={onInteract} onPointerDown={onInteract} onWheel={onInteract}>
      <span className="phone-side-button phone-side-button--left" aria-hidden="true" />
      <span className="phone-side-button phone-side-button--right" aria-hidden="true" />
      <div className="demo-phone-screen">
        <div className="wa-status" aria-hidden="true">
          <span>9:41</span><span className="wa-island" />
          <svg width="38" height="12" viewBox="0 0 38 12" fill="currentColor"><path d="M1 8h2v3H1zm4-3h2v6H5zm4-3h2v9H9z" /><path d="M15 4q5-5 10 0m-8 2q3-3 6 0m-4 2q1-1 2 0" fill="none" stroke="currentColor" strokeWidth="1.3" /><rect x="28" y="3" width="8" height="7" rx="1.5" fill="none" stroke="currentColor" /><path d="M30 5h4v3h-4zm7 0h1v3h-1z" /></svg>
        </div>
        <div className="wa-header">
          <span className="wa-back" aria-hidden="true"><svg width="11" height="20" viewBox="0 0 12 22" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m10 2-8 9 8 9" /></svg></span>
          <span className="wa-avatar" aria-hidden="true">a+</span>
          <div className="wa-group"><span>Acha+ | Achadinhos</span><small>Somente admins enviam mensagens</small></div>
          <svg className="wa-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2" y="6" width="13" height="12" rx="3" /><path d="m15 10 6-3v10l-6-3" /></svg>
        </div>
        <div className="wa-conversation" data-empty={empty} inert={Boolean(productPreview) || empty} ref={chatRef} tabIndex={0} aria-label="Mensagens da demonstração; role para explorar">
          <div className="wa-day">09 DE NOVEMBRO</div>
          {messages.map((message, index) => <WhatsAppMessage message={message} key={message.id} preload={index === 0} tapCue={tapCue && index === 0} />)}
        </div>
        {finished ? (
          <div className="wa-end-cta">
            <p>Gostou dos achados?</p>
            <GroupLink className="phone-group-cta">Quero ver mais achados</GroupLink>
            <small>Entre grátis no grupo do WhatsApp.</small>
          </div>
        ) : <div className="wa-input"><svg width="11" height="13" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="2" y="7" width="10" height="8" rx="2" /><path d="M4 7V4a3 3 0 0 1 6 0v3" /></svg>Somente admins podem enviar mensagens</div>}
        <div className="wa-home" aria-hidden="true"><span /></div>
        {incoming && <div className="wa-notification" key={incoming.id} aria-hidden="true"><span className="wa-notification-icon"><WhatsAppMark /></span><div><span className="wa-notification-app">WHATSAPP <small>agora</small></span><strong>Acha+ | Achadinhos</strong><p>{incoming.headline || "🎟️ Cupons do dia chegaram ao grupo"}</p></div></div>}
        {productPreview && <section className="demo-store-preview" aria-label={delivered ? "Simulação de pedido entregue" : "Prévia do produto na loja"}>
          <div className="store-preview-browser"><button type="button" onClick={onClosePreview} aria-label="Voltar à conversa">‹</button><span>{delivered ? "Seu pedido" : "Prévia do produto"}<small>{productPreview.store}</small></span><span className="store-preview-dots" aria-hidden="true">•••</span></div>
          <div className={`store-preview-brand ${productPreview.store === "Shopee" ? "store-preview-brand--shopee" : ""}`}><span>{productPreview.store}</span><small>{delivered ? "SIMULAÇÃO" : "PRÉVIA"}</small></div>
          {delivered ? <DeliveryPreview product={productPreview} /> : <>
          {productPreview.image && <div className="store-preview-photo"><Image src={productPreview.image} alt={productPreview.shortTitle} fill sizes="280px" /></div>}
          <div className="store-preview-body"><h2>{productPreview.title}</h2>{productPreview.previousPrice && <del>{money.format(productPreview.previousPrice)}</del>}<strong>{productPreview.price ? money.format(productPreview.price) : "Confira na loja"}</strong><a href={productPreview.url} target="_blank" rel="noopener noreferrer">Comprar na loja <ArrowUpRight width={16} height={16} /></a><p>Confira preço, frete e disponibilidade na loja.</p></div>
          </>}
          <span className="store-preview-home" aria-hidden="true" />
        </section>}
      </div>
    </div>
  );
}

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
