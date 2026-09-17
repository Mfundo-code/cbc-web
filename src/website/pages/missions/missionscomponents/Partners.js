import React, { useEffect, useState, useMemo } from "react";
import { getPartners } from "../../../../global/api";

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners()
      .then((res) => setPartners(res.data.results || res.data))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  const initials = (name) =>
    (name || "?")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Duplicate so translateX(-50%) loops seamlessly (second half === first half)
  const track = useMemo(() => [...partners, ...partners], [partners]);
  const duration = Math.max(partners.length * 5, 16);

  return (
    <section className="pt-section">
      <style>{`
        .pt-section { display: flex; flex-direction: column; }

        .pt-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 1.4rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(1.4rem, 2.6vw, 1.8rem);
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #1f2d3d;
        }
        .pt-heading::before {
          content: "";
          width: 6px;
          height: 26px;
          border-radius: 999px;
          background: linear-gradient(180deg, #c9a227, #e3c964);
        }

        /* ---------- Viewport / marquee ---------- */
        .pt-viewport {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 4%,
            #000 96%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 4%,
            #000 96%,
            transparent 100%
          );
        }

        .pt-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: pt-scroll ${duration}s linear infinite;
        }
        .pt-viewport:hover .pt-track {
          animation-play-state: paused;
        }

        @keyframes pt-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-track { animation: none; }
          .pt-viewport { overflow-x: auto; }
        }

        /* ---------- Card ---------- */
        .pt-card {
          position: relative;
          flex: 0 0 auto;
          /* 1 per view on mobile */
          width: calc((100vw - 3rem) * 1);
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem 1.25rem;
          background: #ffffff;
          border: 1px solid #e7ebef;
          border-radius: 14px;
          text-decoration: none;
          color: #1f2d3d;
          box-shadow: 0 2px 10px rgba(31,45,61,0.04);
          overflow: hidden;
        }
        .pt-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c9a227, #e3c964);
        }

        .pt-logo-wrap {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: #f5f7f9;
          border: 1px solid #e7ebef;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .pt-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 12px;
          box-sizing: border-box;
        }
        .pt-initials {
          font-family: 'Georgia', serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #c9a227;
          letter-spacing: 0.04em;
        }

        .pt-name {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.2px;
          color: #1f2d3d;
          text-align: center;
          line-height: 1.3;
        }

        .pt-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a95a1;
        }
        .pt-card:hover .pt-cta { color: #c9a227; }

        /* Skeleton */
        @keyframes pt-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .pt-skel-row {
          display: flex;
          gap: 1rem;
          overflow: hidden;
        }
        .pt-skeleton {
          flex: 0 0 auto;
          width: calc((100vw - 3rem) * 1);
          max-width: 320px;
          height: 175px;
          border-radius: 14px;
          background: linear-gradient(90deg, #eef1f4 0%, #e2e7ec 50%, #eef1f4 100%);
          background-size: 400px 100%;
          animation: pt-shimmer 1.3s linear infinite;
          border: 1px solid #e7ebef;
        }

        .pt-empty {
          text-align: center;
          padding: 2rem 1rem;
          border-radius: 12px;
          background: #f5f7f9;
          border: 1px dashed #d7dce2;
          color: #6b7684;
          font-size: 0.92rem;
        }

        /* ---------- Responsive: 2 per view tablet, 3 per view desktop ---------- */
        @media (min-width: 640px) {
          .pt-card, .pt-skeleton {
            width: calc((100vw - 4rem) / 2);
            max-width: 360px;
          }
        }
        @media (min-width: 1024px) {
          .pt-card, .pt-skeleton {
            width: calc((100vw - 6rem) / 3);
            max-width: 320px;
          }
        }
      `}</style>

      <h2 className="pt-heading">Our Partners</h2>

      {loading ? (
        <div className="pt-skel-row" aria-busy="true">
          {[1, 2, 3].map((n) => (
            <div className="pt-skeleton" key={n} />
          ))}
        </div>
      ) : partners.length === 0 ? (
        <div className="pt-empty">Partner information coming soon.</div>
      ) : (
        <div className="pt-viewport">
          <div className="pt-track">
            {track.map((p, i) => (
              <a
                key={`${p.id}-${i}`}
                href={p.website_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-card"
              >
                <div className="pt-logo-wrap">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="pt-logo" />
                  ) : (
                    <span className="pt-initials">{initials(p.name)}</span>
                  )}
                </div>
                <h3 className="pt-name">{p.name}</h3>
                {p.website_url && (
                  <span className="pt-cta">
                    Visit
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Partners;