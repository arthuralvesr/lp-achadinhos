"use client";

import { useState } from "react";
import { discount, type Offer, type Store } from "@/content/offers";
import { OfferCard } from "./offer-card";

const stores = ["Todas", "Mercado Livre", "Shopee"] as const;
function normalize(text: string) { return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

export function OffersCatalog({ products }: { products: Offer[] }) {
  const [query, setQuery] = useState("");
  const [store, setStore] = useState<Store | "Todas">("Todas");
  const [sort, setSort] = useState("recent");
  // Ofertas encerradas ficam sempre no fim, em qualquer ordenação.
  const results = products.filter((offer) => (store === "Todas" || offer.store === store) && normalize(`${offer.title} ${offer.shortTitle} ${offer.store ?? ""}`).includes(normalize(query.trim()))).sort((a, b) => Number(Boolean(a.ended)) - Number(Boolean(b.ended)) || (sort === "price" ? a.price - b.price : sort === "discount" ? discount(b) - discount(a) : b.sentAt.localeCompare(a.sentAt)));

  return (
    <div className="offers-catalog">
      <div className="offers-toolbar">
        <label className="offers-search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg><span className="sr-only">Buscar promoções</span><input type="search" placeholder="O que você quer encontrar?" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="offers-sort">Ordenar por<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Mais recentes</option><option value="price">Menor preço</option><option value="discount">Maior desconto</option></select></label>
      </div>
      <div className="offers-filter-row"><div className="offers-filters" role="group" aria-label="Filtrar por loja">{stores.map((name) => <button type="button" key={name} aria-pressed={store === name} onClick={() => setStore(name)}>{name}</button>)}</div><span className="offers-count" role="status">{results.length} {results.length === 1 ? "achado encontrado" : "achados encontrados"}</span></div>
      {results.length > 0 ? <div className="offers-grid">{results.map((offer) => <OfferCard offer={offer} key={offer.id} />)}</div> : <div className="offers-empty"><h2>Nenhum achado por aqui ainda.</h2><p>Tente outro nome ou explore todas as lojas.</p><button type="button" onClick={() => { setQuery(""); setStore("Todas"); }}>Ver todos os achados</button></div>}
    </div>
  );
}
