import React from "react";

function YouthMinistry() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Youth Ministry</h3>
      <p style={styles.text}>Led by our Youth Pastor for grades 7–12.</p>
      <ul style={styles.list}>
        <li>Services: Fridays, 6:00 PM</li>
        <li>Programs: camps, mentorship, and community outreach</li>
      </ul>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  text: { color: "#444" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
};

export default YouthMinistry;
