import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../../css/admin.css";

export const metadata: Metadata = {
  title: "Área da fotógrafa — curadoria do portfólio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
