// =========================================================
// Alvic Design — интерактив шаблона сайта
// =========================================================

// --- Мобильное меню ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('is-open');
  nav.classList.toggle('is-open');
});

// Закрываем меню при клике на пункт
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
  });
});

// --- Шапка: прячем при скролле вниз, показываем при скролле вверх ---
const header = document.getElementById('header');
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 200 && !nav.classList.contains('is-open')) {
    header.classList.add('is-hidden');
  } else {
    header.classList.remove('is-hidden');
  }
  lastY = y;
}, { passive: true });

// --- Появление блоков при скролле ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- FAQ: открывается только один вопрос за раз ---
const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});
