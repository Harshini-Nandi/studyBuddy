*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I built **StudyBuddy**—a clean, distraction-free, all-in-one study companion combining a **customizable Pomodoro timer**, **interactive 3D flashcards**, and an **automatic multiple-choice quiz generator**.

### 🤝 Who I Built It For
I built this for my close friend who was preparing for technical interviews and competitive college exams. They constantly struggled with two major challenges:
1. **Context-Switching Fatigue:** Juggling between a separate Pomodoro phone timer, complex flashcard apps (often blocked by subscription paywalls or aggressive ads), and online quiz platforms caused frequent loss of focus and study burnout.
2. **Distraction & Clutter:** Most modern study websites are bloated with social feeds, cloud lock-ins, and popups that ruin deep focus sessions.

### 💡 The Solution
StudyBuddy unifies their entire study workflow into one calm, private, zero-distraction space:
- **Ticking Pomodoro Timer** with smooth SVG circular countdowns, break cycles, and audio alerts synthesized directly in the browser via the Web Audio API (no external audio downloads needed!).
- **Persistent Mini-Timer** that stays visible in the header bar while reading flashcards or taking quizzes so study sessions stay timed seamlessly.
- **3D Flip Flashcards** with tactile flip animations, mastery tagging (*Mastered* vs. *Needs Review*), and keyboard controls (<kbd>Space</kbd> to flip, arrow keys to grade).
- **Auto-Generated Quizzes** that transform any flashcard deck into an interactive 4-choice multiple-choice test with smart distractors pulled from other cards, instant feedback, and celebration confetti.
- **100% Offline & Private:** Everything is stored locally in `localStorage` with full JSON import/export capability—no tracking, accounts, or cloud subscriptions required.

---

## Demo

- **Live Demo / Preview:** Open `index.html` directly in any web browser, or launch the included `start.bat` script.
- **Key Visual Highlights:**
  - ⏱️ **Focus Clock:** Circular SVG progress countdown with dark/light mode toggle and ambient study sounds (White Noise, Gentle Rain, Study Waves).
  - 🗂️ **Interactive 3D Cards:** Realistic 3D flip card physics using CSS perspective and transforms.
  - 📝 **Smart Quiz:** Dynamic option randomization with answer reveal explanations and celebratory particle confetti.

---

## Code

The complete source code is modular, zero-dependency, and accessible:
- **Repository:** `https://github.com/your-username/study-buddy`

### 📁 Architecture Overview
- `index.html`: Semantic HTML5, accessible ARIA tab navigation, and native `<dialog>` elements for modal dialogs.
- `style.css`: Theme engine (Dark & Light modes), responsive layouts, 3D card perspective, and glassmorphism accents.
- `app.js`: Zero-dependency JavaScript engine managing timer countdown, Web Audio synthesis, flashcard state, quiz generation, and canvas confetti.
- `data/sample-decks.json`: Portable JSON backup of pre-built decks (*Web Development*, *Biology*, *World Geography*).
- `server.js`: Built-in native Node.js HTTP server.

---

## How I Built It

StudyBuddy was designed and developed through an agentic pair-programming workflow using **Google DeepMind's Antigravity agentic coding assistant**:
1. **Modern Web Guidance & Standards:** Implemented native HTML5 `<dialog>` modals with `.showModal()`, form-based closures, and backdrop blurring rather than heavy third-party modal libraries.
2. **Zero-Dependency Web Audio API:** Synthesized all audio (timer chimes, ambient noise, button clicks, and celebration fanfare) on the fly with native Web Audio oscillators without needing external MP3 assets.
3. **Smart Distractor Generation:** Built an algorithmic quiz generator that extracts the correct answer and dynamically picks plausible distractors from the rest of the deck.
4. **Local-First Resilience:** Stored all user-created decks, custom timer settings, and session stats inside browser `localStorage`, with full JSON export/import.

---

## Why Does Open Innovation Matter?

1. **Building for Real Human Needs:** Open innovation empowers creators to build tailored, lightweight tools that solve immediate personal challenges without forcing friends into subscription paywalls, telemetry, or clutter.
2. **Preserving the Open Web:** Built on open web standards (HTML5 dialogs, CSS Grid/Custom Properties, Web Audio API, ES6), StudyBuddy runs cross-platform on any browser with zero installation hurdles.
3. **Transparent & Local-First AI Collaboration:** Working with accessible AI pair-programming tools allows solo developers to rapidly prototype and deliver production-grade applications that respect privacy.

---

## My Agent Session

This application was engineered with the assistance of the **Antigravity** autonomous coding agent. The session covered:
- Semantic project scaffolding and modern web standard compliance.
- Drift-free timer implementation with real-time SVG circular stroke calculations.
- Synthesis of Web Audio chime frequencies (C5–C6 harmonics) and ambient noise filters.
- Deck state management, keyboard shortcut event listeners, and interactive 3D CSS transforms.

---

## Prize Categories

- **Primary Track:** *Build for a Friend*
- **Partner Categories / Tags:** `#webdev`, `#javascript`, `#productivity`, `#hacktoberfest`
