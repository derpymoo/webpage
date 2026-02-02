import "./styles.css";

(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------
  // Contact form
  // -----------------------
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  if (form && hint) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const payload =
        `To: zhengyijie183@gmail.com\n` +
        `From: ${email}\n\n` +
        `${message}\n`;

      try {
        await navigator.clipboard.writeText(payload);
        hint.textContent =
          "Copied to clipboard! Paste into your email client to send.";
        form.reset();
      } catch {
        hint.textContent =
          "Could not access clipboard. Please copy manually and email.";
      }
    });
  }

  // -----------------------
  // NEW: Scroll-based topbar show/hide
  // -----------------------
  const topbar = document.querySelector(".topbar");
  let lastY = window.scrollY;
  const SHOW_AT_TOP = 10;       // always show near top
  const DELTA = 6;              // ignore tiny jitter
  const COOLDOWN_MS = 60;       // reduce flicker
  let lastTick = 0;

  function setTopbarVisible(visible) {
    if (!topbar) return;
    topbar.classList.toggle("is-visible", visible);
  }

  // show initially
  setTopbarVisible(true);

  window.addEventListener(
    "scroll",
    () => {
      const now = Date.now();
      if (now - lastTick < COOLDOWN_MS) return;
      lastTick = now;

      const y = window.scrollY;

      // Always show when near top
      if (y <= SHOW_AT_TOP) {
        setTopbarVisible(true);
        lastY = y;
        return;
      }

      const diff = y - lastY;

      // Ignore tiny movements
      if (Math.abs(diff) < DELTA) return;

      if (diff > 0) {
        // scrolling down -> hide
        setTopbarVisible(false);
      } else {
        // scrolling up -> show
        setTopbarVisible(true);
      }

      lastY = y;
    },
    { passive: true }
  );

  // -----------------------
  // Pixel button press effect
  // -----------------------
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const el = document.activeElement;
    if (!el) return;

    const isClickable =
      el.classList &&
      (el.classList.contains("btn") || el.classList.contains("nav__link"));

    if (isClickable) {
      el.style.transform = "translate(2px, 2px)";
      setTimeout(() => (el.style.transform = ""), 90);
    }
  });
})();
