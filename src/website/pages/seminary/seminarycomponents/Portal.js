import React from "react";
import { Link } from "react-router-dom";

function Portal() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Portal</h2>
      <Link to="/admin" style={styles.button}>
        Sign In
      </Link>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  button: {
    display: "inline-block",
    backgroundColor: "#1f2d3d",
    color: "#fff",
    padding: "0.7rem 1.4rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Portal;