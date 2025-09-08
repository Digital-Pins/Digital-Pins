
export const metadata = {
  title: 'ERP Training Index — Digital PIN',
  description:
    'A curated, well-structured ERP (Dolibarr) training index designed for effective learning and revision.',
}

export default function TrainingIndexPage() {
  return (
    <main className="container mx-auto px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-brand-600">ERP Training Index</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          A structured learning path for Dolibarr ERP v22. Focused, skimmable, and study-friendly.
        </p>
      </header>

      {/* Curriculum overview */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {[
          {
            title: '1) Foundation Setup',
            items: [
              'Company basics: identity, currency, locale.',
              'Users, groups, and role-based permissions.',
              'Module access and environment readiness.',
            ],
          },
          {
            title: '2) CRM Essentials',
            items: [
              'Contacts and segmentation.',
              'Customers: sectors, payment terms, discounts.',
              'Suppliers: evaluation and performance tracking.',
            ],
          },
          {
            title: '3) Products & Services',
            items: [
              'Product properties, pricing, and discounts.',
              'Services and subscriptions.',
              'Inventory linkage and demand planning.',
            ],
          },
          {
            title: '4) Sales Cycle',
            items: [
              'Proposals, Orders, Invoices.',
              'Shipment and delivery.',
              'Cash flow impact and reporting.',
            ],
          },
          {
            title: '5) Purchasing',
            items: [
              'Purchase requests and approvals.',
              'POs and goods receipt.',
              'Supplier invoicing and payments.',
            ],
          },
          {
            title: '6) Financial Accounting',
            items: [
              'Chart of accounts and cost centers.',
              'Journals, bank reconciliation.',
              'Reports: P&L, Balance Sheet, Cash Flow.',
            ],
          },
          {
            title: '7) Project Management',
            items: [
              'Scope, resources, and budgeting.',
              'Tasks, dependencies, and time tracking.',
              'Performance and cost monitoring.',
            ],
            full: true,
          },
        ].map((sec) => (
          <section
            key={sec.title}
            className={`glass rounded-xl p-5 ${sec.full ? 'md:col-span-2' : ''}`}
          >
            <h2 className="text-xl font-semibold">{sec.title}</h2>
            <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm space-y-1">
              {sec.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Registration */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-600">Register for the Training</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Secure your seat. We’ll contact you with the next cohort schedule and onboarding details.
        </p>
        <form
          action="/api/lead"
          method="POST"
          className="mt-5 grid md:grid-cols-2 gap-4 glass rounded-xl p-5"
        >
          <input type="hidden" name="topic" value="erp-training" />
          <input type="hidden" name="redirect" value="/training?registered=1" />
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-700">Full name</label>
            <input
              id="name"
              name="name"
              required
              className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="Jane Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-700">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="jane@company.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-sm text-gray-700">Company</label>
            <input
              id="company"
              name="company"
              className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="Company LLC"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="message" className="text-sm text-gray-700">Notes</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="What are your objectives?"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded bg-brand-600 text-white hover:bg-brand-500"
            >
              Register now
            </button>
          </div>
        </form>
      </section>

      {/* Request materials */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-600">Request Training Materials</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Prefer a copy of the course content? Choose electronic (PDF) or a printed bundle.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <form action="/api/lead" method="POST">
            <input type="hidden" name="topic" value="erp-training-materials" />
            <input type="hidden" name="content_format" value="electronic" />
            <input type="hidden" name="message" value="Request electronic materials (PDF)." />
            <input type="hidden" name="redirect" value="/training?materials=electronic" />
            <button className="px-5 py-2 rounded border border-black/10 bg-white hover:bg-gray-50">
              Get electronic (PDF)
            </button>
          </form>
          <form action="/api/lead" method="POST">
            <input type="hidden" name="topic" value="erp-training-materials" />
            <input type="hidden" name="content_format" value="paper" />
            <input type="hidden" name="message" value="Request printed materials (paper)." />
            <input type="hidden" name="redirect" value="/training?materials=paper" />
            <button className="px-5 py-2 rounded border border-black/10 bg-white hover:bg-gray-50">
              Request printed (Paper)
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-600">FAQ</h2>
        <div className="mt-4 space-y-3">
          {[
            {
              q: 'Who is this training for?',
              a: 'Operations, finance, and IT stakeholders adopting Dolibarr ERP in SMEs.',
            },
            {
              q: 'What version is covered?',
              a: 'Dolibarr ERP v22 with practical configurations for services, trading, and manufacturing.',
            },
            {
              q: 'How long is the course?',
              a: 'Typically 6–8 sessions (90 mins each), including guided exercises.',
            },
            {
              q: 'Is there a certificate?',
              a: 'Yes, a Digital PIN certificate is provided upon successful completion.',
            },
          ].map((f) => (
            <details key={f.q} className="rounded-lg border border-black/10 bg-white/80 p-4">
              <summary className="cursor-pointer font-medium text-gray-900">{f.q}</summary>
              <p className="mt-2 text-sm text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
