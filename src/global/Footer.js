import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NAVY = "#1f2d3d";
const NAVY_DEEP = "#14202c";
const GOLD = "#c9a227";
const LIGHT = "#dce3ea";
const WHITE = "#ffffff";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Plan Your Visit", path: "/plan-your-visit" },
    { name: "Sermons", path: "/sermons" },
    { name: "Events", path: "/updates" },
    { name: "Donate", path: "/donate" },
    { name: "Careers", path: "/careers" },
  ];

  const getInvolvedLinks = [
    { name: "Growth Groups", path: "/personal-growth" },
    { name: "Missions", path: "/missions" },
    { name: "Counselling", path: "/personal-growth" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://web.facebook.com/ChristBaptistChurchPLK/?_rdc=2&_rdr#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCDIufyc-AVxp9xWQqNTj0RQ",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:office@christbaptist.co.za",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <footer style={styles.footer}>
      {/* Soft glow accents — purely decorative, gives the flat navy some depth */}
      <div style={styles.glowGold} aria-hidden="true" />
      <div style={styles.glowBlue} aria-hidden="true" />

      <div style={styles.grid}>
        <motion.div
          style={styles.column}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h3 style={styles.heading}>Christ Baptist Church</h3>
          <p style={styles.text}>Building lives on the foundation of faith.</p>
          <p style={styles.text}>375 Marshall Street, Flora Park</p>
          <p style={styles.text}>Polokwane, 0699, Limpopo</p>
          <p style={styles.text}>Sundays 8:00 &amp; 9:30</p>
        </motion.div>

        <motion.div
          style={styles.column}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 style={styles.subheading}>Quick Links</h4>
          {quickLinks.map((link, i) => (
            <motion.div key={link.name} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link to={link.path} style={styles.link}>
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={styles.column}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 style={styles.subheading}>Get Involved</h4>
          {getInvolvedLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link to={link.path} style={styles.link}>
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={styles.column}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 style={styles.subheading}>Connect</h4>
          <p style={styles.text}>
            Phone:{" "}
            <a href="tel:+27152969920" style={styles.inlineLink}>
              +27 (0)15 296 9920
            </a>
          </p>
          <p style={styles.text}>
            Email:{" "}
            <a href="mailto:office@christbaptist.co.za" style={styles.inlineLink}>
              office@christbaptist.co.za
            </a>
          </p>

          <div style={styles.socialRow}>
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
                aria-label={social.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.12, y: -3, backgroundColor: GOLD, color: NAVY }}
                whileTap={{ scale: 0.94 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        style={styles.bottomBar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span>© {year} Christ Baptist Church. All rights reserved.</span>
        <span style={styles.bottomLinks}>
          <a href="#" style={styles.bottomLink}>Privacy Policy</a>
          <a href="#" style={styles.bottomLink}>Terms of Use</a>
        </span>
      </motion.div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: NAVY_DEEP,
    color: LIGHT,
    marginTop: "3rem",
    position: "relative",
    overflow: "hidden",
    borderTop: `2px solid ${GOLD}`,
  },
  glowGold: {
    position: "absolute",
    top: "-120px",
    right: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,162,39,0.16) 0%, rgba(201,162,39,0) 70%)",
    pointerEvents: "none",
  },
  glowBlue: {
    position: "absolute",
    bottom: "-140px",
    left: "-100px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(220,227,234,0.08) 0%, rgba(220,227,234,0) 70%)",
    pointerEvents: "none",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2.5rem",
    padding: "3.5rem 1.5rem 2.5rem",
    position: "relative",
    zIndex: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  heading: {
    color: "#fff",
    marginBottom: "0.5rem",
    fontSize: "1.15rem",
    fontWeight: 700,
  },
  subheading: {
    color: "#fff",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  text: {
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: 1.6,
    color: LIGHT,
  },
  link: {
    color: LIGHT,
    textDecoration: "none",
    fontSize: "0.92rem",
    display: "inline-block",
    padding: "4px 0",
  },
  inlineLink: {
    color: GOLD,
    textDecoration: "none",
    fontWeight: 600,
  },
  socialRow: {
    display: "flex",
    gap: "0.7rem",
    marginTop: "0.75rem",
  },
  socialIcon: {
    color: WHITE,
    backgroundColor: "rgba(201,162,39,0.15)",
    border: `1px solid rgba(201,162,39,0.4)`,
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
  bottomBar: {
    borderTop: `1px solid rgba(220,227,234,0.15)`,
    padding: "1.2rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
    fontSize: "0.8rem",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
    color: "rgba(220,227,234,0.7)",
  },
  bottomLinks: {
    display: "flex",
    gap: "1rem",
  },
  bottomLink: {
    color: "rgba(220,227,234,0.7)",
    textDecoration: "none",
  },
};

export default Footer;