---
name: Diário de Set
description: Portfólio de fotografia em estilo scrapbook romântico — rosa e creme, caligrafia, fotos em recorte de coração — a partir de uma referência visual da cliente.
colors:
  bg: "#fdf4ee"
  bg-alt: "#f7c9d9"
  bg-raised: "#fffaf6"
  bg-inset: "#fbe9ee"
  line: "#f0c9d6"
  line-soft: "#f6dde6"
  ink: "#5a3341"
  ink-soft: "#8a5a6a"
  ink-faint: "#8f6070"
  accent: "#e0709e"
  accent-strong: "#c94f7f"
  accent-deep: "#b83d6b"
  accent-soft: "#f7c9d9"
  accent-ink: "#fff9f6"
  gold: "#cf9f5f"
  gold-soft: "#e8d3ad"
  stamp: "#c94f7f"
  paper: "#fffaf3"
  paper-ink: "#5a3341"
typography:
  display:
    fontFamily: "Alex Brush, Segoe Script, cursive"
    fontSize: "clamp(3.25rem, 5vw + 1.5rem, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Alex Brush, Segoe Script, cursive"
    fontSize: "clamp(2.25rem, 3vw + 1rem, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.05
  hand:
    fontFamily: "Caveat, Segoe Script, cursive"
    fontSize: "1.1rem–1.5rem"
    fontWeight: 500
  body:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 0.3vw + 0.9rem, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
rounded:
  card: "6px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "6rem"
  xxl: "8rem"
components:
  hero-cta:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.6rem"
  main-nav-cta:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.1rem"
  tag-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  tag-link-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.accent-ink}"
---

# Design System: Diário de Set

## Overview

**Creative North Star: "O Álbum Folheado ao Vivo"**

Este sistema nasceu de uma referência visual concreta trazida pela cliente: um template de scrapbook "About Me" (Canva) — páginas numeradas, rosa e creme, títulos em caligrafia, fotos em recorte de coração, laço, washi tape e detalhes dourados/pérola. O site traduz isso para um portfólio real: cada seção é uma "página" numerada do álbum (/01, /02...), como nas referências, e as fotos aparecem coladas — em coração ou em polaroid com fita — nunca em cards genéricos.

Esta é uma direção **pinada pelo usuário via imagem de referência**, não uma escolha de exploração livre — ela substitui integralmente o mundo anterior ("Backstage", industrial/produção). Nada do vocabulário anterior (slate, call sheet, crachá) foi preservado; só a estrutura funcional (categorias, curadoria, contato) atravessou o redesign.

**Key Characteristics:**
- Rosa (`#e0709e`/`#c94f7f`/`#b83d6b`) como único acento saturado, dominante em blocos inteiros (fundo alternado das seções, CTA, títulos) — creme como terreno neutro.
- Caligrafia (Alex Brush) só em títulos grandes — nunca em versalete/uppercase (script em caixa alta fica ilegível) e nunca em textos pequenos ou funcionais.
- Fotos em duas famílias: recorte de coração com contorno dourado (a foto "principal" de cada seção) e polaroid com fita e leve rotação (as demais) — nunca um grid uniforme.
- Bordas arredondadas generosas (pílula nos botões, 6–10px nos cartões) — nada do vocabulário reto/industrial do mundo anterior.

## Colors

Paleta "Committed": rosa como único acento saturado, carregando 30–60% de cada viewport via blocos de fundo inteiros (seções alternam creme/rosa), não apenas detalhes.

### Primary
- **Rosa Chiclete** (`#e0709e`, decorativo/display grande apenas): cor de identidade — títulos script grandes, ícones, bordas.
- **Rosa Profundo** (`#b83d6b`, "accent-deep"): a única variante segura como texto pequeno ou fundo sólido de botão sob texto claro — é o rosa "funcional" do sistema.

