import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./Signup.module.css";

const logo = "/assets/images/I1.png";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");

  // Disable signup if admin already exists
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axiosInstance.get("/auth/has-admin");

        if (res.data.exists) {
          navigate("/login");
        }
      } catch {
        setError("Unable to verify system permissions.");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]); // <-- FIXED dependency warning

  const formValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword &&
    form.agree;

  const handleSubmit = async () => {
    if (!formValid) return;

    try {
      const res = await axiosInstance.post("/auth/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  if (loading) return <p style={{ padding: "40px", fontSize: "16px" }}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src={logo} alt="Hubly Logo" className={styles.logo} />

        <div className={styles.formBox}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Create an account</h2>
            <Link to="/login" className={styles.signInLink}>
              Sign in instead
            </Link>
          </div>

          <input
            placeholder="First name"
            className={styles.input}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            placeholder="Last name"
            className={styles.input}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className={styles.input}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            />
            I agree to the <b>Terms of use</b> and <b>Privacy Policy</b>.
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            disabled={!formValid}
            className={`${styles.signupBtn} ${formValid && styles.activeBtn}`}
            onClick={handleSubmit}
          >
            Create an account
          </button>
        </div>

        <p className={styles.footerNote}>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>

      <div className={styles.right}>
        <img src="/assets/images/login.png" alt="Signup illustration" />
      </div>
    </div>
  );
}
