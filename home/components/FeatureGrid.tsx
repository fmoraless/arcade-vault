"use client";

import { HOME_FEATURES } from "@/home/data";

export default function FeatureGrid() {
  return (
    <section className="reveal home-section">
      <div className="section-head">
        <div className="kicker pixel neon-magenta">01</div>
        <h2 className="section-title pixel">¿POR QUÉ ARCADE VAULT?</h2>
        <div className="section-rule"></div>
      </div>
      <div className="feature-grid">
        {HOME_FEATURES.map((f) => (
          <div
            key={f.id}
            className={`feature-card ${f.color}`}
            style={{ transitionDelay: `${f.id.charCodeAt(0) * 10}ms` }}
          >
            <svg className="ft-icon" viewBox="0 0 16 16">
              <g fill="currentColor">
                {f.id === "GAMEPAD" && (
                  <g>
                    <rect x="2" y="6" width="12" height="6" />
                    <rect x="0" y="8" width="2" height="4" />
                    <rect x="14" y="8" width="2" height="4" />
                    <rect x="3" y="8" width="2" height="2" />
                    <rect x="2" y="9" width="4" height="0.5" />
                    <rect x="11" y="7" width="1.5" height="1.5" />
                    <rect x="11" y="10" width="1.5" height="1.5" />
                  </g>
                )}
                {f.id === "FREE" && (
                  <g>
                    <rect x="3" y="3" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="5" y="6" width="1.5" height="4" />
                    <rect x="5" y="6" width="4" height="1.5" />
                    <rect x="5" y="8" width="3" height="1" />
                    <rect x="10" y="6" width="1.5" height="4" />
                  </g>
                )}
                {f.id === "TROPHY" && (
                  <g>
                    <rect x="3" y="2" width="10" height="2" />
                    <rect x="3" y="2" width="2" height="6" />
                    <rect x="11" y="2" width="2" height="6" />
                    <rect x="5" y="8" width="6" height="2" />
                    <rect x="7" y="10" width="2" height="3" />
                    <rect x="5" y="13" width="6" height="1.5" />
                    <rect x="1" y="3" width="2" height="3" />
                    <rect x="13" y="3" width="2" height="3" />
                  </g>
                )}
                {f.id === "ROCKET" && (
                  <g>
                    <rect x="7" y="1" width="2" height="2" />
                    <rect x="6" y="3" width="4" height="2" />
                    <rect x="5" y="5" width="6" height="6" />
                    <rect x="4" y="11" width="2" height="2" />
                    <rect x="10" y="11" width="2" height="2" />
                    <rect x="7" y="6" width="2" height="2" fill="#0a0a0f" />
                    <rect x="6" y="13" width="1" height="2" />
                    <rect x="9" y="13" width="1" height="2" />
                  </g>
                )}
              </g>
            </svg>
            <div className="ft-title pixel">{f.title}</div>
            <div className="ft-desc mono">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}