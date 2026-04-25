import { useState, useEffect, useRef } from 'react'
import { personal, skills, technologies, whatIBring, projects, stats } from './data/portfolio'
import sapanPhoto from './assets/sapan.jpg'
import resumePDF from './assets/Sapan_Gandhi_Resume.pdf'
import Chatbot from './components/Chatbot'

// ─── Scroll progress ────────────────────────────────────────────────────────
function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const h = () => setP((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return p
}

function useScrolled(t = 30) {
  const [s, setS] = useState(false)
  useEffect(() => {
    const h = () => setS(window.scrollY > t)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [t])
  return s
}

function useBackTop(t = 400) {
  const [s, setS] = useState(false)
  useEffect(() => {
    const h = () => setS(window.scrollY > t)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [t])
  return s
}

// ─── Reveal on scroll ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(28px)',
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  )
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const GH = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const LI = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const EM = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
const PIN = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
const EXT = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const DL = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
const SEND = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
const CLOCK = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const MSG = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
const UP = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
const SPIN_ICON = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>

const bringIconPaths = {
  Layers: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  File: '<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  Stack: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  Box: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8"/><path d="M12 22V12"/><path d="M3.27 6.96L12 12l8.73-5.04"/>',
  Git: '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a9 9 0 01-9 9M6 9a9 9 0 009 9"/>',
  Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  Trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  Pkg: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
}

const bringIconKeys = ['Layers','File','Stack','Box','Git','Zap','Trend','Pkg']

// ─── Contact Form ────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function ContactForm({ onSuccess }) {
  const [fields, setFields] = useState({ name: '', email: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = k => e => {
    setFields(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => { const n = { ...er }; delete n[k]; return n })
    setServerError('')
  }

  const validate = () => {
    const errs = {}
    if (!fields.name.trim() || fields.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Please enter a valid email.'
    if (!fields.msg.trim() || fields.msg.trim().length < 10) errs.msg = 'Message must be at least 10 characters.'
    return errs
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
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
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? 'rgba(34,211,238,.6)' : 'var(--cyan)', color: '#000', fontWeight: 700, fontSize: 15, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all .2s' }}>
        {loading ? <><SPIN_ICON /> Sending…</> : <><SEND /> Send Message</>}
      </button>
    </form>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const links = [['Home','#hero'],['About','#about'],['Skills','#skills'],['Projects','#projects'],['GitHub','https://github.com/sapan-gandhi',true],['Contact','#contact']]
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, transition: 'all .3s', background: scrolled ? 'rgba(7,11,15,.88)' : 'transparent', backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: scrolled ? '1px solid var(--b1)' : '1px solid transparent' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--t1)' }}>
            Sapan<span style={{ color: 'var(--cyan)' }}>.</span>
          </a>
          <div className="nav-links">
            {links.map(([lbl,href,ext]) => (
              <a key={lbl} href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} className="nav-link">{lbl}</a>
            ))}
          </div>
          <a href="#contact" className="nav-hire">Hire Me</a>
          <button onClick={() => setOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 7, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer' }} className="ham">
            <span style={{ display: 'block', width: 21, height: 1.5, background: 'var(--t2)', borderRadius: 2, transition: 'transform .28s', transform: open ? 'rotate(45deg) translate(4.5px,4.5px)' : '' }} />
            <span style={{ display: 'block', width: 21, height: 1.5, background: 'var(--t2)', borderRadius: 2, transition: 'opacity .28s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 21, height: 1.5, background: 'var(--t2)', borderRadius: 2, transition: 'transform .28s', transform: open ? 'rotate(-45deg) translate(4.5px,-4.5px)' : '' }} />
          </button>
        </div>
      </nav>
      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 70, background: 'rgba(7,11,15,.97)', backdropFilter: 'blur(20px)', zIndex: 999, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(([lbl,href,ext]) => (
            <a key={lbl} href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} onClick={close}
              style={{ fontSize: 17, fontWeight: 600, padding: '13px 16px', borderRadius: 10, color: 'var(--t2)', borderBottom: '1px solid var(--b1)', display: 'block' }}>{lbl}</a>
          ))}
          <a href="#contact" onClick={close} style={{ marginTop: 12, textAlign: 'center', background: 'var(--cyan)', color: '#000', fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 10, display: 'block' }}>Hire Me</a>
        </div>
      )}
    </>
  )
}

// ─── Contrib Grid ─────────────────────────────────────────────────────────────
function ContribGrid() {
  const lvls = ['','rgba(34,211,238,.18)','rgba(34,211,238,.4)','rgba(34,211,238,.65)','var(--cyan)']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {Array.from({ length: 7 }, (_, r) => (
        <div key={r} style={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
          {Array.from({ length: 26 }, (_, c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: 2.5, background: lvls[Math.floor(Math.random() * 5)] || 'var(--b1)' }} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
const tagStyle = {
  cyan: { bg: 'rgba(34,211,238,.1)', color: 'var(--cyan)', border: 'rgba(34,211,238,.2)' },
  indigo: { bg: 'rgba(129,140,248,.1)', color: '#818cf8', border: 'rgba(129,140,248,.2)' },
  emerald: { bg: 'rgba(52,211,153,.1)', color: '#34d399', border: 'rgba(52,211,153,.2)' },
  violet: { bg: 'rgba(167,139,250,.1)', color: '#a78bfa', border: 'rgba(167,139,250,.2)' },
  amber: { bg: 'rgba(251,191,36,.1)', color: '#fbbf24', border: 'rgba(251,191,36,.2)' },
}

function ProjectCard({ p, index }) {
  return (
    <Reveal delay={index * 0.12}>
      <div className="pcard">
        {/* Visual */}
        <div className="pvis">
          <span style={{ position: 'absolute', top: 18, left: 22, fontFamily: "'Syne',sans-serif", fontSize: 72, fontWeight: 800, color: 'rgba(255,255,255,.035)', lineHeight: 1, pointerEvents: 'none' }}>{String(p.id).padStart(2,'0')}</span>
          <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', background: 'var(--card2)', border: '1px solid var(--b2)', fontFamily: "'JetBrains Mono',monospace" }}>
            <div style={{ background: 'var(--bg2)', padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid var(--b1)' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
              <span style={{ fontSize: 10.5, color: 'var(--t4)', flex: 1, textAlign: 'center' }}>{({1:'hiresense-ai-platform', 2:'vital-scan-ai.vercel.app', 3:'skillswap-platform', 4:'threat-detection-system'})[p.id]}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, color: 'var(--t1)', lineHeight: 1.15, marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'var(--t2)', marginBottom: 13 }}>{p.subtitle}</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 13 }}>
                {p.tags.map((tag, ti) => {
                  const c = tagStyle[p.tagColors[ti]] || tagStyle.cyan
                  return <span key={tag} style={{ fontSize: 9.5, padding: '2.5px 8px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{tag}</span>
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                {({1:[['AI','Resume Analysis'],['ML','Skill Match'],['API','REST Backend'],['DB','MongoDB']],2:[['ML','Prediction'],['Live','Deployed'],['REST','API'],['Full','Stack']],3:[['JWT','Auth'],['MERN','Stack'],['API','REST'],['DB','MongoDB']],4:[['NLP','Pipeline'],['TF-IDF','Vectors'],['FastAPI','Backend'],['ML','Classifier']]}[p.id] || [['ML','Model'],['API','REST'],['Full','Stack'],['DB','MongoDB']]).map(([v, l]) => (
                  <div key={l} style={{ background: 'var(--bg3)', borderRadius: 7, padding: '7px 9px', border: '1px solid var(--b1)' }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: 'var(--cyan)' }}>{v}</div>
                    <div style={{ fontSize: 9.5, color: 'var(--t3)', fontFamily: "'DM Sans',sans-serif" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(28px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
              {p.tags.map((tag, ti) => {
                const c = tagStyle[p.tagColors[ti]] || tagStyle.cyan
                return <span key={tag} style={{ fontSize: 10.5, fontWeight: 700, padding: '3.5px 11px', borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase', letterSpacing: '.06em', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{tag}</span>
              })}
            </div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: 5 }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 16 }}>{p.subtitle}</p>
            <p style={{ fontSize: 13.5, color: 'var(--t2)', lineHeight: 1.78 }}>{p.summary}</p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--t4)', margin: '16px 0 7px' }}>The Problem</p>
            <p style={{ fontSize: 13.5, color: 'var(--t2)', lineHeight: 1.78, borderLeft: '2px solid var(--b2)', paddingLeft: 13 }}>{p.problem}</p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--t4)', margin: '16px 0 7px' }}>Key Features</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--t3)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, display: 'inline-block' }} />{f}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--t4)', margin: '16px 0 7px' }}>Tech Stack</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.techStack.map(t => <span key={t} style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", padding: '4px 10px', borderRadius: 6, border: '1px solid var(--b1)', color: 'var(--t3)', background: 'rgba(255,255,255,.018)' }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 11, marginTop: 26, flexWrap: 'wrap' }}>
            {!p.demoDisabled
              ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 21px', fontSize: 13.5 }}><EXT /> {p.demoLabel}</a>
              : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 21px', border: '1.5px solid var(--b1)', color: 'var(--t4)', fontWeight: 600, fontSize: 13.5, borderRadius: 9, opacity: .55, cursor: 'not-allowed' }}><CLOCK /> {p.demoLabel}</span>
            }
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '10px 21px', fontSize: 13.5 }}><GH /> GitHub Repo</a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ show }) {
  return (
    <div style={{ position: 'fixed', bottom: 30, right: 30, background: 'var(--card2)', border: '1px solid rgba(52,211,153,.28)', borderRadius: 12, padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, fontWeight: 500, color: 'var(--t1)', boxShadow: '0 8px 40px rgba(0,0,0,.5)', zIndex: 9000, transform: show ? 'none' : 'translateY(14px)', opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none', transition: 'all .28s', maxWidth: 320 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(52,211,153,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div>
        <div style={{ fontWeight: 600 }}>Message sent!</div>
        <div style={{ fontSize: 12.5, color: 'var(--t3)', marginTop: 2 }}>I'll get back to you soon.</div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress()
  const showBack = useBackTop()
  const [toast, setToast] = useState(false)
  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 4000) }
  const techs = technologies

  return (
    <>
      {/* Global styles */}
      <style>{`
        :root {
          --bg:#070b0f; --bg2:#0b1117; --bg3:#0f1620;
          --card:#111922; --card2:#151f2a;
          --b1:#1c2a38; --b2:#243446;
          --cyan:#22d3ee; --indigo:#818cf8; --violet:#a78bfa; --emerald:#34d399; --amber:#fbbf24;
          --t1:#eef2f7; --t2:#8fa3b8; --t3:#506070; --t4:#344858;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 76px; }
        body { background: var(--bg); color: var(--t1); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        ::selection { background: rgba(34,211,238,.18); color: var(--cyan); }
        a { color: inherit; text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--b2); border-radius: 99px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes hi { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .hi1{animation:hi .7s .1s ease both}
        .hi2{animation:hi .7s .2s ease both}
        .hi3{animation:hi .7s .32s ease both}
        .hi4{animation:hi .7s .44s ease both}
        .hi5{animation:hi .7s .56s ease both}
        .hi6{animation:hi .7s .66s ease both}
        .hr{animation:hi .8s .5s ease both}
        .nav-links { display: flex; gap: 2px; }
        .nav-link { font-size: 13.5px; font-weight: 500; color: var(--t3); padding: 5px 13px; border-radius: 8px; transition: color .18s, background .18s; }
        .nav-link:hover { color: var(--t1); background: rgba(255,255,255,.045); }
        .nav-hire { font-size: 13px; font-weight: 600; padding: 8px 20px; border: 1.5px solid var(--b2); border-radius: 9px; color: var(--t2); background: rgba(255,255,255,.02); transition: all .2s; }
        .nav-hire:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(34,211,238,.06); }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--cyan); color: #000; font-weight: 700; font-size: 14.5px; border-radius: 10px; padding: 12px 24px; transition: all .2s; cursor: pointer; }
        .btn-primary:hover { background: #67e8f9; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(34,211,238,.28); }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid var(--b2); color: var(--t2); font-weight: 600; font-size: 14.5px; border-radius: 10px; padding: 12px 24px; background: rgba(255,255,255,.02); transition: all .2s; cursor: pointer; }
        .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(34,211,238,.05); transform: translateY(-2px); }
        .soc { width: 40px; height: 40px; border-radius: 9px; border: 1.5px solid var(--b2); display: flex; align-items: center; justify-content: center; color: var(--t3); background: rgba(255,255,255,.018); transition: all .2s; }
        .soc:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(34,211,238,.07); transform: translateY(-2px); }
        .stat-card { background: var(--card); border: 1px solid var(--b1); border-radius: 10px; padding: 22px 18px; transition: border-color .2s, transform .2s; cursor: default; }
        .stat-card:hover { border-color: var(--b2); transform: translateY(-3px); }
        .bring-card { background: var(--card); border: 1px solid var(--b1); border-radius: 14px; padding: 26px 22px; transition: all .22s; position: relative; overflow: hidden; cursor: default; }
        .bring-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--cyan),var(--indigo)); opacity:0; transition:opacity .3s; }
        .bring-card:hover { border-color: rgba(34,211,238,.2); transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,.4); }
        .bring-card:hover::after { opacity: 1; }
        .sk-card { background: var(--card); border: 1px solid var(--b1); border-radius: 14px; padding: 26px 22px; transition: border-color .2s; }
        .sk-card:hover { border-color: var(--b2); }
        .skb { font-size: 12.5px; font-weight: 500; padding: 5.5px 13px; border-radius: 8px; border: 1px solid var(--b1); color: var(--t2); background: rgba(255,255,255,.018); transition: all .18s; cursor: default; display: inline-block; }
        .skb:hover { border-color: rgba(34,211,238,.28); color: var(--t1); background: rgba(34,211,238,.06); }
        .strip-item { display: flex; align-items: center; gap: 9px; padding: 9px 18px; border: 1px solid var(--b1); border-radius: 99px; background: rgba(255,255,255,.018); font-size: 13px; font-weight: 500; color: var(--t2); white-space: nowrap; }
        .pcard { display: grid; grid-template-columns: 400px 1fr; background: var(--card); border: 1px solid var(--b1); border-radius: 20px; overflow: hidden; transition: border-color .28s, box-shadow .28s; }
        .pcard:hover { border-color: rgba(34,211,238,.18); box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(34,211,238,.05); }
        .pvis { background: var(--bg); padding: 36px 32px; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--b1); min-height: 340px; position: relative; }
        .gh-card { background: var(--card); border: 1px solid var(--b1); border-radius: 20px; padding: clamp(32px,5vw,56px); display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; transition: border-color .3s; }
        .gh-card:hover { border-color: rgba(34,211,238,.14); }
        .contact-item { display: flex; align-items: center; gap: 14px; padding: 15px 0; border-bottom: 1px solid var(--b1); transition: all .2s; }
        .contact-item:last-child { border-bottom: none; }
        .contact-item:hover .ctv { color: var(--cyan); }
        .contact-item:hover .ctm-ic { border-color: rgba(34,211,238,.3); color: var(--cyan); background: rgba(34,211,238,.06); }
        .ctm-ic { width: 38px; height: 38px; border-radius: 9px; border: 1.5px solid var(--b2); display: flex; align-items: center; justify-content: center; color: var(--t3); background: rgba(255,255,255,.018); flex-shrink: 0; transition: all .2s; }
        .ctv { font-size: 14.5px; font-weight: 500; color: var(--t2); transition: color .18s; }
        .footer-soc { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid var(--b2); display: flex; align-items: center; justify-content: center; color: var(--t3); transition: all .18s; }
        .footer-soc:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(34,211,238,.06); }
        @media(max-width:1080px) {
          .pcard { grid-template-columns: 1fr; }
          .pvis { border-right: none; border-bottom: 1px solid var(--b1); min-height: 260px; }
          .gh-card { grid-template-columns: 1fr; }
          .cg-hide { display: none; }
        }
        @media(max-width:860px) {
          .nav-links, .nav-hire { display: none !important; }
          .ham { display: flex !important; }
        }
        @media(max-width:640px) {
          .hero-btns { flex-direction: column; }
          .hero-btns a { justify-content: center; }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: 2, background: 'linear-gradient(90deg,var(--cyan),var(--violet))', zIndex: 9999, width: `${progress}%`, transition: 'width .08s linear', pointerEvents: 'none' }} />

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, right: -100, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,211,238,.055) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              {/* Small hero avatar row */}
              <div className="hi1" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--indigo))', zIndex: 0 }} />
                  <img
                    src={sapanPhoto}
                    alt="Sapan Gandhi"
                    style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '2.5px solid var(--bg)', position: 'relative', zIndex: 1, display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: '#4ade80', border: '2px solid var(--bg)', zIndex: 2 }} />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '6px 16px 6px 10px', border: '1px solid rgba(34,211,238,.22)', borderRadius: 99, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: 'var(--cyan)', background: 'rgba(34,211,238,.04)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)', animation: 'pdot 2.2s ease-in-out infinite', display: 'inline-block' }} />
                  {personal.availabilityBadge}
                </div>
              </div>
              <h1 className="hi2" style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(44px,5.5vw,72px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: .97, marginBottom: 6 }}>
                <span style={{ color: 'var(--t1)' }}>Sapan </span><span style={{ color: 'var(--cyan)' }}>Gandhi</span>
              </h1>
              <p className="hi3" style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(16px,2vw,21px)', fontWeight: 500, color: 'var(--t2)', letterSpacing: '-.02em', marginBottom: 16 }}>Full Stack Developer &amp; AI/ML Enthusiast</p>
              <p className="hi4" style={{ fontSize: 16, color: 'var(--t3)', lineHeight: 1.82, maxWidth: 460, marginBottom: 34 }}>{personal.heroSubheadline}</p>
              <div className="hi5 hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <a href="#projects" className="btn-primary"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>View Projects</a>
                <a href={resumePDF} className="btn-secondary" download="Sapan_Gandhi_Resume.pdf"><DL /> Download Resume</a>
              </div>
              <div className="hi6" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub"><GH /></a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn"><LI /></a>
                <a href={`mailto:${personal.email}`} className="soc" aria-label="Email"><EM /></a>
              </div>
            </div>
            {/* Terminal */}
            <div className="hr" style={{ background: 'var(--card)', border: '1px solid var(--b2)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.55)' }}>
              <div style={{ background: 'var(--bg2)', padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid var(--b1)' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--t4)', marginLeft: 6 }}>sapan@dev ~ zsh</span>
              </div>
              <div style={{ padding: '18px 20px', fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2.05 }}>
                {[
                  { p: '~', c: ' whoami', o: 'sapan-gandhi', oc: '#4ade80' },
                  { p: '~', c: ' cat role.txt', o: 'Full Stack Dev + AI/ML Enthusiast', oc: 'var(--indigo)' },
                  { p: '~', c: ' ls ./skills', o: 'react/ node/ python/ mongodb/ ml/', oc: 'var(--amber)' },
                  { p: '~', c: ' git log --oneline -2', o: 'a3f2c1e feat: VitalScan-AI prediction engine', oc: 'var(--t3)' },
                  { p: '', c: '', o: 'b7e9d43 feat: Job recommendation system', oc: 'var(--t3)' },
                ].map((l, i) => (
                  <div key={i}>
                    {l.p && <div style={{ display: 'flex', gap: 9 }}><span style={{ color: 'var(--cyan)' }}>{l.p}</span><span style={{ color: 'var(--t2)' }}>{l.c}</span></div>}
                    <div style={{ paddingLeft: l.p ? 0 : 14, color: l.oc }}>{l.o}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 9 }}>
                  <span style={{ color: 'var(--cyan)' }}>~</span>
                  <span style={{ color: 'var(--t2)' }}> ./deploy.sh</span>
                  <span style={{ display: 'inline-block', width: 7, height: 14, background: 'var(--cyan)', animation: 'blink 1.15s step-end infinite', verticalAlign: 'text-bottom', borderRadius: 1 }} />
                </div>
              </div>
              <div style={{ padding: '0 20px 18px', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {['React','Node.js','Python','MongoDB','Express','Tailwind','ML','REST API'].map((t, i) => (
                  <span key={t} style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", padding: '4px 12px', borderRadius: 99, border: `1px solid ${i < 4 ? 'rgba(34,211,238,.35)' : 'var(--b2)'}`, color: i < 4 ? 'var(--cyan)' : 'var(--t3)', background: i < 4 ? 'rgba(34,211,238,.07)' : 'rgba(255,255,255,.018)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: 'var(--bg2)', padding: '112px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 72, alignItems: 'start' }}>
            <Reveal>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>About me</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, color: 'var(--t1)', marginBottom: 26 }}>
                A developer who builds <span style={{ color: 'var(--cyan)' }}>with intention</span>
              </h2>
              {[
                `I'm <strong style="color:var(--t1);font-weight:600">Sapan Gandhi</strong>, a B.Tech Computer Science (AI) student at Parul University, Vadodara — building full-stack web applications focused on performance, scalability, and real-world impact.`,
                `My foundation spans the <strong style="color:var(--t1);font-weight:600">full product lifecycle</strong> — from crafting accessible frontends in React and Tailwind CSS, to engineering robust Node.js APIs and integrating ML models that make applications genuinely intelligent.`,
                `I don't just write code — I solve problems. Whether predicting health risk from patient vitals or matching candidates to jobs, every project starts with a clear problem and ends with a deployed product.`,
                `Actively seeking <strong style="color:var(--t1);font-weight:600">internships, entry-level roles, and freelance opportunities</strong> where I can contribute meaningfully and grow alongside talented teams.`,
              ].map((html, i) => (
                <p key={i} style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.87, marginBottom: 17 }} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
              <a href="#contact" className="btn-primary" style={{ marginTop: 8, display: 'inline-flex' }}><MSG /> Let's talk</a>
            </Reveal>
            <Reveal delay={0.15}>
              {/* Photo + Stats column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {/* Professional Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {/* Outer glow ring */}
                    <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', zIndex: 0 }} />
                    {/* Photo */}
                    <img
                      src={sapanPhoto}
                      alt="Sapan Gandhi"
                      style={{
                        width: 96, height: 96,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        border: '3px solid var(--bg2)',
                        position: 'relative', zIndex: 1,
                        display: 'block',
                      }}
                    />
                    {/* Online dot */}
                    <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: '#4ade80', border: '2.5px solid var(--bg2)', zIndex: 2 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-.03em', lineHeight: 1.2 }}>Sapan Gandhi</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--cyan)', marginTop: 4 }}>Full Stack Dev · AI/ML</div>
                    <div style={{ fontSize: 12, color: 'var(--t4)', marginTop: 3 }}>Vadodara, India</div>
                  </div>
                </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {stats.map(s => (
                  <div key={s.label} className="stat-card">
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: s.value.length > 3 ? 20 : 30, fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-.04em', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--t1)', marginTop: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--t4)', marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              </div>{/* end photo+stats column */}
            </Reveal>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── WHAT I BRING ──────────────────────────────────────────────────── */}
      <section id="bring" style={{ background: 'var(--bg)', padding: '112px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>Value proposition</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, color: 'var(--t1)' }}>What I <span style={{ color: 'var(--cyan)' }}>Bring</span></h2>
            <p style={{ fontSize: 17, color: 'var(--t2)', lineHeight: 1.75, maxWidth: 540, marginTop: 14, marginBottom: 56 }}>The skills, mindset, and work ethic a team actually needs — not just buzzwords on a resume.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
            {whatIBring.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.07}>
                <div className="bring-card">
                  <div style={{ width: 42, height: 42, borderRadius: 9, background: 'rgba(34,211,238,.09)', border: '1px solid rgba(34,211,238,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--cyan)' }}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" dangerouslySetInnerHTML={{ __html: bringIconPaths[bringIconKeys[i]] || bringIconPaths.Zap }} />
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14.5, fontWeight: 700, color: 'var(--t1)', marginBottom: 9 }}>{item.title}</div>
                  <p style={{ fontSize: 13.5, color: 'var(--t3)', lineHeight: 1.68 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ background: 'var(--bg2)', padding: '112px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>Technical skills</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, color: 'var(--t1)' }}>Skills &amp; <span style={{ color: 'var(--cyan)' }}>Technologies</span></h2>
            <p style={{ fontSize: 17, color: 'var(--t2)', lineHeight: 1.75, maxWidth: 540, marginTop: 14, marginBottom: 56 }}>A pragmatic stack built through real project work — not just coursework.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
            {Object.entries(skills).map(([cat, items], i) => (
              <Reveal key={cat} delay={i * 0.07}>
                <div className="sk-card">
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16 }}>{cat}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {items.map(s => <span key={s} className="skb">{s}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STRIP ────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '52px 0', borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)' }}>
        <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: 28 }}>Technologies I work with</p>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ width: 100, background: 'linear-gradient(90deg,var(--bg),transparent)', flexShrink: 0 }} />
            <div style={{ flex: 1 }} />
            <div style={{ width: 100, background: 'linear-gradient(-90deg,var(--bg),transparent)', flexShrink: 0 }} />
          </div>
          <div style={{ display: 'flex', gap: 14, animation: 'marquee 26s linear infinite', width: 'max-content' }}>
            {[...techs, ...techs].map((t, i) => (
              <div key={i} className="strip-item"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />{t}</div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section id="projects" style={{ background: 'var(--bg2)', padding: '112px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>Featured work</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, color: 'var(--t1)' }}>Featured <span style={{ color: 'var(--cyan)' }}>Projects</span></h2>
            <p style={{ fontSize: 17, color: 'var(--t2)', lineHeight: 1.75, maxWidth: 540, marginTop: 14, marginBottom: 0 }}>AI-driven products built with full-stack thinking and real-world use cases.</p>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 56 }}>
            {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── GITHUB ────────────────────────────────────────────────────────── */}
      <section id="github" style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <Reveal>
            <div className="gh-card">
              <div>
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22, fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: '#000' }}>SG</div>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: 'var(--cyan)', marginBottom: 10 }}>@sapan-gandhi</p>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--t1)', marginBottom: 14 }}>Consistently building &amp; shipping</h2>
                <p style={{ fontSize: 15, color: 'var(--t2)', lineHeight: 1.77, maxWidth: 460, marginBottom: 28 }}>Consistently building and sharing projects focused on practical problem solving and modern web development. Every commit is a step toward becoming a better engineer.</p>
                <div style={{ display: 'flex', gap: 22, marginBottom: 32 }}>
                  {[['2+','Repositories'],['Full','Stack Projects'],['Active','Contributions']].map(([v,l]) => (
                    <div key={l}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 21, fontWeight: 800, color: 'var(--t1)' }}>{v}</div><div style={{ fontSize: 11, color: 'var(--t4)', marginTop: 2, fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase', letterSpacing: '.1em' }}>{l}</div></div>
                  ))}
                </div>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-primary"><GH /> View GitHub Profile</a>
              </div>
              <div className="cg-hide"><ContribGrid /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--b2),transparent)' }} />

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: 'var(--bg2)', padding: '112px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 60, alignItems: 'start' }}>
            <Reveal>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>Get in touch</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: 18 }}>
                Let's Build Something <span style={{ color: 'var(--cyan)' }}>Meaningful</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.8, marginBottom: 36 }}>Whether you're a recruiter looking for a sharp full-stack engineer, a founder with an idea to build, or a team looking for a motivated collaborator — I'd love to connect.</p>
              {[
                { icon: <EM />, label: 'Email', val: personal.email, href: `mailto:${personal.email}` },
                { icon: <LI />, label: 'LinkedIn', val: 'sapan-gandhi-65b15b311', href: personal.linkedin },
                { icon: <GH />, label: 'GitHub', val: 'github.com/sapan-gandhi', href: personal.github },
                { icon: <PIN />, label: 'Location', val: personal.location, href: null },
              ].map(({ icon, label, val, href }) => (
                <div key={label} className="contact-item">
                  <div className="ctm-ic">{icon}</div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: 'var(--t4)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</p>
                    {href
                      ? <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="ctv">{val}</a>
                      : <span className="ctv">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--b1)', borderRadius: 18, padding: 'clamp(26px,4vw,36px)' }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 21, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-.03em', marginBottom: 5 }}>Send a message</h3>
                <p style={{ fontSize: 13.5, color: 'var(--t3)', marginBottom: 26 }}>I'll get back to you within 24 hours.</p>
                <ContactForm onSuccess={showToast} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--b1)', padding: '38px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: 'var(--t1)' }}>Sapan<span style={{ color: 'var(--cyan)' }}>.</span></div>
          <p style={{ fontSize: 13.5, color: 'var(--t4)', maxWidth: 480, lineHeight: 1.7, fontStyle: 'italic' }}>"Built with precision, curiosity, and a strong focus on solving real-world problems."</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ href: personal.github, icon: <GH />, label: 'GitHub' }, { href: personal.linkedin, icon: <LI />, label: 'LinkedIn' }, { href: `mailto:${personal.email}`, icon: <EM />, label: 'Email', mail: true }].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} target={s.mail ? undefined : '_blank'} rel={s.mail ? undefined : 'noopener noreferrer'} className="footer-soc">{s.icon}</a>
            ))}
          </div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: 'var(--t4)' }}>© 2025 Sapan Gandhi. All rights reserved.</p>
        </div>
      </footer>

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
        style={{ position: 'fixed', bottom: 30, left: 30, width: 42, height: 42, borderRadius: 9, background: 'var(--card2)', border: '1.5px solid var(--b2)', color: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .22s', opacity: showBack ? 1 : 0, pointerEvents: showBack ? 'all' : 'none', zIndex: 500, transform: showBack ? 'none' : 'translateY(8px)' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(34,211,238,.07)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--b2)'; e.currentTarget.style.color = 'var(--t2)'; e.currentTarget.style.background = 'var(--card2)'; e.currentTarget.style.transform = '' }}
      ><UP /></button>

      <Chatbot />
      <Toast show={toast} />
    </>
  )
}
