import React from "react";
import { useFileViewer } from "./FileViewerContext";

/**
 * Drop-in replacement for <a href={youtubeUrl} target="_blank">. Clicking
 * it plays the video inline in the app's viewer modal instead of
 * navigating to YouTube. Works with youtube.com/watch, youtu.be, /embed/,
 * /live/, and /shorts/ links.
 */
function YouTubeEmbedLink({ url, title, children, style, className }) {
  const { openVideo } = useFileViewer();

  if (!url) return null;

  const handleClick = (e) => {
    e.preventDefault();
    openVideo(url, title || "Sermon");
  };

  return (
    <a href={url} onClick={handleClick} style={style} className={className}>
      {children}
    </a>
  );
}

export default YouTubeEmbedLink;
