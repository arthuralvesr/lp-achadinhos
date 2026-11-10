import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { GroupLink } from "@/components/ui/group-link";
import { OffersCatalog } from "@/components/offers/offers-catalog";
import { offers, offersArchiveDate } from "@/content/offers";
import "@/components/offers/offers.css";

export const metadata: Metadata = {
  title: "Promoções e achados · Acha+",
  description: "Explore os achados da Shopee e do Mercado Livre, filtre por loja e confira o produto direto na loja.",
};

export default function PromotionsPage() {
  return (
    <main id="conteudo" className="offers-page" tabIndex={-1}>
      <div className="offers-container">
        <div className="offers-page-top"><Link className="offers-back" href="/#achados"><ArrowUpRight width={16} height={16} />Voltar para o início</Link><Link className="offers-page-brand" href="/" aria-label="Acha+, início">acha<span>+</span></Link></div>
        <span className="offers-eyebrow">ESCOLHA O SEU PRÓXIMO ACHADO</span>
        <h1>Todas as <span>promoções.</span></h1>
        <p className="offers-page-intro">Explore no seu ritmo. Gostou de um produto? Confira todos os detalhes e compre direto na loja.</p>
        <OffersCatalog products={offers} />
        <p className="offers-note">Preços registrados em {offersArchiveDate}; podem ter mudado. Confira preço, frete e disponibilidade na loja. Alguns links podem gerar comissão para o Acha+, sem custo extra para você.</p>
        <aside className="offers-group-invite"><div><h2>Quer receber <span>os próximos achados?</span></h2><p>Ofertas e cupons no seu WhatsApp. Entre grátis e acompanhe do seu jeito.</p></div><GroupLink>Quero entrar no grupo</GroupLink></aside>
      </div>
    </main>
  );
}
