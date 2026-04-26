export const personal = {
  name: "Sapan Gandhi",
  role: "Full Stack Developer",
  tagline: "AI/ML Enthusiast",
  heroHeadline: "Full Stack Developer building intelligent web products with scalable architecture and AI-driven thinking.",
  heroSubheadline: "I design and engineer modern web applications that combine performant frontends, robust backends, and AI-powered logic — built to solve real problems at scale.",
  availabilityBadge: "Open to internships, entry-level roles & freelance",
  email: "sapgandhi811@gmail.com",
  phone: "9301488039",
  github: "https://github.com/sapan-gandhi",
  linkedin: "https://www.linkedin.com/in/sapan-gandhi-65b15b311",
  portfolio: "https://my-portfolio-pi-seven-46.vercel.app",
  location: "Vadodara, Gujarat, India",
  university: "Parul University",
  degree: "B.Tech in Computer Science with Artificial Intelligence",
  resumeUrl: "/Sapan_Gandhi_Resume.pdf",
};

export const skills = {
  Languages: ["Python", "Java", "JavaScript"],
  Frontend: ["HTML", "CSS", "React", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI"],
  Databases: ["MongoDB", "MySQL", "Supabase"],
  "ML Libraries": ["NumPy", "Pandas", "Scikit-learn", "TF-IDF", "NLP"],
  Tools: ["Git", "GitHub", "REST APIs", "Postman", "Vercel", "JWT"],
  "AI / ML": ["Machine Learning", "NLP", "Text Classification", "Data Preprocessing", "Feature Engineering", "Prediction Systems"],
};

export const technologies = [
  "React", "Node.js", "JavaScript", "Python",
  "MongoDB", "GitHub", "REST APIs", "Tailwind CSS",
  "Express.js", "FastAPI", "Scikit-learn", "JWT",
  "NLP", "Vercel", "Postman", "MySQL",
];

export const whatIBring = [
  { icon: "Layers", title: "Full-Stack Engineering", desc: "End-to-end product development — from pixel-perfect UIs to RESTful APIs and database architecture." },
  { icon: "Zap", title: "Responsive Frontend", desc: "Mobile-first, accessible, and performant interfaces built with React and Tailwind CSS." },
  { icon: "Brain", title: "AI/ML Integration", desc: "Embedding ML models, NLP pipelines, and prediction systems into real-world web products." },
  { icon: "Globe", title: "REST API & FastAPI", desc: "Clean, versioned API architecture using Express.js and FastAPI connecting frontend and ML backends." },
  { icon: "GitBranch", title: "GitHub Workflow", desc: "Disciplined version control, branching strategies, and collaborative coding practices." },
  { icon: "Lightbulb", title: "Problem-Solving Mindset", desc: "Breaking down complex challenges into elegant, maintainable engineering solutions." },
  { icon: "TrendingUp", title: "Fast Learner", desc: "Rapidly adopting new frameworks, tools, and paradigms with structured, hands-on learning." },
  { icon: "Package", title: "Product Thinking", desc: "Building features with user impact and business value in mind — not just code for code's sake." },
];

export const projects = [
  {
    id: 1,
    title: "HireSense AI",
    subtitle: "AI Career Intelligence Platform",
    tags: ["AI/ML", "Full Stack", "CareerTech"],
    tagColors: ["cyan", "indigo", "violet"],
    summary: "An AI-powered career intelligence platform that analyzes resumes, matches them to job descriptions, detects skill gaps, and predicts shortlist probability — making job hunting smarter.",
    problem: "Candidates spend hours applying to jobs they're underqualified for. Recruiters receive hundreds of irrelevant applications with no easy way to filter signal from noise.",
    solution: "Built a semantic resume analysis engine that scores resume-JD similarity, detects skill gaps, predicts shortlist probability, and provides an interview prep module with 30+ role-based Q&A.",
    features: ["AI resume-JD similarity matching", "Skill gap detection engine", "Shortlist probability scoring", "30+ role-based interview Q&A", "Full-stack React + Node.js + MongoDB"],
    techStack: ["React", "Node.js", "MongoDB", "ML Concepts", "REST API", "Tailwind CSS"],
    impact: "Reduces job search friction by giving candidates actionable feedback before they apply.",
    github: "https://github.com/sapan-gandhi/HireSense-AI",
    demo: "https://hire-sense-ai-mocha.vercel.app",
    demoLabel: "Live Demo",
    demoDisabled: false,
  },
  {
    id: 2,
    title: "VitalScan-AI",
    subtitle: "Health Risk Prediction Platform",
    tags: ["AI", "Full Stack", "HealthTech"],
    tagColors: ["emerald", "indigo", "cyan"],
    summary: "A full-stack health intelligence platform that uses machine learning to predict disease risk from patient vitals — making preventive care proactive and data-driven.",
    problem: "Millions of preventable health conditions go undetected until symptoms worsen, due to lack of accessible early-warning tools for everyday users.",
    solution: "A web application that accepts patient vitals, runs them through a trained ML model, and surfaces risk assessments with confidence scores — instantly, in the browser.",
    features: ["ML-based disease risk prediction", "Data preprocessing & feature selection", "Confidence scores for predictions", "Patient intake form with validation", "Deployed live on Vercel"],
    techStack: ["Python", "React", "Node.js", "Scikit-learn", "REST API", "Vercel"],
    impact: "Bridges the gap between raw vitals data and actionable health intelligence for early intervention.",
    github: "https://github.com/sapan-gandhi/VitalScan-AI",
    demo: "https://vital-scan-ai-drab.vercel.app",
    demoLabel: "Live Demo",
    demoDisabled: false,
  },
  {
    id: 3,
    title: "SkillSwap",
    subtitle: "Peer-to-Peer Skill Exchange Platform",
    tags: ["Full Stack", "MERN", "Community"],
    tagColors: ["cyan", "amber", "emerald"],
    summary: "A full-stack MERN platform enabling peer-to-peer skill exchange without monetary transactions — connecting people who want to learn with those who want to teach.",
    problem: "Many people want to learn new skills but lack access to affordable resources. Others have valuable skills to share but no structured platform to connect.",
    solution: "Built a community-driven learning ecosystem where users list skills they offer and want, discover matches, send swap requests, and manage collaborations through a personal dashboard.",
    features: ["JWT user authentication", "Skill listing — offered & wanted", "Skill discovery & search", "Swap request system", "User dashboard for managing requests", "Fully responsive UI"],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "REST API"],
    impact: "Enables collaborative learning without cost barriers — scalable for community-based growth.",
    github: "https://github.com/sapan-gandhi",
    demo: "https://skillswap-two-neon.vercel.app",
    demoLabel: "Live Demo",
    demoDisabled: false,
  },
  {
    id: 4,
    title: "Threat Detection System",
    subtitle: "AI-Powered Spam & Malicious Text Classifier",
    tags: ["AI/ML", "NLP", "CyberSecurity"],
    tagColors: ["violet", "cyan", "indigo"],
    summary: "An AI-powered application that detects spam and malicious text in real-time using Natural Language Processing and machine learning — automating threat detection for safer communication.",
    problem: "With increasing online communication, detecting spam, phishing, and malicious messages manually is impossible at scale. Security systems need intelligent automation.",
    solution: "Built an NLP pipeline using TF-IDF vectorization and Scikit-learn classifiers, exposed via FastAPI backend, integrated with a React frontend for real-time text classification.",
    features: ["Real-time text classification", "Spam & malicious content detection", "NLP preprocessing with TF-IDF", "High accuracy ML classification model", "FastAPI backend with REST endpoints", "Interactive React frontend"],
    techStack: ["Python", "Scikit-learn", "NLP", "TF-IDF", "FastAPI", "React", "Tailwind CSS"],
    impact: "Enhances cybersecurity through automated detection — scalable for messaging or enterprise systems.",
    github: "https://github.com/sapan-gandhi",
    demo: "#",
    demoLabel: "Coming Soon",
    demoDisabled: true,
  },
];

