import Image from "next/image";
import styles from "./page.module.css";

const tasks = [
  { title: "Preparar informe semanal", tag: "Trabajo" },
  { title: "Revisar feedback del equipo", tag: "Equipo" },
  { title: "Practicar lección de japonés", tag: "Personal" },
];

const schedule = [
  { time: "09:00", focus: "Planificación diaria" },
  { time: "11:00", focus: "Sprint de desarrollo" },
  { time: "14:30", focus: "Descanso activo" },
  { time: "16:00", focus: "Sesión de lectura" },
];

const achievements = [
  "Racha de 7 días", "5 tareas completadas", "3 pomodoros extra"
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>¡Hola, Sofía!</h1>
          <p>Listo para mantener a tu gato lleno de energía hoy.</p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={`${styles.button} ${styles.buttonSecondary}`}>
            Ver historial
          </button>
          <button type="button" className={`${styles.button} ${styles.buttonPrimary}`}>
            Iniciar nuevo pomodoro
          </button>
        </div>
      </header>

      <section className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.catMood}>
            <Image src="/Tomate_coin.png" width={88} height={88} alt="Gato energético" />
            <div>
              <h2>Estado de PomoCat</h2>
              <p>Concentración al máximo, listo para ayudarte a cumplir tus metas.</p>
            </div>
          </div>
          <div>
            <p>Energía</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarFill} style={{ width: "82%" }} />
            </div>
          </div>
          <div>
            <p>Satisfacción</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarFill} style={{ width: "64%" }} />
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Tareas del día</h2>
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <div key={task.title} className={styles.taskItem}>
                <strong>{task.title}</strong>
                <span className={styles.taskBadge}>{task.tag}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.timer}>
            <h2>Pomodoro en curso</h2>
            <span>18:42</span>
            <div className={styles.timerControls}>
              <button type="button">Pausar</button>
              <button type="button">Finalizar</button>
            </div>
            <p>Tu próximo descanso llega en 11 minutos.</p>
          </div>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Plan del día</h2>
          <div className={styles.schedule}>
            {schedule.map((block) => (
              <div key={block.time} className={styles.scheduleRow}>
                <span>{block.time}</span>
                <span>{block.focus}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <h2>Logros recientes</h2>
          <div className={styles.badges}>
            {achievements.map((achievement) => (
              <span key={achievement} className={styles.badge}>
                {achievement}
              </span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}