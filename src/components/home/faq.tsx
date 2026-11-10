import { faqContent } from "@/content/faq";
import "./faq.css";

export function Faq() {
  return (
    <section className="faq-section" id="perguntas-frequentes" aria-labelledby="faq-title">
      <div className="faq-layout">
        <div className="faq-heading">
          <span className="faq-eyebrow"><span aria-hidden="true" />ANTES DE ENTRAR</span>
          <h2 id="faq-title">Perguntas<br /><span>frequentes.</span></h2>
          <p>{faqContent.description}</p>
        </div>
        <div className="faq-list">
          {faqContent.items.map((item, index) => (
            <details className="faq-item" name="acha-faq" key={item.id} open={index === 0}>
              <summary>
                <h3>{item.question}</h3>
                <span className="faq-toggle" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 8h10" /><path className="faq-toggle-vertical" d="M8 3v10" /></svg></span>
              </summary>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