### Neutral
- **Creme** (`#fdf4ee`): terreno base — metade das seções.
- **Rosa Bloco** (`#f7c9d9`, "bg-alt"): terreno alternado — a outra metade das seções, ecoando o padrão creme/rosa alternado da referência.
- **Marfim quase branco** (`#fffaf6`/`#fffaf3`): superfícies elevadas (cartões, molduras de foto).
- **Ameixa escura** (`#5a3341`): texto principal.
- **Ameixa suave** (`#8a5a6a`): texto secundário.
- **Ameixa apagada** (`#8f6070`): texto terciário — só sobre creme/marfim (não passa 4.5:1 sobre o bloco rosa; usar `--ink` ali).

### Named Rules
**The Large-Text-Only Rule.** `accent`/`accent-strong` só aparecem em texto grande (títulos, display) — em qualquer texto pequeno ou botão de fundo sólido, use `accent-deep`. Nenhuma dessas variantes claras passa 4.5:1 em texto pequeno sobre o creme.

## Typography

**Display/Headline Font:** Alex Brush (com Segoe Script, cursive de fallback)
**Handwritten accent Font:** Caveat (para tagline e legendas de foto)
**Body/Label Font:** Poppins (com Segoe UI, sans-serif de fallback)

**Character:** Caligrafia fluida (Alex Brush) para o nome e títulos grandes, um script mais solto e "escrito à mão" (Caveat) para tagline e legendas — como anotações num álbum — contra um sans geométrico limpo (Poppins) pro corpo e pra interface. A mistura lê como diário pessoal, não como convite de casamento formal.

### Hierarchy
- **Display** (400, `clamp(3.25rem, 5vw + 1.5rem, 6rem)`, altura 1, minúsculas): nome da fotógrafa no hero.
- **Headline** (400, `clamp(2.25rem, 3vw + 1rem, 3.75rem)`, altura ~1.05): título de cada seção/página do álbum.
- **Hand** (Caveat, 500, 1.1–1.5rem): tagline do hero, legendas de foto, rótulo "sobre mim".
- **Body** (Poppins 400, `clamp(1rem, 0.3vw + 0.9rem, 1.125rem)`, altura 1.55, medida 66ch): bio e notas de seção.
- **Label** (Poppins 500, 0.8125rem): navegação, rótulos de campo, botões.

### Named Rules
**The No-Caps-Script Rule.** Alex Brush nunca vai em `text-transform: uppercase` — script em caixa alta perde a conexão entre letras e fica ilegível. Uppercase é reservado a Poppins (rótulos pequenos).

## Layout

Container máximo de 74rem centralizado. Seções do álbum alternam fundo creme/rosa-bloco em sequência (creme → rosa → creme), ecoando o padrão da referência. Cada seção carrega um marcador de página no canto (`/01`, `/02`...) — o mesmo dispositivo da referência (slides numerados), agora como metáfora de página de álbum.

Breakpoints de composição: 1024px (Sobre empilha, grade de fotos vai de 4 para 3 colunas), 860px (nav vira menu recolhível, hero empilha, fotos preenchem em torno do bloco de coração 2×2), 560px (grade de fotos em 2 colunas, paddings reduzem). A grade de fotos usa a primeira foto de cada seção em recorte de coração ocupando 2×2, as demais em polaroid ao redor.

## Elevation & Depth

Sombras suaves e róseas (nunca cinza neutro) — o sistema todo é tingido de rosa, até a profundidade.

### Shadow Vocabulary
- **Card** (`0 14px 28px -12px rgba(201,79,127,.28), 0 3px 8px rgba(90,51,65,.1)`): molduras de foto, cartão de contato.
- **Badge** (`0 16px 32px -12px rgba(201,79,127,.35), 0 4px 10px rgba(207,159,95,.18)`): o CTA principal — o toque dourado na sombra é a única "pérola" que vaza pra fora do botão.

## Shapes

Cantos generosamente arredondados: pílula (`999px`) em todo botão/tag, 6–10px em cartões e molduras — o oposto do mundo anterior (que era quase reto). O recorte de coração (`clip-path: url(#heart-clip)`, definido uma vez no `<svg>` oculto do topo de `index.html`) é a forma assinatura do sistema; nenhuma outra forma orgânica compete com ela.

## Components

