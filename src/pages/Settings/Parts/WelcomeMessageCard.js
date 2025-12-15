// src/components/ChatbotSettings/Parts/WelcomeMessageCard.jsx

import React, { useState } from "react";
import styles from "../ChatbotSettings.module.css";

export default function WelcomeMessageCard({ settings, setSettings }) {
  const [editing, setEditing] = useState(false);

  const text =
    settings?.popMessageText ||
    "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way";

  const handleUpdate = (value) => {
    setSettings({ ...settings, popMessageText: value });
  };

  return (
    <div className={styles.welcomeCard}>
      {/* Title */}
      <div className={styles.welcomeTitle}>Welcome Message</div>

      {/* Message Container */}
      <div className={styles.welcomeBox}>
        {editing ? (
          <textarea
            className={styles.welcomeTextArea}
            value={text}
            autoFocus
            maxLength={50}
            onChange={(e) => handleUpdate(e.target.value)}
            onBlur={() => setEditing(false)}
          />
        ) : (
          <>
            <pre className={styles.welcomeText}>{text}</pre>

            <img
              src="/assets/images/edit.png"
              alt="edit"
              className={styles.welcomeEditIcon}
              onClick={() => setEditing(true)}
            />
          </>
        )}
      </div>

      {/* Word Counter */}
      <div className={styles.wordCount}>{text.length}/50</div>
    </div>
  );
}
