import React, { useEffect, useState } from "react";
import { getBeliefs } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function BeliefDocuments() {
  const [docs, setDocs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    getBeliefs()
      .then((res) => {
        const data = res.data.results || res.data;
        setDocs(data.filter((b) => b.pdf));
      })
      .catch(() => setDocs([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="bd-section">
      <style>{`
        @keyframes bd-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .bd-section { position: relative; }

        .bd-hero {
          position: relative;
          background-image: url("https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80");
          background-size: cover;
          background-position: center;
          padding: 72px 40px;
          overflow: hidden;
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
        .bd-headline {
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 800;
          color: #F2F2EE;
          line-height: 1.1;
          letter-spacing: -1.2px;
          margin: 0 0 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
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

        /* Documents reveal band */
        .bd-docs-band {
          max-height: 0;
          overflow: hidden;
          background: #f5f7f9;
          transition: max-height 0.5s ease;
        }
        .bd-docs-band.is-open { max-height: 900px; }
        .bd-docs-inner {
          max-width: 780px;
          margin: 0 auto;
          padding: 48px 40px;
        }
        .bd-docs-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1f2d3d;
          font-size: 1.35rem;
          margin: 0 0 1.2rem;
          text-align: center;
        }
        .bd-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .bd-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #fff;
          border: 1px solid #e3e7ec;
          border-left: 4px solid #c9a227;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bd-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(31,45,61,0.08);
        }
        .bd-doc-icon {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #fbf3df;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a227;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
        .bd-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
          text-decoration: none;
        }
        .bd-doc-title {
          color: #1f2d3d;
          font-weight: 700;
          font-size: 0.98rem;
        }
        .bd-doc-ext {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #8a95a1;
          text-transform: uppercase;
        }
        .bd-text {
          color: #444;
          font-size: 0.9rem;
          line-height: 1.6;
          text-align: center;
          margin: 0;
        }

        @media (max-width: 768px) {
          .bd-hero { padding: 52px 22px; }
          .bd-container { flex-direction: column; text-align: center; }
          .bd-left { text-align: center; }
          .bd-subcopy { margin-left: auto; margin-right: auto; }
          .bd-docs-inner { padding: 36px 22px; }
        }
      `}</style>

      <div className="bd-hero">
        <div className="bd-overlay" aria-hidden="true" />

        <div className="bd-container">
          <div className="bd-left">
            <p className="bd-eyebrow">WHAT WE BELIEVE</p>
            <h2 className="bd-headline">Our Beliefs</h2>
            <p className="bd-subcopy">
              The convictions that shape our <strong>worship</strong>, our{" "}
              <strong>teaching</strong>, and the way we{" "}
              <strong>serve our community</strong>.
            </p>
          </div>

          <div className="bd-right">
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
            <p className="bd-cta-note">Statement of faith &amp; church documents</p>
          </div>
        </div>
      </div>

      <div className={`bd-docs-band ${open ? "is-open" : ""}`}>
        <div className="bd-docs-inner">
          {!loaded ? (
            <p className="bd-text">Loading documents...</p>
          ) : docs.length === 0 ? (
            <p className="bd-text">No documents available yet.</p>
          ) : (
            <ul className="bd-list">
              {docs.map((doc) => (
                <li key={doc.id} className="bd-item">
                  <span className="bd-doc-icon" aria-hidden="true">
                    PDF
                  </span>
                  <FileViewerLink file={doc.pdf} style={{ textDecoration: "none" }}>
                    <span className="bd-link">
                      <span className="bd-doc-title">{doc.title}</span>
                      <span className="bd-doc-ext">View →</span>
                    </span>
                  </FileViewerLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default BeliefDocuments;