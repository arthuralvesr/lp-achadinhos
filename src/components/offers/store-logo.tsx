import Image from "next/image";
import type { Store } from "@/content/offers";

export function StoreLogo({ store }: { store: Store }) {
  const shopee = store === "Shopee";
  return (
    <span className={`offer-store offer-store--${shopee ? "shopee" : "meli"}`}>
      <Image src={`/images/stores/${shopee ? "shopee" : "mercado-livre"}.svg`} alt={shopee ? "" : store} width={shopee ? 18 : 66} height={shopee ? 20 : 26} />
      {shopee && <span>Shopee</span>}
    </span>
  );
}
