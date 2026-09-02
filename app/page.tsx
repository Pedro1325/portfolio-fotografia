import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import PortfolioSite from "@/components/PortfolioSite";

export default async function HomePage() {
  const portfolio = await prisma.portfolio.findFirstOrThrow({ include: portfolioInclude });
  return <PortfolioSite initialData={toPortfolioData(portfolio)} />;
}
