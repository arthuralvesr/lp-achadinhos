import Image from "next/image";
import { receiptCoupon, receiptFind } from "@/content/coupons";
import { discount, money, offersArchiveDate } from "@/content/offers";
import { GroupLink } from "@/components/ui/group-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { CouponGate } from "./coupon-gate";
import "./coupons.css";

export function Coupons() {
  const saving = receiptFind.previousPrice ? receiptFind.previousPrice - receiptFind.price : 0;

  return (
    <section className="coupons-section" id="cupons" aria-labelledby="coupons-title">
      <div className="coupons-layout">
        <div className="coupons-copy">
          <h2 id="coupons-title">O melhor preço<br /><span>ainda pode cair.</span></h2>
          <p>Cupons e achadinhos para pagar menos, direto no seu WhatsApp.</p>
          <GroupLink className="coupons-main-cta">Quero receber os cupons</GroupLink>
          <small>Grátis. Sem cadastro.</small>
        </div>
        <div className="coupon-receipt-scene">
          <article className="coupon-receipt" aria-labelledby="receipt-title">
            <h3 id="receipt-title" className="sr-only">Um pedaço da nota de achados</h3>
            <div className="coupon-receipt-cut" aria-hidden="true"><span>… CUPONS DO GRUPO · ACERVO …</span></div>
            <div className="coupon-receipt-row"><div><strong>{receiptCoupon.name} · Mercado Livre</strong><small>{receiptCoupon.condition}</small></div><span>{receiptCoupon.value}</span></div>
            <CouponGate />
            <div className="coupon-receipt-find">
              <span className="coupon-receipt-find-label">NO FIM DA NOTA, UM ACHADINHO.</span>
              <div className="coupon-receipt-product"><div className="coupon-receipt-photo"><Image src={receiptFind.image} alt={receiptFind.shortTitle} width={90} height={100} /></div><div><span className="coupon-receipt-store">{receiptFind.store}</span><h4>{receiptFind.shortTitle}</h4><span className="coupon-receipt-discount">{discount(receiptFind)}% OFF</span></div></div>
              <div className="coupon-receipt-total"><span>PREÇO DO ACHADO</span><div><del>{receiptFind.previousPrice && money.format(receiptFind.previousPrice)}</del><strong>{money.format(receiptFind.price)}</strong></div></div>
              <p className="coupon-receipt-savings">{money.format(saving)} a menos nessa oferta.</p>
              <a className="coupon-receipt-buy" href={siteConfig.links.group} target="_blank" rel="noopener noreferrer">Receber achadinhos no grupo <ArrowUpRight width={16} height={16} /><span className="sr-only"> (abre o convite no WhatsApp em uma nova aba)</span></a>
            </div>
            <footer className="coupon-receipt-footer"><span className="coupon-receipt-barcode" aria-hidden="true" /></footer>
          </article>
          <p className="coupons-archive-note">Acervo de {offersArchiveDate}. Cupom e oferta independentes. Preços e regras podem ter mudado. Receba os próximos cupons e achadinhos no grupo.</p>
        </div>
      </div>
    </section>
  );
}
