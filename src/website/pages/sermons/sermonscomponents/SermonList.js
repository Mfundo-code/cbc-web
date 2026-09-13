import React, { useEffect, useState } from "react";
import { getSermons } from "../../../../global/api";
import SermonCard from "./SermonCard";

function SermonList() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSermons()
      .then((res) => setSermons(res.data.results || res.data))
      .catch(() => setError("Could not load sermons right now."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.speaker || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={styles.section}>
      <input
        style={styles.search}
        placeholder="Search by title or speaker..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p style={styles.text}>Loading sermons...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && filtered.length === 0 && <p style={styles.text}>No sermons found.</p>}
      {filtered.map((sermon) => (
        <SermonCard key={sermon.id} sermon={sermon} />
      ))}
    </section>
  );
}

const styles = {
  section: {},
  search: {
    width: "100%",
    padding: "0.7rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    boxSizing: "border-box",
  },
  text: { color: "#444" },
  error: { color: "#a33" },
};

export default SermonList;
