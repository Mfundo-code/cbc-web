import React from "react";
import ProgramsOffered from "./seminarycomponents/ProgramsOffered";
import Leadership from "./seminarycomponents/Leadership";
import Enrollment from "./seminarycomponents/Enrollment";
import Portal from "./seminarycomponents/Portal";

function Seminary() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Seminary</h1>
      <ProgramsOffered />
      <Leadership />
      <Enrollment />
      <Portal />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default Seminary;
