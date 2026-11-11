import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, WhatsAppMark } from "@/components/ui/icons";
import { discount, money, type EndedOffer, type Offer } from "@/content/offers";
import { StoreLogo } from "./store-logo";

const photoSizes = "(max-width: 600px) 46vw, (max-width: 1000px) 45vw, 290px";

export function OfferCard({ offer, destination = "store" }: { offer: Offer; destination?: "store" | "group" }) {
  if (offer.ended) return <EndedOfferCard offer={offer} />;
  const off = discount(offer);
  const group = destination === "group";
  const href = group ? siteConfig.links.group : offer.url;
  const label = group
    ? `Entrar no grupo do WhatsApp para receber achados como ${offer.shortTitle} (abre em uma nova aba)`
    : `Ver ${offer.shortTitle} na ${offer.store} (abre em uma nova aba)`;
  const rel = group ? "noopener noreferrer" : "sponsored noopener noreferrer";
  return (
    <article className="offer-card">
      <a className="offer-photo" href={href} target="_blank" rel={rel} aria-label={label}>
        <Image src={offer.image} alt={offer.shortTitle} fill sizes={photoSizes} />
        {off > 0 && <span className="offer-discount">{off}% OFF</span>}
      </a>
      <div className="offer-card-body">
        <StoreLogo store={offer.store} />
        <h3 title={offer.title}>{offer.title}</h3>
        <div className="offer-price">
          {offer.previousPrice && offer.previousPrice > offer.price ? <del>{money.format(offer.previousPrice)}</del> : <span className="offer-price-spacer" aria-hidden="true" />}
          <strong>{money.format(offer.price)}</strong>
        </div>
        <a className={`offer-buy${group ? " offer-buy--group" : ""}`} href={href} target="_blank" rel={rel} aria-label={label}>{group ? <>Entrar no grupo <WhatsAppMark width={17} height={17} /></> : <>Ver na loja <ArrowUpRight width={16} height={16} /></>}</a>
      </div>
    </article>
  );
}

// Sem link de compra: o preço já não vale, então o botão leva para o grupo.
function EndedOfferCard({ offer }: { offer: EndedOffer }) {
  const off = discount(offer);
  return (
    <article className="offer-card offer-card--ended">
      <div className="offer-photo">
        <Image src={offer.image} alt={offer.shortTitle} fill sizes={photoSizes} />
        <span className="offer-discount offer-discount--ended">JÁ ACABOU</span>
      </div>
      <div className="offer-card-body">
        <span className="offer-ended-tag">Oferta encerrada{off > 0 && ` · ${off}% OFF`}</span>
        <h3 title={offer.title}>{offer.title}</h3>
        <div className="offer-price">
          {offer.previousPrice && offer.previousPrice > offer.price ? <del>{money.format(offer.previousPrice)}</del> : <span className="offer-price-spacer" aria-hidden="true" />}
          <strong><span className="sr-only">Saiu por </span>{money.format(offer.price)}</strong>
        </div>
        <a className="offer-buy offer-buy--group" href={siteConfig.links.group} target="_blank" rel="noopener noreferrer">Quero a próxima <WhatsAppMark width={17} height={17} /><span className="sr-only"> (abre o convite do grupo no WhatsApp em uma nova aba)</span></a>
      </div>
    </article>
  );
}
