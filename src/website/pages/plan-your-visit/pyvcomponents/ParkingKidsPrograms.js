import React from "react";

const services = [
  { name: "Sunday Worship", time: "9:00 AM & 11:00 AM" },
  { name: "Wednesday Bible Study", time: "6:30 PM" },
];

function ServiceTimesDirections() {
  return (
    <section style={styles.section}>
      <div style={styles.card}>
        <span style={styles.eyebrow}>When & Where</span>
        <h2 style={styles.heading}>Service Times &amp; Directions</h2>

        <div style={styles.scheduleList}>
          {services.map((s) => (
            <div key={s.name} style={styles.scheduleRow}>
              <span style={styles.scheduleName}>{s.name}</span>
              <span style={styles.scheduleTime}>{s.time}</span>
            </div>
          ))}
        </div>

        <div style={styles.addressRow}>
          <span style={styles.addressLabel}>Address</span>
          <span style={styles.addressText}>375 Marshall Street, Flora Park, Polokwane, 0699, Limpopo</span>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1.5rem" },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderLeft: "4px solid #c9a227",
    borderRadius: "10px",
    padding: "1.6rem 1.8rem",
    boxShadow: "0 4px 14px rgba(31,45,61,0.04)",
  },
  eyebrow: {
    display: "block",
    color: "#c9a227",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
  },
  heading: { color: "#1f2d3d", margin: "0 0 1.1rem", fontSize: "1.25rem" },

  scheduleList: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #eceff2",
  },
  scheduleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.85rem 1.1rem",
    backgroundColor: "#f9fafb",
  },
  scheduleName: { color: "#1f2d3d", fontWeight: 600, fontSize: "0.95rem" },
  scheduleTime: { color: "#1f5da0", fontWeight: 600, fontSize: "0.9rem" },

  addressRow: {
    marginTop: "1.2rem",
    paddingTop: "1.1rem",
    borderTop: "1px solid #eceff2",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  addressLabel: {
    color: "#8a95a1",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  addressText: { color: "#51606f", fontSize: "0.95rem" },
};

export default ServiceTimesDirections;