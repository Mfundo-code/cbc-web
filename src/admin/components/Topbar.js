import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Topbar({ title, onMenuToggle }) {
  const { username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={styles.topbar}>
      <div style={styles.left}>
        <button className="admin-menu-btn" style={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <h1 style={styles.title}>{title}</h1>
      </div>

      <div style={styles.right}>
        <Link to="/" target="_blank" style={styles.viewSiteLink}>
          View site ↗
        </Link>

        <div style={styles.userMenuWrap}>
          <button style={styles.userBtn} onClick={() => setMenuOpen((v) => !v)}>
            <span style={styles.avatar}>{(username || "A").charAt(0).toUpperCase()}</span>
            <span style={styles.userName}>{username || "Admin"}</span>
            <span style={styles.chevron}>▾</span>
          </button>
          {menuOpen && (
            <div style={styles.dropdown} onMouseLeave={() => setMenuOpen(false)}>
              <button style={styles.dropdownItem} onClick={logout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.9rem 1.5rem",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e7eaee",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },
  left: { display: "flex", alignItems: "center", gap: "0.8rem" },
  menuBtn: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    color: "#1f2d3d",
  },
  title: { margin: 0, fontSize: "1.15rem", color: "#1f2d3d" },
  right: { display: "flex", alignItems: "center", gap: "1.2rem" },
  viewSiteLink: { color: "#1f5da0", fontSize: "0.88rem", textDecoration: "none" },
  userMenuWrap: { position: "relative" },
  userBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.3rem 0.4rem",
    borderRadius: "8px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#1f2d3d",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  userName: { fontSize: "0.9rem", color: "#1f2d3d", fontWeight: 600 },
  chevron: { color: "#8a95a1", fontSize: "0.75rem" },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    minWidth: "140px",
    overflow: "hidden",
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "0.65rem 0.9rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.88rem",
    color: "#a33333",
  },
};

export default Topbar;
