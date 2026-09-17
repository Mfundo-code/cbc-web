import React from "react";
import { NavLink } from "react-router-dom";
import { resourceGroups, resourceConfig } from "../config/resourceConfig";

function Sidebar({ open, onNavigate }) {
  return (
    <aside style={{ ...styles.sidebar, ...(open ? styles.sidebarOpen : {}) }}>
      <div style={styles.brand}>
        <span style={styles.brandMark}>CB</span>
        <div>
          <div style={styles.brandTitle}>Christ Baptist</div>
          <div style={styles.brandSubtitle}>Admin</div>
        </div>
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/admin"
          end
          onClick={onNavigate}
          style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}
        >
          Dashboard
        </NavLink>

        {resourceGroups.map((group) => (
          <div key={group.label} style={styles.group}>
            <div style={styles.groupLabel}>{group.label}</div>
            {group.resources.map((key) => (
              <NavLink
                key={key}
                to={`/admin/${key}`}
                onClick={onNavigate}
                style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}
              >
                {resourceConfig[key].label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <NavLink
          to="/admin/admin-users"
          onClick={onNavigate}
          style={({ isActive }) => ({ ...styles.footerLink, ...(isActive ? styles.footerLinkActive : {}) })}
        >
          Users &amp; permissions →
        </NavLink>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    minWidth: "250px",
    backgroundColor: "#1f2d3d",
    color: "#dce3ea",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
    overflowY: "auto",
  },
  sidebarOpen: {},
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    padding: "1.3rem 1.25rem",
    borderBottom: "1px solid #2c3c4f",
  },
  brandMark: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "0.85rem",
    flexShrink: 0,
  },
  brandTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 },
  brandSubtitle: { fontSize: "0.78rem", color: "#8fa0b3" },
  nav: { flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem" },
  group: { marginTop: "0.9rem" },
  groupLabel: {
    fontSize: "0.72rem",
    color: "#6d8098",
    fontWeight: 700,
    padding: "0.4rem 0.75rem",
    letterSpacing: "0.02em",
  },
  navItem: {
    display: "block",
    padding: "0.55rem 0.75rem",
    borderRadius: "6px",
    color: "#dce3ea",
    textDecoration: "none",
    fontSize: "0.9rem",
    borderLeft: "3px solid transparent",
  },
  navItemActive: {
    backgroundColor: "#2c3c4f",
    color: "#fff",
    borderLeft: "3px solid #c9a227",
    fontWeight: 600,
  },
  footer: { padding: "1rem 1.25rem", borderTop: "1px solid #2c3c4f" },
  footerLink: { color: "#8fa0b3", fontSize: "0.8rem", textDecoration: "none" },
  footerLinkActive: { color: "#c9a227", fontWeight: 600 },
};

export default Sidebar;