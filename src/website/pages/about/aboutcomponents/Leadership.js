import React, { useEffect, useRef, useState } from "react";
import { getLeadership } from "../../../../global/api";

const PER_PAGE = 3;

function Leadership() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState(null); // "church" | "college"
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [bioMember, setBioMember] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef(null);
  const advertRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile we show 1 card per page instead of 3, so a resize needs a
  // page reset to avoid landing on an out-of-range page.
  useEffect(() => {
    setPage(0);
  }, [isMobile]);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setError(null);
    setPage(0);
    getLeadership(category)
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setError("Could not load leadership right now."))
      .finally(() => setLoading(false));
  }, [category]);

  // Once results have actually loaded, scroll down to reveal them.
  useEffect(() => {
    if (!loading && category && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, category, members]);

  // Close the dropdown if the user clicks outside of it.
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the bio modal on Escape.
  useEffect(() => {
    if (!bioMember) return;
    function handleKey(e) {
      if (e.key === "Escape") setBioMember(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [bioMember]);

  const handleSelect = (cat) => {
    setDropdownOpen(false);
    setCategory(cat);
  };

  // Hide / close the leadership panel and return the user to the top.
  const handleHide = () => {
    setCategory(null);
    setMembers([]);
    setError(null);
    setPage(0);
    setBioMember(null);
    setDropdownOpen(false);
    // Bring the user back up to the advert block.
    requestAnimationFrame(() => {
      advertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const perPage = isMobile ? 1 : PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(members.length / perPage));
  const visibleMembers = members.slice(page * perPage, page * perPage + perPage);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="ld-section">
      <style>{`
        .ld-section { margin-bottom: 2.5rem; }

        .ld-advert {
          background-color: #f5f7f9;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          scroll-margin-top: 80px;
        }
        .ld-heading { color: #1f2d3d; margin-bottom: 0.5rem; }
        .ld-text { color: #444; font-size: 0.9rem; line-height: 1.5; }

        .ld-dropdown-wrap {
          position: relative;
          display: inline-block;
          margin-top: 0.8rem;
        }
        .ld-btn {
          background-color: #c9a227;
          color: #1f2d3d;
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .ld-menu {
          position: absolute;
          top: calc(100% + 0.4rem);
          left: 50%;
          transform: translateX(-50%);
          background-color: #fff;
          border: 1px solid #c9a227;
          border-radius: 6px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
          overflow: hidden;
          z-index: 10;
          min-width: 200px;
        }
        .ld-menu-item {
          display: block;
          width: 100%;
          padding: 0.7rem 1rem;
          background: #fff;
          border: none;
          border-bottom: 1px solid #f0e4bd;
          color: #1f2d3d;
          font-size: 0.9rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
        }

        .ld-results { margin-top: 2rem; scroll-margin-top: 80px; }
        .ld-results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .ld-results-heading { color: #1f2d3d; margin: 0; }

        .ld-hide-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: transparent;
          border: 1px solid #c9a227;
          color: #1f2d3d;
          padding: 0.4rem 0.9rem;
          border-radius: 4px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .ld-hide-btn:hover { background-color: #c9a227; color: #1f2d3d; }

        .ld-carousel {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .ld-nav-btn {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background-color: #c9a227;
          color: #1f2d3d;
          font-size: 1.4rem;
          line-height: 1;
          font-weight: bold;
          cursor: pointer;
          margin-top: 60px;
        }
        .ld-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .ld-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ld-photo-frame {
          width: 140px;
          aspect-ratio: 3 / 4;
          background-color: #f5f7f9;
          border-radius: 6px;
          border: 1px solid #d7dce2;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ld-photo { width: 100%; height: 100%; object-fit: contain; }
        .ld-photo-placeholder { color: #8a95a1; font-size: 0.8rem; }
        .ld-card-info {
          margin-top: 0.7rem;
          text-align: center;
          width: 100%;
        }
        .ld-name { margin: 0 0 0.7rem 0; color: #1f2d3d; }
        .ld-bio-btn {
          background-color: #1f2d3d;
          border: none;
          color: #f5d976;
          padding: 0.4rem 0.9rem;
          border-radius: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }
        .ld-page-indicator {
          text-align: center;
          color: #8a95a1;
          font-size: 0.82rem;
          margin-top: 0.8rem;
        }
        .ld-error { color: #a33; }

        .ld-hide-row { display: flex; justify-content: center; margin-top: 1.2rem; }
        .ld-hide-btn-bottom {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background-color: #1f2d3d;
          border: 1px solid #1f2d3d;
          color: #f5d976;
          padding: 0.55rem 1.3rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
        }

        .ld-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .ld-modal {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.8rem;
          max-width: 420px;
          width: 100%;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          max-height: calc(100vh - 2rem);
          overflow-y: auto;
        }
        .ld-close-btn {
          position: absolute;
          top: 0.6rem;
          right: 0.8rem;
          background: none;
          border: none;
          font-size: 1.6rem;
          line-height: 1;
          color: #8a95a1;
          cursor: pointer;
        }
        .ld-modal-photo-frame {
          width: 180px;
          max-width: 100%;
          aspect-ratio: 3 / 4;
          background-color: #f5f7f9;
          border-radius: 6px;
          border: 1px solid #d7dce2;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ld-name-plate {
          margin-top: 1.1rem;
          width: 100%;
          padding: 0.9rem 1rem 0.2rem;
          text-align: center;
        }
        .ld-modal-name {
          margin: 0;
          color: #1f2d3d;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }
        .ld-position-ribbon {
          margin-top: 0.3rem;
          width: 100%;
          padding: 0.2rem 1rem;
          text-align: left;
        }
        .ld-modal-position {
          color: #1f2d3d;
          font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .ld-bio-panel {
          margin-top: 0.6rem;
          width: 100%;
          background-color: #fbf3df;
          border-radius: 8px;
          padding: 1.2rem 1.3rem 1rem;
          position: relative;
          text-align: left;
          box-sizing: border-box;
        }
        .ld-quote-mark {
          position: absolute;
          top: -0.6rem;
          left: 0.6rem;
          font-family: Georgia, serif;
          font-size: 3rem;
          color: #c9a227;
          opacity: 0.5;
          line-height: 1;
        }
        .ld-modal-bio {
          margin: 0;
          color: #3a2f1e;
          font-family: 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
          font-style: italic;
          font-size: 0.98rem;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .ld-advert { padding: 1.2rem 1rem; }
          .ld-grid { grid-template-columns: 1fr; max-width: 220px; margin: 0 auto; }
          .ld-carousel { flex-direction: column; align-items: center; gap: 0.8rem; }
          .ld-nav-btn { margin-top: 0; }
          .ld-modal { padding: 1.4rem; }
          .ld-modal-photo-frame { width: 150px; }
        }
      `}</style>

      <div className="ld-advert" ref={advertRef}>
        <h2 className="ld-heading">Meet Our Leadership</h2>
        <p className="ld-text">
          Get to know the people guiding our church and seminary.
        </p>

        <div className="ld-dropdown-wrap" ref={dropdownRef}>
          <button
            className="ld-btn"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            View Our Leadership {dropdownOpen ? "▲" : "▼"}
          </button>

          {dropdownOpen && (
            <div className="ld-menu">
              <button className="ld-menu-item" onClick={() => handleSelect("church")}>
                Church Leadership
              </button>
              <button className="ld-menu-item" onClick={() => handleSelect("college")}>
                Seminary Leadership
              </button>
            </div>
          )}
        </div>
      </div>

      {category && (
        <div className="ld-results" ref={resultsRef}>
          <div className="ld-results-header">
            <h3 className="ld-results-heading">
              {category === "church" ? "Church Leadership" : "Seminary Leadership"}
            </h3>

            <button
              type="button"
              className="ld-hide-btn"
              onClick={handleHide}
              aria-label="Hide leadership"
            >
              <span aria-hidden="true">✕</span> Hide
            </button>
          </div>

          {loading && <p className="ld-text">Loading...</p>}
          {error && <p className="ld-error">{error}</p>}

          {!loading && !error && (
            <>
              {members.length === 0 ? (
                <p className="ld-text">No leaders to show yet.</p>
              ) : (
                <div className="ld-carousel">
                  <button
                    className="ld-nav-btn"
                    style={{ visibility: page === 0 ? "hidden" : "visible" }}
                    onClick={goPrev}
                    aria-label="Previous"
                  >
                    ‹
                  </button>

                  <div className="ld-grid">
                    {visibleMembers.map((m) => (
                      <MemberCard key={m.id} member={m} onViewBio={() => setBioMember(m)} />
                    ))}
                  </div>

                  <button
                    className="ld-nav-btn"
                    style={{ visibility: page >= totalPages - 1 ? "hidden" : "visible" }}
                    onClick={goNext}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              )}

              {members.length > perPage && (
                <p className="ld-page-indicator">
                  Page {page + 1} of {totalPages}
                </p>
              )}

              <div className="ld-hide-row">
                <button type="button" className="ld-hide-btn-bottom" onClick={handleHide}>
                  <span aria-hidden="true">↑</span> Hide Leadership
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {bioMember && <BioModal member={bioMember} onClose={() => setBioMember(null)} />}
    </section>
  );
}

function MemberCard({ member, onViewBio }) {
  return (
    <div className="ld-card">
      <div className="ld-photo-frame">
        {member.image ? (
          <img src={member.image} alt={member.name} className="ld-photo" />
        ) : (
          <div className="ld-photo-placeholder">No Photo</div>
        )}
      </div>
      <div className="ld-card-info">
        <h4 className="ld-name">{member.name}</h4>
        <button className="ld-bio-btn" onClick={onViewBio}>
          View Bio
        </button>
      </div>
    </div>
  );
}

function BioModal({ member, onClose }) {
  return (
    <div className="ld-overlay" onClick={onClose}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ld-close-btn" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="ld-modal-photo-frame">
          {member.image ? (
            <img src={member.image} alt={member.name} className="ld-photo" />
          ) : (
            <div className="ld-photo-placeholder">No Photo</div>
          )}
        </div>

        <div className="ld-name-plate">
          <h3 className="ld-modal-name">{member.name}</h3>
        </div>

        <div className="ld-position-ribbon">
          <span className="ld-modal-position">{member.position}</span>
        </div>

        <div className="ld-bio-panel">
          <span className="ld-quote-mark">&ldquo;</span>
          <p className="ld-modal-bio">{member.bio || "No bio available yet."}</p>
        </div>
      </div>
    </div>
  );
}

export default Leadership;