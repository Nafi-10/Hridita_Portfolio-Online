(() => {
  const section = document.querySelector('.collections');
  const track = section.querySelector('.runway-track');
  const models = [...section.querySelectorAll('.runway-model')];
  const dots = [...section.querySelectorAll('[data-select-look]')];
  const details = section.querySelector('.look-details');
  const modal = document.querySelector('.collection-dialog');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 680px)');
  const playButton = section.querySelector('.runway-play');
  const slotNames = ['active', 'near', 'middle', 'far', 'distant', 'next'];
  const interval = 4200;
  const looks = [
    { name: 'Quiet structure', category: 'Tailoring / Outerwear', summary: 'An oversized trench, drawn together at the waist.', detail: 'The belted silhouette', description: 'An illustrative study of oversized tailoring. A long, softly structured trench is cinched at the waist, balancing volume with a defined silhouette and dark boots.', focus: 'Volume, proportion, and a defined waist', palette: 'Sand / warm beige / black', sheet: 'looks-01-03.png', cell: 0 },
    { name: 'A softer rhythm', category: 'Draping / Movement', summary: 'Airy pleats and a sculptural tie in shades of blue.', detail: 'Pleats in motion', description: 'An illustrative exploration of movement through fine pleats. A crisp blue shirt meets a fluid silver-blue skirt, with a deep navy tie creating a strong focal point at the waist.', focus: 'Fine pleats and asymmetric draping', palette: 'Powder blue / silver / navy', sheet: 'looks-01-03.png', cell: 1 },
    { name: 'The sculpted line', category: 'Structure / Contrast', summary: 'Sculptural ruffles above a clean, elongated line.', detail: 'Sculpted shoulders', description: 'An illustrative contrast between expressive volume and quiet tailoring. A dramatic black ruffled top frames the shoulders, paired with ivory wide-leg trousers for an elongated silhouette.', focus: 'Shoulder volume and proportion', palette: 'Black / ivory / warm nude', sheet: 'looks-01-03.png', cell: 2 },
    { name: 'In the fold', category: 'Draping / Tailoring', summary: 'Soft folds, an asymmetric sleeve, and grounded tailoring.', detail: 'An asymmetric drape', description: 'An illustrative study of a flowing, asymmetric blouse against the precision of tailored trousers. The elongated drape creates movement through an otherwise restrained silhouette.', focus: 'Asymmetry and fluid folds', palette: 'Oyster / cream / charcoal', sheet: 'looks-04-06.png', cell: 0 },
    { name: 'Rose in motion', category: 'Colour / Movement', summary: 'A tonal conversation between blush and burgundy.', detail: 'A tonal pleat study', description: 'An illustrative pairing of a relaxed blouse and sweeping pleated trousers. Soft rose tones meet a deeper burgundy, with the fullness of the silhouette giving the look an easy sense of movement.', focus: 'Tonal colour and soft volume', palette: 'Blush / dusty rose / burgundy', sheet: 'looks-04-06.png', cell: 1 },
    { name: 'Earthbound', category: 'Texture / Form', summary: 'Layered folds and a natural, sculptural silhouette.', detail: 'Layered texture', description: 'An illustrative exploration of an earthy monochrome silhouette. Layered, linen-like panels and a wide fabric tie create depth through texture, folds, and an asymmetric hem.', focus: 'Layering, texture, and a wrapped form', palette: 'Espresso / cocoa / dark brown', sheet: 'looks-04-06.png', cell: 2 },
  ];
  let active = 0;
  let userPaused = motion.matches;
  let inView = false;
  let hovered = false;
  let focusWithin = false;
  let timer;
  let progress;
  let modalOpener;
  let pointerStart;
  let suppressClick = false;
  const number = (index) => String(index + 1).padStart(2, '0');

  function applyLook(element, look) {
    element.style.setProperty('--look-sheet', `url('./assets/collections/${look.sheet}')`);
    element.style.setProperty('--look-cell', String(look.cell));
  }

  function schedule() {
    clearTimeout(timer);
    progress?.cancel();
    const playing = !userPaused && inView && !hovered && !focusWithin && !document.hidden && !modal.open;
    playButton.setAttribute('aria-label', userPaused ? 'Play runway autoplay' : 'Pause runway autoplay');
    section.querySelector('.play-symbol').textContent = userPaused ? '▷' : 'Ⅱ';
    section.querySelector('.play-label').textContent = userPaused ? 'Play' : 'Pause';
    section.dataset.playing = String(playing);
    if (!playing) return;
    if (!motion.matches) progress = dots[active].querySelector('span').animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: interval, easing: 'linear' }
    );
    timer = setTimeout(() => select(active + 1, false), interval);
  }

  function select(index, manual = true) {
    active = (index + looks.length) % looks.length;
    if (manual) userPaused = true;
    const look = looks[active];
    models.forEach((model, index) => {
      const slot = slotNames[(active - index + looks.length) % looks.length];
      const offstage = slot === 'next' || (compact.matches && ['far', 'distant'].includes(slot));
      model.dataset.slot = slot;
      model.setAttribute('aria-hidden', String(offstage));
      model.tabIndex = offstage ? -1 : 0;
      if (offstage && document.activeElement === model) track.focus({ preventScroll: true });
      model.setAttribute('aria-label', `${index === active ? 'Open' : 'View'} look ${number(index)}: ${looks[index].name}`);
    });
    dots.forEach((dot, index) => {
      if (index === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    applyLook(details, look);
    details.querySelector('.detail-number').textContent = `${number(active)} / 06`;
    details.querySelector('.look-category').textContent = look.category;
    details.querySelector('.look-name').textContent = look.name;
    details.querySelector('.look-summary').textContent = look.summary;
    details.querySelector('.look-detail-label').textContent = look.detail;
    section.querySelector('.current-look').textContent = number(active);
    if (manual) section.querySelector('.runway-announcement').textContent = `Look ${number(active)} of 06. ${look.name}. ${look.summary}`;
    schedule();
  }

  function openLook(opener) {
    const look = looks[active];
    userPaused = true;
    modalOpener = opener;
    applyLook(modal.querySelector('.collection-dialog-image'), look);
    modal.querySelector('.dialog-look-number').textContent = `Look ${number(active)}`;
    modal.querySelector('#collection-dialog-title').textContent = look.name;
    modal.querySelector('#collection-dialog-description').textContent = look.description;
    modal.querySelector('.dialog-look-focus').textContent = look.focus;
    modal.querySelector('.dialog-look-palette').textContent = look.palette;
    modal.showModal();
    document.body.classList.add('modal-open');
    schedule();
  }

  models.forEach((model, index) => model.addEventListener('click', () => {
    if (suppressClick) return;
    if (index === active) openLook(model);
    else select(index);
  }));
  dots.forEach((dot) => dot.addEventListener('click', () => select(Number(dot.dataset.selectLook))));
  section.querySelector('.runway-next').addEventListener('click', () => select(active + 1));
  section.querySelector('.runway-previous').addEventListener('click', () => select(active - 1));
  playButton.addEventListener('click', () => {
    userPaused = !userPaused;
    // An explicit Play request takes precedence over the button's current
    // hover/focus. Later pointer or focus entry pauses the runway normally.
    if (!userPaused) { hovered = false; focusWithin = false; }
    schedule();
  });
  section.querySelectorAll('.look-open, .detail-photo-main').forEach((button) => button.addEventListener('click', () => openLook(button)));
  section.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    select(active + (event.key === 'ArrowRight' ? 1 : -1));
  });

  // Pointer input only handles deliberate horizontal gestures; vertical page
  // scrolling remains native. A completed swipe cannot also open a look.
  track.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    suppressClick = false;
  });
  track.addEventListener('pointermove', (event) => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 16 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      track.classList.add('is-dragging');
      suppressClick = true;
      track.setPointerCapture(event.pointerId);
    }
  });
  track.addEventListener('pointerup', (event) => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) select(active + (dx < 0 ? 1 : -1));
    pointerStart = undefined;
    track.classList.remove('is-dragging');
    setTimeout(() => { suppressClick = false; }, 0);
  });
  track.addEventListener('pointercancel', () => {
    pointerStart = undefined;
    suppressClick = false;
    track.classList.remove('is-dragging');
  });

  section.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
  section.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  section.addEventListener('focusin', () => { focusWithin = true; schedule(); });
  section.addEventListener('focusout', () => queueMicrotask(() => { focusWithin = section.contains(document.activeElement); schedule(); }));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { if (motion.matches) userPaused = true; schedule(); });
  compact.addEventListener('change', () => select(active, false));
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); }, { threshold: 0.3 }).observe(section);

  modal.querySelectorAll('.collection-dialog-close, .collection-dialog-back').forEach((button) => button.addEventListener('click', () => modal.close()));
  modal.addEventListener('click', (event) => {
    const bounds = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    modalOpener?.focus();
    schedule();
  });
  select(0, false);
})();
