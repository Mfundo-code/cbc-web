import React from "react";
import BankDetails from "./donatecomponents/BankDetails";

function Donate() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Donate</h1>
      <p style={styles.intro}>
        Thank you for considering giving to support our church, seminary, and
        mission work.
      </p>
      <BankDetails />
    </div>
  );
}

const styles = {
  page: { maxWidth: "700px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "0.8rem" },
  intro: { color: "#444", marginBottom: "1.5rem", lineHeight: 1.6 },
};

export default Donate;
