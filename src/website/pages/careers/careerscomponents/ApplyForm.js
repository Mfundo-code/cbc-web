import React, { useState } from "react";
import { submitCareerApplication } from "../../../../global/api";

function ApplyForm({ job, onDone }) {
  const [data, setData] = useState({ full_name: "", email: "", phone: "", cover_letter: "", resume: null });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("job", job.id);
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    submitCareerApplication(formData)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong submitting your application. Please try again."));
  };

  if (submitted) {
    return (
      <p style={styles.success}>
        Thanks, {data.full_name || "there"}! Your application for <strong>{job.title}</strong> has been
        received — we'll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        name="full_name"
        placeholder="Full name"
        value={data.full_name}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        name="phone"
        placeholder="Phone (optional)"
        value={data.phone}
        onChange={handleChange}
      />
      <textarea
        style={styles.textarea}
        name="cover_letter"
        placeholder="Cover letter (optional)"
        value={data.cover_letter}
        onChange={handleChange}
      />
      <label style={styles.fileLabel}>
        Resume / CV
        <input type="file" name="resume" onChange={handleChange} required style={styles.fileInput} />
      </label>

      <div style={styles.actions}>
        <button type="submit" style={styles.submitBtn}>
          Submit Application
        </button>
        <button type="button" style={styles.cancelBtn} onClick={onDone}>
          Cancel
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e3e7eb",
    maxWidth: "440px",
  },
  input: { padding: "0.6rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: "0.95rem" },
  textarea: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
    minHeight: "80px",
  },
  fileLabel: { display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", color: "#1f2d3d" },
  fileInput: { fontSize: "0.9rem" },
  actions: { display: "flex", gap: "0.6rem", marginTop: "0.3rem" },
  submitBtn: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    color: "#1f2d3d",
    border: "1px solid #ccc",
    padding: "0.6rem 1.2rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: { color: "#1f7a3d", lineHeight: 1.5 },
  error: { color: "#a33" },
};

export default ApplyForm;