import React, { useState } from "react";
import { submitCounselingRequest } from "../../../../global/api";

const types = [
  "Biblical / Pastoral Counseling",
  "Premarital Counseling",
  "Grief Counseling",
  "Marriage & Family Counseling",
];

function Counseling() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    submitCounselingRequest(form)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setSubmitting(false));
  };

  return (
    <section style={styles.section}>
      <div style={styles.intro}>
        <h2 style={styles.heading}>Counselling</h2>
        <p style={styles.subtext}>
          Life is easier to carry with someone alongside you. Our team offers confidential,
          Bible-centered counselling in the following areas:
        </p>
      </div>

      <div style={styles.typesGrid}>
        {types.map((t) => (
          <div key={t} style={styles.typeCard}>
            {t}
          </div>
        ))}
      </div>

      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Request a Session</h3>
        <p style={styles.formSubtitle}>Fill this in and someone from our team will reach out.</p>

        {submitted ? (
          <p style={styles.success}>
            Thank you, {form.full_name}. Someone from our team will reach out soon. 🙏
          </p>
        ) : (
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
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
            />
            <textarea
              style={styles.textarea}
              name="message"
              placeholder="Tell us a bit about what you'd like to talk through"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" style={styles.button} disabled={submitting}>
              {submitting ? "Sending…" : "Request a Session"}
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {},
  intro: { textAlign: "center", marginBottom: "1.75rem" },
  heading: { color: "#1f2d3d", margin: "0 0 0.6rem", fontSize: "1.6rem" },
  subtext: { color: "#51606f", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto" },

  typesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0.8rem",
    marginBottom: "2.5rem",
  },
  typeCard: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderLeft: "4px solid #c9a227",
    borderRadius: "8px",
    padding: "0.9rem 1.1rem",
    color: "#1f2d3d",
    fontWeight: 600,
    fontSize: "0.92rem",
  },

  formCard: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "14px",
    padding: "2.2rem",
    maxWidth: "480px",
    margin: "0 auto",
    boxShadow: "0 8px 28px rgba(31,45,61,0.06)",
    textAlign: "center",
  },
  formTitle: { color: "#1f2d3d", margin: "0 0 0.3rem", fontSize: "1.2rem" },
  formSubtitle: { color: "#8a95a1", fontSize: "0.88rem", margin: "0 0 1.5rem" },

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
    minHeight: "100px",
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
    transition: "opacity 0.15s ease",
  },
  success: { color: "#1f7a3d", lineHeight: 1.6 },
  error: { color: "#a33333", fontSize: "0.88rem", margin: "0.4rem 0 0" },
};

export default Counseling;