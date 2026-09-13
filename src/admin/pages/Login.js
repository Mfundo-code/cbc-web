import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || "/admin";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandMark}>CB</div>
        <h1 style={styles.title}>Admin sign in</h1>
        <p style={styles.subtitle}>Manage sermons, programs, events, and more.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.field}>
            <span style={styles.label}>Username</span>
            <input
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </label>
          <label style={styles.field}>
            <span style={styles.label}>Password</span>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2d3d",
    backgroundImage: "radial-gradient(circle at 20% 20%, #2c3c4f 0%, #1f2d3d 60%)",
    padding: "1.5rem",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  brandMark: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    marginBottom: "1.25rem",
  },
  title: { margin: "0 0 0.3rem", color: "#1f2d3d", fontSize: "1.4rem" },
  subtitle: { margin: "0 0 1.75rem", color: "#7c8794", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "1.1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { fontSize: "0.85rem", fontWeight: 600, color: "#1f2d3d" },
  input: {
    padding: "0.7rem 0.8rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.95rem",
  },
  error: { color: "#a33333", fontSize: "0.88rem", margin: 0 },
  button: {
    marginTop: "0.4rem",
    padding: "0.75rem",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
};

export default Login;
