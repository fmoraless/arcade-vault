"use client";

import { useRouter } from "next/navigation";

import { HOME_FEATURED_GAMES } from "@/home/data";

export default function MiniRail() {
  const router = useRouter();

  return (
    <section className="reveal home-section">
      <div className="section-head">
        <div className="kicker pixel neon-cyan">02</div>
        <h2 className="section-title pixel">JUEGOS DISPONIBLES AHORA</h2>
        <div className="section-rule"></div>
      </div>
      <div className="mini-rail">
        {HOME_FEATURED_GAMES.map((g) => (
          <div
            key={g.id}
            className="mini-card"
            onClick={() => router.push("/games")}
          >
            <div className="mini-cover">
              <div className={`cover-bg ${g.cover}`} />
            </div>
            <div className="mini-meta">
              <div className="mini-title pixel">{g.title}</div>
              <div className="mini-cat mono">{g.cat}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button className="btn lg" onClick={() => router.push("/games")}>
          VER TODOS LOS JUEGOS →
        </button>
      </div>
    </section>
  );
}