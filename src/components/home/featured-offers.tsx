import Link from "next/link";
import { ArrowUpRight, WhatsAppMark } from "@/components/ui/icons";
import { featuredOffers, offersArchiveDate } from "@/content/offers";
import { OfferCard } from "@/components/offers/offer-card";
import { OffersReveal } from "@/components/offers/offers-reveal";
import { GroupLink } from "@/components/ui/group-link";
import { CartToGroupTransition } from "./cart-to-group-transition";
import "@/components/offers/offers.css";

export function FeaturedOffers() {
  return (
    <section className="offers-section" id="achados" aria-labelledby="offers-title">
      <OffersReveal>
        <div className="offers-section-heading" data-offer-reveal="0">
          <div><h2 id="offers-title">Escolhidas <span>para o seu dia.</span></h2><p>Pequenas descobertas para deixar a rotina mais prática.</p></div>
          <Link className="offers-all" href="/promocoes">Ver todas as promoções <ArrowUpRight width={17} height={17} /></Link>
        </div>
        <div className="offers-grid offers-grid--featured">
          {featuredOffers.slice(0, 3).map((offer, index) => <div className="featured-offer" key={offer.id} data-cart-source={offer.id} data-offer-reveal={index + 1}><OfferCard offer={offer} /></div>)}
          <article className="offer-vip" data-offer-reveal="4" aria-label="Convite para o grupo VIP">
            <div className="offer-vip-preview" aria-hidden="true" inert><OfferCard offer={featuredOffers[3]} /></div>
            <div className="offer-vip-content"><span className="offer-vip-mark" aria-hidden="true"><WhatsAppMark /></span><span className="offer-vip-label">NO GRUPO VIP</span><h3>Mais achados<br />para você.</h3><p>Receba ofertas e cupons direto no seu WhatsApp.</p><GroupLink className="offer-vip-cta">Entrar no VIP</GroupLink><small>É grátis. Saia quando quiser.</small></div>
          </article>
        </div>
        <p className="offers-note">Preços registrados em {offersArchiveDate}. Confira preço, frete e disponibilidade na loja. Alguns links podem gerar comissão para o Acha+, sem custo extra para você.</p>
      </OffersReveal>
      <CartToGroupTransition products={featuredOffers.slice(0, 3).map(({ id, image, shortTitle }) => ({ id, image, shortTitle }))} />
    </section>
  );
}
