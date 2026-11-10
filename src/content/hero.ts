import archive from "./group-preview.json";

export const heroContent = {
  title: ["Achados de verdade.", "No seu WhatsApp."],
  description:
    "Ofertas da Shopee e do Mercado Livre, mais cupons para aproveitar. A gente garimpa. Você recebe no grupo.",
  cta: "Quero entrar no grupo",
  reassurance: ["É grátis", "Sem cadastro", "Saia quando quiser"],
};

// Seleção pública de mensagens já enviadas. Não há acesso ao painel em tempo de execução.
export const groupPreview = {
  ...archive,
  // A primeira oferta é a mesma do print enviado como referência.
  messages: [...archive.messages].sort((a, b) => Number(b.id === "227") - Number(a.id === "227")),
};
export type GroupPreviewMessage = (typeof archive.messages)[number];
