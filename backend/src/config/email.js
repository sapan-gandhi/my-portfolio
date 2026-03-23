const nodemailer = require('nodemailer')

/**
 * Creates a Nodemailer transporter based on EMAIL_PROVIDER env variable.
 * Supports: gmail | smtp | resend (via SMTP bridge)
 */
function createTransporter() {
  const provider = process.env.EMAIL_PROVIDER || 'gmail'

  switch (provider) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

    case 'resend':
      return nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      })

    case 'smtp':
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

    default:
      throw new Error(`Unknown EMAIL_PROVIDER: "${provider}". Use gmail, resend, or smtp.`)
  }
}

module.exports = { createTransporter }
