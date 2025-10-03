import Image from "next/image";
import styles from "./page.module.css";

const products = [
  {
    name: "Sombrero vaquero",
    description: "Le da a tu gato un estilo rudo y aventurero del lejano oeste.",
    price: 120,
  },
  {
    name: "collar de oro",
    description: "Accesorio estético brillante que aporta un aire elegante y lujoso a tu gato.",
    price: 280,
  },
  {
    name: "Capa de superhéroe",
    description: "Accesorio llamativo que da un toque heroico y audaz a tu gato",
    price: 90,
  },
  {
    name: "Peluca de payaso",
    description: "Accesorio colorido y divertido que añade un aire cómico a tu gato.",
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
    </div>
  );
}