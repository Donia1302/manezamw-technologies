/* ==========================================================================
   MaNezaMW — Site interactions
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- Theme toggle ----------
  const THEME_KEY = "manezamw-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // ---------- Mobile nav ----------
  function initNav() {
    const toggle = $(".menu-toggle");
    const links = $(".nav-links");
    if (!toggle || !links) return;

    const close = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      links.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      links.classList.contains("open") ? close() : open();
    });

    links
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", close));

    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // highlight active link based on current page
    const page = location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === page || (page === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  // ---------- Footer year ----------
  function initYear() {
    $$("#year").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  // ---------- Contact form ----------
  const WHATSAPP_NUMBER = "265899791902"; // MaNezaMW WhatsApp
  const CALLING_NUMBER = "+265993952814"; // MaNezaMW calling line

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const params = new URLSearchParams(location.search);
    const requested = params.get("solution");
    if (requested) {
      const select = form.querySelector('[name="solution"]');
      if (select) {
        [...select.options].forEach((option) => {
          if (option.text.toLowerCase() === requested.toLowerCase())
            option.selected = true;
        });
      }
    }

    function validate() {
      let ok = true;
      form.querySelectorAll(".field").forEach((field) => {
        const input = field.querySelector("input, textarea, select");
        if (!input) return;
        const invalid =
          input.hasAttribute("required") && !String(input.value).trim();
        field.classList.toggle("invalid", invalid);
        if (invalid) ok = false;
      });
      // phone basic check
      const phone = form.querySelector('[name="phone"]');
      if (
        phone &&
        phone.value.trim() &&
        !/^[+\d\s()-]{7,}$/.test(phone.value.trim())
      ) {
        phone.closest(".field").classList.add("invalid");
        ok = false;
      }
      return ok;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      const data = new FormData(form);
      const message =
        `Hello MaNezaMW!%0A%0A` +
        `Name: ${encodeURIComponent(data.get("name"))}%0A` +
        `Phone: ${encodeURIComponent(data.get("phone"))}%0A` +
        `Solution: ${encodeURIComponent(data.get("solution"))}%0A%0A` +
        `Message:%0A${encodeURIComponent(data.get("message"))}`;

      const success = $(".form-success");
      if (success) {
        success.classList.add("show");
        success.textContent = "Opening WhatsApp with your message…";
      }

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer",
      );
    });

    // live validation clear
    form.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("input", () => {
        const field = input.closest(".field");
        if (field) field.classList.remove("invalid");
      });
    });
  }

  // ---------- Reveal on scroll ----------
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
  }

  // ---------- Back to top ----------
  function initBackToTop() {
    const btn = $(".back-to-top");
    if (!btn) return;
    const onScroll = () => {
      btn.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    onScroll();
  }

  // ---------- Theme toggle wiring ----------
  function initThemeToggle() {
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initYear();
    initContactForm();
    initReveal();
    initBackToTop();
    initThemeToggle();
  });
})();
