import Image from "next/image";
import styles from "./page.module.css";

const palettes = [
  { id: "sunset", colors: ["#f6a86c", "#f8d4a8"] },
  { id: "forest", colors: ["#6abf81", "#bfd9a0"] },
  { id: "ocean", colors: ["#6bbbc2", "#c1f0ff"] },
  { id: "lavender", colors: ["#c591f8", "#efd4ff"] },
];

export default function PetEditPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Personaliza a tu PomoCat</h1>
        <p>Dale un estilo único a tu compañero felino y mejora su ambiente de enfoque.</p>
      </header>

      <section className={styles.previewCard}>
        <h2>Vista previa</h2>
        <div className={styles.previewArea}>
          <div className={styles.avatar}>
            <Image src="/Tomate_coin.png" alt="Avatar del gato" width={120} height={120} />
            <span>PomoCat estándar</span>
            <small>Lista para recibir nuevas mejoras</small>
          </div>
          <ul className={styles.traits}>
            <li>Personalidad: Alegre</li>
            <li>Racha actual: 7 días</li>
            <li>Favorito: Breaks con té verde</li>
          </ul>
        </div>
      </section>

      <section className={styles.formCard}>
        <h2>Editor de estilo</h2>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="name">Nombre del gato</label>
            <input id="name" name="name" placeholder="Ingresa un nombre" defaultValue="Pomo" />
          </div>
          <div className={styles.field}>
            <label htmlFor="personality">Personalidad</label>
            <select id="personality" name="personality" defaultValue="alegre">
              <option value="alegre">Alegre</option>
              <option value="curiosa">Curiosa</option>
              <option value="serena">Serena</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="goal">Objetivo compartido</label>
            <input id="goal" name="goal" placeholder="Preparar proyecto final" />
          </div>
        </div>

        <div className={styles.field}>
          <label>Paleta de colores</label>
          <div className={styles.palettes}>
            {palettes.map((palette, index) => (
              <button
                key={palette.id}
                type="button"
                className={styles.palette}
                style={{
                  background: `linear-gradient(135deg, ${palette.colors[0]}, ${palette.colors[1]})`,
                }}
                data-selected={index === 1}
                aria-label={`Seleccionar paleta ${palette.id}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button">Restablecer</button>
          <button type="button">Guardar apariencia</button>
        </div>
      </section>
    </div>
  );
}