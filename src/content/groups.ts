// Estados de apresentação definidos pelo usuário; não há consulta à lotação do WhatsApp.
// O grupo disponível usa o convite público atual de src/config/site.ts.
export const groupsContent = {
  eyebrow: "SEU PRÓXIMO ACHADO TEM LUGAR AQUI",
  title: ["Seu próximo achado", "começa no grupo."],
  description: "Escolha o grupo disponível e receba ofertas e cupons direto no WhatsApp.",
  groups: [
    { number: 12, status: "full" },
    { number: 13, status: "full" },
    { number: 14, status: "open" },
  ],
} as const;