export const stats = [
  { value: "4+", label: "Projects Built", sub: "Production-grade" },
  { value: "6+", label: "Tech Domains", sub: "Full-stack to AI/ML" },
  { value: "B.Tech", label: "CS with AI", sub: "Parul University" },
  { value: "∞", label: "Learning Mindset", sub: "Always building" },
];

export const certifications = [
  { name: "Software Engineering Job Simulation", org: "JPMorgan Chase · Forage", year: "Mar 2026" },
  { name: "AWS Academy Cloud Foundations", org: "Amazon Web Services", year: "Sep 2025" },
  { name: "Data Analyst Certification", org: "OneRoadmap", year: "Jun 2025" },
  { name: "JavaScript Certification", org: "OneRoadmap", year: "Jun 2025" },
  { name: "Generative AI Certification", org: "LinkedIn Learning", year: "Aug 2024" },
  { name: "SQL Bootcamp", org: "LetsUpgrade", year: "Aug 2024" },
];

export const experience = [
  {
    role: "Frontend Developer Intern",
    company: "1Stop.ai",
    period: "Jul 2025 – Sep 2025",
    points: [
      "Built responsive web applications using React and Tailwind CSS",
      "Developed full projects including expense tracker and portfolio website",
      "Improved existing UI components for better performance and user experience",
      "Used Git & GitHub for version control and collaborative code management",
    ],
  },
];
