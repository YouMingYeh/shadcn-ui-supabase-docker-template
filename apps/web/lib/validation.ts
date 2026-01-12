/**
 * Basic validation utilities for auth forms
 */

export function validateEmail(email: string | null | undefined): string {
  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }

  const trimmed = email.trim();
  if (trimmed.length === 0) {
    throw new Error("Email cannot be empty");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    throw new Error("Invalid email format");
  }

  return trimmed;
}

export function validatePassword(password: string | null | undefined): void {
  if (!password || typeof password !== "string") {
    throw new Error("Password is required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
}
