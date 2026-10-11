(() => {
  const section = document.querySelector('.studio-journal');
  if (!section) return;
  const stage = section.querySelector('.studio-stage');
  const scenes = [...section.querySelectorAll('.studio-scene')];
  const selectors = [...section.querySelectorAll('[data-studio-select]')];
  const play = section.querySelector('.studio-play');
  const modal = document.querySelector('.studio-dialog');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const cursor = stage.querySelector('.studio-drag-cursor');
  let current = 0;
  let userPaused = true;
  let inView = false;
  let hovered = false;
  let focused = false;
  let timer;
  let drag;
  let suppressClick = false;
  let opener;
  const number = (value) => String(value + 1).padStart(2, '0');

  function schedule() {
    clearTimeout(timer);
    const playing = !userPaused && inView && !hovered && !focused && !document.hidden && !modal.open;
    section.dataset.playing = String(playing);
    play.setAttribute('aria-label', userPaused ? 'Play studio journal' : 'Pause studio journal');
    play.firstElementChild.textContent = userPaused ? '▷' : 'Ⅱ';
    play.querySelector('.studio-play-label').textContent = userPaused ? 'Play' : 'Pause';
    if (playing) timer = setTimeout(() => select(current + 1, false), 6500);
  }

  function select(index, manual = true) {
    const next = (index + scenes.length) % scenes.length;
    const direction = index > current ? 1 : -1;
    if (manual) userPaused = true;
    if (next !== current) {
      // Stage the incoming layers before starting their parallax transition.
      scenes[next].style.setProperty('--direction', String(direction));
      void scenes[next].offsetWidth;
      scenes[current].style.setProperty('--direction', String(-direction));
      if (scenes[current].contains(document.activeElement)) stage.focus({ preventScroll: true });
      current = next;
    }
    scenes.forEach((scene, index) => {
      const active = index === current;
      scene.classList.toggle('is-active', active);
      scene.inert = !active;
      if (active) scene.removeAttribute('aria-hidden');
      else scene.setAttribute('aria-hidden', 'true');
    });
    selectors.forEach((button, index) => {
      if (index === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    const navigation = section.querySelector('.studio-chapters');
    const chosen = selectors[current];
    const left = chosen.offsetLeft - navigation.offsetLeft;
    if (left < navigation.scrollLeft || left + chosen.offsetWidth > navigation.scrollLeft + navigation.clientWidth) {
      navigation.scrollTo({ left: left - (navigation.clientWidth - chosen.offsetWidth) / 2, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    section.querySelector('.studio-count strong').textContent = number(current);
    section.querySelector('.studio-progress>span').style.width = `${(current + 1) / scenes.length * 100}%`;
    if (manual) section.querySelector('.studio-announcement').textContent = `${number(current)} of 07. ${scenes[current].dataset.name}. ${scenes[current].querySelector('.studio-copy p').textContent}`;
    schedule();
  }

  selectors.forEach((button, index) => button.addEventListener('click', () => select(index)));
  section.querySelector('.studio-prev').addEventListener('click', () => select(current - 1));
  section.querySelector('.studio-next').addEventListener('click', () => select(current + 1));
  play.addEventListener('click', () => {
    userPaused = !userPaused;
    // An explicit Play action overrides the current hover and keyboard focus.
    if (!userPaused) { hovered = false; focused = false; }
    schedule();
  });
  stage.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    select(event.key === 'Home' ? 0 : event.key === 'End' ? scenes.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  });

  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a')) return;
    drag = { x: event.clientX, y: event.clientY, id: event.pointerId, horizontal: false };
    suppressClick = false;
  });
  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' && !motion.matches) {
      const bounds = stage.getBoundingClientRect();
      cursor.style.left = `${event.clientX - bounds.left}px`;
      cursor.style.top = `${event.clientY - bounds.top}px`;
      stage.classList.toggle('has-pointer', !event.target.closest('button, a'));
    }
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.horizontal && Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
    if (Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      drag.horizontal = true;
      stage.classList.add('is-dragging');
      if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
    }
  });
  function finishDrag(event) {
    if (drag?.id === event.pointerId) {
      const dx = event.clientX - drag.x;
      if (drag.horizontal && Math.abs(dx) > 45) { select(current + (dx < 0 ? 1 : -1)); suppressClick = true; }
    }
    drag = null;
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  }
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', () => { drag = null; stage.classList.remove('is-dragging'); });
  stage.addEventListener('pointerleave', () => { stage.classList.remove('has-pointer'); if (!stage.classList.contains('is-dragging')) drag = null; });
  stage.addEventListener('click', (event) => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; } }, true);

  scenes.forEach((scene) => scene.querySelector('.studio-open').addEventListener('click', (event) => {
    opener = event.currentTarget;
    userPaused = true;
    const picture = scene.querySelector('.studio-photo-main');
    modal.querySelector('.studio-art').style.cssText = picture.querySelector('.studio-art').style.cssText;
    modal.querySelector('.studio-dialog-photo').setAttribute('aria-label', picture.getAttribute('aria-label'));
    modal.querySelector('#studio-dialog-title').textContent = scene.dataset.name;
    modal.querySelector('#studio-dialog-description').textContent = scene.dataset.detail;
    modal.querySelector('.studio-dialog-number').textContent = number(current);
    modal.querySelector('.studio-dialog-materials').textContent = scene.querySelector('.studio-materials').textContent;
    modal.showModal();
    document.body.classList.add('modal-open');
    stage.classList.remove('has-pointer');
    schedule();
  }));
  modal.querySelectorAll('.studio-dialog-close, .studio-dialog-return').forEach((button) => button.addEventListener('click', () => modal.close()));
  modal.addEventListener('click', (event) => {
    const bounds = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
  });
  modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({ preventScroll: true }); schedule(); });
  const experience = section.querySelector('.studio-experience');
  experience.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
  experience.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  experience.addEventListener('focusin', () => { focused = true; schedule(); });
  experience.addEventListener('focusout', (event) => { focused = experience.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  let resizeFrame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => select(current, false));
  });
  motion.addEventListener('change', () => { if (motion.matches) { userPaused = true; stage.classList.remove('has-pointer'); } schedule(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); }, { threshold: 0.25 }).observe(stage);
  select(0, false);
})();