### Botões / CTA
- **Shape:** pílula (`999px`).
- **Primary (`hero__cta`, `main-nav__cta`, `admin-btn--primary`):** fundo `accent-deep`, texto `accent-ink`.
- **Hover:** eleva + aprofunda sombra (hero) ou escurece via `filter: brightness(0.9)` — nunca troca pra `accent`/`accent-strong` (quebraria o contraste do texto claro).
- **Secundário (`tag-link`):** contorno 1.5px `accent`, texto `ink` (não `accent`, por contraste), ícone `accent-deep`; hover inverte pra fundo `accent-deep` sólido.

### Molduras de foto — coração (componente assinatura)
Uma foto por seção (a `featured` nos dados) recebe recorte de coração via `clip-path: url(#heart-clip)`, com um halo dourado (`gold-soft`) vazando ~8% atrás do recorte, simulando uma moldura de pérola. Sem fita, sem rotação — o recorte já é o destaque. Placeholders sem foto real mostram o mesmo hachurado suave com ícone de câmera e o texto "substitua — [legenda]" dentro do próprio coração.

### Molduras de foto — polaroid
As demais fotos de cada seção: fundo `paper`, padding, fita decorativa no topo (`frame__tape`, listrada em branco/rosa clarinho — nunca um arco-íris de washi tape, pra não diluir o rosa como acento único), leve rotação (cinco variações fixas, endireita no hover), carimbo "favorita" (coração preenchido + texto) que só aparece no hover/focus.

### Cartão de nota rasgada (Sobre)
`.about__card`: fundo `paper`, borda superior serrilhada via `clip-path: polygon(...)` (papel "rasgado"), leve rotação fixa (-0.6°) — como uma nota colada meio torta na página.

### Cartão de contato
Cartão claro (`bg-raised`) com linhas de contato (ícone circular rosa-claro + rótulo pequeno + valor) — não é mais uma tabela de call sheet; é um cartão de carta/bilhete. Tags de WhatsApp/Instagram em pílula abaixo do cartão.

### Navegação
- **Estilo:** barra translúcida creme com blur, nome em script grande, links em Poppins com um coraçãozinho como marcador (substitui bullet/número).
- **Mobile (≤860px):** vira botão "Menu" com contorno rosa, revela lista vertical.

### Formulários (Área da fotógrafa — Operate)
- **Estilo:** a mesma paleta clara, mas tipografia SEMPRE em Poppins (nunca Alex Brush, nem em maiúsculas) — clareza funcional antes de expressão, mesmo dentro do mesmo mundo visual. Cantos arredondados moderados (6–10px) para sentir-se da mesma família sem competir com o site público.

## Do's and Don'ts

### Do:
- **Do** reservar Alex Brush (script) pra títulos grandes, sempre em minúsculas/case normal — nunca uppercase, nunca em texto pequeno ou funcional (formulários, tabelas).
- **Do** usar `accent-deep` (`#b83d6b`) — não `accent`/`accent-strong` — em qualquer texto pequeno, ícone funcional ou fundo sólido de botão com texto claro.
- **Do** manter o recorte de coração como tratamento de UMA foto por seção (a "featured") — usá-lo em todas as fotos dilui o destaque.
- **Do** manter a fita decorativa (`frame__tape`) branca/rosa-clarinho — o sistema é rosa+creme+dourado, não uma paleta arco-íris de washi tape.

### Don't:
- **Don't** reintroduzir vocabulário do mundo anterior (slate, call sheet, crachá, produção/cena) — foi substituído por completo, não misturado.
- **Don't** usar `accent`/`accent-strong` em texto pequeno sobre fundo creme ou rosa-bloco — falha contraste AA (~2.8–3.9:1 conforme o par).
- **Don't** trocar a cor de fundo no hover de um botão de fundo sólido (`accent-deep`→`accent-strong` reduz o contraste do texto claro pra ~4:1) — use `filter: brightness()` ou elevação/sombra em vez disso.
- **Don't** colocar o coração de recorte em mais de uma foto por grade — ele é o "destaque", não um padrão repetido.
