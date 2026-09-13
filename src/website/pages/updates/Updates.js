import React from "react";
import Announcements from "./updatescomponents/Announcements";
import Events from "./updatescomponents/Events";

function Updates() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Updates</h1>
      <Announcements />
      <Events />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default Updates;
