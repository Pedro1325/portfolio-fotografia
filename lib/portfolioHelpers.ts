import type { PortfolioData, Photo } from "./types";

export function selectedInCategory(data: PortfolioData, categoryId: string): Photo[] {
  return data.photos
    .filter((p) => p.category === categoryId && p.selected)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function featuredFor(data: PortfolioData, categoryId: string): Photo | null {
  const list = selectedInCategory(data, categoryId);
  const featured = list.filter((p) => p.featured);
  return featured[0] || list[0] || null;
}
