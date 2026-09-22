(function () {
  function initApp() {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      let isVisible = false;
      const interactiveSelector = "a, button, .btn, .projekt, .usluga, .inne-item, .kafelek, .foto-cell, input, textarea, select, [role='button'], .nav-hamburger, .tool-row, .ig-post, .ig-follow-btn, .ig-main-link-btn, .ig-modal-close, .ig-modal-ig-link, label, summary, .hero-scroll";

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

    if (ipLightbox && ipLightboxImg) {
      document.querySelectorAll(".inne-item, .projekt:not(a)").forEach((item) => {
        item.addEventListener("click", () => {
          const img = item.querySelector("img");
          if (img) {
            ipLightboxImg.src = img.src;
            ipLightbox.classList.add("active");
            document.body.style.overflow = "hidden";
          }
        });
      });

      if (ipClose) {
        ipClose.addEventListener("click", () => {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
        });
      }

      ipLightbox.addEventListener("click", (e) => {
        if (e.target === ipLightbox) {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && ipLightbox.classList.contains("active")) {
          ipLightbox.classList.remove("active");
          document.body.style.overflow = "";
          ipLightboxImg.src = "";
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

    const b1 = document.querySelector(".blob-1");
    const b2 = document.querySelector(".blob-2");
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
            nav.style.background = "#05031b";
            nav.style.borderBottom = "1px solid rgba(245, 240, 255, 0.06)";
            nav.style.top = "0px";
          } else {
            nav.style.background = "";
            nav.style.backdropFilter = "";
            nav.style.borderBottom = "";
            const hasWip = !!document.querySelector(".wip-bar");
            nav.style.top = (window.innerWidth <= 768 && hasWip) ? "30px" : "0px";
          }

          if (current > lastScroll && current > 100) {
            nav.classList.add("hidden");
          } else {
            nav.classList.remove("hidden");
          }
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

    initHeroScatter();
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let currentProgress = 0;
    let targetProgress = 0;
    let isRunning = false;

    function render(p) {
      const t = Math.min(1, p / 0.82);
      const factor = 1 - (1 - Math.pow(1 - t, 2.5));
      const isAssembled = factor <= 0.001;

      const isMobile = window.innerWidth <= 768;
      const mobileScale = isMobile ? Math.max(0.38, Math.min(0.5, window.innerWidth / 768)) : 1;

      letters.forEach((el, idx) => {
        if (isAssembled) {
          el.style.transform = "translate3d(0, 0, 0)";
          el.style.opacity = "1";
          el.style.filter = "none";
        } else {
          const s = scatterData[idx] || { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
          const x = (s.x * factor * mobileScale).toFixed(1);
          const y = (s.y * factor * mobileScale).toFixed(1);
          const z = (s.z * factor * (isMobile ? 0.7 : 1)).toFixed(1);
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

