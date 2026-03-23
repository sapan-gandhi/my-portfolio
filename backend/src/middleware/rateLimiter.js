const rateLimit = require('express-rate-limit')

/**
 * Rate limiter for the contact form endpoint.
 * Allows max 5 submissions per IP per 15 minutes.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please try again after 15 minutes.',
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message)
  },
})

module.exports = { contactLimiter }
