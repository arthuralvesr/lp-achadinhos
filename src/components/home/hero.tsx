import { GroupLink } from "@/components/ui/group-link";
import { Check } from "@/components/ui/icons";
import { heroContent, groupPreview } from "@/content/hero";
import { HeroMotion } from "./hero-motion";
import { HeroExperience } from "./hero-experience";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <HeroMotion>
        <HeroExperience messages={groupPreview.messages}>
          <div className="hero-copy page-container" id="grupo">
            <h1 id="hero-title">{heroContent.title[0]}<br /><span>{heroContent.title[1]}</span></h1>
            <p className="hero-description">{heroContent.description}</p>
            <div className="hero-actions">
              <GroupLink className="hero-main-cta">{heroContent.cta}</GroupLink>
            </div>
            <ul className="hero-reassurance">
              {heroContent.reassurance.map((item) => <li key={item}><Check />{item}</li>)}
            </ul>
          </div>
        </HeroExperience>
      </HeroMotion>
    </section>
  );
}
