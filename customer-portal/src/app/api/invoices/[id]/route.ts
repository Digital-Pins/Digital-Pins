import { NextResponse } from 'next/server';
import { getInvoiceById } from '@/lib/dolibarr';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getInvoiceById(params.id);
    return NextResponse.json(data);
  } catch (e: any) {
  const status = e?.response?.status ?? 500;
  const message = e?.response?.data?.error || e?.message || 'Failed';
  return NextResponse.json({ error: message }, { status });
  }
}
