import axiosInstance from "./axiosInstance";

const messageApi = {
  sendMessage: (ticketId, data) =>
    axiosInstance.post(`/messages/${ticketId}/add`, data),

  getTicketWithMessages: (ticketId) =>
    axiosInstance.get(`/tickets/${ticketId}`),
};

export default messageApi;
