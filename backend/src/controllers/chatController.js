const https = require('https')

const SYSTEM_PROMPT = `You are Sapan Gandhi's personal AI assistant on his portfolio website. Answer questions about Sapan in a friendly, professional, and concise way.

PERSONAL INFO:
- Name: Sapan Gandhi
- Role: Full Stack Developer & AI/ML Enthusiast  
- Degree: B.Tech CSE with AI, Parul University, Vadodara
- Email: sapgandhi811@gmail.com
- GitHub: https://github.com/sapan-gandhi
- LinkedIn: https://www.linkedin.com/in/sapan-gandhi-65b15b311
- Portfolio: https://my-portfolio-pi-seven-46.vercel.app

EXPERIENCE:
- Frontend Developer Intern at 1Stop.ai (Jul 2025 - Sep 2025)
- Built responsive web apps with React and Tailwind CSS

PROJECTS:
1. HireSense AI - Live: https://hire-sense-ai-mocha.vercel.app | GitHub: https://github.com/sapan-gandhi/HireSense-AI | AI resume analysis, skill gap detection, shortlist probability scoring, 30+ interview Q&A | Tech: React, Node.js, MongoDB, ML
2. VitalScan-AI - Live: https://vital-scan-ai-drab.vercel.app | GitHub: https://github.com/sapan-gandhi/VitalScan-AI | ML disease risk prediction from patient vitals | Tech: Python, React, Node.js, Scikit-learn
3. SkillSwap - Live: https://skillswap-two-neon.vercel.app | Peer-to-peer skill exchange MERN platform with JWT auth | Tech: React, Node.js, MongoDB, JWT
4. Threat Detection System - AI spam/malicious text classifier using NLP and TF-IDF | Tech: Python, Scikit-learn, FastAPI, React

SKILLS: React, Node.js, Python, MongoDB, Express.js, FastAPI, Tailwind CSS, Scikit-learn, NLP, TF-IDF, JWT, Git

CERTIFICATIONS: JPMorgan Chase/Forage (Mar 2026), AWS Cloud Foundations (Sep 2025), Data Analyst/OneRoadmap (Jun 2025), JavaScript/OneRoadmap (Jun 2025), Generative AI/LinkedIn (Aug 2024), SQL/LetsUpgrade (Aug 2024)

AVAILABILITY: Actively looking for internships, entry-level roles, and freelance. Can start immediately.

RULES: Keep answers short (2-4 sentences). Be friendly and professional. Share live links when asked about projects. Plain text only.`

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
    const req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Length': Buffer.byteLength(body) }
    }, (response) => {
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
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')) })
    req.write(body)
    req.end()
  })
}

function getFallback(message) {
  const m = message.toLowerCase()

  if (m.includes('open to work') || m.includes('are you open') || m.includes('available') ||
      m.includes('hire') || m.includes('internship') || m.includes('opportunity') ||
      m.includes('freelance') || m.includes('position') || m.includes('role')) {
    return "Yes! Sapan is actively looking for internships, entry-level roles, and freelance opportunities. He can start immediately. Email him at sapgandhi811@gmail.com!"
  }

  if (m.includes('hiresense') || m.includes('hire sense') || m.includes('resume') || m.includes('career intelligence')) {
    return "HireSense AI is Sapan's AI career platform — resume-JD matching, skill gap detection, shortlist scoring, and 30+ interview Q&A. Live at hire-sense-ai-mocha.vercel.app!"
  }

  if (m.includes('vitalscan') || m.includes('vital scan') || m.includes('health') || m.includes('disease')) {
    return "VitalScan-AI predicts disease risk from patient vitals using ML. Live at vital-scan-ai-drab.vercel.app. Built with Python, React, Node.js, and Scikit-learn!"
  }

  if (m.includes('skillswap') || m.includes('skill swap') || m.includes('skill exchange')) {
    return "SkillSwap is a MERN platform for peer-to-peer skill exchange. Users list skills they offer/want and connect with matches. Live at skillswap-two-neon.vercel.app!"
  }

  if (m.includes('threat') || m.includes('spam') || m.includes('malicious') || m.includes('nlp') || m.includes('detection')) {
    return "The Threat Detection System classifies spam and malicious text in real-time using NLP, TF-IDF, and Scikit-learn — with a FastAPI backend and React frontend."
  }

  if (m.includes('project') || m.includes('built') || m.includes('demo') || m.includes('live') || m.includes('app')) {
    return "Sapan has 4 projects: HireSense AI (hire-sense-ai-mocha.vercel.app), VitalScan-AI (vital-scan-ai-drab.vercel.app), SkillSwap (skillswap-two-neon.vercel.app), and Threat Detection System. All on GitHub!"
  }

  if (m.includes('skill') || m.includes('tech') || m.includes('stack') || m.includes('language')) {
    return "Sapan works with React, Node.js, Python, MongoDB, Express.js, FastAPI, and Tailwind CSS. For AI/ML: Scikit-learn, NLP, TF-IDF, and feature engineering."
  }

  if (m.includes('experience') || m.includes('intern') || m.includes('1stop')) {
    return "Sapan interned as a Frontend Developer at 1Stop.ai (Jul–Sep 2025), building responsive web apps with React and Tailwind CSS."
  }

  if (m.includes('certif') || m.includes('aws') || m.includes('jpmorgan') || m.includes('course')) {
    return "Sapan has 6 certifications: JPMorgan Chase/Forage, AWS Cloud Foundations, Data Analyst & JavaScript (OneRoadmap), Generative AI (LinkedIn), and SQL Bootcamp (LetsUpgrade)."
  }

  if (m.includes('contact') || m.includes('email') || m.includes('reach')) {
    return "Reach Sapan at sapgandhi811@gmail.com or LinkedIn: linkedin.com/in/sapan-gandhi-65b15b311. He responds within 24 hours!"
  }

  if (m.includes('who') || m.includes('about') || m.includes('sapan') || m.includes('tell me')) {
    return "Sapan Gandhi is a Full Stack Developer & AI/ML Enthusiast from Vadodara, India. B.Tech CS with AI at Parul University. He's built 4 live projects and has real internship experience."
  }

  if (m.includes('github')) {
    return "Sapan's GitHub: github.com/sapan-gandhi — find HireSense AI, VitalScan-AI, SkillSwap, and Threat Detection System there!"
  }

  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('hii')) {
    return "Hello! I'm Sapan's AI assistant. Ask me about his projects, skills, experience, or how to contact him!"
  }

  if (m.includes('thank')) {
    return "You're welcome! Feel free to reach Sapan at sapgandhi811@gmail.com. Have a great day!"
  }

  return "I'm Sapan's AI assistant! Ask me about his 4 live projects, skills, internship experience, or certifications. What would you like to know?"
}

module.exports = { chat }
