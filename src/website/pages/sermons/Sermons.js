import React from "react";
import SermonList from "./sermonscomponents/SermonList";

function Sermons() {
  return (
    <div className="sermons-page">
      <style>{`
        .sermons-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 3.5rem;
        }
        .sermons-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }
        .sermons-eyebrow {
          margin: 0 0 0.7rem;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c9a227;
        }
        .sermons-title {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.1;
          color: #1f2d3d;
        }
        .sermons-rule {
          width: 64px;
          height: 3px;
          margin: 1rem auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #c9a227, #e3c964);
        }
        .sermons-sub {
          margin: 1rem auto 0;
          max-width: 520px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #5b6879;
        }
        @media (max-width: 640px) {
          .sermons-page { padding: 2rem 1rem 3rem; }
        }
      `}</style>

      <header className="sermons-header">
        <p className="sermons-eyebrow">LISTEN &amp; GROW</p>
        <h1 className="sermons-title">Sermons</h1>
        <div className="sermons-rule" aria-hidden="true" />
        <p className="sermons-sub">
          Catch up on recent messages, watch the full service, and take the
          notes with you.
        </p>
      </header>

      <SermonList />
    </div>
  );
}

export default Sermons;