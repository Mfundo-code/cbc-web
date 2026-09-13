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

  const dropdownRef = useRef(null);
  const advertRef = useRef(null);
  const resultsRef = useRef(null);

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

  const totalPages = Math.max(1, Math.ceil(members.length / PER_PAGE));
  const visibleMembers = members.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section style={styles.section}>
      <div style={styles.advert} ref={advertRef}>
        <h2 style={styles.heading}>Meet Our Leadership</h2>
        <p style={styles.text}>
          Get to know the people guiding our church and seminary.
        </p>

        <div style={styles.dropdownWrap} ref={dropdownRef}>
          <button
            style={styles.button}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            View Our Leadership {dropdownOpen ? "▲" : "▼"}
          </button>

          {dropdownOpen && (
            <div style={styles.menu}>
              <button style={styles.menuItem} onClick={() => handleSelect("church")}>
                Church Leadership
              </button>
              <button style={styles.menuItem} onClick={() => handleSelect("college")}>
                Seminary Leadership
              </button>
            </div>
          )}
        </div>
      </div>

      {category && (
        <div style={styles.results} ref={resultsRef}>
          <div style={styles.resultsHeader}>
            <h3 style={styles.resultsHeading}>
              {category === "church" ? "Church Leadership" : "Seminary Leadership"}
            </h3>

            <button
              type="button"
              style={styles.hideBtn}
              onClick={handleHide}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c9a227";
                e.currentTarget.style.color = "#1f2d3d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1f2d3d";
              }}
              aria-label="Hide leadership"
            >
              <span aria-hidden="true">✕</span> Hide
            </button>
          </div>

          {loading && <p style={styles.text}>Loading...</p>}
          {error && <p style={styles.error}>{error}</p>}

          {!loading && !error && (
            <>
              {members.length === 0 ? (
                <p style={styles.text}>No leaders to show yet.</p>
              ) : (
                <div style={styles.carousel}>
                  <button
                    style={{ ...styles.navBtn, visibility: page === 0 ? "hidden" : "visible" }}
                    onClick={goPrev}
                    aria-label="Previous"
                  >
                    ‹
                  </button>

                  <div style={styles.grid}>
                    {visibleMembers.map((m) => (
                      <MemberCard key={m.id} member={m} onViewBio={() => setBioMember(m)} />
                    ))}
                  </div>

                  <button
                    style={{
                      ...styles.navBtn,
                      visibility: page >= totalPages - 1 ? "hidden" : "visible",
                    }}
                    onClick={goNext}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              )}

              {members.length > PER_PAGE && (
                <p style={styles.pageIndicator}>
                  Page {page + 1} of {totalPages}
                </p>
              )}

              <div style={styles.hideRow}>
                <button
                  type="button"
                  style={styles.hideBtnBottom}
                  onClick={handleHide}
                >
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
    <div style={styles.card}>
      <div style={styles.photoFrame}>
        {member.image ? (
          <img src={member.image} alt={member.name} style={styles.photo} />
        ) : (
          <div style={styles.photoPlaceholder}>No Photo</div>
        )}
      </div>
      <div style={styles.cardInfo}>
        <h4 style={styles.name}>{member.name}</h4>
        <button style={styles.bioBtn} onClick={onViewBio}>
          View Bio
        </button>
      </div>
    </div>
  );
}

