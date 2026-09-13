import React from "react";

function ServiceTimesDirections() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Service Times &amp; Directions</h2>
      <ul style={styles.list}>
        <li>Sunday Worship: 9:00 AM &amp; 11:00 AM</li>
        <li>Wednesday Bible Study: 6:30 PM</li>
      </ul>
      <p style={styles.text}>123 Church Street, Pretoria, Gauteng</p>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
  text: { color: "#444" },
};

export default ServiceTimesDirections;
