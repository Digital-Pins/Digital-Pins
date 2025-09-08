🎯 تقسيمة الموقع (Landing for Digital PIN Dev-Hub)
1️⃣ Hero Section (Mission Intro)

عنوان واضح: Digital PIN — Where Ideas Become Systems

جملة تعريفية: We’re a digital project management company. Our hub connects ERP, portals, and AI-driven platforms into real-world solutions.

CTA: Explore Projects / Join Dev-Hub.

2️⃣ About Dev-Hub

شرح بسيط: Dev-Hub = الحاضنة اللي جوه Digital PIN.

عندنا Projects → بعضهم مكتمل، بعضهم تحت التطوير.

كل مشروع = حجر بناء في التحول الرقمي.

3️⃣ Projects Showcase (الجزء الأهم)

كل مشروع يبقى Card كبير فيه:

اسم المشروع.

رابط GitHub.

وصف قصير (القصة + الأهمية + المرحلة الحالية).
مثال:

Dolibarr Custom ERP → Custom ERP tailored for Egyptian SMEs — managing invoices, HR, and compliance.

PinKit → AI-powered project management assistant that automates planning and tracking.

PinLearn → Next-gen e-learning platform for organizations in transition.

PinPin → Air navigation data processing tool reducing risk for controllers.

4️⃣ Why It Matters (القيمة)

التحول الرقمي محتاج أدوات عملية مش دعاية.

Digital PIN بتبني أدوات حقيقية من قلب السوق المصري والعالمي.

الفرق بيننا وبين الشركات التقليدية: نحن نبني "Digital Project Management" كمهنة جديدة.

5️⃣ Get Involved (CTA Section)

For Supporters → Contribute or Partner.

For Talents → Join the team / internships.

For Clients → Access Portal / Try a demo.

===============================================
test next code
===============================================

"use client";

import { Card, CardContent } from "@/components/ui/card";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-600">
          Digital PIN — Dev Hub
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Where projects are born, tested, and delivered. A bridge between
          innovation and execution.
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

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-brand-600">
          Want to get involved?
        </h2>
        <p className="mt-2 text-gray-500">
          Whether you’re a supporter, a developer, or a client, there’s a place
          for you at Digital PIN Dev-Hub.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="#contact"
            className="px-6 py-3 rounded-md bg-brand-500 hover:bg-brand-400 text-white font-medium shadow-lg"
          >
            Join Us
          </a>
          <a
            href="/portal"
            className="px-6 py-3 rounded-md glass text-brand-600 font-medium shadow"
          >
            Access Client Portal
          </a>
        </div>
      </section>
    </main>
  );
}
