const express = require('express')
const router = express.Router()
const { chat } = require('../controllers/chatController')
const rateLimit = require('express-rate-limit')

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many messages. Please slow down.' }
})

router.post('/', chatLimiter, chat)
module.exports = router
