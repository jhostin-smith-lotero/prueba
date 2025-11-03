"use client";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import styles from "./MinutesSlider.module.css";

type Props = {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  ariaLabel?: string;
};

export default function MinutesSlider({
  id,
  min = 0,
  max = 100,
  step = 5,
  value,
  onChange,
  label,
  ariaLabel,
}: Props) {
  const percent = useMemo(() => ((value - min) * 100) / (max - min), [value, min, max]);
  const safeId = id ?? `slider-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const styleVars = {
    "--value": `${percent}%`,
    "--track-active": "#34d399",
    "--track-rest": "#e2e8f0",
    "--thumb-color": "#94a3b8",
  } as CSSProperties;

  return (
    <div className={styles.sliderControl}>
      <label htmlFor={safeId} className={styles.label}>
        {label}: <output className={styles.value}>{value}</output>
      </label>

      <div className={styles.trackWrap}>
        <input
          id={safeId}
          type="range"
          aria-label={ariaLabel ?? label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={styleVars}
          className={styles.range}
        />
      </div>
    </div>
  );
}
