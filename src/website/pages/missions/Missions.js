import React from "react";
import AboutMissions from "./missionscomponents/AboutMissions";
import Partners from "./missionscomponents/Partners";
import ActiveMissions from "./missionscomponents/ActiveMissions";

function Missions() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Missions</h1>
      <AboutMissions />
      <Partners />
      <ActiveMissions />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
};

export default Missions;
