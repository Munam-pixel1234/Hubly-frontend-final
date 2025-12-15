import React, { useRef } from "react";
import styles from "../ChatbotSettings.module.css";

export default function HeaderColorCard({ settings = {}, setSettings }) {
  const presetColors = ["#FFFFFF", "#000000", "#33475B"];
  const colorInputRef = useRef(null);

  const setColor = (color) => {
    setSettings({ ...settings, headerColor: color });
  };

  return (
    <div className={styles.headerCard}>
      <div className={styles.headerTitle}>Header Color</div>

      {/* Color Circle Row */}
      <div className={styles.colorRow}>
        {presetColors.map((c) => (
          <div
            key={c}
            className={styles.colorCircle}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      {/* Selected Color + HEX Box */}
      <div className={styles.colorSelectRow}>
        {/* Selected square */}
        <div
          className={styles.selectedSquare}
          style={{ backgroundColor: settings.headerColor }}
          onClick={() => colorInputRef.current.click()}
        ></div>

        {/* Hidden color input */}
        <input
          type="color"
          ref={colorInputRef}
          value={settings.headerColor}
          onChange={(e) => setColor(e.target.value)}
          className={styles.hiddenInput}
        />

        {/* HEX Display Box */}
        <div className={styles.hexBox}>{settings.headerColor}</div>
      </div>
    </div>
  );
}
