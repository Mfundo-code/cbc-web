import React, { useState, useEffect } from "react";
import {
  FaChurch,
  FaBookOpen,
  FaUserFriends,
  FaChild,
  FaFemale,
  FaMale,
  FaArrowLeft,
} from "react-icons/fa";
import ExploreMoreSection from "./churchcomponents/ExploreMoreSection";

const ministries = [
  {
    key: "services",
    label: "Services",
    icon: FaChurch,
    intro: "Join us for worship, teaching, and community — every Sunday, in person or online.",
    items: [
      "Sunday Worship: 9:00 AM & 11:00 AM",
      "What to Expect: casual dress, warm welcome, Bible-based teaching",
      "Livestream: available on our YouTube channel every Sunday",
    ],
  },
  {
    key: "faith-builders",
    label: "Faith Builders",
    icon: FaBookOpen,
    intro: "Grow deeper in your walk with God through teaching, discipleship, and community.",
    items: [
      "Bible Studies — weekly, all ages welcome",
      "Discipleship Classes — foundational teaching for new believers",
      "Small Groups — meet midweek in homes across the city",
    ],
  },
  {
    key: "young-adults",
    label: "Young Adults",
    icon: FaUserFriends,
    intro:
      "A community for young adults (18–30s) to connect, grow, and serve together through regular meet-ups and events.",
    items: [],
  },
  {
    key: "youth",
    label: "Youth Ministry",
    icon: FaChild,
    intro: "Led by our Youth Pastor for grades 7–12.",
    items: ["Services: Fridays, 6:00 PM", "Programs: camps, mentorship, and community outreach"],
  },
  {
    key: "womens",
    label: "Women's Ministry",
    icon: FaFemale,
    intro: "Building each other up through fellowship, encouragement, and growth.",
    items: ["Monthly fellowship services", "Ongoing mentorship and support programs"],
  },
  {
    key: "mens",
    label: "Men's Ministry",
    icon: FaMale,
    intro: "Sharpening one another through study, accountability, and fellowship.",
    items: ["Weekly Bible studies", "Fellowship events throughout the year"],
  },
];

const rotatingPhrases = [
  "Church",
  "Community",
  "Family",
  "Belonging",
  "Home",
];

