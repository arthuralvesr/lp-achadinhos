import { brandRibbons } from "@/content/brands";
import "./brand-marquees.css";

export function BrandMarquees() {
  return (
    <section className="brand-marquees" aria-label="Marketplaces e exemplos de marcas de produtos">
      <p className="sr-only">Ofertas da Shopee e do Mercado Livre. Exemplos de marcas de produtos que podem aparecer: Samsung, JBL, Nike, Xiaomi, Philips, Adidas e Mondial.</p>
      {brandRibbons.map((brands, index) => (
        <div className={`brand-ribbon brand-ribbon--${index === 0 ? "front" : "back"}`} key={index} aria-hidden="true">
          <div className="brand-ribbon-track">
            {[0, 1, 2, 3].map((copy) => (
              <div className="brand-ribbon-set" key={copy}>
                {brands.map((brand) => (
                  <span className="brand-ribbon-item" key={brand.style}>
                    <span className={`brand-wordmark brand-wordmark--${brand.style}`}>{brand.name}</span>
                    <span className="brand-ribbon-star">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
