import React from "react";
import Counseling from "./pgcomponents/Counseling";
import SelfGrowth from "./pgcomponents/SelfGrowth";
import GotQuestions from "./pgcomponents/GotQuestions";

function PersonalGrowth() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Personal Growth</h1>
      <Counseling />
      <SelfGrowth />
      <GotQuestions />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default PersonalGrowth;
