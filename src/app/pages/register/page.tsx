"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError(null);
    // Aquí podrías llamar a tu API de registro
    alert(`¡Bienvenida, ${form.username}! Tu cuenta está lista.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>PomoCat</h1>
        <Image
          alt="Tomate"
          src="/Tomate_coin.png"
          width={200}
          height={200}
          className={styles.tomato}
          priority
        />
      </div>

      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username_rg"
            placeholder="Nombre de usuario"
            value={form.username}
            onInput={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            id="email_rg"
            placeholder="Correo electrónico"
            value={form.email}
            onInput={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password_rg"
            placeholder="Contraseña"
            value={form.password}
            onInput={handleChange}
            required
            minLength={6}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword_rg"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onInput={handleChange}
            required
            minLength={6}
          />
          <input type="submit" value="Crear cuenta" id="register" />
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.footer}>
          <p>¿Ya tienes cuenta?</p>
          <Link href="/" id="register_lg">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}