function Church() {
  const [open, setOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [selected, setSelected] = useState(null); // ministry key or null, drives the popup

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
        setVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const toggleBand = () => {
    setOpen((o) => !o);
    setSelected(null);
  };

  const activeMinistry = ministries.find((m) => m.key === selected);

  return (
    <div className="cm-section">
      <style>{`
        @keyframes cm-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes cm-drop-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cm-glow-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }

        .cm-section {
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .cm-hero {
          position: relative;
          background-image: url("https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80");
          background-size: cover;
          background-position: center;
          padding: 72px 40px;
          overflow: visible;
        }
        .cm-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(31,45,61,0.86) 0%, rgba(10,16,24,0.82) 100%);
          z-index: 1;
        }
        .cm-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .cm-left { flex: 1 1 420px; }
        .cm-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #c9a227;
          opacity: 0.95;
          margin: 0 0 16px;
        }
        .cm-headline-static {
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 800;
          color: #F2F2EE;
          line-height: 1.1;
          letter-spacing: -1.2px;
          margin: 0 0 2px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .cm-rotating-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 60px;
          margin-bottom: 16px;
        }
        .cm-rotating-phrase {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          color: #dce3ea;
          display: inline-block;
          border-bottom: 3px solid #c9a227;
          padding-bottom: 2px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .cm-cursor {
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 300;
          color: #c9a227;
          opacity: 0.6;
          animation: cm-glow-pulse 0.9s ease-in-out infinite;
          line-height: 1;
        }
        .cm-subcopy {
          font-size: 15px;
          color: #c8cfd8;
          line-height: 1.7;
          margin: 0;
          max-width: 540px;
        }
        .cm-subcopy strong { color: #F2F2EE; font-weight: 700; }

        .cm-right {
          position: relative;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .cm-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 15px 36px;
          background: #c9a227;
          border: 2px solid #c9a227;
          border-radius: 6px;
          color: #1f2d3d;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.3px;
          white-space: nowrap;
          transition: all 0.25s ease;
          overflow: hidden;
          cursor: pointer;
        }
        .cm-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(201,162,39,0.45);
        }
        .cm-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          background-size: 400px 100%;
          animation: cm-shimmer 0.8s ease forwards;
          pointer-events: none;
        }
        .cm-cta-note {
          margin: 0;
          font-size: 11px;
          color: rgba(242,242,238,0.4);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-align: center;
        }

        /* Dropdown, anchored directly under the button, right-aligned to it */
        .cm-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 12px;
          width: 240px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.28);
          overflow: hidden;
          z-index: 30;
          animation: cm-drop-in 0.18s ease;
        }
        .cm-dropdown-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1f2d3d;
          font-size: 0.95rem;
          margin: 0;
          padding: 14px 16px 10px;
          border-bottom: 1px solid #eef1f4;
        }
        .cm-dropdown-list {
          display: flex;
          flex-direction: column;
          padding: 6px;
        }
        .cm-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          border-radius: 8px;
          padding: 10px 10px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          color: #1f2d3d;
          text-align: left;
          transition: background 0.15s ease;
        }
        .cm-pill:hover { background: #fbf3df; }
        .cm-pill-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #eef1f4;
          color: #c9a227;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cm-pill:hover .cm-pill-icon { background: #c9a227; color: #1f2d3d; }

        .cm-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 26, 33, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 50;
        }
        .cm-modal-card {
          background: #fff;
          border-radius: 16px;
          border-top: 6px solid #c9a227;
          max-width: 440px;
          width: 100%;
          padding: 26px 26px 30px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3);
        }
        .cm-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eef1f4;
          border: none;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #1f2d3d;
          cursor: pointer;
          margin-bottom: 16px;
        }
        .cm-back-btn:hover { background: #e2e6eb; }
        .cm-detail-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .cm-detail-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #c9a227;
          color: #1f2d3d;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cm-detail-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.25rem;
          color: #1f2d3d;
          margin: 0;
        }
        .cm-detail-intro {
          color: #5c6b7a;
          line-height: 1.6;
          margin: 0 0 1rem;
        }
        .cm-detail-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .cm-detail-list li {
          display: flex;
          gap: 10px;
          color: #2c3a48;
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .cm-detail-list li::before {
          content: "";
          width: 6px;
          height: 6px;
          margin-top: 8px;
          border-radius: 50%;
          background: #c9a227;
          flex-shrink: 0;
        }

        @media (max-width: 992px) {
          .cm-hero { padding: 60px 30px; }
          .cm-container { gap: 36px; }
        }

        @media (max-width: 768px) {
          .cm-hero { padding: 44px 22px; }
          .cm-container {
            flex-direction: column;
            justify-content: flex-start;
            text-align: center;
            gap: 22px;
          }
          .cm-left {
            flex: 1 1 auto;
            width: 100%;
            text-align: center;
          }
          .cm-rotating-wrap { justify-content: center; }
          .cm-subcopy { margin-left: auto; margin-right: auto; }
          .cm-right { width: 100%; }
          .cm-dropdown { right: 50%; transform: translateX(50%); }
        }

        @media (max-width: 480px) {
          .cm-hero { padding: 40px 16px; }
          .cm-headline-static,
          .cm-rotating-phrase,
          .cm-cursor {
            font-size: 26px;
          }
          .cm-rotating-wrap { min-height: 48px; }
          .cm-subcopy { font-size: 14px; }
          .cm-cta-btn { padding: 10px 24px; font-size: 13px; }
        }
      `}</style>

      <div className="cm-hero">
        <div className="cm-overlay" aria-hidden="true" />

        <div className="cm-container">
          <div className="cm-left">
            <p className="cm-eyebrow">COME AS YOU ARE</p>

            <h2 className="cm-headline-static">Welcome</h2>
            <div className="cm-rotating-wrap">
              <span
                className="cm-rotating-phrase"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {rotatingPhrases[phraseIndex]}
              </span>
              <span className="cm-cursor">|</span>
            </div>

            <p className="cm-subcopy">
              Wherever you are in life, there's a seat waiting for you — real{" "}
              <strong>community</strong>, honest <strong>teaching</strong>, and a family
              that's glad you came.
            </p>
          </div>

          <div className="cm-right">
            <button
              type="button"
              className="cm-cta-btn"
              onClick={toggleBand}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              aria-expanded={open}
            >
              {btnHovered && <span className="cm-shimmer" aria-hidden="true" />}
              <span style={{ position: "relative", zIndex: 1 }}>
                {open ? "Hide Our Services" : "View Our Services"}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform 0.3s ease",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <p className="cm-cta-note">Ministries, meeting times &amp; how to get involved</p>

            {open && (
              <div className="cm-dropdown">
                <p className="cm-dropdown-title">Our Ministries</p>
                <div className="cm-dropdown-list">
                  {ministries.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        className="cm-pill"
                        onClick={() => setSelected(m.key)}
                      >
                        <span className="cm-pill-icon">
                          <Icon size={12} />
                        </span>
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeMinistry && (
        <div className="cm-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="cm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cm-back-btn" onClick={() => setSelected(null)}>
              <FaArrowLeft size={12} /> Back
            </button>
            <div className="cm-detail-header">
              <span className="cm-detail-icon">
                <activeMinistry.icon size={18} />
              </span>
              <h3 className="cm-detail-title">{activeMinistry.label}</h3>
            </div>
            <p className="cm-detail-intro">{activeMinistry.intro}</p>
            {activeMinistry.items.length > 0 && (
              <ul className="cm-detail-list">
                {activeMinistry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <ExploreMoreSection />
      </div>
    </div>
  );
}

export default Church;