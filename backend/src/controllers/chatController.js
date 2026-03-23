const https = require('https')

const SYSTEM_PROMPT = `You are Sapan Gandhi's personal AI assistant on his portfolio website. Answer questions about Sapan in a friendly, professional, and concise way.

PERSONAL INFO:
- Name: Sapan Gandhi
- Role: Full Stack Developer & AI/ML Enthusiast
- Status: Fresher actively looking for work
- Degree: B.Tech in Computer Science with Artificial Intelligence
- University: Parul University, Vadodara, India
- Location: Vadodara, Gujarat, India
- Email: sapgandhi811@gmail.com
- GitHub: https://github.com/sapan-gandhi
- LinkedIn: https://www.linkedin.com/in/sapan-gandhi-65b15b311

SKILLS:
- Languages: Python, Java, C, JavaScript
- Frontend: HTML, CSS, React, Tailwind CSS
- Backend: Node.js, Express.js
- Databases: MongoDB, MySQL, Supabase
- Tools: Git, GitHub, REST APIs, Postman, Vercel
- AI/ML: ML fundamentals, prediction systems, recommendation logic

PROJECTS:
1. VitalScan-AI - AI health risk prediction platform
   Live: https://vital-scan-ai-drab.vercel.app
   GitHub: https://github.com/sapan-gandhi/VitalScan-AI
   Tech: Python, React, Node.js, ML Model, REST API, Vercel

2. Job Recommendation System - AI career matching engine
   GitHub: https://github.com/sapan-gandhi/Job-Recommendation
   Tech: Python, React, Node.js, ML Algorithms, REST API, MongoDB

AVAILABILITY: Open to internships, entry-level roles, and freelance. Can start immediately.

RULES:
- Keep answers short (2-4 sentences max unless detail is requested)
- Be friendly and professional
- For contact questions give email: sapgandhi811@gmail.com
- Never make up information
- Plain text only, no markdown`

async function chat(req, res) {
  try {
    const { message, history = [] } = req.body
    if (!message || !message.trim()) return res.status(400).json({ success: false, message: 'Message required.' })
    if (message.length > 500) return res.status(400).json({ success: false, message: 'Message too long.' })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey || apiKey === 'your_anthropic_api_key_here' || apiKey.trim() === '') {
      return res.json({ success: true, reply: getFallback(message) })
    }

    const messages = [
      ...history.slice(-6).filter(m => m.role === 'user' || m.role === 'assistant'),
      { role: 'user', content: message.trim() }
    ]

    try {
      const reply = await callClaude(
        JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM_PROMPT, messages }),
        apiKey
      )
      return res.json({ success: true, reply: reply || getFallback(message) })
    } catch (apiError) {
      console.error('[Claude API Error]', apiError.message)
      return res.json({ success: true, reply: getFallback(message) })
    }
  } catch (err) {
    console.error('[Chat Controller Error]', err.message)
    return res.json({ success: true, reply: "I'm Sapan's assistant! Ask me about his skills, projects, or how to contact him." })
  }
}

function callClaude(body, apiKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    }
    const req = https.request(options, (response) => {
      let data = ''
      response.on('data', chunk => { data += chunk })
      response.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          const text = parsed?.content?.[0]?.text
          if (text) resolve(text)
          else reject(new Error('No text in Claude response'))
        } catch (e) { reject(new Error('Failed to parse Claude response')) }
      })
    })
    req.on('error', (e) => reject(e))
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Claude API timeout')) })
    req.write(body)
    req.end()
  })
}

