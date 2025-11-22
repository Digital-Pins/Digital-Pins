"use client";
import { useEffect, useState } from "react";

const images = [
  "/assets/images/erp/dolibarr_screenshot1_1280x800.jpg",
  "/assets/images/erp/dolibarr_screenshot2_1280x800.jpg",
  "/assets/images/erp/dolibarr_screenshot3_1280x800.png",
  "/assets/images/erp/dolibarr_screenshot6_1920x1080.jpg",
  "/assets/images/erp/dolibarr_screenshot7_1920x1080.jpg",
  "/assets/images/erp/dolibarr_screenshot10_1920x1080.jpg",
  "/assets/images/erp/dolibarr_screenshot11_1024x768.jpg",
  "/assets/images/erp/dolibarr_screenshot12_1280x800.jpg",
];

export default function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Respect user reduced-motion preference
    if (typeof window !== 'undefined') {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (m.matches) setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative aspect-video rounded-lg overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Dolibarr ERP screenshots"
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === idx ? `Dolibarr ERP screenshot ${i + 1}` : ''}
          aria-hidden={i !== idx}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />)
      )}
      <div className="absolute inset-x-0 bottom-0 p-2 flex justify-center gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === idx}
            onClick={() => setIdx(i)}
            className={`h-1.5 w-4 rounded-full transition ${i === idx ? 'bg-white/80' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
