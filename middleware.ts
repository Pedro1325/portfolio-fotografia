import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware roda no "Edge Runtime" do Next.js — um ambiente bem mais
// limitado que o Node.js normal (sem acesso a boa parte da API do
// sistema). O Prisma Client NÃO funciona nesse ambiente. Por isso este
// arquivo usa `getToken()` (só decodifica o cookie de sessão, sem tocar
// no banco) em vez de importar `authOptions` de lib/auth.ts — aquele
// arquivo importa o Prisma (pelo Credentials provider), e se o
// middleware importasse `authOptions`, o Prisma entraria nesse bundle e
// quebraria o build.
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
