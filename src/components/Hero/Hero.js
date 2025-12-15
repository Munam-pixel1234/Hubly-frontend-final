import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>

          {/* ⭐ Added Wrapper */}
          <div className={styles.textBox}>
            <h1 className={styles.title}>
              Grow Your Business Faster<br />with Hubly CRM
            </h1>
            <p className={styles.subtitle}>
              Manage leads, automate workflows, and close deals effortlessly—all in one powerful<br />platform.
            </p>
          </div>

          <div className={styles.ctaRow}>
            <button className={styles.primary}>Get started</button>
            <button className={styles.ghost}>
              <img src="/assets/images/L1.png" alt="L1 icon" className={styles.icon}/> 
              Watch Video
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageStack}>
            <img src="/assets/images/I2.png" alt="I2" />
            <img src="/assets/images/I3.png" alt="I3" />
            <img src="/assets/images/I4.png" alt="I4" />
            <img src="/assets/images/I5.png" alt="I5" />
          </div>
        </div>
      </div>

      {/* decorative 1440x144 strip */}
      <div className={styles.decorative}>
        <img src="/assets/images/I6.png" alt="decorative strip" />
      </div>
    </section>
  );
}
