/* =========================================================
   Ravi Varman S — Freelance Portfolio
   Nav, scroll reveal, active section, contact form
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeNav() {
    if (!links || !toggle) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
        setTimeout(function () { entry.target.classList.add("is-in"); }, delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Active nav link ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq__list details"));
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById("briefForm");
  var hint = document.getElementById("formHint");
  var MAIL = "ravivarmansenthilkumar@gmail.com";

  function setError(el, on) {
    if (el) el.classList.toggle("is-error", !!on);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.namedItem("name");
      var email = form.elements.namedItem("email");
      var type = form.elements.namedItem("type");
      var msg = form.elements.namedItem("message");

      var valid = true;
      [name, email, msg].forEach(function (f) { setError(f, false); });

      if (!name.value.trim()) { setError(name, true); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, true); valid = false; }
      if (msg.value.trim().length < 10) { setError(msg, true); valid = false; }

      if (!valid) {
        if (hint) {
          hint.textContent = "Please fill in your name, a valid email, and a few words about the project.";
          hint.classList.remove("is-ok");
        }
        var firstBad = form.querySelector(".is-error");
        if (firstBad) firstBad.focus();
        return;
      }

      var subject = "Project Associate enquiry — " + type.value + " — " + name.value.trim();
      var body =
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n" +
        "Regarding: " + type.value + "\n\n" +
        "Message:\n" + msg.value.trim() + "\n";

      var href =
        "mailto:" + MAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (hint) {
        hint.textContent = "Opening your email app… if nothing happens, write to " + MAIL + " directly.";
        hint.classList.add("is-ok");
      }

      window.location.href = href;
    });

    // Clear the error state as soon as the user fixes a field.
    form.addEventListener("input", function (e) {
      setError(e.target, false);
      if (hint && hint.classList.contains("is-ok")) return;
      if (hint) {
        hint.textContent = "Opens your email app with everything filled in — nothing is stored on this site.";
        hint.classList.remove("is-ok");
      }
    });
  }
})();
