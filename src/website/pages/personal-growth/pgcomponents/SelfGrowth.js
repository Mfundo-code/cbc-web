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

  const renderList = (items) => (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <FileViewerLink file={item.file} style={styles.link}>
            {item.title}
          </FileViewerLink>
          {item.description && <span style={styles.desc}> — {item.description}</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Self Growth</h2>

      <h3 style={styles.subheading}>Devotional PDFs</h3>
      {devotionals.length > 0 ? renderList(devotionals) : <p style={styles.text}>Coming soon.</p>}

      <h3 style={styles.subheading}>Revelations</h3>
      {revelations.length > 0 ? renderList(revelations) : <p style={styles.text}>Coming soon.</p>}
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.8rem" },
  subheading: { color: "#1f2d3d", marginTop: "1rem" },
  list: { paddingLeft: "1.2rem", color: "#444", lineHeight: 1.8 },
  link: { color: "#1f5da0" },
  desc: { color: "#777", fontSize: "0.85rem" },
  text: { color: "#777" },
};

export default SelfGrowth;
