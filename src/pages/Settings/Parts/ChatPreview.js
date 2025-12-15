
import React from "react";
import styles from "../ChatbotSettings.module.css";


const ChatPreview = (props) => {
  const settings = props?.settings || {};

  const headerColor = settings.headerColor ?? "#33475B";
  const backgroundColor = settings.backgroundColor ?? "#E6ECFF";
  const initialMessages = Array.isArray(settings.initialMessages)
    ? settings.initialMessages
    : ["How can I help you?", "Ask me anything!"];
  const introForm = settings.introForm ?? {
    name: { visible: true, label: "Your name", placeholder: "Your name" },
    phone: { visible: true, label: "Your Phone", placeholder: "+1 (000) 000-0000" },
    email: { visible: true, label: "Your Email", placeholder: "example@gmail.com" },
  };
  const popMessageText =
    settings.popMessageText ??
    "👋 Want to chat about Hubly?\nI'm a chatbot here to help you find your way.";

  
  return (
    <div className={styles.previewContainer}>
      {/* CHAT BOX */}
      <div className={styles.chatBox}>
        {/* HEADER */}
        <div className={styles.chatHeader} style={{ backgroundColor: headerColor }}>
          <img src="/assets/images/CC2.png" className={styles.headerAvatar} alt="bot" />
          <span className={styles.chatTitle}>Hubly</span>
        </div>

        {/* BODY */}
        <div className={styles.chatBody} style={{ backgroundColor }}>
          <div className={styles.chatScroll}>
            {(initialMessages || []).slice(0, 3).map((msg, index) => (
              <div key={index} className={styles.messageRow}>
                {index === 0 ? (
                  <img src="/assets/images/CC2.png" alt="bot" className={styles.chatAvatar} />
                ) : (
                  <div className={styles.avatarSpacer} />
                )}

                <div className={styles.messageBubble}>{msg}</div>
              </div>
            ))}

            {/* FORM */}
            <div className={styles.formBubble}>
              <div className={styles.formTitle}>Introduce Yourself</div>

              {introForm?.name?.visible && (
                <>
                  <label className={styles.formLabel}>{introForm.name.label}</label>
                  <input className={styles.formInput} placeholder={introForm.name.placeholder} />
                </>
              )}

              {introForm?.phone?.visible && (
                <>
                  <label className={styles.formLabel}>{introForm.phone.label}</label>
                  <input className={styles.formInput} placeholder={introForm.phone.placeholder} />
                </>
              )}

              {introForm?.email?.visible && (
                <>
                  <label className={styles.formLabel}>{introForm.email.label}</label>
                  <input className={styles.formInput} placeholder={introForm.email.placeholder} />
                </>
              )}

              <button className={styles.submitBtn} style={{ backgroundColor: headerColor }}>
                Thank You!
              </button>
            </div>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className={styles.footerInput}>
          <input type="text" placeholder="Write a message..." className={styles.inputField} />
          <button className={styles.sendButton}>
            <img
            src="/assets/images/send.png"
             alt="send"
             className={styles.reactionImg}
            />
          </button>
        </div>
      </div>

      {/* POPUP PREVIEW */}
      <div className={styles.popPreview}>
        <img src="/assets/images/CC2.png" className={styles.popAvatar} alt="bot" />
        <div className={styles.popBubble}>{popMessageText}</div>
        <button className={styles.popClose}>✕</button>
      </div>
    </div>
  );
};

export default ChatPreview;
