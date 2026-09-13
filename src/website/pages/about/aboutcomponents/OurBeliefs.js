import React, { useEffect, useState } from "react";
import { getBeliefs } from "../../../../global/api";

function OurBeliefs() {
  const [beliefs, setBeliefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBeliefs()
      .then((res) => setBeliefs(res.data.results || res.data))
      .catch(() => setError("Could not load our beliefs right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Our Beliefs</h2>
      {loading && <p style={styles.text}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.list}>
        {beliefs.map((belief) => (
          <div key={belief.id} style={styles.item}>
            <h3 style={styles.itemTitle}>{belief.title}</h3>
            <p style={styles.text}>{belief.description}</p>
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
  itemTitle: { margin: "0 0 0.3rem 0", color: "#1f2d3d" },
  text: { margin: 0, color: "#444", lineHeight: 1.6 },
  error: { color: "#a33" },
};

export default OurBeliefs;
