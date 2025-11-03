"use client";

import styles from "./calendar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/languageContext";


export default function CalendarPage() {
  const { translations } = useLanguage();
  const nav = translations.common.navigation;
  const calendar = translations.calendar;
  const days = calendar.days;
  const hours = calendar.hours;
  const schedule = calendar.schedule;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.coins}>
          <Image
          src="/Tomate_coin.png"
          alt={translations.common.coinAlt}
          className={styles.pomos}
          width={20}
          height={20}
          />

          <p>120</p>
        </div>

        <nav className={styles.navigator}>

          <Link href="/pages/home">
            <Image
            src="/icons/home.svg"
            alt={nav.home}
            width={5}
            height={5}
            className={styles.icon}
          />
          </Link>

          <Link href="/pages/calendar">
            <Image
            src="/icons/calendar-regular-full.svg"
            alt={nav.calendar}
            width={5}
            height={5}
            className={styles.icon}
          />
          </Link>

          <Link href="/pages/shop">
            <Image
            src="/icons/shopping-cart.svg"
            alt={nav.shop}
            width={5}
            height={5}
            className={styles.icon}
          />
          </Link>

          <Link href="/pages/settings">
            <Image
            src="/icons/settings.svg"
            alt={nav.settings}
            width={5}
            height={5}
            className={styles.icon}
          />
          </Link>

        </nav>
      </header>

      <h2 className={styles.title}>{calendar.title}</h2>

      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <div className={styles.headerRow}>
            <div className={styles.hourCell}></div>
            {days.map((day) => (
              <div key={day} className={styles.dayHeader}>{day}</div>
            ))}
          </div>

          {hours.map((hour) => (
            <div key={hour} className={styles.row}>
              <div className={styles.hourCell}>{hour}</div>
              {days.map((day) => (
                <div key={day + hour} className={styles.cell}>
                  {schedule[day]?.[hour]?.map((task, i) => (
                    <div key={i} className={styles.task}>{task}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}
