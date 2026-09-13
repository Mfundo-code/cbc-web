import React from "react";
import BeliefDocuments from "./aboutcomponents/BeliefDocuments";
import Leadership from "./aboutcomponents/Leadership";

function About() {
  return (
    <div style={styles.page}>
      <BeliefDocuments />
      <Leadership />
    </div>
  );
}

const styles = {
  page: { width: "100%" },
};

export default About;