# /apps/admin/Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS builder
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=admin --docker

FROM base AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN mkdir -p /app/apps/admin/public

# Accept build arguments for Next.js public env vars
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set as environment variables for build time
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN bun run build --filter=admin

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer /app/apps/admin/next.config.ts .
COPY --from=installer /app/apps/admin/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public

CMD ["node", "apps/admin/server.js"]
