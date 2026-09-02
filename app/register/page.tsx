import { redirect } from "next/navigation";

// Sem cadastro público — só existe login (ver app/login/page.tsx). Contas
// novas, se algum dia forem necessárias, são criadas manualmente (ex: um
// script rodado direto no banco), não por uma tela pública.
export default function RegisterRedirectPage() {
  redirect("/login");
}
