"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const sections = [
  { id: 'overview', title: 'Overview', content: 'Operational and administrative support designed to keep your ERP and cloud services available, secure, and well-managed.' },
  { id: 'managed-services', title: 'Managed Services', content: '24/7 monitoring, patching, backups, DR planning, and runbook-driven operations delivered under clear SLAs.' },
  { id: 'placement-group', title: 'Placement Group', content: 'A curated managed-services collective for members who require prioritized onboarding, a named TAM, and pooled operational resources.' },
  { id: 'client-portal', title: 'Client Portal', content: 'Single-pane access to ERP accounts, tickets, billing, and operational dashboards via our secure portal (ERP Dev-Hub).' },
  { id: 'partners', title: 'Partners & Integrations', content: null },
  { id: 'support-sla', title: 'Support & SLA', content: 'Tiered support with defined response and resolution windows, clear escalation matrices, and operational reporting.' },
  { id: 'onboarding', title: 'Onboarding & Training', content: 'Structured migration plans, staged validation in Dev-Hub, and role-based training for administrators and end-users.' },
];

const partners = [
  { id: 'hetzner', name: 'Hetzner', logo: '/assets/images/partners/hetzner.svg', url: 'https://www.hetzner.com', short: 'Reliable dedicated and cloud infrastructure engineered for performance and privacy.' },
  { id: 'cloudflare', name: 'Cloudflare', logo: '/assets/images/partners/cloudflare.svg', url: 'https://www.cloudflare.com', short: 'Edge security and global delivery for resilient applications.' },
  { id: 'oracle', name: 'Oracle Cloud', logo: '/assets/images/partners/oracle.svg', url: 'https://cloud.oracle.com', short: 'Enterprise-grade cloud for mission-critical workloads.' },
  { id: 'github', name: 'GitHub', logo: '/assets/images/partners/github.svg', url: 'https://github.com', short: 'Source control, collaboration, and CI/CD workflows.' },
  { id: 'gitlab', name: 'GitLab', logo: '/assets/images/partners/gitlab.svg', url: 'https://gitlab.com', short: 'Integrated DevOps platform for repeatable and auditable delivery.' },
  { id: 'openai', name: 'OpenAI', logo: '/assets/images/partners/openai.svg', url: 'https://openai.com', short: 'Advanced AI models for practical automation and intelligent experiences.' },
];

export default function HelpDeskPage() {
  const [active, setActive] = useState('partners');
  const [openPartner, setOpenPartner] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 bg-white/80 backdrop-blur-md border-r p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Help Desk</h2>
        <p className="text-sm text-gray-600 mb-4">Operational support, managed services and integrations for our clients.</p>
        <nav className="space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${active === s.id ? 'bg-brand-500 text-white font-semibold shadow' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {sections.map(
          (s) =>
            active === s.id && (
              <Card key={s.id} className="shadow-lg rounded-2xl glass">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-brand-600">{s.title}</h3>
                  {s.id === 'partners' ? (
                    <>
                      <p className="text-gray-700 mb-6">We work with trusted infrastructure and platform providers to deliver reliable, secure, and compliant services.</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        {partners.map((p) => (
                          <div key={p.id} className="bg-white/80 rounded-xl p-6 shadow-md">
                            <div className="flex items-center gap-4">
                              <img src={p.logo} alt={p.name} className="h-10 w-auto" />
                              <div>
                                <div className="font-semibold">{p.name}</div>
                                <div className="text-sm text-gray-600">{p.short}</div>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                              <a href={p.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Visit {p.name} →</a>
                              <button onClick={() => setOpenPartner(p.id)} className="px-3 py-1 rounded bg-gray-100 text-sm">Read more</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{s.content}</p>
                  )}
                </CardContent>
              </Card>
            )
        )}
          {openPartner && (() => {
            const p = partners.find(x => x.id === openPartner);
            if (!p) return null;
            const articles: Record<string, string> = {
              hetzner: `Hetzner supplies the foundational hosting infrastructure we use for many managed deployments. For our clients, Hetzner's predictable performance and pragmatic pricing allow us to design cost-effective dedicated and virtualized environments. We apply layered operational controls—network segmentation, encrypted backups, and scheduled maintenance windows—so clients benefit from high availability without operational overhead.`,
              cloudflare: `Cloudflare is our edge security and delivery partner. We leverage its global network for DDoS mitigation, WAF policies, and CDN caching to improve application resilience and latency. For managed customers, we maintain WAF rule sets, audit logs, and edge performance reports as part of our operational handover.`,
              oracle: `Oracle Cloud is selected for mission-critical workloads that require enterprise SLAs and advanced database services. We design hybrid patterns combining resilient compute and managed database replication to meet high-availability and compliance needs, and we validate failover procedures within our Dev-Hub staging environments.`,
              github: `GitHub is the collaboration hub for our engineering practice. We use GitHub for repository management, code review, and CI automation. As part of managed services, we provide repository governance, protected branches, and release pipelines that ensure repeatable, auditable deliveries for client projects.`,
              gitlab: `GitLab provides an integrated CI/CD and security scanning toolchain for projects that require end-to-end pipeline governance. We use GitLab for policy-as-code, reproducible builds, and audit trails — especially when clients require strict compliance and traceability across releases.`,
              openai: `OpenAI enables intelligent automation and controlled assistant features within client solutions. Our integrations focus on safety, human-in-the-loop controls, and data minimization so AI augments workflows without compromising privacy or operational predictability.`,
            };

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setOpenPartner(null)} />
                <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 p-6 shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{p.short}</p>
                    </div>
                    <button onClick={() => setOpenPartner(null)} className="text-gray-500 hover:text-gray-700">Close</button>
                  </div>
                  <div className="mt-4 text-gray-700 leading-relaxed">
                    {articles[p.id]}
                  </div>
                  <div className="mt-6 text-right">
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Visit {p.name} →</a>
                  </div>
                </div>
              </div>
            );
          })()}
      </main>
    </div>
  );
}
