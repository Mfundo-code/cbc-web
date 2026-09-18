import React from "react";
import Announcements from "./updatescomponents/Announcements";
import Events from "./updatescomponents/Events";

function Updates() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Updates</h1>
        <p style={styles.heroText}>
          Stay in the loop-announcements from the church office and everything happening
          on the calendar, from upcoming gatherings to recaps of what we've been up to.
        </p>
      </div>

      <div style={styles.content}>
        <Announcements />
        <div style={styles.divider} />
        <Events />
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#fbfbfc" },
  hero: {
    backgroundColor: "#1f2d3d",
    backgroundImage: "radial-gradient(circle at 15% 20%, #2c3c4f 0%, #1f2d3d 65%)",
    padding: "3.5rem 1.5rem",
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "2.2rem",
    margin: "0 0 0.8rem",
  },
  heroText: {
    color: "#dce3ea",
    maxWidth: "620px",
    margin: "0 auto",
    lineHeight: 1.7,
    fontSize: "1rem",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "3rem 1.5rem 4rem",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e7eaee",
    margin: "3rem 0",
  },
};

export default Updates;