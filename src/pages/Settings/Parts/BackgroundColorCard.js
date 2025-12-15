// src/components/ChatbotSettings/Parts/BackgroundColorCard.jsx

import React from "react";
import styles from "../ChatbotSettings.module.css";

export default function BackgroundColorCard({ settings, setSettings }) {
  const presetColors = ["#FFFFFF", "#000000", "#EEEEEE"];

  const updateColor = (color) => {
    setSettings({ ...settings, backgroundColor: color });
  };

  return (
    <div className={styles.colorCard}>
      <div className={styles.cardTitle}>Custom Background Color</div>

      {/* PRESET COLOR CIRCLES */}
      <div className={styles.colorRow}>
        {presetColors.map((color) => (
          <div
            key={color}
            className={styles.colorCircle}
            style={{ backgroundColor: color }}
            onClick={() => updateColor(color)}
          />
        ))}
      </div>

      {/* SELECTED COLOR + HEX BOX */}
      <div className={styles.colorSelectRow}>
        
        {/* SELECTED COLOR BOX (48×48) */}
        <div
          className={styles.selectedColorBox}
          style={{ backgroundColor: settings?.backgroundColor || "#EEEEEE" }}
        ></div>

        {/* HEX DISPLAY BOX (231×48) */}
        <div className={styles.hexBox}>
          {settings?.backgroundColor || "#EEEEEE"}
        </div>
      </div>
    </div>
  );
}
