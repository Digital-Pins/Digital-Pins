"use client";
import { useEffect, useRef, useState } from 'react';

type ChatMsg = { role: 'user'|'assistant'; content: string };

export default function ChatWidget(){
  const isRTL = typeof document !== 'undefined' ? !!document.querySelector('[dir="rtl"], .rtl') : false;
  const I18N = isRTL ? {
    hello: 'مرحبًا! اسألني عن Digital PIN وخدماتنا.',
    title: 'مساعد Digital PIN',
    placeholder: 'اسأل عن خدمات Digital PIN...',
    send: 'إرسال',
    fallback: 'عذرًا، المساعد غير متاح حاليًا. الرجاء استخدام نموذج التواصل.'
  } : {
    hello: 'Hi! Ask me about Digital PIN and our services.',
    title: 'Digital PIN Assistant',
    placeholder: 'Ask about Digital PIN...',
    send: 'Send',
    fallback: 'Sorry, the assistant is unavailable. Please use the contact form.'
  }

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{role:'assistant', content:I18N.hello}]);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(open) inputRef.current?.focus();
  },[open]);

  async function send(){
    const q = inputRef.current?.value?.trim();
    if(!q) return;
    inputRef.current!.value = '';
    setMsgs(m=>[...m,{role:'user',content:q}]);
    setBusy(true);
    try{
      const res = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messages: [...msgs,{role:'user',content:q}] })});
      const data = await res.json();
      setMsgs(m=>[...m,{role:'assistant', content: data.reply || 'I can help with questions about Digital PIN, our services, and training.'}]);
    }catch{
  setMsgs(m=>[...m,{role:'assistant', content:I18N.fallback}]);
    }finally{
      setBusy(false);
    }
  }

  return (
    <div>
    <button aria-label="Open chat" onClick={()=>setOpen(v=>!v)} className="fixed bottom-6 right-6 z-50 rounded-full bg-brand-500 hover:bg-brand-400 text-white w-12 h-12 shadow-lg">💬</button>
      {open && (
        <div ref={boxRef} className="fixed bottom-24 right-6 z-50 w-80 max-w-[90vw] glass rounded-xl p-3">
      <div className="text-sm text-gray-200 font-semibold mb-2">{I18N.title}</div>
          <div className="h-56 overflow-y-auto space-y-2 pr-1">
            {msgs.map((m,i)=> (
              <div key={i} className={m.role==='user' ? 'text-right' : ''}>
                <div className={`inline-block px-3 py-2 rounded-md text-sm ${m.role==='user'?'bg-brand-600':'bg-black/30 border border-white/10'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input ref={inputRef} onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} className="flex-1 rounded-md bg-black/30 border border-white/10 px-3 py-2 text-sm" placeholder={I18N.placeholder}/>
            <button onClick={send} disabled={busy} className="px-3 py-2 rounded-md bg-brand-500 hover:bg-brand-400 text-white text-sm">{I18N.send}</button>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">For general info about our services. Not for sensitive data.</p>
        </div>
      )}
    </div>
  );
}
