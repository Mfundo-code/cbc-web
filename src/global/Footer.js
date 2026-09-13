import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div style={styles.column}>
          <h3 style={styles.heading}>Christ Baptist Church</h3>
          <p style={styles.text}>Building lives on the foundation of faith.</p>
          <p style={styles.text}>123 Church Street, Pretoria</p>
          <p style={styles.text}>Sundays 9am &amp; 11am</p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.subheading}>Quick Links</h4>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/plan-your-visit" style={styles.link}>Plan Your Visit</Link>
          <Link to="/sermons" style={styles.link}>Sermons</Link>
          <Link to="/updates" style={styles.link}>Events</Link>
          <Link to="/donate" style={styles.link}>Donate</Link>
        </div>

        <div style={styles.column}>
          <h4 style={styles.subheading}>Get Involved</h4>
          <Link to="/personal-growth" style={styles.link}>Growth Groups</Link>
          <Link to="/missions" style={styles.link}>Missions</Link>
          <Link to="/personal-growth" style={styles.link}>Counselling</Link>
        </div>

        <div style={styles.column}>
          <h4 style={styles.subheading}>Connect</h4>
          <p style={styles.text}>Phone: (012) 000 0000</p>
          <p style={styles.text}>Email: info@christbaptist.org</p>
          <div style={styles.socialRow}>
            <a href="#" style={styles.socialIcon} aria-label="Facebook">FB</a>
            <a href="#" style={styles.socialIcon} aria-label="Instagram">IG</a>
            <a href="#" style={styles.socialIcon} aria-label="YouTube">YT</a>
            <a href="#" style={styles.socialIcon} aria-label="WhatsApp">WA</a>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <span>© {year} Christ Baptist Church. All rights reserved.</span>
        <span style={styles.bottomLinks}>
          <a href="#" style={styles.bottomLink}>Privacy Policy</a>
          <a href="#" style={styles.bottomLink}>Terms of Use</a>
        </span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#14202c",
    color: "#cdd6df",
    marginTop: "3rem",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2rem",
    padding: "2.5rem 1.5rem",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  heading: {
    color: "#fff",
    marginBottom: "0.5rem",
  },
  subheading: {
    color: "#fff",
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  text: {
    margin: 0,
    fontSize: "0.9rem",
  },
  link: {
    color: "#cdd6df",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  socialRow: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  socialIcon: {
    color: "#fff",
    backgroundColor: "#33455c",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    textDecoration: "none",
  },
  bottomBar: {
    borderTop: "1px solid #33455c",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
    fontSize: "0.8rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  bottomLinks: {
    display: "flex",
    gap: "1rem",
  },
  bottomLink: {
    color: "#cdd6df",
    textDecoration: "none",
  },
};

export default Footer;
