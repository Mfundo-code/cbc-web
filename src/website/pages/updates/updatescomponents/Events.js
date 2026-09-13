import React, { useEffect, useState } from "react";
import { getEvents } from "../../../../global/api";

function Events() {
  const [when, setWhen] = useState("upcoming");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents(when)
      .then((res) => setEvents(res.data.results || res.data))
      .catch(() => setEvents([]));
  }, [when]);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Events</h2>
      <div style={styles.toggle}>
        <button
          style={{ ...styles.toggleBtn, ...(when === "upcoming" ? styles.toggleBtnActive : {}) }}
          onClick={() => setWhen("upcoming")}
        >
          Upcoming
        </button>
        <button
          style={{ ...styles.toggleBtn, ...(when === "past" ? styles.toggleBtnActive : {}) }}
          onClick={() => setWhen("past")}
        >
          Past (Recaps)
        </button>
      </div>

      <div style={styles.grid}>
        {events.map((ev) => (
          <div key={ev.id} style={styles.card}>
            {ev.cover_photo && <img src={ev.cover_photo} alt={ev.title} style={styles.image} />}
            <h3 style={styles.cardTitle}>{ev.title}</h3>
            <p style={styles.meta}>
              {new Date(ev.event_date).toLocaleString()} {ev.location ? `· ${ev.location}` : ""}
            </p>
            <p style={styles.text}>{ev.description}</p>
          </div>
        ))}
        {events.length === 0 && <p style={styles.text}>No events to show.</p>}
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  toggle: { display: "flex", gap: "0.5rem", marginBottom: "1rem" },
  toggleBtn: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "20px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  toggleBtnActive: { backgroundColor: "#1f2d3d", color: "#fff", borderColor: "#1f2d3d" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.2rem",
  },
  card: { backgroundColor: "#f5f7f9", borderRadius: "8px", padding: "1rem" },
  image: { width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px" },
  cardTitle: { color: "#1f2d3d", margin: "0.6rem 0 0.1rem" },
  meta: { color: "#777", fontSize: "0.8rem", margin: "0 0 0.4rem" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
};

export default Events;
