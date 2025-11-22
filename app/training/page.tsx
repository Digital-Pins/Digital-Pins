export const metadata = {
  title: 'Training — Digital PIN',
  description: 'Training tracks: Administrative (ERP) and Technical training offered by Digital PIN.'
}

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-600">Training Programs</h1>
      <p className="mt-3 text-gray-600">Choose a training track below to see curricula and register.</p>

      <section className="mt-8 grid md:grid-cols-2 gap-4">
        <a href="/training/erp-training" className="block glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Administrative / ERP Training</h2>
          <p className="text-sm text-gray-700 mt-2">Process-focused ERP adoption and administrative operations training.</p>
        </a>

        <a href="/training/tech-training" className="block glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Technical Training</h2>
          <p className="text-sm text-gray-700 mt-2">Developer and engineer-focused tracks: DevOps, integration, customization and automation.</p>
        </a>
      </section>
    </main>
  )
}