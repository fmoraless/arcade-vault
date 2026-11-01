"use client";

import { useRouter } from "next/navigation";

import { PRICING_FAQ } from "@/home/data";

export default function PricingSection() {
  const router = useRouter();

  return (
    <section className="reveal home-section">
      <div className="section-head">
        <div className="kicker pixel neon-green">04</div>
        <h2 className="section-title pixel">PRECIOS</h2>
        <div className="section-rule"></div>
      </div>
      <div className="pricing-grid">
        <div className="price-card">
          <div className="pc-label pixel">PLAN ÚNICO</div>
          <div className="pc-name pixel">JUGADOR VAULT</div>
          <div className="pc-amount">
            <span className="pc-amount-n neon-yellow">$0</span>
            <span className="pc-amount-u mono">/ SIEMPRE</span>
          </div>
          <div className="pc-tag pixel">SIN TRUCOS · SIN LETRA PEQUEÑA</div>
          <ul className="pc-list">
            <li>✔ Acceso a todos los juegos</li>
            <li>✔ Ranking global y salón de la fama</li>
            <li>✔ Sin anuncios entre partidas</li>
            <li>✔ Guarda tus puntuaciones</li>
            <li>✔ Nuevos juegos cada mes</li>
            <li>✔ Funciona en cualquier navegador</li>
          </ul>
          <button
            className="btn xl pulse"
            style={{ width: "100%" }}
            onClick={() => router.push("/auth")}
          >
            EMPEZAR GRATIS →
          </button>
          <div className="pc-foot mono">No pedimos tarjeta. Nunca lo haremos.</div>
          <div className="pc-stamp pixel">FREE<br />PLAY</div>
        </div>

        <div className="pricing-faq">
          {PRICING_FAQ.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q pixel">{faq.q}</div>
              <div className="faq-a mono">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}