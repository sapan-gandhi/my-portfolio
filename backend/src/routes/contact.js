const express = require('express')
const router = express.Router()
const { sendContactEmail } = require('../controllers/contactController')
const { contactLimiter } = require('../middleware/rateLimiter')

// POST /api/contact
router.post('/', contactLimiter, sendContactEmail)

module.exports = router
