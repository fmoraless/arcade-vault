export default function Home() {
  return (
    <div className="av-main">
      <nav className="av-nav">
        <div className="logo">
          <div className="logo-mark"></div>
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </div>
        <div className="links">
          <a className="active">Biblioteca</a>
          <a>Salón de la Fama</a>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        <button className="btn auth-btn">Iniciar Sesión</button>
        <button className="btn ghost hamburger" aria-label="Menú">
          ≡
        </button>
      </nav>

      <section className="av-hero">
        <h1 className="flicker pixel">ARCADE VAULT</h1>
        <div className="sub">
          INSERTA UNA MONEDA PARA JUGAR <span className="blink">_</span>
        </div>
      </section>

      <div className="av-filters">
        <div className="av-search">
          <span className="ico">⌕</span>
          <input placeholder="Buscar un juego por nombre…" />
        </div>
        <div className="av-chips">
          <button className="chip active">TODOS</button>
          <button className="chip">ARCADE</button>
          <button className="chip">PUZZLE</button>
          <button className="chip">SHOOTER</button>
          <button className="chip">VERSUS</button>
        </div>
      </div>

      <div className="av-grid">
        <article className="card">
          <div className="cover">
            <div className="cover-bg cover-bricks" />
            <div className="label">ARCADE</div>
          </div>
          <div className="meta">
            <div className="title">BLOQUE BUSTER</div>
            <div className="desc">Rebota la pelota y destruye muros de neón.</div>
            <div className="row">
              <div className="score-badge">
                <span>MEJOR PUNTUACIÓN</span>
                <b>28.450</b>
              </div>
              <button className="btn cyan">JUGAR</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}