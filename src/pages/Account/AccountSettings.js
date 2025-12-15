import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../api/settingsApi";
import useAuth from "../../hooks/useAuth";
import styles from "./AccountSettings.module.css";

const AccountSettings = () => {
  const navigate = useNavigate();

  const auth = useAuth() || {};
  const user = auth.user || null;
  const logout = auth.logout || (() => {});
  const setUser = auth.setUser || (() => {});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  if (!user) return <p style={{ padding: 30 }}>Loading...</p>;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage("");
    setType("");
  };

  const noChanges = () =>
    form.firstName === user.firstName &&
    form.lastName === user.lastName &&
    !form.password;

  const handleSave = async () => {
    if (noChanges()) {
      setMessage("No changes detected.");
      setType("error");
      return;
    }
    if (!form.firstName || !form.lastName) {
      setMessage("Required fields missing.");
      setType("error");
      return;
    }
    if (form.password && form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setType("error");
      return;
    }
    if (form.password && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      setType("error");
      return;
    }

    try {
      setLoading(true);

      const updated = await updateProfile(form);

      setUser({
        ...user,
        firstName: updated.firstName || form.firstName,
        lastName: updated.lastName || form.lastName,
      });

      setType("success");
      setMessage("Profile updated successfully!");

      if (form.password) {
        setTimeout(() => logout(), 1200);
      }
    } catch (err) {
      setType("error");
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />

        <div className={styles.menu}>
          <button onClick={() => navigate("/dashboard")} className={styles.iconBtn}>
            <img src="/assets/images/L4.png" alt="Dashboard" />
          </button>

          <button onClick={() => navigate("/tickets")} className={styles.iconBtn}>
            <img src="/assets/images/L5.png" alt="Tickets" />
          </button>

          <button onClick={() => navigate("/analytics")} className={styles.iconBtn}>
            <img src="/assets/images/L6.png" alt="Analytics" />
          </button>

          <button onClick={() => navigate("/chatbot-settings")} className={styles.iconBtn}>
            <img src="/assets/images/L7.png" alt="Chatbot" />
          </button>

          <button onClick={() => navigate("/team")} className={styles.iconBtn}>
            <img src="/assets/images/L8.png" alt="Team" />
          </button>

          <button className={`${styles.iconBtn} ${styles.active}`}>
            <img src="/assets/images/L9.png" alt="Settings" />
          </button>

          <div className={styles.settingLabel}>Setting</div>
        </div>

        <img src="/assets/images/L10.png" alt="profile" className={styles.profile} />
      </aside>

      {/* MAIN */}
      <main className={styles.container}>
        <h2 className={styles.heading}>Settings</h2>

        <div className={styles.card}>
          <div className={styles.tabRow}>
            <div className={styles.tab}>Edit Profile</div>
            <div className={styles.hrLine} />
          </div>

          <div className={styles.leftCol}>
            {/* FIRST NAME */}
            <div className={styles.formRow}>
              <label className={styles.label}>First name</label>
              <input
                className={styles.input}
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            {/* LAST NAME */}
            <div className={styles.formRow}>
              <label className={styles.label}>Last name</label>
              <input
                className={styles.input}
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className={styles.formRow}>
              <label className={styles.labelRow}>Email</label>
              <div className={styles.rowWithInfo}>
                <input
                  className={`${styles.input} ${styles.inputDisabled}`}
                  value={form.email}
                  readOnly
                />
                <div className={styles.infoWrap}>
                  <div className={styles.infoIcon}>ⓘ</div>
                  <div className={styles.tooltip}>Email cannot be changed</div>
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className={styles.formRow}>
              <label className={styles.label}>Password</label>
              <div className={styles.rowWithInfo}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="************"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <div className={styles.infoWrap}>
                  <div className={styles.infoIcon}>ⓘ</div>
                  <div className={styles.tooltip}>User will logged out immediately</div>
                </div>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className={styles.formRow}>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.rowWithInfo}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="************"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />
                <div className={styles.infoWrap}>
                  <div className={styles.infoIcon}>ⓘ</div>
                  <div className={styles.tooltip}>User will logged out immediately</div>
                </div>
              </div>
            </div>

            {message && (
              <div
                className={`${styles.message} ${
                  type === "success" ? styles.success : styles.error
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* SAVE BUTTON */}
          <div className={styles.saveWrap}>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
