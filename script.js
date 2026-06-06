// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.nav__burger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// How-we-work tab switcher
function switchTab(tab, btn) {
  document.querySelectorAll('.how__tab').forEach(t => t.classList.remove('how__tab--active'));
  btn.classList.add('how__tab--active');

  document.getElementById('tab-mass').classList.toggle('how__steps--hidden', tab !== 'mass');
  document.getElementById('tab-targeted').classList.toggle('how__steps--hidden', tab !== 'targeted');
}

// Contact form submit (demo)
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Отправляем...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
    e.target.reset();
    document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1200);
}

// Intersection observer — fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .step, .why__point, .stats-item, .review-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
