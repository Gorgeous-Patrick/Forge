import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SALT_ROUNDS = 10;
const SESSION_COOKIE_NAME = "session_user_email";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setAuthCookie(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const email = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!email) {
    return null;
  }

  // Verify user still exists
  const user = await prisma.user.findUnique({
    where: { id: email },
  });

  return user ? email : null;
}

export async function requireAuth(): Promise<string> {
  const email = await getCurrentUser();

  if (!email) {
    throw new Error("Unauthorized");
  }

  return email;
}
