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

  /* ── Hero decorative number parallax on scroll ───────────── */
  gsap.to(".area-hero-deco", {
    y: -110,
    ease: "none",
    scrollTrigger: {
      trigger: ".area-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.6,
    },
  });

  /* ── Hero panel subtle scale-out on scroll ───────────────── */
  /* autoAlpha removed: the scroll tween captures the entrance's
     from-state (opacity:0) which would restore invisible on scroll-up.
     Scale-only is safe because it doesn't conflict with opacity. */
  gsap.to(".area-hero-panel", {
    scale: 0.97,
    ease: "none",
    scrollTrigger: {
      trigger: ".area-hero",
      start: "center top",
      end: "bottom top",
      scrub: 1,
    },
  });

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
    x: 30, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: "power2.out",
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

  /* ── Cuando cards — 3D tilt on hover ────────────────────── */
  document.querySelectorAll(".cuando-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, {
        rotationY: dx * 5,
        rotationX: -dy * 4,
        transformPerspective: 900,
        transformOrigin: "center center",
        ease: "power1.out",
        duration: 0.3,
        overwrite: "auto",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0, rotationX: 0,
        duration: 0.55, ease: "power3.out",
        overwrite: "auto",
      });
    });
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

  /* ── FAQ heading ─────────────────────────────────────────── */
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

  /* ── FAQ Accordion — GSAP + aria ────────────────────────── */
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    const ans = item.querySelector(".faq-a");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      document.querySelectorAll(".faq-item.open").forEach(open => {
        open.classList.remove("open");
        open.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        gsap.to(open.querySelector(".faq-a"), { height: 0, duration: 0.32, ease: "power2.inOut" });
        gsap.to(open.querySelector(".faq-toggle svg"), { rotation: 0, duration: 0.35, ease: "power2.out" });
      });

      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        gsap.to(ans, { height: "auto", duration: 0.42, ease: "power2.out" });
        gsap.to(item.querySelector(".faq-toggle svg"), { rotation: 45, duration: 0.42, ease: "back.out(1.4)" });
      }
    });
  });

  /* ── Magnetic buttons ────────────────────────────────────── */
  document.querySelectorAll(".pill--beige, .pill--burdeo, .pill--solid-beige, .pill--accent").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.18;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.18;
      gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    });
  });

  /* ── WhatsApp float button ───────────────────────────────── */
  const wsp = document.querySelector(".wsp-float");
  if (wsp) {
    gsap.set(wsp, { scale: 0, autoAlpha: 0 });
    gsap.to(wsp, {
      scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.2)",
      delay: 1.5, clearProps: "scale",
    });
  }

})();
