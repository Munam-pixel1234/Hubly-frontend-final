import axiosInstance from "./axiosInstance";

export const getAnalyticsSummary = async () => {
  const res = await axiosInstance.get("/analytics");
  return res.data;
};
