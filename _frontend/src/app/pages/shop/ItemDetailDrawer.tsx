"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useLanguage } from "@/context/languageContext";

type Item = {
  _id: string;
  name: string;
  sprite_path: string;
  price: number;
  type: string;
  itemQuality?: string;
};


type Props = {
  itemId: string;
  onClose: () => void;
  userCoins: number;
  userId: string;
};

export default function ItemDetailDrawer({ itemId, onClose, userCoins, userId }: Props) {
  const [item, setItem] = useState<Item | null>(null);
  const [owned, setOwned] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const { translations } = useLanguage();
  const drawerTranslations = translations.shop.drawer;
  const catalog = translations.shop.catalog;
  type DrawerMessageKey = keyof typeof drawerTranslations.messages;
  const [messageKey, setMessageKey] = useState<DrawerMessageKey | null>(null);

  const localizeName = (value: string) => {
    const key = value.toLowerCase();
    return catalog.names[key] ?? value;
  };

  const localizeType = (value: string) => {
    const key = value.toLowerCase();
    return catalog.types[key] ?? value;
  };

  const localizeQuality = (value?: string) => {
    if (!value) return undefined;
    const key = value.toLowerCase();
    return catalog.qualities[key] ?? value;
  };

  const messageKeys = useMemo(() => {
    return new Set(Object.keys(drawerTranslations.messages) as DrawerMessageKey[]);
  }, [drawerTranslations.messages]);

  const messageText = useMemo(() => {
    return messageKey ? drawerTranslations.messages[messageKey] : null;
  }, [drawerTranslations.messages, messageKey]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const resItem = await fetch(`http://localhost:4000/items/${itemId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!resItem.ok) {
          if (alive) setMessageKey("loadError");
          return;
        }
        const it: Item = await resItem.json();

        const inventory = await fetch(`http://localhost:4000/inventory/user/${userId}/item/${it._id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!alive) return;
        if (!inventory.ok && inventory.status !== 404) {
          setItem(it);
          setOwned(false);
          setMessageKey("detailError");
          return;
        }

        setItem(it);
        setOwned(inventory.ok);
        setMessageKey(null);
      } catch {
        if (!alive) return;
        setMessageKey("loadError");
      }
    })();
    return () => { alive = false; };
  }, [itemId, userId]);


  const action = owned ? "equip" : "buy";
  const onAction = () => {
    setMessageKey(null);
    startTransition(async () => {
      try {
        if (!item) {
          setMessageKey("missingItem");
          return;
        }

        if (action === "buy") {
          const res = await fetch(`http://localhost:4000/shop/purchase/${item._id}/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (!res.ok) throw new Error("purchaseFailed");
          setOwned(true);
          setMessageKey("purchased");
          return;
        }

        type ItemType = "HAT" | "SHIRT" | "ACCESSORY" | "SKIN" | "BACKGROUND";
        const t = item.type as ItemType;

        const patch: Record<string, string> = {};
        switch (t) {
          case "HAT":        patch.hat = item._id; break;
          case "SHIRT":      patch.shirt = item._id; break;
          case "ACCESSORY":  patch.accessory = item._id; break;
          case "SKIN":       patch.skin = item.sprite_path; break;  
          case "BACKGROUND": patch.background = item.sprite_path; break;
          default: throw new Error(`Tipo de ítem no soportado: ${item.type}`);
        }

        const res = await fetch(`http://localhost:4000/pet/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(patch),
        });

        if (!res.ok) {
          throw new Error("equipFailed");
        }
        setMessageKey("equipped");
      } catch (error: unknown) {
        if (error instanceof Error && messageKeys.has(error.message as DrawerMessageKey)) {
          setMessageKey(error.message as DrawerMessageKey);
          return;
        }
        setMessageKey(action === "buy" ? "purchaseFailed" : "equipFailed");
      }
    });
  };

  const src = item?.sprite_path
    ? (item.sprite_path.startsWith("/") ? item.sprite_path : item.sprite_path.replace(/^(\.\.\/)+public/, ""))
    : "/sprites/placeholder.svg";

  const blocked = !owned && !!item && userCoins < item.price;
  const displayName = item ? localizeName(item.name) : null;
  const displayType = item ? localizeType(item.type) : null;
  const displayQuality = item?.itemQuality ? localizeQuality(item.itemQuality) : null;

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <div className={styles.drawerCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label={drawerTranslations.closeAria}>✕</button>

        {!item ? (
          <p>{drawerTranslations.loading}</p>
        ) : (
          <>
            <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
              <h2 style={{fontSize:"1.25rem", fontWeight:600}}>{displayName}</h2>
              <div style={{opacity:.8}}>{drawerTranslations.yourCoinsLabel}: {userCoins}</div>
            </header>

            <section style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
              <div className={styles.imgFrame}>
                <Image 
                src={src} 
                alt={displayName ?? item.name} 
                fill
                sizes="220px"
                className={styles.itemImg}
                priority={false}
                />
              </div>

              <div style={{display:"grid", gap:8}}>
                <p><strong>{drawerTranslations.typeLabel}:</strong> {displayType}</p>
                {displayQuality && (
                  <p><strong>{drawerTranslations.qualityLabel}:</strong> {displayQuality}</p>
                )}
                <p><strong>{drawerTranslations.priceLabel}:</strong> {item.price} 🍅</p>

                {blocked && <p style={{color:"#f55"}}>{drawerTranslations.insufficientCoins}</p>}

                <button
                  onClick={onAction}
                  disabled={pending || blocked}
                  style={{ border:0, borderRadius:10, padding:"10px 14px",
                    background: owned ? "#16a34a" : "#2563eb",
                    color:"#fff", cursor: pending ? "wait" : "pointer", opacity: pending ? .7 : 1 }}
                >
                  {pending
                    ? (owned ? drawerTranslations.equipBusyLabel : drawerTranslations.buyBusyLabel)
                    : (owned
                        ? drawerTranslations.equipLabel
                        : drawerTranslations.buyLabel.replace("{price}", item.price.toString()))}
                </button>

                {messageText && <p style={{marginTop:6}}>{messageText}</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}


