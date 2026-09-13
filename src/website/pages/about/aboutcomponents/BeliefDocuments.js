import React, { useEffect, useState } from "react";
import { getBeliefs } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function BeliefDocuments() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getBeliefs()
      .then((res) => {
        const data = res.data.results || res.data;
        setDocs(data.filter((b) => b.pdf));
      })
      .catch(() => setDocs([]));
  }, []);

  if (docs.length === 0) return null;

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>View Our Documents</h2>
      <ul style={styles.list}>
        {docs.map((doc) => (
          <li key={doc.id}>
            <FileViewerLink file={doc.pdf} style={styles.link}>
              {doc.title} (PDF)
            </FileViewerLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  list: { paddingLeft: "1.2rem", color: "#444" },
  link: { color: "#1f5da0" },
};

export default BeliefDocuments;
