import React, { useEffect, useState } from "react";
import { getFAQs, submitQuestion } from "../../../../global/api";

function GotQuestions() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getFAQs()
      .then((res) => setFaqs(res.data.results || res.data))
      .catch(() => setFaqs([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    submitQuestion({ question, email })
      .then(() => {
        setSent(true);
        setQuestion("");
        setEmail("");
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setSubmitting(false));
  };

  return (
    <section style={styles.section}>
      <div style={styles.intro}>
        <h2 style={styles.heading}>Got Questions?</h2>
        <p style={styles.subtext}>
          No question is too big or too small. Here are a few we're asked often
          and a place to ask your own.
        </p>
      </div>

      {faqs.length > 0 && (
        <div style={styles.list}>
          {faqs.map((faq) => (
            <div key={faq.id} style={styles.item}>
              <h4 style={styles.question}>{faq.question}</h4>
              <p style={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Ask a Question</h3>
        <p style={styles.formSubtitle}>We'll follow up personally if you leave your email.</p>

        {sent ? (
          <p style={styles.success}>Thanks for asking — we'll follow up soon! 🙏</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              style={styles.textarea}
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="email"
              placeholder="Email (optional, if you'd like a personal reply)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" style={styles.button} disabled={submitting}>
              {submitting ? "Sending…" : "Submit Question"}
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

  list: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" },
  item: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderLeft: "4px solid #c9a227",
    borderRadius: "8px",
    padding: "1rem 1.2rem",
  },
  question: { margin: "0 0 0.35rem", color: "#1f2d3d", fontSize: "1rem" },
  answer: { margin: 0, color: "#51606f", lineHeight: 1.6, fontSize: "0.92rem" },

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
  textarea: {
    padding: "0.7rem 0.85rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.95rem",
    minHeight: "90px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  input: {
    padding: "0.7rem 0.85rem",
    border: "1px solid #d7dce2",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
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
  success: { color: "#1f7a3d", lineHeight: 1.6 },
  error: { color: "#a33333", fontSize: "0.88rem", margin: "0.4rem 0 0" },
};

export default GotQuestions;