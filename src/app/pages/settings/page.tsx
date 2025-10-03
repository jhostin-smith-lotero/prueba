import styles from "./page.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Configuración</h1>
        <p>Personaliza tu experiencia y ajusta cómo trabajas con PomoCat.</p>
      </header>

      <section className={styles.section}>
        <h2>Perfil</h2>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="name">Nombre completo</label>
            <input id="name" name="name" defaultValue="Sofía Ramírez" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" defaultValue="sofia@pomocat.com" />
          </div>
          <div className={styles.field}>
            <label htmlFor="timezone">Zona horaria</label>
            <select id="timezone" name="timezone" defaultValue="GMT-3">
              <option value="GMT-5">GMT-5 (CDMX)</option>
              <option value="GMT-4">GMT-4 (SCL)</option>
              <option value="GMT-3">GMT-3 (BUE)</option>
            </select>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Preferencias de enfoque</h2>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="length">Duración del pomodoro</label>
            <select id="length" name="length" defaultValue="25">
              <option value="20">20 minutos</option>
              <option value="25">25 minutos</option>
              <option value="45">45 minutos</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="break">Descanso corto</label>
            <select id="break" name="break" defaultValue="5">
              <option value="5">5 minutos</option>
              <option value="10">10 minutos</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="longBreak">Descanso largo</label>
            <select id="longBreak" name="longBreak" defaultValue="20">
              <option value="15">15 minutos</option>
              <option value="20">20 minutos</option>
              <option value="30">30 minutos</option>
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="focusNotes">Mensaje motivacional</label>
          <textarea
            id="focusNotes"
            name="focusNotes"
            placeholder="Escribe un mensaje que quieras ver al iniciar cada sesión"
            defaultValue="Respira, estira y recuerda alimentar a PomoCat con tu mejor enfoque."
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notificaciones</h2>
        <div className={styles.switchRow}>
          <span>Recordatorios de inicio de sesión</span>
          <input type="checkbox" defaultChecked aria-label="Recordatorios de inicio de sesión" />
        </div>
        <div className={styles.switchRow}>
          <span>Avisos de descanso</span>
          <input type="checkbox" defaultChecked aria-label="Avisos de descanso" />
        </div>
        <div className={styles.switchRow}>
          <span>Alertas de racha</span>
          <input type="checkbox" aria-label="Alertas de racha" />
        </div>
        <div className={styles.actions}>
          <button type="button">Restaurar valores</button>
          <button type="button">Guardar cambios</button>
        </div>
      </section>
    </div>
  );
}