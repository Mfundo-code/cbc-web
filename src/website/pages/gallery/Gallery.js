import React, { useState } from "react";
import ByEvent from "./gallerycomponents/ByEvent";
import ByYear from "./gallerycomponents/ByYear";
import VideoHighlights from "./gallerycomponents/VideoHighlights";

const tabs = [
  { key: "event", label: "By Event", Component: ByEvent },
  { key: "year", label: "By Year", Component: ByYear },
  { key: "video", label: "Video Highlights", Component: VideoHighlights },
];

function Gallery() {
  const [active, setActive] = useState(tabs[0].key);
  const ActiveComponent = tabs.find((t) => t.key === active).Component;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Gallery</h1>
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
  page: { maxWidth: "1000px", margin: "0 auto", padding: "2.5rem 1.5rem" },
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

export default Gallery;
