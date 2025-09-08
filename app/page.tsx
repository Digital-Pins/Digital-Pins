"use client";

import { Card, CardContent } from "./components/ui/card";
import Link from "next/link";

const projects = [
  {
    name: "Dolibarr Custom ERP",
    desc: "Custom ERP tailored for SMEs — streamlining invoices, HR, and compliance.",
    link: "https://github.com/Digital-Pins/dolibarr-custom",
  },
  {
    name: "PinKit",
    desc: "AI-powered project management assistant for automation and smart planning.",
    link: "https://github.com/Digital-Pins/pin-kit",
  },
  {
    name: "PinLearn",
    desc: "Next-gen e-learning platform to empower organizations in transition.",
    link: "https://github.com/Digital-Pins/pinlearn-project",
  },
  {
    name: "PinPin",
    desc: "Air navigation data processing model reducing risks for controllers.",
    link: "https://github.com/Digital-Pins/pinpin",
  },
];

const partners = [
  {
    name: "OpenAI",
    logo: "/assets/images/partners/openai.svg",
    url: "https://openai.com",
  },
  {
    name: "Hetzner",
    logo: "/assets/images/partners/hetzner.svg",
    url: "https://www.hetzner.com",
  },
  {
    name: "GitHub",
    logo: "/assets/images/partners/github.svg",
    url: "https://github.com/Digital-Pins",
  },
  {
    name: "GitLab",
    logo: "/assets/images/partners/gitlab.svg",
    url: "https://gitlab.com",
  },
  {
    name: "Cloudflare",
    logo: "/assets/images/partners/cloudflare.svg",
    url: "https://www.cloudflare.com",
  },
  {
    name: "Oracle Cloud",
    logo: "/assets/images/partners/oracle.svg",
    url: "https://cloud.oracle.com",
  },
];

const team = [
  {
    name: "Mohamed Afify",
    role: "General Manager & Project Consultant",
    avatar: "/assets/images/team/mohamed.jpg",
  },
  {
    name: "Digital PIN Dev Team",
    role: "Developers & Engineers",
    avatar: "/assets/images/team/dev-team.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-600">
          Digital PIN — Dev Hub
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A bridge between innovation and execution.  
          We transform complex digital challenges into practical solutions.
        </p>
      </section>

      {/* About Dev-Hub */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-brand-600 mb-4">About Dev-Hub</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Digital PIN Dev-Hub is our innovation environment.  
          Here we incubate projects, test prototypes, and deliver tools that redefine  
          how organizations embrace digital transformation.  
          Each initiative reflects real market needs — from ERP systems to AI-driven assistants.
        </p>
      </section>

      {/* Projects Showcase */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Projects in Focus</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Card key={p.name} className="glass rounded-xl shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                <Link
                  href={p.link}
                  target="_blank"
                  className="text-brand-600 hover:underline text-sm font-medium"
                >
                  View on GitHub →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-brand-600">Why It Matters</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Each project tells a story: solving a real-world challenge and  
          enabling smarter, safer, and faster operations.  
          Our Dev-Hub builds practical tools that empower SMEs, enterprises,  
          and industries to embrace digital transformation with confidence.
        </p>
      </section>

      {/* Team */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">The Team</h2>
        <div className="grid md:grid-cols-2 gap-6 justify-items-center">
          {team.map((member) => (
            <Card
              key={member.name}
              className="glass rounded-xl shadow-md w-full max-w-sm"
            >
              <CardContent className="p-6 text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="container mx-auto px-6 py-14">
        <h2 className="text-2xl font-semibold text-center">Our Partners</h2>
        <p className="text-sm text-gray-600 mt-2 text-center max-w-2xl mx-auto">
          We carefully align with partners who share our values: reliability, transparency,  
          and engineering excellence. Their platforms empower our solutions and strengthen our bridge.  
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-lg px-3 py-2 flex items-center justify-center group hover:shadow-lg"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 w-auto opacity-90 grayscale group-hover:grayscale-0 transition"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Get Involved */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-brand-600">Get Involved</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Card className="glass rounded-xl shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Supporters</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Partner with us to accelerate and co-develop transformative digital solutions.
              </p>
            </CardContent>
          </Card>
          <Card className="glass rounded-xl shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Developers</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Join our Dev-Hub, contribute on GitHub, and shape the future of digital project management.
              </p>
            </CardContent>
          </Card>
          <Card className="glass rounded-xl shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Clients</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Access our client portal to manage invoices, projects, and support tickets seamlessly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>


    </main>
  );
}
