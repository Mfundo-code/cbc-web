import React, { useEffect, useState } from "react";
import { getPartners } from "../../../../global/api";

function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners()
      .then((res) => setPartners(res.data.results || res.data))
      .catch(() => setPartners([]));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Our Partners</h2>
      <div style={styles.grid}>
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.website_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            {p.logo && <img src={p.logo} alt={p.name} style={styles.logo} />}
            <h4 style={styles.name}>{p.name}</h4>
          </a>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    textDecoration: "none",
    color: "#1f2d3d",
  },
  logo: { width: "60px", height: "60px", objectFit: "contain", marginBottom: "0.5rem" },
  name: { margin: 0, fontSize: "0.9rem" },
};

export default Partners;
