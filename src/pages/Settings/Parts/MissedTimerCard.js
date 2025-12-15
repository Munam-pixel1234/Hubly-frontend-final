// src/components/ChatbotSettings/Parts/MissedTimerCard.jsx
import React, { useState, useEffect } from "react";
import styles from "../ChatbotSettings.module.css";

export default function MissedTimerCard({ settings = {}, setSettings = () => {}, saveSettings = async () => {} }) {
  // default grid numbers (three rows)
  const colLeft = ["12", "00", "01"];
  const colCenter = ["09", "10", "11"];
  const colRight = ["59", "00", "01"];

  // read initial selected from settings or fallback to middle row (row index 1)
  const initial = settings?.missedTimer || { row: 1, h: colLeft[1], m: colCenter[1], s: colRight[1] };

  const [selectedRow, setSelectedRow] = useState(initial.row ?? 1);
  const [selected, setSelected] = useState({
    h: initial.h ?? colLeft[1],
    m: initial.m ?? colCenter[1],
    s: initial.s ?? colRight[1],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // keep parent settings in sync as user selects
    setSettings({ ...settings, missedTimer: { row: selectedRow, ...selected } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow, selected]);

  const chooseRow = (rowIndex) => {
    // update selected values to values present on that row
    setSelected({
      h: colLeft[rowIndex],
      m: colCenter[rowIndex],
      s: colRight[rowIndex],
    });
    setSelectedRow(rowIndex);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // ensure parent settings already updated, then call provided saveSettings
      await saveSettings?.();
    } catch (err) {
      console.error("Failed to save missed timer", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.missedCard}>
      <div className={styles.missedTitle}>Missed chat timer</div>

      <div className={styles.timerArea}>
        {/* LEFT COLUMN */}
        <div className={styles.timerCol}>
          {colLeft.map((val, idx) => (
            <div
              key={`l-${idx}`}
              className={`${styles.timerItem} ${selectedRow === idx ? styles.activeRow : ""}`}
              onClick={() => chooseRow(idx)}
            >
              {val}
            </div>
          ))}
        </div>

        {/* CENTER COLUMN (the one with highlighted set-time row) */}
        <div className={styles.timerCol}>
          {colCenter.map((val, idx) => (
            <div
              key={`c-${idx}`}
              className={`${styles.timerItem} ${selectedRow === idx ? styles.centerActive : ""}`}
              onClick={() => chooseRow(idx)}
            >
              {/* middle row gets the light background */}
              {val}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.timerCol}>
          {colRight.map((val, idx) => (
            <div
              key={`r-${idx}`}
              className={`${styles.timerItem} ${selectedRow === idx ? styles.activeRow : ""}`}
              onClick={() => chooseRow(idx)}
            >
              {val}
            </div>
          ))}
        </div>

        {/* separators ":" vertically aligned with rows */}
        <div className={styles.colonCol}>
          <div className={styles.colonItem}>:</div>
          <div className={styles.colonItemSpacer} />
          <div className={styles.colonItem}>:</div>
        </div>
      </div>

      <div className={styles.missedFooter}>
        <button className={styles.saveSmall} onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
