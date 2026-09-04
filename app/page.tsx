import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import PortfolioSite from "@/components/PortfolioSite";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Sem multi-tenant: só existe uma fotógrafa/portfolio no banco.
  // Se o banco ainda não tiver sido populado (seed), usa os dados de exemplo.
  const portfolio = await prisma.portfolio.findFirst({ include: portfolioInclude });

  return <PortfolioSite initialData={portfolio ? toPortfolioData(portfolio) : PORTFOLIO_DATA} />;
}

