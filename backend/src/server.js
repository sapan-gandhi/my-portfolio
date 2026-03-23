require('dotenv').config()
const express = require('express')
const cors = require('cors')
const contactRouter = require('./routes/contact')
const chatRouter = require('./routes/chat')

const app = express()
const PORT = process.env.PORT || 5000

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true)

    const allowed = [
      // Local development
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      'http://127.0.0.1:5500',
      // Production Vercel URL
      'https://my-portfolio-pi-seven-46.vercel.app',
      // Any Vercel preview deployments
      process.env.FRONTEND_URL,
    ].filter(Boolean)

    // Allow any vercel.app subdomain for preview deployments
    if (origin.endsWith('.vercel.app') || allowed.includes(origin)) {
      return callback(null, true)
    }

    callback(new Error(`CORS blocked: origin "${origin}" not allowed.`))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true, limit: '50kb' }))

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Sapan Gandhi Portfolio API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    chat: process.env.ANTHROPIC_API_KEY ? 'enabled' : 'disabled (add ANTHROPIC_API_KEY)',
  })
})

app.use('/api/contact', contactRouter)
app.use('/api/chat', chatRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running on http://localhost:${PORT}`)
  console.log(`📧 Email provider: ${process.env.EMAIL_PROVIDER || 'gmail'}`)
  console.log(`🤖 AI Chat: ${process.env.ANTHROPIC_API_KEY ? 'enabled ✅' : 'disabled ❌ (add ANTHROPIC_API_KEY to .env)'}`)
})
