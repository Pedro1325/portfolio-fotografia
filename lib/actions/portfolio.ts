"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { ThemeConfig } from "@/lib/themes";

/**
 * FASE 1: ainda não existe login (isso vem na Fase 2), então "a fotógrafa
 * atual" é sempre a primeira linha da tabela Portfolio — a que o
 * `prisma/seed.ts` criou. Na Fase 2 essa função vira "pega o portfolio do
 * usuário da sessão" e o resto das actions abaixo praticamente não muda,
 * porque já filtram tudo por portfolioId.
 */
async function getCurrentPortfolioId(): Promise<string> {
  const portfolio = await prisma.portfolio.findFirstOrThrow({ select: { id: true } });
  return portfolio.id;
}

type PhotoPatch = Partial<{
  src: string | null;
  caption: string;
  featured: boolean;
  selected: boolean;
  order: number;
}>;

export async function updatePhoto(photoId: string, patch: PhotoPatch) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.photo.update({
    where: { id: photoId, portfolioId },
    data: patch,
  });
  revalidatePath("/");
}

export async function removePhoto(photoId: string) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.photo.delete({ where: { id: photoId, portfolioId } });
  revalidatePath("/");
}

export async function addPhoto(input: {
  categorySlug: string;
  src: string | null;
  caption: string;
  featured: boolean;
}) {
  const portfolioId = await getCurrentPortfolioId();
  const category = await prisma.category.findFirstOrThrow({
    where: { portfolioId, slug: input.categorySlug },
    select: { id: true },
  });
  const last = await prisma.photo.findFirst({
    where: { portfolioId, categoryId: category.id },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const created = await prisma.photo.create({
    data: {
      portfolioId,
      categoryId: category.id,
      src: input.src,
      caption: input.caption,
      featured: input.featured,
      selected: true,
      order: (last?.order ?? 0) + 1,
    },
    select: { id: true, order: true },
  });
  revalidatePath("/");
  return created;
}

type ThemePatch = Partial<
  Pick<ThemeConfig, "bgPrimary" | "bgTint" | "accentColor" | "accentInk" | "textColor" | "fontFamily">
>;

export async function updateTheme(patch: ThemePatch) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.theme.update({
    where: { portfolioId },
    data: { ...patch, presetId: "custom" },
  });
  revalidatePath("/");
}

export async function selectThemePreset(preset: ThemeConfig) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.theme.update({
    where: { portfolioId },
    data: {
      presetId: preset.id,
      name: preset.name,
      description: preset.description,
      bgPrimary: preset.bgPrimary,
      bgTint: preset.bgTint,
      accentColor: preset.accentColor,
      accentInk: preset.accentInk,
      textColor: preset.textColor,
      fontFamily: preset.fontFamily,
    },
  });
  revalidatePath("/");
}
