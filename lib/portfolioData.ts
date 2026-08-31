
import type { PortfolioData } from "./types";
import { DEFAULT_THEME } from "./themes";

export const PORTFOLIO_DATA: PortfolioData = {
  theme: DEFAULT_THEME,
  photographer: {
    name: "Sabrina Carneiro",
    role: "Fotógrafa",
    location: "São Paulo",
    bio:
      "Texto de apresentação dela: quem é, o que persegue nas fotos, " +
      "o que um cliente pode esperar de trabalhar com ela. " +
      "[SUBSTITUA — este parágrafo é um placeholder de tom, não um fato.]",
    email: "contato@substituir.com",
    phone: "+55 (11) 99439-8447",
    instagram: "@imfroge",
    whatsapp: "55 11 99439-8447",
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

