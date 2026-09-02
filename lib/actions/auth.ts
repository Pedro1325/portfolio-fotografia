"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/adminHelpers";
import { DEFAULT_THEME } from "@/lib/themes";

export type RegisterResult = { error: string } | { slug: string };

export async function registerPhotographer(input: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!name || !email || input.password.length < 6) {
    return { error: "Preencha nome, e-mail e uma senha com pelo menos 6 caracteres." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Já existe uma conta com esse e-mail." };
  }

  // Duas fotógrafas podem se chamar "Ana Silva" — o slug (endereço
  // público, tipo /ana-silva) precisa ser único, então vamos tentando
  // "ana-silva", "ana-silva-2", "ana-silva-3"... até achar um livre.
  const baseSlug = slugify(name) || "fotografa";
  let slug = baseSlug;
  let suffix = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await prisma.portfolio.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      portfolio: {
        create: {
          slug,
          photographerName: name,
          theme: {
            create: {
              presetId: DEFAULT_THEME.id,
              name: DEFAULT_THEME.name,
              description: DEFAULT_THEME.description,
              bgPrimary: DEFAULT_THEME.bgPrimary,
              bgTint: DEFAULT_THEME.bgTint,
              accentColor: DEFAULT_THEME.accentColor,
              accentInk: DEFAULT_THEME.accentInk,
              textColor: DEFAULT_THEME.textColor,
              fontFamily: DEFAULT_THEME.fontFamily,
            },
          },
          // Categorias padrão pra já ter uma estrutura pra trabalhar em
          // cima — sem fotos ainda, a fotógrafa adiciona pelo dashboard.
          categories: {
            create: [
              { slug: "casamentos", page: "/02", label: "Casamentos & Eventos", order: 0 },
              { slug: "retratos", page: "/03", label: "Retratos & Ensaios", order: 1 },
              { slug: "editorial", page: "/04", label: "Editorial & Moda", order: 2 },
            ],
          },
        },
      },
    },
  });

  return { slug };
}
