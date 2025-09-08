"use client";

import { useState } from "react";
// Local fallback Card components (used when "@/components/ui/card" is unavailable)
const Card = ({ children, className = "" }: any) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }: any) => (
  <div className={className}>{children}</div>
);

const sections = [
  { id: "legal-notice", title: "Legal Notice", content: "Digital PIN LLC provides services under Egyptian law and aligns with EU hosting regulations. This section outlines our official company details, registration, and compliance." },
  { id: "data-privacy", title: "Data Privacy", content: "We respect your right to data protection. Digital PIN LLC applies strict GDPR-inspired privacy measures to safeguard your information while hosted on Hetzner infrastructure." },
  { id: "system-policies", title: "System Policies", content: "Our systems are designed to remain secure, stable, and transparent. Misuse, abuse, or malicious activities are prohibited under these policies." },
  { id: "dedicated-server", title: "Dedicated Server", content: "Clients using dedicated servers receive guaranteed performance and resources. Terms here define usage, management, and security responsibilities." },
  { id: "cloud-vserver", title: "Cloud and vServer", content: "Virtual and cloud servers are scalable solutions. This section explains acceptable usage, scaling, and compliance requirements." },
  { id: "managed-server", title: "Managed Server", content: "Digital PIN offers managed server solutions. Responsibilities for updates, monitoring, and SLA guarantees are defined here." },
  { id: "webhosting", title: "Webhosting Service", content: "Standard web hosting terms including uptime, support, and content restrictions are presented here." },
  { id: "storage-box", title: "Storage Box", content: "The storage box service is for backups and large datasets. Usage is bound by data safety and compliance with international transfer rules." },
  { id: "terms", title: "Terms and Conditions", content: "Our T&Cs govern all Digital PIN services, aligning with Hetzner standards to ensure fairness, transparency, and security." },
  { id: "dsa", title: "Digital Services Act", content: "As per EU regulations, we comply with the Digital Services Act. This ensures transparent communication, fair practices, and accountability." },
  { id: "withdrawal", title: "Withdrawal Form", content: "Clients have the right to withdraw from services within defined timeframes. This form outlines the procedure and legal implications." },
  { id: "tld", title: "TLD Allocating Terms", content: "Top Level Domain allocation follows ICANN and Hetzner guidelines. This section explains responsibilities when registering domain names." },
];

export default function LegalPage() {
  const [active, setActive] = useState("legal-notice");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Help Desk</h2>
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => setActive(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  active === s.id
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        {sections.map(
          (s) =>
            active === s.id && (
              <Card key={s.id} className="shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{s.content}</p>
                </CardContent>
              </Card>
            )
        )}
      </main>
    </div>
  );
}
