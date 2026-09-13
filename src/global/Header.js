import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [churchOpen, setChurchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const churchDropdownLinks = [
    { label: "Church Home", to: "/church" },
    { label: "Sermons", to: "/sermons" },
    { label: "Missions", to: "/missions" },
    { label: "Gallery", to: "/gallery" },
  ];

  const navLinkStyle = ({ isActive }) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : {}),
  });

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          Christ Baptist Church
        </Link>

        <button
          style={styles.mobileToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav style={{ ...styles.nav, ...(menuOpen ? styles.navOpen : {}) }}>
          <NavLink to="/" style={navLinkStyle} end>
            Home
          </NavLink>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/plan-your-visit" style={navLinkStyle}>
            Plan Your Visit
          </NavLink>

          <div
            style={styles.dropdownWrapper}
            onMouseEnter={() => setChurchOpen(true)}
            onMouseLeave={() => setChurchOpen(false)}
          >
            <NavLink to="/church" style={navLinkStyle}>
              Church ▾
            </NavLink>
            {churchOpen && (
              <div style={styles.dropdownMenu}>
                {churchDropdownLinks.map((item) => (
                  <Link key={item.to} to={item.to} style={styles.dropdownItem}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/seminary" style={navLinkStyle}>
            Seminary
          </NavLink>
          <NavLink to="/personal-growth" style={navLinkStyle}>
            Personal Growth
          </NavLink>
          <NavLink to="/updates" style={navLinkStyle}>
            Updates
          </NavLink>
          <NavLink to="/donate" style={navLinkStyle}>
            Donate
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#1f2d3d",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    flexWrap: "wrap",
  },
  brand: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  mobileToggle: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  navOpen: {},
  navLink: {
    color: "#dce3ea",
    textDecoration: "none",
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
  },
  navLinkActive: {
    color: "#fff",
    backgroundColor: "#33455c",
  },
  dropdownWrapper: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    color: "#222",
    minWidth: "180px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  dropdownItem: {
    padding: "0.6rem 1rem",
    textDecoration: "none",
    color: "#222",
    fontSize: "0.9rem",
    borderBottom: "1px solid #eee",
  },
};

export default Header;
