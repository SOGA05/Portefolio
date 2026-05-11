/* ══════════════════════════════════════════
   PORTFOLIO // CYBERPUNK 2077 EDGERUNNER
   script.js — Effets & interactions
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. CUSTOM CURSOR
  // ─────────────────────────────────────────
  const cursorOuter = document.getElementById('cursorOuter');
  const cursorInner = document.getElementById('cursorInner');
  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top  = mouseY + 'px';
  });

  // Smooth outer cursor follow
  function animateCursor() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    cursorOuter.style.left = outerX + 'px';
    cursorOuter.style.top  = outerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();


  // ─────────────────────────────────────────
  // 2. HORLOGE NAV EN TEMPS RÉEL
  // ─────────────────────────────────────────
  const navTime = document.getElementById('navTime');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    navTime.textContent = `${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);


  // ─────────────────────────────────────────
  // 3. NAV SCROLL SHRINK + ACTIVE LINK
  // ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Shrink nav
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--cyan)' : '';
    });
  });


  // ─────────────────────────────────────────
  // 4. TYPEWRITER EFFECT — HERO SUBTITLE
  // ─────────────────────────────────────────
  const phrases = [
    'Technicien Réseaux & Systèmes',
    'Étudiant BTS SIO SISR — Nantes',
    'Réparation & Dépannage Informatique',
    'Futur Ingénieur Réseau',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typedText');

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // pause before delete
        return;
      }
    } else {
      typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeWriter, isDeleting ? 50 : 100);
  }
  setTimeout(typeWriter, 800);


  // ─────────────────────────────────────────
  // 5. COMPTEUR STATS (HERO)
  // ─────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // Trigger on scroll into view
  const statVals = document.querySelectorAll('.stat-val[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statVals.forEach(el => statsObserver.observe(el));


  // ─────────────────────────────────────────
  // 6. SCROLL REVEAL
  // ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────
  // 7. XP BARS ANIMATION ON REVEAL
  // ─────────────────────────────────────────
  const xpFills = document.querySelectorAll('.xp-fill');
  const xpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.style.getPropertyValue('--w');
        entry.target.style.width = w;
        xpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  xpFills.forEach(el => xpObserver.observe(el));


  // ─────────────────────────────────────────
  // 8. GLITCH EFFECT — ALÉATOIRE
  // ─────────────────────────────────────────
  const glitchOverlay = document.getElementById('glitchOverlay');
  const glitchTitles  = document.querySelectorAll('.title-line');

  function triggerGlitch() {
    // Flash overlay
    glitchOverlay.classList.add('active');
    setTimeout(() => glitchOverlay.classList.remove('active'), 200);

    // Glitch one title letter
    glitchTitles.forEach(el => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 150);
    });

    // Schedule next
    const next = 3000 + Math.random() * 7000;
    setTimeout(triggerGlitch, next);
  }
  setTimeout(triggerGlitch, 4000);


  // ─────────────────────────────────────────
  // 9. SKILL CARDS — EFFET HOVER PARALLAX
  // ─────────────────────────────────────────
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });


  // ─────────────────────────────────────────
  // 10. PROJECT CARDS — HOVER SCANLINE
  // ─────────────────────────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--yellow), transparent);
      opacity: 0;
      pointer-events: none;
      top: 0;
      transition: opacity .2s;
    `;
    card.appendChild(line);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const y = e.clientY - rect.top;
      line.style.top   = y + 'px';
      line.style.opacity = '0.6';
    });
    card.addEventListener('mouseleave', () => {
      line.style.opacity = '0';
    });
  });


  // ─────────────────────────────────────────
  // 11. EASTER EGG — KONAMI CODE
  // ─────────────────────────────────────────
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        showEasterEgg();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function showEasterEgg() {
    const msg = document.createElement('div');
    msg.innerHTML = `
      <div style="
        position:fixed; inset:0; z-index:9000;
        display:flex; align-items:center; justify-content:center;
        background:rgba(6,6,8,.95); flex-direction:column; gap:1rem;
        font-family:'Share Tech Mono',monospace;
      ">
        <div style="font-size:4rem; color:var(--yellow);">▲</div>
        <div style="font-size:1.5rem; color:var(--cyan); letter-spacing:.2em;">WAKE UP, SAMURAI</div>
        <div style="color:var(--text-dim); letter-spacing:.15em; font-size:.8rem;">We have a city to burn.</div>
        <div style="margin-top:1rem; font-size:.7rem; color:var(--text-dim);">[ Cliquez pour fermer ]</div>
      </div>
    `;
    document.body.appendChild(msg);
    msg.addEventListener('click', () => msg.remove());
  }


  // ─────────────────────────────────────────
  // 12. PARTICULES DE FOND (canvas léger)
  // ─────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position:fixed; inset:0; z-index:0;
    pointer-events:none; opacity:0.35;
  `;
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      size: Math.random() * 1.5 + .3,
      color: Math.random() > .5 ? '#00f0ff' : '#f5e642',
      alpha: Math.random() * .5 + .1,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // ─────────────────────────────────────────
  // 13. TOGGLE ARTICLES
  window.toggleArticle = function(btn) {
    const card = btn.closest(".article-card");
    const content = card.querySelector(".article-content");
    const isOpen = content.style.display !== "none";
    content.style.display = isOpen ? "none" : "block";
    btn.textContent = isOpen ? "LIRE →" : "FERMER ✕";
    btn.style.color = isOpen ? "var(--cyan)" : "var(--yellow)";
    btn.style.borderColor = isOpen ? "var(--cyan)" : "var(--yellow)";
    if (!isOpen) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // ─────────────────────────────────────────
  // 14. BASCULE THÈME CLAIR / SOMBRE
  // ─────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon  = themeToggle.querySelector('.theme-toggle-icon');
  const themeLabel = themeToggle.querySelector('.theme-toggle-label');

  // Mémoriser le choix de l'utilisateur
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') applyLight();

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      applyDark();
    } else {
      applyLight();
    }
  });

  function applyLight() {
    document.body.classList.add('light-mode');
    themeIcon.textContent  = '🌙';
    themeLabel.textContent = 'MODE SOMBRE';
    localStorage.setItem('theme', 'light');
  }

  function applyDark() {
    document.body.classList.remove('light-mode');
    themeIcon.textContent  = '☀️';
    themeLabel.textContent = 'MODE CLAIR';
    localStorage.setItem('theme', 'dark');
  }

}); // end DOMContentLoaded

  // ─────────────────────────────────────────
  // 13. TOGGLE ARTICLES TECHNIQUES
  // ─────────────────────────────────────────
  // (Défini globalement pour le onclick inline)

