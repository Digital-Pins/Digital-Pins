import Link from 'next/link';

async function fetchInvoice(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/invoices/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load invoice');
  return res.json();
}

export default async function InvoiceDetail({ params }: { params: { id: string } }) {
  const inv = await fetchInvoice(params.id);
  return (
    <div className="dp-card">
      <h2>Invoice #{inv?.id ?? params.id}</h2>
      <p><strong>Ref:</strong> {inv?.ref}</p>
      <p><strong>Date:</strong> {inv?.date ? new Date(inv.date).toLocaleDateString() : '-'}</p>
      <p><strong>Total:</strong> {inv?.total_ttc}</p>
      <p><strong>Status:</strong> {inv?.status}</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/invoices">← Back to invoices</Link>
      </div>
    </div>
  );
}
