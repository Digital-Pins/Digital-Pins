/**
 * Minimal stub for Dolibarr integration used at build time.
 * This file provides lightweight types and fallback implementations
 * so the customer-portal API routes compile in environments where
 * the real Dolibarr integration isn't present.
 */

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
};

export type Invoice = {
  id: string;
  customer?: { id: string; name?: string };
  items: InvoiceItem[];
  total: number;
  currency?: string;
  created_at?: string;
};

/**
 * Return a minimal invoice object for build/runtime safety.
 * The real integration should replace this with actual API calls.
 */
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  return {
    id,
    customer: { id: 'unknown', name: 'Unknown Customer' },
    items: [],
    total: 0,
    currency: 'USD',
    created_at: new Date().toISOString(),
  };
}

export async function listInvoices(): Promise<Invoice[]> {
  return [];
}

export type ListInvoiceOptions = {
  limit?: number;
  sortfield?: string;
  sortorder?: 'asc' | 'desc' | string;
  customerId?: string;
};

export async function listCustomerInvoices(opts?: string | ListInvoiceOptions): Promise<Invoice[]> {
  // Accept either a customerId string or an options object.
  return [];
}

export type Ticket = {
  id: string;
  title: string;
  body?: string;
  status?: string;
  created_at?: string;
};

export async function createTicket(payload: { title: string; body?: string; customerId?: string }): Promise<Ticket> {
  return { id: 'stub', title: payload.title, body: payload.body, status: 'open', created_at: new Date().toISOString() };
}
