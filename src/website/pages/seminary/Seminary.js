import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgramsOffered from "./seminarycomponents/ProgramsOffered";
import Enrollment from "./seminarycomponents/Enrollment";
import Portal from "./seminarycomponents/Portal";

/*
  Church palette (matches Header/HeroBanner/GalleryPromoSection):
  --navy : #1f2d3d
  --gold : #c9a227
  --light: #dce3ea
*/

const rotatingPhrases = [
  "Your Calling",
  "Biblical Studies",
  "Ministry Training",
  "Leadership Growth",
  "Deeper Faith",
];

function Seminary() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [btnHovered, setBtnHovered] = useState(false);

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

  const handleExplorePrograms = () => {
    const el = document.getElementById("seminary-programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sem-root">
      <style>{`
        @keyframes sem-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes sem-glow-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }

        .sem-root { width: 100%; }

        /* ---------- Full-width animated hero band ---------- */
        .sem-hero {
          width: 100%;
          background-color: #0a1f44;
        }
        .sem-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3px 0 3px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 90px;
          flex-wrap: wrap;
        }

        .sem-left {
          flex: 1 1 300px;
        }
        .sem-headline-static {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 4.4vw, 46px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          color: #ffffff;
        }
        .sem-rotating-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 56px;
        }
        .sem-rotating-phrase {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 4.4vw, 46px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          color: #dce3ea;
          display: inline-block;
          border-bottom: 3px solid #c9a227;
          padding-bottom: 2px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sem-cursor {
          font-size: clamp(30px, 4.4vw, 46px);
          font-weight: 300;
          color: #c9a227;
          opacity: 0.6;
          animation: sem-glow-pulse 0.9s ease-in-out infinite;
          line-height: 1;
        }
        .sem-rule {
          width: 64px;
          height: 3px;
          margin: 1rem 0 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #c9a227, #e3c964);
        }
        .sem-sub {
          margin: 1.1rem 0 0;
          max-width: 460px;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #c3cbdb;
        }

        .sem-right {
          flex: 1 1 460px;
          max-width: 520px;
        }
        .sem-hero-img-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }
        .sem-hero-img {
          width: 100%;
          aspect-ratio: 3 / 2;
          height: auto;
          object-fit: cover;
          display: block;
        }
        .sem-hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,31,68,0.78) 0%, rgba(31,45,61,0.72) 100%);
        }

        /* CTA button */
        .sem-cta-wrap {
          margin-top: 1.6rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .sem-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 13px 30px;
          background: #c9a227;
          border: 2px solid #c9a227;
          border-radius: 6px;
          color: #1f2d3d;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.3px;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .sem-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(201,162,39,0.45);
        }
        .sem-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          background-size: 400px 100%;
          animation: sem-shimmer 0.8s ease forwards;
          pointer-events: none;
        }

        /* ---------- Rest of page ---------- */
        .sem-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        @media (max-width: 640px) {
          .sem-hero-inner {
            flex-direction: column;
            text-align: center;
            padding: 30px 22px;
            gap: 22px;
          }
          .sem-left { width: 100%; }
          .sem-rotating-wrap { justify-content: center; }
          .sem-rule { margin: 1rem auto 0; }
          .sem-sub { margin: 1.1rem auto 0; }
          .sem-cta-wrap { align-items: center; margin-left: auto; margin-right: auto; }
          .sem-right { width: 100%; max-width: 100%; flex: 1 1 auto; margin-top: 1.8rem; }
          .sem-hero-img { aspect-ratio: 16 / 9; }
          .sem-page { padding: 2rem 1rem 3rem; }
        }

        @media (max-width: 480px) {
          .sem-headline-static,
          .sem-rotating-phrase,
          .sem-cursor {
            font-size: 28px;
          }
          .sem-rotating-wrap { min-height: 44px; }
        }
      `}</style>

      <section className="sem-hero">
        <div className="sem-hero-inner">
          <div className="sem-left">
            <h1 className="sem-headline-static">Step into</h1>
            <div className="sem-rotating-wrap">
              <span
                className="sem-rotating-phrase"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {rotatingPhrases[phraseIndex]}
              </span>
              <span className="sem-cursor">|</span>
            </div>

            <div className="sem-rule" aria-hidden="true" />
            <p className="sem-sub">
              Programs, enrollment, and everything you need to take the next
              step in your calling.
            </p>

            <div className="sem-cta-wrap">
              <button
                type="button"
                className="sem-cta-btn"
                onClick={handleExplorePrograms}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                {btnHovered && <div className="sem-shimmer" aria-hidden="true" />}
                <span style={{ position: "relative", zIndex: 1 }}>Apply</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{
                    position: "relative", zIndex: 1,
                    transition: "transform 0.2s ease",
                    transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="sem-right">
            <div className="sem-hero-img-wrap">
              <img src="/image2.png" alt="" className="sem-hero-img" />
              <div className="sem-hero-img-overlay" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <div className="sem-page">
        <div id="seminary-programs">
          <ProgramsOffered />
        </div>
        <Enrollment />
      </div>
    </div>
  );
}

export default Seminary;