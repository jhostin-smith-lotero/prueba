"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ItemShop.module.css";
import { getItems, type Item } from "./itemsShop.api";
import { useLanguage } from "@/context/languageContext";

export default function ItemShop() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const { translations } = useLanguage();
  const listTranslations = translations.shop.itemList;
  const catalog = translations.shop.catalog;

  const localizeName = (value: string) => {
    const key = value.toLowerCase();
    return catalog.names[key] ?? value;
  };

  const localizeType = (value: string) => {
    const key = value.toLowerCase();
    return catalog.types[key] ?? value;
  };

  useEffect(() => {
    let alive = true;
    getItems()
      .then((data) => {
        if (!alive) return;
        setItems(data);
        setHasError(false);
      })
      .catch(() => {
        if (!alive) return;
        setHasError(true);
      });
    return () => { alive = false; };
  }, []);

  if (hasError) return <div className={styles.itemList}>{listTranslations.loadError}</div>;
  if (!items) return (
    <div className={styles.itemList}>{Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className={styles.card} aria-busy="true">
        <div className={styles.label}><h3>&nbsp;</h3></div>
        <div className={styles.image}><div className={styles.skeletonBox} /></div>
        <div className={styles.price}><h4>&nbsp;</h4><p>&nbsp;</p></div>
      </div>
    ))}</div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.itemList}>
        {items.map((item) => {
          const src = item.sprite_path.startsWith("/")
            ? item.sprite_path
            : item.sprite_path.replace(/^(\.\.\/)+public/, "");
          const displayName = localizeName(item.name);
          const displayType = localizeType(item.type);
          return (
            <Link
              key={item._id}
              href={`/pages/shop?item=${item._id}`}
              className={styles.cardLink}
              aria-label={listTranslations.viewItem.replace("{name}", displayName)}
            >
              <article className={styles.card} tabIndex={0}>
                <div className={styles.label}><h3>{displayName}</h3></div>
                <div className={styles.image}>
                  <Image src={src} alt={displayName} width={128} height={128} className={styles.img}/>
                </div>
                <div className={styles.price}>
                  <h4>{displayType}</h4>
                  <p>{item.price}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
