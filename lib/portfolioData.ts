/*
  lib/portfolioData.ts — single source of truth for the portfolio content.

  Meant to be hand-edited (or regenerated via /admin's "Exportar dados
  atualizados" button, which downloads a new version of this file).

  HOW TO ADD A REAL PHOTO
  ------------------------
  1. Drop the image file into public/fotos/<categoria>/ (see
     public/fotos/LEIA-ME.md).
  2. Set that photo's "src" below to the site-root path, e.g.
     "/fotos/casamentos/ana-e-joao-01.jpg".
  3. Leave "src" as null to keep showing the labeled placeholder tile.
  Or do all of this visually through /admin instead of editing by hand.
*/

import type { PortfolioData } from "./types";

export const PORTFOLIO_DATA: PortfolioData = {
  photographer: {
    name: "Nome da Fotógrafa",
    role: "Fotógrafa",
    location: "Cidade, UF",
    bio:
      "Texto de apresentação dela: quem é, o que persegue nas fotos, " +
      "o que um cliente pode esperar de trabalhar com ela. " +
      "[SUBSTITUA — este parágrafo é um placeholder de tom, não um fato.]",
    email: "contato@substituir.com",
    phone: "(00) 00000-0000",
    instagram: "@substituir",
    whatsapp: "5500000000000",
  },

  categories: [
    {
      id: "casamentos",
      page: "/02",
      label: "Casamentos",
      status: "Disponível para 2026",
      note:
        "Cobertura do dia inteiro, do preparo à pista de dança — guardando " +
        "o que acontece quando ninguém está posando.",
    },
    {
      id: "retratos",
      page: "/03",
      label: "Retratos & Ensaios",
      status: "Disponível para 2026",
      note:
        "Sessões individuais, de casal ou de família — em estúdio ou ao ar " +
        "livre, sempre com carinho na direção.",
    },
    {
      id: "editorial",
      page: "/04",
      label: "Editorial & Moda",
      status: "Portfólio em expansão",
      note:
        "Testes, campanhas e editoriais independentes — imagem com ponto de " +
        "vista, feita para chamar atenção.",
    },
  ],

  /*
    order = position within its category (lower first).
    featured = the one photo pulled into the hero/about heart-crop for
      its category (falls back to the first selected photo).
    selected = shown on the public site at all (this is exactly the field
      /admin's checkboxes control).
  */
  photos: [
    { id: "cas-01", category: "casamentos", src: null, caption: "Ana & João — cerimônia", featured: true, selected: true, order: 1 },
    { id: "cas-02", category: "casamentos", src: null, caption: "Preparativos da noiva", featured: false, selected: true, order: 2 },
    { id: "cas-03", category: "casamentos", src: null, caption: "Pista de dança", featured: false, selected: true, order: 3 },
    { id: "cas-04", category: "casamentos", src: null, caption: "Alianças", featured: false, selected: true, order: 4 },
    { id: "cas-05", category: "casamentos", src: null, caption: "Saída dos noivos", featured: false, selected: true, order: 5 },

    { id: "ret-01", category: "retratos", src: null, caption: "Ensaio individual — estúdio", featured: true, selected: true, order: 1 },
    { id: "ret-02", category: "retratos", src: null, caption: "Ensaio de casal", featured: false, selected: true, order: 2 },
    { id: "ret-03", category: "retratos", src: null, caption: "Ensaio em família", featured: false, selected: true, order: 3 },
    { id: "ret-04", category: "retratos", src: null, caption: "Retrato em locação externa", featured: false, selected: true, order: 4 },
    { id: "ret-05", category: "retratos", src: null, caption: "Retrato em luz natural", featured: false, selected: true, order: 5 },

    { id: "edi-01", category: "editorial", src: null, caption: "Editorial independente 01", featured: true, selected: true, order: 1 },
    { id: "edi-02", category: "editorial", src: null, caption: "Teste de modelo", featured: false, selected: true, order: 2 },
    { id: "edi-03", category: "editorial", src: null, caption: "Campanha — still de produção", featured: false, selected: true, order: 3 },
    { id: "edi-04", category: "editorial", src: null, caption: "Editorial independente 02", featured: false, selected: true, order: 4 },
    { id: "edi-05", category: "editorial", src: null, caption: "Bastidor de set", featured: false, selected: true, order: 5 },
  ],
};
