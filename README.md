# Portfólio da fotógrafa

Site em **Next.js** (App Router, **TypeScript**) — direção visual de
scrapbook romântico ("Diário de Set"), a partir de uma referência visual
(template Canva) que a cliente trouxe: rosa + creme, títulos em
caligrafia, fotos em recorte de coração e em polaroid com fita, laço e
detalhes dourados.

> **Status**: Next.js 15 App Router + TypeScript, com **Postgres via Prisma** (não mais `localStorage`), rodando em **Docker**. `/admin` está atrás de **login** (Auth.js/NextAuth, e-mail+senha — sem cadastro público, uma única conta definida por variável de ambiente) e o upload de foto é de verdade (arquivo enviado pelo navegador, não mais digitar um nome de arquivo). O site continua single-tenant (uma fotógrafa só, sem `/[slug]` por enquanto).

## Como rodar com Docker (Postgres + Next.js) — forma recomendada

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.

**1) Criar seu `.env` local** (baseado em `.env.example` — nunca vai pro git):

```powershell
Copy-Item .env.example .env
```

Depois, abra o `.env` e preencha `ADMIN_EMAIL` e `ADMIN_PASSWORD` (a única
conta que consegue entrar em `/admin` — não existe cadastro público) e,
se quiser, gere um `NEXTAUTH_SECRET` de verdade:
```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**2) Subir tudo (builda a imagem na primeira vez, sobe o Postgres, cria as
tabelas):**

```powershell
docker compose up --build
```

Espere o serviço `app` mostrar `✓ Ready in ...`.

**3) Popular o banco com os dados iniciais (numa segunda janela de terminal,
deixando a primeira com o `docker compose up` rodando):**

```powershell
docker compose run --rm app npm run db:seed
```

> ⚠️ Use sempre `npm run db:seed` pra popular dados, não `prisma migrate
> dev`. O `docker compose up` já roda `prisma migrate deploy` sozinho (cria
> as tabelas), e depois disso o `migrate dev` só reseeda quando está
> *criando* uma migration nova — se rodar `migrate dev` com o schema já
> sincronizado, ele não reclama de nada mas também não popula o banco, e
> o site fica com erro de "nenhum portfolio encontrado".

Espere ver no final: `Seed concluído. Login: <seu ADMIN_EMAIL> (senha definida no seu .env).`

Abra **`http://localhost:3000`** (site público) e **`http://localhost:3000/admin`**
(pede login — use o `ADMIN_EMAIL`/`ADMIN_PASSWORD` do seu `.env`).

> O Postgres fica na porta **5433** (não 5432) do seu computador — foi
> remapeada pra evitar conflito com outro Postgres que já pode estar
> instalado. Isso só importa se você quiser conectar um cliente externo
> (DBeaver, pgAdmin) direto no banco; o app fala com ele por dentro da
> rede do Docker e nem percebe essa troca.
>
> Se a porta 3000 do app já estiver ocupada por outro processo no seu
> Windows, o `docker compose up` vai falhar com `port already allocated`
> — nesse caso, feche o que estiver usando a porta 3000 (`netstat -ano |
> findstr :3000` pra achar o processo) antes de tentar de novo.

**Comandos do dia a dia:**

