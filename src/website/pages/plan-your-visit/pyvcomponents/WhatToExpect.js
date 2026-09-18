import React from "react";

function WhatToExpect() {
  return (
    <section style={styles.section}>
      <div style={styles.card}>
        <span style={styles.eyebrow}>Welcome</span>
        <h2 style={styles.heading}>What to Expect</h2>
        <p style={styles.text}>
          You'll be welcomed by friendly faces, uplifting worship, and a practical message
          from the Bible. Come as you are — there's no dress code, just an open heart.
        </p>
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
  heading: { color: "#1f2d3d", margin: "0 0 0.6rem", fontSize: "1.25rem" },
  text: { color: "#51606f", lineHeight: 1.7, margin: 0 },
};

export default WhatToExpect;