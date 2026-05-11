(() => {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  function show(id) {
    btns.forEach(b => b.classList.toggle('is-active', b.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('is-active', p.id === `tab-${id}`));
    history.replaceState(null, '', '#' + id);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setupCurrentObserver();
  }

  btns.forEach(btn => btn.addEventListener('click', () => show(btn.dataset.tab)));

  const hash = location.hash.slice(1);
  const ids = [...btns].map(b => b.dataset.tab);
  show(ids.includes(hash) ? hash : ids[0]);

  // Quiz interactions
  document.querySelectorAll('.quiz').forEach(quiz => {
    const answer = quiz.dataset.answer;
    const explanation = quiz.querySelector('.quiz-explanation');
    quiz.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quiz.dataset.answered) return;
        quiz.dataset.answered = '1';
        quiz.querySelectorAll('.quiz-option').forEach(b => {
          b.disabled = true;
          if (b.dataset.value === answer) b.classList.add('correct');
          else if (b === btn) b.classList.add('incorrect');
        });
        if (explanation) explanation.hidden = false;
      });
    });
  });

  // Smooth side-nav scrolling
  document.querySelectorAll('.tab-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight current heading in side nav
  let currentObserver = null;
  function setupCurrentObserver() {
    if (currentObserver) currentObserver.disconnect();
    const active = document.querySelector('.tab-panel.is-active');
    if (!active) return;
    const links = active.querySelectorAll('.tab-nav a[href^="#"]');
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) map.set(el, a);
    });
    if (!map.size) return;
    currentObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const a = map.get(en.target);
        if (!a) return;
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove('is-current'));
          a.classList.add('is-current');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    map.forEach((_, el) => currentObserver.observe(el));
  }
})();
