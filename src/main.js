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
