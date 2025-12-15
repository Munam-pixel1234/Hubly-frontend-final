import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../api/settingsApi";

export default function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      setSettings(res.settings);
    } catch (err) {
      console.error("Settings load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      const updated = await updateSettings(settings);
      setSettings(updated.settings);
    } catch (err) {
      console.error("Failed to update settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return { settings, setSettings, saveSettings, loading };
}
