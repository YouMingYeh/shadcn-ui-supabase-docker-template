# Server

Express.js server for LINE webhook handling with full type-safe Supabase integration.

## Getting Started

### Development

```bash
# From the root of the monorepo
pnpm dev

# Or run just the server
pnpm --filter server dev
```

### Build

```bash
# From the root of the monorepo
pnpm build

# Or build just the server
pnpm --filter server build
```

### Production

```bash
pnpm --filter server start
```

## ✨ Features

- ✅ **Type-Safe Database** - Full TypeScript types from Supabase schema via `@workspace/database`
- ✅ **Auto-complete** - Database queries with full IntelliSense
- ✅ **RLS Support** - Row Level Security policies on all tables
- ✅ **LINE Webhook** - Handle LINE messaging events (coming soon)

## Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

Required variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (bypasses RLS)
- `SUPABASE_ANON_KEY` - Anonymous key for client operations

## API Endpoints

### Health Check

```
GET /api/health
```

### LINE Webhook (Coming Soon)

```
POST /api/webhook/line    # Handle LINE events
```

## Project Structure

```
src/
├── index.ts              # Entry point
├── app.ts                # Express app configuration
├── lib/
│   └── supabase.ts       # Typed Supabase client
├── routes/
│   └── index.ts          # Main router
├── controllers/
│   └── health.controller.ts
├── middleware/
│   └── error.middleware.ts
└── utils/
```

## Type Safety Example

The server uses `@workspace/database` for full type safety with Supabase:

```typescript
import type { Database } from "@workspace/database/types";
import { supabase } from "../lib/supabase.js";

// Extract typed table definitions
type Team = Database["public"]["Tables"]["team"]["Row"];
type TeamInsert = Database["public"]["Tables"]["team"]["Insert"];

// Fully type-safe queries with autocomplete!
const { data, error } = await supabase
  .from("team")
  .select("*")
  .order("created_at", { ascending: false });

// data is Team[] with full IntelliSense
```

## 🗃️ Database Tables

All tables are fully typed via `@workspace/database`:

- `user` - User profiles
- `team` - Teams
- `team_member` - Team memberships
- `team_credential` - LINE API credentials
- `conversation` - LINE chat conversations
- `message` - Chat messages with threading
- `agent` - AI agents
- `agent_conversation` - Agent assignments
- `document` - Knowledge base documents
- `chunk` - Document chunks with vector embeddings

## 🔄 Updating Database Types

When schema changes, regenerate types:

```bash
npx supabase gen types typescript \
  --project-id "your-project-id" \
  --schema public > packages/database/src/database.types.ts
```
