import "./globals.css";
import type { Metadata } from "next";
import ChatWidget from "./components/ChatWidget";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "DigitalPin — Your Bridge to Digital Transformation",
  description:
    "We help SMBs cross the bridge to digital operations — ERP, customer portals, and automation, end to end.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
