/* ============================================================
   MÁS JUSTICIA — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- DARK MODE TOGGLE ---------- */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------- NAV: scrolled state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  /* ---------- HERO: radial rays ---------- */
  const radial = document.getElementById("radial");
  const RAYS = 60;
  for (let i = 0; i < RAYS; i++) {
    const ray = document.createElement("span");
    ray.className = "ray";
    const angle = (360 / RAYS) * i;
    // rhythmic length variation: every 5th ray pokes out slightly further
    const len = i % 5 === 0 ? 50 : (i % 5 === 2 ? 47 : 45);
    ray.style.height = len + "%";
    ray.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    ray.style.opacity = i % 5 === 0 ? "0.85" : "0.4";
    radial.appendChild(ray);
  }
  // slow rotation for life
  let rot = 0;
  function spin() {
    rot += 0.02;
    radial.style.transform = `rotate(${rot}deg)`;
    requestAnimationFrame(spin);
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) spin();

  /* ---------- PRACTICE AREAS: expanding cards ---------- */
  const areas = [
    {
      n: "01",
      name: "Derecho Laboral",
      img: "assets/laboral.png",
      badge: "Más demandado",
      page: "areas/laboral.html",
      desc: "Despidos injustificados, finiquitos, acoso laboral y negociación colectiva. Defendemos tus derechos como trabajador.",
    },
    {
      n: "02",
      name: "Derecho de Familia",
      img: "assets/familia.png",
      badge: "Trato humano",
      page: "areas/familia.html",
      desc: "Divorcios, pensiones de alimentos, cuidado personal y régimen de visitas, siempre con empatía y discreción.",
    },
    {
      n: "03",
      name: "Derecho Civil",
      img: "assets/balanza.png",
      badge: "Patrimonio protegido",
      page: "areas/civil.html",
      desc: "Contratos, arrendamientos, cobranzas e indemnizaciones. Resguardamos tu patrimonio y tus acuerdos.",
    },
    {
      n: "04",
      name: "Defensoría Deudores",
      img: "assets/deudores.png",
      badge: "Asesoría integral",
      page: "areas/deudores.html",
      desc: "Renegociación de deudas, defensa frente a cobranzas abusivas y procedimientos de insolvencia. Recupera tu tranquilidad financiera.",
    },
  ];

  const grid = document.getElementById("areasGrid");
  areas.forEach((a, idx) => {
    const card = document.createElement("article");
    card.className = "area-card" + (idx === 0 ? " active" : "");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", idx === 0 ? "true" : "false");
    const slotSrc = a.img ? ` src="${a.img}"` : "";
    card.innerHTML = `
      <div class="area-thumb">
        <image-slot id="area-${idx}" shape="rounded" radius="20" fit="cover"${slotSrc} placeholder="Imagen del área"></image-slot>
        <span class="area-badge">${a.badge}</span>
      </div>
      <div class="area-foot">
        <span class="area-num">${a.n}</span>
        <div class="area-name">${a.name}</div>
        <div class="area-detail">
          <p>${a.desc}</p>
          <a href="${a.page}" class="area-link">Ver más sobre esta área
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </a>
        </div>
      </div>`;

    const activate = () => {
      grid.querySelectorAll(".area-card").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
      });
      card.classList.add("active");
      card.setAttribute("aria-expanded", "true");
    };
    card.addEventListener("mouseenter", activate);
    card.addEventListener("click", (e) => {
      // Let anchors inside handle themselves; everything else navigates in-tab
      if (e.target.closest("a")) return;
      window.location.href = a.page;
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = a.page;
      }
    });
    // Make card feel clickable
    card.style.cursor = "pointer";
    grid.appendChild(card);
  });

  /* ---------- VALORES: infinite marquee ticker ---------- */
  (function setupValoresTicker() {
    const track = document.getElementById("valoresTrack");
    if (!track || typeof gsap === "undefined") return;

    const originals = [...track.querySelectorAll(".valor")];
    if (!originals.length) return;

    // Duplicate cards twice to ensure seamless loop at any viewport width
    for (let s = 0; s < 2; s++) {
      originals.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    // One full set = 3 cards × (width + gap)
    const GAP  = 28; // matches CSS gap
    const setW = originals.length * (originals[0].offsetWidth + GAP);

    // Continuous horizontal scroll — repeat: -1 restarts from x=0
    // Clones look identical to originals so the jump is invisible
    const tween = gsap.to(track, {
      x: -setW,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover, resume on leave
    track.addEventListener("mouseenter", () => tween.pause());
    track.addEventListener("mouseleave", () => tween.resume());
  }());

  /* ---------- TESTIMONIALS: slider (kept for reference, section removed) ---------- */
  const _tTrackEl = document.getElementById("tTrack");
  if (_tTrackEl) { // guard: only run if the testimonial section exists
  const testimonials = [
    {
      text: "Me sentí acompañada en todo momento. Resolvieron mi caso de pensión con una claridad y cercanía que no esperaba.",
      name: "Valentina Rodríguez",
      role: "Cliente — Derecho de Familia",
      initials: "VR",
    },
    {
      text: "Tras un despido injustificado pensé que no tenía opciones. El equipo de Más Justicia logró un acuerdo que cambió mi situación.",
      name: "Martín Pereyra",
      role: "Cliente — Derecho Laboral",
      initials: "MP",
    },
    {
      text: "Profesionales, humanos y directos. Explicaron cada paso sin tecnicismos. Confianza total de principio a fin.",
      name: "Carolina Méndez",
      role: "Cliente — Derecho Civil",
      initials: "CM",
    },
    {
      text: "Defendieron mi caso con una estrategia impecable. Sentí que de verdad les importaba mi tranquilidad, no solo el expediente.",
      name: "Diego Fernández",
      role: "Cliente — Derecho Penal",
      initials: "DF",
    },
    {
      text: "La primera consulta sin costo me dio la confianza para avanzar. Hoy mi familia está mucho más tranquila.",
      name: "Lucía Sosa",
      role: "Cliente — Derecho de Familia",
      initials: "LS",
    },
  ];

  const track = document.getElementById("tTrack");
  testimonials.forEach((t) => {
    const card = document.createElement("article");
    card.className = "t-card";
    card.innerHTML = `
      <div class="t-quote-mark" aria-hidden="true">&ldquo;</div>
      <p class="t-text">${t.text}</p>
      <div class="t-person">
        <span class="t-avatar" aria-hidden="true">${t.initials}</span>
        <span>
          <span class="t-name" style="display:block">${t.name}</span>
          <span class="t-role">${t.role}</span>
        </span>
      </div>`;
    track.appendChild(card);
  });

  // inject star ratings into testimonial cards
  track.querySelectorAll(".t-card").forEach(card => {
    const stars = document.createElement("div");
    stars.className = "t-stars";
    stars.setAttribute("aria-label", "5 estrellas");
    const starSvg = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    stars.innerHTML = starSvg.repeat(5);
    card.insertBefore(stars, card.querySelector(".t-quote-mark"));
  });

  const dotsWrap = document.getElementById("tDots");
  let perView = 3;
  let index = 0;

  function computePerView() {
    const w = window.innerWidth;
    perView = w <= 760 ? 1 : w <= 1080 ? 2 : 3;
  }
  function maxIndex() {
    return Math.max(0, testimonials.length - perView);
  }
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Ir al testimonio " + (i + 1));
      b.addEventListener("click", () => { index = i; render(); });
      dotsWrap.appendChild(b);
    }
  }
  function render() {
    index = Math.min(index, maxIndex());
    const card = track.querySelector(".t-card");
    if (!card) return;
    const gap = 28;
    const step = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * step}px)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("on", i === index));
  }
  function setup() {
    computePerView();
    buildDots();
    render();
  }
  document.getElementById("tPrev").addEventListener("click", () => {
    index = index <= 0 ? maxIndex() : index - 1; render();
  });
  document.getElementById("tNext").addEventListener("click", () => {
    index = index >= maxIndex() ? 0 : index + 1; render();
  });
  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(setup, 150);
  });
  setup();
  // autoplay
  let auto = setInterval(() => {
    index = index >= maxIndex() ? 0 : index + 1; render();
  }, 6000);
  track.parentElement.addEventListener("mouseenter", () => clearInterval(auto));
  } // end testimonial guard

  /* ---------- CONSULT FORM: validation ---------- */
  const form = document.getElementById("consultForm");
  const success = document.getElementById("consultSuccess");

  function setInvalid(id, bad) {
    document.getElementById(id).classList.toggle("invalid", bad);
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const area = form.area.value;
    const msg = form.msg.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setInvalid("f-nombre", nombre.length < 2);
    setInvalid("f-email", !emailOk);
    setInvalid("f-area", !area);
    setInvalid("f-msg", msg.length < 5);

    if (nombre.length >= 2 && emailOk && area && msg.length >= 5) {
      form.style.display = "none";
      success.classList.add("show");
    }
  });
  // clear error on input
  ["nombre", "email", "area", "msg"].forEach((name) => {
    form[name].addEventListener("input", () => {
      document.getElementById("f-" + (name === "nombre" ? "nombre" : name)).classList.remove("invalid");
    });
  });

  /* ---------- REVEAL ON SCROLL (rAF scroll check — robust) ---------- */
  const revealEls = [...document.querySelectorAll(".reveal")];
  function checkReveal() {
    const vh = window.innerHeight;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      const top = el.getBoundingClientRect().top;
      if (top < vh - 60) {
        el.classList.add("in");
        revealEls.splice(i, 1);
      }
    }
  }
  window.addEventListener("scroll", checkReveal, { passive: true });
  window.addEventListener("resize", checkReveal);
  checkReveal();
  // safety: ensure nothing stays hidden if something goes sideways
  setTimeout(checkReveal, 300);
  window.addEventListener("load", checkReveal);
})();
