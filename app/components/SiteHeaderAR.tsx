"use client";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function SiteHeaderAR() {
  const [open, setOpen] = useState(false);
  return (
    <header className="container mx-auto px-6 py-4 flex items-center justify-between">
      <Link href="/ar" className="flex items-center gap-3">
        <span className="logo-wrap"><img src="/assets/logos/digital-pin-bridge-trust.svg" alt="DigitalPin" className="h-8 w-8" /></span>
        <span className="text-lg font-semibold">DigitalPin</span>
      </Link>
      {/* Desktop nav (RTL) */}
      <nav className="hidden md:flex text-sm text-gray-300 items-center gap-6">
        <Link href="/ar" className="hover:text-white">الرئيسية</Link>
        <Link href="/projects" className="hover:text-white">المشاريع</Link>
        <Link href="/ar/training" className="hover:text-white">التدريب</Link>
  {/* Language disabled for now */}
      </nav>
      {/* Mobile hamburger (RTL aware) */}
      <button
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded glass focus:outline-none focus:ring-2 focus:ring-brand-400"
        aria-label="القائمة"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">تبديل القائمة</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 md:hidden">
          <div className="mx-4 mt-2 rounded-lg glass p-3 flex flex-col text-sm text-gray-200">
            <Link href="/ar" className="py-2" onClick={()=>setOpen(false)}>الرئيسية</Link>
            <Link href="/projects" className="py-2" onClick={()=>setOpen(false)}>المشاريع</Link>
            <Link href="/ar/training" className="py-2" onClick={()=>setOpen(false)}>التدريب</Link>
            <div className="border-t border-white/10 mt-2 pt-2">
              {/* Language disabled for now */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
