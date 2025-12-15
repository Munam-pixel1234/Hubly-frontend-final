import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../api/analyticsApi";

const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getAnalyticsSummary(); // must be GET
        setData(result);
      } catch (error) {
        console.error("Analytics fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading };
};

export default useAnalytics;
