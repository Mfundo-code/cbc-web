import React from "react";

function WomensMinistry() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Women's Ministry</h3>
      <ul style={styles.list}>
        <li>Monthly fellowship services</li>
        <li>Ongoing mentorship and support programs</li>
      </ul>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
};

export default WomensMinistry;
