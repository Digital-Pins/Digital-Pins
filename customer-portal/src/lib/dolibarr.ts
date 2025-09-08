import axios from 'axios';
// Ensure server runtime loads env vars when running in production (next start / standalone)
try {
  // Lazy-load only in Node.js runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { config } = require('dotenv');
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production.local' : '.env.local';
  config({ path: envFile });
} catch (_) {
  // dotenv is optional; ignore if unavailable (e.g., in some runtimes)
}

const base = process.env.DOL_API_BASE;
const key = process.env.DOL_API_KEY;

if (!base) {
  // eslint-disable-next-line no-console
  console.warn('DOL_API_BASE is not set');
}

export const dol = axios.create({
  baseURL: base,
  headers: key ? { DOLAPIKEY: key } : undefined
});

export async function listThirdparties(params: Record<string, any> = {}) {
  const { data } = await dol.get('/thirdparties', { params });
  return data;
}

export async function listCustomerInvoices(params: Record<string, any> = {}) {
  const { data } = await dol.get('/invoices', { params });
  return data;
}

export async function getInvoiceById(id: string, params: Record<string, any> = {}) {
  if (!id) throw new Error('Invoice id is required');
  const { data } = await dol.get(`/invoices/${encodeURIComponent(id)}`, { params });
  return data;
}

export async function createTicket(payload: any) {
  const { data } = await dol.post('/tickets', payload);
  return data;
}
