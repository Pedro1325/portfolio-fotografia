# Autenticação na área da fotógrafa (`/admin`)

**Curta: sim, é totalmente possível.** Este documento explica o que existe
hoje, duas coisas que "atualizar o visual" pode significar (são bem
diferentes de implementar), e as opções reais de autenticação — com uma
recomendação. Nada aqui foi implementado ainda; é só a explicação que você
pediu. Se quiser que eu implemente alguma das opções, é só pedir.

## Duas coisas diferentes: "conteúdo" x "design"

Vale separar isso antes de tudo, porque muda o tamanho do trabalho:

1. **Atualizar o conteúdo/fotos** (quais fotos aparecem, legendas, ordem,
   destaque, texto de contato) — **isso já existe**, é o `/admin` que
   construímos. Falta só proteger essa tela com senha de verdade.
2. **Atualizar o visual/design** (trocar cores, fontes, layout) — isso é
   uma categoria bem diferente de admin. Painéis desse tipo existem (é
   basicamente reinventar um construtor de site tipo Wix/Canva), mas dão
   MUITO mais trabalho que uma tela de curadoria de fotos — normalmente
   não vale a pena pra um site pessoal como este. O caminho normal pra
   mudanças de design continua sendo pedir aqui pro Claude ajustar o
   código (como fizemos até agora).

O resto deste documento assume que você quer proteger o `/admin` que já
existe (opção 1) — se era a opção 2 que você tinha em mente, me avisa que
a conversa é outra.

## Estado atual: sem autenticação real

Hoje, `/admin` não tem login nenhum. Qualquer pessoa que souber o
endereço consegue abrir e editar. A única "proteção" é ele não estar
linkado no menu do site — o que não protege nada de verdade, só evita que
um visitante comum tropece nele por acaso.

## As opções

### 1. Senha simples via Middleware do Next.js (recomendado)

O Next.js roda um arquivo `middleware.js` na raiz do projeto **antes** de
qualquer página — dá pra checar ali se quem está pedindo `/admin` (ou
qualquer rota abaixo dele) tem um cookie de sessão válido, e se não tiver,
redirecionar pra uma tela de login.

- **Prós:** sem dependência nova, sem custo, roda em qualquer host que
  suporte Next.js (Vercel, Netlify, etc.), a senha nunca aparece no código
  que vai pro navegador dela (fica numa variável de ambiente no servidor).
- **Contras:** é só uma senha (não tem "usuários", recuperação de senha,
  etc.) — perfeito pra "só ela usa", não pra uma equipe.

Esboço de como fica (ilustrativo, ainda não está no projeto):

```js
// middleware.js — na raiz do projeto
import { NextResponse } from "next/server";

export function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";
  if (!isAdminRoute || isLoginRoute) return NextResponse.next();

  const session = request.cookies.get("admin_session")?.value;
  if (session !== process.env.ADMIN_SESSION_SECRET) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = { matcher: "/admin/:path*" };
```

```js
// app/admin/login/page.js — formulário simples de senha
// app/api/admin-login/route.js — confere a senha contra process.enve, se bater, seta o cookie "admin_session" (httpOnly, secure) com o
//   valor de process.env.ADMIN_SESSION_SECRET.
```

A senha (`ADMIN_PASSWORD`) e o segredo da sessão (`ADMIN_SESSION_SECRET`)
ficam em variáveis de ambiente (`.env.local` local, e nas configurações do
projeto na Vercel/Netlify em produção) — nunca no código.

### 2. NextAuth.js / Auth.js

Uma biblioteca de autenticação completa (login com e-mail/senha, Google,
etc., múltiplos usuários, sessões gerenciadas).

- **Prós:** robusto, testado, fácil de adicionar "login com Google" depois.
- **Contras:** dependência a mais, configuração mais longa, pensado pra
  apps com vários usuários — é over-engineering pra "só ela usa".

Só vale a pena se no futuro mais de uma pessoa for editar o site, ou se
ela quiser trocar a senha sozinha sem mexer em variável de ambiente.

### 3. Proteção do provedor de hospedagem (zero código)

Vercel (planos pagos) e Netlify têm "Password Protection" nas configurações
do projeto — protege o site (ou só certas rotas, dependendo do plano) com
uma senha, sem escrever nenhum código.

- **Prós:** nenhum código, nenhuma manutenção.
- **Contras:** normalmente protege o domínio inteiro ou exige plano pago;
  não dá pra ter o site público aberto e só o `/admin` fechado sem custo
  extra, na maioria dos planos gratuitos.

## Comparação rápida

| Opção | Custo | Esforço | Só admin fica trancado? |
|---|---|---|---|
| Middleware + senha | Grátis | Pequeno | Sim |
| NextAuth.js | Grátis | Médio | Sim |
| Proteção do host | Geralmente pago | Nenhum | Depende do plano |

## Recomendação

**Opção 1 (Middleware + senha via variável de ambiente).** É grátis, dá
pra deixar o site público aberto e só o `/admin` trancado, e o tamanho do
código combina com o resto do projeto (sem backend/banco de dados). Leva
uns 15–20 minutos pra eu implementar quando você quiser.

## Próximos passos

Se quiser seguir com a Opção 1, me avise e eu:
1. Crio o `middleware.js`, a tela de login e a rota que confere a senha.
2. Te explico como definir a senha (`ADMIN_PASSWORD`) local e em produção.
3. Testo o fluxo de login/logout com você depois que `npm run dev` estiver
   rodando (ainda não confirmamos isso — veja o README).
