import React from "react";

function DataTable({ columns, rows, emptyMessage, onEdit, onDelete, getRowKey }) {
  if (rows.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={styles.th}>
                {col.label}
              </th>
            ))}
            <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} style={styles.tr}>
              {columns.map((col) => (
                <td key={col.key} style={styles.td}>
                  {col.render ? col.render(row) : row[col.key] ?? "—"}
                </td>
              ))}
              <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
                {onEdit && (
                  <button style={styles.linkBtn} onClick={() => onEdit(row)}>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button style={{ ...styles.linkBtn, color: "#a33333" }} onClick={() => onDelete(row)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrap: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e7eaee",
    overflowX: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" },
  th: {
    textAlign: "left",
    padding: "0.85rem 1rem",
    color: "#51606f",
    fontWeight: 600,
    fontSize: "0.8rem",
    borderBottom: "1px solid #e7eaee",
    whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f0f2f5" },
  td: { padding: "0.85rem 1rem", color: "#1f2d3d", verticalAlign: "top" },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#1f5da0",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "0.2rem 0.5rem",
  },
  empty: {
    backgroundColor: "#fff",
    border: "1px dashed #d7dce2",
    borderRadius: "10px",
    padding: "3rem 1.5rem",
    textAlign: "center",
  },
  emptyText: { color: "#8a95a1", margin: 0, fontSize: "0.95rem" },
};

export default DataTable;
