"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ThemeConfig } from "@/lib/themes";

/**
 * FASE 2: agora que existe login, "a fotógrafa atual" é quem estiver
 * autenticada na sessão — nunca um id que o cliente mandou (só assim dá
 * pra garantir que uma fotógrafa não edita o portfolio de outra). Isso é
 * chamado em toda action abaixo antes de qualquer escrita no banco.
 */
async function getCurrentPortfolioId(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Não autenticado.");

  const portfolio = await prisma.portfolio.findUniqueOrThrow({
    where: { userId: session.user.id },
    select: { id: true },
  });
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

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB


async function saveUploadedFile(categorySlug: string, filename: string, file: File): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${categorySlug}/${filename}`, file, { access: "public" });
    return blob.url;
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", categorySlug);
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${categorySlug}/${filename}`;
}

export type UploadPhotoResult =
  | { error: string }
  | { id: string; category: string; src: string; caption: string; featured: boolean; selected: boolean; order: number };

export async function uploadPhoto(formData: FormData): Promise<UploadPhotoResult> {
  const portfolioId = await getCurrentPortfolioId();

  const categorySlug = String(formData.get("category") || "");
  const caption = String(formData.get("caption") || "").trim();
  const featured = formData.get("featured") === "on";
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecione um arquivo de imagem." };
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return { error: "Formato não aceito. Envie um arquivo JPG, PNG ou WebP." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "Arquivo muito grande (máximo 8MB)." };
  }

  const category = await prisma.category.findFirst({
    where: { portfolioId, slug: categorySlug },
    select: { id: true },
  });
  if (!category) {
    return { error: "Categoria não encontrada." };
  }


  const filename = `${randomUUID()}.${ext}`;
  const src = await saveUploadedFile(categorySlug, filename, file);

  const last = await prisma.photo.findFirst({
    where: { portfolioId, categoryId: category.id },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const created = await prisma.photo.create({
    data: {
      portfolioId,
      categoryId: category.id,
      src,
      caption,
      featured,
      selected: true,
      order: (last?.order ?? 0) + 1,
    },
  });

  revalidatePath("/");
  return {
    id: created.id,
    category: categorySlug,
    src: created.src as string,
    caption: created.caption ?? "",
    featured: created.featured,
    selected: created.selected,
    order: created.order,
  };
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
