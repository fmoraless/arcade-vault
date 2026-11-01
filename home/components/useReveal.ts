"use client";

import { useEffect } from "react";

const THRESHOLD = 0.12;

export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: THRESHOLD }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}