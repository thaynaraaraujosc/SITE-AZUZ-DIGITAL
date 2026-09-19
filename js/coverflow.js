(() => {
  const track = document.getElementById('coverflow-track');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.coverflow-card'));
  const count = cards.length;
  const captionTitle = document.getElementById('coverflow-caption-title');
  const captionSub = document.getElementById('coverflow-caption-sub');
  const goBtn = document.getElementById('coverflow-go');
  const prevBtn = document.getElementById('coverflow-prev');
  const nextBtn = document.getElementById('coverflow-next');

  const ROTATE = 46;
  const DEPTH = 0.62;
  const FALLOFF = 0.6;
  const FADE = 0.32;
  const GAP = 0.62;

  let pos = 0;
  let target = 0;
  let width = 0;
  let rafId = null;
  let selected = 0;

  const indexAt = (p) => ((Math.round(p) % count) + count) % count;

  const updateCaption = () => {
    const card = cards[selected];
    captionTitle.textContent = card.querySelector('h3').textContent;
    captionSub.textContent = card.querySelector('p').textContent;
    goBtn.setAttribute('href', card.getAttribute('href'));
  };

  const paint = () => {
    if (!width) return;
    const pitch = width * (1 + GAP);

    cards.forEach((card, index) => {
      let offset = index - pos;
      offset = ((offset % count) + count) % count;
      if (offset > count / 2) offset -= count;

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, FALLOFF);
      const tilt = Math.min(ROTATE * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-DEPTH * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = Math.min(1, Math.max(0, count / 2 - distance));
      card.style.opacity = String(Math.max(0.15, 1 - FADE * distance) * (distance < count / 2 ? 1 : edge || 1));
      card.style.zIndex = String(100 - Math.round(distance));
      card.style.pointerEvents = distance < 0.5 ? 'auto' : 'auto';
    });
  };

  const settle = (nextTarget) => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    target = nextTarget;
    const newSelected = indexAt(target);
    if (newSelected !== selected) {
      selected = newSelected;
      updateCaption();
    }
    const step = () => {
      const remaining = target - pos;
      if (Math.abs(remaining) < 0.001) {
        pos = target;
        paint();
        rafId = null;
        return;
      }
      pos += remaining * 0.18;
      paint();
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  };

  const goTo = (index) => {
    const shifted = index + Math.round((target - index) / count) * count;
    settle(shifted);
  };

  const nudge = (by) => settle(Math.round(target) + by);

  // Measure card width
  const measure = () => {
    width = cards[0].offsetWidth;
    paint();
  };
  measure();
  new ResizeObserver(measure).observe(track);

  // Click a card: if it's already centered, follow the link; otherwise
  // bring it to center first so a stray tap while browsing doesn't navigate.
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (index !== selected) {
        e.preventDefault();
        goTo(index);
      }
    });
  });

  prevBtn.addEventListener('click', () => nudge(-1));
  nextBtn.addEventListener('click', () => nudge(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
  });

  // Drag / swipe
  let drag = null;
  track.addEventListener('pointerdown', (e) => {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    track.setPointerCapture(e.pointerId);
    target = pos;
    drag = { id: e.pointerId, x: e.clientX, startPos: pos, moved: false };
  });
  track.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId || !width) return;
    const pitch = width * (1 + GAP);
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 4) drag.moved = true;
    pos = drag.startPos - dx / pitch;
    const newSelected = indexAt(pos);
    if (newSelected !== selected) { selected = newSelected; updateCaption(); }
    paint();
  });
  const endDrag = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const wasDrag = drag.moved;
    drag = null;
    settle(Math.round(pos));
    if (wasDrag) {
      // Swallow the click that follows a real drag so it doesn't navigate.
      const suppress = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
      track.addEventListener('click', suppress, { capture: true, once: true });
    }
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  updateCaption();
})();
