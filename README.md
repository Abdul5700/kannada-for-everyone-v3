<div align="center">

# ಕನ್ನಡ for Everyone
### *An AI-Powered Kannada Language Learning Platform*

[![Live App](https://img.shields.io/badge/Live%20App-kannadaforeveryone.netlify.app-8B1538?style=for-the-badge&logo=netlify&logoColor=white)](https://kannadaforeveryone.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://kannada-for-everyone-v3.onrender.com/api/health)
[![GitHub](https://img.shields.io/badge/GitHub-Abdul5700-181717?style=for-the-badge&logo=github)](https://github.com/Abdul5700/kannada-for-everyone-v3)
[![License](https://img.shields.io/badge/License-MIT-F5C400?style=for-the-badge)](LICENSE)

![Karnataka Theme](https://img.shields.io/badge/Theme-Karnataka%20Yellow%20%26%20Maroon-F5C400?style=flat-square&labelColor=8B1538)
![AI Powered](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4?style=flat-square&logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)

</div>

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| 🌐 **Frontend (Netlify)** | https://kannadaforeveryone.netlify.app |
| ⚙️ **Backend API (Render)** | https://kannada-for-everyone-v3.onrender.com |
| 🏥 **API Health Check** | https://kannada-for-everyone-v3.onrender.com/api/health |
| 📦 **GitHub Repository** | https://github.com/Abdul5700/kannada-for-everyone-v3 |

---
# Problem Statement 1: Kannada for Everyone

**Category:** Language Learning

**Problem Statement:**

Develop an interactive platform that helps non-Kannada speakers learn practical Kannada through everyday conversations, situations, vocabulary, and guided practice.

**Objective:**

Make Kannada learning accessible and engaging through English translations, vocabulary cards, interactive quizzes, and real-life conversation examples.

**Project Title:** Kannada for Everyone v3.0


Existing solutions suffer from:
- 📵 **No AI assistance** — no personalised explanations or adaptive content
- 📚 **Curriculum mismatch** — not aligned with Karnataka State Board syllabus
- 🔡 **Poor Kannada script support** — Kannada characters render incorrectly or are absent
- 📱 **No mobile responsiveness** — unusable on smartphones
- 🎯 **No progress tracking** — learners cannot measure improvement
- 🔇 **No audio support** — no pronunciation guidance

**Kannada for Everyone v3.0** was built to solve all of these problems with a full-stack, AI-powered, curriculum-aligned learning platform — completely free and accessible in a browser.

---

## 💡 Solution Overview

A comprehensive web application that combines:
- A **structured curriculum** aligned with Karnataka State Board (Classes 1–10 + Foundation/Beginner)
- **Google Gemini AI** integration for intelligent quiz generation, vocabulary creation, translation, and word explanations
- **Audio pronunciation** via browser Web Speech API with Kannada voice support
- **Unlimited vocabulary generation** with anti-duplication logic
- **Quiz batch resume** — never lose your progress mid-quiz
- A **Karnataka-inspired design identity** — Yellow (`#F5C400`) and Maroon (`#8B1538`) throughout

---

## ✨ Features

### 🎓 Learning Modules
| Module | Description |
|---|---|
| **Foundations Curriculum** | 18 structured sections — Varnamale (alphabet), Kagunita matrix, Numbers, Colours, Family, Greetings, Body parts, Food, Animals, Seasons, Days, Time, Directions, Occupations, Fruits, Vegetables, Common phrases, Conversations |
| **Lesson Detail View** | Full lesson content with Kannada script, transliteration, English meaning, exercises, and audio playback |
| **Grammar** | Alphabet table, pronouns, verbs, tenses, adjectives with examples |
| **Reading** | Graded reading passages with Kannada text, English translation, and comprehension questions |
| **Listening** | Text-to-speech pronunciation practice with speed control and transliteration toggle |
| **Speaking** | Phrase pronunciation guide with browser speech recognition (where supported) |
| **Conversations** | Real-world dialogue scenarios: Introduction, Shopping, Directions, School, Hospital, and more |

### 🤖 AI-Powered Features
| Feature | Description |
|---|---|
| **AI Quiz Arena** | Gemini-powered quiz generation with configurable topic, difficulty, count, and mode |
| **Quiz Batch Resume** | Saves quiz session state in localStorage — resumes from last batch if you leave |
| **AI Vocabulary Builder** | Generate unlimited vocabulary sets by topic with anti-duplication (`excludeWords`) |
| **AI Translation Lab** | English ↔ Kannada translation with context, transliteration, and alternatives |
| **Dictionary Explainer** | AI-powered in-depth explanation of any Kannada word |
| **Homework Generator** | AI generates and evaluates personalised homework assignments |

### 📊 Progress & Personalisation
- Real-time **progress tracking** per learner stored in backend
- **Learning streak**, lessons completed, vocabulary learned, quiz accuracy stats
- **Daily learning goal** with progress indicator
- **Recent activity feed** on the dashboard
- **Saved vocabulary** — bookmark words for later review

### 🎨 Design System
- **Karnataka-inspired** colour palette: Yellow `#F5C400` + Maroon `#8B1538`
- **Noto Sans Kannada** font for correct script rendering
- Fully **responsive** — desktop, tablet, and mobile
- **Dark mode** toggle
- **Light/Dark** theme with ivory surfaces and accessible contrast

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5.3 | Type safety |
| Vite | 5.4 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 6 | Client-side routing |
| Axios | 1.6 | HTTP client |
| Lucide React | — | Icons |
| Noto Sans Kannada | — | Kannada script font |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 4.18 | API server |
| TypeScript | 5.3 | Type safety |
| Google Generative AI SDK | 0.24 | Gemini integration |
| LowDB | 1.0 | Lightweight JSON file database |
| Zod | 3.22 | Schema validation |
| Express Rate Limit | 7.1 | API rate limiting |
| CORS | 2.8 | Cross-origin support |

### Infrastructure
| Service | Purpose |
|---|---|
| **Netlify** | Frontend hosting (CDN, SPA routing) |
| **Render** | Backend hosting (Node.js web service) |
| **GitHub** | Source control & CI/CD trigger |
| **Google Gemini 1.5 Flash** | AI language model |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         User's Browser              │
│   React + Vite (Netlify CDN)        │
│   kannadaforeveryone.netlify.app    │
└──────────────┬──────────────────────┘
               │ HTTPS API calls
               │ /api/*
               ▼
┌─────────────────────────────────────┐
│         Express.js Backend          │
│   kannada-for-everyone-v3.onrender  │
│                                     │
│  ┌──────────┐  ┌─────────────────┐  │
│  │ Curriculum│  │  Quiz / Vocab   │  │
│  │ Routes   │  │  Routes (AI)    │  │
│  └──────────┘  └────────┬────────┘  │
│  ┌──────────┐           │           │
│  │Dictionary│  ┌────────▼────────┐  │
│  │ Routes   │  │  Google Gemini  │  │
│  └──────────┘  │  1.5 Flash API  │  │
│  ┌──────────┐  └─────────────────┘  │
│  │ Progress │                       │
│  │ Routes   │  ┌─────────────────┐  │
│  └──────────┘  │  LowDB JSON DB  │  │
│                │  (progress,     │  │
│                │   vocab, quiz)  │  │
│                └─────────────────┘  │
└─────────────────────────────────────┘
```

### Monorepo Structure
```
kannada-for-everyone-v3/
├── client/                  # React frontend
│   ├── src/
│   │   ├── features/        # Feature modules
│   │   │   ├── curriculum/  # Class overview, lessons, Kagunita, Numbers
│   │   │   ├── quizzes/     # Quiz Arena with batch resume
│   │   │   ├── dictionary/  # Search + AI explainer
│   │   │   ├── translation/ # Translation Lab
│   │   │   ├── vocabulary/  # Flashcards + AI generation
│   │   │   ├── grammar/     # Grammar reference
│   │   │   ├── reading/     # Reading passages
│   │   │   ├── listening/   # TTS pronunciation
│   │   │   ├── speaking/    # Speech recognition
│   │   │   ├── conversations/ # Dialogue scenarios
│   │   │   ├── homework/    # AI homework
│   │   │   └── progress/    # Stats & charts
│   │   ├── pages/           # Dashboard, Onboarding, Settings
│   │   ├── layouts/         # AppLayout (sidebar + navbar)
│   │   ├── components/ui/   # Button, Card, Badge, Modal, Toast...
│   │   ├── hooks/           # useApi, useSpeech, useProfile, useToast
│   │   └── utils/           # api.ts, speech.ts, storage.ts
│   ├── public/_redirects    # Netlify SPA routing
│   └── vercel.json          # Vercel SPA routing (alternate)
├── server/                  # Express backend
│   ├── src/
│   │   ├── routes/          # All API route handlers
│   │   ├── services/        # Gemini AI service, DB service
│   │   ├── data/            # Curriculum data, vocabulary data
│   │   └── server.ts        # Entry point
│   └── dist/                # Compiled JS output
├── shared/                  # Shared TypeScript types
├── render.yaml              # Render deployment config
└── package.json             # Workspace root
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- A Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### 1. Clone the repository
```bash
git clone https://github.com/Abdul5700/kannada-for-everyone-v3.git
cd kannada-for-everyone-v3
```

### 2. Install all dependencies
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 3. Configure the backend
Create `server/.env`:
```env
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=./data/kannada.db
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
NODE_ENV=development
```

### 4. Build and start the backend
```bash
cd server
npm run build
node dist/server.js
```
Backend runs at: http://localhost:5050

### 5. Start the frontend
```bash
cd client
npm run dev
```
Frontend runs at: http://localhost:5173

### 6. Verify health
```bash
curl http://localhost:5050/api/health
```

---

## ☁️ Deployment

### Backend — Render
| Setting | Value |
|---|---|
| Build Command | `npm install && cd server && npm install && npm run build` |
| Start Command | `node server/dist/server.js` |
| Root Directory | *(blank — monorepo root)* |

**Environment Variables on Render:**
```
NODE_ENV=production
PORT=10000
AI_PROVIDER=gemini
GEMINI_MODEL=gemini-1.5-flash
GEMINI_API_KEY=<your key>
CLIENT_ORIGIN=https://kannadaforeveryone.netlify.app
```

### Frontend — Netlify
| Setting | Value |
|---|---|
| Base Directory | `client` |
| Build Command | `npm run build` |
| Publish Directory | `client/dist` |

**Environment Variables on Netlify:**
```
VITE_API_URL=https://kannada-for-everyone-v3.onrender.com
```

> SPA routing is handled automatically by `client/public/_redirects`.

---

## 📸 Application Screenshots

### Dashboard
- Karnataka-themed maroon sidebar with yellow active indicators
- Welcome card with personalized greeting
- Continue Learning card with lesson progress
- Daily Kannada word with audio
- Learning statistics (lessons, vocab, quiz accuracy, streak)
- Recent activity feed

### Quiz Arena
- AI-generated multiple choice questions
- Practice mode: instant feedback with explanation
- Exam mode: full review at the end
- Batch resume — leave and come back, continues from where you stopped

### Foundations Curriculum
- 18 structured sections
- Varnamale (ಅ ಆ ಇ...) with transliteration
- Kagunita matrix (ಕ ಕಾ ಕಿ...)
- Interactive vocabulary flashcards
- Audio pronunciation for every word

---

## 🧠 AI Integration Details

All AI features are powered by **Google Gemini 1.5 Flash** via the `@google/generative-ai` SDK.

| Endpoint | AI Use |
|---|---|
| `POST /api/quiz/generate` | Generates quiz questions with options, answers, and explanations |
| `POST /api/vocabulary/generate` | Creates vocabulary sets by topic with anti-duplication |
| `POST /api/translate` | Translates between English and Kannada with alternatives |
| `POST /api/dictionary/explain` | Deep explanation of a Kannada word in context |
| `POST /api/conversations/generate` | Generates dialogue scenarios for real-life situations |
| `POST /api/homework/generate` | Creates personalised homework assignments |
| `POST /api/homework/evaluate` | Evaluates submitted answers with feedback |

**Fallback**: If Gemini is unavailable, the server falls back to structured mock responses so the app remains functional.

---

## 🎯 Conclusion

**Kannada for Everyone v3.0** successfully demonstrates that a high-quality, AI-powered regional language learning platform can be built and deployed freely using modern web technologies.

### What was achieved:
- ✅ Full-stack monorepo application deployed to production
- ✅ Google Gemini AI integrated across 7 distinct learning features
- ✅ 18-section Foundations curriculum with real Kannada content
- ✅ Quiz batch resume using localStorage session persistence
- ✅ Unlimited vocabulary generation with smart anti-duplication
- ✅ Karnataka-inspired visual identity applied consistently throughout
- ✅ Fully responsive UI — desktop, tablet, mobile
- ✅ Dark mode support
- ✅ Real progress tracking with backend persistence
- ✅ Deployed: Netlify (frontend) + Render (backend) + GitHub (CI/CD)

---

## 🔮 Future Enhancements

### Short Term
- [ ] **User authentication** — proper login with Google OAuth or phone OTP
- [ ] **Offline mode** — Service Worker + IndexedDB for offline lesson access
- [ ] **Push notifications** — daily learning streak reminders
- [ ] **Leaderboard** — gamified class-level rankings
- [ ] **Parent/Teacher dashboard** — monitor student progress

### Medium Term
- [ ] **Kannada handwriting recognition** — draw Kannada letters, AI checks them
- [ ] **Pronunciation scoring** — compare learner's spoken Kannada to native pronunciation
- [ ] **Video lessons** — embed short explainer videos per topic
- [ ] **Peer learning** — study groups, shared vocabulary lists
- [ ] **Mobile app** — React Native version for Android (primary target market)

### Long Term
- [ ] **Expand to other Indian languages** — Telugu, Tamil, Malayalam using same architecture
- [ ] **Karnataka State Board alignment** — official curriculum integration for Classes 1–10
- [ ] **SCORM compliance** — integrate with school LMS platforms
- [ ] **AI tutor chatbot** — conversational Kannada practice with Gemini
- [ ] **Accessibility** — screen reader support, high contrast mode, motor-accessibility

---

## 👨‍💻 Author

**Abdul Khadar**
- GitHub: [@Abdul5700](https://github.com/Abdul5700)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ** 🟡🔴

*Built with love for Karnataka and the Kannada language.*

[![Live App](https://img.shields.io/badge/Try%20It%20Live-kannadaforeveryone.netlify.app-8B1538?style=for-the-badge&logo=netlify&logoColor=white)](https://kannadaforeveryone.netlify.app)

</div>
