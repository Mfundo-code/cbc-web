import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function Announcements() {
  const [items, setItems] = useState([]);
  const [askedId, setAskedId] = useState(null);
  const [question, setQuestion] = useState("");
  const [sentId, setSentId] = useState(null);

  useEffect(() => {
    getAnnouncements()
      .then((res) => setItems(res.data.results || res.data))
      .catch(() => setItems([]));
  }, []);

  const handleAskSubmit = (e, id) => {
    e.preventDefault();
    console.log(`Question about announcement ${id}:`, question);
    setSentId(id);
    setQuestion("");
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Announcements</h2>
      <div style={styles.list}>
        {items.map((a) => (
          <div key={a.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{a.title}</h3>
            <p style={styles.text}>{a.description}</p>
            {a.file && (
              <FileViewerLink file={a.file} style={styles.link}>
                View Attachment
              </FileViewerLink>
            )}

            {sentId === a.id ? (
              <p style={styles.success}>Thanks — we'll get back to you soon!</p>
            ) : askedId === a.id ? (
              <form onSubmit={(e) => handleAskSubmit(e, a.id)} style={styles.form}>
                <input
                  style={styles.input}
                  placeholder="Your question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
                <button type="submit" style={styles.smallButton}>
                  Send
                </button>
              </form>
            ) : (
              <button style={styles.linkButton} onClick={() => setAskedId(a.id)}>
                Ask a question about this
              </button>
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
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: { backgroundColor: "#f5f7f9", borderRadius: "8px", padding: "1.1rem" },
  cardTitle: { margin: "0 0 0.3rem", color: "#1f2d3d" },
  text: { margin: "0 0 0.5rem", color: "#444", lineHeight: 1.5 },
  link: { color: "#1f5da0", fontSize: "0.85rem" },
  linkButton: {
    background: "none",
    border: "none",
    color: "#1f5da0",
    fontSize: "0.85rem",
    cursor: "pointer",
    padding: 0,
    marginTop: "0.4rem",
  },
  form: { display: "flex", gap: "0.5rem", marginTop: "0.5rem" },
  input: { flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" },
  smallButton: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.5rem 0.9rem",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: { color: "#1f7a3d", fontSize: "0.85rem", marginTop: "0.4rem" },
};

export default Announcements;
