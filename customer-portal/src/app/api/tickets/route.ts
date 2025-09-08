import { NextResponse } from 'next/server';
import { createTicket } from '@/lib/dolibarr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await createTicket(body);
    return NextResponse.json(data, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed' }, { status: 500 });
  }
}
