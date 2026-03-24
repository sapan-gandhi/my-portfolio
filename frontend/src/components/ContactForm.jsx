import { useState } from 'react'

// Change this to your backend URL in production (e.g. https://your-api.railway.app)
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

  const set = (k) => (e) => {
    setFields(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => { const n = { ...er }; delete n[k]; return n })
    if (serverError) setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields.name, fields.email, fields.msg)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.msg.trim(),
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setFields({ name: '', email: '', msg: '' })
        setErrors({})
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
      setServerError('Could not connect to server. Please email me directly at sapgandhi811@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (key) => ({
    width: '100%', background: 'var(--bg)',
    border: `1.5px solid ${errors[key] ? '#fb7185' : 'var(--border)'}`,
    color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 15,
    padding: '13px 16px', borderRadius: 10, outline: 'none', resize: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  })

  return (
    <form onSubmit={handleSubmit} noValidate>
      {[
        { key: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Rahul Sharma' },
        { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key} style={{ marginBottom: 22 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 8 }}>{label}</label>
          <input type={type} value={fields[key]} onChange={set(key)} placeholder={placeholder} style={inputStyle(key)}
            onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,211,238,.1)' }}
            onBlur={e => { if (!errors[key]) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = '' } }}
          />
          {errors[key] && <div style={{ fontSize: 12, color: '#fb7185', marginTop: 6 }}>{errors[key]}</div>}
        </div>
      ))}
      <div style={{ marginBottom: 22 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 8 }}>Message</label>
        <textarea value={fields.msg} onChange={set('msg')} placeholder="Tell me about your project or opportunity..." rows={5}
          style={{ ...inputStyle('msg'), lineHeight: 1.6 }}
          onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,211,238,.1)' }}
          onBlur={e => { if (!errors.msg) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = '' } }}
        />
        {errors.msg && <div style={{ fontSize: 12, color: '#fb7185', marginTop: 6 }}>{errors.msg}</div>}
      </div>
      {serverError && (
        <div style={{ background: 'rgba(251,113,133,.1)', border: '1px solid rgba(251,113,133,.25)', borderRadius: 9, padding: '12px 16px', fontSize: 13.5, color: '#fb7185', marginBottom: 18 }}>
          {serverError}
        </div>
      )}
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? 'rgba(34,211,238,.6)' : 'var(--cyan)', color: '#000', fontWeight: 700, fontSize: 15, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all .2s' }}>
        {loading ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Sending…</>) : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>)}
      </button>
    </form>
  )
}
