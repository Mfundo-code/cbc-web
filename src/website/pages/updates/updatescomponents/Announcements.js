import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

const PAGE_SIZE = 3;

function Announcements() {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [askedId, setAskedId] = useState(null);
  const [question, setQuestion] = useState("");
  const [sentId, setSentId] = useState(null);

  useEffect(() => {
    getAnnouncements()
      .then((res) => setItems(res.data.results || res.data))
      .catch(() => setItems([]));
  }, []);

  const visibleItems = showAll ? items : items.slice(0, PAGE_SIZE);

  const handleAskSubmit = (e, id) => {
    e.preventDefault();
    console.log(`Question about announcement ${id}:`, question);
    setSentId(id);
    setQuestion("");
  };

  if (items.length === 0) return null;

  return (
    <section style={styles.section}>
      <div style={styles.intro}>
        <h2 style={styles.heading}>Announcements</h2>
        <p style={styles.subtext}>Word from the church office.</p>
      </div>

      <div style={styles.list}>
        {visibleItems.map((a) => (
          <div key={a.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{a.title}</h3>
            <p style={styles.text}>{a.description}</p>
            {a.file && (
              <FileViewerLink file={a.file} style={styles.attachmentBtn}>
                View attachment
              </FileViewerLink>
            )}

            <div style={styles.askZone}>
              {sentId === a.id ? (
                <p style={styles.success}>Thanks — we'll get back to you soon!</p>
              ) : askedId === a.id ? (
                <form onSubmit={(e) => handleAskSubmit(e, a.id)} style={styles.form}>
                  <input
                    style={styles.input}
                    placeholder="Type your question…"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    autoFocus
                    required
                  />
                  <div style={styles.formActions}>
                    <button
                      type="button"
                      style={styles.cancelBtn}
                      onClick={() => {
                        setAskedId(null);
                        setQuestion("");
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" style={styles.sendBtn}>
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                <button style={styles.askBtn} onClick={() => setAskedId(a.id)}>
                  Ask a question about this
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length > PAGE_SIZE && (
        <div style={styles.seeAllWrap}>
          <button style={styles.seeAllBtn} onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show less" : `See all announcements (${items.length})`}
          </button>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {},
  intro: { textAlign: "center", marginBottom: "1.75rem" },
  heading: { color: "#1f2d3d", margin: "0 0 0.5rem", fontSize: "1.6rem" },
  subtext: { color: "#8a95a1", fontSize: "0.92rem" },

  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "12px",
    padding: "1.4rem 1.5rem",
    boxShadow: "0 4px 14px rgba(31,45,61,0.04)",
  },
  cardTitle: { margin: "0 0 0.4rem", color: "#1f2d3d", fontSize: "1.05rem" },
  text: { margin: "0 0 0.7rem", color: "#51606f", lineHeight: 1.6 },

  attachmentBtn: {
    display: "inline-block",
    backgroundColor: "#1f2d3d",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1.1rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: 600,
    textDecoration: "none",
  },

  askZone: {
    marginTop: "0.9rem",
    paddingTop: "0.9rem",
    borderTop: "1px solid #eceff2",
  },

  askBtn: {
    backgroundColor: "#fff",
    color: "#1f5da0",
    border: "1.5px solid #c7d6e6",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
  },

  form: { display: "flex", flexDirection: "column", gap: "0.55rem", maxWidth: "420px" },
  input: {
    padding: "0.65rem 0.85rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontFamily: "inherit",
  },
  formActions: { display: "flex", justifyContent: "flex-end", gap: "0.5rem" },
  cancelBtn: {
    background: "none",
    border: "none",
    color: "#8a95a1",
    fontSize: "0.82rem",
    padding: "0.4rem 0.7rem",
    cursor: "pointer",
  },
  sendBtn: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.5rem 1.2rem",
    borderRadius: "18px",
    fontSize: "0.82rem",
    fontWeight: 700,
    cursor: "pointer",
  },

  success: { color: "#1f7a3d", fontSize: "0.88rem", margin: 0 },

  seeAllWrap: { display: "flex", justifyContent: "center", marginTop: "1.75rem" },
  seeAllBtn: {
    backgroundColor: "#fff",
    color: "#1f2d3d",
    border: "1.5px solid #c9a227",
    padding: "0.65rem 1.6rem",
    borderRadius: "24px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default Announcements;