import React, { useEffect, useState } from "react";
import { getCareers } from "../../../../global/api";
import ApplyForm from "./ApplyForm";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);

  useEffect(() => {
    getCareers()
      .then((res) => setJobs(res.data.results || res.data))
      .catch(() => setError("Could not load open positions right now."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.text}>Loading open positions...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (jobs.length === 0) {
    return <p style={styles.text}>There are no open positions right now — check back soon.</p>;
  }

  return (
    <div style={styles.list}>
      {jobs.map((job) => (
        <div key={job.id} style={styles.card}>
          <div style={styles.headerRow}>
            <div>
              <h2 style={styles.jobTitle}>{job.title}</h2>
              <p style={styles.meta}>
                {job.employment_type_display}
                {job.department ? ` · ${job.department}` : ""}
                {job.location ? ` · ${job.location}` : ""}
              </p>
            </div>
            <button
              style={styles.applyBtn}
              onClick={() => setOpenJobId(openJobId === job.id ? null : job.id)}
            >
              {openJobId === job.id ? "Close" : "Apply Now"}
            </button>
          </div>

          <p style={styles.text}>{job.description}</p>

          {job.requirements && (
            <>
              <h4 style={styles.subheading}>Requirements</h4>
              <p style={styles.text}>{job.requirements}</p>
            </>
          )}

          {job.closing_date && (
            <p style={styles.closing}>Applications close {job.closing_date}</p>
          )}

          {openJobId === job.id && (
            <ApplyForm job={job} onDone={() => setOpenJobId(null)} />
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  list: { display: "flex", flexDirection: "column", gap: "1.2rem" },
  card: {
    backgroundColor: "#f5f7f9",
    borderRadius: "8px",
    padding: "1.4rem",
  },
  headerRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.8rem",
    marginBottom: "0.5rem",
  },
  jobTitle: { margin: "0 0 0.2rem", color: "#1f2d3d", fontSize: "1.15rem" },
  meta: { margin: 0, color: "#777", fontSize: "0.85rem" },
  subheading: { color: "#1f2d3d", margin: "0.8rem 0 0.3rem", fontSize: "0.95rem" },
  text: { color: "#444", lineHeight: 1.6, margin: "0.3rem 0" },
  closing: { color: "#a3720b", fontSize: "0.85rem", marginTop: "0.6rem" },
  applyBtn: {
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    padding: "0.55rem 1.1rem",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "0.88rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  error: { color: "#a33" },
};

export default JobList;