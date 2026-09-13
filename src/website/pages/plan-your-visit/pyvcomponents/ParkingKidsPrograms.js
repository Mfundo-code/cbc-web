import React from "react";

function ParkingKidsPrograms() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Parking &amp; Kids' Programs</h2>
      <p style={styles.text}>
        Free on-site parking is available, with attendants to help direct
        you on busy Sundays. Our Kids' Church runs during both services for
        ages 3–12, in a safe and fun environment.
      </p>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  text: { color: "#444", lineHeight: 1.6 },
};

export default ParkingKidsPrograms;
