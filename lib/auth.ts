import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  // Sessão em JWT (não em banco): o "token de login" fica todo dentro de
  // um cookie assinado, sem precisar consultar o Postgres a cada request
  // pra saber quem está logado. Não precisamos das tabelas Account/Session
  // do NextAuth porque não tem login social (Google etc.) — só e-mail/senha.
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim().toLowerCase() },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
  ],
  callbacks: {
    // authorize() só roda no login. Pra "id" do usuário sobreviver nos
    // requests seguintes, ele precisa ser copiado pro token (aqui) e
    // depois do token pra sessão (embaixo) — dois passos, porque o token
    // e a sessão são objetos diferentes no NextAuth.
    async jwt({ token, user }) {
      if (user) token.userId = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.userId;
      return session;
    },
  },
};
