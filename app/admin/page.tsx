import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { portfolioInclude, toPortfolioData } from "@/lib/portfolioMapper";
import AdminApp from "@/components/admin/AdminApp";

export default async function AdminPage() {

  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: portfolioInclude,
  });
  if (!portfolio) redirect("/login");

  return <AdminApp initialData={toPortfolioData(portfolio)} />;
}
