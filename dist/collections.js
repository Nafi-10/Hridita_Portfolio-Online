(() => {
  const section = document.querySelector('.collections');
  const looks = window.collectionLooks;
  if (!section || !looks?.length) return;
  const gallery = section.querySelector('.collection-gallery');
  const scenes = [...section.querySelectorAll('.collection-scene')];
  const dots = [...section.querySelectorAll('[data-select-look]')];
  const playButton = section.querySelector('.runway-play');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 7500;
  const transitionDuration = 480;
  const number = (index) => String(index + 1).padStart(2, '0');
  let active = 0;
  let userPaused = motion.matches;
  let inView = false;
  let focusWithin = false;
  let transitioning = false;
  let queued;
  let timer;
  let transitionTimer;
  let progress;
  let pointerStart;
  let suppressClick = false;

  function schedule() {
    clearTimeout(timer);
    progress?.cancel();
    const playing = !userPaused && inView && !focusWithin && !pointerStart && !transitioning && !document.hidden;
    playButton.setAttribute('aria-label', userPaused ? 'Play collection slideshow' : 'Pause collection slideshow');
    section.querySelector('.play-symbol').textContent = userPaused ? '▷' : 'Ⅱ';
    section.querySelector('.play-label').textContent = userPaused ? 'Play' : 'Pause';
    section.dataset.playing = String(playing);
    if (!playing) return;
    if (!motion.matches) progress = dots[active].querySelector('span').animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: interval, easing: 'linear' }
    );
    timer = setTimeout(() => select(active + 1, false), interval);
  }

  function finishTransition() {
    clearTimeout(transitionTimer);
    scenes.forEach(scene => scene.classList.remove('is-exiting'));
    transitioning = false;
    section.dataset.transitioning = 'false';
    if (queued !== undefined) {
      const next = queued;
      queued = undefined;
      select(next);
    } else schedule();
  }

  function select(index, manual = true) {
    const next = (index + looks.length) % looks.length;
    if (transitioning) { queued = next; return; }
    if (next === active) { schedule(); return; }
    const previous = scenes[active];
    if (previous.contains(document.activeElement)) gallery.focus({ preventScroll: true });
    previous.classList.remove('is-active');
    previous.classList.add('is-exiting');
    previous.setAttribute('aria-hidden', 'true');
    previous.inert = true;
    active = next;
    scenes[active].classList.add('is-active');
    scenes[active].setAttribute('aria-hidden', 'false');
    scenes[active].inert = false;
    dots.forEach((dot, i) => {
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    section.querySelector('.current-look').textContent = number(active);
    if (manual) section.querySelector('.runway-announcement').textContent = `Look ${number(active)} of ${looks.length}. ${looks[active].name}. ${looks[active].summary}`;
    transitioning = !motion.matches;
    section.dataset.transitioning = String(transitioning);
    schedule();
    if (transitioning) transitionTimer = setTimeout(finishTransition, transitionDuration);
    else finishTransition();
  }

  // Real links support browser Back and opening a look in another tab.
  // A swipe or an unfinished transition must not accidentally open a page.
  section.querySelectorAll('[data-open-look]').forEach(link => link.addEventListener('click', event => {
    if (suppressClick || transitioning) event.preventDefault();
  }));
  dots.forEach(dot => dot.addEventListener('click', () => select(Number(dot.dataset.selectLook))));
  section.querySelector('.runway-next').addEventListener('click', () => select((queued ?? active) + 1));
  section.querySelector('.runway-previous').addEventListener('click', () => select((queued ?? active) - 1));
  playButton.addEventListener('click', () => {
    userPaused = !userPaused;
    if (!userPaused) focusWithin = false;
    schedule();
  });
  section.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(looks.length - 1);
    else select((queued ?? active) + (event.key === 'ArrowRight' ? 1 : -1));
  });

  // Deliberate horizontal drags navigate; vertical touch scrolling stays native.
  gallery.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || transitioning) return;
    pointerStart = { id:event.pointerId, x:event.clientX, y:event.clientY };
    suppressClick = false;
    schedule();
  });
  gallery.addEventListener('pointermove', event => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 16 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      gallery.classList.add('is-dragging');
      suppressClick = true;
      gallery.setPointerCapture(event.pointerId);
    }
  });
  gallery.addEventListener('pointerup', event => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = undefined;
    gallery.classList.remove('is-dragging');
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) select(active + (dx < 0 ? 1 : -1));
    schedule();
    setTimeout(() => { suppressClick = false; }, 0);
  });
  gallery.addEventListener('pointercancel', () => {
    pointerStart = undefined;
    suppressClick = false;
    gallery.classList.remove('is-dragging');
    schedule();
  });
  gallery.addEventListener('pointerleave', () => {
    if (pointerStart && !gallery.classList.contains('is-dragging')) { pointerStart = undefined; schedule(); }
  });
  gallery.addEventListener('dragstart', event => event.preventDefault());

  section.addEventListener('focusin', event => {
    focusWithin = event.target.matches(':focus-visible') && !playButton.contains(event.target);
    schedule();
  });
  section.addEventListener('focusout', () => queueMicrotask(() => {
    focusWithin = section.contains(document.activeElement) && document.activeElement.matches(':focus-visible') && !playButton.contains(document.activeElement);
    schedule();
  }));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => {
    if (motion.matches) { userPaused = true; finishTransition(); }
    schedule();
  });
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); }, { threshold:0.25 }).observe(gallery);
  window.addEventListener('pageshow', schedule);
  schedule();
})();
