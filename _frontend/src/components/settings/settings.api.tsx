import Me from "../auth/me.api";

import type { Language } from "@/context/languageContext";

type Settings = {
  _id: string;
  userId: string;
  musicVolume: number;
  sfxVolume: number;
  language: Language;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default async function getSettings(userId?: string | null): Promise<Settings | null> {
  const existingUserId = userId ?? (await Me())?._id ?? null;
  if (!existingUserId) {
    return null;
  }

  const res = await fetch(`http://localhost:4000/settings/user/${existingUserId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return (data ?? null) as Settings | null;
}
