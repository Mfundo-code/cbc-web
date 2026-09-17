import React, { useEffect, useState } from "react";
import { getPrograms } from "../../../../global/api";
import FileViewerLink from "../../../../global/FileViewerLink";

function ProgramsOffered() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrograms()
      .then((res) => setPrograms(res.data.results || res.data))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="po-section">
      <style>{`
        .po-section { margin-bottom: 2.5rem; }
        .po-heading { color: #1f2d3d; margin-bottom: 1rem; }
        .po-text { color: #444; font-size: 0.9rem; line-height: 1.5; }

        .po-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.2rem;
        }
        .po-card {
          background-color: #f5f7f9;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
        .po-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 6px;
        }
        .po-card-title { color: #1f2d3d; margin: 0.6rem 0 0.2rem; }
        .po-duration { color: #c9a227; font-size: 0.85rem; margin: 0 0 0.4rem; font-weight: 700; }
        .po-desc { color: #444; font-size: 0.9rem; line-height: 1.5; margin: 0 0 0.9rem; flex: 1; }

        .po-doc-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          border: 1.5px solid #c9a227;
          background: #fff;
          color: #1f2d3d;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease,
                      transform 0.2s ease, box-shadow 0.2s ease;
        }
        .po-doc-btn:hover {
          background: #c9a227;
          color: #1f2d3d;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(201,162,39,0.32);
        }
        .po-doc-btn svg { flex-shrink: 0; }
      `}</style>

      <h2 className="po-heading">Programs Offered</h2>
      {loading && <p className="po-text">Loading programs...</p>}
      <div className="po-grid">
        {programs.map((p) => (
          <div key={p.id} className="po-card">
            {p.image && <img src={p.image} alt={p.title} className="po-image" />}
            <h3 className="po-card-title">{p.title}</h3>
            {p.duration && <p className="po-duration">{p.duration}</p>}
            <p className="po-desc">{p.description}</p>
            {p.document && (
              <FileViewerLink file={p.document} className="po-doc-btn">
                <svg
                  width="14"
                  height="14"
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
                View Curriculum / Brochure
              </FileViewerLink>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProgramsOffered;