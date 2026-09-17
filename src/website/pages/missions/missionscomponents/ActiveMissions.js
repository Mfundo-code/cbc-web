import React, { useEffect, useState } from "react";
import { getActiveMissions } from "../../../../global/api";

function ActiveMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    getActiveMissions()
      .then((res) => {
        const data = res.data.results || res.data;
        setMissions(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setMissions([]))
      .finally(() => setLoading(false));
  }, []);

  const current = missions.find((m) => m.id === selectedId) || missions[0];
  const others = missions.filter((m) => m.id !== selectedId);

  const selectMission = (id) => {
    setSelectedId(id);
    setDetailsOpen(false);
    setPickerOpen(false);
  };

  return (
    <section className="acm-section">
      <style>{`
        .acm-section { display: flex; flex-direction: column; }

        .acm-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 1.4rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(1.4rem, 2.6vw, 1.8rem);
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #1f2d3d;
        }
        .acm-heading::before {
          content: "";
          width: 6px;
          height: 26px;
          border-radius: 999px;
          background: linear-gradient(180deg, #c9a227, #e3c964);
        }

        /* ---------- Featured card ---------- */
        .acm-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e7ebef;
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(31,45,61,0.04);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .acm-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #c9a227 0%, #e3c964 100%);
          z-index: 2;
        }
        .acm-card.is-open {
          border-color: #e3d8b0;
          box-shadow: 0 16px 34px rgba(31,45,61,0.10);
        }

        .acm-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.15rem 0.9rem 1.4rem;
          cursor: pointer;
          user-select: none;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font: inherit;
          color: inherit;
        }
        .acm-head:focus-visible {
          outline: 2px solid #c9a227;
          outline-offset: -3px;
          border-radius: 14px;
        }

        .acm-thumb {
          flex: 0 0 auto;
          width: 68px;
          height: 68px;
          border-radius: 10px;
          overflow: hidden;
          background: #f5f7f9;
          border: 1px solid #e7ebef;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .acm-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .acm-thumb-placeholder {
          color: #8a95a1;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .acm-head-text {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .acm-title {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.3px;
          line-height: 1.3;
          color: #1f2d3d;
        }

        .acm-status-inline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a6d12;
        }
        .acm-status-inline::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a227;
          box-shadow: 0 0 0 3px rgba(201,162,39,0.22);
        }

        .acm-toggle {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          background: #1f2d3d;
          color: #f5d976;
          border: 1.5px solid #1f2d3d;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .acm-toggle:hover {
          background: #c9a227;
          color: #1f2d3d;
          border-color: #c9a227;
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(201,162,39,0.35);
        }
        .acm-toggle svg { transition: transform 0.3s ease; }
        .acm-card.is-open .acm-toggle svg { transform: rotate(180deg); }

        /* ---------- Expandable body ---------- */
        .acm-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s ease;
        }
        .acm-card.is-open .acm-body { max-height: 700px; }

        .acm-body-inner {
          padding: 0.35rem 1.4rem 1.4rem 1.4rem;
          border-top: 1px dashed #e7ebef;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .acm-body-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .acm-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: #fbf3df;
          color: #8a6d12;
        }
        .acm-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a227;
          box-shadow: 0 0 0 3px rgba(201,162,39,0.25);
        }

        .acm-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0;
          color: #6b7684;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .acm-location svg { color: #c9a227; flex-shrink: 0; }

        .acm-desc {
          margin: 0;
          color: #4a5563;
          font-size: 0.93rem;
          line-height: 1.7;
        }

        /* ---------- View other missions ---------- */
        .acm-more-row { margin-top: 1rem; }
        .acm-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1.1rem;
          border-radius: 8px;
          background: transparent;
          color: #1f2d3d;
          border: 1.5px solid #1f2d3d;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .acm-more-btn:hover { background: #1f2d3d; color: #f5d976; }
        .acm-more-btn:focus-visible { outline: 2px solid #c9a227; outline-offset: 2px; }
        .acm-more-btn svg { transition: transform 0.3s ease; }
        .acm-more-btn[aria-expanded="true"] svg { transform: rotate(180deg); }

        .acm-picker {
          margin-top: 0.8rem;
          border: 1px solid #e7ebef;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }
        .acm-picker-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          width: 100%;
          padding: 0.7rem 1rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid #eef1f4;
          cursor: pointer;
          text-align: left;
          font: inherit;
          color: inherit;
        }
        .acm-picker-item:last-child { border-bottom: none; }
        .acm-picker-item:hover { background: #fbf3df; }
        .acm-picker-item:focus-visible { outline: 2px solid #c9a227; outline-offset: -2px; }
        .acm-picker-thumb {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          background: #f5f7f9;
          border: 1px solid #e7ebef;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .acm-picker-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .acm-picker-name { font-size: 0.92rem; font-weight: 700; color: #1f2d3d; }
        .acm-picker-status {
          margin-left: auto;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a6d12;
        }

        /* ---------- Skeleton ---------- */
        @keyframes acm-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .acm-skeleton {
          background: #fff;
          border: 1px solid #e7ebef;
          border-radius: 14px;
          padding: 0.9rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .acm-skel-thumb {
          width: 68px;
          height: 68px;
          border-radius: 10px;
          flex: 0 0 auto;
          background: linear-gradient(90deg, #eef1f4 0%, #e2e7ec 50%, #eef1f4 100%);
          background-size: 400px 100%;
          animation: acm-shimmer 1.3s linear infinite;
        }
        .acm-skel-lines { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
        .acm-skel-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #eef1f4 0%, #e2e7ec 50%, #eef1f4 100%);
          background-size: 400px 100%;
          animation: acm-shimmer 1.3s linear infinite;
        }
        .acm-skel-line.w-60 { width: 60%; }
        .acm-skel-line.w-30 { width: 30%; }

        .acm-empty {
          text-align: center;
          padding: 2.5rem 1rem;
          border-radius: 12px;
          background: #f5f7f9;
          border: 1px dashed #d7dce2;
          color: #6b7684;
          font-size: 0.92rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .acm-toggle, .acm-toggle svg, .acm-more-btn, .acm-more-btn svg, .acm-card, .acm-body {
            transition: none !important;
          }
          .acm-skel-thumb, .acm-skel-line { animation: none; }
        }

        @media (max-width: 560px) {
          .acm-toggle span.acm-toggle-label { display: none; }
          .acm-toggle { padding: 0.55rem 0.7rem; }
          .acm-thumb { width: 56px; height: 56px; }
          .acm-title { font-size: 1rem; }
        }
      `}</style>

      <h2 className="acm-heading">Active Missions</h2>

      {loading ? (
        <div className="acm-skeleton" aria-busy="true">
          <div className="acm-skel-thumb" />
          <div className="acm-skel-lines">
            <div className="acm-skel-line w-60" />
            <div className="acm-skel-line w-30" />
          </div>
        </div>
      ) : missions.length === 0 ? (
        <div className="acm-empty">No active missions right now. Check back soon.</div>
      ) : (
        <>
          <article className={`acm-card${detailsOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="acm-head"
              onClick={() => setDetailsOpen((o) => !o)}
              aria-expanded={detailsOpen}
              aria-controls="acm-body-current"
            >
              <div className="acm-thumb" aria-hidden="true">
                {current.image ? (
                  <img src={current.image} alt="" />
                ) : (
                  <span className="acm-thumb-placeholder">No Img</span>
                )}
              </div>

              <div className="acm-head-text">
                <h3 className="acm-title">{current.name}</h3>
                {(current.status_display || current.status) && (
                  <span className="acm-status-inline">
                    {current.status_display || current.status}
                  </span>
                )}
              </div>

              <span className="acm-toggle">
                <span className="acm-toggle-label">
                  {detailsOpen ? "View Less" : "View More"}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              className="acm-body"
              id="acm-body-current"
              role="region"
              aria-hidden={!detailsOpen}
            >
              <div className="acm-body-inner">
                <div className="acm-body-top">
                  {(current.status_display || current.status) && (
                    <span className="acm-badge">
                      {current.status_display || current.status}
                    </span>
                  )}
                  {current.location && (
                    <p className="acm-location">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {current.location}
                    </p>
                  )}
                </div>
                {current.description && (
                  <p className="acm-desc">{current.description}</p>
                )}
              </div>
            </div>
          </article>

          {others.length > 0 && (
            <div className="acm-more-row">
              <button
                type="button"
                className="acm-more-btn"
                onClick={() => setPickerOpen((o) => !o)}
                aria-expanded={pickerOpen}
              >
                {pickerOpen ? "Hide Other Missions" : `View Other Missions (${others.length})`}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {pickerOpen && (
                <div className="acm-picker" role="listbox" aria-label="Other active missions">
                  {others.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      className="acm-picker-item"
                      role="option"
                      onClick={() => selectMission(m.id)}
                    >
                      <span className="acm-picker-thumb" aria-hidden="true">
                        {m.image ? (
                          <img src={m.image} alt="" />
                        ) : (
                          <span className="acm-thumb-placeholder">No Img</span>
                        )}
                      </span>
                      <span className="acm-picker-name">{m.name}</span>
                      {(m.status_display || m.status) && (
                        <span className="acm-picker-status">
                          {m.status_display || m.status}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ActiveMissions;