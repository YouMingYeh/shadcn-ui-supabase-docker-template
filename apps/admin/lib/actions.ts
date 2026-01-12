"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteSession } from "./dal";
import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin-session")?.value;

  if (sessionId) {
    deleteSession(sessionId);
    cookieStore.delete("admin-session");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function login(
  prevState: { error: string } | undefined,
  formData: FormData,
): Promise<{ error: string } | undefined> {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required" };
  }

  // Admin uses password-based auth (not Supabase auth)
  // This is handled by dal.ts verifyPassword
  const { verifyPassword, createSession } = await import("./dal");
  const isValid = await verifyPassword(password);

  if (!isValid) {
    return { error: "Invalid password" };
  }

  // Create session
  const sessionId = crypto.randomUUID();
  createSession(sessionId);

  // Set session cookie
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set("admin-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  revalidatePath("/", "layout");
  redirect("/");
}
