import React from "react";
import { Link } from "react-router-dom";

const items = [
  { title: "Events", desc: "See what's coming up next.", to: "/updates" },
  { title: "Seminary", desc: "Programs and enrollment.", to: "/seminary" },
  { title: "Personal Growth", desc: "Counselling, self growth, and got questions.", to: "/personal-growth" },
];

function Highlights() {
  return (
    <section className="highlights-section">
      <div className="highlights-container">
        <div className="highlights-grid">
          {items.map((item) => (
            <Link to={item.to} key={item.title} className="highlight-card">
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-desc">{item.desc}</p>
              <span className="highlight-btn">
                Explore
                <span className="highlight-dots" aria-hidden="true">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Base styles */
        .highlights-section {
          position: relative;
          z-index: 10;
          margin-top: -50px;
          margin-bottom: -50px;
        }

        .highlights-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .highlight-card {
          display: block;
          background-color: #F2F2EE;
          border-radius: 12px;
          padding: 48px 24px;
          box-shadow: 0 12px 32px rgba(27,61,47,0.14);
          border-top: 4px solid #c9a227;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(27,61,47,0.2);
        }

        .highlight-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1f2d3d;
        }

        .highlight-desc {
          font-size: 15px;
          color: #444;
          line-height: 1.5;
          margin: 0;
        }

        /* ---------- "Explore" button + animated dots ---------- */
        .highlight-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          padding: 9px 18px;
          border-radius: 999px;
          background-color: #1f2d3d;
          color: #f5d976;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: highlight-pulse 2.4s ease-in-out infinite;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .highlight-card:hover .highlight-btn {
          background-color: #c9a227;
          color: #1f2d3d;
          transform: translateX(3px);
        }

        .highlight-dots {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .highlight-dots .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: currentColor;
          animation: highlight-dot-bounce 1.3s infinite ease-in-out;
        }
        .highlight-dots .dot:nth-child(1) { animation-delay: 0s; }
        .highlight-dots .dot:nth-child(2) { animation-delay: 0.15s; }
        .highlight-dots .dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes highlight-dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }

        @keyframes highlight-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.5); }
          50% { box-shadow: 0 0 0 7px rgba(201, 162, 39, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .highlight-btn { animation: none; }
          .highlight-dots .dot { animation: none; opacity: 0.9; }
        }

        /* Tablet (max-width: 992px) */
        @media (max-width: 992px) {
          .highlights-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .highlight-card {
            padding: 36px 20px;
          }
          .highlight-title {
            font-size: 18px;
          }
          .highlight-desc {
            font-size: 14px;
          }
          .highlight-btn {
            font-size: 11px;
            padding: 8px 15px;
            margin-top: 14px;
          }
        }

        /* Mobile (max-width: 576px) */
        @media (max-width: 576px) {
          .highlights-section {
            margin-top: -30px;
            margin-bottom: -30px;
          }
          .highlights-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .highlight-card {
            padding: 32px 16px;
          }
          .highlight-title {
            font-size: 16px;
          }
          .highlight-desc {
            font-size: 13px;
          }
          .highlight-btn {
            font-size: 11px;
            padding: 7px 14px;
            margin-top: 12px;
          }
        }
      `}</style>
    </section>
  );
}

export default Highlights;