export const metadata = {
  title: 'ERP Training — Digital PIN',
  description: 'Structured ERP (Dolibarr) training index with registration and FAQs.'
}

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-600">ERP Training</h1>
      <p className="mt-3 text-gray-600">Training index placeholder. Full content lives at /training.html for now.</p>
      <div className="mt-6">
        <a href="/training.html" className="px-4 py-2 rounded bg-brand-600 text-white">Open full training page</a>
      </div>
    </main>
  )
}
