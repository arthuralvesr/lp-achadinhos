import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { discount, money, type Offer } from "@/content/offers";
import { StoreLogo } from "./store-logo";

export function OfferCard({ offer }: { offer: Offer }) {
  const off = discount(offer);
  return (
    <article className="offer-card">
      <a className="offer-photo" href={offer.url} target="_blank" rel="sponsored noopener noreferrer" aria-label={`Ver ${offer.shortTitle} na ${offer.store} (abre em uma nova aba)`}>
        <Image src={offer.image} alt={offer.shortTitle} fill sizes="(max-width: 600px) 46vw, (max-width: 1000px) 45vw, 290px" />
        {off > 0 && <span className="offer-discount">{off}% OFF</span>}
      </a>
      <div className="offer-card-body">
        <StoreLogo store={offer.store} />
        <h3 title={offer.title}>{offer.title}</h3>
        <div className="offer-price">
          {offer.previousPrice && offer.previousPrice > offer.price ? <del>{money.format(offer.previousPrice)}</del> : <span className="offer-price-spacer" aria-hidden="true" />}
          <strong>{money.format(offer.price)}</strong>
        </div>
        <a className="offer-buy" href={offer.url} target="_blank" rel="sponsored noopener noreferrer" aria-label={`Ver ${offer.shortTitle} na ${offer.store} (abre em uma nova aba)`}>Ver na loja <ArrowUpRight width={16} height={16} /></a>
      </div>
    </article>
  );
}