| O que você quer | Comando |
| --- | --- |
| Parar tudo | `docker compose down` (mantém os dados do banco) |
| Parar e **apagar** os dados do Postgres (e reiniciar do zero) | `docker compose down -v` — depois repita os passos 2 e 3 |
| Ver as tabelas/linhas do banco numa UI | `docker compose run --rm -p 5555:5555 app npx prisma studio` → abre `http://localhost:5555` |
| Repopular o banco (ex: depois de um `down -v`) | `docker compose run --rm app npm run db:seed` |
| Trocar a senha de admin depois de já ter rodado o seed | Edite `ADMIN_PASSWORD` no `.env` e rode `npm run db:seed` de novo (atualiza a senha da conta existente) |
| Criar uma nova migration depois de editar `prisma/schema.prisma` | `docker compose run --rm app npx prisma migrate dev --name <descricao>` |
| Ver logs só do app | `docker compose logs -f app` |
| Instalar uma dependência nova (ex: editei `package.json` à mão) | Rode `npm install` **local** (fora do Docker, só pra atualizar o `package-lock.json`) e depois `docker compose up --build` |

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
  layout.tsx           → layout raiz: importa globals.css (Tailwind), envolve com SessionProviderWrapper
  page.tsx              → rota "/" — busca o portfolio no Postgres (Prisma) e monta PortfolioSite
  login/page.tsx          → tela de login (e-mail/senha, next-auth/react signIn)
  admin/
    layout.tsx              → metadata (noindex)
    page.tsx                  → rota "/admin" (protegida por login) — monta AdminApp
  api/auth/[...nextauth]/route.ts → handler do NextAuth (login/logout)
  dashboard/, register/, [slug]/  → rotas antigas, hoje só redirecionam pra /admin, /login e /
                                     (sobraram de uma versão multi-tenant que não foi pra frente)

components/
  PortfolioSite.tsx     → client component: só renderiza os dados recebidos do servidor
  SessionProviderWrapper.tsx → ponte client component pro next-auth/react funcionar em qualquer lugar
  TopBar.tsx, Hero.tsx, AlbumSection.tsx, AboutSection.tsx, ContactSection.tsx, Footer.tsx
  PhotoFrame.tsx         → moldura de foto (coração ou polaroid), com fade-in
  Reveal.tsx              → wrapper genérico de fade-in ao rolar a página
  icons.tsx                → ícones SVG desenhados, como componentes React
  admin/                     → AdminApp (chama as Server Actions), AdminSummary, AddPhotoForm (upload de foto), CategoryTable, PhotoRow, AdminActions

lib/
  types.ts              → tipos compartilhados (Photo, Category, Photographer, PortfolioData) — o "formato" que os componentes esperam
  portfolioData.ts        → conteúdo original de exemplo; hoje só é usado por prisma/seed.ts pra popular o banco na primeira vez
  portfolioMapper.ts        → converte uma linha do Postgres (Prisma) de volta pro formato de lib/types.ts
  portfolioHelpers.ts         → seleção de fotos por categoria
  adminHelpers.ts               → clone, exportação de backup
  db.ts                           → cliente do Prisma (conexão com o Postgres)
  auth.ts                           → configuração do NextAuth (Credentials provider, sessão JWT)
  actions/
    portfolio.ts                     → Server Actions: updatePhoto, removePhoto, uploadPhoto, updateTheme, selectThemePreset
    auth.ts                            → não usado hoje (era o cadastro público de uma versão multi-tenant descartada)

