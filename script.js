const body = document.body;

function toggleKepanitiaan(btn) {
  const extra = document.getElementById("kepanitiaan-extra");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  if (expanded) {
    extra.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.querySelector(".sertif-toggle-label").textContent =
      "Lihat Semua Organisasi";
    btn.querySelector(".sertif-toggle-count").textContent = "5 lainnya";
  } else {
    extra.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.querySelector(".sertif-toggle-label").textContent = "Sembunyikan";
    btn.querySelector(".sertif-toggle-count").textContent = "";
  }
}

function toggleSertifikat(btn) {
  const extra = document.getElementById("sertifikat-extra");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  if (expanded) {
    extra.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.querySelector(".sertif-toggle-label").textContent =
      "Lihat Semua Sertifikat";
    btn.querySelector(".sertif-toggle-count").textContent = "5 lainnya";
  } else {
    extra.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.querySelector(".sertif-toggle-label").textContent = "Sembunyikan";
    btn.querySelector(".sertif-toggle-count").textContent = "";
  }
}

function togglePortfolio(btn) {
  const extra = document.getElementById("portfolio-extra");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  if (expanded) {
    extra.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.querySelector(".sertif-toggle-label").textContent =
      "Lihat Semua Project";
    btn.querySelector(".sertif-toggle-count").textContent = "7 lainnya";
  } else {
    extra.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.querySelector(".sertif-toggle-label").textContent = "Sembunyikan";
    btn.querySelector(".sertif-toggle-count").textContent = "";
  }
}

const header = document.querySelector("header");
const navMenu = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.getElementById("menu-toggle");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const storedTheme = localStorage.getItem("theme-mode");
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme(prefersDark.matches ? "dark" : "light");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  toggleMenuIcon(isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    toggleMenuIcon(false);
  });
});

themeToggle.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("theme-mode", nextTheme);
});

prefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme-mode")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function applyTheme(mode) {
  body.dataset.theme = mode;
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = body.dataset.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  if (isDark) {
    themeIcon.classList.remove("bx-moon");
    themeIcon.classList.add("bx-sun");
  } else {
    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  }
}

function toggleMenuIcon(open) {
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("bx-menu", !open);
  icon.classList.toggle("bx-x", open);
}

function handleScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle("scrolled", scrollY > 50);

  sections.forEach((section) => {
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;
    const isInView = scrollY >= offset && scrollY < offset + height;

    if (isInView) {
      setActiveLink(section.id);
    }
  });
}

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const modalBackdrop = document.getElementById("portfolio-modal-backdrop");
const learnMoreButtons = document.querySelectorAll(".portfolio-learn-more");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalBackdrop?.classList.add("active");
  modalBackdrop?.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBackdrop?.classList.remove("active");
  modalBackdrop?.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

learnMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.modalTarget;
    const targetModal = document.getElementById(targetId);
    openModal(targetModal);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".portfolio-modal");
    closeModal(modal);
  });
});

modalBackdrop?.addEventListener("click", () => {
  const openModalEl = document.querySelector(".portfolio-modal.open");
  closeModal(openModalEl);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openModalEl = document.querySelector(".portfolio-modal.open");
    closeModal(openModalEl);
  }
});

/* ═══════════════════════════════════════════════════
   ANIMATIONS & EFFECTS — Full Site Enhancement
═══════════════════════════════════════════════════ */

// ── Page Loader ─────────────────────────────────────
const pageLoader = document.getElementById("page-loader");
window.addEventListener("load", () => {
  setTimeout(() => pageLoader?.classList.add("loaded"), 850);
});

// ── Scroll Progress Bar ─────────────────────────────
const scrollProgress = document.getElementById("scroll-progress");
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });

// ── Custom Cursor ────────────────────────────────────
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

if (cursorDot && cursorRing) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets =
    "a, button, .portfolio-card, .service-card, .skill-logo-item, .contact-social-item, .sertifikat-download, .btn, .profile-tags span";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursorRing.classList.add("hovering"),
    );
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("hovering"),
    );
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });
}

// ── Typewriter Effect ────────────────────────────────
const heroTyped = document.getElementById("hero-typed");
if (heroTyped) {
  const roles = [
    "BACHELOR OF INFORMATICS",
    "WEB DEVELOPER",
    "DATA ANALYST",
    "UI/UX DESIGNER",
    "DATA SCIENTIST",
    "MACHINE LEARNING ENGINEER",
  ];
  let roleIdx = 0,
    charIdx = 0,
    deleting = false;

  function typeWriter() {
    const current = roles[roleIdx];
    if (!deleting) {
      heroTyped.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeWriter, 2000);
        return;
      }
    } else {
      heroTyped.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeWriter, deleting ? 55 : 95);
  }
  setTimeout(typeWriter, 1200);
}

// ── Counter Animation ────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target) || target === 0) {
    el.textContent = "0";
    return;
  }
  const duration = 1200;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll("span[data-count]")
          .forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

document
  .querySelectorAll(".project-metrics")
  .forEach((el) => counterObserver.observe(el));

// ── Reveal Variants Observer ─────────────────────────
const revealVariants = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-zoom",
);
const variantObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        variantObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealVariants.forEach((el) => variantObserver.observe(el));

// ── Staggered Grid Children ──────────────────────────
document.querySelectorAll(".services-grid, .portfolio-grid").forEach((grid) => {
  grid.querySelectorAll(".service-card, .portfolio-card").forEach((el, i) => {
    el.style.transitionDelay = i * 0.08 + "s";
  });
});
document.querySelectorAll(".contact-socials").forEach((grid) => {
  grid.querySelectorAll("a").forEach((el, i) => {
    el.style.transitionDelay = i * 0.07 + "s";
  });
});

// ── Button Ripple ────────────────────────────────────
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    this.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// ── Card Tilt Effect ─────────────────────────────────
function applyTilt(cards) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
applyTilt(document.querySelectorAll(".service-card"));
applyTilt(document.querySelectorAll(".portfolio-card"));

// ── Section Heading Underline (already handled by reveal observer + CSS) ──
// The .section-heading elements already get .active class from the main reveal observer.
