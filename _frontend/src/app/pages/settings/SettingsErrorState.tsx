"use client";

import { useLanguage } from "@/context/languageContext";

export default function SettingsErrorState() {
  const { translations } = useLanguage();
  return <div>{translations.settings.loadError}</div>;
}
