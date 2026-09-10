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
import type { Photographer, Category } from "@/lib/types";
import { slugify } from "@/lib/adminHelpers";


 
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
  revalidatePath("/admin");
}

export async function removePhoto(photoId: string) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.photo.delete({ where: { id: photoId, portfolioId } });
  revalidatePath("/");
  revalidatePath("/admin");
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
    where: {
      portfolioId,
      OR: [{ slug: categorySlug }, { id: categorySlug }],
    },
    select: { id: true, slug: true },
  });
  if (!category) {
    return { error: "Categoria não encontrada." };
  }

  const filename = `${randomUUID()}.${ext}`;
  const src = await saveUploadedFile(category.slug, filename, file);

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
  revalidatePath("/admin");
  return {
    id: created.id,
    category: category.slug,
    src: created.src as string,
    caption: created.caption ?? "",
    featured: created.featured,
    selected: created.selected,
    order: created.order,
  };
}

export async function replacePhotoFile(
  photoId: string,
  formData: FormData
): Promise<{ error?: string; src?: string }> {
  const portfolioId = await getCurrentPortfolioId();
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

  const photo = await prisma.photo.findUnique({
    where: { id: photoId, portfolioId },
    include: { category: true },
  });
  if (!photo) {
    return { error: "Foto não encontrada." };
  }

  const folder = photo.category?.slug || "geral";
  const filename = `${randomUUID()}.${ext}`;
  const src = await saveUploadedFile(folder, filename, file);

  await prisma.photo.update({
    where: { id: photoId, portfolioId },
    data: { src },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { src };
}

export async function updateCategory(
  categorySlugOrId: string,
  patch: Partial<{ label: string; note: string; status: string; page: string }>
) {
  const portfolioId = await getCurrentPortfolioId();
  const cat = await prisma.category.findFirst({
    where: {
      portfolioId,
      OR: [{ slug: categorySlugOrId }, { id: categorySlugOrId }],
    },
  });
  if (!cat) throw new Error("Categoria não encontrada.");

  await prisma.category.update({
    where: { id: cat.id },
    data: patch,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createCategory(data: {
  label: string;
  note?: string;
  status?: string;
  page?: string;
}): Promise<{ error?: string; category?: Category }> {
  const portfolioId = await getCurrentPortfolioId();
  const rawLabel = (data.label || "").trim();
  if (!rawLabel) {
    return { error: "Informe o nome da categoria." };
  }

  const baseSlug = slugify(rawLabel) || "album";
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.category.findFirst({ where: { portfolioId, slug } })) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const existingCount = await prisma.category.count({ where: { portfolioId } });
  const pageNumber = data.page?.trim() || `/${String(existingCount + 2).padStart(2, "0")}`;

  const created = await prisma.category.create({
    data: {
      portfolioId,
      slug,
      label: rawLabel,
      page: pageNumber,
      status: data.status?.trim() || "Disponível",
      note: data.note?.trim() || "",
      order: existingCount,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return {
    category: {
      id: created.slug,
      label: created.label,
      page: created.page,
      status: created.status ?? "",
      note: created.note ?? "",
    },
  };
}


export async function removeCategory(categorySlugOrId: string): Promise<{ error?: string; success?: boolean }> {
  const portfolioId = await getCurrentPortfolioId();
  const cat = await prisma.category.findFirst({
    where: {
      portfolioId,
      OR: [{ slug: categorySlugOrId }, { id: categorySlugOrId }],
    },
  });
  if (!cat) return { error: "Categoria não encontrada." };

  await prisma.category.delete({
    where: { id: cat.id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}


export async function updatePhotographer(patch: Partial<Photographer>) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.portfolio.update({
    where: { id: portfolioId },
    data: {
      photographerName: patch.name,
      role: patch.role,
      location: patch.location,
      bio: patch.bio,
      email: patch.email,
      phone: patch.phone,
      instagram: patch.instagram,
      whatsapp: patch.whatsapp,
      avatar: patch.avatar,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}


export async function uploadAvatar(formData: FormData): Promise<{ avatar?: string; error?: string }> {
  const portfolioId = await getCurrentPortfolioId();
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

  const filename = `avatar-${randomUUID()}.${ext}`;
  const avatar = await saveUploadedFile("perfil", filename, file);

  await prisma.portfolio.update({
    where: { id: portfolioId },
    data: { avatar },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { avatar };
}

type ThemePatch = Partial<
  Pick<ThemeConfig, "bgPrimary" | "bgTint" | "accentColor" | "accentInk" | "textColor" | "fontFamily">
>;

export async function updateTheme(patch: ThemePatch) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.theme.upsert({
    where: { portfolioId },
    update: { ...patch, presetId: "custom" },
    create: {
      portfolioId,
      presetId: "custom",
      name: "Personalizado",
      description: "Paleta personalizada",
      bgPrimary: patch.bgPrimary || "#fdf4ee",
      bgTint: patch.bgTint || "#fbe9ee",
      accentColor: patch.accentColor || "#b83d6b",
      accentInk: patch.accentInk || "#ffffff",
      textColor: patch.textColor || "#5a3341",
      fontFamily: patch.fontFamily || "hand",
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function selectThemePreset(preset: ThemeConfig) {
  const portfolioId = await getCurrentPortfolioId();
  await prisma.theme.upsert({
    where: { portfolioId },
    update: {
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
    create: {
      portfolioId,
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
  revalidatePath("/admin");
}
