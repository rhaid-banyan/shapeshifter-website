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

  /* ---------- cookie consent (CCPA/CPRA + GDPR-style opt-in gate) ----------
     Site-wide: creates the banner on every page, then gates whatever
     consent-relevant content exists on THAT page (video, contact form). */
  var banner = document.createElement('div');
  banner.id = 'consent-banner';
  var hasVideo = !!document.querySelector('[data-video-id]');
  var hasForm = !!document.querySelector('.hs-form-frame');
  var bannerText = hasVideo
    ? 'This site uses cookies for basic analytics and to play embedded YouTube video. We do not sell or share your personal information. Do you consent?'
    : 'This site uses cookies for basic analytics. We do not sell or share your personal information. Do you consent?';
  banner.innerHTML =
    '<span>' + bannerText + '</span>' +
    '<button id="consent-accept">Accept</button>' +
    '<button id="consent-decline">Decline / Do Not Sell or Share My Info</button>';
  document.body.appendChild(banner);

  var privacyLink = document.createElement('button');
  privacyLink.id = 'privacy-choices';
  privacyLink.textContent = 'Privacy Choices';
  document.body.appendChild(privacyLink);

  var stored = localStorage.getItem('ss-consent');

  function showConsentBanner() {
    banner.style.display = 'flex';
    privacyLink.style.display = 'none';
  }

  function hideConsentBanner() {
    banner.style.display = 'none';
    privacyLink.style.display = 'block';
  }

  if (stored) {
    hideConsentBanner();
    if (stored === 'accepted') { loadAnalytics(); unlockContactForm(); }
  } else {
    privacyLink.style.display = 'none';
  }

  function acceptConsent() {
    localStorage.setItem('ss-consent', 'accepted');
    hideConsentBanner();
    loadAnalytics();
  }

  document.getElementById('consent-accept').addEventListener('click', function () {
    acceptConsent();
    unlockContactForm();
  });

  document.getElementById('consent-decline').addEventListener('click', function () {
    localStorage.setItem('ss-consent', 'declined');
    hideConsentBanner();
  });

  // Lets a visitor reopen the banner anytime to change their choice
  // (the persistent opt-out mechanism CCPA/CPRA requires).
  privacyLink.addEventListener('click', showConsentBanner);

  function loadAnalytics() {
    // Google tag (gtag.js) — GA4. Only loads after consent.
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z52FWM1238';
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-Z52FWM1238');
  }

  /* ---------- video consent gate (index, platform) ---------- */
  var videoFrames = document.querySelectorAll('[data-video-id]');

  function playVideo(videoFrame) {
    // Only load/play each YouTube iframe once consent is given — guarded
    // to run once per frame so a later click can't reset playback.
    if (videoFrame.getAttribute('data-video-loaded')) { return; }
    videoFrame.setAttribute('data-video-loaded', '1');

    var videoId = videoFrame.getAttribute('data-video-id');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
    iframe.title = videoFrame.getAttribute('data-video-title') || 'Shapeshifter film';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    videoFrame.innerHTML = '';
    videoFrame.appendChild(iframe);
  }

  videoFrames.forEach(function (frame) {
    var playBtn = frame.querySelector('.video-play-btn');
    if (!playBtn) { return; }
    playBtn.addEventListener('click', function () {
      // The button itself says "Click to consent & watch" — so clicking
      // it IS giving consent, same as clicking Accept in the banner below.
      if (localStorage.getItem('ss-consent') !== 'accepted') {
        acceptConsent();
      }
      playVideo(frame);
    });
  });

  /* ---------- contact form consent gate (contact page) ---------- */
  var formUnlocked = false;

  function unlockContactForm() {
    // Contact form is gated behind consent — grayed out/disabled (via the
    // "locked" class + fake placeholder fields) until accepted. Guarded to
    // run once: re-running would wipe the already-loaded HubSpot iframe
    // (e.g. if the visitor reopens the banner via "Privacy Choices" and
    // clicks Accept again) and it won't reliably re-render into a
    // container it already initialized.
    var formFrame = document.querySelector('.hs-form-frame');
    if (formUnlocked || !formFrame) { return; }
    formUnlocked = true;

    formFrame.classList.remove('locked');

    // HubSpot's embed script takes a variable 1-4s to inject the actual
    // form iframe, so show a spinner in the meantime instead of a blank box.
    formFrame.innerHTML = '<div id="form-loading"><div class="spinner"></div><p>Loading form&hellip;</p></div>';

    var observer = new MutationObserver(function () {
      if (formFrame.querySelector('iframe')) {
        var loading = document.getElementById('form-loading');
        if (loading) { loading.remove(); }
        observer.disconnect();
      }
    });
    observer.observe(formFrame, { childList: true, subtree: true });

    var hs = document.createElement('script');
    hs.src = 'https://js-eu1.hsforms.net/forms/embed/146369200.js';
    hs.defer = true;
    document.body.appendChild(hs);
  }
})();
