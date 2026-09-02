"use client";

import { Suspense, useState, useTransition, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    startTransition(async () => {
      // redirect: false pra gente controlar o redirecionamento (e
      // mostrar a mensagem de erro na própria página em vez de cair
      // numa tela de erro genérica do NextAuth).
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("E-mail ou senha incorretos.");
        return;
      }
      router.push(callbackUrl || "/admin");
      router.refresh();
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg px-6 py-12">
      <div className="w-full max-w-sm bg-brand-paper p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl text-brand-ink">Entrar</h1>
          <p className="text-sm text-brand-ink-soft mt-1">Acesse o painel do seu portfólio.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 text-sm bg-brand-bg-raised border border-brand-line rounded focus:outline-none focus:ring-2 focus:ring-brand-accent-deep text-brand-ink"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 text-sm bg-brand-bg-raised border border-brand-line rounded focus:outline-none focus:ring-2 focus:ring-brand-accent-deep text-brand-ink"
            />
          </div>

          {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-5 py-2.5 bg-brand-accent-deep hover:bg-brand-accent-strong disabled:opacity-60 text-brand-accent-ink font-semibold text-xs uppercase tracking-wider rounded shadow-sm hover:shadow transition"
          >
            {isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  // useSearchParams precisa de um <Suspense> ao redor em build estático
  // do Next — sem isso o `npm run build` avisa/quebra.
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
