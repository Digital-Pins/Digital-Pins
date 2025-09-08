"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LangDirController() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const isAR = pathname === "/ar" || pathname.startsWith("/ar/");
    const html = document.documentElement;
    // Update <html> instantly on route change
    html.setAttribute("lang", isAR ? "ar" : "en");
    html.setAttribute("dir", isAR ? "rtl" : "ltr");
  }, [pathname]);
  return null;
}
