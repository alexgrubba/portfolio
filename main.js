document.addEventListener("DOMContentLoaded", function () {

  /* --- CURSOR -------------------------------- */
  const cursor = document.getElementById("cursor");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    });
    document.querySelectorAll("a, button, .projekt, .usluga, .nav-icon").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
    });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
  }

  /* --- REVEAL ON SCROLL ---------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(el => el.classList.add("visible"));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(el => ro.observe(el));
  }

  /* --- BLOB PARALLAX ------------------------- */
  const b1 = document.querySelector(".blob-1");
  const b2 = document.querySelector(".blob-2");
  if (b1 && b2) {
    window.addEventListener("mousemove", e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      b1.style.transform = "translate(" + (x * 0.5) + "px, " + (y * 0.5) + "px)";
      b2.style.transform = "translate(" + (-x * 0.3) + "px, " + (-y * 0.3) + "px)";
    });
    
  }

  /* --- SMOOTH SCROLL ------------------------- */
  document.querySelectorAll("a[href^=\"#\"]").forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* --- NAV aktywna sekcja -------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (sections.length && navLinks.length) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.getAttribute("id");
          navLinks.forEach(a => {
            a.style.color = (a.getAttribute("href") === id) ? "var(--mint)" : "";
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => so.observe(s));
  }

  /* --- NAV tlo po scrollu -------------------- */
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        nav.style.background    = "rgba(5, 3, 27, 0.92)";
        nav.style.backdropFilter = "blur(12px)";
        nav.style.borderBottom  = "1px solid rgba(245, 240, 255, 0.06)";
      } else {
        nav.style.background    = "";
        nav.style.backdropFilter = "";
        nav.style.borderBottom  = "";
      }
    }, { passive: true });
  }

});

const toolRows = document.querySelectorAll('.tool-row');

if (toolRows.length) {
  const rowObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const row   = entry.target;
        const level = parseFloat(row.dataset.level) / 100; // np. 95 → 0.95
        // ustawiamy CSS variable --scale która kontroluje scaleX
        row.style.setProperty('--scale', level);
        row.classList.add('animate');
        rowObs.unobserve(row);
      }
    });
  }, { threshold: 0.3 });

  toolRows.forEach(row => rowObs.observe(row));
}

document.querySelector('.projekt').addEventListener('touchstart', function(e) {
  this.style.transform = 'scale(0.97)';
  this.style.transition = 'transform 0.1s';
});
document.querySelector('.projekt').addEventListener('touchend', function() {
  this.style.transform = 'scale(1)';
});

let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 100) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = current;
});
 const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
