import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./Login.module.css";

const logo = "/assets/images/I1.png";
const sideImg = "/assets/images/login.png";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const isDisabled = !form.email || !form.password;

  // Ensure fields are empty every time user visits login
  useEffect(() => {
    setForm({ email: "", password: "" });
  }, []);

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      const res = await axiosInstance.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className={styles.wrapper} autoComplete="off">
      <div className={styles.left}>
        <img src={logo} alt="Hubly Logo" className={styles.logo} />

        <div className={styles.formBox}>
          <h2 className={styles.title}>Sign in to your Plexify</h2>

          <label className={styles.fieldLabel}>Username</label>
          <input
            type="text"
            autoComplete="off"
            className={styles.input}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className={styles.fieldLabel}>Password</label>
          <input
            type="password"
            autoComplete="new-password"
            className={styles.input}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`${styles.loginBtn} ${!isDisabled && styles.activeBtn}`}
          >
            Log in
          </button>

          <p className={styles.switchText}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        <p className={styles.footerNote}>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>

      <div className={styles.right}>
        <img src={sideImg} alt="Login Illustration" />
      </div>
    </div>
  );
}
