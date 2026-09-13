import React from "react";
import FileViewerLink from "../../../../global/FileViewerLink";
import YouTubeEmbedLink from "../../../../global/YouTubeEmbedLink";

function SermonCard({ sermon }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{sermon.title}</h3>
      <p style={styles.meta}>
        {sermon.speaker} {sermon.date_preached ? `· ${sermon.date_preached}` : ""}
      </p>
      {sermon.description && <p style={styles.text}>{sermon.description}</p>}
      <div style={styles.links}>
        {sermon.youtube_link && (
          <YouTubeEmbedLink url={sermon.youtube_link} title={sermon.title} style={styles.link}>
            Watch on YouTube
          </YouTubeEmbedLink>
        )}
        {sermon.pdf && (
          <FileViewerLink file={sermon.pdf} style={styles.link}>
            Sermon Notes (PDF)
          </FileViewerLink>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1.2rem",
    marginBottom: "1rem",
  },
  title: { margin: "0 0 0.2rem", color: "#1f2d3d" },
  meta: { margin: "0 0 0.5rem", color: "#777", fontSize: "0.85rem" },
  text: { margin: "0 0 0.6rem", color: "#444", lineHeight: 1.5 },
  links: { display: "flex", gap: "1rem" },
  link: { color: "#1f5da0", fontSize: "0.9rem" },
};

export default SermonCard;
