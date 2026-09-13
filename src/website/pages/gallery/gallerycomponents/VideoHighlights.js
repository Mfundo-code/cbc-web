import React from "react";

// NOTE: video highlight links currently live on the Sermon model
// (youtube_link). This section can be swapped to a dedicated
// "highlights" playlist once one exists on the backend.
function VideoHighlights() {
  return (
    <div style={styles.panel}>
      <p style={styles.text}>
        Catch our video highlights on the{" "}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          church YouTube channel
        </a>
        .
      </p>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  text: { color: "#444" },
  link: { color: "#1f5da0" },
};

export default VideoHighlights;
