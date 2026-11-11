// A mesma seleção alimenta a vitrine, o carrinho e o achado da nota (o 4º precisa estar ativo).
// A ordem do celular da hero fica em hero.ts.
export const featuredOfferIds = ["jbl-tune-530bt", "adizero-drive-rc", "185", "248"] as const;

export function featuredOfferRank(id: string) {
  const index = featuredOfferIds.findIndex((selected) => selected === id);
  return index < 0 ? featuredOfferIds.length : index;
}
