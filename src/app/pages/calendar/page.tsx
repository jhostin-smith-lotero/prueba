import styles from "./page.module.css";

const days = ["L", "M", "X", "J", "V", "S", "D"];
const dates = Array.from({ length: 30 }, (_, index) => index + 1);

const timeline = [
  {
    title: "Sprint de diseño",
    description: "3 pomodoros completados con enfoque profundo.",
  },
  {
    title: "Revisión de tareas",
    description: "Analizaste tus pendientes y ajustaste prioridades.",
  },
  {
    title: "Descanso activo",
    description: "Saliste a caminar 15 minutos para recargar energía.",
  },
];

const summary = [
  { label: "Pomodoros totales", value: "28" },
  { label: "Horas enfocadas", value: "14h 20m" },
  { label: "Racha semanal", value: "5 días" },
  { label: "Mejor día", value: "Miércoles" },
];

export default function CalendarPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Calendario de progreso</h1>
          <p>Visualiza tu mes y planea tus pomodoros estratégicamente.</p>
        </div>
        <div className={styles.headerControls}>
          <button type="button">Mes anterior</button>
          <button type="button">Siguiente mes</button>
        </div>
      </header>

      <div className={styles.grid}>
        <section className={styles.calendarCard}>
          <h2>Febrero 2024</h2>
          <div className={styles.calendar}>
            {days.map((day) => (
              <span key={day}>{day}</span>
            ))}
            {dates.map((date) => (
              <span key={date} data-highlight={date === 12 || date === 18}>
                {date}
              </span>
            ))}
          </div>
        </section>

        <aside className={styles.sideCard}>
          <h2>Resumen semanal</h2>
          <ul className={styles.summaryList}>
            {summary.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className={styles.sideCard}>
        <h2>Eventos destacados</h2>
        <div className={styles.timeline}>
          {timeline.map((item) => (
            <article key={item.title} className={styles.timelineItem}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}