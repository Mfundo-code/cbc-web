import React from "react";
import Counseling from "./pgcomponents/Counseling";
import SelfGrowth from "./pgcomponents/SelfGrowth";
import GotQuestions from "./pgcomponents/GotQuestions";

function PersonalGrowth() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Personal Growth</h1>
        <p style={styles.heroText}>
          Wherever you are on your walk with God, we're here to help you take the next
          step — through prayerful counselling, resources for daily growth, and honest
          answers to the questions on your heart.
        </p>
      </div>

      <div style={styles.content}>
        <Counseling />
        <div style={styles.divider} />
        <SelfGrowth />
        <div style={styles.divider} />
        <GotQuestions />
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#fbfbfc" },
  hero: {
    backgroundColor: "#1f2d3d",
    backgroundImage: "radial-gradient(circle at 15% 20%, #2c3c4f 0%, #1f2d3d 65%)",
    padding: "3.5rem 1.5rem",
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "2.2rem",
    margin: "0 0 0.8rem",
  },
  heroText: {
    color: "#dce3ea",
    maxWidth: "620px",
    margin: "0 auto",
    lineHeight: 1.7,
    fontSize: "1rem",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "3rem 1.5rem 4rem",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e7eaee",
    margin: "3rem 0",
  },
};

export default PersonalGrowth;