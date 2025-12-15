import styles from "./Footer.module.css";

const Footer = () => {
  return (
     <footer className={styles.footer}>
          <div className={styles.container}>
    
            {/* LEFT LOGO */}
            <div className={styles.left}>
              <img src="/assets/images/I1.png" alt="Hubly Logo" className={styles.logo}/>
            </div>
    
            {/* TWO LEVEL GRID */}
            <div className={styles.center}>
    
              {/* TOP ROW — 3 COLUMNS */}
              <div className={styles.topRow}>
                <div className={styles.col}>
                  <h4>Product</h4>
                  <p>Universal checkout</p>
                  <p>Payment workflows</p>
                  <p>Observability</p>
                  <p>UpliftAI</p>
                  <p>Apps & integrations</p>
                </div>
    
                <div className={styles.col}>
                  <h4>Why Primer</h4>
                  <p>Expand to new markets</p>
                  <p>Boost payment success</p>
                  <p>Improve conversion rates</p>
                  <p>Reduce payments fraud</p>
                  <p>Recover revenue</p>
                </div>
    
                <div className={styles.col}>
                  <h4>Developers</h4>
                  <p>Primer Docs</p>
                  <p>API Reference</p>
                  <p>Payment methods guide</p>
                  <p>Service status</p>
                  <p>Community</p>
                </div>
              </div>
    
              {/* BOTTOM ROW — 2 COLUMNS */}
              <div className={styles.bottomRow}>
                <div className={styles.col}>
                  <h4>Resources</h4>
                  <p>Blog</p>
                  <p>Success stories</p>
                  <p>News room</p>
                  <p>Terms</p>
                  <p>Privacy</p>
                </div>
    
                <div className={styles.col}>
                  <h4>Company</h4>
                  <p>Careers</p>
                </div>
              </div>
    
            </div>
    
            {/* RIGHT ICONS IMAGE */}
            <div className={styles.right}>
              <img src="/assets/images/I8.png" alt="icons" className={styles.icons}/>
            </div>
    
          </div>
        </footer>
  );
};

export default Footer;
