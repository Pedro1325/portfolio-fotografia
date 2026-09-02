import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-brand-bg text-brand-ink">
      <h1 className="font-display text-4xl">Página não encontrada</h1>
      <p className="text-brand-ink-soft">Esse endereço não existe.</p>
      <Link href="/" className="underline text-brand-accent-deep">
        Voltar pro início
      </Link>
    </main>
  );
}
