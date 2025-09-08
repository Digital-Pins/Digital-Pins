"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function computeAltPath(path: string): string {
  // Known localized pages
  const map: Record<string, string> = {
    "/": "/ar",
    "/training": "/ar/training",
    "/ar": "/",
    "/ar/training": "/training",
  };
  if (map[path]) return map[path];
  if (path.startsWith("/ar/")) return "/"; // fallback to EN home
  return "/ar"; // fallback to AR home
}

export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  const isAR = pathname === "/ar" || pathname.startsWith("/ar/");
  const target = computeAltPath(pathname);
  const label = isAR ? "EN" : "AR";
  return (
    <Link href={target} className={`hover:text-white ${className}`} aria-label={`Switch to ${label}`}>
      {label}
    </Link>
  );
}
