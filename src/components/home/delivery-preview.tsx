import Image from "next/image";
import type { GroupPreviewMessage } from "@/content/hero";
import { Check } from "@/components/ui/icons";

export function DeliveryPreview({ product }: { product: GroupPreviewMessage }) {
  return (
    <div className="delivery-preview">
      <div className="delivery-package" aria-hidden="true">
        <svg width="53" height="53" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"><path d="m10 19 22-11 22 11v26L32 56 10 45V19Z" /><path d="m10 19 22 11 22-11M32 30v26M21 13.5l22 11V35" /></svg>
        <span><Check /></span>
      </div>
      <span className="delivery-badge">Pedido entregue</span>
      <h2>Seu achado chegou!</h2>
      <p>Do grupo para a sua casa.</p>
      <div className="delivery-product">
        {product.image && <Image src={product.image} alt="" width={48} height={48} />}
        <span>{product.shortTitle}</span>
      </div>
      <ol className="delivery-timeline" aria-label="Etapas ilustrativas do pedido">
        {["Compra confirmada", "A caminho", "Entregue"].map((step) => <li key={step}><span><Check /></span>{step}</li>)}
      </ol>
      <small>Simulação de compra e entrega.</small>
    </div>
  );
}
