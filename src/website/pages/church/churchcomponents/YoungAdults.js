import React from "react";

function YoungAdults() {
  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Young Adults</h3>
      <p style={styles.text}>
        A community for young adults (18–30s) to connect, grow, and serve
        together through regular meet-ups and events.
      </p>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  heading: { color: "#1f2d3d" },
  text: { color: "#444", lineHeight: 1.6 },
};

export default YoungAdults;
