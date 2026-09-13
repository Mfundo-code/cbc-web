import React from "react";
import { Link } from "react-router-dom";

const items = [
  { title: "About Us", desc: "Our beliefs and leadership.", to: "/about" },
  { title: "Events", desc: "See what's coming up next.", to: "/updates" },
  { title: "Seminary", desc: "Programs and enrollment.", to: "/seminary" },
  { title: "Give Online", desc: "Support the ministry.", to: "/donate" },
];

function Highlights() {
  return (
    <section style={styles.section}>
      <div style={styles.grid}>
        {items.map((item) => (
          <Link to={item.to} key={item.title} style={styles.card}>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardDesc}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "3rem 1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    display: "block",
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1.5rem",
    textDecoration: "none",
    color: "#222",
    border: "1px solid #e3e7eb",
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    color: "#1f2d3d",
  },
  cardDesc: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default Highlights;
