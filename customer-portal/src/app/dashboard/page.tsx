async function fetchInvoices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/invoices`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load invoices');
  return res.json();
}

export default async function Dashboard() {
  const invoices = await fetchInvoices().catch(() => []);
  return (
    <div>
      <h2>Dashboard</h2>
      <section>
        <h3>Recent invoices</h3>
        {Array.isArray(invoices) && invoices.length > 0 ? (
          <table>
            <thead><tr><th>ID</th><th>Ref</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {invoices.slice(0, 10).map((it: any) => (
                <tr key={it.id}>
                  <td>{it.id}</td>
                  <td>{it.ref}</td>
                  <td>{it.total_ttc}</td>
                  <td>{it.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices yet.</p>
        )}
      </section>
    </div>
  );
}
