import "server-only";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { env } from "./env";

// In-memory session store (use Redis in production for multi-instance)
// Sessions expire after 24 hours
const sessions = new Map<string, { createdAt: number }>();
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function verifySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin-session")?.value;

  if (!sessionId) {
    return null;
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (Date.now() - session.createdAt > SESSION_DURATION) {
    sessions.delete(sessionId);
    return null;
  }

  return { isAuthenticated: true };
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, env.adminPasswordHash);
  } catch {
    return false;
  }
}

export function createSession(sessionId: string) {
  sessions.set(sessionId, { createdAt: Date.now() });

  // Cleanup expired sessions periodically
  cleanupExpiredSessions();
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}

// Cleanup expired sessions to prevent memory leaks
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_DURATION) {
      sessions.delete(sessionId);
    }
  }
}
