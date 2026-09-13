import React, { useEffect, useState } from "react";
import { getLeadership } from "../../../../global/api";

function Leadership() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeadership("church")
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const leaders = members.filter((m) => !/deacon/i.test(m.position));
  const deacons = members.filter((m) => /deacon/i.test(m.position));

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Leadership</h2>
      {loading && <p style={styles.text}>Loading...</p>}

      {leaders.length > 0 && (
        <>
          <h3 style={styles.subheading}>Leaders</h3>
          <div style={styles.grid}>
            {leaders.map((m) => (
              <div key={m.id} style={styles.card}>
                {m.image && <img src={m.image} alt={m.name} style={styles.photo} />}
                <h4 style={styles.name}>{m.name}</h4>
                <p style={styles.position}>{m.position}</p>
                <p style={styles.text}>{m.bio}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {deacons.length > 0 && (
        <>
          <h3 style={styles.subheading}>Deacons</h3>
          <div style={styles.grid}>
            {deacons.map((m) => (
              <div key={m.id} style={styles.card}>
                {m.image && <img src={m.image} alt={m.name} style={styles.photo} />}
                <h4 style={styles.name}>{m.name}</h4>
                <p style={styles.text}>{m.bio}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <p style={styles.text}>
        Want to reach our leadership team? Email{" "}
        <a href="mailto:info@christbaptist.org" style={styles.link}>
          info@christbaptist.org
        </a>
        .
      </p>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  subheading: { color: "#1f2d3d", marginTop: "1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.2rem",
  },
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
  },
  photo: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "0.5rem",
  },
  name: { margin: "0.3rem 0 0 0", color: "#1f2d3d" },
  position: { margin: "0 0 0.4rem 0", fontSize: "0.85rem", color: "#c9a227" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
  link: { color: "#1f5da0" },
};

export default Leadership;
