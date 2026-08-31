import Link from "next/link";
import { LockIcon } from "./icons";
import type { PortfolioData } from "@/lib/types";

export default function Footer({ data }: { data: PortfolioData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-brand-line-soft/80 bg-brand-bg-raised text-center flex flex-col items-center gap-3 text-xs text-brand-ink-faint">
      <p className="font-hand text-base md:text-lg text-brand-ink-soft">Horários combinados com carinho — confirme direitinho antes de marcar.</p>
      <p className="text-xs text-brand-ink-faint">
        © {year} {data.photographer.name}. Todos os direitos reservados.
      </p>
      <Link
        className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs text-brand-ink-faint hover:text-brand-accent transition-colors rounded-full border border-brand-line-soft hover:bg-brand-bg-inset mt-2 shadow-sm"
        href="/admin"
      >
        <LockIcon className="w-3.5 h-3.5" />
        Área da fotógrafa
      </Link>
    </footer>
  );
}
