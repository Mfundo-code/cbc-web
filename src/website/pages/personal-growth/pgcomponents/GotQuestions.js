import React, { useEffect, useState } from "react";
import { getFAQs, submitQuestion } from "../../../../global/api";

function GotQuestions() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFAQs()
      .then((res) => setFaqs(res.data.results || res.data))
      .catch(() => setFaqs([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion({ question, email })
      .then(() => {
        setSent(true);
        setQuestion("");
        setEmail("");
      })
      .catch(() => setError("Something went wrong. Please try again."));
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Got Questions?</h2>
      <div style={styles.list}>
        {faqs.map((faq) => (
          <div key={faq.id} style={styles.item}>
            <h4 style={styles.question}>{faq.question}</h4>
            <p style={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <h3 style={styles.subheading}>Ask a Question</h3>
      {sent ? (
        <p style={styles.success}>Thanks for asking — we'll follow up soon!</p>
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
          <button type="submit" style={styles.button}>
            Submit Question
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      )}
    </section>
  );
}

const styles = {
  section: { marginBottom: "1rem" },
  heading: { color: "#1f2d3d", marginBottom: "0.8rem" },
  subheading: { color: "#1f2d3d", marginTop: "1.5rem" },
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  item: { borderLeft: "3px solid #c9a227", paddingLeft: "1rem" },
  question: { margin: "0 0 0.3rem", color: "#1f2d3d" },
  answer: { margin: 0, color: "#444", lineHeight: 1.5 },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "420px" },
  textarea: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
    minHeight: "90px",
  },
  input: { padding: "0.6rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: "0.95rem" },
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

export default GotQuestions;
