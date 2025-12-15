import axiosInstance from "./axiosInstance";

export const getSettings = () => axiosInstance.get("/settings");
export const updateSettings = (updatedValues) =>
  axiosInstance.put("/settings", updatedValues);

//  ADD THIS alias if UI expects updateProfile
export const updateProfile = (data) => axiosInstance.put("/auth/update", data);
