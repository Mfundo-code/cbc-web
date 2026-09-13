import React from "react";
import FileViewerLink from "../../../../global/FileViewerLink";
import YouTubeEmbedLink from "../../../../global/YouTubeEmbedLink";

/** Pull a YouTube video ID out of common URL formats. */
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/** Format an ISO date into something readable. */
function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SermonCard({ sermon }) {
  const dateLabel = formatDate(sermon.date_preached);
  const videoId = getYouTubeId(sermon.youtube_link);

  const speakerInitials = (sermon.speaker || "?")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="sc-card">
      <style>{`
        .sc-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e7ebef;
          border-radius: 14px;
          padding: 1.5rem 1.6rem 1.5rem 1.75rem;
          box-shadow: 0 2px 10px rgba(31,45,61,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          overflow: hidden;
        }
        .sc-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #c9a227 0%, #e3c964 100%);
        }
        .sc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(31,45,61,0.10);
          border-color: #e3d8b0;
        }

        /* ---------- Header ---------- */
        .sc-header { margin-bottom: 0.85rem; }

        .sc-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 11px 4px 9px;
          border-radius: 999px;
          background: #fbf3df;
          color: #8a6d12;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.7rem;
        }
        .sc-date svg { color: #c9a227; }

        .sc-title {
          margin: 0 0 0.55rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(1.15rem, 2.4vw, 1.5rem);
          font-weight: 800;
          letter-spacing: -0.4px;
          line-height: 1.25;
          color: #1f2d3d;
        }

        .sc-speaker {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sc-avatar {
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1f2d3d 0%, #35455a 100%);
          color: #f5d976;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          box-shadow: 0 3px 8px rgba(31,45,61,0.18);
        }
        .sc-speaker-name {
          font-size: 0.88rem;
          color: #5b6879;
          font-weight: 600;
        }
        .sc-speaker-name span {
          color: #8a95a1;
          font-weight: 500;
        }

        /* ---------- Description ---------- */
        .sc-desc {
          margin: 0.9rem 0 1.1rem;
          color: #4a5563;
          font-size: 0.92rem;
          line-height: 1.65;
        }

        /* ---------- Actions row ---------- */
        .sc-actions {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          margin-top: 1rem;
        }

        /* Buttons column */
        .sc-btn-col {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          flex: 1 1 auto;
          min-width: 0;
        }

        .sc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.7rem 1.1rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
                      background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .sc-btn:hover { transform: translateY(-2px); }
        .sc-btn:active { transform: translateY(0); }

        .sc-btn-primary {
          background: linear-gradient(135deg, #c9a227 0%, #dab63a 100%);
          color: #1f2d3d;
          box-shadow: 0 4px 12px rgba(201,162,39,0.28);
        }
        .sc-btn-primary:hover {
          box-shadow: 0 10px 22px rgba(201,162,39,0.42);
        }

        .sc-btn-outline {
          background: #ffffff;
          color: #1f2d3d;
          border-color: #d7dce2;
        }
        .sc-btn-outline:hover {
          background: #1f2d3d;
          color: #f5d976;
          border-color: #1f2d3d;
          box-shadow: 0 10px 22px rgba(31,45,61,0.22);
        }

        /* Video preview — always playing */
        .sc-preview {
          flex: 0 0 210px;
          width: 210px;
          aspect-ratio: 16 / 9;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background: #1f2d3d;
          box-shadow: 0 6px 18px rgba(31,45,61,0.18);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .sc-preview:hover {
          transform: translateY(-2px) scale(1.015);
          box-shadow: 0 14px 28px rgba(31,45,61,0.28);
        }

        .sc-embed {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        /* No-video placeholder */
        .sc-preview-placeholder {
          background: #f5f7f9;
          border: 1px dashed #d7dce2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8a95a1;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .sc-preview-placeholder:hover {
          transform: none;
          box-shadow: 0 6px 18px rgba(31,45,61,0.08);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 640px) {
          .sc-card { padding: 1.25rem 1.1rem 1.25rem 1.3rem; }
          .sc-actions { flex-direction: column; }
          .sc-preview {
            flex: 0 0 auto;
            width: 100%;
            order: -1;
          }
          .sc-btn-col { width: 100%; }
        }
      `}</style>

      {/* Header: date, title, speaker */}
      <header className="sc-header">
        {dateLabel && (
          <div className="sc-date">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {dateLabel}
          </div>
        )}

        <h3 className="sc-title">{sermon.title}</h3>

        {sermon.speaker && (
          <div className="sc-speaker">
            <div className="sc-avatar" aria-hidden="true">
              {speakerInitials}
            </div>
            <div className="sc-speaker-name">
              {sermon.speaker}
              {sermon.description ? <span> · Sermon</span> : null}
            </div>
          </div>
        )}
      </header>

      {/* Description */}
      {sermon.description && <p className="sc-desc">{sermon.description}</p>}

      {/* Actions: buttons + always-playing video preview */}
      <div className="sc-actions">
        <div className="sc-btn-col">
          {sermon.youtube_link && (
            <YouTubeEmbedLink
              url={sermon.youtube_link}
              title={sermon.title}
              className="sc-btn sc-btn-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
              </svg>
              Watch
            </YouTubeEmbedLink>
          )}

          {sermon.pdf && (
            <FileViewerLink file={sermon.pdf} className="sc-btn sc-btn-outline">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              Sermon Notes (PDF)
            </FileViewerLink>
          )}
        </div>

        {/* Auto-playing inline video preview */}
        {videoId ? (
          <div className="sc-preview">
            <iframe
              className="sc-embed"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="sc-preview sc-preview-placeholder" aria-hidden="true">
            No Video
          </div>
        )}
      </div>
    </article>
  );
}

export default SermonCard;