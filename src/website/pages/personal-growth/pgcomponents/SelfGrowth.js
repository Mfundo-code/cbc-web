import React, { useEffect, useState } from "react";
import { getBiblicalResources } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function SelfGrowth() {
  const [devotionals, setDevotionals] = useState([]);
  const [revelations, setRevelations] = useState([]);

  useEffect(() => {
    getBiblicalResources({ resource_type: "devotional" })
      .then((res) => setDevotionals(res.data.results || res.data))
      .catch(() => setDevotionals([]));
    getBiblicalResources({ resource_type: "revelation" })
      .then((res) => setRevelations(res.data.results || res.data))
      .catch(() => setRevelations([]));
  }, []);

  const renderGrid = (items) => (
    <div style={styles.grid}>
      {items.map((item) => (
        <FileViewerLink key={item.id} file={item.file} style={styles.resourceCard}>
          <span style={styles.resourceIcon}>📄</span>
          <span style={styles.resourceInfo}>
            <span style={styles.resourceTitle}>{item.title}</span>
            {item.description && <span style={styles.resourceDesc}>{item.description}</span>}
          </span>
        </FileViewerLink>
      ))}
    </div>
  );

  if (devotionals.length === 0 && revelations.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <div style={styles.intro}>
        <h2 style={styles.heading}>Self Growth</h2>
        <p style={styles.subtext}>
          Resources to help you grow in your walk each day read, reflect, and go deeper.
        </p>
      </div>

      {devotionals.length > 0 && (
        <>
          <h3 style={styles.subheading}>Devotional PDFs</h3>
          {renderGrid(devotionals)}
        </>
      )}

      {revelations.length > 0 && (
        <>
          <h3 style={styles.subheading}>Revelations</h3>
          {renderGrid(revelations)}
        </>
      )}
    </section>
  );
}

const styles = {
  section: {},
  intro: { textAlign: "center", marginBottom: "1.75rem" },
  heading: { color: "#1f2d3d", margin: "0 0 0.6rem", fontSize: "1.6rem" },
  subtext: { color: "#51606f", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto" },

  subheading: { color: "#1f2d3d", margin: "1.5rem 0 0.9rem", fontSize: "1.05rem" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "0.9rem",
  },
  resourceCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "10px",
    padding: "1rem 1.1rem",
    textDecoration: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  resourceIcon: { fontSize: "1.3rem", lineHeight: 1 },
  resourceInfo: { display: "flex", flexDirection: "column", gap: "0.25rem" },
  resourceTitle: { color: "#1f2d3d", fontWeight: 700, fontSize: "0.95rem" },
  resourceDesc: { color: "#8a95a1", fontSize: "0.82rem", lineHeight: 1.4 },
};

export default SelfGrowth;