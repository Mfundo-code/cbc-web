import React from "react";
import { Link } from "react-router-dom";

function Portal() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Student / Admin Portal</h2>
      <p style={styles.text}>
        Already enrolled or an administrator? Sign in to manage your account.
      </p>
      <Link to="/admin" style={styles.button}>
        Sign In
      </Link>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  text: { color: "#444", marginBottom: "1rem" },
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
