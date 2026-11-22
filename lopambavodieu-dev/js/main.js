(function () {
  const root = document.documentElement;
  root.classList.add("js");

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const get = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const ALL = typeof TRANSLATIONS !== "undefined" ? TRANSLATIONS : null;

  // Vanta.js NET : fond interactif discret
  let vantaEffect = null;
  function initVanta() {
    const el = document.getElementById("bits");
    if (reduce || !el || !window.VANTA || !window.VANTA.NET) return;
    if (vantaEffect) {
      vantaEffect.destroy();
      vantaEffect = null;
    }
    const isLight = root.getAttribute("data-theme") === "light";
    vantaEffect = window.VANTA.NET({
      el: "#bits",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      points: 12,
      maxDistance: 20,
      spacing: 18,
      color: 0x1d4ed8,
      backgroundColor: isLight ? 0xf4f6f9 : 0x0d1624
    });
  }

  // Thème sombre (par défaut) / clair
  let theme = get("theme", "dark");
  const themeBtn = document.getElementById("theme-btn");
  function applyTheme() {
    root.setAttribute("data-theme", theme);
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀" : "☾";
    initVanta();
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      set("theme", theme);
      applyTheme();
      themeBtn.classList.remove("spin");
      void themeBtn.offsetWidth;
      themeBtn.classList.add("spin");
    });
  }
  applyTheme();

  // Typed.js dans le Hero
  let typedInstance = null;
  const typedEl = document.getElementById("typed-role");
  function initTyped(currentLang) {
    if (!typedEl) return;
    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }
    const strings = currentLang === "en"
      ? ["Full Stack Developer", "Software Engineer"]
      : ["Développeur Full Stack", "Software Engineer"];
    if (reduce || typeof window.Typed === "undefined") {
      typedEl.textContent = strings[0];
      return;
    }
    typedEl.textContent = "";
    typedInstance = new window.Typed("#typed-role", {
      strings: strings,
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 2200,
      startDelay: 250,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|"
    });
  }

  // Langue FR / EN
  let lang = get("lang", "fr");
  const langBtn = document.getElementById("lang-btn");
  function applyLang() {
    root.lang = lang;
    root.classList.toggle("lang-en", lang === "en");
    if (ALL && ALL[lang]) {
      const dict = ALL[lang];
      document.querySelectorAll("[data-i18n]").forEach(el => {
        if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n];
      });
      if (themeBtn && dict["theme.label"]) themeBtn.setAttribute("aria-label", dict["theme.label"]);
      const titleKey = document.body.dataset.title;
      if (titleKey && dict[titleKey]) {
        document.title = titleKey === "nav.home"
          ? "Lopamba Vodieu Vodieu — Software Engineer"
          : dict[titleKey] + " | Lopamba Vodieu Vodieu";
      }
    }
    if (langBtn) langBtn.textContent = lang === "fr" ? "EN" : "FR";
    initTyped(lang);
  }
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      lang = lang === "fr" ? "en" : "fr";
      set("lang", lang);
      applyLang();
    });
  }
  applyLang();

  // Menu burger mobile
  const header = document.querySelector("header");
  const tools = document.querySelector(".tools");
  const mainNav = header ? header.querySelector("nav") : null;
  if (header && tools && mainNav) {
    mainNav.id = "main-nav";
    const menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.id = "menu-btn";
    menuBtn.className = "menu-btn";
    menuBtn.setAttribute("aria-label", "Menu");
    menuBtn.setAttribute("aria-controls", "main-nav");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = "<i></i><i></i><i></i>";
    tools.appendChild(menuBtn);
    const setMenu = open => {
      header.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("click", e => { if (!header.contains(e.target)) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });
  }

  // Apparition progressive du Hero et des sections au chargement / défilement
  const heroItems = document.querySelectorAll(".hero .role, .hero .hero-name, .hero .hero-typed, .hero .lead, .hero .btns, .hero > .photo");
  heroItems.forEach((el, i) => {
    el.classList.add("hero-anim");
    el.style.transitionDelay = i * 75 + "ms";
  });

  const scrollTargets = document.querySelectorAll(".page-title, .intro, .home-list h2, .block h2, .row, .item, .tech-card, form, .social");
  scrollTargets.forEach(el => {
    el.classList.add("reveal");
    const i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.transitionDelay = Math.min(i, 5) * 65 + "ms";
  });

  function startAnimations() {
    heroItems.forEach(el => el.classList.add("in"));
    if (!("IntersectionObserver" in window)) {
      scrollTargets.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    scrollTargets.forEach(el => io.observe(el));
  }

  const wait = reduce
    ? 0
    : root.classList.contains("skip-loader")
      ? (root.classList.contains("entering") ? 350 : 40)
      : 1250;
  setTimeout(startAnimations, wait);

  // Transition de page sobre
  window.addEventListener("pageshow", e => { if (e.persisted) root.classList.remove("leaving"); });
  if (!reduce) {
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      let url;
      try { url = new URL(a.href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      e.preventDefault();
      try { sessionStorage.setItem("pt", "1"); } catch (err) {}
      root.classList.add("leaving");
      setTimeout(() => { window.location.href = a.href; }, 380);
    });
  }

  // Formulaire de contact (prêt à relier au backend Django)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const status = document.getElementById("status");
      if (status) status.textContent = ALL ? ALL[lang]["form.ok"] : "Merci !";
      form.reset();
    });
  }
})();