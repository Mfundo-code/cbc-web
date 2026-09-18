import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { resourceConfig } from "../config/resourceConfig";
import "../admin.css";

function pageTitle(pathname) {
  const key = pathname.split("/admin/")[1];
  if (!key) return "Dashboard";
  return resourceConfig[key]?.label || "Dashboard";
}

function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={styles.shell} className="admin-panel">
      <div className={`admin-sidebar-wrap${menuOpen ? " open" : ""}`}>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
      </div>
      {menuOpen && <div className="admin-backdrop" onClick={() => setMenuOpen(false)} />}

      <div style={styles.main}>
        <Topbar title={pageTitle(location.pathname)} onMenuToggle={() => setMenuOpen((v) => !v)} />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f6f8fa",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  sidebarWrap: {},
  sidebarWrapOpen: {},
  backdrop: {
    display: "none",
  },
  main: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  content: { padding: "1.5rem", flex: 1 },
};

export default AdminLayout;
