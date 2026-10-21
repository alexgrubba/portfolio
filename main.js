(function () {
  function initApp() {
    const cursor = document.getElementById("cursor");
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
    initHeroRotator();
    initHeroDtpArtboard();
    initPrepressSimulator();
    initContactTerminal();
    initNavScrollspy();
    initPortfolioExpanders();
  }

  function initPortfolioExpanders() {
    const expandBtns = document.querySelectorAll(".sektor-expand-btn");
    if (!expandBtns.length) return;

    expandBtns.forEach((btn) => {
      const labelSpan = btn.querySelector(".expand-label");
      if (labelSpan && !btn.hasAttribute("data-original-text")) {
        btn.setAttribute("data-original-text", labelSpan.textContent.trim());
      }

      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const newExpanded = !isExpanded;

        btn.setAttribute("aria-expanded", String(newExpanded));

        const isEn = document.documentElement.lang === "en";
        const lbl = btn.querySelector(".expand-label");

        if (newExpanded) {
          target.classList.add("is-expanded");
          if (lbl) {
            lbl.textContent = isEn ? "Collapse projects" : "Zwiń projekty";
          }
        } else {
          target.classList.remove("is-expanded");
          const orig = btn.getAttribute("data-original-text");
          if (lbl && orig) {
            lbl.textContent = orig;
          }
        }
      });
    });
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
      updateActive();
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

  function initHeroRotator() {
    const track = document.getElementById("hero-rotator-track");
    if (!track) return;

    const originalItems = track.querySelectorAll(".rotator-item");
    if (originalItems.length <= 1) return;

    const clone = originalItems[0].cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);

    const allItems = track.querySelectorAll(".rotator-item");
    const totalCount = allItems.length;
    let currentIndex = 0;
    let intervalId = null;

    function step() {
      currentIndex++;
      track.style.transition = "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
      track.style.transform = `translateY(-${(currentIndex * 100) / totalCount}%)`;

      if (currentIndex === totalCount - 1) {
        setTimeout(() => {
          track.style.transition = "none";
          currentIndex = 0;
          track.style.transform = "translateY(0%)";
        }, 650);
      }
    }

    function start() {
      if (!intervalId) {
        intervalId = setInterval(step, 3000);
      }
    }

    function stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    start();
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
          const budgetVal = budgetHidden ? budgetHidden.value : (formData.get("budget") || (isEn ? "< 1,500 EUR" : "DO 5 TYS. PLN"));
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
              budgetPills.forEach((p, idx) => p.classList.toggle("active", idx === 0));
              budgetHidden.value = isEn ? "< 1,500 EUR" : "DO 5 TYS. PLN";
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

    fixPolishTypography();
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

