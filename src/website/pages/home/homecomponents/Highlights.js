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
          border-top: 4px solid #C9A53A;
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
          color: #1B3D2F;
        }

        .highlight-desc {
          font-size: 15px;
          color: #3a4a3a;
          line-height: 1.5;
          margin: 0;
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
        }
      `}</style>
    </section>
  );
}

export default Highlights;