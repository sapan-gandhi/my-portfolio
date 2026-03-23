import { useEffect, useState } from 'react'

export default function Toast({ show }) {
  return (
    <div
      style={{
        position: 'fixed', bottom: 32, right: 32,
        background: 'var(--card)', border: '1px solid rgba(52,211,153,.3)',
        borderRadius: 12, padding: '16px 22px', display: 'flex', alignItems: 'center',
        gap: 12, fontSize: 15, fontWeight: 500, color: 'var(--text)',
        boxShadow: '0 8px 48px rgba(0,0,0,.6)', zIndex: 9000,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'all' : 'none',
        transition: 'all .3s', maxWidth: 340,
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(52,211,153,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div>
        <div style={{ fontWeight: 600 }}>Message sent!</div>
        <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>I'll get back to you soon.</div>
      </div>
    </div>
  )
}
