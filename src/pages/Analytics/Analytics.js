import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useAnalytics from "../../hooks/useAnalytics";
import { useNavigate } from "react-router-dom";
import styles from "./Analytics.module.css";

export default function Analytics() {
  const navigate = useNavigate();
  const { data } = useAnalytics();

  const lineRef = useRef(null);
  const circleRef = useRef(null);

  const totalChats = data?.totalChats ?? 122;
  const resolvedPercent = data?.resolvedPercent ?? 80;
  const avgReply = data?.avgReplyTimeSec ?? 0;

  useEffect(() => {
    if (!lineRef.current || !circleRef.current) return;

    if (lineRef.current.chart) lineRef.current.chart.destroy();
    if (circleRef.current.chart) circleRef.current.chart.destroy();

    lineRef.current.chart = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: [
          "Week 1","Week 2","Week 3","Week 4","Week 5",
          "Week 6","Week 7","Week 8","Week 9","Week 10",
        ],
        datasets: [
          {
            data: [12, 8, 15, 9, 13, 6, 11, 9, 17, 18],
            borderColor: "#00D907",
            backgroundColor: "#00D907",
            borderWidth: 3,
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: "#fff",
            tension: 0.45,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#000",
            bodyColor: "#fff",
            displayColors: false,
            callbacks: {
              title: () => "Chats",
              label: (ctx) => ctx.parsed.y,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5 },
            grid: { color: "#eaeaea" },
          },
          x: { grid: { display: false } },
        },
      },
    });

    circleRef.current.chart = new Chart(circleRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [resolvedPercent, 100 - resolvedPercent],
            backgroundColor: ["#00D907", "#E5E5E5"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "72%",
        plugins: { legend: false, tooltip: false },
      },
    });
  }, [resolvedPercent]);

  return (
    <div className={styles.wrapper}>
      
      {/* ---------- Sidebar ---------- */}
      <aside className={styles.sidebar}>
  <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />

  <div className={styles.sidebarMenu}>
    <button className={styles.iconItem} onClick={() => navigate("/dashboard")}>
      <img src="/assets/images/L4.png" alt="Dashboard" />
    </button>

    <button className={styles.iconItem} onClick={() => navigate("/tickets")}>
      <img src="/assets/images/L5.png" alt="Tickets" />
    </button>

    {/* ✅ L6 is ACTIVE now */}
    <div className={`${styles.iconItem} ${styles.active}`}>
      <img src="/assets/images/L6.png" alt="Analytics" />
    </div>

    {/* L7 is normal now (not active) */}
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


      {/* ---------- Main Page Body ---------- */}
      <main className={styles.main}>
        <h2 className={styles.heading}>Analytics</h2>

        {/* Missed Chats */}
        <section className={styles.block}>
          <h3 className={styles.titleGreen}>Missed Chats</h3>
          <div className={styles.chartBox}><canvas ref={lineRef} /></div>
        </section>

        {/* Average reply time */}
        <section className={styles.row}>
          <div>
            <h3 className={styles.titleGreen}>Average Reply time</h3>
            <p className={styles.desc}>
              For highest customer satisfaction rates you should aim to reply within 15 seconds or less. Quick responses will get you more conversationis, help you earn customers trust and make more sales.


            </p>
          </div>
          <h3 className={styles.value}>{avgReply} secs</h3>
        </section>

        {/* Resolved Tickets */}
        <section className={styles.row}>
          <div>
            <h3 className={styles.titleGreen}>Resolved Tickets</h3>
            <p className={styles.desc}>
              A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.

            </p>
          </div>
          <div className={styles.circleBox}>
            <canvas ref={circleRef}></canvas>
            <span className={styles.circleText}>{resolvedPercent}%</span>
          </div>
        </section>

        {/* Total chats */}
        <section className={styles.row}>
          <div>
            <h3 className={styles.title}>Total Chats</h3>
            <p className={styles.desc}>This metric Shows the total number of chats for all Channels for the selected the selected period</p>
          </div>
          <h3 className={styles.value}>{totalChats} Chats</h3>
        </section>
      </main>
    </div>
  );
}
