"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { GAMES, seededScores } from "@/lib/data";

const STORAGE_KEY = "av_user";

type ScoreRow = {
  rank: number;
  name: string;
  score: number;
  date: string;
};

function readUser(): { name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { name: string }) : null;
  } catch {
    return null;
  }
}

const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export default function SalonPage() {
  const router = useRouter();
  const [tab, setTab] = useState(GAMES[0].id);
  const userStr: string = useSyncExternalStore(subscribe, () => JSON.stringify(readUser()), () => "null");
  const user: { name: string } | null = userStr === "null" ? null : JSON.parse(userStr);

  const rows: ScoreRow[] = seededScores(tab.length * 23 + 7, 12);

  const game = GAMES.find((g) => g.id === tab);
  const top3 = rows.slice(0, 3);

  // Posición/marca del usuario si está dentro del top 10
  const youIndex = user ? rows.findIndex((r) => r.name === user.name) : -1;
  const youRank = youIndex >= 0 ? rows[youIndex].rank : null;
  const youScore = youIndex >= 0 ? rows[youIndex].score : null;

  const slotClass = (i: number) => {
    if (i === 0) return "podium-slot gold";
    if (i === 1) return "podium-slot silver";
    if (i === 2) return "podium-slot bronze";
    return "podium-slot";
  };

  return (
    <main className="av-main fade-in">
      <div className="av-hall">
        <div className="hall-head">
          <h1>SALÓN DE LA FAMA</h1>
          <p className="pixel">LOS NOMBRES QUE NUNCA SE BORRAN DE LA PANTALLA</p>
        </div>

        <div className="hall-tabs">
          {GAMES.map((g) => (
            <button
              key={g.id}
              className={"chip" + (tab === g.id ? " active" : "")}
              onClick={() => setTab(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Podio top 3 */}
        <div className="podium">
          <div className={slotClass(1)}>
            <div className="rank-num">02</div>
            <div className="name">{top3[1]?.name ?? "—"}</div>
            <div className="score">{top3[1]?.score.toLocaleString("es-ES") ?? "—"}</div>
            <div className="date">{top3[1]?.date ?? "—"}</div>
          </div>
          <div className={slotClass(0)}>
            <div className="pixel" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.18em" }}>
              CAMPEÓN
            </div>
            <div className="rank-num" style={{ fontSize: 36, marginTop: 4 }}>
              01
            </div>
            <div className="name">{top3[0]?.name ?? "—"}</div>
            <div className="score" style={{ fontSize: 20 }}>
              {top3[0]?.score.toLocaleString("es-ES") ?? "—"}
            </div>
            <div className="date">{top3[0]?.date ?? "—"}</div>
          </div>
          <div className={slotClass(2)}>
            <div className="rank-num">03</div>
            <div className="name">{top3[2]?.name ?? "—"}</div>
            <div className="score">{top3[2]?.score.toLocaleString("es-ES") ?? "—"}</div>
            <div className="date">{top3[2]?.date ?? "—"}</div>
          </div>
        </div>

        {/* Tabla top 10 */}
        <div className="hall-table">
          <div className="th">
            <div>RANGO</div>
            <div>JUGADOR</div>
            <div>PUNTUACIÓN</div>
            <div>FECHA</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.name + i}
              className={
                "tr" +
                (i === 0
                  ? " top1"
                  : i === 1
                  ? " top2"
                  : i === 2
                  ? " top3"
                  : "")
              }
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="rk">#{String(r.rank).padStart(2, "0")}</div>
              <div className="pl">{r.name}</div>
              <div className="sc">{r.score.toLocaleString("es-ES")}</div>
              <div className="dt">{r.date}</div>
            </div>
          ))}
          {user && youIndex < 0 && (
            <div
              className="tr you-label"
              style={{ animationDelay: `${rows.length * 50 + 50}ms` }}
            >
              ▸ {user.name}, TU MEJOR MARCA EN {game?.title ?? ""}
            </div>
          )}
          {user && youIndex >= 0 && youRank && youScore !== null && (
            <div
              className="tr you"
              style={{ animationDelay: `${rows.length * 50 + 50}ms` }}
            >
              <div className="rk" style={{ color: "var(--yellow)" }}>
                #{String(youRank).padStart(2, "0")}
              </div>
              <div className="pl" style={{ color: "var(--yellow)" }}>
                {user.name}
              </div>
              <div
                className="sc"
                style={{
                  color: "var(--yellow)",
                  textShadow: "0 0 6px rgba(245,255,0,0.5)",
                }}
              >
                {youScore.toLocaleString("es-ES")}
              </div>
              <div className="dt">11/05/2026</div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="btn lg" onClick={() => router.push("/")}>
            VOLVER A LA BIBLIOTECA
          </button>
        </div>
      </div>
    </main>
  );
}
