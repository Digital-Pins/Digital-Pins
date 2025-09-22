"use client";
import { useState } from 'react';
import Button from '@/customer-portal/src/components/Button';
import Input from '@/customer-portal/src/components/Input';

export default function NewTicket() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, message }) });
      setStatus(res.ok ? 'Ticket created' : 'Failed to create ticket');
      if (res.ok) { setSubject(''); setMessage(''); }
    } catch (err) {
      setStatus('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dp-card">
      <h2>Open a ticket</h2>
      <form onSubmit={submit} aria-label="Open support ticket">
        <div style={{ marginBottom: 12 }}>
          <Input id="subject" label="Subject" value={subject} onChange={e => setSubject((e.target as HTMLInputElement).value)} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label className="form-field__label" htmlFor="message">Message</label>
          <textarea id="message" className="form-field__control" value={message} onChange={e => setMessage((e.target as HTMLTextAreaElement).value)} required rows={6} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit" loading={loading}>Send</Button>
          <Button type="button" variant="secondary" onClick={() => { setSubject(''); setMessage(''); }} disabled={loading}>Reset</Button>
        </div>
      </form>
      {status && <p role="status">{status}</p>}
    </div>
  );
}
