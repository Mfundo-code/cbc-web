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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCounselingRequest(form)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong. Please try again."));
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Counselling</h2>
      <ul style={styles.list}>
        {types.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h3 style={styles.subheading}>Request a Session</h3>
      {submitted ? (
        <p style={styles.success}>
          Thank you, {form.full_name}. Someone from our team will reach out soon.
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
          <button type="submit" style={styles.button}>
            Request a Session
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      )}
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.8rem" },
  subheading: { color: "#1f2d3d", marginTop: "1.5rem" },
  list: { color: "#444", lineHeight: 1.8, paddingLeft: "1.2rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "420px" },
  input: { padding: "0.6rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: "0.95rem" },
  textarea: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
    minHeight: "100px",
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
  success: { color: "#1f7a3d" },
  error: { color: "#a33" },
};

export default Counseling;
