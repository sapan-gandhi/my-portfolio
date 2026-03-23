export default function SectionHeader({ label, title, titleAccent, subtitle }) {
  return (
    <div style={{ marginBottom: 64 }}>
      {label && (
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16 }}>
          {label}
        </p>
      )}
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--text)' }}>
        {title} {titleAccent && <span style={{ color: 'var(--cyan)' }}>{titleAccent}</span>}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 560, lineHeight: 1.7, marginTop: 16 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
