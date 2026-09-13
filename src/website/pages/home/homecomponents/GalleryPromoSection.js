// src/homecomponents/GalleryPromoSection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  Church palette (matches Header/HeroBanner):
  --navy : #1f2d3d
  --gold : #c9a227
  --light: #dce3ea
*/

const rotatingPhrases = [
  "Fellowship",
  "Community Life",
  "Special Events",
  "Shared Memories",
  "Captured Moments",
];

const GalleryPromoSection = () => {
  const navigate = useNavigate();
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

  const handleVisitGallery = () => {
    navigate("/gallery");
  };

  return (
    <section className="gp-section">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }

        .gp-section {
          position: relative;
          background-image: url("https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80");
          background-size: cover;
          background-position: center top;
          padding: 72px 40px;
          overflow: hidden;
        }

        .gp-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(31,45,61,0.85) 0%, rgba(10,16,24,0.80) 100%);
          z-index: 1;
        }

        .gp-container {
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

        .gp-left {
          flex: 1 1 420px;
        }
        .gp-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #c9a227;
          opacity: 0.9;
          margin: 0 0 16px;
        }
        .gp-headline-static {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 800;
          color: #F2F2EE;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 0 0 2px;
        }
        .gp-rotating-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 68px;
          margin-bottom: 18px;
        }
        .gp-rotating-phrase {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
          color: #dce3ea;
          display: inline-block;
          border-bottom: 3px solid #c9a227;
          padding-bottom: 2px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gp-cursor {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 300;
          color: #c9a227;
          opacity: 0.6;
          animation: glow-pulse 0.9s ease-in-out infinite;
          line-height: 1;
        }
        .gp-subcopy {
          font-size: 15px;
          color: #c8cfd8;
          line-height: 1.7;
          margin: 0;
          max-width: 540px;
        }
        .gp-strong {
          color: #F2F2EE;
          font-weight: 700;
        }

        /* Right column: CTA button, vertically centered next to the text */
        .gp-right {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .gp-cta-btn {
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
        .gp-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(201,162,39,0.45);
        }
        .gp-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          background-size: 400px 100%;
          animation: shimmer 0.8s ease forwards;
          pointer-events: none;
        }
        .gp-cta-note {
          margin: 0;
          font-size: 11px;
          color: rgba(242,242,238,0.35);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-align: center;
        }

        /* Responsive: Tablet */
        @media (max-width: 992px) {
          .gp-section {
            padding: 60px 30px;
          }
          .gp-container {
            gap: 36px;
          }
        }

        /* Responsive: Mobile */
        @media (max-width: 768px) {
          .gp-section {
            padding: 48px 20px;
          }
          .gp-container {
            flex-direction: column;
            text-align: center;
          }
          .gp-left {
            text-align: center;
          }
          .gp-subcopy {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .gp-cta-btn {
            padding: 12px 28px;
            font-size: 14px;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .gp-section {
            padding: 40px 16px;
          }
          .gp-headline-static,
          .gp-rotating-phrase,
          .gp-cursor {
            font-size: 28px;
          }
          .gp-rotating-wrap {
            min-height: 56px;
          }
          .gp-subcopy {
            font-size: 14px;
          }
          .gp-cta-btn {
            padding: 10px 24px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="gp-overlay" aria-hidden="true" />

      <div className="gp-container">
        <div className="gp-left">
          <p className="gp-eyebrow">LIFE AT CHRIST BAPTIST</p>

          <h2 className="gp-headline-static">Relive our</h2>
          <div className="gp-rotating-wrap">
            <span
              className="gp-rotating-phrase"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {rotatingPhrases[phraseIndex]}
            </span>
            <span className="gp-cursor">|</span>
          </div>

          <p className="gp-subcopy">
            From <strong className="gp-strong">Sunday services and baptisms to seminary
            events, missions, and church family gatherings</strong> - step into the gallery
            and see the moments that make our church family what it is.
          </p>
        </div>

        <div className="gp-right">
          <button
            type="button"
            className="gp-cta-btn"
            onClick={handleVisitGallery}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {btnHovered && <div className="gp-shimmer" aria-hidden="true" />}
            <span style={{ position: "relative", zIndex: 1 }}>Visit the Gallery</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24"
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
          <p className="gp-cta-note">Photos from services, events &amp; community life</p>
        </div>
      </div>
    </section>
  );
};

export default GalleryPromoSection;