// src/pages/Dashboard/Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axiosInstance.get("/tickets/list");
        setTickets(res.data.tickets || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchTickets();
  }, []);

  // Filtering
  let filtered = tickets;

  // Search by ticketId
  if (search.trim() !== "") {
    filtered = filtered.filter((t) =>
      t.ticketId?.toLowerCase().includes(search.toLowerCase())
    );
    setNotFound(filtered.length === 0);
  }

  // Tabs
  if (filter === "resolved") {
    filtered = filtered.filter((t) => t.status === "resolved");
  } else if (filter === "unresolved") {
    filtered = filtered.filter((t) => t.status !== "resolved");
  }

  return (
    <div className={styles.layout}>
      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className={styles.sidebar}>
        <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />

        <div className={styles.sidebarMenu}>
          <div className={`${styles.iconItem} ${styles.active}`}>
            <img src="/assets/images/L4.png" alt="Dashboard" />
          </div>

          <button className={styles.iconItem} onClick={() => navigate("/tickets")}>
            <img src="/assets/images/L5.png" alt="Tickets" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/analytics")}>
            <img src="/assets/images/L6.png" alt="Analytics" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/chatbot-settings")}>
            <img src="/assets/images/L7.png" alt="Chatbot" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/team")}>
            <img src="/assets/images/L8.png" alt="Team" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/account-settings")}>
            <img src="/assets/images/L9.png" alt="Account" />
          </button>
        </div>

        <div className={styles.sidebarBottom}>
          <img src="/assets/images/L10.png" alt="profile" className={styles.profile} />
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className={styles.content}>
        <h1 className={styles.title}>Dashboard</h1>

        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <img src="/assets/images/S1.png" className={styles.searchIcon} alt="" />
          <input
            type="text"
            placeholder="Search for ticket"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${filter === "all" ? styles.activeTab : ""}`}
            onClick={() => setFilter("all")}
          >
            <img src="/assets/images/S2.png" alt="" />
            All Tickets
          </button>

          <button
            className={`${styles.tab} ${filter === "resolved" ? styles.activeTab : ""}`}
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </button>

          <button
            className={`${styles.tab} ${filter === "unresolved" ? styles.activeTab : ""}`}
            onClick={() => setFilter("unresolved")}
          >
            Unresolved
          </button>
        </div>

        {/* Not Found */}
        {notFound ? (
          <p className={styles.notFound}>Ticket not found</p>
        ) : filtered.length === 0 ? (
          <p className={styles.empty}>No tickets found...</p>
        ) : (
          <div className={styles.ticketList}>
            {filtered.map((ticket) => {
              const isResolved = ticket.status === "resolved";

              return (
                <div className={styles.ticketCard} key={ticket._id}>
                  <div className={styles.cardHeader}>
                    <div className={styles.titleRow}>
                      <img src="/assets/images/D2.png" className={styles.ticketIcon} alt="" />

                      <span className={styles.ticketId}>Ticket# {ticket.ticketId}</span>
                    </div>

                    <span className={styles.time}>
                      {ticket.updatedAt
                        ? new Date(ticket.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </span>
                  </div>

                  {/* MESSAGE */}
                  <p className={styles.message}>
                  {isResolved
                  ? "Ticket has been resolved!"
                  : ticket.lastMessage?.trim()
                  ? ticket.lastMessage
                  : "No messages"}
                  </p>


                  <div className={styles.divider}></div>

                  {/* USER INFO */}
                  <div className={styles.userRow}>
                    <img src="/assets/images/D3.png" className={styles.avatar} alt="user" />
                    <div>
                      <p className={styles.userName}>{ticket.userName}</p>
                      <p className={styles.userPhone}>{ticket.phone}</p>
                      <p className={styles.userEmail}>{ticket.email}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
