// Brings back one-click access to Sermons, Missions, and Gallery — these
// used to live in the header's "Church ▾" dropdown; now they live here as
// their own inviting section at the bottom of the Church page.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle, FaHandsHelping, FaImages } from "react-icons/fa";

const links = [
  {
    key: "sermons",
    to: "/sermons",
    icon: FaPlayCircle,
    title: "Watch & Listen",
    desc: "Catch up on past messages and grow through the Word, wherever you are.",
  },
  {
    key: "missions",
    to: "/missions",
    icon: FaHandsHelping,
    title: "Our Missions",
    desc: "See how we're reaching our community and beyond, and how you can join in.",
  },
  {
    key: "gallery",
    to: "/gallery",
    icon: FaImages,
    title: "Photo Gallery",
    desc: "Relive moments from services, baptisms, and church family gatherings.",
  },
];

function ExploreMoreSection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <section className="em-section">
      <style>{`
        .em-section {
          position: relative;
          background: #f7f8fa;
          border: 1px solid #e7eaee;
          border-radius: 16px;
          padding: 56px 40px;
          margin-top: 3rem;
          overflow: hidden;
        }
        .em-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .em-header {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 560px;
          margin: 0 auto 36px;
        }
        .em-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #c9a227;
          margin: 0 0 12px;
        }
        .em-heading {
          font-size: clamp(24px, 3.4vw, 32px);
          font-weight: 800;
          color: #1f2d3d;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
        }
        .em-sub {
          font-size: 14.5px;
          color: #5c6b7a;
          line-height: 1.6;
          margin: 0;
        }
        .em-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .em-card {
          background: #ffffff;
          border: 3px solid #e7eaee;
          border-radius: 12px;
          padding: 28px 22px;
          cursor: pointer;
          text-align: left;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .em-card:hover {
          transform: translateY(-4px);
          border-color: #c9a227;
          box-shadow: 0 8px 20px rgba(201,162,39,0.2);
        }
        .em-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #c9a227;
          color: #1f2d3d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .em-card-title {
          color: #1f2d3d;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 6px;
        }
        .em-card-desc {
          color: #5c6b7a;
          font-size: 0.85rem;
          line-height: 1.55;
          margin: 0 0 14px;
        }
        .em-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #c9a227;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .em-arrow {
          transition: transform 0.2s ease;
        }
        .em-card:hover .em-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="em-glow" aria-hidden="true" />

      <div className="em-header">
        <p className="em-eyebrow">MORE TO EXPLORE</p>
        <h2 className="em-heading">There's more happening here</h2>
        <p className="em-sub">
          Sermons to grow through, missions to be part of, and moments worth remembering.
        </p>
      </div>

      <div className="em-grid">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.key}
              type="button"
              className="em-card"
              onClick={() => navigate(link.to)}
              onMouseEnter={() => setHovered(link.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="em-icon">
                <Icon size={18} />
              </span>
              <p className="em-card-title">{link.title}</p>
              <p className="em-card-desc">{link.desc}</p>
              <span className="em-card-link">
                Explore
                <svg
                  className="em-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreMoreSection;