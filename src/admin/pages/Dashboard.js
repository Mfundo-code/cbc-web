import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCounselingRequests,
  getQuestions,
  getEnrollmentSubmissions,
  getVisitRequests,
  getSermons,
  getEvents,
} from "../../global/api";
import { useAuth } from "../context/AuthContext";

const listOf = (res) => res.data.results || res.data;
// The backend doesn't have server-side status filtering on these
// endpoints, so the "new"/"pending" counts below are filtered client-side
// against whatever the first page returns (PAGE_SIZE=20 by default).
function Dashboard() {
  const { username } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCounselingRequests(),
      getQuestions(),
      getEnrollmentSubmissions(),
      getVisitRequests(),
      getSermons(),
      getEvents("upcoming"),
    ])
      .then(([counseling, questions, enrollments, visits, sermons, events]) => {
        setStats({
          newCounseling: listOf(counseling).filter((r) => r.status === "new").length,
          newQuestions: listOf(questions).filter((q) => q.status === "new").length,
          pendingEnrollments: listOf(enrollments).filter((s) => s.status === "pending").length,
          visits: listOf(visits).length,
          sermons: listOf(sermons).length,
          upcomingEvents: listOf(events).length,
        });
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const needsAttention = [
    { label: "New counseling requests", value: stats?.newCounseling, to: "/admin/counseling-requests" },
    { label: "Unanswered questions", value: stats?.newQuestions, to: "/admin/questions" },
    { label: "Pending enrollment applications", value: stats?.pendingEnrollments, to: "/admin/enrollment-submissions" },
  ];

  const overview = [
    { label: "Sermons published", value: stats?.sermons, to: "/admin/sermons" },
    { label: "Upcoming events", value: stats?.upcomingEvents, to: "/admin/events" },
    { label: "Visit requests on file", value: stats?.visits, to: "/admin/visits" },
  ];

  return (
    <div>
      <p style={styles.greeting}>Welcome back, {username || "Admin"}.</p>

      <h2 style={styles.sectionTitle}>Needs attention</h2>
      <div style={styles.grid}>
        {needsAttention.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} highlight={card.value > 0} />
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Content overview</h2>
      <div style={styles.grid}>
        {overview.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, to, loading, highlight }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.card,
        ...(highlight ? styles.cardHighlight : {}),
      }}
    >
      <span style={styles.cardValue}>{loading ? "…" : value ?? "—"}</span>
      <span style={styles.cardLabel}>{label}</span>
    </Link>
  );
}

const styles = {
  greeting: { color: "#51606f", fontSize: "0.95rem", margin: "0 0 1.5rem" },
  sectionTitle: { color: "#1f2d3d", fontSize: "1rem", margin: "0 0 0.8rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "10px",
    padding: "1.25rem 1.4rem",
    textDecoration: "none",
  },
  cardHighlight: { borderColor: "#c9a227", boxShadow: "0 0 0 1px #c9a227 inset" },
  cardValue: { fontSize: "1.8rem", fontWeight: 700, color: "#1f2d3d" },
  cardLabel: { fontSize: "0.88rem", color: "#51606f" },
};

export default Dashboard;
