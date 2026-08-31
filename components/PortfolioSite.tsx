"use client";

import { useEffect, useState } from "react";
import { loadDraft } from "@/lib/portfolioHelpers";
import type { PortfolioData } from "@/lib/types";
import HeartClipDefs from "./HeartClipDefs";
import TopBar from "./TopBar";
import Hero from "./Hero";
import AlbumSection from "./AlbumSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

/*
  PortfolioSite renders with the build-time data first (so the initial
  HTML always matches server output — no hydration mismatch), then, once
  mounted, swaps in a local curation draft if /admin saved one in this
  browser's localStorage. That's the same "preview before you export"
  behavior the static version had.
*/
export default function PortfolioSite({ initialData }: { initialData: PortfolioData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) setData(draft);
  }, []);

  return (
    <>
      <HeartClipDefs />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <TopBar />

      <noscript>
        <p className="noscript-note">
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
    </>
  );
}
