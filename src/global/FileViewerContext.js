import React, { createContext, useCallback, useContext, useRef, useState } from "react";

/**
 * A single in-app media viewer shared by the whole site. Wrap the app once
 * with <FileViewerProvider> (done in App.js) and any component can call:
 *   - useFileViewer().openFile(url, title, isBlob)   → documents (PDF/docx)
 *   - useFileViewer().openVideo(youtubeUrl, title)   → YouTube sermons
 * Both render in the same modal, inline in the page — nothing opens a new tab.
 */

const FileViewerContext = createContext(null);

function extractYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtube-nocookie.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const match = u.pathname.match(/\/(embed|live|shorts)\/([^/?]+)/);
      if (match) return match[2];
    }
  } catch {
    // not a valid URL, fall through
  }
  return null;
}

// Suppresses the browser's built-in PDF viewer toolbar (print, rotate,
// save/download icons) so the modal reads as a plain, read-only viewer.
// Chrome/Edge honor these hash params; Firefox ignores unknown ones
// harmlessly and still renders the PDF normally.
function toReadOnlyPdfUrl(url) {
  return `${url}#toolbar=0&navpanes=0&statusbar=0`;
}

export function FileViewerProvider({ children }) {
  const [content, setContent] = useState(null); // { kind, url, rawUrl, title, isBlob, originalUrl }
  const currentBlobUrl = useRef(null);

  const openFile = useCallback((url, title = "Document", isBlob = false) => {
    if (isBlob) currentBlobUrl.current = url;
    setContent({
      kind: "document",
      url: toReadOnlyPdfUrl(url),
      rawUrl: url,
      title,
      isBlob,
    });
  }, []);

  const openVideo = useCallback((youtubeUrl, title = "Sermon") => {
    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      // Not a recognizable YouTube link — fall back to opening it normally.
      window.open(youtubeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setContent({
      kind: "video",
      url: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
      title,
      originalUrl: youtubeUrl,
    });
  }, []);

  const closeFile = useCallback(() => {
    if (currentBlobUrl.current) {
      URL.revokeObjectURL(currentBlobUrl.current);
      currentBlobUrl.current = null;
    }
    setContent(null);
  }, []);

  return (
    <FileViewerContext.Provider value={{ openFile, openVideo, closeFile }}>
      {children}
      {content && <ViewerModal content={content} onClose={closeFile} />}
    </FileViewerContext.Provider>
  );
}

export function useFileViewer() {
  const ctx = useContext(FileViewerContext);
  if (!ctx) throw new Error("useFileViewer must be used within a FileViewerProvider");
  return ctx;
}

function ViewerModal({ content, onClose }) {
  const isVideo = content.kind === "video";

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ ...styles.panel, ...(isVideo ? styles.panelVideo : {}) }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h3 style={styles.title}>{content.title}</h3>
          <div style={styles.headerActions}>
            {isVideo ? (
              <a
                href={content.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.downloadLink}
              >
                Open on YouTube
              </a>
            ) : (
              <a
                href={content.rawUrl}
                download={content.isBlob ? `${content.title}.pdf` : undefined}
                target={content.isBlob ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={styles.downloadLink}
              >
                Download
              </a>
            )}
            <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </div>

        {isVideo ? (
          <div style={styles.videoWrap}>
            <iframe
              title={content.title}
              src={content.url}
              style={styles.videoIframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <iframe title={content.title} src={content.url} style={styles.iframe} />
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 32, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 300,
    padding: "2rem 1rem",
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "min(900px, 100%)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  panelVideo: {
    height: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.9rem 1.2rem",
    borderBottom: "1px solid #e7eaee",
  },
  title: { margin: 0, fontSize: "1.05rem", color: "#1f2d3d" },
  headerActions: { display: "flex", alignItems: "center", gap: "1rem" },
  downloadLink: { color: "#1f5da0", fontSize: "0.85rem", textDecoration: "none" },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.6rem",
    lineHeight: 1,
    cursor: "pointer",
    color: "#8a95a1",
  },
  iframe: { flex: 1, width: "100%", border: "none" },
  videoWrap: { position: "relative", width: "100%", paddingTop: "56.25%" /* 16:9 */ },
  videoIframe: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" },
};