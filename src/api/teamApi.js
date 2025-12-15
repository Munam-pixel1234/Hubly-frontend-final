import axiosInstance from "./axiosInstance";

// Fetch all members
export const getAllMembers = async () => {
  const res = await axiosInstance.get("/team");
  return res.data;
};

// Add a new member
export const addTeamMember = async (data) => {
  const res = await axiosInstance.post("/team", data);
  return res.data;
};

// Delete a member
export const deleteTeamMember = async (id) => {
  const res = await axiosInstance.delete(`/team/${id}`);
  return res.data;
};
