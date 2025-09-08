"use client";
import { useState } from 'react';

export default function NewTicket() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');
    const res = await fetch('/api/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, message }) });
    setStatus(res.ok ? 'Ticket created' : 'Failed');
  }

  return (
    <div>
      <h2>Open a ticket</h2>
      <form onSubmit={submit}>
        <div>
          <label>Subject</label><br />
          <input value={subject} onChange={e => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Message</label><br />
          <textarea value={message} onChange={e => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
