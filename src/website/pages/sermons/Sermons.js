import React from "react";
import SermonList from "./sermonscomponents/SermonList";

function Sermons() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sermons</h1>
      <SermonList />
    </div>
  );
}

const styles = {
  page: { maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default Sermons;
