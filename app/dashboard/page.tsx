import { redirect } from "next/navigation";

// A área administrativa voltou a ser /admin (era /dashboard temporariamente
// durante o desenvolvimento da Fase 2). Mantido só como redirecionamento
// pra não quebrar quem tinha esse link salvo.
export default function DashboardRedirectPage() {
  redirect("/admin");
}
