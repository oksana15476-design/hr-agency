/* ============================================================
   RECRUITPRO 2026 — GSAP + ScrollTrigger + Lenis
   ============================================================ */

window.addEventListener('load', () => {
  initLenis();
  initGSAP();
  initNav();
  initForm();
});

/* ── LENIS smooth scroll ──────────────────────────────────── */
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

/* ── GSAP animations ──────────────────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* — Hero entrance — */
  const tl = gsap.timeline({ delay: 0.1 });

  // Title lines slide up from clip
  document.querySelectorAll('.tline__inner').forEach((el, i) => {
    tl.from(el, { y: '115%', duration: 1, ease: 'power4.out' }, i * 0.12);
  });

  // Chip, sub, cta, proof fade up
  tl.from('#heroChip', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.05);
  tl.from('#heroSub',  { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.38);
  tl.from('#heroCta',  { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.52);
  tl.from('#heroProof',{ y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0.64);

  // Hero visual cards
  tl.from('#heroRight', { opacity: 0, x: 40, duration: 1, ease: 'power3.out' }, 0.3);
  tl.from('.fcard', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, 0.6);

  /* — Scroll reveals — */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Section headings — stagger children
  document.querySelectorAll('.section-head').forEach(sec => {
    gsap.fromTo(Array.from(sec.children),
      { y: 28, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // Service cards stagger
  gsap.fromTo('.svc-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.16,
      scrollTrigger: { trigger: '.svc-grid', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Process steps stagger
  gsap.fromTo('.pstep',
    { y: 36, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.14,
      scrollTrigger: { trigger: '.process__steps', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Process line draw
  gsap.to('#pline', {
    width: '100%', duration: 1.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#psteps', start: 'top 72%', toggleActions: 'play none none none' }
  });

  // Stat cards stagger
  gsap.fromTo('.stat-card',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.about__right', start: 'top 82%', toggleActions: 'play none none none' }
    }
  );

  /* — Counters — */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.to(el, {
      innerText: target, duration: 2.2, ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  /* — Contact children stagger — */
  gsap.fromTo('.contact__left > *',
    { x: -24, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.contact__inner', start: 'top 82%', toggleActions: 'play none none none' }
    }
  );

  /* — Floating cards subtle parallax — */
  gsap.to('.fcard--hired', {
    y: '-=20', ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
  gsap.to('.fcard--search', {
    y: '+=15', ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
  });
}

/* ── NAV ──────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) drawer.classList.remove('open');
  });
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
}

/* ── FORM ─────────────────────────────────────────────────── */
function initForm() {}

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.textContent = 'Отправляем...';
  setTimeout(() => {
    success.style.display = 'block';
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = 'Отправить заявку';
    e.target.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1400);
}
