document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.getElementById("cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .btn, .projekt, .usluga, .nav-icon, .kafelek, .foto-cell, input, textarea, [role='button'], #cookie-banner button")) {
        cursor.classList.add("grow");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .btn, .projekt, .usluga, .nav-icon, .kafelek, .foto-cell, input, textarea, [role='button'], #cookie-banner button")) {
        cursor.classList.remove("grow");
      }
    });

    document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
  }

  const hamburger = document.getElementById("nav-hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
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
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
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
    });
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
});
