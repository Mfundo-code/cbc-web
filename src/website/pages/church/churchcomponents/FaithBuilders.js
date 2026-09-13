import React from "react";

function FaithBuilders() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Faith Builders</h3>
      <ul style={styles.list}>
        <li>Bible Studies — weekly, all ages welcome</li>
        <li>Discipleship Classes — foundational teaching for new believers</li>
        <li>Small Groups — meet midweek in homes across the city</li>
      </ul>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
};

export default FaithBuilders;
