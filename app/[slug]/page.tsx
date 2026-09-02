import { redirect } from "next/navigation";

// Multi-tenant (um endereço público por fotógrafa) não faz parte do
// escopo por enquanto — o site fica só em "/". Mantido como
// redirecionamento pra não deixar essa rota quebrada/inconsistente.
export default function SlugRedirectPage() {
  redirect("/");
}
