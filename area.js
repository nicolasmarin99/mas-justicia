/* ============================================================
   MÁS JUSTICIA — Área páginas — comportamiento compartido
   ============================================================ */
(function () {
  "use strict";

  /* ── NAV ─────────────────────────────────────────────────── */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.getElementById("navToggle");
    const links  = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", () => links.classList.toggle("open"));
      links.addEventListener("click", e => {
        if (e.target.tagName === "A") links.classList.remove("open");
      });
    }
  }

  /* ── GSAP ────────────────────────────────────────────────── */
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll progress bar ─────────────────────────────────── */
  gsap.to(".scroll-bar", {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0 },
  });

  if (reduced) return;

  /* ── Hero entrance ───────────────────────────────────────── */
  gsap.timeline()
    .from(".area-hero-panel", {
      y: 36, autoAlpha: 0, duration: 0.8, ease: "power2.out", clearProps: "all",
    })
    .from(".area-breadcrumb", {
      y: 10, autoAlpha: 0, duration: 0.4, ease: "power2.out", clearProps: "all",
    }, "-=0.5")
    .from(".area-badge-pill", {
      y: 10, autoAlpha: 0, duration: 0.4, ease: "power2.out", clearProps: "all",
    }, "-=0.35")
    .from(".area-hero-copy h1, .area-tagline, .area-hero-actions", {
      y: 26, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "all",
    }, "-=0.3")
    .from(".area-hero-deco", {
      scale: 0.82, autoAlpha: 0, duration: 1.2, ease: "power2.out", clearProps: "all",
    }, "-=0.85");

  /* ── Intro ───────────────────────────────────────────────── */
  gsap.from(".area-intro-text", {
    x: -44, autoAlpha: 0, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: ".area-intro-grid", start: "top 84%", once: true },
  });
  gsap.from(".area-intro-services", {
    x: 44, autoAlpha: 0, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: ".area-intro-grid", start: "top 84%", once: true },
  });
  gsap.from(".area-service-list li", {
    y: 20, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: "power2.out",
    scrollTrigger: { trigger: ".area-service-list", start: "top 84%", once: true },
  });

  /* ── Cuándo ──────────────────────────────────────────────── */
  gsap.from(".area-cuando-head .eyebrow, .area-cuando-head h2", {
    y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".area-cuando-head", start: "top 84%", once: true },
  });
  gsap.from(".cuando-card", {
    y: 48, autoAlpha: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".cuando-grid", start: "top 84%", once: true },
  });

  /* ── Problemas ───────────────────────────────────────────── */
  gsap.from(".area-problemas-head", {
    x: -44, autoAlpha: 0, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: ".area-problemas-grid", start: "top 84%", once: true },
  });
  gsap.from(".problema-item", {
    x: 36, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: "power2.out",
    scrollTrigger: { trigger: ".problemas-list", start: "top 84%", once: true },
  });

  /* ── FAQ ─────────────────────────────────────────────────── */
  gsap.from(".area-faq-head .eyebrow, .area-faq-head h2", {
    y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".area-faq-head", start: "top 84%", once: true },
  });
  gsap.from(".faq-item", {
    y: 28, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: "power2.out",
    scrollTrigger: { trigger: ".faq-list", start: "top 84%", once: true },
  });

  /* ── CTA ─────────────────────────────────────────────────── */
  gsap.from(".area-cta-panel", {
    y: 52, autoAlpha: 0, duration: 0.9, ease: "power2.out",
    scrollTrigger: { trigger: ".area-cta-panel", start: "top 84%", once: true },
  });

  /* ── FAQ Accordion ───────────────────────────────────────── */
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    const ans = item.querySelector(".faq-a");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all open items
      document.querySelectorAll(".faq-item.open").forEach(open => {
        open.classList.remove("open");
        gsap.to(open.querySelector(".faq-a"), {
          height: 0, duration: 0.32, ease: "power2.inOut",
        });
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add("open");
        gsap.to(ans, { height: "auto", duration: 0.42, ease: "power2.out" });
      }
    });
  });

  /* ── Magnetic buttons ────────────────────────────────────── */
  document.querySelectorAll(".pill--accent, .pill--beige, .pill--solid-beige, .pill--burdeo").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.18;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.18;
      gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    });
  });

  /* ── WhatsApp button ─────────────────────────────────────── */
  const wsp = document.querySelector(".wsp-float");
  if (wsp) {
    gsap.set(wsp, { scale: 0, autoAlpha: 0 });
    gsap.to(wsp, {
      scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.2)",
      delay: 1.5, clearProps: "scale",
    });
  }

})();
