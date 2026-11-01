"use client";

import { useRouter } from "next/navigation";

export default function FinalCta() {
  const router = useRouter();

  return (
    <section className="reveal home-final">
      <h2 className="final-title pixel">¿LISTO PARA JUGAR?</h2>
      <button
        className="btn xl pulse final-cta"
        onClick={() => router.push("/games")}
      >
        INSERTAR MONEDA →
      </button>
      <div className="final-tag mono">Gratis. Sin registro obligatorio. Empieza en segundos.</div>
    </section>
  );
}