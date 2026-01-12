import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = "/dashboard";

  // Use NEXT_PUBLIC_SITE_URL to construct redirects to avoid Docker internal hostnames
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const redirectTo = new URL(next, siteUrl);

  try {
    const supabase = await createClient();

    // Handle OAuth callback (code exchange)
    if (code) {
      console.log("[Auth Confirm] Exchanging code for session...");
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("[Auth Confirm] Code exchange failed:", error.message);
        const errorUrl = new URL("/error", siteUrl);
        errorUrl.searchParams.set(
          "message",
          `Authentication failed: ${error.message}`,
        );
        return NextResponse.redirect(errorUrl);
      }

      console.log(
        "[Auth Confirm] Code exchange successful, redirecting to:",
        redirectTo.toString(),
      );
      return NextResponse.redirect(redirectTo);
    }

    // Handle email OTP verification
    if (token_hash && type) {
      console.log("[Auth Confirm] Verifying OTP...");
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        console.error("[Auth Confirm] OTP verification failed:", error.message);
        const errorUrl = new URL("/error", siteUrl);
        errorUrl.searchParams.set(
          "message",
          `Email verification failed: ${error.message}`,
        );
        return NextResponse.redirect(errorUrl);
      }

      console.log(
        "[Auth Confirm] OTP verification successful, redirecting to:",
        redirectTo.toString(),
      );
      return NextResponse.redirect(redirectTo);
    }

    // No valid parameters provided
    console.error("[Auth Confirm] No valid authentication parameters provided");
    const errorUrl = new URL("/error", siteUrl);
    errorUrl.searchParams.set(
      "message",
      "Invalid authentication request. Please try logging in again.",
    );
    return NextResponse.redirect(errorUrl);
  } catch (error) {
    console.error("[Auth Confirm] Unexpected error:", error);
    const errorUrl = new URL("/error", siteUrl);
    errorUrl.searchParams.set(
      "message",
      "An unexpected error occurred during authentication. Please try again.",
    );
    return NextResponse.redirect(errorUrl);
  }
}
