document.getElementById('year').textContent = new Date().getFullYear();

/* Header on scroll */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el) => io.observe(el));

/* Count-up on hero stats */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const countEls = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const pad = parseInt(el.dataset.pad || '0', 10);
  if (prefersReducedMotion) {
    el.textContent = String(target).padStart(pad, '0') + suffix;
    return;
  }
  const duration = 1100;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = String(value).padStart(pad, '0') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const countIo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
countEls.forEach((el) => countIo.observe(el));

/* Subtle mouse parallax on the hero dot-grid (arcs already have their own
   ambient drift animation, so this targets the grid to avoid fighting it) */
const heroSection = document.querySelector('.hero');
const heroDotGrid = heroSection?.querySelector('.dot-grid');
if (heroSection && heroDotGrid && !prefersReducedMotion) {
  heroSection.addEventListener('pointermove', (e) => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    heroDotGrid.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });
  heroSection.addEventListener('pointerleave', () => {
    heroDotGrid.style.transform = '';
  });
}

/* FAQ accordion */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-question').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
