/* ============================================================
   MÁS JUSTICIA — GSAP animations  v2
   Requires: gsap.min.js + ScrollTrigger.min.js
   ============================================================ */
(function () {
  "use strict";

  if (typeof gsap === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Kill CSS reveal system — GSAP owns all entrance animations */
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));

  /* ── Split hero title into individually-animated line spans ── */
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const parts = heroTitle.innerHTML.split(/<br\s*\/?>/gi);
    heroTitle.innerHTML = parts
      .map((p, i) => `<span class="htl htl-${i + 1}">${p.trim()}</span>`)
      .join("");
  }

  /* =============================================================
     SCROLL PROGRESS BAR — thin burdeo line at very top
     ============================================================= */
  gsap.to(".scroll-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
    },
  });

  /* =============================================================
     HERO SCROLL-EXIT — pinned + scrubbed
     Created first so the to() tweens can lazily capture the
     clean CSS state on first scroll (before the intro completes).
     ============================================================= */
  const exitTL = gsap.timeline({ defaults: { ease: "none" } });
  exitTL
    .to(".htl-1",              { x: () => -window.innerWidth * 0.9, autoAlpha: 0 }, 0)
    .to(".htl-2",              { x: () =>  window.innerWidth * 0.9, autoAlpha: 0 }, 0)
    .to(".htl-3",              { x: () => -window.innerWidth * 0.7, autoAlpha: 0 }, 0)
    .to(".hero-copy .eyebrow", { y: -30, autoAlpha: 0 },                             0)
    .to(".hero-sub",           { x: () => window.innerWidth * 0.35, autoAlpha: 0 }, 0)
    .to(".hero-actions",       { y: 50, autoAlpha: 0 },                              0)
    .to(".hero-figure",        { scale: 0.72, autoAlpha: 0.15 },                     0)
    .to(".hero-badge",         { y: 28, autoAlpha: 0 },                              0);

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "+=740",
    pin: true,
    pinSpacing: true,
    scrub: 1.4,
    animation: exitTL,
    invalidateOnRefresh: true,
  });

  /* RADIAL parallax — slow counter-rotation during pin */
  gsap.to(".radial", {
    rotation: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=740",
      scrub: 2,
    },
  });

  /* =============================================================
     PAGE LOAD INTRO — nav slides down, hero panel + copy fly in
     clearProps: "all" removes inline styles so the scroll-exit
     to() tweens capture the clean CSS state on first scroll.
     ============================================================= */
  const introTL = gsap.timeline();
  introTL
    .from(".nav", {
      y: -88, autoAlpha: 0, duration: 0.55, ease: "power2.out", clearProps: "all",
    })
    .from(".hero-panel", {
      y: 38, autoAlpha: 0, duration: 0.8, ease: "power2.out", clearProps: "all",
    }, "-=0.3")
    .from(".hero-copy .eyebrow", {
      y: 14, autoAlpha: 0, duration: 0.4, ease: "power2.out", clearProps: "all",
    }, "-=0.45")
    .from(".htl-1, .htl-2, .htl-3", {
      y: 28, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: "power3.out", clearProps: "all",
    }, "-=0.3")
    .from(".hero-sub", {
      y: 18, autoAlpha: 0, duration: 0.45, ease: "power2.out", clearProps: "all",
    }, "-=0.25")
    .from(".hero-actions", {
      y: 18, autoAlpha: 0, duration: 0.45, ease: "power2.out", clearProps: "all",
    }, "-=0.3")
    .from(".hero-figure", {
      scale: 0.88, autoAlpha: 0, duration: 0.85, ease: "power2.out", clearProps: "all",
    }, "-=0.65")
    .from(".hero-badge", {
      x: -26, autoAlpha: 0, duration: 0.45, ease: "back.out(1.6)", clearProps: "all",
    }, "-=0.35");

  /* =============================================================
     STATS BAR — stagger entrance + counter animation
     ============================================================= */
  gsap.from(".stat-item", {
    y: 30, autoAlpha: 0, duration: 0.65, stagger: 0.11, ease: "power2.out",
    scrollTrigger: { trigger: ".stats", start: "top 86%", once: true },
  });

  const statNums = document.querySelectorAll(".stat-num");
  ScrollTrigger.create({
    trigger: ".stats", start: "top 82%", once: true,
    onEnter() {
      statNums.forEach(el => {
        const original = el.textContent.trim();
        const num = parseInt(original.replace(/\D/g, ""), 10);
        if (isNaN(num)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num, duration: 2.2, ease: "power2.out",
          onUpdate() { el.textContent = original.replace(/\d+/, Math.round(obj.val)); },
        });
      });
    },
  });

  /* =============================================================
     ÁREAS — heading stagger + cards (injected by masjusticia.js)
     ============================================================= */
  gsap.from(".areas-head .eyebrow, .areas-head h2, .areas-head p", {
    y: 24, autoAlpha: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".areas-head", start: "top 84%", once: true },
  });

  ScrollTrigger.create({
    trigger: ".areas-grid", start: "top 86%", once: true,
    onEnter() {
      gsap.from(".area-card", {
        y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      });
    },
  });

  /* =============================================================
     VALORES — opposing-direction heading + staggered cards
     ============================================================= */
  gsap.from(".valores-copy", {
    x: -42, autoAlpha: 0, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: ".valores-head", start: "top 83%", once: true },
  });
  gsap.from(".valores-video-wrap", {
    x: 52, autoAlpha: 0, scale: 0.96, duration: 0.85, ease: "power2.out",
    scrollTrigger: { trigger: ".valores-head", start: "top 83%", once: true },
  });
  gsap.from(".valores-carousel", {
    y: 40, autoAlpha: 0, duration: 0.7, ease: "power2.out",
    scrollTrigger: { trigger: ".valores-carousel", start: "top 83%", once: true },
  });

  /* =============================================================
     PROCESO — heading + steps + connectors stagger
     ============================================================= */
  gsap.from(".proceso-head .eyebrow, .proceso-head h2, .proceso-sub", {
    y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".proceso-head", start: "top 84%", once: true },
  });
  gsap.from(".paso", {
    y: 52, autoAlpha: 0, duration: 0.7, stagger: 0.18, ease: "power2.out",
    scrollTrigger: { trigger: ".proceso-steps", start: "top 83%", once: true },
  });
  /* Dashed connectors draw in after the pasos */
  gsap.from(".paso-conector", {
    autoAlpha: 0, scale: 0.6, duration: 0.45, stagger: 0.15, ease: "power2.out",
    scrollTrigger: { trigger: ".proceso-steps", start: "top 78%", once: true },
  });

  /* =============================================================
     EQUIPO — heading, colab sides, CV rows stagger, tags pop
     ============================================================= */
  gsap.from(".equipo-head .eyebrow, .equipo-head h2, .equipo-head p", {
    y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".equipo-head", start: "top 84%", once: true },
  });

  /* Photo/card slides from left */
  gsap.from(".colab-photo, .colab-card", {
    x: -60, autoAlpha: 0, duration: 0.85, ease: "power2.out",
    scrollTrigger: { trigger: ".colab", start: "top 80%", once: true },
  });

  /* Info: name/role/pres cascade from right */
  gsap.from(".colab-info .eyebrow, .colab-name, .colab-pres", {
    x: 48, autoAlpha: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".colab-info", start: "top 80%", once: true },
  });

  /* CV rows slide in one by one */
  gsap.from(".colab-cv .row", {
    x: 36, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
    scrollTrigger: { trigger: ".colab-cv", start: "top 82%", once: true },
  });

  /* Specialty tags pop with back.out */
  gsap.from(".colab-tag", {
    scale: 0.75, autoAlpha: 0, duration: 0.38, stagger: 0.07, ease: "back.out(1.6)",
    scrollTrigger: { trigger: ".colab-tags", start: "top 88%", once: true },
  });

  /* =============================================================
     UBICACIÓN — heading + info items + map
     ============================================================= */
  gsap.from(".ubicacion-head .eyebrow, .ubicacion-head h2, .ubicacion-sub", {
    y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".ubicacion-head", start: "top 84%", once: true },
  });

  gsap.from(".uinfo-item", {
    x: -38, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".ubicacion-info", start: "top 82%", once: true },
  });

  gsap.from(".ubicacion-cta", {
    x: -24, autoAlpha: 0, duration: 0.45, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".ubicacion-info", start: "top 74%", once: true },
  });

  gsap.from(".ubicacion-map", {
    x: 52, autoAlpha: 0, duration: 0.85, ease: "power2.out",
    scrollTrigger: { trigger: ".ubicacion-grid", start: "top 82%", once: true },
  });

  /* =============================================================
     FINAL PANEL — copy from left / form card from right
     Split animation gives the section more visual drama than
     a single whole-panel entrance.
     ============================================================= */
  gsap.from(".final-copy .eyebrow, .final-copy h2, .final-copy > p", {
    x: -42, autoAlpha: 0, duration: 0.65, stagger: 0.13, ease: "power2.out",
    scrollTrigger: { trigger: ".final-copy", start: "top 84%", once: true },
  });
  gsap.from(".final-actions", {
    x: -28, autoAlpha: 0, duration: 0.5, ease: "power2.out",
    scrollTrigger: { trigger: ".final-copy", start: "top 80%", once: true },
  });
  gsap.from(".consult-card", {
    x: 52, autoAlpha: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: ".final-panel", start: "top 84%", once: true },
  });

  /* Form fields stagger in after the card appears */
  gsap.from(".field, .consult-card h3, .consult-card .sub", {
    y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.07, ease: "power2.out",
    scrollTrigger: { trigger: ".consult-card", start: "top 82%", once: true },
  });
  gsap.from(".consult-card .submit", {
    y: 12, autoAlpha: 0, duration: 0.4, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".consult-card", start: "top 76%", once: true },
  });

  /* =============================================================
     FOOTER — brand + columns stagger + bottom bar
     ============================================================= */
  gsap.from(".footer-brand", {
    y: 30, autoAlpha: 0, duration: 0.65, ease: "power2.out",
    scrollTrigger: { trigger: ".footer", start: "top 88%", once: true },
  });
  gsap.from(".footer-col", {
    y: 28, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".footer", start: "top 88%", once: true },
  });
  gsap.from(".footer-bottom", {
    autoAlpha: 0, y: 12, duration: 0.5, ease: "power2.out",
    scrollTrigger: { trigger: ".footer-bottom", start: "top 96%", once: true },
  });

  /* =============================================================
     MAGNETIC BUTTONS — subtle cursor-following on hover
     Gives CTA pills a premium interactive feel.
     Pull factor: 18 %. Elastic snap-back on leave.
     ============================================================= */
  document.querySelectorAll(".pill--burdeo, .pill--beige, .pill--solid-beige").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  * 0.5)) * 0.18;
      const dy = (e.clientY - (r.top  + r.height * 0.5)) * 0.18;
      gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    });
  });

  /* =============================================================
     WHATSAPP BUTTON — bounces in after page settles
     ============================================================= */
  gsap.set(".wsp-float", { scale: 0, autoAlpha: 0 });
  gsap.to(".wsp-float", {
    scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.2)",
    delay: 1.8, clearProps: "scale",
  });

})();
