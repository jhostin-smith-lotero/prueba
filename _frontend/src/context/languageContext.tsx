"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SUPPORTED_LANGUAGES, TRANSLATIONS, type Language } from "@/locales/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: (typeof TRANSLATIONS)[Language];
};

const STORAGE_KEY = "tomato-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage?: Language;
  userId?: string | null;
};

export function LanguageProvider({ children, initialLanguage = "en", userId = null }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const userIdRef = useRef<string | null>(userId);

  useEffect(() => {
    userIdRef.current = userId ?? null;
  }, [userId]);

  useEffect(() => {
    setLanguageState((prev) => {
      if (prev === initialLanguage) {
        return prev;
      }
      return initialLanguage;
    });
  }, [initialLanguage]);

  useEffect(() => {
    if (userIdRef.current) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        setLanguageState(stored);
      }
    } catch {}
  }, [userId]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const currentUserId = userIdRef.current;
    if (!currentUserId) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch(`http://localhost:4000/settings/user/${currentUserId}`, {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { language?: Language | null } | null;
        const nextLanguage = data?.language ?? null;

        if (!cancelled && nextLanguage && SUPPORTED_LANGUAGES.includes(nextLanguage)) {
          setLanguageState(nextLanguage);
        }
      } catch {}
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const persistLanguage = useCallback(async (value: Language) => {
    const currentUserId = userIdRef.current;
    if (!currentUserId) return;
    try {
      const response = await fetch(`http://localhost:4000/settings/user/${currentUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ language: value }),
      });

      if (response.ok) {
        return;
      }

      if (response.status === 404) {
        await fetch(`http://localhost:4000/settings/user/${currentUserId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ language: value }),
        });
      }
    } catch {}
  }, []);

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value);
    const currentUserId = userIdRef.current;
    if (currentUserId) {
      void persistLanguage(value);
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }, [persistLanguage]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    translations: TRANSLATIONS[language],
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageContext must be used within a LanguageProvider");
  return ctx;
}

export { SUPPORTED_LANGUAGES };
export type { Language };