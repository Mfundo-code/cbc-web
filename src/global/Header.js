import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close the drawer automatically if the window is resized back to desktop.
  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const mainLinks = [
    { label: "Home", to: "/", end: true },
    { label: "About", to: "/about" },
    { label: "Church Services", to: "/church" },
    { label: "Seminary", to: "/seminary" },
    { label: "Updates", to: "/updates" },
  ];

  const navLinkStyle = ({ isActive }) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : {}),
  });

  const mobileNavLinkStyle = ({ isActive }) => ({
    ...styles.mobileLink,
    ...(isActive ? styles.mobileLinkActive : {}),
  });

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header style={styles.header}>
      <div style={isMobile ? styles.topBarMobile : styles.topBar}>
        <div style={isMobile ? styles.topBarInnerMobile : styles.topBarInner}>
          {isMobile ? (
            <a href="mailto:office@christbaptist.co.za" style={styles.topBarEmailMobile}>
              office@christbaptist.co.za
            </a>
          ) : (
            <>
              <div style={styles.contactRow}>
                <a href="tel:+27152969920" style={styles.contactLink}>
                  +27 (0)15 296 9920
                </a>
                <a href="mailto:office@christbaptist.co.za" style={styles.contactLink}>
                  office@christbaptist.co.za
                </a>
              </div>
              <div style={styles.socialRow}>
                <a
                  href="https://web.facebook.com/ChristBaptistChurchPLK/?_rdc=2&_rdr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 320 512" width="13" height="13" fill="currentColor" aria-hidden="true">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCDIufyc-AVxp9xWQqNTj0RQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={isMobile ? styles.innerMobile : styles.inner}>
        <Link to="/" style={styles.brand} onClick={closeMobileMenu}>
          <img
            src="/logo.png"
            alt="Christ Baptist Church"
            style={isMobile ? styles.logoImgMobile : styles.logoImg}
          />
        </Link>

        {!isMobile && (
          <>
            <nav style={styles.nav}>
              {mainLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} style={navLinkStyle}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <NavLink to="/admin" style={styles.portalBtn}>
              Portal
            </NavLink>
          </>
        )}

        {isMobile && (
          <button
            type="button"
            style={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && mobileMenuOpen && (
        <div style={styles.mobileOverlay} onClick={closeMobileMenu}>
          <div style={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={styles.mobileCloseBtn}
              onClick={closeMobileMenu}
              aria-label="Close navigation"
            >
              <FaTimes size={18} />
            </button>

            <div style={styles.mobileLinksList}>
              {mainLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  style={mobileNavLinkStyle}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </NavLink>
              ))}

              <NavLink to="/admin" style={styles.mobilePortalBtn} onClick={closeMobileMenu}>
                Portal
              </NavLink>
            </div>

            <div style={styles.mobileFooter}>
              <a href="tel:+27152969920" style={styles.mobileContactLink}>
                +27 (0)15 296 9920
              </a>
              <a href="mailto:office@christbaptist.co.za" style={styles.mobileContactLink}>
                office@christbaptist.co.za
              </a>
              <div style={styles.mobileSocialRow}>
                <a
                  href="https://web.facebook.com/ChristBaptistChurchPLK/?_rdc=2&_rdr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 320 512" width="13" height="13" fill="currentColor" aria-hidden="true">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCDIufyc-AVxp9xWQqNTj0RQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#fff",
    color: "#1f2d3d",
    border: "2px solid #c9a227",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  /* ── Top bar — desktop ── */
  topBar: {
    backgroundColor: "#1f2d3d",
  },
  topBarInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.4rem",
    padding: "0.4rem 1.5rem",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
    flexWrap: "wrap",
  },
  contactLink: {
    color: "#dce3ea",
    textDecoration: "none",
    fontSize: "0.78rem",
  },
  socialRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  socialIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },

  /* ── Top bar — mobile (slim, single line) ── */
  topBarMobile: {
    backgroundColor: "#1f2d3d",
  },
  topBarInnerMobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.3rem 1rem",
  },
  topBarEmailMobile: {
    color: "rgba(220,227,234,0.85)",
    textDecoration: "none",
    fontSize: "0.72rem",
  },

  /* ── Main bar — desktop ── */
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1.5rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },

  /* ── Main bar — mobile ── */
  innerMobile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
  },

  brand: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: "44px",
    width: "auto",
    display: "block",
  },
  logoImgMobile: {
    height: "36px",
    width: "auto",
    display: "block",
  },

  mobileToggle: {
    background: "none",
    border: "none",
    color: "#1f2d3d",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "6px",
  },

  nav: {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#3a4a5c",
    textDecoration: "none",
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
  },
  navLinkActive: {
    color: "#1f2d3d",
    backgroundColor: "#eef1f4",
    fontWeight: 600,
  },
  portalBtn: {
    flex: "0 0 auto",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  /* ── Mobile drawer ── */
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 32, 0.6)",
    zIndex: 200,
    display: "flex",
    justifyContent: "flex-end",
  },
  mobileDrawer: {
    width: "270px",
    maxWidth: "80vw",
    height: "100%",
    backgroundColor: "#1f2d3d",
    padding: "1.25rem 1.25rem 1.5rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  mobileCloseBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    position: "absolute",
    top: "14px",
    right: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  mobileLinksList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    marginTop: "2.5rem",
  },
  mobileLink: {
    color: "#dce3ea",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "0.65rem 0.5rem",
    borderRadius: "6px",
  },
  mobileLinkActive: {
    backgroundColor: "rgba(201,162,39,0.15)",
    color: "#c9a227",
  },
  mobilePortalBtn: {
    marginTop: "0.75rem",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    textDecoration: "none",
    padding: "0.6rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 700,
    textAlign: "center",
  },
  mobileFooter: {
    marginTop: "auto",
    paddingTop: "1.25rem",
    borderTop: "1px solid rgba(220,227,234,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  mobileContactLink: {
    color: "rgba(220,227,234,0.85)",
    textDecoration: "none",
    fontSize: "0.85rem",
  },
  mobileSocialRow: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.4rem",
  },
};

export default Header;