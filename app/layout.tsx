import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Portfólios de fotografia",
  description: "Crie seu portfólio de fotografia — casamentos, retratos e ensaios, editorial e moda.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
