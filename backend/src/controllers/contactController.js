const https = require('https')

async function sendWithResend(to, from, subject, html, text, replyTo) {
  const body = JSON.stringify({ from, to, subject, html, text, reply_to: replyTo })
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(parsed)
          else reject(new Error(`Resend error ${res.statusCode}: ${data}`))
        } catch (e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Resend timeout')) })
    req.write(body)
    req.end()
  })
}

async function sendContactEmail(req, res) {
  const { name, email, message } = req.body

  // Validation
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email address is required.'
  if (!message || message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  if (Object.keys(errors).length > 0) return res.status(400).json({ success: false, errors })

  const safeName = name.trim().slice(0, 100)
  const safeEmail = email.trim().slice(0, 200)
  const safeMessage = message.trim().slice(0, 2000)

  try {
    // Notification email to Sapan
    await sendWithResend(
      process.env.CONTACT_RECEIVER || 'sapgandhi811@gmail.com',
      'Portfolio Contact <onboarding@resend.dev>',
      `📬 New Portfolio Message from ${safeName}`,
      buildNotificationEmail(safeName, safeEmail, safeMessage),
      `New message from ${safeName} (${safeEmail}):\n\n${safeMessage}`,
      safeEmail
    )

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I will get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('[Contact Email Error]', error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please email me directly at sapgandhi811@gmail.com.',
    })
  }
}

function buildNotificationEmail(name, email, message) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#111922;border:1px solid #1c2a38;border-radius:14px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#22d3ee,#818cf8);padding:24px 32px;">
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#000;">New Portfolio Message</h1>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(0,0,0,.65);">Someone reached out via your portfolio contact form</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #1c2a38;width:80px;font-size:11px;font-family:monospace;color:#506070;text-transform:uppercase;">Name</td><td style="padding:10px 0 10px 16px;border-bottom:1px solid #1c2a38;font-size:15px;font-weight:600;color:#eef2f7;">${name}</td></tr>
        <tr><td style="padding:10px 0;font-size:11px;font-family:monospace;color:#506070;text-transform:uppercase;">Email</td><td style="padding:10px 0 10px 16px;"><a href="mailto:${email}" style="font-size:15px;color:#22d3ee;text-decoration:none;">${email}</a></td></tr>
      </table>
      <div style="margin-top:24px;">
        <p style="font-size:11px;font-family:monospace;color:#506070;text-transform:uppercase;margin-bottom:10px;">Message</p>
        <div style="background:#0b1117;border-left:3px solid #22d3ee;border-radius:8px;padding:18px 20px;">
          <p style="margin:0;font-size:15px;color:#8fa3b8;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your message on my portfolio" style="display:inline-block;padding:12px 28px;background:#22d3ee;color:#000;font-weight:700;font-size:14px;border-radius:9px;text-decoration:none;">Reply to ${name}</a>
      </div>
    </div>
    <div style="background:#0b1117;padding:16px 32px;text-align:center;border-top:1px solid #1c2a38;">
      <p style="margin:0;font-size:12px;color:#344858;">Sapan Gandhi Portfolio • sapgandhi811@gmail.com</p>
    </div>
  </div>
</body>
</html>`
}

module.exports = { sendContactEmail }
