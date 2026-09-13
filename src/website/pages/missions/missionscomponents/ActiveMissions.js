import React, { useEffect, useState } from "react";
import { getActiveMissions } from "../../../../global/api";

function ActiveMissions() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getActiveMissions()
      .then((res) => setMissions(res.data.results || res.data))
      .catch(() => setMissions([]));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Active Missions</h2>
      <div style={styles.grid}>
        {missions.map((m) => (
          <div key={m.id} style={styles.card}>
            {m.image && <img src={m.image} alt={m.name} style={styles.image} />}
            <h3 style={styles.cardTitle}>{m.name}</h3>
            <p style={styles.location}>{m.location}</p>
            <span style={styles.badge}>{m.status_display || m.status}</span>
            <p style={styles.text}>{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.2rem",
  },
  card: { backgroundColor: "#f5f7f9", borderRadius: "8px", padding: "1rem" },
  image: { width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px" },
  cardTitle: { color: "#1f2d3d", margin: "0.6rem 0 0.1rem" },
  location: { color: "#777", fontSize: "0.85rem", margin: "0 0 0.4rem" },
  badge: {
    display: "inline-block",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    fontSize: "0.75rem",
    padding: "0.15rem 0.5rem",
    borderRadius: "4px",
    marginBottom: "0.4rem",
  },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
};

export default ActiveMissions;
