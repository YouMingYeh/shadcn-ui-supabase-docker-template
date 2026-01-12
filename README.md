# shadcn-ui + Supabase + Docker Template

A production-ready monorepo template featuring **shadcn/ui**, **Supabase authentication**, and **Docker** setup. Perfect for quickly starting new projects with modern tooling and best practices.

## ✨ Features

- 🎨 **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- 🔐 **Supabase Auth** - Complete authentication setup with email/password and OAuth
- 🐳 **Docker** - Full Docker support for development and production
- 📦 **Monorepo** - Turborepo-powered monorepo with shared packages
- ⚡ **Next.js 16** - Latest Next.js with App Router and React Server Components
- 🎯 **TypeScript** - Full type safety across the entire codebase
- 🔥 **Turbopack** - Lightning-fast development builds
- 🎭 **Dark Mode** - Built-in theme switching
- 📱 **Responsive** - Mobile-first responsive design
- 🛡️ **Type-Safe Database** - Generated TypeScript types from Supabase schema

## 🏗️ Project Structure

```
├── apps/
│   ├── web/              # Main Next.js web application
│   ├── admin/            # Admin dashboard (Next.js)
│   └── server/           # Express.js API server
├── packages/
│   ├── ui/               # shadcn/ui components (shared)
│   ├── database/         # Supabase database types
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
├── docker-compose.yml    # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── turbo.json            # Turborepo configuration
```

## 📋 Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10.4.1 (or install via `corepack enable`)
- **Docker** & **Docker Compose** (optional, for containerized development)
- **Supabase Account** (for authentication)

## 🚀 Quick Start

> **⚠️ Important**: Before building or running Docker, you must create a `.env` file with your Supabase credentials. See step 2 below.

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd shadcn-ui-supabase-docker-template
pnpm install
```

### 2. Set Up Environment Variables

**⚠️ IMPORTANT: You must set up environment variables before building or running Docker.**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials (see step 3).

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from **Project Settings → API**
3. Update the `.env` file with your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Configure App-Specific Environment Variables (Optional)

For local development without Docker, you can also create `.env.local` files in each app directory:

**`apps/web/.env.local`** (optional for local dev)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**`apps/admin/.env.local`** (optional for local dev)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
```

**`apps/server/.env`** (optional for local dev)
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

### 5. Generate Admin Password Hash

For the admin dashboard, generate a password hash:

```bash
cd apps/admin
pnpm generate:password
# Enter your password when prompted
# Copy the generated hash to ADMIN_PASSWORD_HASH in .env.local
```

### 6. Run Development Servers

**Option A: Local Development**
```bash
pnpm dev
```

This starts all apps in development mode:
- Web app: http://localhost:3000
- Admin dashboard: http://localhost:3001
- API server: http://localhost:4000

**Option B: Docker Development**
```bash
make dev-docker
# or
docker-compose -f docker-compose.dev.yml up
```

## 🐳 Docker Setup

### Development

```bash
make dev-docker
```

This starts all services with hot-reload enabled. Source code is mounted as volumes for instant updates.

### Production

```bash
# Build and start all services
make up

# Stop services
make down

# View logs
make logs
make logs-web      # Web app logs
make logs-admin    # Admin logs
make logs-server   # API server logs

# Clean up everything
make clean
```

### Environment Variables for Docker

**The `.env` file in the root directory is required for Docker builds.**

If you haven't created it yet, copy from the example:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual Supabase credentials:

```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key

# Public URLs
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash

# Server
CORS_ORIGIN=http://localhost:3000
```

## 📝 Available Scripts

### Root Level

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps for production
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages
pnpm format       # Format code with Prettier
```

### Individual Apps

```bash
# Web app
pnpm --filter web dev
pnpm --filter web build

# Admin app
pnpm --filter admin dev
pnpm --filter admin build

# Server
pnpm --filter server dev
pnpm --filter server build
```

## 🎨 Adding shadcn/ui Components

Components are managed in the `packages/ui` package. To add new components:

```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

Components will be automatically available to all apps via `@workspace/ui`.

## 🗄️ Database Types

This template includes type-safe database access. When you create tables in Supabase, regenerate types:

```bash
npx supabase gen types typescript \
  --project-id "your-project-id" \
  --schema public > packages/database/src/database.types.ts
```

Then use them in your code:

```typescript
import type { Database } from "@workspace/database/types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

// Full type safety and autocomplete!
const { data } = await supabase.from("your_table").select("*");
```

## 🔐 Authentication

### Web App (User Authentication)

The web app uses Supabase Auth with:
- Email/password authentication
- Google OAuth (configured)
- Protected routes via middleware
- Server-side session management

**Login**: `/login`  
**Signup**: `/signup`  
**Dashboard**: `/dashboard` (protected)

### Admin Dashboard

The admin dashboard uses password-based authentication:
- Simple password login
- Session management via cookies
- Protected routes

**Login**: `/login` (admin)

## 🏗️ Building for Production

### Local Build

```bash
pnpm build
```

### Docker Build

```bash
docker-compose build
docker-compose up -d
```

All services will be available:
- Web: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **API**: Express.js
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose
- **Code Quality**: ESLint, Prettier

## 🛠️ Customization

### Adding New Pages

1. Create a new route in `apps/web/app/`
2. Use components from `@workspace/ui`
3. Add navigation items in `apps/web/components/layout/app-sidebar.tsx`

### Adding API Routes

1. Create controllers in `apps/server/src/controllers/`
2. Add routes in `apps/server/src/routes/index.ts`
3. Use typed Supabase client from `apps/server/src/lib/supabase.ts`

### Theming

The template includes dark mode support via `next-themes`. Customize colors in:
- `packages/ui/src/styles/globals.css` (Tailwind theme)
- Individual component files for component-specific styling

## 🔧 Troubleshooting

### Docker Build Fails with "Missing environment variables"

**Error**: `Error: Missing environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Solution**: Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials. Docker Compose reads environment variables from the root `.env` file.

### Build Succeeds but App Doesn't Work

Make sure you've:
1. Created a Supabase project
2. Added your credentials to `.env` (for Docker) or app-specific `.env.local` files (for local dev)
3. Generated an admin password hash if using the admin dashboard

### Port Already in Use

If ports 3000, 3001, or 4000 are already in use:

- **Local development**: Stop other services using those ports, or modify the ports in `package.json` scripts
- **Docker**: Modify port mappings in `docker-compose.yml` or `docker-compose.dev.yml`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

This is a template repository. Feel free to fork and customize for your needs!

## 📄 License

MIT

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Supabase](https://supabase.com) for the backend infrastructure
- [Vercel](https://vercel.com) for Next.js and Turborepo

---

**Happy coding! 🚀**
