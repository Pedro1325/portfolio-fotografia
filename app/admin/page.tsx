import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import AdminApp from "@/components/admin/AdminApp";

export default async function AdminPage() {
  // O middleware.ts já bloqueia quem não está logado antes de chegar
  // aqui — esse `redirect` é só uma segunda camada de segurança (defesa
  // em profundidade), pro caso de o middleware nunca rodar por algum
  // motivo (nunca confie só numa camada).
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: portfolioInclude,
  });
  if (!portfolio) redirect("/login");

  return <AdminApp initialData={toPortfolioData(portfolio)} />;
}
