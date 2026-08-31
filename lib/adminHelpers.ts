import type { PortfolioData } from "./types";

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const ACCENTS: Record<string, string> = { a: "áàâã", e: "éê", i: "í", o: "óôõ", u: "ú", c: "ç" };

function foldAccents(str: string): string {
  let out = str;
  Object.keys(ACCENTS).forEach((plain) => {
    ACCENTS[plain].split("").forEach((accented) => {
      out = out.split(accented).join(plain);
    });
  });
  return out;
}

export function slugify(str: string): string {
  return foldAccents(String(str || "").toLowerCase())
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function photosByCategory(state: PortfolioData, categoryId: string) {
  return state.photos
    .filter((p) => p.category === categoryId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function buildExportSource(state: PortfolioData): string {
  const header =
    "/*\n" +
    "  lib/portfolioData.ts — exportado pela área da fotógrafa em " +
    new Date().toLocaleString("pt-BR") +
    ".\n" +
    "  Substitua o arquivo lib/portfolioData.ts do projeto por este.\n" +
    "*/\n\n" +
    'import type { PortfolioData } from "./types";\n\n';
  return header + "export const PORTFOLIO_DATA: PortfolioData = " + JSON.stringify(state, null, 2) + ";\n";
}
