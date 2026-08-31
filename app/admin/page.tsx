import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import AdminApp from "@/components/admin/AdminApp";

export default function AdminPage() {
  return <AdminApp initialData={PORTFOLIO_DATA} />;
}
