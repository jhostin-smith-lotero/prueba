"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./page.module.css";
import { useSound } from "@/context/soundContext";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/context/languageContext";

type VolumeKey = "music" | "sfx";

type Props = {
  userCoins: string;
  userId: string;
  propSetVolume?: number;
  propSetVfx?: number;
};

const VOLUME_KEYS: VolumeKey[] = ["music", "sfx"];

type SliderCSSVariables = CSSProperties &
  Record<"--value" | "--track-active" | "--track-rest" | "--thumb-color", string>;


export default function SettingsPage({ userCoins, propSetVolume, propSetVfx, userId }: Props) {
  const { setVolumePct: setVolume, setSfxVolumePct: setSfxVolume } = useSound();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations.settings;
  const navigation = translations.common.navigation;
  const router = useRouter();

  const [volumes, setVolumes] = useState<Record<VolumeKey, number>>({
    music: propSetVolume ?? 60,
    sfx: propSetVfx ?? 45,
  });

  const [volumeEnabled, setVolumeEnabled] = useState<Record<VolumeKey, boolean>>({
    music: true,
    sfx: true,
  });

  const [loggingOut, setLoggingOut] = useState(false);

  const applyVolumeChanges = useCallback((key: VolumeKey, value: number) => {
    if (key === "sfx") setSfxVolume(value);
    else setVolume(value);
  }, [setSfxVolume, setVolume]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRenderRef = useRef(true);

  const persist = useCallback(async (musicPct: number, sfxPct: number) => {
    try {
      await fetch(`http://localhost:4000/settings/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          musicVolume: musicPct,
          sfxVolume: sfxPct,
        }),
      });
    } catch {}
  }, [userId]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const musicOut = volumeEnabled.music ? volumes.music : 0;
    const sfxOut = volumeEnabled.sfx ? volumes.sfx : 0;
    debounceRef.current = setTimeout(() => {
      persist(musicOut, sfxOut);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [volumes, volumeEnabled, persist]);

  const languageOptions = useMemo(() => {
    return SUPPORTED_LANGUAGES.map((id) => ({ id, label: t.language.options[id] }));
  }, [t.language.options]);

  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    try {
      try {
        await fetch("http://localhost:4000/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch {}

      try {
        const expiry = new Date(0).toUTCString();
        document.cookie = `access_token=; expires=${expiry}; path=/; SameSite=Lax`;
      } catch {}

      try {
        window.localStorage.removeItem("tomato-language");
      } catch {}
    } finally {
      router.replace("/");
      router.refresh();
    }
  }, [router]);

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.coins}>
          <Image src="/coin.png" alt={t.navigation.coinAlt} className={styles.pomos} width={20} height={20} />
          <p>{userCoins}</p>
        </div>

        <nav className={styles.navigator}>
          <Link href="/pages/home">
            <Image src="/icons/home.svg" alt="home" width={5} height={5} className={styles.icon} />
          </Link>
          <Link href="/pages/calendar">
            <Image
              src="/icons/calendar-regular-full.svg"
              alt={navigation.calendar}
              width={5}
              height={5}
              className={styles.icon}
            />
          </Link>
          <Link href="/pages/shop">
            <Image src="/icons/shopping-cart.svg" alt={navigation.shop} width={5} height={5} className={styles.icon} />
          </Link>
          <Link href="/pages/settings">
            <Image src="/icons/settings.svg" alt={navigation.settings} width={5} height={5} className={styles.icon} />
          </Link>
        </nav>
      </header>

      <div className={styles.panel}>
        <header className={styles.header}>
          <h1>{t.header.title}</h1>
          <p>{t.header.subtitle}</p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>{t.audio.title}</h2>
            <span className={styles.sectionCaption}>{t.audio.caption}</span>
          </div>

          <div className={styles.sliderList}>
            {VOLUME_KEYS.map((key) => {
              const { label, hint } = t.audio.controls[key];
              const enabled = volumeEnabled[key];
              const value = volumes[key];

              const sliderStyle: SliderCSSVariables = {
                "--value": `${value}%`,
                "--track-active": enabled ? "#34d399" : "#cbd5f5",
                "--track-rest": enabled ? "#d1fae5" : "#e2e8f0",
                "--thumb-color": enabled ? "#047857" : "#94a3b8",
              };

              return (
                <div key={key} className={styles.sliderItem} data-enabled={enabled}>
                  <div className={styles.sliderLabel}>
                    <strong>{label}</strong>
                    <span>{hint}</span>
                  </div>

                  <div className={styles.sliderControl}>
                    <input
                      aria-label={label}
                      disabled={!enabled}
                      max={100}
                      min={0}
                      value={value}
                      type="range"
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setVolumes((prev) => ({ ...prev, [key]: next }));
                        applyVolumeChanges(key, enabled ? next : 0);
                      }}
                      style={sliderStyle}
                    />
                  </div>

                  <div className={styles.sliderMeta}>
                    <span className={styles.sliderValue}>{value}%</span>
                    <button
                      type="button"
                      aria-pressed={enabled}
                      className={styles.sliderToggle}
                      data-active={enabled}
                      onClick={() => {
                        setVolumeEnabled((prev) => {
                          const nextEnabled = !prev[key];
                          const nextState = { ...prev, [key]: nextEnabled };
                          const out = nextEnabled ? volumes[key] : 0;
                          applyVolumeChanges(key, out);
                          return nextState;
                        });
                      }}
                    >
                      <span className={styles.srOnly}>
                        {enabled ? t.audio.toggleDisable : t.audio.toggleEnable} {label}
                      </span>
                      <span aria-hidden className={styles.sliderToggleTrack}>
                        <span className={styles.sliderToggleThumb} />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>{t.language.title}</h2>
            <span className={styles.sectionCaption}>{t.language.caption}</span>
          </div>
          <div className={styles.languageList}>
            {languageOptions.map((option) => (
              <button
                key={option.id}
                className={styles.languageButton}
                data-active={language === option.id}
                onClick={() => setLanguage(option.id)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>{t.session.title}</h2>
            <span className={styles.sectionCaption}>{t.session.caption}</span>
          </div>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? t.session.loggingOut : t.session.logout}
          </button>
        </section>
      </div>
    </main>
  );
}
