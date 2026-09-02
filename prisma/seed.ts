
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import { PORTFOLIO_DATA } from "../lib/portfolioData";

const DEV_EMAIL = "sabrina@example.com";
const DEV_PASSWORD = "senha123"; 

async function main() {
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: DEV_EMAIL },
    update: {},
    create: {
      email: DEV_EMAIL,
      passwordHash,
      name: PORTFOLIO_DATA.photographer.name,
    },
  });

  const theme = PORTFOLIO_DATA.theme;

  const portfolio = await prisma.portfolio.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      slug: "sabrina",
      photographerName: PORTFOLIO_DATA.photographer.name,
      role: PORTFOLIO_DATA.photographer.role,
      location: PORTFOLIO_DATA.photographer.location,
      bio: PORTFOLIO_DATA.photographer.bio,
      email: PORTFOLIO_DATA.photographer.email,
      phone: PORTFOLIO_DATA.photographer.phone,
      instagram: PORTFOLIO_DATA.photographer.instagram,
      whatsapp: PORTFOLIO_DATA.photographer.whatsapp,
      avatar: PORTFOLIO_DATA.photographer.avatar,
      theme: theme
        ? {
            create: {
              presetId: theme.id,
              name: theme.name,
              description: theme.description,
              bgPrimary: theme.bgPrimary,
              bgTint: theme.bgTint,
              accentColor: theme.accentColor,
              accentInk: theme.accentInk,
              textColor: theme.textColor,
              fontFamily: theme.fontFamily,
            },
          }
        : undefined,
    },
  });

  const categoryIdMap = new Map<string, string>();

  for (const [index, category] of PORTFOLIO_DATA.categories.entries()) {
    const created = await prisma.category.upsert({
      where: { portfolioId_slug: { portfolioId: portfolio.id, slug: category.id } },
      update: {},
      create: {
        portfolioId: portfolio.id,
        slug: category.id,
        page: category.page,
        label: category.label,
        status: category.status,
        note: category.note,
        order: index,
      },
    });
    categoryIdMap.set(category.id, created.id);
  }

  const existingPhotos = await prisma.photo.count({ where: { portfolioId: portfolio.id } });
  if (existingPhotos === 0) {
    for (const photo of PORTFOLIO_DATA.photos) {
      const categoryId = categoryIdMap.get(photo.category);
      if (!categoryId) continue;
      await prisma.photo.create({
        data: {
          portfolioId: portfolio.id,
          categoryId,
          src: photo.src,
          caption: photo.caption,
          featured: photo.featured,
          selected: photo.selected,
          order: photo.order,
        },
      });
    }
  }

  console.log(`Seed concluído. Login de teste: ${DEV_EMAIL} / ${DEV_PASSWORD}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
