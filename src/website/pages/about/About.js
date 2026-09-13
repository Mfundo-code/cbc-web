import React from "react";
import OurBeliefs from "./aboutcomponents/OurBeliefs";
import BeliefDocuments from "./aboutcomponents/BeliefDocuments";
import Leadership from "./aboutcomponents/Leadership";

function About() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>About Us</h1>
      <OurBeliefs />
      <BeliefDocuments />
      <Leadership />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default About;
