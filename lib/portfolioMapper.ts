import type { Category as CategoryRow, Photo as PhotoRow, Portfolio as PortfolioRow, Theme as ThemeRow } from "@prisma/client";
import type { PortfolioData } from "./types";

export type PortfolioWithRelations = PortfolioRow & {
  theme: ThemeRow | null;
  categories: CategoryRow[];
  photos: PhotoRow[];
};

/**
 * Os componentes existentes (Hero, AlbumSection, PhotoFrame, AdminApp e
 * companhia) foram todos escritos contra o formato `PortfolioData` de
 * lib/types.ts. Em vez de reescrever cada um deles pra entender linhas do
 * Prisma, esta função converte o resultado da query (Portfolio + suas
 * relações) de volta pro mesmo formato de sempre — assim quase nenhum
 * componente de UI precisa mudar nesta fase.
 */
export function toPortfolioData(row: PortfolioWithRelations): PortfolioData {
  const categories = [...row.categories].sort((a, b) => a.order - b.order);

  return {
    theme: row.theme
      ? {
          id: row.theme.presetId,
          name: row.theme.name,
          description: row.theme.description,
          bgPrimary: row.theme.bgPrimary,
          bgTint: row.theme.bgTint,
          accentInk: row.theme.accentInk,
          accentColor: row.theme.accentColor,
          textColor: row.theme.textColor,
          fontFamily: row.theme.fontFamily as "hand" | "serif" | "sans",
        }
      : undefined,
    photographer: {
      name: row.photographerName,
      role: row.role ?? "",
      location: row.location ?? "",
      bio: row.bio ?? "",
      email: row.email ?? "",
      phone: row.phone ?? "",
      instagram: row.instagram ?? "",
      whatsapp: row.whatsapp ?? "",
      avatar: row.avatar ?? undefined,
    },
    categories: categories.map((c) => ({
      id: c.slug,
      page: c.page,
      label: c.label,
      status: c.status ?? "",
      note: c.note ?? "",
    })),
    photos: [...row.photos]
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        id: p.id,
        category: categories.find((c) => c.id === p.categoryId)?.slug ?? "",
        src: p.src,
        caption: p.caption ?? "",
        featured: p.featured,
        selected: p.selected,
        order: p.order,
      })),
  };
}

export const portfolioInclude = {
  theme: true,
  categories: true,
  photos: true,
} as const;
