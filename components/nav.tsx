"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import type { Player } from "@/lib/data";

const STORAGE_KEY = "av_user";

function readUser(): Player | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Player) : null;
  } catch {
    return null;
  }
}

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Player | null>(readUser);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/salon") return pathname === "/salon";
    // Biblioteca is active on the library, detail and player routes.
    return pathname === "/" || pathname?.startsWith("/jugar");
  };

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
    setOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="av-nav">
        <div className="logo" onClick={() => go("/")}>
          <div className="logo-mark"></div>
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </div>
        <div className="links">
          <a
            className={isActive("/") ? "active" : ""}
            onClick={() => go("/")}
          >
            Biblioteca
          </a>
          <a
            className={isActive("/salon") ? "active" : ""}
            onClick={() => go("/salon")}
          >
            Salón de la Fama
          </a>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        {user ? (
          <button className="btn ghost auth-btn" onClick={handleSignOut}>
            {user.name} ▾
          </button>
        ) : (
          <button className="btn auth-btn" onClick={() => go("/auth")}>
            Iniciar Sesión
          </button>
        )}
        <button
          className="btn ghost hamburger"
          onClick={() => setOpen(true)}
          aria-label="Menú"
        >
          ≡
        </button>
      </nav>

      <div
        className={"av-mobile-backdrop" + (open ? " open" : "")}
        onClick={() => setOpen(false)}
      ></div>
      <aside className={"av-mobile-panel" + (open ? " open" : "")}>
        <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>
          MENÚ
        </div>
        <a className={isActive("/") ? "active" : ""} onClick={() => go("/")}>
          Biblioteca
        </a>
        <a className={isActive("/salon") ? "active" : ""} onClick={() => go("/salon")}>
          Salón de la Fama
        </a>
        <a className={isActive("/auth") ? "active" : ""} onClick={() => go("/auth")}>
          {user ? "Cuenta" : "Iniciar Sesión"}
        </a>
        <div style={{ flex: 1 }}></div>
        <div
          className="pixel"
          style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}
        >
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  );
}