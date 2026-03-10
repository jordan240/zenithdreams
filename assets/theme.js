/* ============================================================
   ZENITH DREAMS — Theme JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Header: transparent ↔ solid on scroll ──────────────── */
  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function setHeaderState() {
      if (window.scrollY > 60) {
        header.classList.remove('transparent');
        header.classList.add('solid');
      } else {
        header.classList.add('transparent');
        header.classList.remove('solid');
      }
    }

    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
  }

  /* ── Mobile hamburger menu ──────────────────────────────── */
  function initMobileNav() {
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Cart drawer ────────────────────────────────────────── */
  function initCartDrawer() {
    var drawer  = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-cart-open]').forEach(function (btn) {
      btn.addEventListener('click', openDrawer);
    });

    document.querySelectorAll('[data-cart-close]').forEach(function (btn) {
      btn.addEventListener('click', closeDrawer);
    });

    if (overlay) overlay.addEventListener('click', closeDrawer);
  }

  /* ── Scroll fade-in ─────────────────────────────────────── */
  function initFadeIn() {
    var els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Hero parallax (gentle) ─────────────────────────────── */
  function initHeroParallax() {
    var heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    heroBg.classList.add('loaded');

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var offset  = scrollY * 0.25;
      heroBg.style.transform = 'scale(1) translateY(' + offset + 'px)';
    }, { passive: true });
  }

  /* ── Product gallery thumbnails ─────────────────────────── */
  function initProductGallery() {
    var thumbs = document.querySelectorAll('.product-thumb');
    var mainImg = document.querySelector('.product-gallery-main img');
    if (!thumbs.length || !mainImg) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        var src = thumb.querySelector('img') ? thumb.querySelector('img').src : null;
        if (src) mainImg.src = src;
      });
    });
  }

  /* ── Size selector ──────────────────────────────────────── */
  function initSizeSelector() {
    var sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        sizeBtns.forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      });
    });
  }

  /* ── Quantity +/- buttons ───────────────────────────────── */
  function initQtyButtons() {
    document.querySelectorAll('.qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = btn.closest('.qty-selector').querySelector('.qty-input');
        if (!input) return;
        var val = parseInt(input.value, 10) || 1;
        if (btn.dataset.action === 'increase') {
          input.value = val + 1;
        } else {
          input.value = Math.max(1, val - 1);
        }
      });
    });
  }

  /* ── Newsletter form (demo) ─────────────────────────────── */
  function initNewsletter() {
    var form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn   = form.querySelector('button');
      if (btn) { btn.textContent = 'Subscribed!'; btn.disabled = true; }
      if (input) input.value = '';
    });
  }

  /* ── Add-to-cart button (demo feedback) ─────────────────── */
  function initAddToCart() {
    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.style.background = '#c9a84c';
        btn.style.color = '#000';
        btn.style.borderColor = '#c9a84c';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 1800);
      });
    });
  }

  /* ── Filter buttons ─────────────────────────────────────── */
  function initFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

  /* ── Initialise everything on DOM ready ─────────────────── */
  function init() {
    initHeader();
    initMobileNav();
    initCartDrawer();
    initFadeIn();
    initHeroParallax();
    initProductGallery();
    initSizeSelector();
    initQtyButtons();
    initNewsletter();
    initAddToCart();
    initFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
