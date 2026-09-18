import React from "react";
import WhatToExpect from "./pyvcomponents/WhatToExpect";
import ServiceTimesDirections from "./pyvcomponents/ServiceTimesDirections";
import ParkingKidsPrograms from "./pyvcomponents/ParkingKidsPrograms";
import VisitingForm from "./pyvcomponents/VisitingForm";

function PlanYourVisit() {
  return (
    <div style={styles.page}>
      <div style={styles.titleBlock}>
        <h1 style={styles.title}>Plan Your Visit</h1>
        <p style={styles.subtitle}>
          Everything you need to know before you join us this Sunday.
        </p>
      </div>

      <WhatToExpect />
      <ServiceTimesDirections />
      <ParkingKidsPrograms />
      <VisitingForm />
    </div>
  );
}

const styles = {
  page: { maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 4rem" },
  titleBlock: {
    textAlign: "center",
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e7eaee",
  },
  title: { color: "#1f2d3d", margin: "0 0 0.5rem", fontSize: "2rem" },
  subtitle: { color: "#8a95a1", fontSize: "1rem", margin: 0 },
};

export default PlanYourVisit;