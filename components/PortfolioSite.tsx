"use client";

import type { PortfolioData } from "@/lib/types";
import HeartClipDefs from "./HeartClipDefs";
import TopBar from "./TopBar";
import Hero from "./Hero";
import AlbumSection from "./AlbumSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { DEFAULT_THEME } from "@/lib/themes";

export default function PortfolioSite({ initialData }: { initialData: PortfolioData }) {
  const data = initialData;
  const currentTheme = data.theme || DEFAULT_THEME;
  const themeStyles = {
     "--brand-bg": currentTheme.bgPrimary,
        "--brand-bg-tint": currentTheme.bgTint,
        "--brand-accent": currentTheme.accentColor,
        "--brand-accent-ink": currentTheme.accentInk,
        "--brand-ink": currentTheme.textColor,
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="min-h-screen bg-brand-bg text-brand-ink transition-colors duration-300">
      <HeartClipDefs />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-accent-deep focus:text-brand-accent-ink focus:rounded-full focus:shadow-lg focus:font-semibold focus:text-sm"
        href="#conteudo"
      >
        Pular para o conteúdo
      </a>

      <TopBar />

      <noscript>
        <p className="bg-brand-accent-soft text-brand-ink text-center py-2.5 px-4 text-sm font-medium">
          Ative o JavaScript para ver o portfólio completo — as fotos e os dados de contato são carregados
          dinamicamente.
        </p>
      </noscript>

      <main id="conteudo">
        <Hero data={data} />
        {data.categories.map((category, i) => (
          <AlbumSection key={category.id} data={data} category={category} tint={i % 2 === 1} />
        ))}
        <AboutSection data={data} />
        <ContactSection data={data} />
      </main>

      <Footer data={data} />
    </div>
  );
}
