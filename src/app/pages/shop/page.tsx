import Image from "next/image";
import styles from "./page.module.css";

const products = [
  {
    name: "Snacks energéticos",
    description: "Aumenta la energía de tu gato y obtén +10 minutos de concentración.",
    price: 120,
  },
  {
    name: "Cama de nube",
    description: "Descansos más reparadores para ti y tu PomoCat.",
    price: 280,
  },
  {
    name: "Pack de sonidos zen",
    description: "Relaja tu ambiente con sonidos suaves y enfócate más rápido.",
    price: 90,
  },
  {
    name: "Collar de enfoque",
    description: "Reduce las distracciones y mejora la racha diaria.",
    price: 180,
  },
];

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Tienda de recompensas</h1>
          <p>Invierte tus tomates en mejoras para tu experiencia y la de tu gato.</p>
        </div>
        <div className={styles.balance}>
          <Image src="/Tomate_coin.png" width={40} height={40} alt="Moneda tomate" />
          <div>
            <strong>Saldo actual</strong>
            <p>640 tomates</p>
          </div>
        </div>
      </header>

      <section className={styles.products}>
        {products.map((product) => (
          <article key={product.name} className={styles.product}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles.price}>
              <span>{product.price} 🍅</span>
              <button type="button">Canjear</button>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.bundle}>
        <strong>Oferta destacada</strong>
        <p>
          Adquiere el paquete &quot;Rutina Matutina&quot; y recibe 3 artículos exclusivos para arrancar tus
          mañanas con energía.
        </p>
        <span>Disponible por 450 tomates.</span>
      </section>
    </div>
  );
}