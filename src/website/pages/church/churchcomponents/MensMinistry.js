import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const items = ["Weekly Bible studies", "Fellowship events throughout the year"];

function MensMinistry() {
  return (
    <div>
      <p style={styles.intro}>Sharpening one another through study, accountability, and fellowship.</p>
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

export default MensMinistry;