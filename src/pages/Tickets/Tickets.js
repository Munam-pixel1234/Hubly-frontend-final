import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./Tickets.module.css";

export default function Tickets() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  /* ================= STATE ================= */
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);
  const [pendingAssignee, setPendingAssignee] = useState(null);

  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showResolvePopup, setShowResolvePopup] = useState(false);

  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  /* ================= FETCH ================= */

  const fetchTickets = useCallback(async () => {
    const res = await axiosInstance.get("/tickets/list");
    const unresolved = (res.data.tickets || [])
      .filter((t) => t.status !== "resolved")
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      );

    setTickets(unresolved);
    setSelectedTicket((prev) => prev || unresolved[0] || null);
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedTicket) return;
    const res = await axiosInstance.get(
      `/tickets/${selectedTicket.ticketId}`
    );
    setMessages(res.data.messages || []);
  }, [selectedTicket]);

  const fetchTeamMembers = useCallback(async () => {
    const res = await axiosInstance.get("/team");
    setTeamMembers(res.data.members || []);
  }, []);

  useEffect(() => {
    fetchTickets();
    fetchTeamMembers();
  }, [fetchTickets, fetchTeamMembers]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= ACTIONS ================= */

  const sendMessage = async () => {
    if (!text.trim() || !selectedTicket) return;

    await axiosInstance.post(
      `/messages/${selectedTicket.ticketId}/add`,
      { text }
    );

    setText("");
    fetchMessages();
  };

  const confirmAssign = async () => {
    if (!pendingAssignee || !selectedTicket) return;

    await axiosInstance.put(
      `/tickets/${selectedTicket.ticketId}/assign`,
      { assigneeId: pendingAssignee._id }
    );

    setShowAssignPopup(false);
    setShowTeamDropdown(false);
    fetchTickets();
  };

  const confirmResolve = async () => {
    if (!selectedTicket) return;

    await axiosInstance.put(
      `/tickets/${selectedTicket.ticketId}/status`,
      { status: "resolved" }
    );

    setShowResolvePopup(false);
    setShowStatusDropdown(false);
    fetchTickets();
  };

  /* ================= RENDER ================= */

  return (
    <div className={styles.wrapper}>
      {/* ================= SIDEBAR ================= */}
      <aside className={styles.sidebar}>
        <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />

        <div className={styles.sidebarMenu}>
          <button className={styles.iconItem} onClick={() => navigate("/dashboard")}>
            <img src="/assets/images/L4.png" alt="Dashboard" />
          </button>

          {/* ACTIVE TICKETS (L5) */}
          <div className={`${styles.iconItem} ${styles.active}`}>
            <img src="/assets/images/L5.png" alt="Tickets" />
          </div>

          <button className={styles.iconItem} onClick={() => navigate("/analytics")}>
            <img src="/assets/images/L6.png" alt="Analytics" />
          </button>

          <button
            className={styles.iconItem}
            onClick={() => navigate("/chatbot-settings")}
          >
            <img src="/assets/images/L7.png" alt="Chatbot" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/team")}>
            <img src="/assets/images/L8.png" alt="Team" />
          </button>

          <button
            className={styles.iconItem}
            onClick={() => navigate("/account-settings")}
          >
            <img src="/assets/images/L9.png" alt="Account" />
          </button>
        </div>

        <div className={styles.sidebarBottom}>
          <img
            src="/assets/images/L10.png"
            alt="profile"
            className={styles.profile}
          />
        </div>
      </aside>

      {/* ================= CHAT LIST ================= */}
      <section className={styles.chatListPane}>
        <h2>Contact Center</h2>
        <p className={styles.sub}>Chats</p>
        <div className={styles.divider} />

        {tickets.map((t) => (
  <button
    key={t._id}
    className={`${styles.chatItem} ${
      selectedTicket?.ticketId === t.ticketId ? styles.activeChat : ""
    }`}
    onClick={() => setSelectedTicket(t)}
  >
    <img src="/assets/images/D3.png" alt="user" />
    <div>
      <p className={styles.chatName}>{t.userName}</p>
      <p className={styles.chatPreview}>
        {t.lastMessage || "No messages"}
      </p>
    </div>
  </button>
))}

      </section>

      {/* ================= CHAT BOX ================= */}
      <section className={styles.chatPane}>
        <div className={styles.chatHeader}>
          Ticket# {selectedTicket?.ticketId}
        </div>

        <div className={styles.chatBody}>
          {messages.map((m) => {
            const isAdmin = m.direction === "outbound";
            return (
              <div
                key={m._id}
                className={`${styles.msgRow} ${
                  isAdmin ? styles.adminRow : styles.userRow
                }`}
              >
                <img
                  src={
                    isAdmin
                      ? "/assets/images/A1.png"
                      : "/assets/images/D3.png"
                  }
                  alt=""
                  className={styles.msgAvatar}
                />
                <p className={styles.msgText}>{m.text}</p>
              </div>
            );
          })}

          {!messages.length && (
            <p className={styles.missed}>Replying to missed chat</p>
          )}

          {selectedTicket?.status === "resolved" && (
            <p className={styles.resolved}>
              This chat has been resolved
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {selectedTicket?.status !== "resolved" && (
          <div className={styles.inputBox}>
            <input
              placeholder="type here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        )}
      </section>

      {/* ================= DETAILS ================= */}
      <section className={styles.detailsPane}>
        <div className={styles.chatTitle}>
          <img src="/assets/images/D3.png" alt="" />
          Chat
        </div>

        <p className={styles.blue}>Details</p>

        <div className={styles.field}>
          <img src="/assets/images/CO1.png" alt="" />
          {selectedTicket?.userName}
        </div>

        <div className={styles.field}>
          <img src="/assets/images/CO2.png" alt="" />
          {selectedTicket?.phone || "+1 (000) 000-0000"}
        </div>

        <div className={styles.field}>
          <img src="/assets/images/CO3.png" alt="" />
          {selectedTicket?.email || "example@gmail.com"}
        </div>

        <p className={styles.blue}>Teammates</p>

        <div
          className={styles.option}
          onClick={() => setShowTeamDropdown((p) => !p)}
        >
          <img src="/assets/images/A1.png" alt="" />
          Admin
          <span className={styles.arrow}>⌄</span>
        </div>

        {showTeamDropdown &&
          teamMembers.map((m) => (
            <div
              key={m._id}
              className={styles.dropdownItem}
              onClick={() => {
                setPendingAssignee(m);
                setShowAssignPopup(true);
              }}
            >
              <img src="/assets/images/A1.png" alt="" />
              {m.firstName} {m.lastName}
            </div>
          ))}

        <div
          className={styles.option}
          onClick={() => setShowStatusDropdown((p) => !p)}
        >
          <img src="/assets/images/CO5.png" alt="" />
          Ticket status
          <span className={styles.arrow}>⌄</span>
        </div>

        {showStatusDropdown && (
          <>
            <div
              className={styles.dropdownItem}
              onClick={() => setShowResolvePopup(true)}
            >
              Resolved
            </div>
            <div className={styles.dropdownItem}>Unresolved</div>
          </>
        )}
      </section>

      {/* ================= POPUPS ================= */}
      {showAssignPopup && (
        <div className={styles.popup}>
          <p>Chat would be assign to different team member</p>
          <div>
            <button onClick={() => setShowAssignPopup(false)}>
              Cancel
            </button>
            <button onClick={confirmAssign}>Confirm</button>
          </div>
        </div>
      )}

      {showResolvePopup && (
        <div className={styles.popup}>
          <p>Chat will be closed</p>
          <div>
            <button onClick={() => setShowResolvePopup(false)}>
              Cancel
            </button>
            <button onClick={confirmResolve}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
