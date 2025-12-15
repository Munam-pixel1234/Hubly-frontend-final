import { useState } from "react";
import ChatPopup from "./ChatPopup";
import styles from "./ChatWidget.module.css";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <>
      {/* Floating Preview Bubble */}
      {!open && showPreview && (
        <div className={styles.previewWrapper}>
          
          {/* Avatar on top */}
          <img
            src="/assets/images/CC2.png"
            className={styles.previewAvatar}
            alt="bot"
          />

          {/* Message bubble */}
          <div className={styles.previewBox}>
            <p className={styles.previewText}>
              👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.
            </p>

            <button
              className={styles.previewClose}
              onClick={() => setShowPreview(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Round Button */}
      {!open && (
        <button className={styles.floatingBtn} onClick={() => setOpen(true)}>
          <img
            src="/assets/images/CC1.png"
            className={styles.floatingIcon}
            alt="chat"
          />
        </button>
      )}

      {/* Full Chat Popup */}
      {open && <ChatPopup setOpen={setOpen} />}
    </>
  );
}
