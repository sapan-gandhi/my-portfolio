const { createTransporter } = require('../config/email')

/**
 * POST /api/contact
 * Sends an email from the portfolio contact form.
 */
async function sendContactEmail(req, res) {
  const { name, email, message } = req.body

  // ── Validation ──────────────────────────────────────────────────────────
  const errors = {}
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'A valid email address is required.'
  }
  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors })
  }

  // ── Sanitize ─────────────────────────────────────────────────────────────
  const safeName = name.trim().slice(0, 100)
  const safeEmail = email.trim().slice(0, 200)
  const safeMessage = message.trim().slice(0, 2000)

  // ── Send Email ────────────────────────────────────────────────────────────
  try {
    const transporter = createTransporter()

    // Notification email → you (Sapan)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'noreply@resend.dev'}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: safeEmail,
      subject: `📬 New Portfolio Message from ${safeName}`,
      html: buildNotificationEmail(safeName, safeEmail, safeMessage),
      text: `New message from ${safeName} (${safeEmail}):\n\n${safeMessage}`,
    })

    // Auto-reply email → sender
    await transporter.sendMail({
      from: `"Sapan Gandhi" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'noreply@resend.dev'}>`,
      to: safeEmail,
      subject: `Thanks for reaching out, ${safeName}! 👋`,
      html: buildAutoReplyEmail(safeName),
      text: `Hi ${safeName},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest,\nSapan Gandhi\nFull Stack Developer & AI/ML Enthusiast`,
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I will get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('[Contact Email Error]', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email me directly at sapgandhi811@gmail.com.',
    })
  }
}

// ── Email Templates ──────────────────────────────────────────────────────────

function buildNotificationEmail(name, email, message) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#111922;border:1px solid #1c2a38;border-radius:14px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#22d3ee,#818cf8);padding:24px 32px;">
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#000;letter-spacing:-.02em;">New Portfolio Message</h1>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(0,0,0,.65);">Someone reached out via your portfolio contact form</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1c2a38;width:80px;">
            <span style="font-size:11px;font-family:monospace;letter-spacing:.1em;text-transform:uppercase;color:#506070;">Name</span>
          </td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #1c2a38;">
            <span style="font-size:15px;font-weight:600;color:#eef2f7;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1c2a38;">
            <span style="font-size:11px;font-family:monospace;letter-spacing:.1em;text-transform:uppercase;color:#506070;">Email</span>
          </td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #1c2a38;">
            <a href="mailto:${email}" style="font-size:15px;color:#22d3ee;text-decoration:none;">${email}</a>
          </td>
        </tr>
      </table>
      <div style="margin-top:24px;">
        <p style="font-size:11px;font-family:monospace;letter-spacing:.1em;text-transform:uppercase;color:#506070;margin-bottom:10px;">Message</p>
        <div style="background:#0b1117;border:1px solid #1c2a38;border-left:3px solid #22d3ee;border-radius:8px;padding:18px 20px;">
          <p style="margin:0;font-size:15px;color:#8fa3b8;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your message on my portfolio" style="display:inline-block;padding:12px 28px;background:#22d3ee;color:#000;font-weight:700;font-size:14px;border-radius:9px;text-decoration:none;">Reply to ${name}</a>
      </div>
    </div>
    <div style="background:#0b1117;padding:16px 32px;text-align:center;border-top:1px solid #1c2a38;">
      <p style="margin:0;font-size:12px;color:#344858;">Sapan Gandhi • Portfolio Contact Form • sapgandhi811@gmail.com</p>
    </div>
  </div>
</body>
</html>`
}

function buildAutoReplyEmail(name) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#111922;border:1px solid #1c2a38;border-radius:14px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#22d3ee,#818cf8);padding:24px 32px;">
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#000;letter-spacing:-.02em;">Thanks for reaching out! 👋</h1>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(0,0,0,.65);">I've received your message</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#8fa3b8;line-height:1.8;margin-top:0;">Hi <strong style="color:#eef2f7;">${name}</strong>,</p>
      <p style="font-size:15px;color:#8fa3b8;line-height:1.8;">Thanks for reaching out through my portfolio. I've received your message and will get back to you <strong style="color:#22d3ee;">within 24 hours</strong>.</p>
      <p style="font-size:15px;color:#8fa3b8;line-height:1.8;">In the meantime, feel free to check out my projects on GitHub or connect with me on LinkedIn.</p>
      <div style="display:flex;gap:12px;margin-top:28px;">
        <a href="https://github.com/sapan-gandhi" style="display:inline-block;padding:11px 22px;background:#1c2a38;color:#eef2f7;font-weight:600;font-size:13px;border-radius:9px;text-decoration:none;margin-right:10px;">GitHub</a>
        <a href="https://www.linkedin.com/in/sapan-gandhi-65b15b311" style="display:inline-block;padding:11px 22px;background:#22d3ee;color:#000;font-weight:700;font-size:13px;border-radius:9px;text-decoration:none;">LinkedIn</a>
      </div>
    </div>
    <div style="background:#0b1117;padding:20px 32px;border-top:1px solid #1c2a38;">
      <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#eef2f7;">Sapan Gandhi</p>
      <p style="margin:0;font-size:12px;color:#506070;">Full Stack Developer & AI/ML Enthusiast • Vadodara, India</p>
    </div>
  </div>
</body>
</html>`
}

module.exports = { sendContactEmail }
