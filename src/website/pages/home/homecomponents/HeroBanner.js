import React from "react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Welcome Home</h1>
      <p style={styles.subtitle}>
        A place to belong, grow in faith, and serve together.
      </p>
      <div style={styles.actions}>
        <Link to="/plan-your-visit" style={styles.primaryBtn}>
          Plan Your Visit
        </Link>
        <Link to="/sermons" style={styles.secondaryBtn}>
          Watch Sermons
        </Link>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    backgroundColor: "#1f2d3d",
    color: "#fff",
    padding: "5rem 1.5rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#dce3ea",
    marginBottom: "2rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  secondaryBtn: {
    border: "1px solid #fff",
    color: "#fff",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default HeroBanner;
