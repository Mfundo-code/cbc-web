import React from "react";

function Services() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Services</h3>
      <ul style={styles.list}>
        <li>Sunday Worship: 9:00 AM &amp; 11:00 AM</li>
        <li>What to Expect: casual dress, warm welcome, Bible-based teaching</li>
        <li>Livestream: available on our YouTube channel every Sunday</li>
      </ul>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
};

export default Services;
