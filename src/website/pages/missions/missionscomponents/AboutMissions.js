import React, { useEffect, useState } from "react";
import { getMissionDocuments } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function AboutMissions() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMissionDocuments()
      .then((res) => setDocs(res.data.results || res.data))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="ms-section">
      <style>{`
        .ms-section { position: relative; }

        /* ---------- Hero ---------- */
        .ms-hero {
          background: #1f2d3d;
          padding: 60px 40px;
        }
        .ms-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .ms-left { flex: 1 1 420px; }
        .ms-headline {
          margin: 0 0 14px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          font-size: clamp(28px, 3.8vw, 42px);
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: #f2f2ee;
        }
        .ms-subcopy {
          margin: 0;
          max-width: 500px;
          font-size: 15px;
          line-height: 1.7;
          color: #c8cfd8;
        }

        .ms-toggle-btn {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          background: transparent;
          border: 1.5px solid #c9a227;
          border-radius: 4px;
          color: #e3c964;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2px;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .ms-toggle-btn:hover {
          background: #c9a227;
          color: #1f2d3d;
        }
        .ms-toggle-btn:focus-visible {
          outline: 2px solid #e3c964;
          outline-offset: 3px;
        }
        .ms-toggle-icon {
          transition: transform 0.3s ease;
        }
        .ms-toggle-btn[aria-expanded="true"] .ms-toggle-icon {
          transform: rotate(180deg);
        }

        /* ---------- Reveal band ---------- */
        .ms-list-band {
          max-height: 0;
          overflow: hidden;
          background: #ffffff;
          transition: max-height 0.5s ease;
        }
        .ms-list-band.is-open { max-height: 1400px; }
        .ms-list-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 40px;
        }

        .ms-list {
          display: flex;
          flex-direction: column;
        }
        .ms-item {
          padding: 1.1rem 0;
          border-bottom: 1px solid #e7ebef;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .ms-item:first-child { padding-top: 0; }
        .ms-item:last-child { border-bottom: none; }

        .ms-item-title {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #1f2d3d;
          line-height: 1.3;
        }

        .ms-read-link {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1f2d3d;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .ms-read-link:hover {
          color: #8a6d12;
          border-color: #8a6d12;
        }
        .ms-read-link:focus-visible {
          outline: 2px solid #c9a227;
          outline-offset: 3px;
        }

        /* ---------- Skeleton ---------- */
        @keyframes ms-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .ms-skel-item {
          padding: 1.1rem 0;
          border-bottom: 1px solid #e7ebef;
        }
        .ms-skel-item:last-child { border-bottom: none; }
        .ms-skel-line {
          height: 12px;
          width: 45%;
          border-radius: 4px;
          background: linear-gradient(90deg, #eef1f4 0%, #e2e7ec 50%, #eef1f4 100%);
          background-size: 400px 100%;
          animation: ms-shimmer 1.3s linear infinite;
        }

        .ms-empty {
          text-align: center;
          padding: 2rem 1rem;
          color: #6b7684;
          font-size: 0.92rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .ms-toggle-btn, .ms-toggle-icon, .ms-read-link, .ms-list-band {
            transition: none !important;
          }
          .ms-skel-line { animation: none; }
        }

        @media (max-width: 768px) {
          .ms-hero { padding: 44px 22px; }
          .ms-hero-inner { flex-direction: column; text-align: center; }
          .ms-list-inner { padding: 32px 22px; }
        }
      `}</style>

      <div className="ms-hero">
        <div className="ms-hero-inner">
          <div className="ms-left">
            <h2 className="ms-headline">About Our Missions</h2>
            <p className="ms-subcopy">
              The teams and partners we support at home and around the
              world, and where you can read more about each one.
            </p>
          </div>

          <button
            type="button"
            className="ms-toggle-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? "Hide Mission Info" : "View Mission Info"}
            <svg
              className="ms-toggle-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`ms-list-band ${open ? "is-open" : ""}`}>
        <div className="ms-list-inner">
          {loading ? (
            <div className="ms-list" aria-busy="true">
              {[1, 2, 3].map((n) => (
                <div className="ms-skel-item" key={n}>
                  <div className="ms-skel-line" />
                </div>
              ))}
            </div>
          ) : docs.length === 0 ? (
            <div className="ms-empty">Mission information coming soon.</div>
          ) : (
            <div className="ms-list">
              {docs.map((doc) => (
                <div key={doc.id} className="ms-item">
                  <h3 className="ms-item-title">{doc.title}</h3>
                  <FileViewerLink file={doc.file} className="ms-read-link">
                    Read More
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </FileViewerLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutMissions;