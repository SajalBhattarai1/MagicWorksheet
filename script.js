if (document.querySelectorAll('a[href^="#"]').length) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (event) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    let valid = true;
    inputs.forEach(input => {
      if (input.hasAttribute('required') && input.value.trim() === '') {
        input.style.border = '2px solid red';
        valid = false;
      } else {
        input.style.border = '';
      }
    });
    if (!valid) {
      event.preventDefault();
      alert('Please fill out all required fields.');
    }
  });
});

// Floating AI Brain Icons
const floatingIcons = document.createElement('div');
floatingIcons.classList.add('floating-icons');
document.body.appendChild(floatingIcons);
for (let i = 0; i < 5; i++) {
  const icon = document.createElement('i');
  icon.className = 'fas fa-brain';
  icon.style.left = Math.random() * 100 + 'vw';
  icon.style.animationDuration = (Math.random() * 5 + 3) + 's';
  floatingIcons.appendChild(icon);
}

// GSAP Scroll Animations
if (typeof gsap !== 'undefined') {
  gsap.from('.features div', { opacity: 0, y: 50, duration: 1, stagger: 0.3 });
  gsap.from('.pricing-section .col-md-4', { opacity: 0, scale: 0.8, duration: 1, stagger: 0.3 });
}

// Particle Magic Canvas
const canvas = document.getElementById("magicCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];

  function createParticles() {
    particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 8 + 3,
        dx: (Math.random() - 0.5) * 2.5,
        dy: (Math.random() - 0.5) * 2.5,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        opacity: Math.random() * 0.7 + 0.3,
        life: Math.random() * 80 + 50
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace('hsl', 'hsla').replace(')', `, ${p.opacity})`);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      if (p.life <= 0) particles[i] = createParticles()[0];
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  });

  createParticles();
  animateParticles();
}

// Particle Cursor Trail
(function initCursorTrail() {
  const trailCanvas = document.createElement('canvas');
  trailCanvas.id = "cursorTrailCanvas";
  Object.assign(trailCanvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 1
  });
  document.body.appendChild(trailCanvas);

  const ctxTrail = trailCanvas.getContext("2d");
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
  let trailParticles = [];

  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.alpha = 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.01;
    }
    draw() {
      ctxTrail.globalAlpha = this.alpha;
      ctxTrail.fillStyle = this.color;
      ctxTrail.beginPath();
      ctxTrail.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxTrail.fill();
      ctxTrail.globalAlpha = 1;
    }
  }

  function animateCursorTrail() {
    ctxTrail.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    trailParticles = trailParticles.filter(p => p.alpha > 0);
    trailParticles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCursorTrail);
  }

  window.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      trailParticles.push(new TrailParticle(e.clientX, e.clientY));
    }
  });

  window.addEventListener("resize", () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  });

  animateCursorTrail();
})();

// Magic Form Submission Animation
const form = document.querySelector('.worksheet-form');
const overlay = document.getElementById('magic-overlay');
if (form && overlay) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    overlay.classList.add('active');
    form.classList.add('form-casting');
    setTimeout(() => {
      overlay.classList.remove('active');
      form.classList.remove('form-casting');
      form.submit();
    }, 2000);
  });
}

// Search & Filter (Dashboard)
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const subjectFilter = document.getElementById("subjectFilter");
  const cards = document.querySelectorAll(".worksheet-card");
  function filterCards() {
    const query = searchInput?.value.toLowerCase() || "";
    const subject = subjectFilter?.value.toLowerCase() || "";
    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const subjectText = card.querySelector(".card-details p:nth-child(1)").textContent.toLowerCase();
      const topicText = card.querySelector(".card-details p:nth-child(3)").textContent.toLowerCase();
      const matchesSearch = title.includes(query) || topicText.includes(query) || subjectText.includes(query);
      const matchesFilter = subject === "" || subjectText.includes(subject);
      card.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
  }
  searchInput?.addEventListener("input", filterCards);
  subjectFilter?.addEventListener("change", filterCards);
});

// GSAP Scroll Reveal
if (typeof gsap !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".worksheet-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".card-grid",
        start: "top 80%",
      },
    });
  });
}

// View Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".view-btn");
  const views = document.querySelectorAll(".view-mode");
  const viewWrapper = document.getElementById("dashboard-views");
  function switchView(viewName) {
    views.forEach(v => {
      v.classList.remove("active");
      v.classList.add("hidden");
    });
    const targetView = viewWrapper?.querySelector(`.${viewName}-view`);
    if (targetView) {
      targetView.classList.remove("hidden");
      targetView.classList.add("active");
    }
    localStorage.setItem("dashboardView", viewName);
  }
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchView(btn.dataset.view);
    });
  });
  const saved = localStorage.getItem("dashboardView") || "cards";
  switchView(saved);
});

// Dark/Light Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  // Apply saved theme on page load
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    body.classList.add("light-mode");
  }

  toggleBtn?.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});