"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SUPPORTED_LANGUAGES, TRANSLATIONS, type Language } from "@/locales/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: (typeof TRANSLATIONS)[Language];
};

const STORAGE_KEY = "tomato-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        setLanguageState(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }, []);

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
