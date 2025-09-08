export const metadata = {
  title: 'Technical Training — Digital PIN',
  description: 'Technical training tracks: DevOps, Integration, Customization and Automation for ERP and cloud services.',
}

export default function TechTrainingPage(){
  return (
    <main className="container mx-auto px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-brand-600">Technical Training</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">Hands-on tracks for developers and engineers: DevOps, integrations, automation, and cloud deployment.</p>
      </header>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Available Tracks</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="glass rounded-xl p-4">
            <h3 className="text-lg font-semibold">DevOps & Deployment</h3>
            <p className="text-sm text-gray-700 mt-2">CI/CD, containerization, and orchestration for reliable ERP hosting.</p>
          </li>
          <li className="glass rounded-xl p-4">
            <h3 className="text-lg font-semibold">Integration & APIs</h3>
            <p className="text-sm text-gray-700 mt-2">Designing connectors, webhooks and middleware to integrate Dolibarr with third-party systems.</p>
          </li>
          <li className="glass rounded-xl p-4">
            <h3 className="text-lg font-semibold">Customization & Plugins</h3>
            <p className="text-sm text-gray-700 mt-2">Develop extensions and custom modules to extend ERP capabilities.</p>
          </li>
          <li className="glass rounded-xl p-4">
            <h3 className="text-lg font-semibold">Automation & AI Ops</h3>
            <p className="text-sm text-gray-700 mt-2">Automating workflows and applying AI for monitoring and predictive maintenance.</p>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-600">FAQ — Technical Training</h2>
        <div className="mt-4 space-y-4 prose">
          <details>
            <summary className="font-semibold cursor-pointer">What prerequisites are required to join a technical track?</summary>
            <p>Basic Linux administration and familiarity with web applications is required for most tracks. For database and integration topics, prior experience with SQL and HTTP APIs is recommended. We provide a short pre-course checklist after registration.</p>
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">How are the training sessions delivered?</summary>
            <p>Training is hands-on and cohort-based. Sessions include short lectures, guided labs in Dev-Hub staging environments, and practical assignments. We use live demonstrations and provide reproducible CI/CD examples that mirror production patterns.</p>
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">Do you provide lab environments and sample data?</summary>
            <p>Yes. Each participant gets access to a sandbox in our Dev-Hub for the duration of the course. The sandboxes include sample Dolibarr modules, preloaded datasets, and CI pipelines so participants can practice deployment, backups, and failover exercises safely.</p>
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">What will I be able to do after the course?</summary>
            <p>Participants will be able to install and configure Dolibarr for production, design basic integration connectors (REST), create custom modules, and implement CI/CD pipelines. Administrators will gain practical knowledge on backups, performance tuning, and operational monitoring.</p>
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">Is there post-training support?</summary>
            <p>Yes. We provide limited post-training support to help with migration and tuning tasks. For ongoing operations and SLA-backed support, consider our Placement Group managed-services offering.</p>
          </details>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-600">Register for Technical Training</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">Reserve a seat in the next technical cohort. We’ll contact you with schedule and prerequisites.</p>
        <form action="/api/lead" method="POST" className="mt-5 grid md:grid-cols-2 gap-4 glass rounded-xl p-5">
          <input type="hidden" name="topic" value="tech-training" />
          <input type="hidden" name="redirect" value="/training?registered=tech" />
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-700">Full name</label>
            <input id="name" name="name" required className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400" placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-700">Work email</label>
            <input id="email" name="email" type="email" required className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400" placeholder="jane@company.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-sm text-gray-700">Company</label>
            <input id="company" name="company" className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400" placeholder="Company LLC" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="message" className="text-sm text-gray-700">Notes</label>
            <textarea id="message" name="message" rows={4} className="rounded border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400" placeholder="What are your objectives?" />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-5 py-2 rounded bg-brand-600 text-white hover:bg-brand-500">Register now</button>
          </div>
        </form>
      </section>
    </main>
  )
}
