/* ShapeShifter mockup — shared behaviour */
(function () {
  'use strict';

  /* Scroll reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* Accordion */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var panel = item.querySelector('.acc-panel');
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.acc-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.acc-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  /* open the first accordion item by default */
  document.querySelectorAll('.acc').forEach(function (acc) {
    var first = acc.querySelector('.acc-item');
    if (first) {
      first.classList.add('open');
      var p = first.querySelector('.acc-panel');
      if (p) { p.style.maxHeight = p.scrollHeight + 'px'; }
    }
  });

  /* Mobile burger + dropdown tap support */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.site-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  }
  document.querySelectorAll('.has-drop > a').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      if (window.matchMedia('(max-width:720px)').matches) {
        ev.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });

  /* Floating brand shapes — subtle parallax on scroll */
  var shapes = Array.prototype.slice.call(document.querySelectorAll('.shape'));
  if (shapes.length) {
    var ticking = false;
    var update = function () {
      var y = window.scrollY || 0;
      shapes.forEach(function (s) {
        var speed = parseFloat(s.getAttribute('data-speed') || '0.06');
        var rot = parseFloat(s.getAttribute('data-rot') || '0');
        s.style.transform = 'skewY(-16deg) translateY(' + (-y * speed).toFixed(1) + 'px) rotate(' + rot + 'deg)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* Rotating divider shapes — tied to scroll position */
  var rowShapes = Array.prototype.slice.call(document.querySelectorAll('.shape-row i'));
  if (rowShapes.length) {
    var rTick = false;
    var rUpdate = function () {
      var y = window.scrollY || 0;
      rowShapes.forEach(function (s, i) {
        var rs = parseFloat(s.getAttribute('data-rs') || '0.06');
        s.style.transform = 'rotate(' + ((y * rs) + i * 12).toFixed(1) + 'deg)';
      });
      rTick = false;
    };
    window.addEventListener('scroll', function () {
      if (!rTick) { window.requestAnimationFrame(rUpdate); rTick = true; }
    }, { passive: true });
    rUpdate();
  }


  /* Count-up metrics (Gemini-style) */
  var counts = document.querySelectorAll('.count');
  if (counts.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        cio.unobserve(e.target);
        var el = e.target;
        var to = parseFloat(el.getAttribute('data-to') || '0');
        var pre = el.getAttribute('data-prefix') || '';
        var suf = el.getAttribute('data-suffix') || '';
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.innerHTML = pre + to + suf; return;
        }
        var t0 = null, dur = 1400;
        var step = function (ts) {
          if (!t0) { t0 = ts; }
          var p = Math.min(1, (ts - t0) / dur);
          var ease = 1 - Math.pow(1 - p, 3);
          el.innerHTML = pre + Math.round(to * ease) + suf;
          if (p < 1) { window.requestAnimationFrame(step); }
        };
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counts.forEach(function (c) { cio.observe(c); });
  }

  /* Current year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Mark active nav link */
  var page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.site-nav a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === page) { a.classList.add('active'); }
    });
  }
})();
