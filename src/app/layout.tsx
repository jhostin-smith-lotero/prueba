import Image from "next/image";
import { ReactNode } from "react";
import styles from "./layout.module.css";
import { NavLink } from "./nav-link";

const navItems = [
  { href: "/pages/home", label: "Inicio", icon: "🏡" },
  { href: "/pages/calendar", label: "Calendario", icon: "🗓️" },
  { href: "/pages/shop", label: "Tienda", icon: "🛍️" },
  { href: "/pages/pet_edit", label: "Tu gato", icon: "🐾" },
  { href: "/pages/settings", label: "Configuración", icon: "⚙️" },
];

type LayoutProps = {
  children: ReactNode;
};

export default function PagesLayout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Image src="/Tomate_coin.png" alt="PomoCat" width={72} height={72} priority />
          <div>
            <strong>PomoCat</strong>
            <p>Tu compañero de enfoque felino</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className={styles.focusTip}>
          <h3>Consejo del día</h3>
          <p>
            Divide tu trabajo en pomodoros cortos y recompensa a tu gato virtual con cada descanso.
          </p>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}