"use client";

import { useState, useEffect } from "react";

interface HeroSliderProps {
  specialties: string[];
}

export default function HeroSlider({ specialties }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % specialties.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [specialties.length]);

  return (
    <span className="inline-block text-brand-primary relative h-[1.3em] overflow-hidden min-w-95 text-left vertical-bottom pl-1">
      {specialties.map((text, idx) => (
        <span
          key={text}
          className={`absolute left-0 top-0 whitespace-nowrap transition-all duration-500 transform ${
            idx === current
              ? "translate-y-0 opacity-100"
              : idx === (current - 1 + specialties.length) % specialties.length
              ? "-translate-y-full opacity-0"
              : "translate-y-full opacity-0"
          }`}
        >
          {text}
        </span>
      ))}
    </span>
  );
}