"use client";

import { useRouter } from "next/navigation";

import { HOME_ACTIVITY, HOME_TOP_PLAYERS } from "@/home/data";

export default function ActivityLive() {
  const router = useRouter();

  return (
    <section className="reveal home-section">
      <div className="section-head">
        <div className="kicker pixel neon-yellow">03</div>
        <h2 className="section-title pixel">ACTIVIDAD EN VIVO</h2>
        <div className="section-rule"></div>
      </div>
      <div className="activity-grid">
        <div className="activity-card">
          <div className="ac-head">
            <div className="ac-title pixel neon-magenta">▸ ÚLTIMAS PUNTUACIONES</div>
          </div>
          <div className="ticker">
            {HOME_ACTIVITY.map((r, i) => (
              <div key={i} className="tick-row" style={{ animationDelay: `${i * 60}ms` }}>
                <span className={`tk-p neon-${r.color}`}>{r.player}</span>
                <span className="tk-mid">▸ {r.game}</span>
                <span className="tk-s">+{r.score.toLocaleString("es-ES")}</span>
                <span className="tk-t">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-card">
          <div className="ac-head">
            <div className="ac-title pixel neon-magenta">▸ TOP JUGADORES · HOY</div>
            <button className="lb-link" onClick={() => router.push("/salon")}>
              VER SALÓN →
            </button>
          </div>
          <div className="top-list">
            {HOME_TOP_PLAYERS.map((r, i) => (
              <div
                key={r.rank}
                className={`top-row${i === 0 ? " top1" : i === 1 ? " top2" : i === 2 ? " top3" : ""}`}
              >
                <span className="tp-rk">#{String(r.rank).padStart(2, "0")}</span>
                <span className="tp-bar">
                  <span className="tp-fill" style={{ width: `${100 - i * 16}%` }} />
                </span>
                <span className="tp-p">{r.player}</span>
                <span className="tp-s">{r.score.toLocaleString("es-ES")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}