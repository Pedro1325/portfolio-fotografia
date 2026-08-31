# Portfólio da fotógrafa

Site em **Next.js** (App Router, **TypeScript**) — direção visual de
scrapbook romântico ("Diário de Set"), a partir de uma referência visual
(template Canva) que a cliente trouxe: rosa + creme, títulos em
caligrafia, fotos em recorte de coração e em polaroid com fita, laço e
detalhes dourados.

> **Status da migração**: O projeto está 100% convertido para **React (Next.js 15 App Router com TypeScript)**, totalmente tipado e com build validado com sucesso (`npm run build`).

## Limpeza necessária antes de rodar

Este projeto passou por duas migrações (estático → Next.js → TypeScript) e
eu não consigo apagar arquivo nenhum nesta sessão (shell quebrado, e a
pasta não é um repositório git — sem controle de versão, apagar por
engano é definitivo, então preferi listar em vez de arriscar). **Dois
grupos de arquivo antigo precisam ser apagados por você antes do primeiro
`npm install`/`npm run dev`:**

1. O site estático original (pré-Next.js) — nunca mais usado.
2. As versões `.js`/`.jsx` dos componentes Next.js — substituídas pelas
   `.ts`/`.tsx` equivalentes. **Se ficarem os dois, o build quebra**
   (Next.js não aceita `app/page.js` e `app/page.tsx` juntos, por exemplo).

Rode isto na raiz do projeto (PowerShell):

```powershell
Remove-Item -Force index.html, admin.html, jsconfig.json, .impeccable-test.txt
Remove-Item -Recurse -Force js, fotos
Remove-Item -Force app\layout.js, app\page.js, app\admin\layout.js, app\admin\page.js
Remove-Item -Force lib\portfolioData.js, lib\portfolioHelpers.js, lib\adminHelpers.js, lib\useReveal.js
Remove-Item -Force components\icons.js, components\PhotoFrame.js, components\Reveal.js, components\HeartClipDefs.js, components\TopBar.js, components\Hero.js, components\AlbumSection.js, components\AboutSection.js, components\ContactSection.js, components\Footer.js, components\PortfolioSite.js
Remove-Item -Force components\admin\PhotoRow.js, components\admin\CategoryTable.js, components\admin\AdminSummary.js, components\admin\AddPhotoForm.js, components\admin\AdminActions.js, components\admin\AdminApp.js
```

Ou em Bash/Git Bash:

```bash
rm -f index.html admin.html jsconfig.json .impeccable-test.txt
rm -rf js fotos
rm -f app/layout.js app/page.js app/admin/layout.js app/admin/page.js
rm -f lib/portfolioData.js lib/portfolioHelpers.js lib/adminHelpers.js lib/useReveal.js
rm -f components/icons.js components/PhotoFrame.js components/Reveal.js components/HeartClipDefs.js components/TopBar.js components/Hero.js components/AlbumSection.js components/AboutSection.js components/ContactSection.js components/Footer.js components/PortfolioSite.js
rm -f components/admin/PhotoRow.js components/admin/CategoryTable.js components/admin/AdminSummary.js components/admin/AddPhotoForm.js components/admin/AdminActions.js components/admin/AdminApp.js
```

**Não apaga** (ainda em uso): `css/tokens.css`, `css/site.css`,
`css/admin.css` (importados de dentro de `app/`), e `public/fotos/`
(a pasta nova pra fotos reais).

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` (site público) e `http://localhost:3000/admin`
(área da fotógrafa).

Pra build de produção: `npm run build` seguido de `npm run start`.
`npm run build` também type-checa o projeto — é o primeiro lugar onde
qualquer erro de TypeScript que eu tenha deixado passar vai aparecer.

## Estrutura

```
app/
  layout.tsx           → layout raiz: importa tokens.css + site.css, <html>/<body>
  page.tsx              → rota "/" — monta PortfolioSite com os dados
  admin/
    layout.tsx           → metadata (noindex) + importa admin.css
    page.tsx               → rota "/admin" — monta AdminApp

components/
  PortfolioSite.tsx     → client component: faz merge com rascunho do localStorage
  TopBar.tsx, Hero.tsx, AlbumSection.tsx, AboutSection.tsx, ContactSection.tsx, Footer.tsx
  PhotoFrame.tsx         → moldura de foto (coração ou polaroid), com fade-in
  Reveal.tsx              → wrapper genérico de fade-in ao rolar a página
  icons.tsx                → ícones SVG desenhados, como componentes React
  admin/                     → AdminApp, AdminSummary, AddPhotoForm, CategoryTable, PhotoRow, AdminActions

lib/
  types.ts              → tipos compartilhados (Photo, Category, Photographer, PortfolioData)
  portfolioData.ts        → TODO o conteúdo do site (nome, bio, contato, fotos)
  portfolioHelpers.ts       → seleção de fotos por categoria + leitura/escrita do rascunho local
  adminHelpers.ts             → clone, slugify, exportação de dados
  useReveal.ts                 → hook do fade-in ao rolar

css/
  tokens.css             → cores, tipografia, espaçamento (design tokens)
  site.css                → estilos do site público
  admin.css                → estilos da área da fotógrafa

public/fotos/           → onde as fotos reais devem entrar (ver public/fotos/LEIA-ME.md)
```

## O que ainda é placeholder (preencher antes de publicar)

Tudo isso está claramente marcado no próprio site e em `lib/portfolioData.ts`:

- Nome da fotógrafa, cidade, bio, e-mail, telefone, Instagram, WhatsApp.
- As 15 fotos de exemplo (5 por categoria) — hoje aparecem como quadros
  "substitua" numerados. Veja `public/fotos/LEIA-ME.md` pra como trocar
  por fotos reais.

Nenhum dado comercial foi inventado (sem depoimentos falsos, sem números
de "anos de experiência" ou "clientes atendidos") — a copy é só texto de
posicionamento genérico, marcado pra revisão.

## Como ela mesma atualiza o portfólio (sem programar)

1. Abrir `/admin` (em produção ou local).
2. Marcar quais fotos aparecem ("Mostrar"), qual é destaque, ordem e legenda.
3. Pra adicionar uma foto nova: copiar o arquivo pra `public/fotos/<categoria>/`
   e cadastrar ali mesmo na tela.
4. Clicar em **"Exportar dados atualizados"** — baixa um novo `portfolioData.ts`.
5. Substituir o arquivo `lib/portfolioData.ts` do projeto pelo baixado.
6. Rodar `npm run build` (ou fazer o deploy, que builda automaticamente).

As alterações feitas em `/admin` também ficam salvas automaticamente
nesse navegador (`localStorage`), então dá pra clicar em "Ver site" e
conferir antes de exportar — mas só exportar e trocar `lib/portfolioData.ts`
de fato muda o que os visitantes veem depois do próximo deploy.

## Publicar o site

A forma mais direta pra um projeto Next.js é a **Vercel**
([vercel.com](https://vercel.com)) — conecta o repositório (GitHub, GitLab
etc.) e cada `git push` faz o deploy automaticamente. Netlify e outros
hosts com suporte a Next.js também funcionam.

`/admin` **não tem senha real** — a rota só não aparece no menu do site.
Qualquer pessoa com o endereço consegue abrir. Pra proteger de verdade:
a Vercel tem "Password Protection" nos planos pagos, ou dá pra adicionar
autenticação simples via [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
mais tarde, se quiser — não implementei porque autenticação real é uma
decisão que envolve credenciais e não deveria ser inventada sem você pedir.
