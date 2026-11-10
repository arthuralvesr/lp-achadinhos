import { offers } from "./offers";

// Exemplos do boletim público 221, de 09/11/2026, em group-preview.json.
// Não são cupons verificados ao vivo nem descontos aplicados ao produto abaixo.
export const receiptCoupon = { name: "Black Friday", value: "R$ 50 OFF", condition: "A partir de R$ 120." } as const;

export const receiptFind = offers.find((offer) => offer.id === "222")!;
