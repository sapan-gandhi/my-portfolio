import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SUGGESTED = [
  "What are your skills?",
  "Tell me about VitalScan-AI",
  "Are you open to work?",
  "What tech stack do you use?",
  "How can I contact you?",
]

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px', background: 'var(--card2)', borderRadius: '12px 12px 12px 4px', width: 'fit-content' }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--t3)', display: 'inline-block', animation: `tdot 1.2s ${i*0.2}s ease-in-out infinite` }} />
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Sapan's AI assistant 👋 Ask me anything about his skills, projects, or availability." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages }),
      })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
        if (!open) setUnread(u => u + 1)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that. Please try again." }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Make sure the backend is running." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <>
      <style>{`
        @keyframes tdot { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-5px);opacity:1} }
        @keyframes chatIn { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes pulse2 { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.4)} 70%{box-shadow:0 0 0 10px rgba(34,211,238,0)} }
        .chat-msg-user { background: var(--cyan); color: #000; border-radius: 12px 12px 4px 12px; padding: 10px 14px; font-size: 14px; font-weight: 500; max-width: 80%; margin-left: auto; line-height: 1.6; }
        .chat-msg-bot { background: var(--card2); color: var(--t1); border-radius: 12px 12px 12px 4px; padding: 10px 14px; font-size: 14px; max-width: 85%; line-height: 1.7; }
        .chat-suggest { font-size: 12px; padding: 6px 12px; border: 1px solid var(--b2); border-radius: 99px; color: var(--t2); background: rgba(255,255,255,.02); cursor: pointer; transition: all .18s; white-space: nowrap; }
        .chat-suggest:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(34,211,238,.06); }
        .chat-input { flex: 1; background: transparent; border: none; outline: none; color: var(--t1); font-family: 'DM Sans',sans-serif; font-size: 14px; padding: 0; resize: none; line-height: 1.5; }
        .chat-input::placeholder { color: var(--t4); }
        .chat-send { width: 34px; height: 34px; border-radius: 8px; background: var(--cyan); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #000; transition: all .18s; flex-shrink: 0; }
        .chat-send:hover { background: #67e8f9; transform: scale(1.05); }
        .chat-send:disabled { opacity: .4; cursor: not-allowed; transform: none; }
      `}</style>

      {/* Chat window */}
      {open && (
        <div style={{ position: 'fixed', bottom: 90, right: 24, width: 360, maxHeight: 560, background: 'var(--card)', border: '1px solid var(--b2)', borderRadius: 18, display: 'flex', flexDirection: 'column', zIndex: 8000, boxShadow: '0 24px 64px rgba(0,0,0,.6)', animation: 'chatIn .25s ease', overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ padding: '16px 18px', background: 'var(--bg2)', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: '#000', flexShrink: 0 }}>SG</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-.02em' }}>Sapan's Assistant</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                <span style={{ fontSize: 11.5, color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace" }}>Online · Ask me anything</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,.06)', border: '1px solid var(--b2)', color: 'var(--t3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'var(--t1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'var(--t3)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'user'
                  ? <div className="chat-msg-user">{m.content}</div>
                  : <div className="chat-msg-bot">{m.content}</div>
                }
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <TypingDots />
              </div>
            )}
            {/* Suggested questions — only show at start */}
            {messages.length === 1 && !loading && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                {SUGGESTED.map(q => (
                  <button key={q} className="chat-suggest" onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--b1)', background: 'var(--bg2)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg3)', border: '1.5px solid var(--b2)', borderRadius: 10, padding: '8px 10px 8px 14px', transition: 'border-color .18s' }}
              onFocus={() => {}} >
              <input
                ref={inputRef}
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about skills, projects..."
                disabled={loading}
                maxLength={300}
              />
              <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
                {loading
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                }
              </button>
            </div>
            <p style={{ fontSize: 10.5, color: 'var(--t4)', textAlign: 'center', marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>Powered by Claude AI</p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', background: open ? 'var(--card2)' : 'var(--cyan)', border: open ? '1.5px solid var(--b2)' : 'none', color: open ? 'var(--t2)' : '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 8001, transition: 'all .25s', boxShadow: open ? 'none' : '0 4px 24px rgba(34,211,238,.4)', animation: open ? 'none' : 'pulse2 2s infinite' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = '' }}
        aria-label="Open chat"
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
        {unread > 0 && !open && (
          <div style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%', background: '#fb7185', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{unread}</div>
        )}
      </button>
    </>
  )
}
