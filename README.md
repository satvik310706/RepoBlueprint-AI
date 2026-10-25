# 📐 RepoBlueprint AI

> **From Napkin Sketch to Production Repo in Seconds**  
> *Your Autonomous AI Technical Co-Founder & Architecture Studio — transforming rough sketches, whiteboard photos, and multilingual voice prompts into complete, runnable open-source repositories.*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vitejs.dev/)
[![AI Engine](https://img.shields.io/badge/AI-Gemini%20%26%20Gemma-blue.svg)](https://ai.google.dev/)
[![Ollama Support](https://img.shields.io/badge/Ollama-100%25%20Offline%20%26%20Private-purple.svg)](https://ollama.com/)
[![Voice](https://img.shields.io/badge/Voice-8%20Languages%20STT%20%2B%20TTS-orange.svg)](#-features-at-a-glance)
[![Linter: Oxlint](https://img.shields.io/badge/Linter-Oxlint-cyan.svg)](https://oxc.rs/)

---

## 📑 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features at a Glance](#-features-at-a-glance)
- [3-Way Engine Architecture](#-3-way-engine-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Offline with Ollama](#running-offline-with-ollama)
  - [Available Scripts](#available-scripts)
- [Repository Structure](#-repository-structure)
- [Editorial Design System](#-editorial-design-system)
- [Community & Policies](#-community--policies)
- [License](#-license)

---

## 🎯 The Problem

Every developer, startup founder, and hackathon team hits the same bottleneck:

```
[ Inspiration ] ──► [ Doodle on Napkin / iPad ] ──► ❌ [ 3-5 Days of Architecture Paralysis ]
                                                            ├── Which database fits without over-engineering?
                                                            ├── What will hosting cost at 50k DAU?
                                                            ├── How do I write the docker-compose & boilerplate?
                                                            └── What open-source repos already solved this?
```

- **Boilerplate Fatigue**: Converting spatial boxes and arrows into folder layouts, Dockerfiles, and framework wiring takes hours of tedious setup.
- **Cloud Cost Traps**: Teams launch without realizing whether their architecture costs $10/mo or $1,200/mo at scale.
- **Language Barriers**: Most dev tools require English text prompts, leaving behind builders who articulate ideas best in their native language.
- **Cloud Privacy Constraints**: Confidential enterprise concepts and proprietary architectures cannot always be sent to third-party cloud APIs.

---

## 💡 The Solution

**RepoBlueprint AI** operates as an autonomous **AI Technical Co-Founder**:

1. **Input**: Draw on the high-DPI Napkin Whiteboard, upload physical sketches/diagrams, or dictate in any of 8 languages.
2. **Understand**: Multimodal vision models (Google Gemma / Gemini) or local models (Ollama) extract components, protocols, and data flows.
3. **Align**: Conduct a structured co-founder interview to evaluate trade-offs, clarify ambiguities, and choose high-value architectural enhancements.
4. **Deliver**: Generate an interactive Mermaid topology, a dynamic cloud DAU cost calculator, live GitHub repository intelligence, and a downloadable **1-Click Starter Repo `.zip`**.

---

## ✨ Features at a Glance

### 🎨 1. In-Browser Napkin Whiteboard Canvas
- **High-DPI Vector Canvas**: Pen, component boxes, arrow connectors, text labels, and eraser tools.
- **1-Click Architecture Stencils**: Stamp pre-configured nodes (`Web UI`, `API Gateway`, `PostgreSQL`, `Redis Cache`, `AI Service`, `Auth`).
- **Vision Upload**: Drag-and-drop chalkboard photos, notebook doodles, or iPad screenshots for direct spatial parsing.

### 🎙️ 2. Multilingual Voice Dictation (STT & TTS)
- **8 Supported Languages**:
  - 🇺🇸 English (`en-US`) · 🇮🇳 Telugu (`te-IN`) · 🇮🇳 Hindi (`hi-IN`) · 🇪🇸 Spanish (`es-ES`)
  - 🇫🇷 French (`fr-FR`) · 🇩🇪 German (`de-DE`) · 🇯🇵 Japanese (`ja-JP`) · 🇨🇳 Chinese (`zh-CN`)
- **Live Web Audio VU Meter**: Real-time `AudioContext` decibel visualization with continuous auto-restart.
- **Natural Audio Playback**: Read responses aloud with sentence-boundary chunking.

### 🤝 3. Phase 1: Co-Founder Alignment Interview
- **Topology Extraction**: Automatically maps detected frontend, backend, database, cache, and external services.
- **Architectural Assumptions**: Flags unstated technical assumptions for review.
- **Smart Enhancements**: Toggleable high-impact features (e.g., Edge Caching, Event-Driven Queues, AI Observability) with complexity scores.
- **Decision Engine**: Interactive multiple-choice prompts for databases, authentication, and deployment targets.

### 🌐 4. Phase 2: Master Blueprint Dashboard Suite
- **Interactive Mermaid.js Topology**: Live rendered diagram with theme synchronization (Light/Dark), zoom controls, and SVG/code export.
- **Production Tech Stack Matrix**: Recommended stack with architectural rationale and alternative trade-offs.
- **Dynamic Cloud Cost Calculator**: Real-time monthly cost breakdown (Compute, Database, Cache, LLM tokens) with an interactive 500 to 100k DAU slider.
- **GitHub Market Intelligence**: Queries the GitHub REST API to highlight similar open-source projects, star counts, and licenses.
- **1-Click Starter Repo Generator**: Client-side JSZip packaging that bundles a runnable project (`docker-compose.yml`, backend server, frontend, CI workflows, and README) directly in the browser.
- **24-Hour Sprint Roadmap**: Milestone checklist for building an MVP from Phase 1 through Phase 4.

### 🤖 5. Multilingual Autonomous Copilot
- **Live DOM Execution**: Fills inputs, changes tabs, loads sample architectures, and initiates repo downloads autonomously.
- **Clean Markdown Rendering**: Balanced bracket parsing prevents JSON leaks into chat bubbles.

---

## 🤖 3-Way Engine Architecture

RepoBlueprint AI offers complete flexibility across privacy, hardware, and deployment:

| Engine | Mode | Requirements | Best For |
|---|---|---|---|
| 🦙 **Local Ollama** | 100% Offline & Private | Local Ollama (`llama3.2:3b`, `gemma3:27b`, `mistral:7b`) | Zero cloud egress, local data privacy |
| ✨ **Google Gemini / Gemma** | Multimodal Vision Cloud | Gemini API Key (Free tier at [Google AI Studio](https://aistudio.google.com/)) | High-precision spatial sketch decoding |
| ⚡ **Sandbox Demo** | Zero Configuration | None | Instant hackathon judging and evaluation |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- `npm` (v9.0.0 or higher)
- *(Optional)* [Ollama](https://ollama.com/) for running local open-weight models

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/satvik310706/RepoBlueprint-AI.git
cd RepoBlueprint-AI/RepoBlueprint-AI

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Offline with Ollama

To run completely offline with zero external network requests:

```bash
# Install and run your preferred model
ollama run llama3.2:3b

# Or use Google Gemma
ollama run gemma3:27b
```

The Vite dev server automatically proxies `/ollama` requests to `http://localhost:11434` to eliminate CORS issues.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Builds optimized production bundle in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs the high-performance Oxlint code linter |
| `npm run docker:build` | Builds the multi-stage production Docker image |
| `npm run docker:up` | Launches the production container on port 80 |
| `npm run docker:down` | Stops the running Docker container |
| `npm run docker:logs` | Streams live container logs |

---

## 🐳 Docker Production Deployment

RepoBlueprint AI includes a production-hardened multi-stage Docker setup powered by **Nginx 1.27 Alpine** with automated Gzip compression, OWASP security headers, long-term asset caching, SPA routing, and dynamic Ollama reverse proxying.

### 1. Quick Launch (1 Command)
```bash
# Build and start in detached mode
docker compose up --build -d

# Open in browser
http://localhost
```

### 2. Windows 1-Click Launch
Double-click `docker-run.bat` or run in CMD:
```cmd
docker-run.bat
```

### 3. All-in-One Full-Stack (With Bundled Ollama Container)
If you want both RepoBlueprint and an isolated Ollama engine containerized together:
```bash
docker compose -f docker-compose.fullstack.yml up --build -d
```

### 4. Container Health Check
Verify your production container health status:
```bash
curl http://localhost/health
# Returns: healthy
```

---

## 📁 Repository Structure

```
RepoBlueprint-AI/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Brand logos and icons
│   ├── components/         # Reusable React components
│   │   ├── AlignmentPhase.jsx      # Phase 1: Technical alignment interview
│   │   ├── ApiKeyModal.jsx         # Gemini API key configuration modal
│   │   ├── BlueprintDashboard.jsx  # Phase 2: Topology, Cost, GitHub, Repo viewer
│   │   ├── CopilotDrawer.jsx       # Autonomous multilingual AI assistant
│   │   ├── InputStage.jsx          # Napkin Canvas, Voice, Text, Photo tabs
│   │   ├── LoadingScreen.jsx       # Blueprint synthesis loader
│   │   ├── SetupScreen.jsx         # Engine selection (Ollama / Gemini / Demo)
│   │   ├── Sidebar.jsx             # Collapsible navigation drawer
│   │   ├── ThemeToggle.jsx         # Light / Dark theme switcher
│   │   ├── VoiceDictation.jsx      # Web Audio API 8-language voice dictation
│   │   └── WhiteboardCanvas.jsx    # High-DPI canvas with stencils & labels
│   ├── data/
│   │   └── samples.js      # Curated reference architecture presets
│   ├── services/
│   │   ├── copilot.js      # Chat logic, DOM action parser, speech synthesis
│   │   ├── gemini.js       # Multimodal Gemini & Ollama architecture engine
│   │   ├── github.js       # GitHub REST API live search service
│   │   └── zipper.js       # In-browser JSZip starter repository generator
│   ├── styles/
│   │   ├── App.css         # Main application layout & responsive styles
│   │   └── globals.css     # Editorial design system tokens & typography
│   ├── App.jsx             # Top-level state machine & phase router
│   └── main.jsx            # Application entry point
├── .gitignore              # Git ignore rules
├── .oxlintrc.json          # Oxlint configuration
├── CODE_OF_CONDUCT.md      # Community standards and conduct
├── CONTRIBUTING.md         # Contribution workflow and guidelines
├── LICENSE                 # MIT License
├── package.json            # Project dependencies and npm scripts
├── SECURITY.md             # Security policy and vulnerability reporting
└── vite.config.js          # Vite config with Ollama reverse proxy
```

---

## 🎨 Editorial Design System

RepoBlueprint AI implements a calm, publication-grade editorial interface inspired by modern thoughtful interfaces:

| Token | Light Mode (Warm Ivory) | Dark Mode (Warm Charcoal) | Purpose |
|---|---|---|---|
| `--bg` | `#FAF9F5` | `#262624` | Main page canvas background |
| `--surface` | `#FFFFFF` | `#30302E` | Card, drawer, and modal surfaces |
| `--border` | `#E8E6DC` | `#3E3D3A` | Subtle hairline borders |
| `--text-primary` | `#141413` | `#F5F4ED` | Editorial headlines and primary text |
| `--accent` | `#D97757` | `#D97757` | Warm terracotta brand accent |
| `--accent-button` | `#C96442` | `#D97757` | Primary action button state |
| `--accent-soft` | `#F5E0D6` | `#3D2B24` | Badge and pill backgrounds |

**Typography**: Newsreader / Source Serif for headings and editorial copy, Inter for functional UI chrome, and JetBrains Mono for code blocks.

---

## 🤝 Community & Policies

We welcome contributions from developers worldwide! Please review our project documentation:

- 📖 [Contributing Guidelines](./CONTRIBUTING.md) — How to propose changes, write code, and submit PRs
- 📜 [Code of Conduct](./CODE_OF_CONDUCT.md) — Community standards and enforcement
- 🔒 [Security Policy](./SECURITY.md) — Responsible vulnerability disclosure and privacy principles

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details. Built with ❤️ for open-source builders.
