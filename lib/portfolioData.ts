import type { PortfolioData } from "./types";
import { DEFAULT_THEME } from "./themes";

export const PORTFOLIO_DATA: PortfolioData = {
  theme: DEFAULT_THEME,
  photographer: {
    name: "Sabrina Trindade",
    role: "Fotógrafa",
    location: "São Paulo",
    bio:
      "Fotógrafa especializada em registrar conexões verdadeiras, emoções espontâneas e memórias que resistem ao tempo.\n" +
      "Cada ensaio é único — pensado com carinho na direção e na iluminação para contar a sua história com sensibilidade.",
    email: "contato@substituir.com",
    phone: "+55 (11) 99439-8447",
    instagram: "@imfroge",
    whatsapp: "55 11 99439-8447",
    avatar: "/fotos/editorial/foto_perfil.jpeg",
  },

  categories: [
    {
      id: "casamentos",
      page: "/02",
      label: "Casamentos & Eventos",
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
        "Sessões individuais, de casal, família e gestante — em estúdio ou ao ar " +
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

  photos: [
    { id: "cas-01", category: "casamentos", src: "/fotos/casamentos/1.jpg", caption: "Ensaio em família — momentos de carinho", featured: true, selected: true, order: 1 },
    { id: "cas-02", category: "casamentos", src: "/fotos/casamentos/2.jpg", caption: "Conexão e amor em família", featured: false, selected: true, order: 2 },
    { id: "cas-03", category: "casamentos", src: "/fotos/casamentos/3.jpg", caption: "Ensaio de casal — cumplicidade", featured: false, selected: true, order: 3 },
    { id: "cas-04", category: "casamentos", src: "/fotos/casamentos/4.jpg", caption: "Pai e filho — alegria espontânea", featured: false, selected: true, order: 4 },
    { id: "cas-05", category: "casamentos", src: "/fotos/casamentos/6.jpg", caption: "Mãe e bebê — sorrisos e afeto", featured: false, selected: true, order: 5 },
    { id: "cas-06", category: "casamentos", src: "/fotos/casamentos/7.jpg", caption: "Ensaio a dois — carinho e sintonia", featured: false, selected: true, order: 6 },
    { id: "cas-07", category: "casamentos", src: "/fotos/casamentos/9.jpg", caption: "Ensaio gestante — a doce espera", featured: false, selected: true, order: 7 },
    { id: "cas-08", category: "casamentos", src: "/fotos/casamentos/10.jpg", caption: "Maternidade — detalhes e ternura", featured: false, selected: true, order: 8 },
    { id: "cas-09", category: "casamentos", src: "/fotos/casamentos/11.jpg", caption: "Gestante — iluminação suave", featured: false, selected: true, order: 9 },
    { id: "cas-10", category: "casamentos", src: "/fotos/casamentos/12.jpg", caption: "Retrato autoral expressivo", featured: false, selected: true, order: 10 },
    { id: "cas-11", category: "casamentos", src: "/fotos/casamentos/5.jpg", caption: "Pai e filho — momentos de brincadeira", featured: false, selected: true, order: 11 },
    { id: "cas-12", category: "casamentos", src: "/fotos/casamentos/8.jpg", caption: "Casal apaixonado — cumplicidade e romance", featured: false, selected: true, order: 12 },

    { id: "ret-01", category: "retratos", src: "/fotos/retratos/9.jpg", caption: "Ensaio gestante — espera doce", featured: true, selected: true, order: 1 },
    { id: "ret-02", category: "retratos", src: "/fotos/retratos/1.jpg", caption: "Ensaio em família — estúdio", featured: false, selected: true, order: 2 },
    { id: "ret-03", category: "retratos", src: "/fotos/retratos/3.jpg", caption: "Ensaio de casal intimista", featured: false, selected: true, order: 3 },
    { id: "ret-04", category: "retratos", src: "/fotos/retratos/4.jpg", caption: "Pai e filho em sintonia", featured: false, selected: true, order: 4 },
    { id: "ret-05", category: "retratos", src: "/fotos/retratos/6.jpg", caption: "Mãe e bebê — conexão pura", featured: false, selected: true, order: 5 },
    { id: "ret-06", category: "retratos", src: "/fotos/retratos/7.jpg", caption: "Abraço e intimidade a dois", featured: false, selected: true, order: 6 },
    { id: "ret-07", category: "retratos", src: "/fotos/retratos/10.jpg", caption: "Doce espera — maternidade", featured: false, selected: true, order: 7 },
    { id: "ret-08", category: "retratos", src: "/fotos/retratos/11.jpg", caption: "Retrato em luz suave", featured: false, selected: true, order: 8 },
    { id: "ret-09", category: "retratos", src: "/fotos/retratos/2.jpg", caption: "Retrato de família — união e carinho", featured: false, selected: true, order: 9 },
    { id: "ret-10", category: "retratos", src: "/fotos/retratos/5.jpg", caption: "Pai e filho — leveza e diversão", featured: false, selected: true, order: 10 },
    { id: "ret-11", category: "retratos", src: "/fotos/retratos/8.jpg", caption: "Casal — troca de olhares", featured: false, selected: true, order: 11 },
    { id: "ret-12", category: "retratos", src: "/fotos/retratos/12.jpg", caption: "Retrato autoral — atitude & estilo", featured: false, selected: true, order: 12 },

    { id: "edi-01", category: "editorial", src: "/fotos/editorial/foto_perfil.jpeg", caption: "Sabrina Carneiro — Editorial & Visão", featured: true, selected: true, order: 1 },
    { id: "edi-02", category: "editorial", src: "/fotos/retratos/12.jpg", caption: "Retrato autoral — atitude & estilo", featured: false, selected: true, order: 2 },
    { id: "edi-03", category: "editorial", src: "/fotos/retratos/3.jpg", caption: "Composição e contrastes em estúdio", featured: false, selected: true, order: 3 },
    { id: "edi-04", category: "editorial", src: "/fotos/retratos/11.jpg", caption: "Luz e sombra em foco", featured: false, selected: true, order: 4 },
  ],
};
