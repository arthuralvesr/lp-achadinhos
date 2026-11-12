import archive from "./group-preview.json";
import { discount, money, type LiveOffer } from "./offers";
import { siteOffers } from "./site-offers";

export const heroContent = {
  title: [["Chega de", "pagar caro."], ["Os achados", "estão no grupo."]],
  description:
    "Ofertas da Shopee e do Mercado Livre, mais cupons para aproveitar. A gente garimpa. Você recebe no grupo.",
  cta: "Quero entrar no grupo",
  reassurance: ["É grátis", "É seguro", "Saia quando quiser"],
};

export type GroupPreviewMessage = (typeof archive.messages)[number];

// Ordem do celular. O 1º produto é o que a demonstração toca, abre e "entrega"; só há 4 posições de card ao redor.
const heroMessageIds = ["jbl-tune-530bt", "153", "134", "171", "221"];

// Achado do site no mesmo formato das mensagens do grupo (não foi enviado no grupo).
const formatPrice = (value: number) => money.format(value).replace(/\s/, " ");
type DiscountedOffer = LiveOffer & { previousPrice: number };
function messageFromOffer(offer: DiscountedOffer, details: { headline: string; title: string; imageWidth: number; imageHeight: number; time: string }): GroupPreviewMessage {
  return {
    id: offer.id,
    title: details.title,
    shortTitle: offer.shortTitle,
    headline: details.headline,
    price: offer.price,
    previousPrice: offer.previousPrice,
    image: offer.image,
    imageWidth: details.imageWidth,
    imageHeight: details.imageHeight,
    url: offer.url,
    store: offer.store,
    text: [`🔥 *${details.headline}*`, "", details.title, "", `~De ${formatPrice(offer.previousPrice)}~`, `💰 *Por ${formatPrice(offer.price)}* (${discount(offer)}% OFF)`, "", `🛒 ${offer.url}`, "", "🖤 *Achadinhos Black Friday* · ofertas todos os dias"].join("\n"),
    excerpt: false,
    sentAt: offer.sentAt,
    time: details.time,
  };
}
const jbl = siteOffers.find((offer): offer is DiscountedOffer => offer.id === "jbl-tune-530bt" && !offer.ended && offer.previousPrice !== null);
const siteMessages = jbl ? [messageFromOffer(jbl, { headline: "JBL TUNE 530BT POR 189 🎧", title: "Fone de Ouvido JBL Tune 530BT Bluetooth Sem Fio Preto", imageWidth: 439, imageHeight: 500, time: "18:00" })] : [];

// Mensagens do acervo do grupo mais o achado do site. Não há acesso ao painel em tempo de execução.
const allMessages = [...siteMessages, ...archive.messages];
export const groupPreview = {
  ...archive,
  messages: heroMessageIds.flatMap((id) => allMessages.filter((message) => message.id === id)),
};
