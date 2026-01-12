"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { validateEmail } from "@/lib/validation";

export async function login(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = validateEmail(formData.get("email") as string);
    const password = formData.get("password") as string;

    if (!password) throw new Error("密碼為必填");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
  } catch (error) {
    const message = error instanceof Error ? error.message : "登入失敗";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  // Call redirect outside try-catch to avoid it being caught
  redirect("/dashboard");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  // Use NEXT_PUBLIC_SITE_URL to ensure OAuth redirects to the correct public-facing URL
  // This prevents issues when running in Docker where internal network addresses differ
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/confirm`,
    },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}
