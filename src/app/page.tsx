import { Hero } from "@/components/home/hero";
import { BrandMarquees } from "@/components/home/brand-marquees";
import { Benefits } from "@/components/home/benefits";
import { FeaturedOffers } from "@/components/home/featured-offers";
import { Groups } from "@/components/home/groups";
import { Coupons } from "@/components/home/coupons";
import { Faq } from "@/components/home/faq";
import { UrgencyBanner } from "@/components/home/urgency-banner";

export default function HomePage() {
  return (
    <main id="conteudo" className="home-page" tabIndex={-1}>
      <UrgencyBanner />
      <Hero />
      <BrandMarquees />
      <FeaturedOffers />
      <Groups />
      <Coupons />
      <Benefits />
      <Faq />
    </main>
  );
}
