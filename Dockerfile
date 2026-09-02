# ---- deps: instala as dependências ----
# Fica em um stage separado pra virar cache: o Docker só re-executa esse
# RUN npm ci se package.json/package-lock.json/prisma/schema.prisma mudarem.
# Se você só editar um componente .tsx, este stage inteiro vem do cache.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

FROM node:20-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- builder / runner: build de produção ----
# Não são usados na Fase 1 (que só quer Postgres + dev local em Docker), mas
# deixo prontos pra quando você quiser rodar isso "de verdade" depois.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
