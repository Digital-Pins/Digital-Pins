import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // No special routing for /ar — site is English-only now.
  return NextResponse.next()
}