middleware.ts          → bloqueia /admin/** pra quem não está logado
types/next-auth.d.ts   → estende os tipos do NextAuth com o campo "id" na sessão

prisma/
  schema.prisma          → modelo do banco (User, Portfolio, Theme, Category, Photo)
  seed.ts                 → cria a conta de admin (via ADMIN_EMAIL/ADMIN_PASSWORD do .env) e popula o portfolio com o conteúdo de lib/portfolioData.ts
  migrations/               → histórico de mudanças no banco (gerado por `prisma migrate dev`, deve ir pro git)

public/fotos/           → fotos de exemplo (ver public/fotos/LEIA-ME.md)
public/uploads/          → fotos enviadas pelo /admin — não vai pro git, fica num volume Docker (uploads_data)

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

1. Abrir `/admin` e entrar com o e-mail/senha (`ADMIN_EMAIL`/`ADMIN_PASSWORD`
   do `.env` — não existe cadastro público, é uma conta só).
2. Marcar quais fotos aparecem ("Mostrar"), qual é destaque, ordem e legenda.
3. Pra adicionar uma foto nova: escolher o arquivo (JPG/PNG/WebP, até 8MB)
   direto do computador no formulário "Adicionar foto" — o upload é de
   verdade, não precisa copiar arquivo em pasta nenhuma manualmente.

Cada alteração já é salva direto no Postgres (poucos segundos de debounce
pra campos de texto, pra não escrever no banco a cada tecla) — o que
aparece pra você em `/admin` já é o que os visitantes veem no site
público, sem precisar de build/deploy novo. O botão "Exportar dados
atualizados" continua existindo só como um backup em arquivo `.ts`.

## Publicar na Vercel (Neon + Vercel Blob)

A Vercel não roda o `docker-compose.yml` — Docker é só pro seu ambiente
local. Em produção, o Postgres é o **Neon** e as fotos enviadas pelo
`/admin` vão pro **Vercel Blob** (o upload já foi escrito pra usar um ou
outro automaticamente — ver `lib/actions/portfolio.ts`, função
`saveUploadedFile` — sem precisar trocar nada de código entre local e
produção).

**1) Criar o projeto na Vercel**

No [vercel.com](https://vercel.com), importe o repositório (precisa estar
no GitHub/GitLab/Bitbucket — se ainda não estiver, `git push` pra lá
primeiro). Não clique em "Deploy" ainda — faltam os passos abaixo.

**2) Conectar o Postgres (Neon)**

No dashboard do projeto na Vercel → aba **Storage** → **Create Database**
→ **Neon** (tier grátis). A Vercel já preenche a variável `DATABASE_URL`
sozinha nas Environment Variables do projeto — não precisa copiar/colar
nada manualmente.

**3) Conectar o storage de fotos (Vercel Blob)**

Mesma aba **Storage** → **Create Database** → **Blob**. Isso cria
automaticamente a variável `BLOB_READ_WRITE_TOKEN` no projeto — é a
presença dela que faz `saveUploadedFile` decidir usar o Blob em vez do
disco.

**4) Preencher as outras variáveis de ambiente**

Em **Settings → Environment Variables**, adicione:

| Variável | Valor |
| --- | --- |
| `NEXTAUTH_SECRET` | Gere uma **nova** (não reuse a de dev): `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `NEXTAUTH_URL` | A URL de produção, ex: `https://seu-projeto.vercel.app` |

`ADMIN_EMAIL`/`ADMIN_PASSWORD` **não precisam** ir pra Vercel — eles só
existem pra rodar o seed uma vez (passo 6); o login em produção checa a
senha (com hash) que já está gravada no banco, não uma variável de
ambiente lida a cada request.

**5) Deploy**

Agora sim, clique em **Deploy**. O `npm run build` da Vercel já roda
`prisma migrate deploy` sozinho antes do `next build` (configurado em
`package.json`), então as tabelas são criadas automaticamente nesse
primeiro deploy.

**6) Criar a conta de admin no banco de produção**

O seed roda **local**, mas apontando pro Neon em vez do Postgres do
Docker — é só pra essa vez (criar a conta), não fica rodando:

```powershell
$env:DATABASE_URL="<a mesma DATABASE_URL que a Vercel gerou — copie de Settings → Environment Variables>"
$env:ADMIN_EMAIL="seu-email-de-verdade"
$env:ADMIN_PASSWORD="uma-senha-forte-de-verdade"
npx tsx prisma/seed.ts
```

Depois disso, `https://seu-projeto.vercel.app/admin` já aceita esse
login.

**Nota sobre o `Dockerfile`**: os estágios `builder`/`runner` (build de
produção via Docker) não foram testados com o novo `prisma migrate
deploy` no script `build` — como ele precisa de `DATABASE_URL` em tempo
de build, rodar `docker build` sozinho (sem `docker compose`, sem rede
com o banco) provavelmente falha nesse passo. Isso não afeta a Vercel
(que já injeta as variáveis de ambiente antes do build) nem o seu
dia a dia local (que usa o estágio `dev`, sem esse script `build`) — só
vale saber se um dia decidir buildar a imagem de produção manualmente.
