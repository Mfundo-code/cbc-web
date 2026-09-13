import React from "react";
import { Link } from "react-router-dom";

function SeminaryApply() {
  return (
    <section style={styles.section}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Seminary Applications Are Open</h2>
        <p style={styles.text}>
          Grow in ministry and leadership through our seminary's programs. Whether you're
          exploring a calling or ready to take the next step, applications for the upcoming
          intake are open now.
        </p>
        <div style={styles.actions}>
          <Link to="/seminary" style={styles.primaryBtn}>
            Explore Programs &amp; Apply
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "3.5rem 1.5rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#1f2d3d",
    color: "#fff",
    borderRadius: "10px",
    padding: "4.5rem 2.5rem", // more top/bottom room -> pushes text down and makes card larger
    textAlign: "center",
  },
  heading: { margin: "0 0 0.75rem", fontSize: "1.6rem" },
  text: {
    margin: "0 auto 1.5rem",
    color: "#dce3ea",
    lineHeight: 1.6,
    maxWidth: "620px",
  },
  actions: {
    display: "flex",
    gap: "0.8rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    padding: "0.75rem 1.4rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.95rem",
  },
  secondaryBtn: {
    border: "1px solid #fff",
    color: "#fff",
    padding: "0.75rem 1.4rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
};

export default SeminaryApply;