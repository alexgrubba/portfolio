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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

