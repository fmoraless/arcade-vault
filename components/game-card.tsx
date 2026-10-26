"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import type { Game } from "@/lib/data";

const COLOR_CLASS: Record<Game["color"], string> = {
  cyan: "",
  magenta: "magenta",
  yellow: "yellow",
  green: "",
};

export default function GameCard({
  game,
  onPlay,
}: {
  game: Game;
  onPlay?: (game: Game) => void;
}) {
  const router = useRouter();
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-6px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleSelect = () => {
    router.push(`/jugar/${game.id}`);
    onPlay?.(game);
  };

  const buttonClass = ["btn", COLOR_CLASS[game.color]].filter(Boolean).join(" ");

  return (
    <div
      ref={tiltRef}
      className="card"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      }}
    >
      <div className="cover">
        <div className={"cover-bg " + game.cover}></div>
        <div className="label">{game.cat}</div>
      </div>
      <div className="meta">
        <div className="title">{game.title}</div>
        <div className="desc">{game.short}</div>
        <div className="row">
          <div className="score-badge">
            <span>MEJOR PUNTUACIÓN</span>
            <b>{game.best.toLocaleString("es-ES")}</b>
          </div>
          <button
            className={buttonClass}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
          >
            JUGAR
          </button>
        </div>
      </div>
    </div>
  );
}