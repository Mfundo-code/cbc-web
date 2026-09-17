import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const items = [
  "Bible Studies — weekly, all ages welcome",
  "Discipleship Classes — foundational teaching for new believers",
  "Small Groups — meet midweek in homes across the city",
];

function FaithBuilders() {
  return (
    <div>
      <p style={styles.intro}>
        Grow deeper in your walk with God through teaching, discipleship, and community.
      </p>
      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item} style={styles.item}>
            <FaCheckCircle style={styles.itemIcon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  intro: { color: "#5c6b7a", lineHeight: 1.6, margin: "0 0 1.2rem" },
  list: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem" },
  item: { display: "flex", alignItems: "flex-start", gap: "0.7rem", color: "#2c3a48", lineHeight: 1.5 },
  itemIcon: { color: "#c9a227", marginTop: "0.2rem", flexShrink: 0 },
};

export default FaithBuilders;