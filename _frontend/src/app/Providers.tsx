"use client";

import { LanguageProvider, type Language } from "@/context/languageContext";

type ProvidersProps = {
  children: React.ReactNode;
  initialLanguage?: Language;
  userId?: string | null;
};

export default function Providers({
  children,
  initialLanguage,
  userId,
}: ProvidersProps) {
  return (
    <LanguageProvider initialLanguage={initialLanguage} userId={userId}>
      {children}
    </LanguageProvider>
  );
}
