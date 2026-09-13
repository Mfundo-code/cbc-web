import React from "react";

function BankDetails() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Bank Account Details</h2>
      <div style={styles.card}>
        <p style={styles.row}>
          <strong>Account Name:</strong> Christ Baptist Church
        </p>
        <p style={styles.row}>
          <strong>Account Number:</strong> 0000000000
        </p>
        <p style={styles.row}>
          <strong>Bank / Branch:</strong> Example Bank, Pretoria Branch
        </p>
      </div>
      <p style={styles.text}>
        Questions about giving? Email{" "}
        <a href="mailto:giving@christbaptist.org" style={styles.link}>
          giving@christbaptist.org
        </a>
        .
      </p>
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1.2rem",
    marginBottom: "1rem",
  },
  row: { margin: "0.3rem 0", color: "#333" },
  text: { color: "#444" },
  link: { color: "#1f5da0" },
};

export default BankDetails;
