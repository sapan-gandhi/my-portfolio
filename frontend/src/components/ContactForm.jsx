import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-awe8.onrender.com'

function validate(name, email, msg) {
  const errs = {}
  if (!name.trim() || name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.'
  if (!msg.trim() || msg.trim().length < 10) errs.msg = 'Message must be at least 10 characters.'
  return errs
}

export default function ContactForm({ onSuccess }) {
  const [fields, setFields] = useState({ name: '', email: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [waking, setWaking] = useState(false)

  // Wake up Render's free-tier server as soon as the form mounts
  useEffect(() => {
    setWaking(true)
    fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(30000) })
      .catch(() => {}) // silence errors — this is just a warm-up
      .finally(() => setWaking(false))
  }, [])


  const set = k => e => {
    setFields(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => { const n = { ...er }; delete n[k]; return n })
    setServerError('')
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate(fields.name, fields.email, fields.msg)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fields.name.trim(), email: fields.email.trim(), message: fields.msg.trim() }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setFields({ name: '', email: '', msg: '' })
        onSuccess?.()
      } else if (res.status === 400 && data.errors) {
        const mapped = {}
        if (data.errors.name) mapped.name = data.errors.name
        if (data.errors.email) mapped.email = data.errors.email
        if (data.errors.message) mapped.msg = data.errors.message
        setErrors(mapped)
      } else {
        setServerError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Cannot connect to server. Email me directly at sapgandhi811@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const iS = hasErr => ({
    width: '100%', background: 'var(--bg)',
    border: `1.5px solid ${hasErr ? '#fb7185' : 'var(--b1)'}`,
    color: 'var(--t1)', fontFamily: "'DM Sans',sans-serif", fontSize: 15,
    padding: '12px 15px', borderRadius: 9, outline: 'none', resize: 'none',
    transition: 'border-color .2s, box-shadow .2s', display: 'block',
  })

  return (
    <form onSubmit={submit} noValidate>
      {[['name','Your Name','text','e.g. Rahul Sharma'],['email','Email Address','email','you@company.com']].map(([k,lbl,t,ph]) => (
        <div key={k} style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--t2)', marginBottom: 7 }}>{lbl}</label>
          <input type={t} value={fields[k]} onChange={set(k)} placeholder={ph} style={iS(errors[k])}
            onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,211,238,.1)' }}
            onBlur={e => { e.target.style.borderColor = errors[k] ? '#fb7185' : 'var(--b1)'; e.target.style.boxShadow = '' }} />
          {errors[k] && <p style={{ fontSize: 12, color: '#fb7185', marginTop: 5 }}>{errors[k]}</p>}
        </div>
      ))}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--t2)', marginBottom: 7 }}>Message</label>
        <textarea value={fields.msg} onChange={set('msg')} placeholder="Tell me about your project or opportunity..." rows={5}
          style={{ ...iS(errors.msg), lineHeight: 1.6 }}
          onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,211,238,.1)' }}
          onBlur={e => { e.target.style.borderColor = errors.msg ? '#fb7185' : 'var(--b1)'; e.target.style.boxShadow = '' }} />
        {errors.msg && <p style={{ fontSize: 12, color: '#fb7185', marginTop: 5 }}>{errors.msg}</p>}
      </div>
      {serverError && <div style={{ background: 'rgba(251,113,133,.1)', border: '1px solid rgba(251,113,133,.25)', borderRadius: 9, padding: '11px 15px', fontSize: 13, color: '#fb7185', marginBottom: 16 }}>{serverError}</div>}
      {waking && !loading && <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--t3)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Connecting to server…</div>}
      <button type="submit" disabled={loading || waking} style={{ width: '100%', padding: '13px', background: (loading || waking) ? 'rgba(34,211,238,.6)' : 'var(--cyan)', color: '#000', fontWeight: 700, fontSize: 15, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: (loading || waking) ? 'not-allowed' : 'pointer', border: 'none', transition: 'all .2s' }}>
        {loading
          ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Sending…</>
          : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>
        }
      </button>
    </form>
  )
}
