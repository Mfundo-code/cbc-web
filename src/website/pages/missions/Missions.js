import React from "react";
import AboutMissions from "./missionscomponents/AboutMissions";
import Partners from "./missionscomponents/Partners";
import ActiveMissions from "./missionscomponents/ActiveMissions";

function Missions() {
  return (
    <div className="missions-page">
      <style>{`
        .missions-page {
          max-width: 960px;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 3.5rem;
        }
        .missions-header {
          text-align: center;
          margin-bottom: 2.75rem;
        }
        .missions-eyebrow {
          margin: 0 0 0.7rem;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c9a227;
        }
        .missions-title {
          margin: 0;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 4.4vw, 46px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          color: #1f2d3d;
        }
        .missions-rule {
          width: 64px;
          height: 3px;
          margin: 1rem auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #c9a227, #e3c964);
        }
        .missions-sub {
          margin: 1.1rem auto 0;
          max-width: 560px;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #5b6879;
        }
        .missions-body {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        @media (max-width: 640px) {
          .missions-page { padding: 2rem 1rem 3rem; }
          .missions-body { gap: 2.25rem; }
        }
      `}</style>

      <header className="missions-header">
        <p className="missions-eyebrow">GO &amp; SERVE</p>
        <h1 className="missions-title">Missions</h1>
        <div className="missions-rule" aria-hidden="true" />
        <p className="missions-sub">
          The people, partners, and projects we walk alongside - locally and
          around the world.
        </p>
      </header>

      <div className="missions-body">
        <AboutMissions />
        <Partners />
        <ActiveMissions />
      </div>
    </div>
  );
}

export default Missions;