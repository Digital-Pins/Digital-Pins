"use client";
import { useState } from "react";

export default function HeroLogo() {
  const desired = "/assets/logos/digital-pin-bridge-trust.svg";
  const fallback = "/assets/logos/brand-mark.svg";
  const [src, setSrc] = useState(desired);
  return (
    <img
      src={src}
      alt="DigitalPin"
      className="h-10 w-10"
      onError={() => setSrc(fallback)}
    />
  );
}
