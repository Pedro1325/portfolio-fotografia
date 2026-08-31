import Link from "next/link";
import { LockIcon } from "./icons";
import type { PortfolioData } from "@/lib/types";

export default function Footer({ data }: { data: PortfolioData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__note">Horários combinados com carinho — confirme direitinho antes de marcar.</p>
      <p className="footer__copy">
        © {year} {data.photographer.name}. Todos os direitos reservados.
      </p>
      <Link className="footer__admin" href="/admin">
        <LockIcon />
        Área da fotógrafa
      </Link>
    </footer>
  );
}
