import { featuredOffers } from "./offers";

// Exemplos do boletim público 221, de 09/11/2026, em group-preview.json.
// Não são cupons verificados ao vivo nem descontos aplicados ao produto abaixo.
export const receiptCoupon = { name: "Black Friday", value: "R$ 50 OFF", condition: "A partir de R$ 120." } as const;

const find = featuredOffers[3];
if (find.ended) throw new Error("O achado da nota precisa ser uma oferta ativa (4º item de featured-selection.ts)");
export const receiptFind = find;
