import React from "react";

const palette = {
  green: { bg: "#e6f4ea", fg: "#1f7a3d" },
  amber: { bg: "#fdf3e0", fg: "#a3720b" },
  red: { bg: "#fbe9e9", fg: "#a33333" },
  slate: { bg: "#eef1f4", fg: "#51606f" },
};

const statusTone = {
  new: "amber",
  pending: "amber",
  in_progress: "slate",
  reviewed: "slate",
  answered: "green",
  resolved: "green",
  accepted: "green",
  active: "green",
  completed: "slate",
  rejected: "red",
};

function StatusBadge({ value, label }) {
  const tone = palette[statusTone[value]] || palette.slate;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.65rem",
        borderRadius: "999px",
        fontSize: "0.78rem",
        fontWeight: 600,
        backgroundColor: tone.bg,
        color: tone.fg,
      }}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
