import { benefitsContent } from "@/content/benefits";
import { GroupLink } from "@/components/ui/group-link";
import { BenefitsMotion } from "./benefits-motion";
import { BenefitsCards } from "./benefits-cards";
import "./benefits.css";

export function Benefits() {
  return (
    <section className="benefits" id="vantagens" aria-labelledby="benefits-title">
      <BenefitsMotion>
        <div className="benefits-heading" data-benefit-reveal="0">
          <span className="benefits-eyebrow"><span aria-hidden="true" />{benefitsContent.eyebrow}</span>
          <h2 id="benefits-title">{benefitsContent.title[0]}<br /><span>{benefitsContent.title[1]}</span></h2>
          <p>{benefitsContent.description}</p>
        </div>
        <BenefitsCards />
        <div className="benefits-join" data-benefit-reveal="0"><GroupLink className="benefits-cta">Quero fazer parte do grupo</GroupLink><p>É grátis. Sem cadastro. Do seu jeito.</p></div>
      </BenefitsMotion>
    </section>
  );
}
