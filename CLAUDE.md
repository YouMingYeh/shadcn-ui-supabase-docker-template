# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install                    # Install all dependencies
pnpm dev                        # Run all apps in dev mode (web:3000, admin:3001, server:4000)
pnpm build                      # Build all apps/packages
pnpm lint                       # Lint all packages
pnpm typecheck                  # Type check all packages
pnpm format                     # Prettier format *.ts, *.tsx, *.md

# Scoped to a single app
pnpm --filter web dev
pnpm --filter admin dev
pnpm --filter server dev

# Docker
make dev-docker                 # Dev mode (attached, hot-reload via volume mounts)
make up                         # Production (detached)
make down                       # Stop services
make logs                       # All logs; also logs-web, logs-admin, logs-server
make clean                      # Remove containers, volumes, and images
docker compose up --build -d    # Rebuild and verify services run correctly
```

**Before committing, always run:** `pnpm lint && pnpm typecheck && pnpm build`

## Architecture

This is a **pnpm + Turborepo monorepo** with three apps and shared packages. All packages use ES modules.

### Apps

- **`apps/web`** — Next.js 16 user-facing app (port 3000). Uses Supabase Auth (email/password + Google OAuth). Routes: `/login`, `/signup`, `/dashboard` (protected), `/auth/confirm` (OAuth + email OTP). Standalone output for Docker. React Compiler enabled.
- **`apps/admin`** — Next.js 16 admin dashboard (port 3001). Uses a **custom bcrypt + in-memory session system** (NOT Supabase Auth). Password-only login. The `verifySession()` guard is called per-page in Server Components (no middleware). Admin sessions have 24h TTL and are stored in a `Map` — server restart kills all sessions.
- **`apps/server`** — Express 4 API (port 4000). Middleware: helmet, cors, morgan, JSON parsing. Routes under `/api/`. Only `/api/health` exists currently. Dev uses `nodemon` + `tsx` (no compilation). Build compiles to `dist/` via `tsc`.

### Packages

- **`packages/ui`** — Shared shadcn/ui components (New York style, Tailwind v4, OKLCH colors). Import pattern: `import { Button } from "@workspace/ui/components/button"` (per-component exports, no barrel). Global CSS at `src/styles/globals.css` with `@source` directives that scan `apps/**/*.{ts,tsx}` for Tailwind JIT. Custom tokens: `--info`, `--success`, `--warning` + foregrounds. Button has `loading`/`loadingText` extended props.
- **`packages/database`** — Supabase TypeScript types. Single source of truth: `src/database.types.ts`. Import: `import type { Database, Tables, TablesInsert, TablesUpdate } from "@workspace/database/types"`. Never manually edit — always regenerate:
  ```bash
  npx supabase gen types typescript --project-id "your-project-id" --schema public > packages/database/src/database.types.ts
  ```
- **`packages/eslint-config`** / **`packages/typescript-config`** — Shared configs.

## Key Architectural Patterns

**Two distinct auth systems:**
- `apps/web` uses `@supabase/ssr` with cookie-based sessions. Supabase client helpers are in `utils/supabase/` (`client.ts` for browser, `server.ts` for server with `createClient()`, `createAdminClient()`, `requireAuth()`).
- `apps/admin` uses custom auth in `lib/dal.ts` (bcrypt password verify + UUID sessions in a `Map`). The Supabase client in admin (`lib/supabase.ts`) is service-role only, used for data operations.

**Docker env var handling:**
- `NEXT_PUBLIC_*` vars must be passed as build `ARG`s (baked into JS bundle) AND as runtime `environment:` (for SSR). Server-only secrets are runtime-only.
- `NEXT_PUBLIC_SITE_URL` is used for all auth redirects (never `request.nextUrl.origin`) to avoid Docker-internal hostnames in browser-facing URLs.
- Bcrypt hashes in `.env` must double-escape `$` as `$$` for docker-compose interpolation.

**Server env naming differs:** Server uses `SUPABASE_URL` (no `NEXT_PUBLIC_` prefix). Both point to the same instance.

**Docker networking:** All services share `app-network`. Internal: `API_URL=http://server:4000`. Browser-facing: `NEXT_PUBLIC_API_URL=http://localhost:4000`.

## UI & Styling Rules

- Always use shadcn/ui components from `@workspace/ui`. Add new ones: `cd packages/ui && npx shadcn@latest add [component-name]`
- Use global CSS variables/theme tokens — never hardcode Tailwind color values (`bg-blue-500`) or layout values (`w-[123px]`).
- Prefer workspace imports (`@workspace/ui`, `@workspace/database`) over relative cross-package paths.

## Environment Setup

Root `.env` is required for Docker. Local dev can use `apps/*/.env.local`. See `.env.example` for all variables. Admin password hash: `cd apps/admin && pnpm generate:password`.

## Commit Style

Short, descriptive first line (e.g., "Update README for env setup"). Ensure lint, typecheck, and build pass before committing.
