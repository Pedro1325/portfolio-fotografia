import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import PortfolioSite from "@/components/PortfolioSite";

export default function HomePage() {
  return <PortfolioSite initialData={PORTFOLIO_DATA} />;
}
