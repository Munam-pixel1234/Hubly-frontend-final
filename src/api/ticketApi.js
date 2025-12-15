import axiosInstance from "./axiosInstance";

export const fetchTickets = async () => {
  const res = await axiosInstance.get("/tickets/list");
  return res.data.tickets;
};

export const fetchSingleTicket = async (id) => {
  const res = await axiosInstance.get(`/tickets/${id}`);
  return res.data;
};

export const updateStatus = async (ticketId, status) => {
  const res = await axiosInstance.put(`/tickets/${ticketId}/status`, { status });
  return res.data;
};

export const assignTicket = async (ticketId, userId) => {
  const res = await axiosInstance.put(`/tickets/${ticketId}/assign`, {
    assigneeId: userId,
  });
  return res.data;
};

//  PUBLIC ticket create (landing page chatbot)
export const createPublicTicket = async (data) => {
  return axiosInstance.post("/tickets/create", data);
};
