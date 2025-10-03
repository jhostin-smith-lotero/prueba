"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./layout.module.css";

type NavLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

export function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const className = [styles.navLink, isActive ? styles.navLinkActive : ""].filter(Boolean).join(" ");

  return (
    <Link href={href} className={className}>
      <span className={styles.navIcon}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
