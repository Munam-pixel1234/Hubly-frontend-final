import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.navbarWrapper}>
    <header className={styles.navbar}>
      {/* LEFT LOGO */}
      <div className={styles.left}>
        <Link to="/">
          <img
            src="/assets/images/I1.png"
            alt="Hubly CRM Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* RIGHT BUTTONS */}
      <div className={styles.right}>
        <Link to="/login" className={styles.linkWrapper}>
          <button className={styles.login}>Login</button>
        </Link>

        <Link to="/signup" className={styles.linkWrapper}>
          <button className={styles.signup}>Sign Up</button>
        </Link>
      </div>
    </header>
    </nav>
  );
};

export default Navbar;
