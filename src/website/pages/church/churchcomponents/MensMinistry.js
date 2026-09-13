import React from "react";

function MensMinistry() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Men's Ministry</h3>
      <ul style={styles.list}>
        <li>Weekly Bible studies</li>
        <li>Fellowship events throughout the year</li>
      </ul>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
};

export default MensMinistry;