function BioModal({ member, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div style={styles.modalPhotoFrame}>
          {member.image ? (
            <img src={member.image} alt={member.name} style={styles.photo} />
          ) : (
            <div style={styles.photoPlaceholder}>No Photo</div>
          )}
        </div>

        {/* Tier 1: name — navy blue serif, centered */}
        <div style={styles.namePlate}>
          <h3 style={styles.modalName}>{member.name}</h3>
        </div>

        {/* Tier 2: position — navy blue, bold, smaller, left aligned */}
        <div style={styles.positionRibbon}>
          <span style={styles.modalPosition}>{member.position}</span>
        </div>

        {/* Tier 3: bio panel — warm ivory, serif italic "story" feel */}
        <div style={styles.bioPanel}>
          <span style={styles.quoteMark}>&ldquo;</span>
          <p style={styles.modalBio}>{member.bio || "No bio available yet."}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  advert: {
    backgroundColor: "#f5f7f9",
    borderRadius: "10px",
    padding: "1.5rem",
    textAlign: "center",
    scrollMarginTop: "80px",
  },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
  dropdownWrap: {
    position: "relative",
    display: "inline-block",
    marginTop: "0.8rem",
  },
  button: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.65rem 1.4rem",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  menu: {
    position: "absolute",
    top: "calc(100% + 0.4rem)",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    border: "1px solid #c9a227",
    borderRadius: "6px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    overflow: "hidden",
    zIndex: 10,
    minWidth: "200px",
  },
  menuItem: {
    display: "block",
    width: "100%",
    padding: "0.7rem 1rem",
    background: "#fff",
    border: "none",
    borderBottom: "1px solid #f0e4bd",
    color: "#1f2d3d",
    fontSize: "0.9rem",
    fontWeight: 600,
    textAlign: "left",
    cursor: "pointer",
  },
  results: { marginTop: "2rem", scrollMarginTop: "80px" },

  // Header row: heading on the left, Hide button on the right.
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.8rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  resultsHeading: { color: "#1f2d3d", margin: 0 },

  hideBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    backgroundColor: "transparent",
    border: "1px solid #c9a227",
    color: "#1f2d3d",
    padding: "0.4rem 0.9rem",
    borderRadius: "4px",
    fontSize: "0.82rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },

  carousel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  navBtn: {
    flex: "0 0 auto",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    fontSize: "1.4rem",
    lineHeight: 1,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "60px",
  },
  grid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  photoFrame: {
    width: "140px",
    aspectRatio: "3 / 4",
    backgroundColor: "#f5f7f9",
    borderRadius: "6px",
    border: "1px solid #d7dce2",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  photoPlaceholder: {
    color: "#8a95a1",
    fontSize: "0.8rem",
  },
  cardInfo: {
    marginTop: "0.7rem",
    backgroundColor: "transparent",
    borderRadius: "8px",
    padding: 0,
    textAlign: "center",
    width: "100%",
  },
  name: { margin: "0 0 0.7rem 0", color: "#1f2d3d" },
  bioBtn: {
    backgroundColor: "#1f2d3d",
    border: "none",
    color: "#f5d976",
    padding: "0.4rem 0.9rem",
    borderRadius: "4px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  pageIndicator: {
    textAlign: "center",
    color: "#8a95a1",
    fontSize: "0.82rem",
    marginTop: "0.8rem",
  },
  error: { color: "#a33" },

  // Bottom hide/back row
  hideRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.2rem",
  },
  hideBtnBottom: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    backgroundColor: "#1f2d3d",
    border: "1px solid #1f2d3d",
    color: "#f5d976",
    padding: "0.55rem 1.3rem",
    borderRadius: "4px",
    fontSize: "0.85rem",
    fontWeight: 700,
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "1rem",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.8rem",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: "0.6rem",
    right: "0.8rem",
    background: "none",
    border: "none",
    fontSize: "1.6rem",
    lineHeight: 1,
    color: "#8a95a1",
    cursor: "pointer",
  },
  modalPhotoFrame: {
    width: "180px",
    aspectRatio: "3 / 4",
    backgroundColor: "#f5f7f9",
    borderRadius: "6px",
    border: "1px solid #d7dce2",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Tier 1 — name: navy blue serif, centered.
  namePlate: {
    marginTop: "1.1rem",
    width: "100%",
    padding: "0.9rem 1rem 0.2rem",
    textAlign: "center",
  },
  modalName: {
    margin: 0,
    color: "#1f2d3d",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "1.35rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
  },

  // Tier 2 — position: navy blue, bold, smaller, left aligned.
  positionRibbon: {
    marginTop: "0.3rem",
    width: "100%",
    backgroundColor: "transparent",
    padding: "0.2rem 1rem",
    textAlign: "left",
  },
  modalPosition: {
    color: "#1f2d3d",
    fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },

  // Tier 3 — bio panel: warm ivory "storybook" feel, serif italic.
  bioPanel: {
    marginTop: "0.6rem",
    width: "100%",
    backgroundColor: "#fbf3df",
    borderRadius: "8px",
    padding: "1.2rem 1.3rem 1rem",
    position: "relative",
    textAlign: "left",
  },
  quoteMark: {
    position: "absolute",
    top: "-0.6rem",
    left: "0.6rem",
    fontFamily: "Georgia, serif",
    fontSize: "3rem",
    color: "#c9a227",
    opacity: 0.5,
    lineHeight: 1,
  },
  modalBio: {
    margin: 0,
    color: "#3a2f1e",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
    fontStyle: "italic",
    fontSize: "0.98rem",
    lineHeight: 1.7,
  },
};

export default Leadership;