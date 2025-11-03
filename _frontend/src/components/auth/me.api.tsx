"use server";

import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { UserDto } from "./auth.api";

type JwtPayload = { sub?: string; userId?: string; id?: string };

const USER_ENDPOINT = "http://localhost:4000/auth/users";

export default async function Me(): Promise<UserDto | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) {
      return null;
    }

    let userId: string | null = null;
    try {
      const payload = decodeJwt(token) as JwtPayload;
      userId = payload.userId ?? payload.id ?? payload.sub ?? null;
    } catch {
      return null;
    }

    if (!userId) {
      return null;
    }

    const response = await fetch(`${USER_ENDPOINT}/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const user: UserDto | null = Array.isArray(data) ? data[0] ?? null : data ?? null;
    return user;
  } catch {
    return null;
  }
}