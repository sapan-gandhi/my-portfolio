import { useState } from 'react'
import { useNavScroll } from '../hooks/usePortfolio'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: 'https://github.com/sapan-gandhi', external: true },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const scrolled = useNavScroll()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'background .3s, backdrop-filter .3s, border-color .3s',
          background: scrolled ? 'rgba(8,12,16,.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="#hero" style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)' }}>
            Sapan<span style={{ color: 'var(--cyan)' }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', padding: '6px 14px', borderRadius: 8, transition: 'color .2s, background .2s' }}
                onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.background = 'rgba(255,255,255,.05)' }}
                onMouseLeave={e => { e.target.style.color = 'var(--text2)'; e.target.style.background = '' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex"
            style={{ fontSize: 14, fontWeight: 600, padding: '8px 20px', background: 'var(--cyan)', color: '#000', borderRadius: 8, transition: 'background .2s, transform .15s, box-shadow .2s', letterSpacing: '.01em' }}
            onMouseEnter={e => { e.target.style.background = '#67e8f9'; e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 20px rgba(34,211,238,.3)' }}
            onMouseLeave={e => { e.target.style.background = 'var(--cyan)'; e.target.style.transform = ''; e.target.style.boxShadow = '' }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-lg"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{ transition: 'background .2s' }}
          >
            <span style={{ width: 22, height: 2, background: 'var(--text2)', borderRadius: 2, transition: 'transform .3s', display: 'block', transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }} />
            <span style={{ width: 22, height: 2, background: 'var(--text2)', borderRadius: 2, transition: 'opacity .3s', display: 'block', opacity: open ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: 'var(--text2)', borderRadius: 2, transition: 'transform .3s', display: 'block', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 70, background: 'rgba(8,12,16,.97)', backdropFilter: 'blur(20px)', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 999 }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              style={{ fontSize: 18, fontWeight: 600, padding: '14px 16px', borderRadius: 12, color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: 'var(--cyan)', color: '#000', fontWeight: 700, fontSize: 16, padding: 14, borderRadius: 10 }}>Hire Me</a>
        </div>
      )}
    </>
  )
}
