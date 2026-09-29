// Yavin Institute — shared scripts. Each block only runs if its element is on the page.

// Rotating tagline
(function () {
  const items = document.querySelectorAll('.rotator span');
  if (!items.length) return;
  let i = 0;
  setInterval(() => {
    items[i].classList.remove('on');
    i = (i + 1) % items.length;
    items[i].classList.add('on');
  }, 2800);
})();

// Intro: slow, flat, looping upward scroll. Hover pauses; mouse wheel scrolls it by hand.
(function () {
  const box = document.querySelector('.intro');
  if (!box) return;
  const track = box.querySelector('.chunks');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // second copy so the loop is seamless
  [...track.children].forEach(p => {
    const c = p.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });

  const SPEED = 16;          // pixels per second
  let loop = 0;              // height of one full set of paragraphs
  let y = 0, paused = false, last = performance.now();

  function measure() { loop = track.scrollHeight / 2; }
  function start() { measure(); y = -box.clientHeight * 0.2; }   // first line just below the top fade

  function frame(t) {
    const dt = Math.min(0.1, (t - last) / 1000);
    last = t;
    if (!paused) y += SPEED * dt;
    if (loop) { if (y >= loop) y -= loop; if (y < -box.clientHeight) y += loop; }
    track.style.transform = `translateY(${-y}px)`;
    requestAnimationFrame(frame);
  }

  box.addEventListener('mouseenter', () => paused = true);
  box.addEventListener('mouseleave', () => paused = false);
  box.addEventListener('wheel', e => { e.preventDefault(); y += e.deltaY * 0.5; }, { passive: false });
  addEventListener('resize', measure);
  document.fonts.ready.then(start);
  start();
  requestAnimationFrame(frame);
})();

// Starfield
(function () {
  const c = document.getElementById('sky');
  if (!c) return;
  const ctx = c.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((innerWidth * innerHeight) / 5000);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.1 + 0.2,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.015 + 0.004
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of stars) {
      if (!still) s.p += s.s;
      const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(s.p));
      ctx.fillStyle = `rgba(236,230,214,${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!still) requestAnimationFrame(draw);
  }

  addEventListener('resize', () => { resize(); if (still) draw(); });
  resize();
  draw();
})();