function getFallback(message) {
  const m = message.toLowerCase()

  // ── Availability / hiring — check FIRST before projects ──
  if (
    m.includes('open to work') || m.includes('are you open') ||
    m.includes('available') || m.includes('hire') || m.includes('hiring') ||
    m.includes('internship') || m.includes('opportunity') || m.includes('looking for') ||
    m.includes('job') || m.includes('freelance') || m.includes('full time') ||
    m.includes('part time') || m.includes('position') || m.includes('role')
  ) {
    return "Yes! Sapan is actively looking for internships, entry-level roles, and freelance opportunities. He can start immediately. Reach out at sapgandhi811@gmail.com!"
  }

  // ── Skills ──
  if (m.includes('skill') || m.includes('tech') || m.includes('stack') || m.includes('know') || m.includes('language') || m.includes('expertise')) {
    return "Sapan is skilled in React, Node.js, Python, MongoDB, Express.js, and Tailwind CSS. He also works with AI/ML for building intelligent products like prediction systems and recommendation engines."
  }

  // ── Specific projects ──
  if (m.includes('vitalscan') || m.includes('vital scan') || m.includes('health')) {
    return "VitalScan-AI is Sapan's health risk prediction platform. It uses machine learning to predict disease risk from patient vitals. It's live at vital-scan-ai-drab.vercel.app — check it out!"
  }

  if (m.includes('job recommendation') || m.includes('recommendation system')) {
    return "The Job Recommendation System is an AI-driven career matching engine that matches candidate profiles to relevant opportunities using ML algorithms. Find it on Sapan's GitHub!"
  }

  if (m.includes('project') || m.includes('built') || m.includes('portfolio') || m.includes('app') || m.includes('application')) {
    return "Sapan has built VitalScan-AI (an AI health risk prediction platform) and a Job Recommendation System. Both are full-stack AI-powered applications deployed and available on GitHub!"
  }

  // ── Contact ──
  if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('message') || m.includes('connect') || m.includes('touch')) {
    return "You can reach Sapan at sapgandhi811@gmail.com or connect on LinkedIn at linkedin.com/in/sapan-gandhi-65b15b311. He usually responds within 24 hours!"
  }

  // ── About ──
  if (m.includes('who') || m.includes('about') || m.includes('sapan') || m.includes('tell me') || m.includes('introduce')) {
    return "Sapan Gandhi is a Full Stack Developer & AI/ML Enthusiast from Vadodara, India. He's pursuing B.Tech in CS with AI at Parul University and builds intelligent web products using React, Node.js, and Python."
  }

  // ── GitHub ──
  if (m.includes('github')) {
    return "Sapan's GitHub is github.com/sapan-gandhi — you can find his projects VitalScan-AI and Job Recommendation System there!"
  }

  // ── LinkedIn ──
  if (m.includes('linkedin')) {
    return "Connect with Sapan on LinkedIn at linkedin.com/in/sapan-gandhi-65b15b311. He's open to networking and new opportunities!"
  }

  // ── Education ──
  if (m.includes('university') || m.includes('college') || m.includes('degree') || m.includes('education') || m.includes('study') || m.includes('btech') || m.includes('b.tech')) {
    return "Sapan is pursuing B.Tech in Computer Science with Artificial Intelligence at Parul University, Vadodara, India."
  }

  // ── Location ──
  if (m.includes('location') || m.includes('where') || m.includes('city') || m.includes('india') || m.includes('vadodara')) {
    return "Sapan is based in Vadodara, Gujarat, India. He's open to remote work and on-site opportunities."
  }

  // ── Frontend ──
  if (m.includes('frontend') || m.includes('react') || m.includes('ui') || m.includes('css') || m.includes('tailwind')) {
    return "For frontend, Sapan works with React, Tailwind CSS, HTML, and CSS. He builds responsive, accessible, and performant user interfaces."
  }

  // ── Backend ──
  if (m.includes('backend') || m.includes('server') || m.includes('api') || m.includes('node') || m.includes('express')) {
    return "For backend, Sapan uses Node.js and Express.js to build RESTful APIs. He's experienced with MongoDB, MySQL, and Supabase for databases."
  }

  // ── AI/ML ──
  if (m.includes('python') || m.includes('ml') || m.includes('ai') || m.includes('machine learning') || m.includes('artificial intelligence')) {
    return "Sapan works with Python for AI/ML projects. He has experience building prediction systems, recommendation engines, and integrating ML models into full-stack web applications."
  }

  // ── Greetings ──
  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('hii') || m.includes('helo')) {
    return "Hello! I'm Sapan's AI assistant. I can tell you about his skills, projects, availability, or how to contact him. What would you like to know?"
  }

  // ── Thanks ──
  if (m.includes('thank') || m.includes('thanks') || m.includes('great') || m.includes('awesome')) {
    return "You're welcome! Feel free to reach out to Sapan directly at sapgandhi811@gmail.com. Have a great day!"
  }

  // ── Default ──
  return "I'm Sapan's AI assistant! I can answer questions about his skills, projects, availability, or how to contact him. What would you like to know?"
}

module.exports = { chat }
