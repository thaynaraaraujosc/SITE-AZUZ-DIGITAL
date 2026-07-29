const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header on scroll */
const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if (navToggle && mainNav) {
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
}

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const revealIo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el) => revealIo.observe(el));

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

/* Números dinâmicos (contadores) */
const counters = document.querySelectorAll('.stat-counter');
const formatCounter = (el, value) => {
  const pad = el.dataset.pad ? Number(el.dataset.pad) : 0;
  const suffix = el.dataset.suffix || '';
  const num = pad ? String(value).padStart(pad, '0') : String(value);
  el.textContent = num + suffix;
};

const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  if (prefersReducedMotion) {
    formatCounter(el, target);
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    formatCounter(el, Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (counters.length) {
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => counterIo.observe(el));
}

/* CTA fixa mobile: aparece depois do hero */
const stickyCta = document.getElementById('mobile-sticky-cta');
const heroSection = document.querySelector('.hero');
if (stickyCta && heroSection) {
  const stickyIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });
  stickyIo.observe(heroSection);
}
