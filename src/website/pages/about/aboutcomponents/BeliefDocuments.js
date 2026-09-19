import React, { useEffect, useState } from "react";
import { getBeliefs } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

const rotatingPhrases = [
  "Our Beliefs",
  "Our Doctrine",
  "Our Convictions",
  "Our Foundation",
  "Our Faith",
];

function BeliefDocuments() {
  const [docs, setDocs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getBeliefs()
      .then((res) => {
        const data = res.data.results || res.data;
        setDocs(data.filter((b) => b.pdf));
      })
      .catch(() => setDocs([]))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
        setVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bd-section">
      <style>{`
        @keyframes bd-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes bd-glow-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
        @keyframes bd-drop-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bd-section { position: relative; }

        .bd-hero {
          position: relative;
          background-image: url("https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80");
          background-size: cover;
          background-position: center;
          padding: 72px 40px;
          overflow: visible;
        }
        .bd-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(31,45,61,0.86) 0%, rgba(10,16,24,0.82) 100%);
          z-index: 1;
        }
        .bd-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .bd-left { flex: 1 1 420px; }
        .bd-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #c9a227;
          opacity: 0.95;
          margin: 0 0 16px;
        }
        .bd-headline-static {
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 800;
          color: #F2F2EE;
          line-height: 1.1;
          letter-spacing: -1.2px;
          margin: 0 0 2px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .bd-rotating-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 60px;
          margin-bottom: 16px;
        }
        .bd-rotating-phrase {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          color: #dce3ea;
          display: inline-block;
          border-bottom: 3px solid #c9a227;
          padding-bottom: 2px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .bd-cursor {
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 300;
          color: #c9a227;
          opacity: 0.6;
          animation: bd-glow-pulse 0.9s ease-in-out infinite;
          line-height: 1;
        }
        .bd-subcopy {
          font-size: 15px;
          color: #c8cfd8;
          line-height: 1.7;
          margin: 0;
          max-width: 540px;
        }
        .bd-subcopy strong { color: #F2F2EE; font-weight: 700; }

        .bd-right {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .bd-btn-wrap {
          position: relative;
          display: inline-flex;
        }

        .bd-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 15px 36px;
          background: #c9a227;
          border: 2px solid #c9a227;
          border-radius: 6px;
          color: #1f2d3d;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.3px;
          white-space: nowrap;
          transition: all 0.25s ease;
          overflow: hidden;
          cursor: pointer;
        }
        .bd-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(201,162,39,0.45);
        }
        .bd-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          background-size: 400px 100%;
          animation: bd-shimmer 0.8s ease forwards;
          pointer-events: none;
        }
        .bd-cta-note {
          margin: 0;
          font-size: 11px;
          color: rgba(242,242,238,0.4);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-align: center;
        }

        /* Dropdown, anchored directly under the button, right-aligned to it */
        .bd-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 12px;
          width: 300px;
          max-height: 340px;
          overflow-y: auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.28);
          z-index: 30;
          animation: bd-drop-in 0.18s ease;
        }
        .bd-dropdown-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1f2d3d;
          font-size: 0.95rem;
          margin: 0;
          padding: 14px 16px 10px;
          border-bottom: 1px solid #eef1f4;
          position: sticky;
          top: 0;
          background: #fff;
        }
        .bd-dropdown-list {
          display: flex;
          flex-direction: column;
          padding: 6px;
        }
        .bd-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border-radius: 8px;
          padding: 8px 8px;
        }
        .bd-item:hover { background: #fbf3df; }
        .bd-doc-icon {
          flex: 0 0 auto;
          width: 32px;
          height: 32px;
          border-radius: 7px;
          background: #eef1f4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a227;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
        }
        .bd-item:hover .bd-doc-icon { background: #c9a227; color: #1f2d3d; }
        .bd-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 0.8rem;
          text-decoration: none;
        }
        .bd-doc-title {
          color: #1f2d3d;
          font-weight: 700;
          font-size: 0.86rem;
          line-height: 1.3;
        }
        .bd-doc-ext {
          flex-shrink: 0;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #8a95a1;
          text-transform: uppercase;
        }
        .bd-empty {
          color: #5c6b7a;
          font-size: 0.85rem;
          line-height: 1.6;
          text-align: center;
          margin: 0;
          padding: 18px 16px;
        }

        @media (max-width: 992px) {
          .bd-hero { padding: 60px 30px; }
          .bd-container { gap: 36px; }
        }

        @media (max-width: 768px) {
          .bd-hero { padding: 44px 22px; }
          .bd-container { flex-direction: column; text-align: center; gap: 22px; }
          .bd-left {
            flex: 1 1 auto;
            width: 100%;
            text-align: center;
          }
          .bd-rotating-wrap { justify-content: center; }
          .bd-subcopy { margin-left: auto; margin-right: auto; }
          .bd-right { width: 100%; }
          .bd-dropdown { right: 50%; transform: translateX(50%); }
        }

        @media (max-width: 480px) {
          .bd-hero { padding: 40px 16px; }
          .bd-headline-static,
          .bd-rotating-phrase,
          .bd-cursor {
            font-size: 26px;
          }
          .bd-rotating-wrap { min-height: 48px; }
          .bd-subcopy { font-size: 14px; }
          .bd-cta-btn { padding: 10px 24px; font-size: 13px; }
        }
      `}</style>

      <div className="bd-hero">
        <div className="bd-overlay" aria-hidden="true" />

        <div className="bd-container">
          <div className="bd-left">
            <p className="bd-eyebrow">WHAT WE BELIEVE</p>

            <h2 className="bd-headline-static">Discover</h2>
            <div className="bd-rotating-wrap">
              <span
                className="bd-rotating-phrase"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {rotatingPhrases[phraseIndex]}
              </span>
              <span className="bd-cursor">|</span>
            </div>

            <p className="bd-subcopy">
              The convictions that shape our <strong>worship</strong>, our{" "}
              <strong>teaching</strong>, and the way we{" "}
              <strong>serve our community</strong>.
            </p>
          </div>

          <div className="bd-right">
            <div className="bd-btn-wrap">
              <button
                type="button"
                className="bd-cta-btn"
                onClick={() => setOpen((o) => !o)}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                aria-expanded={open}
              >
                {btnHovered && <span className="bd-shimmer" aria-hidden="true" />}
                <span style={{ position: "relative", zIndex: 1 }}>
                  {open ? "Hide Our Documents" : "View Our Documents"}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    transition: "transform 0.3s ease",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {open && (
                <div className="bd-dropdown">
                  <p className="bd-dropdown-title">Our Documents</p>
                  {!loaded ? (
                    <p className="bd-empty">Loading documents...</p>
                  ) : docs.length === 0 ? (
                    <p className="bd-empty">No documents available yet.</p>
                  ) : (
                    <div className="bd-dropdown-list">
                      {docs.map((doc) => (
                        <div key={doc.id} className="bd-item">
                          <span className="bd-doc-icon" aria-hidden="true">
                            PDF
                          </span>
                          <FileViewerLink file={doc.pdf} style={{ textDecoration: "none", width: "100%" }}>
                            <span className="bd-link">
                              <span className="bd-doc-title">{doc.title}</span>
                              <span className="bd-doc-ext">View →</span>
                            </span>
                          </FileViewerLink>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="bd-cta-note">Statement of faith &amp; church documents</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeliefDocuments;