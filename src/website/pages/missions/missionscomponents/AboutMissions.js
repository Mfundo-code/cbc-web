import React, { useEffect, useState } from "react";
import { getMissionDocuments } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function AboutMissions() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getMissionDocuments()
      .then((res) => setDocs(res.data.results || res.data))
      .catch(() => setDocs([]));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>About Our Missions</h2>
      <div style={styles.list}>
        {docs.map((doc) => (
          <div key={doc.id} style={styles.item}>
            <h3 style={styles.itemTitle}>{doc.doc_type_display || doc.title}</h3>
            <p style={styles.text}>{doc.description}</p>
            <FileViewerLink file={doc.file} style={styles.link}>
              Read More
            </FileViewerLink>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  item: { borderLeft: "3px solid #c9a227", paddingLeft: "1rem" },
  itemTitle: { margin: "0 0 0.3rem", color: "#1f2d3d" },
  text: { margin: "0 0 0.3rem", color: "#444", lineHeight: 1.6 },
  link: { color: "#1f5da0", fontSize: "0.9rem" },
};

export default AboutMissions;
