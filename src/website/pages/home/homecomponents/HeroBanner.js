import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const heroImages = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];

function pickNextIndex(currentIndex, total) {
  if (total <= 1) return 0;
  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * total);
  }
  return next;
}

function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {

      setActiveIndex((prev) => pickNextIndex(prev, heroImages.length));
    }, 10000); // how long each image stays fully visible before the next crossfade starts

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-image-layer" aria-hidden="true">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="hero-bg-image"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              filter: i === activeIndex ? "blur(0px)" : "blur(22px)",
              zIndex: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="hero-image-overlay" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Welcome to Christ Baptist</h1>
        <p className="hero-subtitle">
          A place to belong, grow in faith, and serve together.
        </p>
        <div className="hero-actions">
          <Link to="/plan-your-visit" className="hero-primary-btn">
            Plan Your Visit
          </Link>
          <Link to="/sermons" className="hero-secondary-btn">
            Watch Sermons
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          color: #fff;
          padding: 7rem 1.5rem 8rem; /* extra bottom room for Highlights to overlap by -50px */
          text-align: center;
          overflow: hidden;
          background-color: #1f2d3d; /* shows briefly while the first image loads */
        }

        .hero-image-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          /* Slow, overlapping crossfade: both the outgoing and incoming
             image are mid-transition together for a long stretch of this
             duration, which is what makes it read as one replacing the
             other rather than a hide-then-show. */
          transition: opacity 7s ease-in-out, filter 7s ease-in-out;
          will-change: opacity, filter;
        }

        .hero-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(31,45,61,0.75) 0%, rgba(31,45,61,0.6) 50%, rgba(31,45,61,0.8) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
        }

        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #dce3ea;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-primary-btn {
          background-color: #c9a227;
          color: #1f2d3d;
          padding: 0.8rem 1.6rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.35);
        }

        .hero-secondary-btn {
          border: 1px solid #fff;
          color: #fff;
          padding: 0.8rem 1.6rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .hero-secondary-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 576px) {
          .hero-section {
            padding: 5rem 1.5rem 6rem;
          }
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroBanner;