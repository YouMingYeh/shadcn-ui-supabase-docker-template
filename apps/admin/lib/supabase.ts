import { createClient } from "@supabase/supabase-js";
import type { Database } from "@workspace/database/types";
import { env } from "./env";

// Server-side client with service role key for admin operations
// Use placeholder values during build, actual values at runtime
export const supabaseAdmin = createClient<Database>(
  env.supabaseUrl || "https://placeholder.supabase.co",
  env.supabaseServiceKey || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
