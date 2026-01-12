# syntax=docker/dockerfile:1

# Stage 1: Base
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Stage 2: Builder - Prune the monorepo
FROM base AS builder
RUN pnpm add -g turbo
COPY . .
RUN turbo prune server --docker

# Stage 3: Installer - Install dependencies and build
FROM base AS installer
WORKDIR /app

# Copy lockfile and package.json's from prune
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source code from prune
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=server

# Stage 4: Runner - Production runtime
FROM base AS runner
WORKDIR /app

# Copy built application maintaining monorepo structure
COPY --from=installer /app/apps/server/dist ./apps/server/dist
COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
COPY --from=installer /app/apps/server/node_modules ./apps/server/node_modules

# Copy node_modules from workspace root
COPY --from=installer /app/node_modules ./node_modules

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs && \
    chown -R expressjs:nodejs /app

USER expressjs

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

WORKDIR /app/apps/server
CMD ["node", "dist/index.js"]
