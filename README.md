# ಕನ್ನಡ for Everyone

### An AI-Powered Kannada Language Learning Platform

Learn practical Kannada through AI-powered assistance, vocabulary, translations, interactive quizzes, pronunciation, and real-world conversations.

<p align="center">

  **🌐 Live App:** [kannadaforeveryone.netlify.app](https://kannadaforeveryone.netlify.app)

  **⚙️ Backend API:** [Render](https://kannada-for-everyone-v3.onrender.com)

  **📦 Source Code:** [GitHub Repository](https://github.com/Abdul5700/kannada-for-everyone-v3)

</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=googlegemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#️-system-architecture)
- [Project Structure](#-project-structure)
- [Live Demo](#-live-demo)
- [Local Setup](#-local-setup)
- [Deployment](#-deployment)
- [AI Integration](#-ai-integration)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 🌟 Overview

**Kannada for Everyone v3.0** is a full-stack, AI-powered web application designed to make learning Kannada more accessible, interactive, and practical.

The platform helps users understand Kannada words, learn useful phrases, translate between English and Kannada, practise vocabulary, explore grammar, and build confidence through everyday conversations.

The application combines a responsive React frontend with an Express backend and AI-powered features using Google Gemini.

### Project Highlights

- AI-assisted Kannada learning and explanations
- English-to-Kannada and Kannada-to-English translation
- Interactive vocabulary and quiz experiences
- Kannada text with transliteration and English meanings
- Pronunciation and speech features supported by the browser
- Progress tracking and saved vocabulary
- Karnataka-inspired visual design
- Responsive interface for desktop, tablet, and mobile

## 🎯 Problem Statement

**Problem Statement 1: Kannada for Everyone**

**Category:** Language Learning

Develop an interactive platform that helps non-Kannada speakers learn practical Kannada through everyday conversations, situations, vocabulary, and guided practice.

### Challenges Addressed

- **Limited personalised assistance:** Learners may need explanations tailored to their questions and learning needs.
- **Language barriers:** Kannada words and phrases can be difficult to understand without translations and examples.
- **Pronunciation difficulties:** Learners need support hearing and practising Kannada pronunciation.
- **Limited practical practice:** Everyday conversations and situational examples help learners apply what they learn.
- **Difficulty measuring progress:** Learners benefit from feedback, practice results, and progress indicators.
- **Script readability:** Kannada text needs appropriate font support and rendering.

## 💡 Our Solution

Kannada for Everyone brings these learning activities together in one web application.

The platform provides structured beginner-friendly learning resources, AI-generated explanations and practice content, vocabulary tools, translation, pronunciation support, quizzes, and real-life dialogue examples.

The aim is to help learners move beyond memorising words and begin using Kannada in practical situations.

## ✨ Key Features

### 📚 Kannada Learning

| Feature | Description |
|---|---|
| Foundations | Learn Kannada vowels, consonants, Kagunita, numbers, colours, greetings, and common expressions. |
| Lesson Details | Explore Kannada text, transliteration, English meanings, exercises, and available audio playback. |
| Grammar | Study topics such as pronouns, verbs, tenses, and adjectives with examples. |
| Reading Practice | Read Kannada passages with translations and comprehension questions. |
| Listening Practice | Practise listening with browser-based text-to-speech where supported. |
| Speaking Practice | Practise phrases using available browser speech recognition and pronunciation tools. |
| Real-Life Conversations | Explore dialogues for introductions, shopping, asking directions, hospitals, and other everyday situations. |

### 🤖 AI-Powered Features

| Feature | Description |
|---|---|
| AI Quiz Arena | Generate quiz questions using a selected topic, difficulty, and practice mode. |
| AI Vocabulary Builder | Generate vocabulary sets based on topics, with duplicate-avoidance logic. |
| Translation Lab | Translate between English and Kannada, with contextual explanations and available alternatives. |
| Dictionary Explainer | Get explanations of Kannada words and their usage. |
| Homework Generator | Generate practice assignments and receive AI-based evaluation where supported. |
| Conversation Generation | Create dialogue examples for practical situations. |

### 📊 Progress and Personalisation

- Track learning activity and available progress statistics.
- Review quiz performance and completed learning activities.
- Set a daily learning goal.
- View recent learning activity.
- Save vocabulary for later revision.
- Resume supported quiz sessions using locally saved session state.

Progress persistence depends on the application's configured backend storage and deployment environment.

### 🎨 User Experience

- Karnataka-inspired yellow (`#F5C400`) and maroon (`#8B1538`) colour palette.
- Kannada script support using the Noto Sans Kannada font.
- Responsive layouts for desktop, tablet, and mobile.
- Light and dark themes.
- Interactive cards, navigation, and learning components.

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and production builds |
| Tailwind CSS | Utility-first styling |
| React Router | Client-side navigation |
| Axios | HTTP communication with the backend |
| Lucide React | Interface icons |
| Noto Sans Kannada | Kannada script typography |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API server |
| TypeScript | Typed backend implementation |
| Google Generative AI SDK | Gemini API integration |
| LowDB | Lightweight JSON-based storage |
| Zod | Request and data validation |
| Express Rate Limit | API rate limiting |
| CORS | Cross-origin request configuration |

### Infrastructure

| Service | Purpose |
|---|---|
| Netlify | Frontend hosting |
| Render | Backend hosting |
| GitHub | Source code hosting and deployment workflow |
| Google Gemini | AI-assisted learning features |

## 🏗️ System Architecture

```text
                 ┌─────────────────────────┐
                 │       Learner           │
                 │    Desktop / Mobile     │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │    React + TypeScript   │
                 │    Vite Frontend        │
                 │       Netlify           │
                 └────────────┬────────────┘
                              │
                       HTTPS REST API
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      Express.js         │
                 │      TypeScript         │
                 │       Render            │
                 └────────────┬────────────┘
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
      ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
      │ Learning &  │  │ Gemini AI   │  │ Progress &  │
      │ Content API │  │ Integration │  │ JSON Storage│
      └─────────────┘  └─────────────┘  └─────────────┘
```

### Architecture Overview

1. The frontend displays learning modules and collects user interactions.
2. The frontend communicates with the backend through HTTP API requests.
3. The backend validates requests and processes application logic.
4. Supported AI features send requests to Google Gemini.
5. Application data is stored through the configured persistence layer.
6. The backend returns results to the frontend for display.

## 📂 Project Structure

```text
kannada-for-everyone-v3/
├── client/
│   ├── public/
│   │   └── _redirects
│   └── src/
│       ├── features/
│       │   ├── curriculum/
│       │   ├── quizzes/
│       │   ├── dictionary/
│       │   ├── translation/
│       │   ├── vocabulary/
│       │   ├── grammar/
│       │   ├── reading/
│       │   ├── listening/
│       │   ├── speaking/
│       │   ├── conversations/
│       │   ├── homework/
│       │   └── progress/
│       ├── pages/
│       ├── layouts/
│       ├── components/
│       ├── hooks/
│       └── utils/
├── server/
│   └── src/
│       ├── routes/
│       ├── services/
│       ├── data/
│       └── server.ts
├── shared/
├── render.yaml
└── package.json
```

*This structure describes the intended organisation; confirm the current repository before treating every listed directory or file as present.*

## 🌐 Live Demo

| Resource | Link |
|---|---|
| Live Frontend | [Open Kannada for Everyone](https://kannadaforeveryone.netlify.app/) |
| Backend API | [Open Backend](https://kannada-for-everyone-v3.onrender.com/) |
| API Health Check | [Check API Status](https://kannada-for-everyone-v3.onrender.com/api/health) |
| GitHub Repository | [View Source Code](https://github.com/Abdul5700/kannada-for-everyone-v3) |

The health endpoint checks backend availability; it does not by itself verify every application feature or AI integration.

## 💻 Local Setup

### Prerequisites

- Node.js and npm
- Git
- A Google Gemini API key for Gemini-powered functionality

### 1. Clone the repository

```bash
git clone https://github.com/Abdul5700/kannada-for-everyone-v3.git
cd kannada-for-everyone-v3
```

### 2. Install dependencies

From the repository root:

```bash
npm install
```

If the client and server use separate dependency installations in your checkout, run `npm install` in each relevant directory as well.

### 3. Configure environment variables

Create `server/.env` using the variable names supported by your backend configuration.

Example:

```env
NODE_ENV=development
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
```

**Important:** Use the model identifier supported by your Gemini API account and the SDK version in the repository. Never commit `.env` files or expose your API key in frontend code.

If your application uses `DATABASE_URL`, configure it to match the database implementation actually used by the server.

### 4. Start the backend

```bash
cd server
npm run build
node dist/server.js
```

If the backend's `package.json` defines a development script, you can use that instead while developing.

Expected local backend URL, if configured with the example port:

```text
http://localhost:5050
```

### 5. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Expected local frontend URL:

```text
http://localhost:5173
```

### 6. Verify the backend

Open the following endpoint in your browser:

```text
http://localhost:5050/api/health
```

A successful health response indicates that the health endpoint is reachable. Test the individual application features separately.

## ☁️ Deployment

### Frontend — Netlify

| Setting | Value |
|---|---|
| Hosting | Netlify |
| Base directory | `client`, if configured for the current repository |
| Build command | `npm run build` |
| Publish directory | `dist` relative to the configured base directory |
| API URL | `https://kannada-for-everyone-v3.onrender.com` |

Configure `VITE_API_URL` in the Netlify environment if that is the variable name used by the frontend.

### Backend — Render

| Setting | Value |
|---|---|
| Hosting | Render |
| Runtime | Node.js |
| Build command | Use the repository's verified build configuration |
| Start command | Use the command matching the compiled server entry point |

Configure backend environment variables in Render, including:

- `NODE_ENV`
- `AI_PROVIDER`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `CLIENT_ORIGIN`
- Any database or port variables required by the server

**Deployment note:** Confirm the actual Render build and start commands in the repository's configuration before changing them. JSON file storage on a hosted service may not be durable across restarts or redeployments unless persistent storage is configured.

## 🧠 AI Integration

Google Gemini can support the application's AI-assisted features through backend API routes.

| Capability | Purpose |
|---|---|
| Quiz generation | Create practice questions and explanations |
| Vocabulary generation | Generate topic-based Kannada vocabulary |
| Translation | Assist with English–Kannada translation |
| Dictionary explanations | Explain word meanings and usage |
| Conversation generation | Produce practical dialogue examples |
| Homework generation | Create practice assignments |
| Answer evaluation | Provide feedback on submitted responses |

The exact endpoints and supported features depend on the implementation currently deployed.

AI-generated language content can contain errors. Important translations, grammar explanations, and pronunciation guidance should be checked for correctness.

## 🔐 Security and Reliability

- Keep Gemini API keys on the backend.
- Store secrets in environment variables rather than committing them to GitHub.
- Validate incoming requests on the server.
- Configure CORS for the intended frontend origin.
- Apply suitable request limits to AI-powered endpoints.
- Avoid storing sensitive learner information unnecessarily.
- Verify persistent storage requirements before relying on progress data in production.

## 🔮 Future Enhancements

- More reliable pronunciation assessment and feedback.
- Improved offline access to learning materials.
- User accounts and synchronised learning progress.
- More extensive native-speaker-reviewed Kannada content.
- Accessibility improvements and expanded speech support.
- Additional conversational scenarios and adaptive practice.
- Support for other Indian languages using a reusable architecture.

## 👨‍💻 Author

**Abdul Khadar**

GitHub: [@Abdul5700](https://github.com/Abdul5700)

## 📄 License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

---

<p align="center">

  **ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ 🟡🔴**

  *Built with a love for Karnataka and the Kannada language.*

  **ಕನ್ನಡ ಕಲಿಯೋಣ — Learn Kannada, together.**

</p>
