"use client";
"use client";

import Image from "next/image";
import styles from "./CatWithPad.module.css";
import { CSSProperties } from "react";
import { useLanguage } from "@/context/languageContext";


type Props = { src: string; alt?: string; size?: number };

type Item = {
  _id: string;
  name: string;
  sprite_path: string;
  price: number;
  type: string;
  itemQuality: string;
  isValid: boolean;
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
};

const BASE = 360;

type PositionVars = CSSProperties & Record<"--x" | "--y", string>;
type SizeVars = CSSProperties & Record<"--size", string>;


export default function CatWithPadClient(
  { src, alt, size = 330, hat, accessory }: Props & { hat?: Item; accessory?: Item }
) {
  const { translations } = useLanguage();
  const shop = translations.shop;
  const resolvedAlt = alt ?? shop.catAlt;
  const names = shop.catalog.names;
  const localizeName = (value?: string) => {
    if (!value) return undefined;
    const key = value.toLowerCase();
    return names[key] ?? value;
  };
  const hatAlt = localizeName(hat?.name) ?? shop.hatFallback;
  const accessoryAlt = localizeName(accessory?.name) ?? shop.accessoryFallback;

  const scale = size / BASE;

  const hatStyle: PositionVars = {
    "--x": `${(hat?.posX ?? 0) * scale}px`,
    "--y": `${(hat?.posY ?? 0) * scale}px`,
  };

  const accStyle: PositionVars = {
    "--x": `${(accessory?.posX ?? 0) * scale}px`,
    "--y": `${(accessory?.posY ?? 0) * scale}px`,
  };

  const wrapStyle: SizeVars = { "--size": `${size}px` };

  return (
    <div className={styles.cat}>
      <div className={styles.catWrap} style={wrapStyle}>
        <div className={styles.catHat} style={hatStyle}>
          <Image
            src={hat?.sprite_path || "/items/empty.png"}
            alt={hatAlt}
            priority
            className={styles.itemImg}
            width={(hat?.width ?? 0) * scale}
            height={(hat?.height ?? 0) * scale}
            hidden={!(hat?.sprite_path)}
          />
        </div>

        <div className={styles.catAccessory} style={accStyle}>
          <Image
            src={accessory?.sprite_path || "/items/empty.png"}
            alt={accessoryAlt}
            priority
            className={styles.itemImg}
            width={(accessory?.width ?? 0) * scale}
            height={(accessory?.height ?? 0) * scale}
            hidden={!(accessory?.sprite_path)}
          />
        </div>

        <Image
          src={src}
          alt={resolvedAlt}
          fill
          priority
          className={styles.catImg}
          sizes="(max-width: 768px) 70vw, 360px"
        />
        <div className={styles.pad} aria-hidden />
      </div>
    </div>
  );
}
