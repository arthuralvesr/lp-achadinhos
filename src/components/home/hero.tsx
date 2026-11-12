import { GroupLink } from "@/components/ui/group-link";
import { Check, Lock } from "@/components/ui/icons";
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
            <h1 id="hero-title">
              <span className="hero-title-row">
                <span className="hero-title-line">{heroContent.title[0][0]}</span>{" "}
                <span className="hero-title-line">{heroContent.title[0][1]}</span>
              </span>{" "}
              <span className="hero-title-row hero-title-accent">
                <span className="hero-title-line">{heroContent.title[1][0]}</span>{" "}
                <span className="hero-title-line">{heroContent.title[1][1]}</span>
              </span>
            </h1>
            <p className="hero-description">{heroContent.description}</p>
            <div className="hero-actions">
              <GroupLink className="hero-main-cta">{heroContent.cta}</GroupLink>
            </div>
            <ul className="hero-reassurance">
              {heroContent.reassurance.map((item, index) => <li key={item}>{index === 1 ? <Lock /> : <Check />}{item}</li>)}
            </ul>
          </div>
        </HeroExperience>
      </HeroMotion>
    </section>
  );
}
