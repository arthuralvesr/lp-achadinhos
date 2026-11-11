import archive from "./group-preview.json";
import { featuredOfferRank } from "./featured-selection";
import { siteOffers } from "./site-offers";

export type Store = "Mercado Livre" | "Shopee";
type OfferBase = {
  id: string;
  title: string;
  shortTitle: string;
  price: number;
  previousPrice: number | null;
  image: string;
  // Envio no grupo ou conferência do preço no site.
  sentAt: string;
};
export type LiveOffer = OfferBase & { url: string; store: Store; ended?: false };
// Oferta que já acabou: aparece sem link de compra, com convite para o grupo.
export type EndedOffer = OfferBase & { url: null; store: null; ended: true };
export type Offer = LiveOffer | EndedOffer;

// Acervo público já enviado; não é um feed de preços em tempo real.
const groupOffers: Offer[] = archive.messages.flatMap((message): Offer[] => {
  if (!message.image || message.price === null || (message.store !== "Mercado Livre" && message.store !== "Shopee")) return [];
  return [{ id: message.id, title: message.title, shortTitle: message.shortTitle, price: message.price, previousPrice: message.previousPrice, image: message.image, url: message.url, store: message.store, sentAt: message.sentAt }];
});

export const offers: Offer[] = [...siteOffers, ...groupOffers].sort((a, b) => Number(Boolean(a.ended)) - Number(Boolean(b.ended)) || b.sentAt.localeCompare(a.sentAt));

export const featuredOffers = [...offers].sort((a, b) => featuredOfferRank(a.id) - featuredOfferRank(b.id));
// Acervo do grupo (05 a 09/11) mais os achados do site, conferidos em 10/11.
export const offersArchiveDate = "05 a 10/11/2026";
export const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export function discount(offer: Offer) {
  return offer.previousPrice && offer.previousPrice > offer.price ? Math.round((1 - offer.price / offer.previousPrice) * 100) : 0;
}
