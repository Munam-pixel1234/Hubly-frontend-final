import axiosInstance from "./axiosInstance";

const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
  updateUser: (data) => axiosInstance.put("/auth/update", data),
};

export default authApi;
