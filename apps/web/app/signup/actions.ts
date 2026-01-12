"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { validateEmail, validatePassword } from "@/lib/validation";

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = validateEmail(formData.get("email") as string);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    validatePassword(password);

    if (password !== confirmPassword) {
      throw new Error("密碼不符。請重試。");
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      // Handle specific error cases
      if (error.message.includes("already registered")) {
        throw new Error("此電子郵件已註冊。請改為登入。");
      }
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "帳戶建立成功！請檢查您的電子郵件以驗證您的帳戶。",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "建立帳戶失敗",
    };
  }
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
    console.error("Google OAuth sign-in failed:", error);
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}
