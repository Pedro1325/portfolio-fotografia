"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/*
  useReveal — fade/slide an element in once it scrolls into view.
  Mirrors the CSS ".<x> { opacity:0; ... } .<x>.is-visible { opacity:1; }"
  pattern used across site.css. Respects prefers-reduced-motion.
*/
export default function useReveal<T extends Element = HTMLDivElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
