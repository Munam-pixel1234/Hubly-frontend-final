// src/components/ChatbotSettings/Parts/CustomizeMessagesCard.jsx

import React, { useState } from "react";
import styles from "../ChatbotSettings.module.css";

export default function CustomizeMessagesCard({
  settings = {},
  setSettings = () => {}
}) {
  // Safe fallback values
  const initialMessages = Array.isArray(settings.initialMessages)
    ? settings.initialMessages
    : ["How can I help you?", "Ask me anything!"];

  const [editingIndex, setEditingIndex] = useState(null);

  const updateMessage = (index, value) => {
    const updated = [...initialMessages];
    updated[index] = value;

    // Update ONLY the text — no background or bubble styling is touched
    setSettings({
      ...settings,
      initialMessages: updated
    });
  };

  return (
    <div className={styles.customCard}>
      {/* TITLE */}
      <div className={styles.customTitle}>Customize Message</div>

      {/* TWO MESSAGE ROWS */}
      {initialMessages.map((msg, index) => (
        <div className={styles.messageRow} key={index}>
          
          {/* If editing, show input */}
          {editingIndex === index ? (
            <input
              className={styles.messageInput}
              value={msg}
              autoFocus
              onChange={(e) => updateMessage(index, e.target.value)}
              onBlur={() => setEditingIndex(null)}
            />
          ) : (
            <>
              {/* message text */}
              <span className={styles.messageText}>
                {msg?.trim() !== "" ? msg : "Type a message..."}
              </span>

              {/* edit icon */}
              <img
                src="/assets/images/edit.png"
                alt="edit"
                className={styles.editIcon}
                onClick={() => setEditingIndex(index)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
