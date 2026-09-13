import React, { useState } from "react";
import { submitVisitRequest } from "../../../../global/api";

function VisitingForm() {
  const [form, setForm] = useState({ full_name: "", email: "", visit_date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitVisitRequest(form)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong. Please try again."));
  };

  if (submitted) {
    return (
      <section style={styles.section}>
        <p style={styles.success}>
          Thanks, {form.full_name || "friend"}! We can't wait to meet you.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>I'm Visiting</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="full_name"
          placeholder="Full name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="date"
          name="visit_date"
          value={form.visit_date}
          onChange={handleChange}
        />
        <textarea
          style={styles.textarea}
          name="notes"
          placeholder="Anything we should know? (optional)"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>
          Let Us Know You're Coming
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </section>
  );
}

const styles = {
  section: { marginBottom: "2rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "420px" },
  input: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
  },
  textarea: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
    minHeight: "80px",
  },
  button: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: { color: "#1f7a3d", fontSize: "1.1rem" },
  error: { color: "#a33" },
};

export default VisitingForm;
