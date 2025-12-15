import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSettings from "../../hooks/useSettings";

import HeaderColorCard from "./Parts/HeaderColorCard";
import BackgroundColorCard from "./Parts/BackgroundColorCard";
import CustomizeMessagesCard from "./Parts/CustomizeMessagesCard";
import IntroFormCard from "./Parts/IntroFormCard";
import WelcomeMessageCard from "./Parts/WelcomeMessageCard";
import MissedTimerCard from "./Parts/MissedTimerCard";

import ChatPreview from "./Parts/ChatPreview";

import styles from "./ChatbotSettings.module.css";

export default function ChatbotSettings() {
  const navigate = useNavigate();
  const { settings, setSettings, saveSettings, loading, error } = useSettings() || {};

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  // Provide a safe fallback shape so children never receive `undefined`
  const defaultSettings = {
    headerColor: "#33475B",
    backgroundColor: "#E6ECFF",
    initialMessages: ["How can I help you?", "Ask me anything!"],
    introForm: {
      name: { visible: true, label: "Your name", placeholder: "Your name" },
      phone: { visible: true, label: "Your Phone", placeholder: "+1 (000) 000-0000" },
      email: { visible: true, label: "Your Email", placeholder: "example@gmail.com" },
    },
    popMessageText: "👋 Want to chat about Hubly?\nI'm a chatbot here to help you find your way.",
    missedChatTimer: 10,
  };

  const safeSettings = settings || defaultSettings;

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
            <aside className={styles.sidebar}>
              <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />
      
              <div className={styles.sidebarMenu}>
                <button className={styles.iconItem} onClick={() => navigate("/dashboard")}>
                  <img src="/assets/images/L4.png" alt="Dashboard" />
                </button>
      
                <button className={styles.iconItem} onClick={() => navigate("/tickets")}>
                  <img src="/assets/images/L5.png" alt="Tickets" />
                </button>
      
                <button className={styles.iconItem} onClick={() => navigate("/analytics")}>
                  <img src="/assets/images/L6.png" alt="Analytics" />
                </button>
      
                {/* ✅ L7 is ACTIVE now */}
              <div className={`${styles.iconItem} ${styles.active}`}>
               <img src="/assets/images/L7.png" alt="Chatbot" />
              </div>

              {/* ❌ L8 should NOT be active */}
           <button className={styles.iconItem} onClick={() => navigate("/team")}>
           <img src="/assets/images/L8.png" alt="Team" />
              </button>
      
                <button className={styles.iconItem} onClick={() => navigate("/account-settings")}>
                  <img src="/assets/images/L9.png" alt="Account" />
                </button>
              </div>
      
              <div className={styles.sidebarBottom}>
                <img src="/assets/images/L10.png" alt="profile" className={styles.profile} />
              </div>
            </aside>

      <main className={styles.main}>
        <h2 className={styles.title}>Chat bot</h2>

        <div className={styles.layout}>
          {/* LEFT — LIVE PREVIEW */}
          <div className={styles.previewSection}>
            <ChatPreview settings={safeSettings} />
          </div>

          {/* RIGHT — SETTINGS CARDS */}
          <div className={styles.grid}>
            <HeaderColorCard settings={safeSettings} setSettings={setSettings} />
            <BackgroundColorCard settings={safeSettings} setSettings={setSettings} />
            <CustomizeMessagesCard settings={safeSettings} setSettings={setSettings} />
            <IntroFormCard settings={safeSettings} setSettings={setSettings} />
            <WelcomeMessageCard settings={safeSettings} setSettings={setSettings} />
            <MissedTimerCard
              settings={safeSettings}
              setSettings={setSettings}
              saveSettings={saveSettings}
            />
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}
