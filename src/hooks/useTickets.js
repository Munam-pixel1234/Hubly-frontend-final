import { useState, useEffect } from "react";
import {
  fetchTickets,
  fetchSingleTicket,
  updateStatus,
  assignTicket,
} from "../api/ticketsApi";
import messageApi from "../api/messageApi";

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [messages, setMessages] = useState([]);

  const loadTickets = async () => {
    const data = await fetchTickets();
    setTickets(data);
  };

  const openTicket = async (id) => {
    const data = await fetchSingleTicket(id);
    setActiveTicket(data.ticket);
    setMessages(data.messages);
  };

  const sendChat = async (ticketId, text) => {
    await messageApi.sendMessage(ticketId, { text });
    openTicket(ticketId);
  };

  const changeStatus = async (ticketId, status) => {
    await updateStatus(ticketId, status);
    openTicket(ticketId);
  };

  const changeAssignee = async (ticketId, assigneeId) => {
    await assignTicket(ticketId, assigneeId);
    openTicket(ticketId);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return {
    tickets,
    activeTicket,
    messages,
    openTicket,
    sendChat,
    changeStatus,
    changeAssignee,
  };
};

export default useTickets;
