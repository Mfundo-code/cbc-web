import React, { useEffect, useState } from "react";
import { getLeadership } from "../../../../global/api";

function Leadership() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getLeadership("college")
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setMembers([]));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Leadership</h2>
      <div style={styles.grid}>
        {members.map((m) => (
          <div key={m.id} style={styles.card}>
            {m.image && <img src={m.image} alt={m.name} style={styles.photo} />}
            <h4 style={styles.name}>{m.name}</h4>
            <p style={styles.position}>{m.position}</p>
            <p style={styles.text}>{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.2rem",
  },
  card: { backgroundColor: "#f5f7f9", borderRadius: "8px", padding: "1rem", textAlign: "center" },
  photo: { width: "90px", height: "90px", objectFit: "cover", borderRadius: "50%", marginBottom: "0.5rem" },
  name: { margin: "0.3rem 0 0", color: "#1f2d3d" },
  position: { margin: "0 0 0.4rem", fontSize: "0.85rem", color: "#c9a227" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
};

export default Leadership;
