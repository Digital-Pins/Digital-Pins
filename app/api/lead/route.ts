import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const payload = {
    name: String(form.get('name') || ''),
    email: String(form.get('email') || ''),
    company: String(form.get('company') || ''),
    message: String(form.get('message') || ''),
    ts: new Date().toISOString(),
  }
  console.log('[lead]', payload)
  return NextResponse.redirect(new URL('/?submitted=1', req.url))
}
