import { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";
import axiosInstance from "../../api/axiosInstance";

export default function ChatPopup({ setOpen }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [ticketId, setTicketId] = useState(null);

  const [showThankYou, setShowThankYou] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -----------------------------
  // Submit Intro Form → Create Ticket
  // -----------------------------
  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("/tickets/create", {
        userName: form.name,
        phone: form.phone,
        email: form.email,
      });

      setTicketId(res.data.ticketId);

      // Show THANK YOU CARD first
      setShowThankYou(true);

      // After 1.5 seconds → switch to full chat mode
      setTimeout(() => {
        setShowThankYou(false);
      }, 1500);

    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Send Message to Backend
  // -----------------------------
  const sendMessage = async () => {
    if (!message.trim() || !ticketId) return;

    try {
      await axiosInstance.post(`/messages/${ticketId}/add`, {
        text: message,
        direction: "inbound",
      });

      // Append message to chat window
      setMessages((prev) => [...prev, { text: message, from: "user" }]);
      setMessage("");

    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  return (
    <>
      <div className={styles.chatWindow}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <img src="/assets/images/CC2.png" className={styles.headerIcon} alt="hubly" />
          <span className={styles.headerTitle}>Hubly</span>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          
          {/* Before form submit → show intro UI */}
          {!ticketId && !showThankYou && (
            <>
              <div className={styles.heyRow}>
                <div className={styles.heyBubble}>Hey!</div>
              </div>

              <div className={styles.leftEmojiRow}>
                <img src="/assets/images/CC2.png" className={styles.leftEmoji} alt="" />
              </div>

              {/* Intro Card */}
              <div className={styles.introCard}>
                <p className={styles.cardTitle}>Introduction Yourself</p>

                <label className={styles.label}>Your Name</label>
                <input
                  className={styles.input}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <label className={styles.label}>Your Phone</label>
                <input
                  className={styles.input}
                  placeholder="+1 (000) 000–0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <label className={styles.label}>Your Email</label>
                <input
                  className={styles.input}
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <button className={styles.submitBtn} onClick={handleSubmit}>
                  Thank You!
                </button>
              </div>
            </>
          )}

          {/* THANK YOU CARD */}
          {showThankYou && (
            <div className={styles.introCard}>
              <p className={styles.cardTitle}>Thank You!</p>
              <p className={styles.thankText}>Our team will connect with you soon.</p>
            </div>
          )}

          {/* After thank you → show chat messages */}
          {ticketId && !showThankYou && (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.from === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  {msg.text}
                </div>
              ))}

              <div ref={scrollRef} />
            </>
          )}
        </div>

        {/* FOOTER INPUT (enable only after ticket created) */}
        <div className={styles.footer}>
          <input
            className={styles.footerInput}
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!ticketId || showThankYou}
          />

          <button
            className={styles.footerSend}
            onClick={sendMessage}
            disabled={!ticketId || showThankYou}
          >
            <img src="/assets/images/send.png" className={styles.sendIcon} alt="send" />
          </button>
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button className={styles.closeBtn} onClick={() => setOpen(false)}>
        <img src="/assets/images/cross.png" className={styles.crossIcon} alt="cross" />
      </button>
    </>
  );
}
