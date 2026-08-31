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

const DRAFT_KEY = "impeccable_portfolio_draft";

export function loadDraft(): PortfolioData | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (draft && draft.photos && draft.photographer && draft.categories) return draft as PortfolioData;
    return null;
  } catch {
    return null;
  }
}

export function saveDraft(data: PortfolioData): void {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

export function clearDraft(): void {
  window.localStorage.removeItem(DRAFT_KEY);
}
