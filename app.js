/**
 * StudyBuddy - Core Application Logic
 * Clean, modern, accessible, zero-dependency vanilla JavaScript
 */

(function () {
  'use strict';

  // ==========================================================
  // Default Seed Data
  // ==========================================================
  const DEFAULT_DECKS = [
    {
      id: 'deck-web-dev',
      title: 'Web & Programming Essentials',
      icon: '💻',
      cards: [
        {
          id: 'c-web-1',
          front: 'What does HTML stand for?',
          back: 'HyperText Markup Language',
          hint: 'The foundational markup language for structuring web documents.',
          mastered: false
        },
        {
          id: 'c-web-2',
          front: 'What does CSS stand for?',
          back: 'Cascading Style Sheets',
          hint: 'Controls layout, colors, typography, and visual presentation.',
          mastered: false
        },
        {
          id: 'c-web-3',
          front: 'What does HTTP stand for?',
          back: 'Hypertext Transfer Protocol',
          hint: 'The communication protocol used for transmitting web resources.',
          mastered: false
        },
        {
          id: 'c-web-4',
          front: 'What is the DOM in JavaScript?',
          back: 'Document Object Model',
          hint: 'An in-memory tree representation of the HTML document accessible to JS.',
          mastered: false
        },
        {
          id: 'c-web-5',
          front: 'Which keyword declares a block-scoped constant in JavaScript?',
          back: 'const',
          hint: 'Prevents variable identifier reassignment.',
          mastered: false
        },
        {
          id: 'c-web-6',
          front: 'What does API stand for?',
          back: 'Application Programming Interface',
          hint: 'A set of definitions and protocols for building and integrating software.',
          mastered: false
        },
        {
          id: 'c-web-7',
          front: 'What is an asynchronous operation in JavaScript?',
          back: 'An operation running in the background without blocking the main UI thread',
          hint: 'Commonly executed using Promises and async/await syntax.',
          mastered: false
        },
        {
          id: 'c-web-8',
          front: 'What HTTP status code represents "Not Found"?',
          back: '404',
          hint: 'Standard client error indicating the resource could not be located.',
          mastered: false
        },
        {
          id: 'c-web-9',
          front: 'What is the function of the <dialog> element in HTML5?',
          back: 'Represents a modal or non-modal dialog box or interactive overlay',
          hint: 'Features native focus trapping and backdrop styling via .showModal().',
          mastered: false
        },
        {
          id: 'c-web-10',
          front: 'What does JSON stand for?',
          back: 'JavaScript Object Notation',
          hint: 'Lightweight format for storing and exchanging structured data.',
          mastered: false
        }
      ]
    },
    {
      id: 'deck-science',
      title: 'Biology & Life Sciences',
      icon: '🔬',
      cards: [
        {
          id: 'c-sci-1',
          front: 'What is known as the powerhouse of the cell?',
          back: 'Mitochondria',
          hint: 'Generates most of the chemical energy needed by the cell (ATP).',
          mastered: false
        },
        {
          id: 'c-sci-2',
          front: 'What process do plants use to convert sunlight into food?',
          back: 'Photosynthesis',
          hint: 'Combines carbon dioxide, water, and sunlight to form glucose.',
          mastered: false
        },
        {
          id: 'c-sci-3',
          front: 'What molecule carries hereditary genetic instructions in living organisms?',
          back: 'DNA (Deoxyribonucleic Acid)',
          hint: 'Structured as a double helix composed of nucleotides.',
          mastered: false
        },
        {
          id: 'c-sci-4',
          front: 'Which blood cells transport oxygen throughout the human body?',
          back: 'Red Blood Cells (Erythrocytes)',
          hint: 'Contain the iron-rich protein hemoglobin.',
          mastered: false
        },
        {
          id: 'c-sci-5',
          front: 'What is the fundamental functional unit of the nervous system?',
          back: 'Neuron',
          hint: 'Transmits electrical and chemical signals across synapses.',
          mastered: false
        },
        {
          id: 'c-sci-6',
          front: 'What organ filters waste products from blood to produce urine?',
          back: 'Kidneys',
          hint: 'Contains millions of microscopic filtering units called nephrons.',
          mastered: false
        }
      ]
    },
    {
      id: 'deck-geography',
      title: 'World Geography & Capitals',
      icon: '🌍',
      cards: [
        {
          id: 'c-geo-1',
          front: 'What is the capital city of Japan?',
          back: 'Tokyo',
          hint: 'The world\'s most populous metropolitan area.',
          mastered: false
        },
        {
          id: 'c-geo-2',
          front: 'What is the capital city of Australia?',
          back: 'Canberra',
          hint: 'Purpose-built capital located between Sydney and Melbourne.',
          mastered: false
        },
        {
          id: 'c-geo-3',
          front: 'What is the capital city of Canada?',
          back: 'Ottawa',
          hint: 'Situated on the south bank of the Ottawa River in Ontario.',
          mastered: false
        },
        {
          id: 'c-geo-4',
          front: 'What is the highest mountain peak above sea level on Earth?',
          back: 'Mount Everest',
          hint: 'Located in the Mahalangur Himal sub-range of the Himalayas (8,848m).',
          mastered: false
        },
        {
          id: 'c-geo-5',
          front: 'Which is the largest ocean by surface area on Earth?',
          back: 'Pacific Ocean',
          hint: 'Covers over 30% of the Earth\'s total surface.',
          mastered: false
        }
      ]
    }
  ];

  // ==========================================================
  // Audio Synthesizer (Zero asset dependencies)
  // ==========================================================
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.ambientSource = null;
      this.ambientGain = null;
      this.isAmbientPlaying = false;
      this.ambientType = 'whitenoise';
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playChime() {
      if (!state.pomodoro.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.75);
      });
    }

    playCardFlip() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }

    playCorrect() {
      this.init();
      if (!this.ctx) return;
      [440, 554.37, 659.25].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.26);
      });
    }

    playWrong() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(160, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    }

    playCelebration() {
      this.init();
      if (!this.ctx) return;
      const melody = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50];
      melody.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.14);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.14 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.14);
        osc.stop(this.ctx.currentTime + idx * 0.14 + 0.36);
      });
    }

    toggleAmbient(type) {
      this.init();
      if (!this.ctx) return false;

      if (this.isAmbientPlaying) {
        this.stopAmbient();
        return false;
      }

      this.ambientType = type || 'whitenoise';
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (this.ambientType === 'binaural') {
        // Soft binaural drone tone
        const osc = this.ctx.createOscillator();
        this.ambientGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, this.ctx.currentTime); // Relaxing Solfeggio frequency
        this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        osc.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        osc.start();
        this.ambientSource = osc;
      } else {
        // White noise or filtered rain
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          if (this.ambientType === 'rain') {
            // Brown/Pink filter simulation
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
          } else {
            output[i] = white * 0.15;
          }
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

        whiteNoise.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        whiteNoise.start();
        this.ambientSource = whiteNoise;
      }

      this.isAmbientPlaying = true;
      return true;
    }

    stopAmbient() {
      if (this.ambientSource) {
        try {
          this.ambientSource.stop();
          this.ambientSource.disconnect();
        } catch (e) {
          // ignore already stopped
        }
        this.ambientSource = null;
      }
      this.isAmbientPlaying = false;
    }
  }

  const sfx = new SoundFX();

  // ==========================================================
  // Application State
  // ==========================================================
  const STORAGE_KEY = 'study_buddy_app_v1';

  let state = {
    theme: 'dark',
    activeTab: 'pomodoro',
    pomodoro: {
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      cycleInterval: 4,
      soundEnabled: true,
      autoStartBreak: false,
      currentMode: 'focus', // 'focus', 'shortBreak', 'longBreak'
      timeLeft: 25 * 60,
      isRunning: false,
      completedPomodoros: 0,
      totalFocusMinutes: 0,
      currentCycle: 1
    },
    decks: [],
    selectedDeckId: '',
    flashcardIndex: 0,
    flashcardOrder: [], // stores card IDs in current view order (for shuffle)
    isCardFlipped: false,
    quizState: {
      active: false,
      deckId: '',
      questions: [],
      currentIndex: 0,
      score: 0,
      mode: 'mcq',
      answers: []
    }
  };

  // Timer interval reference
  let timerIntervalId = null;
  let timerEndTimestamp = null;

  // ==========================================================
  // Storage & Initialization
  // ==========================================================
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = {
          ...state,
          ...parsed,
          pomodoro: {
            ...state.pomodoro,
            ...(parsed.pomodoro || {}),
            isRunning: false // ensure paused on reload
          },
          quizState: {
            ...state.quizState,
            active: false
          }
        };
      } else {
        state.decks = JSON.parse(JSON.stringify(DEFAULT_DECKS));
      }
    } catch (e) {
      console.warn('Failed to load saved state, using defaults', e);
      state.decks = JSON.parse(JSON.stringify(DEFAULT_DECKS));
    }

    if (!state.decks || state.decks.length === 0) {
      state.decks = JSON.parse(JSON.stringify(DEFAULT_DECKS));
    }

    if (!state.selectedDeckId || !state.decks.find(d => d.id === state.selectedDeckId)) {
      state.selectedDeckId = state.decks[0].id;
    }

    // Set initial timer left
    resetTimerToCurrentMode();
  }

  function saveState() {
    try {
      const dataToSave = {
        theme: state.theme,
        pomodoro: {
          focusDuration: state.pomodoro.focusDuration,
          shortBreakDuration: state.pomodoro.shortBreakDuration,
          longBreakDuration: state.pomodoro.longBreakDuration,
          cycleInterval: state.pomodoro.cycleInterval,
          soundEnabled: state.pomodoro.soundEnabled,
          autoStartBreak: state.pomodoro.autoStartBreak,
          completedPomodoros: state.pomodoro.completedPomodoros,
          totalFocusMinutes: state.pomodoro.totalFocusMinutes,
          currentCycle: state.pomodoro.currentCycle
        },
        decks: state.decks,
        selectedDeckId: state.selectedDeckId
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  // ==========================================================
  // DOM Elements Selection
  // ==========================================================
  const el = {
    // Theme & Navigation
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    iconDark: document.querySelector('.theme-icon-dark'),
    iconLight: document.querySelector('.theme-icon-light'),
    navTabs: document.querySelectorAll('.nav-tab'),
    tabSections: document.querySelectorAll('.tab-section'),
    openSettingsBtn: document.getElementById('openSettingsBtn'),

    // Mini Timer Header Bar
    miniTimerPill: document.getElementById('miniTimerPill'),
    miniTimerLabel: document.getElementById('miniTimerLabel'),
    miniTimerTime: document.getElementById('miniTimerTime'),
    miniTimerToggle: document.getElementById('miniTimerToggle'),
    miniPlayIcon: document.getElementById('miniPlayIcon'),
    miniPauseIcon: document.getElementById('miniPauseIcon'),

    // Pomodoro View
    modePills: document.querySelectorAll('.mode-pill'),
    timerProgressRing: document.getElementById('timerProgressRing'),
    timerDigits: document.getElementById('timerDigits'),
    timerPhaseBadge: document.getElementById('timerPhaseBadge'),
    timerMotto: document.getElementById('timerMotto'),
    timerMainBtn: document.getElementById('timerMainBtn'),
    timerMainBtnText: document.getElementById('timerMainBtnText'),
    timerPlaySvg: document.getElementById('timerPlaySvg'),
    timerPauseSvg: document.getElementById('timerPauseSvg'),
    timerResetBtn: document.getElementById('timerResetBtn'),
    timerSkipBtn: document.getElementById('timerSkipBtn'),
    pomodoroCountToday: document.getElementById('pomodoroCountToday'),
    totalFocusMinutesToday: document.getElementById('totalFocusMinutesToday'),
    cycleStatus: document.getElementById('cycleStatus'),
    toggleAmbientBtn: document.getElementById('toggleAmbientBtn'),
    soundChips: document.querySelectorAll('.sound-chip'),

    // Flashcards View
    deckSelect: document.getElementById('deckSelect'),
    btnManageDeck: document.getElementById('btnManageDeck'),
    btnNewDeck: document.getElementById('btnNewDeck'),
    btnAddCard: document.getElementById('btnAddCard'),
    cardProgressFill: document.getElementById('cardProgressFill'),
    cardIndexLabel: document.getElementById('cardIndexLabel'),
    pillMastered: document.getElementById('pillMastered'),
    pillReview: document.getElementById('pillReview'),
    btnShuffleDeck: document.getElementById('btnShuffleDeck'),
    btnResetDeckProgress: document.getElementById('btnResetDeckProgress'),
    activeFlashcard: document.getElementById('activeFlashcard'),
    cardQuestionText: document.getElementById('cardQuestionText'),
    cardAnswerText: document.getElementById('cardAnswerText'),
    cardExtraHint: document.getElementById('cardExtraHint'),
    cardCategoryFront: document.getElementById('cardCategoryFront'),
    btnCardReview: document.getElementById('btnCardReview'),
    btnCardFlip: document.getElementById('btnCardFlip'),
    btnCardMastered: document.getElementById('btnCardMastered'),
    btnJumpToQuiz: document.getElementById('btnJumpToQuiz'),

    // Quiz View
    quizSetupView: document.getElementById('quizSetupView'),
    quizActiveView: document.getElementById('quizActiveView'),
    quizResultsView: document.getElementById('quizResultsView'),
    quizDeckSelect: document.getElementById('quizDeckSelect'),
    quizCountSelect: document.getElementById('quizCountSelect'),
    btnStartQuiz: document.getElementById('btnStartQuiz'),
    quizCurrentDeckBadge: document.getElementById('quizCurrentDeckBadge'),
    quizProgressText: document.getElementById('quizProgressText'),
    quizLiveScore: document.getElementById('quizLiveScore'),
    quizProgressBarFill: document.getElementById('quizProgressBarFill'),
    quizQuestionNumberBadge: document.getElementById('quizQuestionNumberBadge'),
    quizQuestionText: document.getElementById('quizQuestionText'),
    quizOptionsContainer: document.getElementById('quizOptionsContainer'),
    quizSelfCheckContainer: document.getElementById('quizSelfCheckContainer'),
    selfCheckAnswer: document.getElementById('selfCheckAnswer'),
    btnRevealSelfCheck: document.getElementById('btnRevealSelfCheck'),
    btnSelfCheckWrong: document.getElementById('btnSelfCheckWrong'),
    btnSelfCheckRight: document.getElementById('btnSelfCheckRight'),
    quizFeedbackBox: document.getElementById('quizFeedbackBox'),
    quizFeedbackMessage: document.getElementById('quizFeedbackMessage'),
    btnNextQuizQuestion: document.getElementById('btnNextQuizQuestion'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    resultsTrophyIcon: document.getElementById('resultsTrophyIcon'),
    resultsGradeTitle: document.getElementById('resultsGradeTitle'),
    resultsDeckName: document.getElementById('resultsDeckName'),
    resultsScorePercentage: document.getElementById('resultsScorePercentage'),
    resultsScoreRatio: document.getElementById('resultsScoreRatio'),
    resultsReviewList: document.getElementById('resultsReviewList'),
    btnRetakeQuiz: document.getElementById('btnRetakeQuiz'),
    btnFinishQuiz: document.getElementById('btnFinishQuiz'),

    // Modals
    settingsDialog: document.getElementById('settingsDialog'),
    settingsForm: document.getElementById('settingsForm'),
    settingFocus: document.getElementById('settingFocus'),
    settingShortBreak: document.getElementById('settingShortBreak'),
    settingLongBreak: document.getElementById('settingLongBreak'),
    settingCycleCount: document.getElementById('settingCycleCount'),
    settingSoundEnabled: document.getElementById('settingSoundEnabled'),
    settingAutoStartBreak: document.getElementById('settingAutoStartBreak'),
    btnExportData: document.getElementById('btnExportData'),
    importDataInput: document.getElementById('importDataInput'),
    btnRestoreSampleData: document.getElementById('btnRestoreSampleData'),

    newDeckDialog: document.getElementById('newDeckDialog'),
    newDeckForm: document.getElementById('newDeckForm'),
    newDeckTitle: document.getElementById('newDeckTitle'),
    newDeckIcon: document.getElementById('newDeckIcon'),

    cardModalDialog: document.getElementById('cardModalDialog'),
    cardModalTitle: document.getElementById('cardModalTitle'),
    cardModalForm: document.getElementById('cardModalForm'),
    cardModalEditId: document.getElementById('cardModalEditId'),
    cardModalQuestion: document.getElementById('cardModalQuestion'),
    cardModalAnswer: document.getElementById('cardModalAnswer'),
    cardModalHint: document.getElementById('cardModalHint'),

    manageDeckDialog: document.getElementById('manageDeckDialog'),
    manageDeckModalTitle: document.getElementById('manageDeckModalTitle'),
    btnQuickAddCardFromManage: document.getElementById('btnQuickAddCardFromManage'),
    btnDeleteCurrentDeck: document.getElementById('btnDeleteCurrentDeck'),
    manageDeckCardsTbody: document.getElementById('manageDeckCardsTbody')
  };

  // ==========================================================
  // Theme & Navigation
  // ==========================================================
  function applyTheme(theme) {
    state.theme = theme;
    el.html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      el.iconDark.classList.remove('hidden');
      el.iconLight.classList.add('hidden');
    } else {
      el.iconDark.classList.add('hidden');
      el.iconLight.classList.remove('hidden');
    }
    saveState();
  }

  function switchTab(targetTabId) {
    state.activeTab = targetTabId;

    el.navTabs.forEach(tab => {
      const isSelected = tab.getAttribute('aria-controls') === targetTabId;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    el.tabSections.forEach(section => {
      section.classList.toggle('active', section.id === targetTabId);
    });

    // Refresh views if needed
    if (targetTabId === 'sectionFlashcards') {
      renderFlashcardsView();
    } else if (targetTabId === 'sectionQuiz') {
      syncQuizDeckOptions();
    }
  }

  // ==========================================================
  // Pomodoro Timer Engine
  // ==========================================================
  function getModeDurationMinutes(mode) {
    if (mode === 'shortBreak') return state.pomodoro.shortBreakDuration;
    if (mode === 'longBreak') return state.pomodoro.longBreakDuration;
    return state.pomodoro.focusDuration;
  }

  function resetTimerToCurrentMode() {
    pauseTimer();
    const durationMins = getModeDurationMinutes(state.pomodoro.currentMode);
    state.pomodoro.timeLeft = durationMins * 60;
    updateTimerDisplay();
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    const timeFormatted = formatTime(state.pomodoro.timeLeft);
    el.timerDigits.textContent = timeFormatted;
    el.miniTimerTime.textContent = timeFormatted;

    // Document title
    const modeName = state.pomodoro.currentMode === 'focus' ? 'Focus' : 'Break';
    document.title = state.pomodoro.isRunning
      ? `(${timeFormatted}) StudyBuddy - ${modeName}`
      : 'StudyBuddy - Focus Timer, Flashcards & Quiz';

    // Circular Progress Calculation
    const totalSecs = getModeDurationMinutes(state.pomodoro.currentMode) * 60;
    const progress = totalSecs > 0 ? (totalSecs - state.pomodoro.timeLeft) / totalSecs : 0;
    
    // SVG ring circumference = 2 * PI * 120 ≈ 753.98
    const circumference = 753.98;
    const offset = circumference - (progress * circumference);
    el.timerProgressRing.style.strokeDashoffset = offset;

    // Phase Badge and Theme Accent
    if (state.pomodoro.currentMode === 'focus') {
      el.timerPhaseBadge.textContent = 'Deep Focus';
      el.timerMotto.textContent = 'Stay locked in. Small steps build greatness!';
      el.miniTimerLabel.textContent = 'Focus';
      el.timerProgressRing.style.stroke = 'var(--accent-focus)';
    } else if (state.pomodoro.currentMode === 'shortBreak') {
      el.timerPhaseBadge.textContent = 'Short Break';
      el.timerMotto.textContent = 'Stand up, stretch, breathe deeply 🌿';
      el.miniTimerLabel.textContent = 'Break';
      el.timerProgressRing.style.stroke = 'var(--accent-short-break)';
    } else {
      el.timerPhaseBadge.textContent = 'Long Break';
      el.timerMotto.textContent = 'Well earned rest! Recharge your battery ☕';
      el.miniTimerLabel.textContent = 'Long Rest';
      el.timerProgressRing.style.stroke = 'var(--accent-long-break)';
    }

    // Cycle & Stats
    el.pomodoroCountToday.textContent = state.pomodoro.completedPomodoros;
    el.totalFocusMinutesToday.textContent = `${state.pomodoro.totalFocusMinutes}m`;
    el.cycleStatus.textContent = `Round ${state.pomodoro.currentCycle} / ${state.pomodoro.cycleInterval}`;

    // Mode Pill Active State
    el.modePills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.mode === state.pomodoro.currentMode);
    });
  }

  function startTimer() {
    if (state.pomodoro.isRunning) return;
    sfx.init();

    state.pomodoro.isRunning = true;
    timerEndTimestamp = Date.now() + (state.pomodoro.timeLeft * 1000);

    el.timerMainBtnText.textContent = 'Pause';
    el.timerPlaySvg.classList.add('hidden');
    el.timerPauseSvg.classList.remove('hidden');
    el.miniPlayIcon.classList.add('hidden');
    el.miniPauseIcon.classList.remove('hidden');

    timerIntervalId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.round((timerEndTimestamp - now) / 1000);

      if (remaining <= 0) {
        state.pomodoro.timeLeft = 0;
        updateTimerDisplay();
        handleTimerComplete();
      } else {
        state.pomodoro.timeLeft = remaining;
        updateTimerDisplay();
      }
    }, 500);

    updateTimerDisplay();
  }

  function pauseTimer() {
    if (!state.pomodoro.isRunning && !timerIntervalId) return;

    state.pomodoro.isRunning = false;
    clearInterval(timerIntervalId);
    timerIntervalId = null;

    el.timerMainBtnText.textContent = state.pomodoro.currentMode === 'focus' ? 'Start Focus' : 'Start Break';
    el.timerPlaySvg.classList.remove('hidden');
    el.timerPauseSvg.classList.add('hidden');
    el.miniPlayIcon.classList.remove('hidden');
    el.miniPauseIcon.classList.add('hidden');

    updateTimerDisplay();
  }

  function handleTimerComplete() {
    pauseTimer();
    sfx.playChime();

    // Browser Notification if supported and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = state.pomodoro.currentMode === 'focus' ? 'Focus Session Complete! 🍅' : 'Break Time Finished! ✨';
      const body = state.pomodoro.currentMode === 'focus' ? 'Great work! Time to take a breather.' : 'Ready to resume your study goal?';
      try {
        new Notification(title, { body, icon: 'favicon.ico' });
      } catch (e) {
        // notification fallback
      }
    }

    if (state.pomodoro.currentMode === 'focus') {
      state.pomodoro.completedPomodoros++;
      state.pomodoro.totalFocusMinutes += state.pomodoro.focusDuration;

      if (state.pomodoro.currentCycle >= state.pomodoro.cycleInterval) {
        state.pomodoro.currentCycle = 1;
        state.pomodoro.currentMode = 'longBreak';
      } else {
        state.pomodoro.currentCycle++;
        state.pomodoro.currentMode = 'shortBreak';
      }
    } else {
      // Finished a break, back to focus
      state.pomodoro.currentMode = 'focus';
    }

    saveState();
    resetTimerToCurrentMode();

    if (state.pomodoro.autoStartBreak) {
      startTimer();
    }
  }

  function skipTimerSession() {
    pauseTimer();
    if (state.pomodoro.currentMode === 'focus') {
      if (state.pomodoro.currentCycle >= state.pomodoro.cycleInterval) {
        state.pomodoro.currentCycle = 1;
        state.pomodoro.currentMode = 'longBreak';
      } else {
        state.pomodoro.currentCycle++;
        state.pomodoro.currentMode = 'shortBreak';
      }
    } else {
      state.pomodoro.currentMode = 'focus';
    }
    resetTimerToCurrentMode();
  }

  // ==========================================================
  // Flashcard Deck & Card Management
  // ==========================================================
  function getCurrentDeck() {
    return state.decks.find(d => d.id === state.selectedDeckId) || state.decks[0];
  }

  function syncDeckDropdowns() {
    const currentDeck = getCurrentDeck();
    el.deckSelect.innerHTML = '';
    el.quizDeckSelect.innerHTML = '';

    state.decks.forEach(deck => {
      const opt = document.createElement('option');
      opt.value = deck.id;
      opt.textContent = `${deck.icon || '📚'} ${deck.title} (${deck.cards.length} cards)`;
      if (deck.id === currentDeck.id) opt.selected = true;
      el.deckSelect.appendChild(opt);

      const quizOpt = opt.cloneNode(true);
      el.quizDeckSelect.appendChild(quizOpt);
    });
  }

  function renderFlashcardsView() {
    syncDeckDropdowns();
    const deck = getCurrentDeck();
    if (!deck) return;

    // Check if flashcard order array matches current deck cards
    if (state.flashcardOrder.length !== deck.cards.length || !deck.cards.some(c => c.id === state.flashcardOrder[0])) {
      state.flashcardOrder = deck.cards.map(c => c.id);
      state.flashcardIndex = 0;
    }

    if (state.flashcardIndex >= state.flashcardOrder.length) {
      state.flashcardIndex = Math.max(0, state.flashcardOrder.length - 1);
    }

    // Reset flipped state
    state.isCardFlipped = false;
    el.activeFlashcard.classList.remove('flipped');

    // Counts
    const totalCards = deck.cards.length;
    const masteredCount = deck.cards.filter(c => c.mastered).length;
    const reviewCount = totalCards - masteredCount;

    el.pillMastered.textContent = `Mastered: ${masteredCount}`;
    el.pillReview.textContent = `Needs Review: ${reviewCount}`;

    if (totalCards === 0) {
      el.cardIndexLabel.textContent = 'No cards in this deck';
      el.cardProgressFill.style.width = '0%';
      el.cardQuestionText.textContent = 'This deck has no flashcards yet.';
      el.cardAnswerText.textContent = 'Click "+ Add Card" above to add your first question & answer!';
      el.cardExtraHint.textContent = '';
      el.cardCategoryFront.textContent = 'EMPTY DECK';
      el.cardCategoryBack.textContent = 'EMPTY DECK';
      return;
    }

    const currentCardId = state.flashcardOrder[state.flashcardIndex];
    const card = deck.cards.find(c => c.id === currentCardId) || deck.cards[0];

    el.cardIndexLabel.textContent = `Card ${state.flashcardIndex + 1} of ${totalCards}`;
    const progressPercent = Math.round(((state.flashcardIndex + 1) / totalCards) * 100);
    el.cardProgressFill.style.width = `${progressPercent}%`;

    el.cardQuestionText.textContent = card.front;
    el.cardAnswerText.textContent = card.back;
    el.cardCategoryFront.textContent = card.mastered ? 'MASTERED ✅' : 'QUESTION';
    el.cardCategoryBack.textContent = 'ANSWER';

    if (card.hint && card.hint.trim()) {
      el.cardExtraHint.textContent = `💡 Tip: ${card.hint}`;
      el.cardExtraHint.classList.remove('hidden');
    } else {
      el.cardExtraHint.textContent = '';
      el.cardExtraHint.classList.add('hidden');
    }
  }

  function flipFlashcard() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    state.isCardFlipped = !state.isCardFlipped;
    el.activeFlashcard.classList.toggle('flipped', state.isCardFlipped);
    sfx.playCardFlip();
  }

  function advanceFlashcard(masteredState) {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    const currentCardId = state.flashcardOrder[state.flashcardIndex];
    const card = deck.cards.find(c => c.id === currentCardId);
    if (card) {
      card.mastered = masteredState;
      saveState();
    }

    if (masteredState) {
      sfx.playCorrect();
    } else {
      sfx.playCardFlip();
    }

    // Go to next card
    if (state.flashcardIndex < state.flashcardOrder.length - 1) {
      state.flashcardIndex++;
    } else {
      // Loop back to first or stay
      state.flashcardIndex = 0;
    }

    renderFlashcardsView();
  }

  function shuffleFlashcards() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length <= 1) return;

    // Fisher-Yates shuffle
    const arr = [...state.flashcardOrder];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    state.flashcardOrder = arr;
    state.flashcardIndex = 0;
    sfx.playCardFlip();
    renderFlashcardsView();
  }

  function resetDeckMastery() {
    const deck = getCurrentDeck();
    if (!deck) return;
    if (confirm(`Reset mastery progress for "${deck.title}"?`)) {
      deck.cards.forEach(c => c.mastered = false);
      saveState();
      renderFlashcardsView();
    }
  }

  // ==========================================================
  // Deck Management Modal (List, Edit, Delete)
  // ==========================================================
  function openManageDeckModal() {
    const deck = getCurrentDeck();
    if (!deck) return;

    el.manageDeckModalTitle.textContent = `🗂️ Manage: ${deck.icon || '📚'} ${deck.title}`;
    el.manageDeckCardsTbody.innerHTML = '';

    if (deck.cards.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-dim); padding: 24px;">No cards in this deck yet.</td>`;
      el.manageDeckCardsTbody.appendChild(row);
    } else {
      deck.cards.forEach((card, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${index + 1}</strong></td>
          <td>${escapeHtml(card.front)}</td>
          <td>${escapeHtml(card.back)}</td>
          <td>${card.mastered ? '<span class="pill pill-green">Mastered</span>' : '<span class="pill pill-amber">Learning</span>'}</td>
          <td>
            <div class="deck-action-cell">
              <button type="button" class="icon-action-btn btn-edit-card" data-card-id="${card.id}" title="Edit Card">✏️</button>
              <button type="button" class="icon-action-btn btn-delete-card" data-card-id="${card.id}" title="Delete Card">🗑️</button>
            </div>
          </td>
        `;
        el.manageDeckCardsTbody.appendChild(tr);
      });
    }

    el.manageDeckDialog.showModal();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function openAddCardModal(cardToEdit = null) {
    el.cardModalForm.reset();
    if (cardToEdit) {
      el.cardModalTitle.textContent = '✏️ Edit Flashcard';
      el.cardModalEditId.value = cardToEdit.id;
      el.cardModalQuestion.value = cardToEdit.front;
      el.cardModalAnswer.value = cardToEdit.back;
      el.cardModalHint.value = cardToEdit.hint || '';
    } else {
      el.cardModalTitle.textContent = '➕ Add Flashcard';
      el.cardModalEditId.value = '';
    }
    el.cardModalDialog.showModal();
  }

  function saveCardModal(e) {
    e.preventDefault();
    const deck = getCurrentDeck();
    if (!deck) return;

    const editId = el.cardModalEditId.value;
    const frontText = el.cardModalQuestion.value.trim();
    const backText = el.cardModalAnswer.value.trim();
    const hintText = el.cardModalHint.value.trim();

    if (!frontText || !backText) return;

    if (editId) {
      // Edit existing
      const card = deck.cards.find(c => c.id === editId);
      if (card) {
        card.front = frontText;
        card.back = backText;
        card.hint = hintText;
      }
    } else {
      // New card
      const newCard = {
        id: 'c-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        front: frontText,
        back: backText,
        hint: hintText,
        mastered: false
      };
      deck.cards.push(newCard);
      state.flashcardOrder.push(newCard.id);
    }

    saveState();
    el.cardModalDialog.close();
    renderFlashcardsView();

    // If manage dialog is open, refresh its list
    if (el.manageDeckDialog.open) {
      openManageDeckModal();
    }
  }

  function deleteCard(cardId) {
    const deck = getCurrentDeck();
    if (!deck) return;

    if (confirm('Delete this flashcard?')) {
      deck.cards = deck.cards.filter(c => c.id !== cardId);
      state.flashcardOrder = state.flashcardOrder.filter(id => id !== cardId);
      saveState();
      renderFlashcardsView();
      openManageDeckModal();
    }
  }

  function deleteCurrentDeck() {
    if (state.decks.length <= 1) {
      alert('You must keep at least one deck in your library.');
      return;
    }

    const deck = getCurrentDeck();
    if (!deck) return;

    if (confirm(`Are you sure you want to permanently delete "${deck.title}" and all its cards?`)) {
      state.decks = state.decks.filter(d => d.id !== deck.id);
      state.selectedDeckId = state.decks[0].id;
      saveState();
      el.manageDeckDialog.close();
      renderFlashcardsView();
    }
  }

  function createNewDeck(e) {
    e.preventDefault();
    const title = el.newDeckTitle.value.trim();
    const icon = el.newDeckIcon.value.trim() || '📚';
    if (!title) return;

    const newDeck = {
      id: 'deck-' + Date.now(),
      title,
      icon,
      cards: []
    };

    state.decks.push(newDeck);
    state.selectedDeckId = newDeck.id;
    state.flashcardOrder = [];
    state.flashcardIndex = 0;

    saveState();
    el.newDeckDialog.close();
    renderFlashcardsView();

    // Prompt user to add card
    setTimeout(() => {
      openAddCardModal();
    }, 200);
  }

  // ==========================================================
  // Interactive Quiz Engine
  // ==========================================================
  function syncQuizDeckOptions() {
    syncDeckDropdowns();
    if (state.selectedDeckId) {
      el.quizDeckSelect.value = state.selectedDeckId;
    }
  }

  function startQuiz() {
    const deckId = el.quizDeckSelect.value;
    const deck = state.decks.find(d => d.id === deckId) || getCurrentDeck();
    if (!deck || deck.cards.length === 0) {
      alert('This deck has no cards to quiz. Please add cards first!');
      return;
    }

    const countChoice = el.quizCountSelect.value;
    const mode = document.querySelector('input[name="quizMode"]:checked').value;

    let availableCards = [...deck.cards];
    // Shuffle available cards
    availableCards.sort(() => Math.random() - 0.5);

    let questionCount = availableCards.length;
    if (countChoice === '5') questionCount = Math.min(5, availableCards.length);
    if (countChoice === '10') questionCount = Math.min(10, availableCards.length);

    const selectedCards = availableCards.slice(0, questionCount);

    // Build question set with multiple choices
    const questions = selectedCards.map((card, qIndex) => {
      // Find 3 distractors from this deck or other decks
      const allOtherCards = state.decks
        .flatMap(d => d.cards)
        .filter(c => c.back.toLowerCase() !== card.back.toLowerCase());

      // Shuffle and pick up to 3 distractors
      allOtherCards.sort(() => Math.random() - 0.5);
      const distractors = allOtherCards.slice(0, 3).map(c => c.back);

      // Fill in generic options if fewer than 3 distractors exist
      const genericFallbacks = [
        'None of the above',
        'Directly related to energy transfer',
        'Standard unit of scientific measurement',
        'Fundamental principle of logic'
      ];
      while (distractors.length < 3) {
        const fallback = genericFallbacks.pop() || 'Alternate solution';
        if (!distractors.includes(fallback) && fallback !== card.back) {
          distractors.push(fallback);
        }
      }

      // Combine and shuffle choices
      const choices = [card.back, ...distractors].sort(() => Math.random() - 0.5);

      return {
        id: card.id,
        question: card.front,
        correctAnswer: card.back,
        hint: card.hint || '',
        choices: choices
      };
    });

    state.quizState = {
      active: true,
      deckId: deck.id,
      deckTitle: deck.title,
      questions: questions,
      currentIndex: 0,
      score: 0,
      mode: mode,
      answers: []
    };

    // Transition views
    el.quizSetupView.classList.add('hidden');
    el.quizResultsView.classList.add('hidden');
    el.quizActiveView.classList.remove('hidden');

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = state.quizState.questions[state.quizState.currentIndex];
    const totalQ = state.quizState.questions.length;
    const currentNum = state.quizState.currentIndex + 1;

    el.quizCurrentDeckBadge.textContent = state.quizState.deckTitle;
    el.quizProgressText.textContent = `Question ${currentNum} of ${totalQ}`;
    el.quizLiveScore.textContent = `Score: ${state.quizState.score}`;

    const pct = Math.round((currentNum / totalQ) * 100);
    el.quizProgressBarFill.style.width = `${pct}%`;

    el.quizQuestionNumberBadge.textContent = `Q${currentNum}`;
    el.quizQuestionText.textContent = q.question;

    // Reset feedback box
    el.quizFeedbackBox.classList.add('hidden');

    if (state.quizState.mode === 'mcq') {
      el.quizOptionsContainer.classList.remove('hidden');
      el.quizSelfCheckContainer.classList.add('hidden');
      el.quizOptionsContainer.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.choices.forEach((choiceText, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="quiz-option-letter">${letters[index] || index + 1}</span>
          <span>${escapeHtml(choiceText)}</span>
        `;
        btn.addEventListener('click', () => handleMCQChoice(btn, choiceText, q));
        el.quizOptionsContainer.appendChild(btn);
      });
    } else {
      // Self-check mode
      el.quizOptionsContainer.classList.add('hidden');
      el.quizSelfCheckContainer.classList.remove('hidden');
      el.selfCheckAnswer.textContent = '??? (Click Reveal Answer when ready)';
      el.btnRevealSelfCheck.classList.remove('hidden');
      el.btnSelfCheckWrong.classList.add('hidden');
      el.btnSelfCheckRight.classList.add('hidden');
    }
  }

  function handleMCQChoice(selectedBtn, chosenAnswer, questionObj) {
    const isCorrect = chosenAnswer === questionObj.correctAnswer;
    const allButtons = el.quizOptionsContainer.querySelectorAll('.quiz-option-btn');

    // Disable all options once answered
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      state.quizState.score++;
      sfx.playCorrect();
      el.quizFeedbackMessage.innerHTML = `✨ <strong>Correct!</strong> Well done.`;
      el.quizFeedbackBox.style.borderLeftColor = 'var(--success)';
    } else {
      selectedBtn.classList.add('wrong');
      sfx.playWrong();
      // Highlight the correct answer
      allButtons.forEach(btn => {
        if (btn.textContent.includes(questionObj.correctAnswer)) {
          btn.classList.add('correct');
        }
      });
      el.quizFeedbackMessage.innerHTML = `❌ <strong>Not quite!</strong> Correct answer: <em>${escapeHtml(questionObj.correctAnswer)}</em>`;
      el.quizFeedbackBox.style.borderLeftColor = 'var(--danger)';
    }

    state.quizState.answers.push({
      question: questionObj.question,
      chosenAnswer: chosenAnswer,
      correctAnswer: questionObj.correctAnswer,
      isCorrect: isCorrect
    });

    el.quizLiveScore.textContent = `Score: ${state.quizState.score}`;
    el.quizFeedbackBox.classList.remove('hidden');
  }

  function handleSelfCheck(isCorrect) {
    const q = state.quizState.questions[state.quizState.currentIndex];
    if (isCorrect) {
      state.quizState.score++;
      sfx.playCorrect();
    } else {
      sfx.playWrong();
    }

    state.quizState.answers.push({
      question: q.question,
      chosenAnswer: isCorrect ? 'Self-graded Correct' : 'Self-graded Missed',
      correctAnswer: q.correctAnswer,
      isCorrect: isCorrect
    });

    advanceQuizQuestion();
  }

  function advanceQuizQuestion() {
    if (state.quizState.currentIndex < state.quizState.questions.length - 1) {
      state.quizState.currentIndex++;
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    state.quizState.active = false;
    el.quizActiveView.classList.add('hidden');
    el.quizResultsView.classList.remove('hidden');

    const total = state.quizState.questions.length;
    const score = state.quizState.score;
    const percentage = Math.round((score / total) * 100);

    el.resultsScorePercentage.textContent = `${percentage}%`;
    el.resultsScoreRatio.textContent = `${score} / ${total} Correct`;
    el.resultsDeckName.textContent = `Deck: ${state.quizState.deckTitle}`;

    if (percentage >= 90) {
      el.resultsTrophyIcon.textContent = '🏆';
      el.resultsGradeTitle.textContent = 'Outstanding Mastery!';
      sfx.playCelebration();
      launchConfetti();
    } else if (percentage >= 70) {
      el.resultsTrophyIcon.textContent = '⭐';
      el.resultsGradeTitle.textContent = 'Great Job! Keep Going!';
      sfx.playCelebration();
      launchConfetti();
    } else {
      el.resultsTrophyIcon.textContent = '💪';
      el.resultsGradeTitle.textContent = 'Good Effort! Practice Makes Perfect!';
      sfx.playCorrect();
    }

    // Populate review list
    el.resultsReviewList.innerHTML = '';
    state.quizState.answers.forEach((ans, i) => {
      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `
        <span class="result-icon">${ans.isCorrect ? '✅' : '❌'}</span>
        <div class="result-text">
          <strong>Q${i + 1}: ${escapeHtml(ans.question)}</strong>
          <span>Your answer: ${escapeHtml(ans.chosenAnswer)}</span>
          ${!ans.isCorrect ? `<br><span style="color: var(--success);">Correct: ${escapeHtml(ans.correctAnswer)}</span>` : ''}
        </div>
      `;
      el.resultsReviewList.appendChild(item);
    });
  }

  // ==========================================================
  // Celebration Confetti Canvas
  // ==========================================================
  function launchConfetti() {
    const canvas = el.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width * 0.5,
        y: canvas.height * 0.4,
        r: Math.random() * 6 + 3,
        dx: (Math.random() - 0.5) * 12,
        dy: (Math.random() - 0.7) * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.08 + 0.05
      });
    }

    let animationFrame;
    let frames = 0;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.3; // gravity
        p.tiltAngle += p.tiltAngleInc;
        p.tilt = Math.sin(p.tiltAngle) * 8;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });

      frames++;
      if (frames < 120) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    cancelAnimationFrame(animationFrame);
    render();
  }

  // ==========================================================
  // Settings & JSON Data Export/Import
  // ==========================================================
  function populateSettingsForm() {
    el.settingFocus.value = state.pomodoro.focusDuration;
    el.settingShortBreak.value = state.pomodoro.shortBreakDuration;
    el.settingLongBreak.value = state.pomodoro.longBreakDuration;
    el.settingCycleCount.value = state.pomodoro.cycleInterval;
    el.settingSoundEnabled.checked = state.pomodoro.soundEnabled;
    el.settingAutoStartBreak.checked = state.pomodoro.autoStartBreak;
  }

  function saveSettingsForm(e) {
    e.preventDefault();
    state.pomodoro.focusDuration = parseInt(el.settingFocus.value, 10) || 25;
    state.pomodoro.shortBreakDuration = parseInt(el.settingShortBreak.value, 10) || 5;
    state.pomodoro.longBreakDuration = parseInt(el.settingLongBreak.value, 10) || 15;
    state.pomodoro.cycleInterval = parseInt(el.settingCycleCount.value, 10) || 4;
    state.pomodoro.soundEnabled = el.settingSoundEnabled.checked;
    state.pomodoro.autoStartBreak = el.settingAutoStartBreak.checked;

    saveState();
    resetTimerToCurrentMode();
    el.settingsDialog.close();
  }

  function exportData() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `studybuddy-backup-${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.decks && Array.isArray(imported.decks)) {
          state.decks = imported.decks;
          if (imported.pomodoro) {
            state.pomodoro = { ...state.pomodoro, ...imported.pomodoro, isRunning: false };
          }
          state.selectedDeckId = state.decks[0].id;
          saveState();
          resetTimerToCurrentMode();
          renderFlashcardsView();
          alert('Study decks successfully imported!');
          el.settingsDialog.close();
        } else {
          alert('Invalid file format: Decks array not found.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  }

  function restoreSampleDecks() {
    if (confirm('Load default starter flashcard decks? Existing decks will be retained.')) {
      DEFAULT_DECKS.forEach(defDeck => {
        if (!state.decks.some(d => d.id === defDeck.id)) {
          state.decks.push(JSON.parse(JSON.stringify(defDeck)));
        }
      });
      saveState();
      renderFlashcardsView();
      alert('Starter decks loaded!');
      el.settingsDialog.close();
    }
  }

  // ==========================================================
  // Event Listeners Binding
  // ==========================================================
  function bindEvents() {
    // Theme toggle
    el.themeToggleBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // Navigation Tabs
    el.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        switchTab(targetId);
      });
    });

    // Pomodoro Controls
    el.modePills.forEach(pill => {
      pill.addEventListener('click', () => {
        state.pomodoro.currentMode = pill.dataset.mode;
        resetTimerToCurrentMode();
      });
    });

    el.timerMainBtn.addEventListener('click', () => {
      if (state.pomodoro.isRunning) pauseTimer();
      else startTimer();
    });

    el.miniTimerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.pomodoro.isRunning) pauseTimer();
      else startTimer();
    });

    el.timerResetBtn.addEventListener('click', resetTimerToCurrentMode);
    el.timerSkipBtn.addEventListener('click', skipTimerSession);

    // Ambient Noise
    el.toggleAmbientBtn.addEventListener('click', () => {
      const isPlaying = sfx.toggleAmbient(sfx.ambientType);
      el.toggleAmbientBtn.textContent = isPlaying ? 'Stop Sound ⏸' : 'Start Sound 🎵';
    });

    el.soundChips.forEach(chip => {
      chip.addEventListener('click', () => {
        el.soundChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        sfx.ambientType = chip.dataset.sound;
        if (sfx.isAmbientPlaying) {
          sfx.stopAmbient();
          sfx.toggleAmbient(sfx.ambientType);
        }
      });
    });

    // Flashcard Interactions
    el.deckSelect.addEventListener('change', (e) => {
      state.selectedDeckId = e.target.value;
      state.flashcardIndex = 0;
      saveState();
      renderFlashcardsView();
    });

    el.activeFlashcard.addEventListener('click', flipFlashcard);
    el.btnCardFlip.addEventListener('click', flipFlashcard);

    el.btnCardMastered.addEventListener('click', () => advanceFlashcard(true));
    el.btnCardReview.addEventListener('click', () => advanceFlashcard(false));
    el.btnShuffleDeck.addEventListener('click', shuffleFlashcards);
    el.btnResetDeckProgress.addEventListener('click', resetDeckMastery);

    el.btnJumpToQuiz.addEventListener('click', () => {
      switchTab('sectionQuiz');
      el.quizDeckSelect.value = state.selectedDeckId;
    });

    // Deck & Card Modals
    el.btnNewDeck.addEventListener('click', () => {
      el.newDeckForm.reset();
      el.newDeckDialog.showModal();
    });
    el.newDeckForm.addEventListener('submit', createNewDeck);

    el.btnAddCard.addEventListener('click', () => openAddCardModal());
    el.btnQuickAddCardFromManage.addEventListener('click', () => openAddCardModal());
    el.cardModalForm.addEventListener('submit', saveCardModal);

    el.btnManageDeck.addEventListener('click', openManageDeckModal);
    el.btnDeleteCurrentDeck.addEventListener('click', deleteCurrentDeck);

    el.manageDeckCardsTbody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-card');
      const deleteBtn = e.target.closest('.btn-delete-card');

      if (editBtn) {
        const cardId = editBtn.dataset.cardId;
        const deck = getCurrentDeck();
        const card = deck.cards.find(c => c.id === cardId);
        if (card) openAddCardModal(card);
      } else if (deleteBtn) {
        const cardId = deleteBtn.dataset.cardId;
        deleteCard(cardId);
      }
    });

    // Quiz Controls
    el.btnStartQuiz.addEventListener('click', startQuiz);
    el.btnNextQuizQuestion.addEventListener('click', advanceQuizQuestion);

    // Self check
    el.btnRevealSelfCheck.addEventListener('click', () => {
      const q = state.quizState.questions[state.quizState.currentIndex];
      el.selfCheckAnswer.textContent = q.correctAnswer;
      el.btnRevealSelfCheck.classList.add('hidden');
      el.btnSelfCheckWrong.classList.remove('hidden');
      el.btnSelfCheckRight.classList.remove('hidden');
    });
    el.btnSelfCheckWrong.addEventListener('click', () => handleSelfCheck(false));
    el.btnSelfCheckRight.addEventListener('click', () => handleSelfCheck(true));

    el.btnRetakeQuiz.addEventListener('click', startQuiz);
    el.btnFinishQuiz.addEventListener('click', () => {
      el.quizResultsView.classList.add('hidden');
      el.quizSetupView.classList.remove('hidden');
      switchTab('sectionFlashcards');
    });

    // Settings Modal
    el.openSettingsBtn.addEventListener('click', () => {
      populateSettingsForm();
      el.settingsDialog.showModal();
    });
    el.settingsForm.addEventListener('submit', saveSettingsForm);
    el.btnExportData.addEventListener('click', exportData);
    el.importDataInput.addEventListener('change', importData);
    el.btnRestoreSampleData.addEventListener('click', restoreSampleDecks);

    // Generic Modal Close Buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dialogId = btn.getAttribute('data-close');
        const dialog = document.getElementById(dialogId);
        if (dialog) dialog.close();
      });
    });

    // Light dismiss on backdrop click for modals
    document.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't trigger if focus is in an input or textarea or modal is open
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
      const isModalOpen = document.querySelector('dialog[open]');

      if (isInput || isModalOpen) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (state.activeTab === 'sectionPomodoro') {
          if (state.pomodoro.isRunning) pauseTimer();
          else startTimer();
        } else if (state.activeTab === 'sectionFlashcards') {
          flipFlashcard();
        }
      } else if (e.code === 'ArrowRight') {
        if (state.activeTab === 'sectionFlashcards') {
          e.preventDefault();
          advanceFlashcard(true);
        }
      } else if (e.code === 'ArrowLeft') {
        if (state.activeTab === 'sectionFlashcards') {
          e.preventDefault();
          advanceFlashcard(false);
        }
      }
    });

    // Notification permission request on first user interaction
    if ('Notification' in window && Notification.permission === 'default') {
      window.addEventListener('click', function reqNotif() {
        Notification.requestPermission();
        window.removeEventListener('click', reqNotif);
      }, { once: true });
    }
  }

  // ==========================================================
  // App Bootstrapper
  // ==========================================================
  function init() {
    loadState();
    applyTheme(state.theme);
    renderFlashcardsView();
    updateTimerDisplay();
    bindEvents();
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
