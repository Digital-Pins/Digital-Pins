import { NextResponse } from 'next/server';
import { listCustomerInvoices } from '@/lib/dolibarr';

export async function GET() {
  try {
    const data = await listCustomerInvoices({ limit: 50, sortfield: 't.rowid', sortorder: 'desc' });
    return NextResponse.json(data);
  } catch (e: any) {
  const status = e?.response?.status ?? 500;
  const message = e?.response?.data?.error || e?.message || 'Failed';
  return NextResponse.json({ error: message }, { status });
  }
}
