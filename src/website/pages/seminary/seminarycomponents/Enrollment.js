import React, { useEffect, useState } from "react";
import { getEnrollmentForms, getPrograms, submitEnrollment } from "../../../../global/api";
import FileViewerLink, { FileDownloadButton } from "../../../../global/FileViewerLink";

function Enrollment() {
  const [forms, setForms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    program: "",
    uploaded_form: null,
  });

  useEffect(() => {
    getEnrollmentForms().then((res) => setForms(res.data.results || res.data)).catch(() => setForms([]));
    getPrograms().then((res) => setPrograms(res.data.results || res.data)).catch(() => setPrograms([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({ ...data, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    submitEnrollment(formData)
      .then(() => setSubmitted(true))
      .catch(() => setError("Something went wrong submitting your application."));
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Enrollment</h2>

      {forms.length > 0 && (
        <div style={styles.downloads}>
          <h3 style={styles.subheading}>Application Forms</h3>
          <div style={styles.formsList}>
            {forms.map((f) => (
              <div key={f.id} style={styles.formRow}>
                <div>
                  <p style={styles.formTitle}>{f.title}</p>
                  {f.description && <p style={styles.formDesc}>{f.description}</p>}
                </div>
                <div style={styles.formActions}>
                  <FileViewerLink file={f.file} style={styles.readBtn}>
                    Read Application Form
                  </FileViewerLink>
                  <FileDownloadButton file={f.file} style={styles.downloadBtn}>
                    Download Application Form
                  </FileDownloadButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 style={styles.subheadingCenter}>Submit Your Completed Form</h3>
      {submitted ? (
        <p style={styles.successCenter}>Thanks! Your application has been received.</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="applicant_name"
            placeholder="Full name"
            value={data.applicant_name}
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
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
          />
          <select style={styles.input} name="program" value={data.program} onChange={handleChange}>
            <option value="">Select a program</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <input style={styles.input} type="file" name="uploaded_form" onChange={handleChange} required />
          <button type="submit" style={styles.button}>
            Submit Application
          </button>
          {error && <p style={styles.errorCenter}>{error}</p>}
        </form>
      )}
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { color: "#1f2d3d", marginBottom: "1rem" },
  subheading: { color: "#1f2d3d", marginTop: "1rem" },
  subheadingCenter: { color: "#1f2d3d", marginTop: "1rem", textAlign: "center" },
  downloads: { marginBottom: "2rem" },
  formsList: { display: "flex", flexDirection: "column", gap: "1rem" },
  formRow: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1rem 1.2rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.8rem",
  },
  formTitle: { margin: "0 0 0.2rem", color: "#1f2d3d", fontWeight: 600 },
  formDesc: { margin: 0, color: "#666", fontSize: "0.85rem" },
  formActions: { display: "flex", flexWrap: "wrap", gap: "0.6rem" },
  readBtn: {
    display: "inline-block",
    padding: "0.5rem 0.9rem",
    borderRadius: "4px",
    border: "1px solid #1f2d3d",
    color: "#1f2d3d",
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  downloadBtn: {
    display: "inline-block",
    padding: "0.5rem 0.9rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    fontSize: "0.85rem",
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "420px", margin: "0 auto" },
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
  successCenter: { color: "#1f7a3d", textAlign: "center" },
  error: { color: "#a33" },
  errorCenter: { color: "#a33", textAlign: "center" },
};

export default Enrollment;