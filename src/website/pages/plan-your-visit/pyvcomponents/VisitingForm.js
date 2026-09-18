import React, { useState } from "react";
import { submitVisitRequest } from "../../../../global/api";

function VisitingForm() {
  const [form, setForm] = useState({ full_name: "", email: "", visit_date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    submitVisitRequest(form)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setSubmitting(false));
  };

  return (
    <section style={styles.section}>
      <div style={styles.formCard}>
        {submitted ? (
          <p style={styles.success}>
            Thanks, {form.full_name || "friend"}! We can't wait to meet you.
          </p>
        ) : (
          <>
            <h2 style={styles.formTitle}>I'm Visiting</h2>
            <p style={styles.formSubtitle}>
              Let us know you're coming so we can look out for you.
            </p>

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
              <button type="submit" style={styles.button} disabled={submitting}>
                {submitting ? "Sending…" : "Let Us Know You're Coming"}
              </button>
              {error && <p style={styles.error}>{error}</p>}
            </form>
          </>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { marginTop: "2.5rem" },
  formCard: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "14px",
    padding: "2.4rem",
    maxWidth: "480px",
    margin: "0 auto",
    boxShadow: "0 10px 30px rgba(31,45,61,0.07)",
    textAlign: "center",
  },
  formTitle: { color: "#1f2d3d", margin: "0 0 0.35rem", fontSize: "1.3rem" },
  formSubtitle: { color: "#8a95a1", fontSize: "0.9rem", margin: "0 0 1.6rem" },

  form: { display: "flex", flexDirection: "column", gap: "0.85rem", textAlign: "left" },
  input: {
    padding: "0.7rem 0.85rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
  },
  textarea: {
    padding: "0.7rem 0.85rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.95rem",
    minHeight: "90px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  button: {
    marginTop: "0.3rem",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.85rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  success: { color: "#1f7a3d", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 },
  error: { color: "#a33333", fontSize: "0.88rem", margin: "0.4rem 0 0" },
};

export default VisitingForm;