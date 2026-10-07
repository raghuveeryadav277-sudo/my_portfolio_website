/* ===== EDIT YOUR LINKS HERE ===== */
const CONFIG = {
  email: "raghuveeryadav277@gmail.com",                     // <-- your email
  linkedin: "https://www.linkedin.com/in/raghubir-yadav-7337b43a7" // <-- your LinkedIn URL
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Apply email & LinkedIn from CONFIG everywhere ---
  document.querySelectorAll("[data-email-link]").forEach(a => a.href = "mailto:" + CONFIG.email);
  document.querySelectorAll("[data-email-text]").forEach(e => e.textContent = CONFIG.email);
  document.querySelectorAll("[data-linkedin]").forEach(a => a.href = CONFIG.linkedin);
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Theme toggle (dark default, saved in localStorage) ---
  const themeBtn = document.getElementById("theme");
  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === "dark" ? "☀" : "☾";
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  setTheme(root.dataset.theme === "light" ? "light" : "dark");
  themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // --- Mobile hamburger menu ---
  const burger = document.getElementById("burger"), menu = document.getElementById("menu");
  function toggleMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burger.textContent = open ? "✕" : "☰";
  }
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

  // --- Navbar shadow + active link while scrolling ---
  const nav = document.getElementById("nav");
  const links = [...menu.querySelectorAll("a")];
  const sections = links.map(a => document.querySelector(a.getAttribute("href")));
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 10);
    let current = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= 120) current = i; });
    links.forEach((a, i) => a.classList.toggle("active", i === current));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Typing animation ---
  const phrases = ["Responsive Websites", "Useful Web Applications", "Clean User Interfaces", "Full Stack Projects"];
  const typed = document.getElementById("typed");
  let p = 0, c = 0, deleting = false;
  function type() {
    const word = phrases[p];
    if (reduce) { typed.textContent = word; p = (p + 1) % phrases.length; return setTimeout(type, 2500); }
    typed.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
    else if (c > 0) c--;
    else { deleting = false; p = (p + 1) % phrases.length; }
    setTimeout(type, deleting ? 40 : 80);
  }
  type();


  // --- Animated particle-network background (canvas) ---
  const cv = document.getElementById("bg"), ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  function initBg() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.floor(W * H / 18000));       // fewer dots on small screens
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.6 + .6
    }));
  }
  function drawBg() {
    ctx.clearRect(0, 0, W, H);
    const light = root.dataset.theme === "light";
    const dot = light ? "109,40,217" : "167,139,250";        // dot/line color (RGB)
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(" + dot + ",.7)"; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {              // connect nearby dots
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.strokeStyle = "rgba(" + dot + "," + (0.25 * (1 - d / 120)) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);    // gently push dots away from cursor
      if (md < 100) { p.x += (p.x - mouse.x) / md * 1.2; p.y += (p.y - mouse.y) / md * 1.2; }
    });
  }
  let raf;
  function loop() { drawBg(); raf = requestAnimationFrame(loop); }
  initBg();
  if (reduce) drawBg(); else loop();
  window.addEventListener("resize", () => { initBg(); if (reduce) drawBg(); });
  window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("visibilitychange", () => {      // pause when tab is hidden
    if (reduce) return;
    if (document.hidden) cancelAnimationFrame(raf); else loop();
  });

  // --- Scroll reveal ---
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    items.forEach(i => io.observe(i));
  } else items.forEach(i => i.classList.add("show"));

  // --- "Project Details" buttons toggle a small info panel ---
  document.querySelectorAll("[data-details]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".proj").querySelector(".more");
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open);
    });
  });

  // --- Contact form: opens the user's email app via mailto (no backend) ---
  const form = document.getElementById("form"), err = document.getElementById("err");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.msg.value.trim();
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) {
      err.textContent = "Please enter your name, a valid email and a message.";
      return;
    }
    err.textContent = "";
    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
    window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
  });
});
