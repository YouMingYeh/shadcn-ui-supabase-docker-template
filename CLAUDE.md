# Repository Guidelines

## Project Structure & Module Organization
- `apps/web` and `apps/admin` are Next.js App Router frontends; route files live under `app/`, shared UI in `components/`, and static assets in `public/`.
- `apps/server` is the Express API; source lives in `src/`, compiled output in `dist/`.
- `packages/ui` contains shared shadcn/ui components; `packages/database` holds Supabase types.
- Shared configs live in `packages/eslint-config` and `packages/typescript-config`.
- Root orchestration is in `turbo.json`, with Docker definitions in `docker-compose.yml` and `docker-compose.dev.yml`.

## Database Types - Single Source of Truth
- **`packages/database/src/database.types.ts`** is the single source of truth for all database types.
- **MUST regenerate types** whenever you change the Supabase schema, tables, functions, or enums.
- Regenerate using: `npx supabase gen types typescript --project-id "your-project-id" --schema public > packages/database/src/database.types.ts`
- Never manually edit `database.types.ts` - always regenerate from the actual schema.
- Import types using: `import type { Database, Tables, TablesInsert, TablesUpdate } from "@workspace/database/types"`

## Build, Test, and Development Commands
- **ALWAYS run lint, typecheck, and build** before committing: `pnpm lint && pnpm typecheck && pnpm build`
- `pnpm dev` runs all apps in dev mode via Turborepo.
- `pnpm build` builds every app/package; `pnpm typecheck` and `pnpm lint` validate TS + lint rules.
- `pnpm format` runs Prettier across `*.ts`, `*.tsx`, and `*.md`.
- Scoped runs: `pnpm --filter web dev`, `pnpm --filter admin build`, `pnpm --filter server dev`.
- Docker: `make dev-docker` (dev stack), `make up`/`make down`, `make logs`, `make clean`.
- **ALWAYS run `docker compose up --build -d`** to ensure services actually run and are built correctly.

## Code Quality & Automation
- Use `.claude/agents` and `.claude/commands` for general tasks like code review, refactoring, debugging, and cleanup.
- **After developing a new feature**, run code review using `.claude/agents/senior-code-reviewer.md` or `.claude/commands/review.md`.
- **Setup MCP servers** using `.claude/commands/setup.md` to enable enhanced development capabilities (shadcn, context7, supabase, next-devtools, playwright, browser).
- Available agents: code-reviewer, code-refactor, code-simplifier, debug-detective, performance-hunter, tech-debt-mapper, etc.
- Available commands: setup, review, refactor, simplify, debug, perf, cleanup, debt, etc.

## Coding Principles
- **KISS** (Keep It Simple, Stupid) - Prefer simple, straightforward solutions over clever ones.
- **CLEAN Code** - Write readable, self-documenting code with clear intent.
- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **DRY** (Don't Repeat Yourself) - Extract common logic into reusable functions/components.
- **LESS IS MORE** - Avoid over-engineering; solve the actual problem, not hypothetical ones.
- **SIMPLICITY OVER COMPLEXITY** - Choose the simplest solution that works; complexity should be justified.

## UI Components & Styling
- **ALWAYS use shadcn/ui components** from `@workspace/ui` for UI elements.
- **ALWAYS use global CSS** for styling; avoid hardcoding Tailwind colors or layout classes.
- Never hardcode Tailwind color values (e.g., `bg-blue-500`, `text-red-600`) - use CSS variables or theme tokens.
- Never hardcode layout values (e.g., `w-[123px]`, `h-[456px]`) - use semantic classes or CSS variables.
- Prefer semantic component composition over utility-first styling when it improves maintainability.
- Add new shadcn/ui components via: `cd packages/ui && npx shadcn@latest add [component-name]`

## Coding Style & Naming Conventions
- Use TypeScript everywhere; keep code formatted by Prettier and aligned with ESLint configs in each app (`apps/*/eslint.config.js`).
- Follow existing file placement: Next.js routes in `apps/*/app`, shared UI in `packages/ui`, server modules in `apps/server/src`.
- Prefer workspace imports (`@workspace/ui`, `@workspace/database`) over relative cross-package paths.

## Testing Guidelines
- **ALWAYS run lint and typecheck** before committing: `pnpm lint && pnpm typecheck`
- **ALWAYS run build** to ensure everything compiles: `pnpm build`
- No dedicated test runner is configured yet; rely on `pnpm lint` and `pnpm typecheck` for CI-quality checks.
- If you add tests, follow a `*.test.ts(x)` or `*.spec.ts(x)` naming pattern and add scripts to the relevant `package.json`.

## Commit & Pull Request Guidelines
- Git history favors short, descriptive sentences (e.g., "Update README…"). Keep the first line concise and specific.
- PRs should include: a clear summary, linked issues (if any), and screenshots for UI changes.
- Call out env/config changes explicitly and avoid committing secrets.
- **Before submitting PRs**: Ensure lint, typecheck, and build all pass.

## Security & Configuration Tips
- Docker expects a root `.env`; local dev can use `apps/*/.env.local` as needed.
- Supabase keys are required for auth; never commit real credentials.
- Always verify Docker services are running correctly with `docker compose up --build -d` and check logs.
