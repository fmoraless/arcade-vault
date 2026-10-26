"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "av_user";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", password: "", email: "" });

  useEffect(() => {
    document.body.classList.add("av-auth-wrap");
    return () => document.body.classList.remove("av-auth-wrap");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTab = (t: "login" | "register") => {
    setTab(t);
    setForm({ name: "", password: "", email: "" });
  };

  const handleLogin = () => {
    // Simulación de login
    if (form.name.trim()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: form.name }));
        router.push("/");
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  const handleRegister = () => {
    // Simulación de registro
    if (form.name.trim()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: form.name }));
        router.push("/");
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <main className="av-auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="mark"></div>
          <h2>ARCADE VAULT</h2>
        </div>

        <div className="auth-tabs">
          <button className={tab === "login" ? "on" : ""} onClick={() => handleTab("login")}>
            INICIAR SESIÓN
          </button>
          <button className={tab === "register" ? "on" : ""} onClick={() => handleTab("register")}>
            CREAR CUENTA
          </button>
        </div>

        <div className="field">
          <label>USUARIO</label>
          <input
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>CONTRASEÑA</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {tab === "register" && (
          <div className="field">
            <label>CORREO</label>
            <input
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="auth-divider">
          <span>—</span>
          <span>—</span>
        </div>

        <div className="social">
          <button className="btn" style={{ borderColor: "var(--cyan)" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Google
          </button>
          <button className="btn" style={{ borderColor: "var(--magenta)" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18m0 0L6 6m12 0l-12 12" />
            </svg>
            GitHub
          </button>
        </div>

        {tab === "login" ? (
          <button className="btn lg" onClick={handleLogin}>
            INICIAR SESIÓN
          </button>
        ) : (
          <button className="btn lg" onClick={handleRegister}>
            CREAR CUENTA
          </button>
        )}

        <div className="auth-divider" style={{ margin: "16px 0" }}>
          <span>—</span>
          <span>—</span>
        </div>

        <button className="btn xl pulse" style={{ color: "var(--cyan)", borderColor: "var(--cyan)" }} onClick={() => router.push("/")}>
          JUGAR COMO INVITADO
        </button>
      </div>
    </main>
  );
}