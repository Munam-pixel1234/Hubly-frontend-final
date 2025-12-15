// src/components/ChatbotSettings/Parts/IntroFormCard.jsx

import React from "react";
import styles from "../ChatbotSettings.module.css";

export default function IntroFormCard({ settings = {}, setSettings = () => {} }) {
  // SAFEST POSSIBLE DEFAULT
  const introForm = settings.introForm || {
    name: {
      label: "Your name",
      placeholder: "Your name",
      visible: true,
    },
    phone: {
      label: "Your Phone",
      placeholder: "+1 (000) 000-0000",
      visible: true,
    },
    email: {
      label: "Your Email",
      placeholder: "example@gmail.com",
      visible: true,
    },
  };

  // update placeholder text only
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      introForm: {
        ...introForm, // ← ensures we always update the safe fallback
        [field]: {
          ...introForm[field],
          placeholder: value,
        },
      },
    }));
  };

  return (
    <div className={styles.introFormCard}>
      <div className={styles.introFormTitle}>Introduction Form</div>

      {Object.keys(introForm).map((fieldKey) => {
        const field = introForm[fieldKey];
        if (!field.visible) return null;

        return (
          <div key={fieldKey} className={styles.introFormGroup}>
            <label className={styles.introLabel}>{field.label}</label>

            <input
              type="text"
              className={styles.introInput}
              value={field.placeholder}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(fieldKey, e.target.value)}
            />

            <div className={styles.introUnderline}></div>
          </div>
        );
      })}

      <button
        className={styles.introSubmitBtn}
        style={{ backgroundColor: settings.headerColor || "#184E7F" }}
      >
        Thank You!
      </button>
    </div>
  );
}
