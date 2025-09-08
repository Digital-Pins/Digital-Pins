
import Link from "next/link";
import { Suspense } from "react";
import type { ComponentType } from "react";
import { partners } from "../../data/partners";
import { Card, CardContent } from "@/components/ui/card";
import HeroLogo from "../components/HeroLogo";
import dynamic from "next/dynamic";

const HeroSlideshow = dynamic<ComponentType<any>>(
  () => import("../components/HeroSlideshow").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="logo-wrap">
                <HeroLogo />
              </span>
              <span className="sr-only">DigitalPin</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight font-exo">
              Your bridge to digital transformation
            </h1>
            <p className="mt-5 text-lg text-gray-300">
              We help ambitious companies modernize operations with ERP,
              customer portals, and process automation—delivered fast and
              reliably.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="px-6 py-3 rounded-md bg-brand-500 hover:bg-brand-400 text-white font-medium"
              >
                Book a discovery call
              </a>
              <a
                href="#solutions"
                className="px-6 py-3 rounded-md glass text-white font-medium"
              >
                Explore solutions
              </a>
              <a
                href="/docs/Digital%20PIN%20Company%20Profile%20Booklet.pdf"
                className="px-6 py-3 rounded-md glass text-white font-medium"
                target="_blank"
                rel="noreferrer"
              >
                Company Profile
              </a>
            </div>
            <div className="mt-10 text-sm text-gray-400">
              Trusted building blocks: Dolibarr ERP, Next.js portals, secure
              Nginx, Cloudflare, Linux.
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src="/assets/images/hero-accent.svg"
                  alt=""
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="relative">
                <HeroSlideshow />
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-gray-200">
              <li>• ERP setup, upgrade, and API enablement</li>
              <li>• Branded customer portals with secure proxy APIs</li>
              <li>• Payments, invoices, ticketing, and customer success flows</li>
              <li>
                • Production-grade deployment, security headers, and monitoring
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold">Partners</h2>
        <h3 className="mt-1 text-base text-gray-200 font-medium">
          Why we choose to serve them
        </h3>
        <p className="text-sm text-gray-300 mt-2">
          We value thoughtful automation and principled operations. We pursue
          quality over quantity—selecting clients carefully and aligning with
          partner policies, especially with engineering-driven providers like
          Hetzner whose ethos mirrors our own.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-lg px-3 py-2 flex items-center justify-center gap-2 group"
            >
              {p.textOnly ? (
                <>
                  {p.icon && (
                    <img
                      src={p.icon}
                      alt=""
                      className="h-5 w-5 opacity-80 group-hover:opacity-100 transition"
                    />
                  )}
                  <span className="font-exo text-sm text-gray-200 group-hover:text-white">
                    {p.name}
                  </span>
                </>
              ) : (
                <img
                  src={p.logo!}
                  alt={p.name}
                  className="h-10 w-auto opacity-90 grayscale hover:grayscale-0 transition"
                />
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="container mx-auto px-6 py-14">
        <h2 className="text-2xl font-semibold">
          Solutions tailored to your journey
        </h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "ERP Foundation",
              desc: "Deploy Dolibarr with best-practice modules and secure API—ready for integrations.",
            },
            {
              title: "Customer Portal",
              desc: "A Next.js portal for invoices, tickets, and payments that your customers will love.",
            },
            {
              title: "Operate & Scale",
              desc: "Observability, backups, and continuous improvements without drama.",
            },
          ].map((c) => (
            <div key={c.title} className="glass rounded-lg p-5">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="container mx-auto px-6 py-14">
        <h2 className="text-2xl font-semibold">
          Pragmatic, outcome-first approach
        </h2>
        <ol className="mt-6 grid md:grid-cols-4 gap-6 text-sm text-gray-300">
          <li className="glass rounded-lg p-5">
            1. Discover: map goals, bottlenecks, and data sources.
          </li>
          <li className="glass rounded-lg p-5">
            2. Deliver: ship a working slice in days, not months.
          </li>
          <li className="glass rounded-lg p-5">
            3. Evolve: iterate with real data and customer feedback.
          </li>
          <li id="training" className="glass rounded-lg p-5">
            4. Train: context-driven, role-based enablement aligned to your
            runbook.
          </li>
        </ol>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-6 py-16">
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-semibold">Let’s talk</h2>
          <p className="text-sm text-gray-300 mt-2">
            Tell us a bit about your goals. We’ll get back within 1 business
            day.
          </p>
          <Suspense>
            <form
              className="mt-6 grid md:grid-cols-2 gap-4"
              action="/api/lead"
              method="post"
            >
              <input
                className="rounded-md bg-black/30 border border-white/10 px-3 py-2"
                name="name"
                placeholder="Your name"
                required
              />
              <input
                className="rounded-md bg-black/30 border border-white/10 px-3 py-2"
                name="email"
                placeholder="Work email"
                type="email"
                required
              />
              <input
                className="rounded-md bg-black/30 border border-white/10 px-3 py-2 md:col-span-2"
                name="company"
                placeholder="Company"
              />
              <textarea
                className="rounded-md bg-black/30 border border-white/10 px-3 py-2 md:col-span-2"
                name="message"
                placeholder="What are you looking to achieve?"
                rows={4}
              />
              <div>
                <button className="px-5 py-2 rounded-md bg-brand-500 hover:bg-brand-400 text-white font-medium">
                  Send
                </button>
              </div>
            </form>
          </Suspense>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          By submitting, you agree to be contacted regarding your request.
        </p>
      </section>
    </main>
  );
}
