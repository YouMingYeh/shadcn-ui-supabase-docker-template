# Web App

Next.js frontend for Mars LINE messaging platform with Supabase authentication.

## Features

- ✅ **Next.js 16 App Router** - Modern React Server Components
- ✅ **Supabase Auth (SSR)** - 2025 best practices with `@supabase/ssr`
- ✅ **Type-Safe Database** - Full TypeScript types via `@workspace/database`
- ✅ **Server Actions** - Modern form handling without API routes
- ✅ **Middleware Auth** - Automatic token refresh on every request
- ✅ **Theme Toggle** - Light/Dark mode support

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Supabase project (see database setup)

### Environment Setup

1. **Copy environment variables:**

   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your Supabase credentials:**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Get these from: [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

### Development

```bash
# From the root of the monorepo
pnpm dev

# Or run just the web app
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
# From the root of the monorepo
pnpm build

# Or build just the web app
pnpm --filter web build
```

## Authentication Flow

### 2025 Best Practices

This app follows Supabase's official Next.js SSR authentication best practices:

1. **Two Client Types:**
   - `createBrowserClient()` - Client Components (browser)
   - `createServerClient()` - Server Components, Server Actions, Route Handlers

2. **Middleware Token Refresh:**
   - Automatically refreshes expired auth tokens before page loads
   - Uses `supabase.auth.getUser()` (NOT `getSession()`) for security

3. **Server Actions:**
   - Login/Signup handled via Server Actions (no API routes)
   - Form submission with progressive enhancement

### Auth Files Structure

```
app/
├── login/
│   ├── page.tsx          # Login/Signup form
│   └── actions.ts        # Server Actions (login, signup)
├── auth/
│   ├── confirm/
│   │   └── route.ts      # Email confirmation endpoint
│   └── signout/
│       └── route.ts      # Signout handler
└── error/
    └── page.tsx          # Auth error page

utils/supabase/
├── client.ts             # Browser client (Client Components)
├── server.ts             # Server client (Server Components/Actions)
└── middleware.ts         # Session refresh logic

middleware.ts             # Next.js middleware entry point
```

### Usage Examples

**Server Component (Recommended):**

```typescript
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch data with full type safety
  const { data: teams } = await supabase
    .from('team')
    .select('*');

  return <div>Welcome {user.email}</div>;
}
```

**Client Component:**

```typescript
'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return <div>{user?.email}</div>;
}
```

**Server Action:**

```typescript
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("user")
    .update({ full_name: formData.get("name") })
    .eq("id", user.id);

  revalidatePath("/profile");
}
```

## Type Safety

The app uses `@workspace/database` for full type safety with Supabase:

```typescript
import type { Database } from "@workspace/database/types";

// Extract typed table definitions
type Team = Database["public"]["Tables"]["team"]["Row"];
type TeamInsert = Database["public"]["Tables"]["team"]["Insert"];

// All queries have full IntelliSense and type checking
const { data } = await supabase.from("team").select("*");
// data is Team[] with full autocomplete
```

## Database Tables

All tables are fully typed via `@workspace/database`:

- `user` - User profiles (extends auth.users)
- `team` - Teams
- `team_member` - Team memberships with roles (owner/admin/member)
- `team_credential` - LINE API credentials
- `conversation` - LINE chat conversations (user/group/room)
- `message` - Chat messages with reply threading
- `agent` - AI agents with prompts and settings
- `agent_conversation` - Agent assignments to conversations
- `document` - Knowledge base documents
- `chunk` - Document chunks with vector embeddings (1536 dimensions)

## Security

**IMPORTANT:** Always use `supabase.auth.getUser()` in server code (middleware, Server Components, Server Actions, Route Handlers).

❌ **NEVER** trust `supabase.auth.getSession()` in server code - it can be spoofed via cookies!

✅ **USE** `supabase.auth.getUser()` - validates the token with Supabase Auth server every time

## Email Confirmation Setup

To support email confirmation, update the Supabase email template:

1. Go to [Auth templates](https://supabase.com/dashboard/project/_/auth/templates) in your Supabase dashboard
2. Select **Confirm signup** template
3. Change `{{ .ConfirmationURL }}` to:
   ```
   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
   ```

## Routes

- `/` - Home page (shows auth status)
- `/login` - Login/Signup page
- `/auth/confirm` - Email confirmation endpoint
- `/auth/signout` - Sign out (POST only)
- `/error` - Auth error page

## Learn More

- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js 16 Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure `.env.local` file exists
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart the dev server after updating `.env.local`

### Type errors with database

- Regenerate types: `npx supabase gen types typescript --project-id "your-project-id" --schema public > packages/database/src/database.types.ts`
- Restart TypeScript server in your IDE
- Run `pnpm typecheck` to verify

### User logged out unexpectedly

- Make sure middleware is properly configured
- Check that `middleware.ts` is at the project root
- Verify `utils/supabase/middleware.ts` returns `supabaseResponse` unchanged

### Email confirmation not working

- Update email template in Supabase dashboard (see "Email Confirmation Setup" above)
- Check `/auth/confirm` route is accessible
