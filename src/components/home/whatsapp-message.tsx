import Image from "next/image";
import { Fragment } from "react";
import { siteConfig } from "@/config/site";
import type { GroupPreviewMessage } from "@/content/hero";

function MessageText({ text, productUrl, tapCue }: { text: string; productUrl: string; tapCue: boolean }) {
  return text.split("\n").map((line, lineIndex) => (
    <div className={line ? "wa-text-line" : "wa-text-space"} key={lineIndex}>
      {line.split(/(https?:\/\/[^\s]+|\*[^*\n]+\*|~[^~\n]+~|_[^_\n]+_)/g).map((part, index) => {
        if (/^https?:\/\//.test(part)) return <a className={part === productUrl ? "wa-product-link" : undefined} data-tap={tapCue && part === productUrl} key={index} href={siteConfig.links.group} target="_blank" rel="noopener noreferrer">Entrar no grupo do WhatsApp<span className="sr-only"> (abre o convite em uma nova aba)</span>{tapCue && part === productUrl && <span className="wa-tap-cue" aria-hidden="true"><svg width="25" height="30" viewBox="0 0 25 30"><path d="M3 2v23l6-6 4 9 4-2-4-8 9-1Z" fill="#fff" stroke="#14251e" strokeWidth="1.5" strokeLinejoin="round" /></svg><i /></span>}</a>;
        if (part.startsWith("*") && part.endsWith("*")) return <strong key={index}>{part.slice(1, -1)}</strong>;
        if (part.startsWith("~") && part.endsWith("~")) return <del key={index}>{part.slice(1, -1)}</del>;
        if (part.startsWith("_") && part.endsWith("_")) return <em key={index}>{part.slice(1, -1)}</em>;
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </div>
  ));
}

/** O mesmo balão é usado no celular e nas mensagens que surgem nas laterais. */
export function WhatsAppMessage({ message, compact = false, tapCue = false, preload = false }: {
  message: GroupPreviewMessage;
  compact?: boolean;
  tapCue?: boolean;
  preload?: boolean;
}) {
  return (
    <article className={`wa-message${compact ? " wa-message--floating" : ""}`} data-message-id={message.id}>
      <div className="wa-sender">Acha Mais</div>
      {message.image && <div className="wa-message-photo"><Image src={message.image} alt={message.shortTitle} width={message.imageWidth ?? 500} height={message.imageHeight ?? 500} sizes={compact ? "(max-width: 600px) 144px, 210px" : "(max-width: 600px) 250px, 280px"} preload={preload} /></div>}
      <div className="wa-message-text"><MessageText text={message.text} productUrl={message.url} tapCue={tapCue} /></div>
      {message.excerpt && <a className="wa-full-bulletin" href={siteConfig.links.group} target="_blank" rel="noopener noreferrer">Ver boletim completo no grupo ↗</a>}
      <div className="wa-message-time">{message.excerpt && <span>Trecho do boletim</span>}<time dateTime={message.sentAt}>{message.time}</time></div>
    </article>
  );
}
