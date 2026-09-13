import React, { useEffect, useState } from "react";
import { getPrograms } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function ProgramsOffered() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrograms()
      .then((res) => setPrograms(res.data.results || res.data))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Programs Offered</h2>
      {loading && <p style={styles.text}>Loading programs...</p>}
      <div style={styles.grid}>
        {programs.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.image && <img src={p.image} alt={p.title} style={styles.image} />}
            <h3 style={styles.cardTitle}>{p.title}</h3>
            {p.duration && <p style={styles.duration}>{p.duration}</p>}
            <p style={styles.text}>{p.description}</p>
            {p.document && (
              <FileViewerLink file={p.document} style={styles.link}>
                View Curriculum / Brochure
              </FileViewerLink>
            )}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.2rem",
  },
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1rem",
  },
  image: { width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" },
  cardTitle: { color: "#1f2d3d", margin: "0.6rem 0 0.2rem" },
  duration: { color: "#c9a227", fontSize: "0.85rem", margin: "0 0 0.4rem" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
  link: { color: "#1f5da0", fontSize: "0.85rem" },
};

export default ProgramsOffered;
