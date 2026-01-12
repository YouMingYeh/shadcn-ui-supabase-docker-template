# @workspace/database

Shared database types generated from Supabase schema.

## Usage

Import the database types in your apps:

```typescript
import type { Database } from "@workspace/database/types";

// Use with Supabase client
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

// Now you get full type safety
// Example: const { data, error } = await supabase.from("your_table").select("*");
```

## Updating Types

When you make changes to your Supabase database schema, regenerate types:

```bash
npx supabase gen types typescript --project-id "your-project-id" --schema public > packages/database/src/database.types.ts
```

## Template Status

This is a template repository. The database types are currently empty (no tables defined). 

When you set up your Supabase project and create tables, regenerate the types using the command above to get full type safety across your applications.
