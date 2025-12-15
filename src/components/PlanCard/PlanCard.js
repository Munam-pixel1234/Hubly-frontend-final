import React from "react";
import styles from "./PlanCard.module.css";

export default function PlanCard({ title, price, features }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title.toUpperCase()}</h3>

      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        <span className={styles.per}>/monthly</span>
      </div>

      <p className={styles.includesTitle}>What's included</p>

      <ul className={styles.features}>
        {features.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <button className={styles.cta}>
        SIGN UP FOR STARTER
      </button>
    </div>
  );
}
