import archive from "./group-preview.json";

export type Store = "Mercado Livre" | "Shopee";
export type Offer = {
  id: string;
  title: string;
  shortTitle: string;
  price: number;
  previousPrice: number | null;
  image: string;
  url: string;
  store: Store;
  sentAt: string;
};

// Acervo público já enviado; não é um feed de preços em tempo real.
export const offers: Offer[] = archive.messages.flatMap((message): Offer[] => {
  if (!message.image || message.price === null || (message.store !== "Mercado Livre" && message.store !== "Shopee")) return [];
  return [{ id: message.id, title: message.title, shortTitle: message.shortTitle, price: message.price, previousPrice: message.previousPrice, image: message.image, url: message.url, store: message.store, sentAt: message.sentAt }];
}).sort((a, b) => b.sentAt.localeCompare(a.sentAt));

const featuredOrder = ["227", "214", "224", "222"];
export const featuredOffers = [...offers].sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));
export const offersArchiveDate = archive.archiveDate;
export const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export function discount(offer: Offer) {
  return offer.previousPrice && offer.previousPrice > offer.price ? Math.round((1 - offer.price / offer.previousPrice) * 100) : 0;
}
