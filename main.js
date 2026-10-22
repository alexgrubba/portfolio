(function () {
  function initApp() {
    const hasFinePointer = !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches);
    const cursor = hasFinePointer ? document.getElementById("cursor") : null;
    if (cursor) {
      let isVisible = false;
      const interactiveSelector = "a, button, .btn, .projekt, .usluga, .service-row, .inne-item, .kafelek, .foto-cell, input, textarea, select, [role='button'], .nav-hamburger, .tool-row, .ig-post, .ig-follow-btn, .ig-main-link-btn, .ig-modal-close, .ig-modal-ig-link, label, summary, .hero-scroll";

      window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        if (!isVisible) {
          cursor.classList.add("visible");
          cursor.style.opacity = "1";
          isVisible = true;
        }
        if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
          cursor.classList.add("grow");
        } else {
          cursor.classList.remove("grow");
        }
      }, { passive: true });

      document.addEventListener("mouseleave", () => {
        cursor.classList.remove("visible");
        cursor.classList.remove("grow");
        cursor.style.opacity = "0";
        isVisible = false;
      });

      document.addEventListener("mouseenter", () => {
        cursor.classList.add("visible");
        cursor.style.opacity = "1";
        isVisible = true;
      });
    }

    const hamburger = document.getElementById("nav-hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
      const closeMenu = () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      };

      const openMenu = () => {
        hamburger.classList.add("open");
        navLinks.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      };

      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains("open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      navLinks.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          closeMenu();
        });
      });

      document.addEventListener("click", (e) => {
        if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          closeMenu();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
          closeMenu();
        }
      });
    }

    const ipLightbox = document.getElementById("ip-lightbox");
    const ipLightboxImg = document.getElementById("ip-lightbox-img");
    const ipClose = document.getElementById("ip-lightbox-close");

    const ipLightboxCaption = document.getElementById("ip-lightbox-caption");

    if (ipLightbox && ipLightboxImg) {
      const openLightbox = (imgSrc, imgAlt) => {
        if (!imgSrc) return;
        ipLightboxImg.src = imgSrc;
        if (ipLightboxCaption) {
          ipLightboxCaption.textContent = imgAlt || "";
        }
        ipLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      };

      document.querySelectorAll(".inne-card-media, .cs-card-frame, .inne-item, .inne-card").forEach((item) => {
        item.addEventListener("click", (e) => {
          if (item.closest("a.inne-card-link") || e.target.closest("a.inne-card-link")) {
            return;
          }

          if (e.target.closest("a") && !e.target.closest(".cs-card-frame, .inne-card-media")) {
            return;
          }
          const img = item.querySelector("img") || (item.tagName === "IMG" ? item : null);
          if (img) {
            e.preventDefault();
            openLightbox(img.src, img.alt);
          }
        });
      });

      if (ipClose) {
        ipClose.addEventListener("click", () => {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
          if (ipLightboxCaption) ipLightboxCaption.textContent = "";
        });
      }

      ipLightbox.addEventListener("click", (e) => {
        if (e.target === ipLightbox) {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
          if (ipLightboxCaption) ipLightboxCaption.textContent = "";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && ipLightbox.classList.contains("active")) {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
          if (ipLightboxCaption) ipLightboxCaption.textContent = "";
        }
      });
    }

    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      if (!("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("visible"));
      } else {
        const ro = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                ro.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => ro.observe(el));
      }
    }

    const b1 = hasFinePointer ? document.querySelector(".blob-1") : null;
    const b2 = hasFinePointer ? document.querySelector(".blob-2") : null;
    if (b1 && b2) {
      window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        b1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        b2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
      }, { passive: true });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id === "#") return;
        try {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } catch (err) {}
      });
    });

    const nav = document.querySelector("nav");
    if (nav) {
      let lastScroll = 0;
      window.addEventListener(
        "scroll",
        () => {
          const current = window.scrollY;
          if (current > 60) {
            nav.style.background = "rgba(9, 9, 13, 0.9)";
            nav.style.backdropFilter = "blur(12px)";
            nav.style.webkitBackdropFilter = "blur(12px)";
            nav.style.borderBottom = "1px solid var(--border)";
            nav.style.top = "0px";
          } else {
            nav.style.background = "";
            nav.style.backdropFilter = "";
            nav.style.borderBottom = "";
            nav.style.top = "0px";
          }

          // Navbar is permanently sticky and never hides
          nav.classList.remove("hidden");
          lastScroll = current;
        },
        { passive: true }
      );
    }

    const toolRows = document.querySelectorAll(".tool-row");
    if (toolRows.length && "IntersectionObserver" in window) {
      const rowObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const row = entry.target;
              const level = parseFloat(row.dataset.level) / 95;
              row.style.setProperty("--scale", level);
              row.classList.add("animate");
              rowObs.unobserve(row);
            }
          });
        },
        { threshold: 0.3 }
      );

      toolRows.forEach((row) => rowObs.observe(row));
    }

    document.querySelectorAll(".projekt").forEach((p) => {
      p.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.97)";
        this.style.transition = "transform 0.1s";
      }, { passive: true });
      p.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
      });
    });

    initEditorialServices();
    initHeroScatter();
    initHeroBgField();
    initHeroPixelTitle();
    initHeroTypewriter();
    initHeroDtpArtboard();
    initPrepressSimulator();
    initContactTerminal();
    initContactTypewriter();
    initNavScrollspy();
    initPortfolioExpanders();
  }
  function initPortfolioExpanders() {
    const expandBtns = document.querySelectorAll(".sektor-expand-btn");
    if (!expandBtns.length) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sparkColors = ["#FCEE09", "#00FF9D", "#FFFFFF", "#B8FFD8", "#F4F4F6"];

    function spawnHoverSpark(e) {
      if (isReduced) return;
      const spark = document.createElement("div");
      spark.className = "netrunner-spark-particle";
      const size = Math.random() > 0.6 ? 3 : 2;
      const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      
      const x = e.clientX + (Math.random() - 0.5) * 18;
      const y = e.clientY + (Math.random() - 0.5) * 18;
      
      spark.style.width = size + "px";
      spark.style.height = size + "px";
      spark.style.backgroundColor = color;
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.boxShadow = `0 0 6px ${color}`;
      document.body.appendChild(spark);

      let vx = (Math.random() - 0.5) * 3;
      let vy = -Math.random() * 2.2 - 0.8;
      let life = 1.0;
      let decay = 0.045 + Math.random() * 0.035;
      let curX = x;
      let curY = y;

      function animSpark() {
        life -= decay;
        if (life <= 0) {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
          return;
        }
        curX += vx;
        curY += vy;
        spark.style.transform = `translate(${curX - x}px, ${curY - y}px)`;
        spark.style.opacity = life;
        requestAnimationFrame(animSpark);
      }
      requestAnimationFrame(animSpark);
    }

    expandBtns.forEach((btn) => {
      const labelSpan = btn.querySelector(".expand-label");
      if (labelSpan && !btn.hasAttribute("data-original-text")) {
        btn.setAttribute("data-original-text", labelSpan.textContent.trim());
      }

      let lastSpark = 0;
      btn.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastSpark > 35) {
          lastSpark = now;
          spawnHoverSpark(e);
        }
      });

      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const newExpanded = !isExpanded;

        btn.setAttribute("aria-expanded", String(newExpanded));

        const isEn = document.documentElement.lang === "en" || window.location.pathname.startsWith("/en");
        const lbl = btn.querySelector(".expand-label");
        const marker = btn.querySelector(".cp-quest-marker");

        if (newExpanded) {
          target.classList.add("is-expanded");
          if (typeof triggerBudgetConfetti === "function") {
            triggerBudgetConfetti(btn);
          }
          if (lbl) {
            lbl.textContent = isEn ? "Collapse remaining projects" : "Zwiń pozostałe realizacje";
          }
          if (marker) {
            marker.textContent = "✓";
            marker.style.background = "#00FF9D";
            marker.style.boxShadow = "0 0 12px rgba(0, 255, 157, 0.85)";
          }
        } else {
          target.classList.remove("is-expanded");
          const orig = btn.getAttribute("data-original-text");
          if (lbl && orig) lbl.textContent = orig;
          if (marker) {
            marker.textContent = "!";
            marker.style.background = "#FCEE09";
            marker.style.boxShadow = "0 0 10px rgba(252, 238, 9, 0.75)";
          }
        }
      });
    });
  }


  function initContactTypewriter() {
    const textEl = document.getElementById("contact-slogan-text");
    const contactSection = document.getElementById("kontakt");
    if (!textEl || !contactSection) return;

    const cursorEl = contactSection.querySelector(".contact-typewriter-cursor");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (cursorEl) cursorEl.classList.add("is-hidden");
      return;
    }

    const fullText = textEl.textContent.trim();
    if (!fullText) return;

    let hasStarted = false;

    function startTyping() {
      if (hasStarted) return;
      hasStarted = true;

      textEl.textContent = "";
      let charIndex = 0;

      function typeChar() {
        charIndex++;
        textEl.textContent = fullText.substring(0, charIndex);

        if (charIndex < fullText.length) {
          const delay = 24 + Math.floor(Math.random() * 16);
          setTimeout(typeChar, delay);
        } else {
          // Finished typing! Let cursor blink for ~1.5s then fade out gracefully
          if (cursorEl) {
            setTimeout(() => {
              cursorEl.classList.add("is-hidden");
            }, 1500);
          }
        }
      }

      setTimeout(typeChar, 250);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      observer.observe(contactSection);
    } else {
      setTimeout(startTyping, 1000);
    }
  }


  function triggerBudgetConfetti(pill) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = pill.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = ["#FFFFFF", "#00FF9D", "#B8FFD8", "#FCEE09"];
    const particleCount = 14;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement("div");
      el.className = "pixel-confetti-particle";
      const size = Math.random() > 0.5 ? 4 : 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.style.position = "fixed";
      el.style.pointerEvents = "none";
      el.style.zIndex = "999999";
      el.style.imageRendering = "pixelated";
      el.style.borderRadius = "0";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.backgroundColor = color;
      el.style.boxShadow = `0 0 6px ${color}`;
      el.style.left = originX + "px";
      el.style.top = originY + "px";
      document.body.appendChild(el);

      const angle = (Math.PI * 2 * (i / particleCount)) + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 4 + 2.5;

      particles.push({
        el: el,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        life: 1.0,
        decay: 0.032 + Math.random() * 0.018
      });
    }

    function animateConfetti() {
      let alive = false;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life > 0) {
          alive = true;
          p.vy += 0.22;
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;

          p.el.style.transform = `translate(${p.x - originX}px, ${p.y - originY}px)`;
          p.el.style.opacity = Math.max(0, p.life);
        } else if (p.el && p.el.parentNode) {
          p.el.parentNode.removeChild(p.el);
          p.el = null;
        }
      }

      if (alive) {
        requestAnimationFrame(animateConfetti);
      }
    }

    requestAnimationFrame(animateConfetti);
  }


  function initNavScrollspy() {
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
    const isHomePage = currentPath === "/" || currentPath === "" || currentPath === "/en/" || currentPath === "/en";
    const isPortfolioPage = currentPath.includes("/portfolio");
    const hasSections = !!(document.getElementById("kontakt") && document.getElementById("projekty"));

    if (isHomePage || hasSections) {
      const sectionConfigs = [
        {
          id: "hero",
          matcher: (a) => {
            const h = a.getAttribute("href") || "";
            if (isPortfolioPage) {
              return h === "#projekty" || h.includes("portfolio");
            }
            return h === "#hero" || h === "/" || h === "/en/";
          }
        },
        {
          id: "projekty",
          matcher: (a) => {
            const h = a.getAttribute("href") || "";
            const t = a.textContent.trim().toLowerCase();
            return h === "#projekty" || t === "portfolio" || h.includes("portfolio");
          }
        },
        {
          id: "uslugi",
          matcher: (a) => {
            const h = a.getAttribute("href") || "";
            const t = a.textContent.trim().toLowerCase();
            return h === "#uslugi" || h.includes("#uslugi") || t === "oferta" || t === "offer";
          }
        },
        {
          id: "kontakt",
          matcher: (a) => {
            const h = a.getAttribute("href") || "";
            const t = a.textContent.trim().toLowerCase();
            return h === "#kontakt" || h.includes("#kontakt") || t === "kontakt" || t === "contact";
          }
        }
      ];

      const sections = sectionConfigs
        .map((cfg) => {
          const el = document.getElementById(cfg.id);
          const link = Array.from(navLinks).find(cfg.matcher);
          return el && link ? { el, link, id: cfg.id } : null;
        })
        .filter(Boolean);

      if (!sections.length) return;

      let ticking = false;

      function updateActive() {
        const scrollPos = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        let activeSection = null;

        if (scrollPos + windowHeight >= docHeight - 80) {
          activeSection = sections.find((s) => s.id === "kontakt") || sections[sections.length - 1];
        } else {
          const triggerLine = Math.min(240, windowHeight * 0.35);
          for (let i = sections.length - 1; i >= 0; i--) {
            const rect = sections[i].el.getBoundingClientRect();
            if (rect.top <= triggerLine) {
              activeSection = sections[i];
              break;
            }
          }
        }

        if (!activeSection && scrollPos < 300) {
          activeSection = sections[0];
        }

        navLinks.forEach((a) => a.classList.remove("active"));
        if (activeSection && activeSection.link) {
          activeSection.link.classList.add("active");
        }
        ticking = false;
      }

      function onScroll() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateActive);
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      if ("requestAnimationFrame" in window) {
        requestAnimationFrame(updateActive);
      } else {
        setTimeout(updateActive, 100);
      }
    } else {
      navLinks.forEach((a) => {
        const text = a.textContent.trim().toLowerCase();
        const href = a.getAttribute("href") || "";
        if (currentPath.includes("/portfolio") && (text === "portfolio" || href.includes("portfolio"))) {
          a.classList.add("active");
        } else if (currentPath.includes("/ai-corner") && text.includes("ai corner")) {
          a.classList.add("active");
        } else if (currentPath.includes("/cv") && (text.includes("o mnie") || text.includes("about"))) {
          a.classList.add("active");
        } else if (
          (currentPath.includes("/strategia") ||
           currentPath.includes("/identyfikacja") ||
           currentPath.includes("/ui-ux") ||
           currentPath.includes("/web-development")) &&
          (text.includes("oferta") || text.includes("offer"))
        ) {
          a.classList.add("active");
        }
      });
    }
  }

  function initHeroBgField() {
    const canvas = document.getElementById("hero-bg-canvas");
    const hero = document.getElementById("hero");
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isVisible = true;
    let mx = -9999;
    let my = -9999;
    let lastSparkX = -9999;
    let lastSparkY = -9999;

    let ambientDust = [];
    let ditherPixels = [];
    const activeSparks = [];

    function setupDimensions() {
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      buildDitherAndDust();
    }

    function buildDitherAndDust() {
      // 1. Ambient dust particles
      const dustCount = Math.min(55, Math.max(30, Math.floor(width / 24)));
      ambientDust = [];
      for (let i = 0; i < dustCount; i++) {
        ambientDust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.35 - 0.08,
          size: Math.random() > 0.65 ? 3 : 2,
          baseAlpha: Math.random() * 0.22 + 0.12,
          alpha: 0.2,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? "#00FF9D" : "#00DF9A"
        });
      }

      // 2. Corner dither clusters (Omarchy Bayer matrix style)
      ditherPixels = [];
      const step = 9;
      const cornerW = Math.min(220, Math.floor(width * 0.22));
      const cornerH = Math.min(180, Math.floor(height * 0.35));

      // Bayer 4x4 threshold matrix
      const bayer4 = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
      ];

      function addCornerDither(originX, originY, signX, signY) {
        for (let gx = 0; gx < cornerW; gx += step) {
          for (let gy = 0; gy < cornerH; gy += step) {
            const bx = Math.floor(gx / step) % 4;
            const by = Math.floor(gy / step) % 4;
            const threshold = bayer4[by][bx] / 16;

            const distRatio = Math.hypot(gx / cornerW, gy / cornerH);
            if (distRatio < 1.0 && (1 - distRatio) > threshold * 0.7) {
              const px = signX > 0 ? originX + gx : originX - gx;
              const py = signY > 0 ? originY + gy : originY - gy;
              const alpha = Math.max(0.08, Math.min(0.28, (1 - distRatio) * 0.35));
              ditherPixels.push({
                x: px,
                y: py,
                ox: px,
                oy: py,
                size: 2.5,
                alpha: alpha,
                phase: Math.random() * Math.PI * 2,
                color: distRatio < 0.5 ? "#00FF9D" : "#0A3824"
              });
            }
          }
        }
      }

      // Bottom-left and bottom-right corners (most prominent in Omarchy)
      addCornerDither(16, height - 16, 1, -1);
      addCornerDither(width - 16, height - 16, -1, -1);
      // Subtle top corners
      if (width > 600) {
        addCornerDither(24, 24, 1, 1);
        addCornerDither(width - 24, 24, -1, 1);
      }
    }

    function spawnMicroBurst(cx, cy) {
      const count = 18 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 2;
        activeSparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() > 0.5 ? 3 : 2,
          alpha: 0.95,
          color: Math.random() > 0.4 ? "#B8FFD8" : "#00FF9D",
          decay: 0.022 + Math.random() * 0.018
        });
      }
    }

    function addTrailSpark(x, y) {
      activeSparks.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: 2,
        alpha: 0.75,
        color: Math.random() > 0.5 ? "#B8FFD8" : "#00FF9D",
        decay: 0.038
      });
    }

    let time = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      time += 0.02;

      // 1. Draw static / subtle breathing dither corners
      for (let i = 0; i < ditherPixels.length; i++) {
        const dp = ditherPixels[i];
        const pulse = Math.sin(time + dp.phase) * 0.04;
        ctx.fillStyle = dp.color;
        ctx.globalAlpha = Math.max(0.04, dp.alpha + pulse);
        ctx.fillRect(Math.round(dp.x), Math.round(dp.y), dp.size, dp.size);
      }

      // 2. Update and draw ambient floating dust
      for (let i = 0; i < ambientDust.length; i++) {
        const p = ambientDust[i];

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 85 && dist > 0) {
          const push = ((85 - dist) / 85) * 2.2;
          p.vx += (dx / dist) * push;
          p.vy += (dy / dist) * push;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy - 0.18; // gentle float upward

        // Wrap around hero edges
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alphaPulse = Math.sin(time + p.phase) * 0.08;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, p.baseAlpha + alphaPulse);
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }

      // 3. Update and draw active sparks (bursts & trail)
      for (let i = activeSparks.length - 1; i >= 0; i--) {
        const s = activeSparks[i];
        s.vx *= 0.93;
        s.vy *= 0.93;
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0.01) {
          activeSparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      }

      ctx.restore();

      if (!isReduced && isVisible) {
        animId = requestAnimationFrame(render);
      }
    }

    // Events on hero section
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;

      const distMoved = Math.hypot(mx - lastSparkX, my - lastSparkY);
      if (distMoved > 28) {
        addTrailSpark(mx, my);
        lastSparkX = mx;
        lastSparkY = my;
      }
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      mx = -9999;
      my = -9999;
    });

    hero.addEventListener("pointerdown", (e) => {
      // Don't intercept title canvas or interactive elements
      if (e.target && (e.target.id === "hero-pixel-canvas" || e.target.closest("a, button, input"))) {
        return;
      }
      const rect = hero.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      spawnMicroBurst(cx, cy);
    });

    // Observer: pause RAF when scrolled away from Hero
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animId && !isReduced) animId = requestAnimationFrame(render);
        } else {
          if (animId) cancelAnimationFrame(animId);
          animId = null;
        }
      }, { threshold: 0.02 });
      observer.observe(hero);
    }

    // Window resize
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupDimensions();
        if (isReduced) render();
      }, 150);
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
      } else {
        if (!animId && !isReduced && isVisible) animId = requestAnimationFrame(render);
      }
    });

    setupDimensions();
    render();
  }

  function initHeroPixelTitle() {
    const canvas = document.getElementById("hero-pixel-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 4-tier Cyber-Mint vertical shading (Omarchy style)
    const COLOR_CREST = "#B8FFD8";
    const COLOR_LIT   = "#00FF9D";
    const COLOR_MID   = "#00B36B";
    const COLOR_DIM   = "#0A3824";

    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isHovered = false;
    let mouseX = -9999;
    let mouseY = -9999;
    let clickMode = 0;
    let idleTimer = null;

    let isLaserBuilding = !isReduced;
    let laserX = 0;
    let laserSpeed = 16;
    const laserSparks = [];

    let flashIntensity = 0;
    let glitchFrames = 0;
    let vortexFrames = 0;
    let vortexCenter = { x: 0, y: 0 };
    let crumbleActive = false;

    function resizeAndSample() {
      const parent = canvas.parentElement || canvas.parentNode;
      const parentWidth = parent ? parent.clientWidth : window.innerWidth;

      const isMobile = parentWidth < 540;
      width = Math.min(1060, Math.max(300, parentWidth));
      height = isMobile ? 170 : 124;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.fillStyle = "#FFFFFF";
      offCtx.textBaseline = "middle";
      offCtx.textAlign = "center";

      const gap = isMobile ? 5 : 6;
      const pxSize = gap - 1;

      if (isMobile) {
        const fontSize = Math.floor(width * 0.20);
        offCtx.font = "900 " + fontSize + "px 'Inter Tight', sans-serif";
        offCtx.fillText("ALEX", width / 2, height * 0.31);
        offCtx.fillText("AGENCY", width / 2, height * 0.73);
      } else {
        const fontSize = Math.min(108, Math.floor(width * 0.12));
        offCtx.font = "900 " + fontSize + "px 'Inter Tight', sans-serif";
        offCtx.fillText("ALEX AGENCY", width / 2, height / 2);
      }

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let minY = height, maxY = 0;
      const rawPoints = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const idx = (y * width + x) * 4;
          if (data[idx + 3] > 128) {
            rawPoints.push({ x, y });
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const spanY = Math.max(1, maxY - minY);

      particles = rawPoints.map((pt) => {
        const relY = (pt.y - minY) / spanY;
        let col = COLOR_DIM;
        if (relY <= 0.25) col = COLOR_CREST;
        else if (relY <= 0.50) col = COLOR_LIT;
        else if (relY <= 0.75) col = COLOR_MID;

        return {
          x: pt.x,
          y: pt.y,
          ox: pt.x,
          oy: pt.y,
          vx: 0,
          vy: 0,
          color: col,
          size: pxSize,
          revealed: !isLaserBuilding,
          delay: 0
        };
      });

      if (isLaserBuilding) {
        laserX = 0;
        laserSpeed = Math.max(12, Math.floor(width / 52));
      }
    }

    function startLaserBuild() {
      isLaserBuilding = true;
      laserX = 0;
      laserSpeed = Math.max(12, Math.floor(width / 52));
      for (let i = 0; i < particles.length; i++) {
        particles[i].revealed = false;
        particles[i].x = particles[i].ox;
        particles[i].y = particles[i].oy;
        particles[i].vx = 0;
        particles[i].vy = 0;
      }
    }

    function triggerEffect(cx, cy, mode) {
      if (!particles.length) return;

      if (mode === 0) {
        flashIntensity = 1.0;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.vx += (Math.random() - 0.5) * 3;
          p.vy += (Math.random() - 0.5) * 3;
        }
      } else if (mode === 1) {
        startLaserBuild();
      } else if (mode === 2) {
        vortexCenter = { x: cx, y: cy };
        vortexFrames = 55;
      } else if (mode === 3) {
        glitchFrames = 30;
      } else if (mode === 4) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const force = (Math.random() * 15 + 8) * Math.min(2.5, 320 / (dist + 35));
          p.vx += (dx / dist) * force + (Math.random() - 0.5) * 6;
          p.vy += (dy / dist) * force + (Math.random() - 0.5) * 6;
        }
      } else if (mode === 5) {
        crumbleActive = true;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.delay = Math.floor(Math.random() * 16) + Math.floor((p.ox % 50) / 4);
          p.vy = Math.random() * 5 + 2;
          p.vx = (Math.random() - 0.5) * 4;
        }
        setTimeout(() => {
          crumbleActive = false;
        }, 750);
      }
    }

    function triggerAmbientSparks() {
      if (!particles.length || document.hidden || isHovered || isLaserBuilding) return;
      const count = 8 + Math.floor(Math.random() * 8);
      for (let k = 0; k < count; k++) {
        const idx = Math.floor(Math.random() * particles.length);
        const p = particles[idx];
        p.vy = -(Math.random() * 3.5 + 1.5);
        p.vx = (Math.random() - 0.5) * 2.5;
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      if (isLaserBuilding) {
        laserX += laserSpeed;

        let newlyRevealed = 0;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p.revealed && p.ox <= laserX) {
            p.revealed = true;
            newlyRevealed++;
          }
        }

        if (newlyRevealed > 0 || Math.random() > 0.4) {
          laserSparks.push({
            x: laserX,
            y: Math.random() * height,
            vx: -Math.random() * 4 - 1,
            vy: (Math.random() - 0.5) * 5,
            size: 2.5,
            alpha: 1,
            color: Math.random() > 0.5 ? "#FFFFFF" : "#B8FFD8"
          });
        }

        const beamGrad = ctx.createLinearGradient(0, 0, 0, height);
        beamGrad.addColorStop(0, "rgba(0, 255, 157, 0)");
        beamGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
        beamGrad.addColorStop(1, "rgba(0, 255, 157, 0)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(Math.round(laserX - 1.5), 0, 3, height);

        ctx.fillStyle = "rgba(0, 255, 157, 0.15)";
        ctx.fillRect(Math.round(laserX - 8), 0, 16, height);

        if (laserX >= width + 40) {
          isLaserBuilding = false;
          for (let i = 0; i < particles.length; i++) {
            particles[i].revealed = true;
          }
        }
      }

      if (flashIntensity > 0.01) {
        flashIntensity *= 0.88;
      } else {
        flashIntensity = 0;
      }

      if (vortexFrames > 0) {
        vortexFrames--;
        const isRelease = vortexFrames <= 12;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - vortexCenter.x;
          const dy = p.y - vortexCenter.y;
          const dist = Math.hypot(dx, dy) || 1;

          if (isRelease) {
            p.vx += (dx / dist) * 7 + (Math.random() - 0.5) * 4;
            p.vy += (dy / dist) * 7 + (Math.random() - 0.5) * 4;
          } else {
            const angle = Math.atan2(dy, dx) + 0.22;
            const targetR = Math.max(10, dist * 0.92);
            const targetX = vortexCenter.x + Math.cos(angle) * targetR;
            const targetY = vortexCenter.y + Math.sin(angle) * targetR;
            p.vx = (targetX - p.x) * 0.28;
            p.vy = (targetY - p.y) * 0.28;
          }
        }
      }

      let glitchJitter = 0;
      if (glitchFrames > 0) {
        glitchFrames--;
        glitchJitter = (glitchFrames / 30) * 14;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.revealed) continue;

        if (crumbleActive) {
          if (p.delay > 0) {
            p.delay--;
          } else {
            p.vy += 0.55;
            p.x += p.vx;
            p.y += p.vy;
            if (p.y >= height - p.size) {
              p.y = height - p.size;
              p.vy = -p.vy * 0.35;
              p.vx *= 0.85;
            }
          }
        } else if (vortexFrames === 0) {
          p.vx *= 0.90;
          p.vy *= 0.90;

          const homeX = p.ox - p.x;
          const homeY = p.oy - p.y;
          p.x += homeX * 0.088 + p.vx;
          p.y += homeY * 0.088 + p.vy;

          if (isHovered) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 45 && mdist > 0) {
              const push = ((45 - mdist) / 45) * 4;
              p.vx += (mdx / mdist) * push;
              p.vy += (mdy / mdist) * push;
            }
          }
        }

        let drawX = p.x;
        let drawY = p.y;
        if (glitchJitter > 0 && Math.random() > 0.4) {
          drawX += (Math.random() - 0.5) * glitchJitter;
          drawY += (Math.random() - 0.5) * (glitchJitter * 0.4);
        }

        let drawColor = p.color;
        let drawSize = p.size;
        if (flashIntensity > 0.05) {
          drawColor = Math.random() > 0.3 ? "#FFFFFF" : p.color;
          drawSize = p.size + flashIntensity * 2;
        } else if (glitchJitter > 0 && Math.random() > 0.85) {
          drawColor = "#FFFFFF";
        }

        ctx.fillStyle = drawColor;
        ctx.fillRect(Math.round(drawX), Math.round(drawY), Math.round(drawSize), Math.round(drawSize));
      }

      for (let s = laserSparks.length - 1; s >= 0; s--) {
        const sp = laserSparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.045;
        if (sp.alpha <= 0) {
          laserSparks.splice(s, 1);
          continue;
        }
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fillRect(Math.round(sp.x), Math.round(sp.y), sp.size, sp.size);
      }
      ctx.globalAlpha = 1;

      ctx.restore();

      if (!isReduced) {
        animId = requestAnimationFrame(render);
      }
    }

    canvas.addEventListener("pointerdown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;
      triggerEffect(cx, cy, clickMode);
      clickMode = (clickMode + 1) % 6;
    });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
      isHovered = true;
    });

    canvas.addEventListener("pointerleave", () => {
      isHovered = false;
      mouseX = -9999;
      mouseY = -9999;
    });

    idleTimer = setInterval(triggerAmbientSparks, 3600);

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeAndSample();
        if (isReduced) render();
      }, 150);
    }, { passive: true });

    resizeAndSample();
    render();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        resizeAndSample();
        if (isReduced) render();
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
      } else {
        if (!animId && !isReduced) animId = requestAnimationFrame(render);
      }
    });
  }


  function initHeroTypewriter() {
    const textEl = document.getElementById("hero-typewriter");
    if (!textEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isEn = document.documentElement.lang === "en" || window.location.pathname.startsWith("/en");

    const phrases = isEn
      ? [
          "brand identities.",
          "high-performance websites.",
          "DTP publications & print.",
          "digital UI/UX systems.",
          "print & web design."
        ]
      : [
          "tożsamości marek.",
          "wydajne strony WWW.",
          "publikacje i skład DTP.",
          "systemy cyfrowe UI/UX.",
          "projekty do druku i sieci."
        ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = false;
    let timer = null;

    if (!textEl.textContent.trim()) {
      textEl.textContent = phrases[0];
    }

    function tick() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        textEl.textContent = current.substring(0, charIndex);

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 420);
          return;
        }

        timer = setTimeout(tick, 30);
      } else {
        charIndex++;
        textEl.textContent = current.substring(0, charIndex);

        if (charIndex >= current.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }

        const delay = 50 + Math.floor(Math.random() * 25);
        timer = setTimeout(tick, delay);
      }
    }

    timer = setTimeout(() => {
      isDeleting = true;
      tick();
    }, 2200);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (timer) clearTimeout(timer);
      } else {
        if (timer) clearTimeout(timer);
        timer = setTimeout(tick, 500);
      }
    });
  }

    function initEditorialServices() {
      const serviceRows = document.querySelectorAll(".service-row");
      if (!serviceRows.length) return;

      serviceRows.forEach((row) => {
        const toggle = () => {
          const isOpen = row.classList.contains("open");
          serviceRows.forEach((r) => {
            if (r !== row) {
              r.classList.remove("open");
              r.setAttribute("aria-expanded", "false");
            }
          });
          if (isOpen) {
            row.classList.remove("open");
            row.setAttribute("aria-expanded", "false");
          } else {
            row.classList.add("open");
            row.setAttribute("aria-expanded", "true");
          }
        };

        row.addEventListener("click", toggle);
        row.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        });
      });
    }

    function initHeroDtpArtboard() {
      const showcase = document.getElementById("hero-showcase") || document.getElementById("dtp-hero-artboard");
      if (!showcase) return;

      const tabs = showcase.querySelectorAll(".showcase-tab-btn, .dtp-tab-btn");
      const slides = showcase.querySelectorAll(".showcase-slide, .dtp-preview-slide");

      function setActiveTab(targetNum) {
        tabs.forEach((t) => {
          t.classList.toggle("active", t.dataset.target === targetNum);
        });
        slides.forEach((s) => {
          const isActive = s.dataset.project === targetNum;
          s.classList.toggle("active", isActive);
        });
      }

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          setActiveTab(tab.dataset.target);
        });
      });

      let autoTimer = null;
      let currentIdx = 0;
      const projectCodes = ["01", "02", "03"];

      function startCycle() {
        stopCycle();
        autoTimer = setInterval(() => {
          currentIdx = (currentIdx + 1) % projectCodes.length;
          setActiveTab(projectCodes[currentIdx]);
        }, 6000);
      }

      function stopCycle() {
        if (autoTimer) clearInterval(autoTimer);
      }

      showcase.addEventListener("mouseenter", stopCycle);
      showcase.addEventListener("mouseleave", startCycle);
      startCycle();
    }

    function initPrepressSimulator() {
      const sim = document.getElementById("prepress-sim");
      if (!sim) return;

      const buttons = sim.querySelectorAll(".sim-toggle-btn");
      const bleedGuide = document.getElementById("sim-guide-bleed");
      const dielineGuide = document.getElementById("sim-guide-dieline");
      const spotuvGuide = document.getElementById("sim-guide-spotuv");
      const cmykInd = document.getElementById("sim-cmyk-ind");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const layer = btn.dataset.layer;
          const isActive = btn.classList.toggle("active");

          if (layer === "bleed" && bleedGuide) {
            bleedGuide.classList.toggle("active", isActive);
          } else if (layer === "dieline" && dielineGuide) {
            dielineGuide.classList.toggle("active", isActive);
          } else if (layer === "spotuv" && spotuvGuide) {
            spotuvGuide.classList.toggle("active", isActive);
          } else if (layer === "cmyk" && cmykInd) {
            cmykInd.style.opacity = isActive ? "1" : "0.2";
          }
        });
      });
    }

    function initContactTerminal() {
      const form = document.getElementById("b2b-contact-form");
      const selector = document.getElementById("scope-selector");
      const packageInput = document.getElementById("selected-package");
      const statusBox = document.getElementById("contact-form-status");

      if (selector) {
        const pills = selector.querySelectorAll(".scope-pill-btn");
        pills.forEach((pill) => {
          pill.addEventListener("click", () => {
            pills.forEach((p) => {
              p.classList.remove("active");
              const mark = p.querySelector(".scope-mark");
              if (mark) mark.textContent = "+";
            });
            pill.classList.add("active");
            const mark = pill.querySelector(".scope-mark");
            if (mark) mark.textContent = "✓";
            if (packageInput) {
              packageInput.value = pill.dataset.subject || pill.textContent.trim();
            }
          });
        });
      }

      document.querySelectorAll(".btn-package, a[href='#kontakt'], a[href='/#kontakt']").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const href = btn.getAttribute("href");
          if (href === "#kontakt" || href === "/#kontakt") {
            const contactSection = document.getElementById("kontakt");
            if (contactSection) {
              e.preventDefault();
              contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
              const nameInput = document.getElementById("contact-name");
              if (nameInput) {
                setTimeout(() => nameInput.focus(), 600);
              }
            }
          }
        });
      });

      const nameInput = document.getElementById("contact-name");
      const infoInput = document.getElementById("contact-info");
      const msgInput = document.getElementById("contact-message");
      const consentInput = document.getElementById("contact-consent");
      const budgetHidden = document.getElementById("selected-budget");
      const budgetPills = document.querySelectorAll(".budget-pill-btn");

      const wrapName = document.getElementById("field-name-wrap");
      const wrapInfo = document.getElementById("field-info-wrap");
      const wrapMsg = document.getElementById("field-message-wrap");
      const wrapConsent = document.getElementById("field-consent-wrap");
      const wrapRecaptcha = document.getElementById("field-recaptcha-wrap");

      const warnName = document.getElementById("warning-name");
      const warnInfo = document.getElementById("warning-info");
      const warnMsg = document.getElementById("warning-message");
      const warnConsent = document.getElementById("warning-consent");
      const warnRecaptcha = document.getElementById("warning-recaptcha");

      const isEn = document.documentElement.lang === "en" || window.location.pathname.startsWith("/en");

      if (budgetPills.length > 0 && budgetHidden) {
        budgetPills.forEach((pill) => {
          pill.addEventListener("click", () => {
            budgetPills.forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
            budgetHidden.value = pill.dataset.budget || pill.textContent.trim();
            triggerBudgetConfetti(pill);
          });
        });
      }

      window.onRecaptchaSuccess = function() {
        if (wrapRecaptcha && warnRecaptcha) {
          wrapRecaptcha.classList.remove("has-warning");
          warnRecaptcha.textContent = "";
        }
      };

      function validateName(showWarning = false) {
        if (!nameInput) return true;
        const val = nameInput.value.trim();
        if (!val || val.length < 2) {
          if (showWarning && wrapName && warnName) {
            wrapName.classList.add("has-warning");
            warnName.textContent = isEn
              ? "Please enter your name."
              : "Podaj swoje imię i nazwisko (np. Johnny Silverhand).";
          }
          return false;
        }
        if (wrapName && warnName) {
          wrapName.classList.remove("has-warning");
          warnName.textContent = "";
        }
        return true;
      }

      function validateInfo(showWarning = false) {
        if (!infoInput) return true;
        const raw = infoInput.value.trim();
        if (!raw) {
          if (showWarning && wrapInfo && warnInfo) {
            wrapInfo.classList.add("has-warning");
            warnInfo.textContent = isEn
              ? "Please enter your email address."
              : "Wpisz swój adres e-mail (np. samurai@mail.com).";
          }
          return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(raw)) {
          if (showWarning && wrapInfo && warnInfo) {
            wrapInfo.classList.add("has-warning");
            warnInfo.textContent = isEn
              ? "Please enter a valid email address (e.g. samurai@mail.com)."
              : "Podaj poprawny adres e-mail (np. samurai@mail.com).";
          }
          return false;
        }

        if (wrapInfo && warnInfo) {
          wrapInfo.classList.remove("has-warning");
          warnInfo.textContent = "";
        }
        return true;
      }

      function validateMessage(showWarning = false) {
        if (!msgInput) return true;
        const val = msgInput.value.trim();
        if (!val || val.length < 5) {
          if (showWarning && wrapMsg && warnMsg) {
            wrapMsg.classList.add("has-warning");
            warnMsg.textContent = isEn
              ? "Please briefly describe your project."
              : "Opowiedz krótko o swoim projekcie.";
          }
          return false;
        }
        if (wrapMsg && warnMsg) {
          wrapMsg.classList.remove("has-warning");
          warnMsg.textContent = "";
        }
        return true;
      }

      function validateConsent(showWarning = false) {
        if (!consentInput) return true;
        if (!consentInput.checked) {
          if (showWarning && wrapConsent && warnConsent) {
            wrapConsent.classList.add("has-warning");
            warnConsent.textContent = isEn
              ? "Consent to process personal data is required."
              : "Zaznacz powyższą zgodę, aby wysłać wiadomość.";
          }
          return false;
        }
        if (wrapConsent && warnConsent) {
          wrapConsent.classList.remove("has-warning");
          warnConsent.textContent = "";
        }
        return true;
      }

      function validateRecaptcha(showWarning = false) {
        if (!wrapRecaptcha) return true;
        let recaptchaPassed = false;
        if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse) {
          try {
            const resp = grecaptcha.getResponse();
            recaptchaPassed = !!(resp && resp.length > 0);
          } catch (e) {
            recaptchaPassed = true;
          }
        } else {
          recaptchaPassed = true;
        }

        if (!recaptchaPassed) {
          if (showWarning && wrapRecaptcha && warnRecaptcha) {
            wrapRecaptcha.classList.add("has-warning");
            warnRecaptcha.textContent = isEn
              ? "Please confirm that you are not a robot."
              : "Potwierdź, że nie jesteś robotem.";
          }
          return false;
        }
        if (wrapRecaptcha && warnRecaptcha) {
          wrapRecaptcha.classList.remove("has-warning");
          warnRecaptcha.textContent = "";
        }
        return true;
      }

      if (nameInput) {
        nameInput.addEventListener("input", () => {
          if (wrapName && wrapName.classList.contains("has-warning")) {
            validateName(false);
          }
        });
        nameInput.addEventListener("blur", () => {
          if (nameInput.value.trim().length > 0) {
            validateName(true);
          }
        });
      }

      if (infoInput) {
        infoInput.addEventListener("input", () => {
          if (wrapInfo && wrapInfo.classList.contains("has-warning")) {
            validateInfo(false);
          }
        });
        infoInput.addEventListener("blur", () => {
          if (infoInput.value.trim().length > 0) {
            validateInfo(true);
          }
        });
      }

      if (msgInput) {
        msgInput.addEventListener("input", () => {
          if (wrapMsg && wrapMsg.classList.contains("has-warning")) {
            validateMessage(false);
          }
        });
        msgInput.addEventListener("blur", () => {
          if (msgInput.value.trim().length > 0) {
            validateMessage(true);
          }
        });
      }

      if (consentInput) {
        consentInput.addEventListener("change", () => {
          if (consentInput.checked && wrapConsent && warnConsent) {
            wrapConsent.classList.remove("has-warning");
            warnConsent.textContent = "";
          }
        });
      }

      if (form) {
        form.addEventListener("submit", function(e) {
          e.preventDefault();

          const validName = validateName(true);
          const validInfo = validateInfo(true);
          const validMsg = validateMessage(true);
          const validConsent = validateConsent(true);
          const validRecaptcha = validateRecaptcha(true);

          if (!validName || !validInfo || !validMsg || !validConsent || !validRecaptcha) {
            if (statusBox) {
              statusBox.className = "contact-form-status warning";
              statusBox.textContent = isEn
                ? "⚠ Please complete all required fields marked in yellow."
                : "⚠ Uzupełnij lub popraw pola podświetlone na żółto.";
            }
            if (!validName && nameInput) nameInput.focus();
            else if (!validInfo && infoInput) infoInput.focus();
            else if (!validMsg && msgInput) msgInput.focus();
            else if (!validConsent && consentInput) consentInput.focus();
            return;
          }

          if (statusBox) {
            statusBox.className = "contact-form-status";
            statusBox.textContent = "";
          }

          const submitBtn = form.querySelector("button[type='submit']");
          const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = isEn
              ? `<span>SENDING MESSAGE...</span>`
              : `<span>WYSYŁANIE WIADOMOŚCI...</span>`;
          }

          const formData = new FormData(form);
          const name = formData.get("name") || "";
          const email = formData.get("email") || formData.get("contact") || "";
          const budgetVal = (budgetHidden && budgetHidden.value) ? budgetHidden.value : (formData.get("budget") || (isEn ? "Not specified" : "Nie określono"));
          const message = formData.get("message") || "";

          formData.set("budget", budgetVal);

          const actionUrl = form.getAttribute("action") || "https://formsubmit.co/ajax/4ea86d8a2cc356c41c7cadc829bed560";

          function showSuccess(msg) {
            if (statusBox) {
              statusBox.className = "contact-form-status success";
              statusBox.textContent = msg || (isEn
                ? "✓ Thank you! Your message has been sent directly to our inbox."
                : "✓ Dziękujemy! Twoja wiadomość została wysłana bezpośrednio na biuro@alex-agency.pl.");
            }
            if (submitBtn) {
              submitBtn.innerHTML = isEn
                ? `<span>✓ MESSAGE SENT</span>`
                : `<span>✓ WIADOMOŚĆ WYSŁANA</span>`;
            }
            form.reset();
            if (budgetPills.length > 0 && budgetHidden) {
              budgetPills.forEach((p) => p.classList.remove("active"));
              budgetHidden.value = "";
            }
            if (typeof grecaptcha !== "undefined" && grecaptcha.reset) {
              try { grecaptcha.reset(); } catch(e) {}
            }
            setTimeout(() => {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
              }
            }, 6000);
          }

          function fallbackMailto() {
            const mailSubject = encodeURIComponent(
              isEn
                ? `Inquiry from alex-agency.pl: ${name} (Budget: ${budgetVal})`
                : `Wiadomość ze strony: ${name} (Budżet: ${budgetVal})`
            );
            const mailBody = encodeURIComponent(
              isEn
                ? `Hello,\n\nName: ${name}\nEmail: ${email}\nEstimated budget: ${budgetVal}\n\nProject details:\n${message}\n\n--\nSent from alex-agency.pl contact form`
                : `Dzień dobry,\n\nImię i nazwisko: ${name}\nE-mail: ${email}\nSzacowany budżet: ${budgetVal}\n\nTreść wiadomości:\n${message}\n\n--\nWysłano z formularza alex-agency.pl`
            );
            window.location.href = `mailto:biuro@alex-agency.pl?subject=${mailSubject}&body=${mailBody}`;
            showSuccess(isEn ? "✓ Message drafted in your mail client." : "✓ Przygotowano wiadomość w Twoim programie pocztowym.");
          }

          fetch(actionUrl, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
          })
          .then(response => {
            if (response.ok) {
              showSuccess();
            } else {
              response.json().then(data => {
                if (data && (data.success === "true" || data.success === true)) {
                  showSuccess();
                } else {
                  fallbackMailto();
                }
              }).catch(() => fallbackMailto());
            }
          })
          .catch(() => {
            fallbackMailto();
          });
        });
      }
    }

  function initHeroScatter() {
    const heroEl = document.getElementById("hero");
    const heroSvg = document.getElementById("hero-svg");
    if (!heroEl || !heroSvg) return;

    const letters = heroSvg.querySelectorAll(".hero-letter");
    const heroScroll = heroEl.querySelector(".hero-scroll");
    if (!letters.length) return;

    const scatterData = [
      { x: -380, y: -240, z: 280, rx: -35, ry: 45, rz: -30 },
      { x: -160, y: -380, z: -220, rx: 45, ry: -30, rz: 35 },
      { x: 120, y: -360, z: 260, rx: -40, ry: -40, rz: -20 },
      { x: 320, y: -300, z: -180, rx: 35, ry: 50, rz: 40 },
      { x: -420, y: 180, z: -200, rx: 45, ry: -45, rz: -35 },
      { x: -180, y: 360, z: 220, rx: -50, ry: 35, rz: 30 },
      { x: 0, y: 420, z: -280, rx: 55, ry: -25, rz: -20 },
      { x: 180, y: 380, z: 200, rx: -45, ry: 40, rz: 35 },
      { x: 320, y: 320, z: -220, rx: 40, ry: -50, rz: -30 },
      { x: 460, y: 240, z: -200, rx: 50, ry: -40, rz: 45 },
      { x: 420, y: -260, z: 280, rx: -35, ry: -45, rz: -40 },
      { x: 560, y: -160, z: -240, rx: 45, ry: 35, rz: 35 },
      { x: 580, y: 200, z: 260, rx: -40, ry: 50, rz: -35 }
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth <= 768) {
      if (heroScroll) {
        heroScroll.style.opacity = "0";
        heroScroll.style.pointerEvents = "none";
      }
      return;
    }

    let currentProgress = 0;
    let targetProgress = 0;
    let isRunning = false;

    function render(p) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        letters.forEach((el) => {
          el.style.transform = "translate3d(0, 0, 0)";
          el.style.opacity = "1";
          el.style.filter = "none";
        });
        if (heroScroll) {
          heroScroll.style.opacity = "0";
          heroScroll.style.pointerEvents = "none";
        }
        return;
      }

      const assembleThreshold = 0.82;
      const t = Math.min(1, p / assembleThreshold);
      const factor = 1 - (1 - Math.pow(1 - t, 2.5));
      const isAssembled = factor <= 0.001;

      const scaleX = 1;
      const scaleY = 1;
      const scaleZ = 1;

      letters.forEach((el, idx) => {
        if (isAssembled) {
          el.style.transform = "translate3d(0, 0, 0)";
          el.style.opacity = "1";
          el.style.filter = "none";
        } else {
          const s = scatterData[idx] || { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
          const x = (s.x * factor * scaleX).toFixed(1);
          const y = (s.y * factor * scaleY).toFixed(1);
          const z = (s.z * factor * scaleZ).toFixed(1);
          const rx = (s.rx * factor).toFixed(1);
          const ry = (s.ry * factor).toFixed(1);
          const rz = (s.rz * factor).toFixed(1);
          el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
          el.style.opacity = (0.55 + (1 - factor) * 0.45).toFixed(2);
          el.style.filter = factor > 0.05 ? `blur(${(factor * 6).toFixed(1)}px)` : "none";
        }
      });

      if (heroScroll) {
        heroScroll.style.opacity = String(Math.max(0, 1 - p * 3.5));
        heroScroll.style.pointerEvents = p > 0.2 ? "none" : "auto";
      }
    }

    function update() {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.001) {
        currentProgress += diff * 0.16;
        render(currentProgress);
        requestAnimationFrame(update);
      } else {
        currentProgress = targetProgress;
        render(currentProgress);
        isRunning = false;
      }
    }
    function calculateProgress() {
      const heroRect = heroEl.getBoundingClientRect();
      const scrollTrack = heroEl.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -heroRect.top);
      return scrollTrack > 0 ? Math.min(1, Math.max(0, currentScroll / scrollTrack)) : 1;
    }

    function onScroll() {
      targetProgress = calculateProgress();
      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(update);
      }
    }

    targetProgress = calculateProgress();
    currentProgress = targetProgress;
    render(currentProgress);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      targetProgress = calculateProgress();
      currentProgress = targetProgress;
      render(currentProgress);
    }, { passive: true });

    if ("requestIdleCallback" in window) {
      requestIdleCallback(fixPolishTypography, { timeout: 2500 });
    } else {
      setTimeout(fixPolishTypography, 1000);
    }
  }

  function fixPolishTypography() {
    const isPl = !document.documentElement.lang || document.documentElement.lang.startsWith("pl");
    const plRegex = /(^|[\s\(\[\{„"'>])([aAiIoOuUwWzZ]|oraz|dla|lub|nad|pod|bez|przez|przy|ze|we|od|do|na|po|za|niż|nie)\s+/g;
    const enRegex = /(^|[\s\(\[\{„"'>])([aA]|[aA]n|[tT]he|[iI]n|[oO]n|[aA]t|[tT]o|[oO]f|[fF]or|[bB]y|[wW]ith)\s+/g;
    const targetRegex = isPl ? plRegex : enRegex;

    const ignoreTags = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "INPUT", "NOSCRIPT", "SVG"]);

    function walk(node) {
      if (!node) return;
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        if (text && text.trim().length > 1) {
          let updated = text.replace(targetRegex, "$1$2\u00A0");
          updated = updated.replace(targetRegex, "$1$2\u00A0");
          if (updated !== text) {
            node.nodeValue = updated;
          }
        }
      } else if (node.nodeType === 1 && !ignoreTags.has(node.tagName.toUpperCase())) {
        for (let child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
      }
    }

    if (document.body) {
      walk(document.body);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

