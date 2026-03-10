/* ============================================================
   ZENITH DREAMS — Door Entrance JS
   ============================================================ */

(function () {
  'use strict';

  const SESSION_KEY = 'zd_door_entered';

  function openDoors() {
    const entrance = document.getElementById('door-entrance');
    if (!entrance) return;

    entrance.classList.add('doors-open');

    // After animation completes, hide the overlay and show the page
    setTimeout(function () {
      entrance.classList.add('doors-gone');
      document.body.classList.remove('doors-active');
    }, 1400);

    sessionStorage.setItem(SESSION_KEY, '1');
  }

  function initDoors() {
    const entrance = document.getElementById('door-entrance');
    if (!entrance) return;

    // Skip if already entered this session
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      entrance.classList.add('doors-gone');
      document.body.classList.remove('doors-active');
      return;
    }

    document.body.classList.add('doors-active');

    // Click anywhere on the entrance overlay
    entrance.addEventListener('click', function handler(e) {
      entrance.removeEventListener('click', handler);
      openDoors();
    });

    // Also wire up the CTA button explicitly (it's inside the overlay, so
    // the above already catches it, but being explicit makes intent clear)
    const cta = entrance.querySelector('.enter-cta');
    if (cta) {
      cta.addEventListener('click', function (e) {
        e.stopPropagation();
        openDoors();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDoors);
  } else {
    initDoors();
  }
})();
