import React, { useEffect, useState } from "react";
import { getSermons } from "../../../../global/api";
import SermonCard from "./SermonCard";

function SermonList() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSermons()
      .then((res) => setSermons(res.data.results || res.data))
      .catch(() => setError("Could not load sermons right now."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.speaker || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="sl-section">
      <style>{`
        .sl-section { display: flex; flex-direction: column; gap: 1.25rem; }

        /* ---------- Search bar ---------- */
        .sl-search-wrap {
          position: relative;
          width: 100%;
        }
        .sl-search-icon {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          color: #8a95a1;
          pointer-events: none;
          transition: color 0.2s ease;
        }
        .sl-search {
          width: 100%;
          padding: 0.95rem 1rem 0.95rem 2.85rem;
          border: 1.5px solid #dfe4ea;
          border-radius: 10px;
          background: #fff;
          font-size: 0.95rem;
          color: #1f2d3d;
          outline: none;
          box-sizing: border-box;
          box-shadow: 0 2px 6px rgba(31,45,61,0.03);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .sl-search::placeholder { color: #a3adb8; }
        .sl-search:hover { border-color: #c9c2a4; }
        .sl-search:focus {
          border-color: #c9a227;
          box-shadow: 0 0 0 4px rgba(201,162,39,0.15);
        }
        .sl-search-wrap:focus-within .sl-search-icon { color: #c9a227; }

        /* ---------- Status messages ---------- */
        .sl-status {
          text-align: center;
          padding: 2.5rem 1rem;
          border-radius: 12px;
          background: #f5f7f9;
          border: 1px dashed #d7dce2;
        }
        .sl-status-text {
          margin: 0;
          color: #6b7684;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .sl-status-text strong { color: #1f2d3d; }
        .sl-error {
          color: #a33;
          background: #fdf3f3;
          border-color: #f0c9c9;
        }
        .sl-error .sl-status-text { color: #a33; }

        /* ---------- Loading skeleton ---------- */
        @keyframes sl-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .sl-skeleton {
          background: #f5f7f9;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          border: 1px solid #e7ebef;
        }
        .sl-skel-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #eef1f4 0%, #e2e7ec 50%, #eef1f4 100%);
          background-size: 400px 100%;
          animation: sl-shimmer 1.3s linear infinite;
        }
        .sl-skel-line.w-60 { width: 60%; }
        .sl-skel-line.w-30 { width: 30%; }
        .sl-skel-line.w-90 { width: 90%; }

        /* ---------- Result counter ---------- */
        .sl-count {
          margin: 0;
          font-size: 0.8rem;
          color: #8a95a1;
          letter-spacing: 0.3px;
          padding-left: 4px;
        }
        .sl-count strong { color: #1f2d3d; }

        /* ---------- Cards list ---------- */
        .sl-list { display: flex; flex-direction: column; gap: 1.25rem; }
      `}</style>

      {/* Search */}
      <div className="sl-search-wrap">
        <svg
          className="sl-search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          className="sl-search"
          type="text"
          placeholder="Search by title or speaker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search sermons"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="sl-list" aria-busy="true">
          {[1, 2, 3].map((n) => (
            <div className="sl-skeleton" key={n}>
              <div className="sl-skel-line w-30" />
              <div className="sl-skel-line w-60" />
              <div className="sl-skel-line w-90" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="sl-status sl-error">
          <p className="sl-status-text">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="sl-status">
          <p className="sl-status-text">
            {search ? (
              <>
                No sermons match <strong>&ldquo;{search}&rdquo;</strong>.<br />
                Try a different title or speaker name.
              </>
            ) : (
              <>No sermons available yet. Check back soon.</>
            )}
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="sl-count">
            Showing <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "sermon" : "sermons"}
          </p>
          <div className="sl-list">
            {filtered.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SermonList;