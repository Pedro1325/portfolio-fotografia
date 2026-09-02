# Portfólio da fotógrafa

Site em **Next.js** (App Router, **TypeScript**) — direção visual de
scrapbook romântico ("Diário de Set"), a partir de uma referência visual
(template Canva) que a cliente trouxe: rosa + creme, títulos em
caligrafia, fotos em recorte de coração e em polaroid com fita, laço e
detalhes dourados.

> **Status da migração**: O projeto está 100% convertido para **React (Next.js 15 App Router com TypeScript)**, totalmente tipado e com build validado com sucesso (`npm run build`). Persistência migrou de `localStorage` pra **Postgres via Prisma** (ver seção "Como rodar com Docker" abaixo). Isso é a **Fase 1** de um plano maior de virar multi-tenant (login por fotógrafa, `/[slug]` público, upload real de foto) — as fases seguintes ainda não foram implementadas.

## Como rodar com Docker (Postgres + Next.js) — forma recomendada

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.

**1) Criar seu `.env` local** (baseado em `.env.example` — nunca vai pro git):

```powershell
Copy-Item .env.example .env
```

**2) Criar e aplicar a primeira migration do banco.** Isso builda a imagem
Docker (na primeira vez), sobe o Postgres, cria as tabelas em
`prisma/migrations/` e já roda o seed automaticamente no final (copia o
conteúdo que hoje está em `lib/portfolioData.ts` pro banco):

```powershell
docker compose run --rm app npx prisma migrate dev --name init
```

> ⚠️ Não pule direto pro passo 3. O serviço `migrate` do
> `docker-compose.yml` só *aplica* migrations que já existem (`prisma
> migrate deploy`) — ele não cria a primeira sozinho. Sem rodar este
> comando antes, o banco sobe sem nenhuma tabela.

Espere ver no final algo como:
```
Seed concluído. Login de teste: sabrina@example.com / senha123
```

**3) Subir tudo normalmente (Postgres + app em modo dev, hot reload ligado):**

```powershell
docker compose up
```

Espere o serviço `app` mostrar que o Next.js está pronto (`Ready in ...`).
Abra `http://localhost:3000` (site público, dados vindo do Postgres) e
`http://localhost:3000/admin` (área da fotógrafa — ainda sem login, isso é
Fase 2 do plano).

**Comandos do dia a dia:**

| O que você quer | Comando |
| --- | --- |
| Parar tudo | `docker compose down` (mantém os dados do banco) |
| Parar e **apagar** os dados do Postgres | `docker compose down -v` |
| Ver as tabelas/linhas do banco numa UI | `docker compose run --rm app npx prisma studio` (abre em `http://localhost:5555`) |
| Rodar o seed de novo manualmente | `docker compose run --rm app npm run db:seed` |
| Criar uma nova migration depois de editar `prisma/schema.prisma` | `docker compose run --rm app npx prisma migrate dev --name <descricao>` |
| Ver logs só do app | `docker compose logs -f app` |

**Confirmar que não é mais localStorage**: edite uma legenda em `/admin`,
rode `docker compose restart app` numa outra janela de terminal, e recarregue
a página — a edição continua lá (antes, um restart do processo não mudava
nada porque tudo vivia no navegador; agora o dado sobrevive porque está no
Postgres).

## Como rodar sem Docker (alternativa)

Só faz sentido se você já tem um Postgres rodando em outro lugar (local,
Neon, Supabase etc.) e sabe a `DATABASE_URL` dele.

```bash
npm install
# edite .env com a DATABASE_URL do seu Postgres
npx prisma migrate dev --name init
npm run dev
```

Pra build de produção: `npm run build` seguido de `npm run start`.
`npm run build` também type-checa o projeto.

## Estrutura

```
app/
  layout.tsx           → layout raiz: importa globals.css (Tailwind), <html>/<body>
  page.tsx              → rota "/" — busca o portfolio no Postgres (Prisma) e monta PortfolioSite
  admin/
    layout.tsx           → metadata (noindex)
    page.tsx               → rota "/admin" — busca o portfolio no Postgres e monta AdminApp

components/
  PortfolioSite.tsx     → client component: só renderiza os dados recebidos do servidor
  TopBar.tsx, Hero.tsx, AlbumSection.tsx, AboutSection.tsx, ContactSection.tsx, Footer.tsx
  PhotoFrame.tsx         → moldura de foto (coração ou polaroid), com fade-in
  Reveal.tsx              → wrapper genérico de fade-in ao rolar a página
  icons.tsx                → ícones SVG desenhados, como componentes React
  admin/                     → AdminApp (chama as Server Actions), AdminSummary, AddPhotoForm, CategoryTable, PhotoRow, AdminActions

lib/
  types.ts              → tipos compartilhados (Photo, Category, Photographer, PortfolioData) — o "formato" que os componentes esperam
  portfolioData.ts        → conteúdo original de exemplo; hoje só é usado por prisma/seed.ts pra popular o banco na primeira vez
  portfolioMapper.ts        → converte uma linha do Postgres (Prisma) de volta pro formato de lib/types.ts
  portfolioHelpers.ts         → seleção de fotos por categoria
  adminHelpers.ts               → clone, slugify, exportação de backup
  db.ts                           → cliente do Prisma (conexão com o Postgres)
  actions/
    portfolio.ts                   → Server Actions: updatePhoto, removePhoto, addPhoto, updateTheme, selectThemePreset

prisma/
  schema.prisma          → modelo do banco (User, Portfolio, Theme, Category, Photo)
  seed.ts                 → popula o banco com o conteúdo de lib/portfolioData.ts
  migrations/               → histórico de mudanças no banco (gerado por `prisma migrate dev`, deve ir pro git)

public/fotos/           → onde as fotos reais devem entrar (ver public/fotos/LEIA-ME.md)

docker-compose.yml, Dockerfile → Postgres + app rodando em Docker (ver "Como rodar com Docker")
```

## O que ainda é placeholder (preencher antes de publicar)

- E-mail de contato (`contato@substituir.com` no seed) — troque pelo
  e-mail real em `/admin` ou editando `prisma/seed.ts` antes de rodar o
  seed pela primeira vez.
- As fotos de `public/fotos/` são reais, mas de um outro ensaio (usadas
  como conteúdo de exemplo pra ter o site inteiro navegável). Veja
  `public/fotos/LEIA-ME.md` pra trocar por fotos da cliente de verdade.

Nenhum dado comercial foi inventado (sem depoimentos falsos, sem números
de "anos de experiência" ou "clientes atendidos") — a copy é só texto de
posicionamento genérico, marcado pra revisão.

## Como ela mesma atualiza o portfólio (sem programar)

1. Abrir `/admin` (em produção ou local).
2. Marcar quais fotos aparecem ("Mostrar"), qual é destaque, ordem e legenda.
3. Pra adicionar uma foto nova: copiar o arquivo pra `public/fotos/<categoria>/`
   e cadastrar ali mesmo na tela.

Cada alteração já é salva direto no Postgres (poucos segundos de debounce
pra campos de texto, pra não escrever no banco a cada tecla) — não existe
mais passo de "exportar e substituir arquivo": o que aparece pra você em
`/admin` já é o que os visitantes veem no site público, sem precisar de
build/deploy novo. O botão "Exportar dados atualizados" continua existindo
só como um backup em arquivo `.ts`, não é mais o mecanismo de publicação.

`/admin` ainda não tem login (isso é a Fase 2 do plano — ver nota no topo
deste README) — por enquanto, qualquer pessoa com o endereço consegue
abrir e editar.

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
