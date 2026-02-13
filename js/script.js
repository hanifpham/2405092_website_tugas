document.addEventListener('DOMContentLoaded', () => {
  setupLyricsToggle();
  setupAlbumAccordion();
  setupGalleryLightbox();
  setupQuiz();
});

function setupLyricsToggle() {
  const buttons = document.querySelectorAll('.toggle-lyrics');
  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const lyricsBox = document.getElementById(targetId);
      if (!lyricsBox) {
        return;
      }

      const isOpen = lyricsBox.classList.toggle('open');
      button.textContent = isOpen ? 'Hide Lyrics' : 'Show Lyrics';
    });
  });
}

function setupGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) {
    return;
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeButton = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage || !closeButton) {
    return;
  }

  items.forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

function setupAlbumAccordion() {
  const toggles = document.querySelectorAll('.album-toggle');
  if (!toggles.length) {
    return;
  }

  const closeCard = (card) => {
    const button = card.querySelector('.album-toggle');
    const panel = card.querySelector('.album-panel');
    if (!button || !panel) {
      return;
    }

    card.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
  };

  const openCard = (card) => {
    const button = card.querySelector('.album-toggle');
    const panel = card.querySelector('.album-panel');
    if (!button || !panel) {
      return;
    }

    card.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  };

  toggles.forEach((toggle) => {
    const card = toggle.closest('.album-accordion-card');
    const panel = card?.querySelector('.album-panel');
    if (!card || !panel) {
      return;
    }

    toggle.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';

    toggle.addEventListener('click', () => {
      const parentGrid = card.closest('.album-grid');
      const isOpen = card.classList.contains('open');

      if (parentGrid) {
        parentGrid.querySelectorAll('.album-accordion-card.open').forEach((openedCard) => {
          if (openedCard !== card) {
            closeCard(openedCard);
          }
        });
      }

      if (isOpen) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.album-accordion-card.open .album-panel').forEach((panel) => {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });
}

function setupQuiz() {
  const quizRoot = document.getElementById('quizApp');
  if (!quizRoot) {
    return;
  }

  const questions = [
    {
      question: 'Aktivitas sekolah favoritmu?',
      options: [
        { text: 'Bikin club dance mini', bias: 'Hanni' },
        { text: 'Nulis jurnal estetik', bias: 'Minji' },
        { text: 'Ngumpul sambil bercanda', bias: 'Danielle' },
        { text: 'Kerjain project seni', bias: 'Carmen' }
      ]
    },
    {
      question: 'Playlist mood kamu paling sering?',
      options: [
        { text: 'Fresh pop dan upbeat', bias: 'Haerin' },
        { text: 'Dreamy dan chill', bias: 'Yuha' },
        { text: 'Retro Y2K hits', bias: 'Stella' },
        { text: 'Bright summer vibes', bias: 'Hyein' }
      ]
    },
    {
      question: 'Di tongkrongan kamu tipe yang...',
      options: [
        { text: 'Jadi penengah dan tenang', bias: 'Minji' },
        { text: 'Ngelawak spontan', bias: 'Danielle' },
        { text: 'Diem tapi perhatian', bias: 'Haerin' },
        { text: 'Bikin semua jadi semangat', bias: 'Ian' }
      ]
    },
    {
      question: 'Pilih outfit untuk event fandom:',
      options: [
        { text: 'Denim + sneakers klasik', bias: 'Hanni' },
        { text: 'Cardigan pastel dreamy', bias: 'A-na' },
        { text: 'Rok mini + aksesori lucu', bias: 'Ye-on' },
        { text: 'Street chic warna soft', bias: 'Juun' }
      ]
    }
  ];

  const biasDescriptions = {
    Minji: 'Kamu dewasa, kalem, dan bisa diandalkan. Tipe teman yang bikin suasana aman.',
    Hanni: 'Kamu adaptif, ceria, dan penuh energi positif. Semua orang nyaman dekat kamu.',
    Danielle: 'Kamu sosial banget, playful, dan selalu bawa good vibes.',
    Haerin: 'Kamu observatif, artsy, dan punya sisi misterius yang menarik.',
    Hyein: 'Kamu ekspresif, berani coba hal baru, dan punya style standout.',
    Carmen: 'Kamu berani, hangat, dan punya aura panggung yang kuat.',
    Yuha: 'Kamu lembut, dreamy, dan jadi penyejuk di kelompok.',
    Stella: 'Kamu stylish, percaya diri, dan gampang bikin orang nyaman.',
    Juun: 'Kamu enerjik, fokus, dan selalu total di setiap tantangan.',
    'A-na': 'Kamu cerah, playful, dan jadi pusat keceriaan tongkrongan.',
    Ian: 'Kamu cool, ekspresif, dan punya sisi unik yang standout.',
    'Ye-on': 'Kamu manis, penuh semangat, dan cepat akrab dengan orang baru.'
  };

  const progressEl = document.getElementById('quizProgress');
  const countEl = document.getElementById('quizCount');
  const progressFillEl = document.getElementById('quizProgressFill');
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const resultEl = document.getElementById('quizResult');
  const resultNameEl = document.getElementById('quizResultName');
  const resultTextEl = document.getElementById('quizResultText');
  const restartBtn = document.getElementById('quizRestart');
  const biasGroups = {
    Minji: 'NewJeans',
    Hanni: 'NewJeans',
    Danielle: 'NewJeans',
    Haerin: 'NewJeans',
    Hyein: 'NewJeans',
    Carmen: 'Hearts2Hearts',
    Yuha: 'Hearts2Hearts',
    Stella: 'Hearts2Hearts',
    Juun: 'Hearts2Hearts',
    'A-na': 'Hearts2Hearts',
    Ian: 'Hearts2Hearts',
    'Ye-on': 'Hearts2Hearts'
  };

  let index = 0;
  let scores = {};

  function renderQuestion() {
    const item = questions[index];
    const questionNumber = index + 1;
    const progressPercent = (questionNumber / questions.length) * 100;

    progressEl.textContent = `Pertanyaan ${questionNumber}`;
    if (countEl) {
      countEl.textContent = `${questionNumber} / ${questions.length}`;
    }
    if (progressFillEl) {
      progressFillEl.style.width = `${progressPercent}%`;
    }
    questionEl.textContent = item.question;
    optionsEl.innerHTML = '';

    item.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.type = 'button';
      button.innerHTML = `
        <span class="quiz-option-key">${String.fromCharCode(65 + optionIndex)}</span>
        <span class="quiz-option-text">${option.text}</span>
        <span class="quiz-option-arrow">→</span>
      `;
      button.addEventListener('click', () => selectOption(option.bias, button));
      optionsEl.appendChild(button);
    });
  }

  function selectOption(bias, button) {
    if (optionsEl.dataset.locked === 'true') {
      return;
    }

    optionsEl.dataset.locked = 'true';
    button?.classList.add('is-picked');

    window.setTimeout(() => {
      scores[bias] = (scores[bias] || 0) + 1;
      index += 1;
      optionsEl.dataset.locked = 'false';

      if (index < questions.length) {
        renderQuestion();
        return;
      }

      showResult();
    }, 170);
  }

  function showResult() {
    const [bestBias] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0] || ['Minji'];
    const biasGroup = biasGroups[bestBias] || '';

    questionEl.textContent = 'Hasil Bias Quiz Kamu';
    progressEl.textContent = 'Selesai!';
    if (countEl) {
      countEl.textContent = `${questions.length} / ${questions.length}`;
    }
    if (progressFillEl) {
      progressFillEl.style.width = '100%';
    }
    optionsEl.innerHTML = '';
    if (resultNameEl) {
      resultNameEl.textContent = biasGroup ? `${bestBias} • ${biasGroup}` : bestBias;
    }
    resultTextEl.textContent = biasDescriptions[bestBias] || '';
    resultEl.classList.remove('is-newjeans', 'is-h2h');
    if (biasGroup === 'NewJeans') {
      resultEl.classList.add('is-newjeans');
    } else if (biasGroup === 'Hearts2Hearts') {
      resultEl.classList.add('is-h2h');
    }
    resultEl.classList.add('open');
  }

  restartBtn?.addEventListener('click', () => {
    index = 0;
    scores = {};
    resultEl.classList.remove('open', 'is-newjeans', 'is-h2h');
    optionsEl.dataset.locked = 'false';
    renderQuestion();
  });

  renderQuestion();
}
