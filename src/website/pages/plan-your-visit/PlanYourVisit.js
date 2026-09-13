import React from "react";
import WhatToExpect from "./pyvcomponents/WhatToExpect";
import ServiceTimesDirections from "./pyvcomponents/ServiceTimesDirections";
import ParkingKidsPrograms from "./pyvcomponents/ParkingKidsPrograms";
import VisitingForm from "./pyvcomponents/VisitingForm";

function PlanYourVisit() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Plan Your Visit</h1>
      <WhatToExpect />
      <ServiceTimesDirections />
      <ParkingKidsPrograms />
      <VisitingForm />
    </div>
  );
}

const styles = {
  page: { maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default PlanYourVisit;
