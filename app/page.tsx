import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import PortfolioSite from "@/components/PortfolioSite";

export default async function HomePage() {
  // Sem multi-tenant: só existe uma fotógrafa/portfolio no banco, então
  // pegamos direto o único que existe.
  const portfolio = await prisma.portfolio.findFirstOrThrow({ include: portfolioInclude });

  return <PortfolioSite initialData={toPortfolioData(portfolio)} />;
}
