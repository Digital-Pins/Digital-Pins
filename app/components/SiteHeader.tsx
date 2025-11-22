"use client";
import Link from "next/link";
import { useState } from "react";
// Language switching removed — site is English-only for now

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
  <header className="relative container mx-auto px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <span className="logo-wrap"><img src="/assets/logos/digital-pin-bridge-trust.svg" alt="DigitalPin" className="h-8 w-8" /></span>
        <span className="text-lg font-semibold">DigitalPin</span>
      </Link>
      {/* Desktop nav */}
      <nav className="hidden md:flex text-sm text-gray-700 items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-brand-600 transition">Home</Link>
  <Link href="/help-desk" className="text-gray-700 hover:text-brand-600 transition">Help Desk</Link>
        <Link href="/training" className="text-gray-700 hover:text-brand-600 transition">Training</Link>
        {/* Language disabled for now */}
      </nav>
      {/* Mobile hamburger */}
      <button
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded glass focus:outline-none focus:ring-2 focus:ring-brand-400"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 md:hidden">
          <div className="mx-4 mt-2 rounded-lg glass p-3 flex flex-col text-sm text-gray-700">
              <Link href="/" className="py-2 rounded hover:bg-gray-100 px-2" onClick={()=>setOpen(false)}>Home</Link>
              <Link href="/help-desk" className="py-2 rounded hover:bg-gray-100 px-2" onClick={()=>setOpen(false)}>Help Desk</Link>
              <Link href="/training" className="py-2 rounded hover:bg-gray-100 px-2" onClick={()=>setOpen(false)}>Training</Link>
              <div className="border-t border-black/10 mt-2 pt-2">
                {/* language switch removed intentionally */}
              </div>
            </div>
        </div>
      )}
    </header>
  );
}
