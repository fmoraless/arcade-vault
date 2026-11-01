"use client";

import { HOME_STATS } from "@/home/data";

export default function HomeStats() {
  return (
    <section className="reveal home-stats">
      <div className="stats-inner">
        {HOME_STATS.map((st, i) => (
          <div key={i} className="stat-block" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="stat-n neon-yellow">{st.number}</div>
            <div className="stat-u pixel">{st.unit}</div>
            <div className="stat-s mono">{st.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}