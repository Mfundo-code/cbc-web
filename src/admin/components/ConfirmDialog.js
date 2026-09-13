import React from "react";

function ConfirmDialog({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button style={styles.confirmBtn} onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 32, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    padding: "1rem",
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    maxWidth: "380px",
    width: "100%",
    boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
  },
  title: { margin: "0 0 0.5rem", color: "#1f2d3d" },
  message: { margin: "0 0 1.25rem", color: "#51606f", lineHeight: 1.5, fontSize: "0.92rem" },
  actions: { display: "flex", justifyContent: "flex-end", gap: "0.6rem" },
  cancelBtn: {
    padding: "0.55rem 1rem",
    borderRadius: "6px",
    border: "1px solid #d7dce2",
    backgroundColor: "#fff",
    color: "#1f2d3d",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  confirmBtn: {
    padding: "0.55rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#a33333",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default ConfirmDialog;
