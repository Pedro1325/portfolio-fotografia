import type { DefaultSession } from "next-auth";

// O NextAuth não sabe por padrão que a gente guarda um "id" de usuário na
// sessão — esse arquivo "amplia" (module augmentation) os tipos da
// biblioteca pra incluir esse campo, sem precisar de `as any` toda vez
// que a gente ler `session.user.id` no resto do código.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
