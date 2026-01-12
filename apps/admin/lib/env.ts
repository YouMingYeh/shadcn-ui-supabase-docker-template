// Environment variable validation
// Only validates at runtime, not during build

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_PASSWORD_HASH",
] as const;

// Skip validation during build
if (!isBuildTime) {
  const errors: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  if (errors.length > 0) {
    console.error("❌ Environment validation failed:");
    errors.forEach((err) => console.error(`  - ${err}`));
    console.error("\nCheck your .env.local file and see SETUP.md for help");

    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment configuration");
    }
  }
}

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
