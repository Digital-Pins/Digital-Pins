import Table from '@/customer-portal/src/components/Table'

async function fetchInvoices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/invoices`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function InvoicesPage() {
  const invoices = await fetchInvoices().catch(() => []);
  return (
    <div className="dp-card">
      <h2>Invoices</h2>
      {Array.isArray(invoices) && invoices.length > 0 ? (
        <Table>
          <thead><tr><th>ID</th><th>Ref</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {invoices.map((it: any) => (
              <tr key={it.id}>
                <td><a className="link" href={`/invoices/${it.id}`}>{it.id}</a></td>
                <td>{it.ref}</td>
                <td>{it.date ? new Date(it.date).toLocaleDateString() : '-'}</td>
                <td>{it.total_ttc}</td>
                <td>{it.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No invoices yet.</p>
      )}
    </div>
  );
}
