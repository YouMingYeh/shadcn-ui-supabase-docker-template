# syntax=docker/dockerfile:1

# Stage 1: Base
FROM oven/bun:1 AS base
WORKDIR /app

# Stage 2: Builder - Prune the monorepo
FROM base AS builder
RUN bun add -g turbo
COPY . .
RUN turbo prune server --docker

# Stage 3: Installer - Install dependencies and build
FROM base AS installer
WORKDIR /app

# Copy lockfile and package.json's from prune
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile

# Copy source code from prune
COPY --from=builder /app/out/full/ .
RUN bun run build --filter=server

# Stage 4: Runner - Production runtime
FROM node:20-alpine AS runner
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
