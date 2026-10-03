(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const ICON = {
    repo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const SKILL_ICON = {
    frontend:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    performance:
      '<path d="M12 20a8 8 0 1 1 8-8"/><path d="M12 12l5-3"/><circle cx="12" cy="12" r="1.4"/>',
    backend:
      '<ellipse cx="12" cy="5.5" rx="7.5" ry="3"/><path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"/><path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 10.2 4 4 0 0 0 7 18Z"/>',
    a11y: '<circle cx="12" cy="4.5" r="1.8"/><path d="M12 8.5v6M12 14.5l-3 5M12 14.5l3 5M7.5 10h9"/>',
    testing: '<path d="M9 3h6M10 3v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 14.5h9"/>',
  };

  const skillIcon = (key) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
      SKILL_ICON[key] ?? ""
    }</svg>`;

  const escape = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Theme */

  const THEME_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggle = $("#theme-toggle");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    toggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  };

  const stored = (() => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  })();

  applyTheme(stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked, theme still applies for this session */
    }
  });

  /* Mobile nav */

  const menuToggle = $("#menu-toggle");
  const nav = $(".nav");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#nav-list a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* Render skills */

  const skillsGrid = $("#skills-grid");

  skillsGrid.innerHTML = PORTFOLIO.skills
    .map(
      (s) => `
      <article class="skill reveal">
        <div class="skill__icon" aria-hidden="true">${skillIcon(s.icon)}</div>
        <h3>${escape(s.title)}</h3>
        <p class="skill__level">${s.level}% proficiency</p>
        <p>${escape(s.summary)}</p>
        <ul class="skill__tags">${s.tags.map((t) => `<li>${escape(t)}</li>`).join("")}</ul>
        <div class="skill__meter" role="presentation" style="--level:${s.level}%"><i></i></div>
      </article>`
    )
    .join("");

  /* Render projects + filters */

  const projectsGrid = $("#projects-grid");
  const filtersEl = $("#project-filters");
  const statusEl = $("#filter-status");
  const emptyEl = $("#projects-empty");

  projectsGrid.innerHTML = PORTFOLIO.projects
    .map(
      (p, i) => `
      <article class="project reveal" data-category="${escape(p.category.toLowerCase())}" style="--d:${i % 3}">
        <div class="project__head">
          <h3 class="project__title">${escape(p.title)}</h3>
          <span class="project__year">${escape(p.year)}</span>
        </div>
        <p>${escape(p.summary)}</p>
        <ul class="project__tags">${p.tags.map((t) => `<li>${escape(t)}</li>`).join("")}</ul>
        <div class="project__links">
          ${p.repo ? `<a href="${escape(p.repo)}" target="_blank" rel="noopener noreferrer">${ICON.repo} Source</a>` : ""}
          ${p.demo ? `<a href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">${ICON.external} Live</a>` : ""}
        </div>
      </article>`
    )
    .join("");

  const categories = [...new Set(PORTFOLIO.projects.map((p) => p.category))];

  filtersEl.innerHTML = ["All", ...categories]
    .map(
      (c, i) =>
        `<button class="filter" type="button" data-category="${escape(
          c === "All" ? "all" : c.toLowerCase()
        )}" aria-pressed="${i === 0}">${escape(c)}</button>`
    )
    .join("");

  const applyFilter = (category) => {
    let shown = 0;

    $$(".project", projectsGrid).forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !match);
      if (match) {
        shown += 1;
        if (reduceMotion) card.classList.add("is-in");
      }
    });

    $$(".filter", filtersEl).forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.category === category))
    );

    emptyEl.hidden = shown > 0;
    statusEl.textContent = `Showing ${shown} of ${PORTFOLIO.projects.length} project${
      PORTFOLIO.projects.length === 1 ? "" : "s"
    }`;
  };

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (btn) applyFilter(btn.dataset.category);
  });

  applyFilter("all");

  /* Scroll reveal */

  const revealables = $$(".reveal");

  revealables.forEach((el) => {
    const d = el.dataset.delay;
    if (d) el.style.setProperty("--d", d);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* Animated counters */

  const counters = $$("[data-count]");

  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? "";
    if (reduceMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          co.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* Typed hero role */

  const typedEl = $("#typed");
  const roles = ["Software Engineer", "Frontend Architect", "Performance Nerd", "Open Source Maintainer"];
  const TYPING = 62;
  const HOLDING = 1700;
  const DELETING = 34;

  if (typedEl && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    const tick = () => {
      const role = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typedEl.textContent = role.slice(0, charIndex);

      let wait = deleting ? DELETING : TYPING;

      if (!deleting && charIndex === role.length) {
        deleting = true;
        wait = HOLDING;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        wait = 400;
      }

      setTimeout(tick, wait);
    };

    setTimeout(tick, 2200);
  }

  /* Header state, scroll spy, back to top */

  const header = $("#site-header");
  const toTop = $("#to-top");
  const sections = $$("main section[id]");
  const navLinks = new Map($$(".nav__link").map((a) => [a.getAttribute("href").slice(1), a]));

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-stuck", y > 24);
    toTop.hidden = y < 600;
    toTop.classList.toggle("is-shown", y >= 600);

    const probe = y + window.innerHeight * 0.35;
    let current = null;
    sections.forEach((s) => {
      if (s.offsetTop <= probe) current = s.id;
    });

    navLinks.forEach((link, id) => link.classList.toggle("is-active", id === current));
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  /* Web-sling canvas effect */

  const canvas = $("#web-canvas");
  const ctx = canvas.getContext("2d");
  const strands = [];
  const MAX_STRANDS = 9;
  const accent = () => getComputedStyle(root).getPropertyValue("--accent").trim() || "#ff3b30";

  const sizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);

  const shoot = (x, y) => {
    if (strands.length >= MAX_STRANDS) strands.shift();
    strands.push({ x, y, len: 0, speed: 26 + Math.random() * 22, hubX: window.innerWidth / 2, hubY: -40 });
  };

  window.addEventListener(
    "pointerdown",
    (e) => {
      if (reduceMotion || e.button !== 0) return;
      shoot(e.clientX, e.clientY);
    },
    { passive: true }
  );

  const drawStrands = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = strands.length - 1; i >= 0; i -= 1) {
      const s = strands[i];
      s.len += s.speed;

      const t = Math.min(s.len / 720, 1);
      const eased = 1 - Math.pow(1 - t, 3.2);
      const ex = s.hubX + (s.x - s.hubX) * eased;
      const ey = s.hubY + (s.y - s.hubY) * eased;
      const alpha = 1 - t;

      const shootWeb = (cx, cy) => {
        const spokes = 10;
        const r = 46 * (0.5 + t);
        ctx.save();
        ctx.globalAlpha = alpha * 0.75;
        ctx.strokeStyle = accent();
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (let a = 0; a < spokes; a += 1) {
          const ang = (a / spokes) * Math.PI * 2 + 0.3;
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
        }
        for (let ring = 1; ring <= 4; ring += 1) {
          ctx.beginPath();
          for (let a = 0; a <= spokes; a += 1) {
            const ang = (a / spokes) * Math.PI * 2 + 0.3;
            const rr = r * (ring / 4);
            const px = cx + Math.cos(ang) * rr;
            const py = cy + Math.sin(ang) * rr;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.quadraticCurveTo(cx + Math.cos(ang - 0.3) * rr * 1.1, cy + Math.sin(ang - 0.3) * rr * 1.1, px, py);
          }
          ctx.stroke();
        }
        ctx.restore();
      };

      ctx.save();
      ctx.globalAlpha = alpha * 0.55;
      ctx.strokeStyle = accent();
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(s.hubX, s.hubY);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();

      if (t > 0.55) shootWeb(ex, ey);
      if (t >= 1) strands.splice(i, 1);
    }

    if (strands.length) requestAnimationFrame(drawStrands);
    else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  window.addEventListener("pointerdown", () => {
    if (!reduceMotion) requestAnimationFrame(drawStrands);
  });

  /* Contact form */

  const form = $("#contact-form");
  const formStatus = $("#form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = $("#email");
    const fields = [
      { el: $("#name"), test: (v) => v.trim().length >= 2, msg: "Please enter your name." },
      { el: email, test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: "That email doesn't look right." },
      { el: $("#message"), test: (v) => v.trim().length >= 10, msg: "Tell me a little more (10+ characters)." },
    ];

    let firstBad = null;

    fields.forEach(({ el, test, msg }) => {
      const parent = el.closest(".field");
      let error = $(".field-error", parent);

      if (test(el.value)) {
        el.removeAttribute("aria-invalid");
        el.removeAttribute("aria-describedby");
        error?.remove();
        return;
      }

      firstBad = firstBad || el;
      el.setAttribute("aria-invalid", "true");

      if (!error) {
        error = document.createElement("span");
        error.className = "field-error";
        error.id = `${el.id}-error`;
        parent.append(error);
      }
      error.textContent = msg;
      el.setAttribute("aria-describedby", error.id);
    });

    if (firstBad) {
      formStatus.textContent = "Fix the highlighted fields and try again.";
      formStatus.classList.add("is-error");
      firstBad.focus();
      return;
    }

    formStatus.classList.remove("is-error");
    formStatus.textContent = "Message sent! This demo form isn't wired to a backend yet — email me directly instead.";

    if (!reduceMotion) {
      const btn = $('button[type="submit"]', form);
      btn.textContent = "Sent!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.disabled = false;
      }, 2600);
    }
  });

  /* Footer easter egg */

  const quoteEl = $("#footer-quote");
  const quotes = PORTFOLIO.quotes ?? [];
  if (quoteEl && quotes.length) quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  $("#year").textContent = new Date().getFullYear();
})();
