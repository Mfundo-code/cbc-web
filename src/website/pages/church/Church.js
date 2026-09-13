import React, { useState } from "react";
import Services from "./churchcomponents/Services";
import FaithBuilders from "./churchcomponents/FaithBuilders";
import YoungAdults from "./churchcomponents/YoungAdults";
import YouthMinistry from "./churchcomponents/YouthMinistry";
import WomensMinistry from "./churchcomponents/WomensMinistry";
import MensMinistry from "./churchcomponents/MensMinistry";

const tabs = [
  { key: "services", label: "Services", Component: Services },
  { key: "faith-builders", label: "Faith Builders", Component: FaithBuilders },
  { key: "young-adults", label: "Young Adults", Component: YoungAdults },
  { key: "youth", label: "Youth Ministry", Component: YouthMinistry },
  { key: "womens", label: "Women's Ministry", Component: WomensMinistry },
  { key: "mens", label: "Men's Ministry", Component: MensMinistry },
];

function Church() {
  const [active, setActive] = useState(tabs[0].key);
  const ActiveComponent = tabs.find((t) => t.key === active).Component;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Church</h1>
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            style={{
              ...styles.tabButton,
              ...(active === tab.key ? styles.tabButtonActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ActiveComponent />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  title: { color: "#1f2d3d", marginBottom: "1.5rem" },
  tabBar: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    borderBottom: "1px solid #e3e7eb",
    marginBottom: "1rem",
  },
  tabButton: {
    padding: "0.6rem 1rem",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#555",
    borderBottom: "3px solid transparent",
  },
  tabButtonActive: {
    color: "#1f2d3d",
    fontWeight: "bold",
    borderBottom: "3px solid #c9a227",
  },
};

export default Church;
