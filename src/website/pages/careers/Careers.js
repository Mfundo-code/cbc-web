import React from "react";
import JobList from "./careerscomponents/JobList";

function Careers() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Careers</h1>
      <p style={styles.intro}>
        We're always looking for people who love God and want to serve our church, seminary, and
        mission work. Browse our current openings below and apply directly.
      </p>
      <JobList />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "0.6rem" },
  intro: { color: "#444", marginBottom: "1.5rem", lineHeight: 1.6, maxWidth: "640px" },
};

export default Careers;