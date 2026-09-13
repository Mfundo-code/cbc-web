import React from "react";

function WhatToExpect() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>What to Expect</h2>
      <p style={styles.text}>
        You'll be welcomed by friendly faces, uplifting worship, and a
        practical message from the Bible. Come as you are — there's no dress
        code, just an open heart.
      </p>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  text: { color: "#444", lineHeight: 1.6 },
};

export default WhatToExpect;
