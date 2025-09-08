import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  try{
    const { messages } = await req.json()
    const userLast = Array.isArray(messages)? messages[messages.length-1]?.content : ''
    const scope = `You are Digital PIN's website assistant. Answer only about Digital PIN services: ERP (Dolibarr), Next.js portals, deployment/security, training (role-based, runbooks, OJT for Placement Groups). If asked unrelated topics, politely redirect to contact form.`

    const apiKey = process.env.OPENAI_API_KEY
    let reply = ''
    if(apiKey){
      // Lazy import only when configured
      const completion = await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {role:'system', content: scope},
            ...messages
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      })
      const data = await completion.json()
      reply = data?.choices?.[0]?.message?.content || ''
    }
    if(!reply){
      // Safe fallback without calling external APIs
      reply = genericAnswer(userLast)
    }
    return NextResponse.json({ reply })
  }catch(e){
    return NextResponse.json({ reply: 'The assistant is unavailable right now. Please use the contact form and we will get back to you.' }, { status: 200 })
  }
}

function genericAnswer(q: string){
  const lower = (q||'').toLowerCase()
  if(lower.includes('erp') || lower.includes('dolibarr')){
    return 'We deploy and operate Dolibarr ERP with best‑practice modules and secure API, plus integrations. Want a quick assessment? Use the contact form.'
  }
  if(lower.includes('portal') || lower.includes('next')){
    return 'We build branded Next.js customer portals for invoices, tickets, and payments, with a secure proxy API.'
  }
  if(lower.includes('train') || lower.includes('training')){
    return 'Training is context‑driven and role‑based. Role guides are restricted. OJT is available for Digital PIN Placement Groups.'
  }
  if(lower.includes('price') || lower.includes('cost')){
    return 'We quote per scope after a short discovery. Share a bit about your goals via the contact form.'
  }
  return 'Ask me about Digital PIN services: ERP (Dolibarr), portals, secure deployment, or training. For projects and pricing, please use the contact form.'
}
