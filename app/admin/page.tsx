import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import AdminApp from "@/components/admin/AdminApp";

export default async function AdminPage() {
  const portfolio = await prisma.portfolio.findFirstOrThrow({ include: portfolioInclude });

  return <AdminApp initialData={toPortfolioData(portfolio)} />;
}
