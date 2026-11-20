document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navbar.classList.toggle('open');
    });
  }

  // Contact form (Formspree AJAX)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('contact-form-status');
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.className = 'form-status';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          contactForm.reset();
          status.textContent = contactForm.dataset.success || "Thanks, we'll get back to you within 24 hours.";
          status.classList.add('form-status--success');
          const leadEvent = contactForm.dataset.event || 'contact_submit';
          if (window.gtag) gtag('event', leadEvent, { event_category: 'lead' });
          if (window.posthog) posthog.capture(leadEvent);
        } else {
          const data = await res.json().catch(() => ({}));
          status.textContent = data.errors?.[0]?.message || 'Something went wrong. Please email info@geniussheets.us.';
          status.classList.add('form-status--error');
        }
      } catch (_) {
        status.textContent = 'Network error. Please email info@geniussheets.us.';
        status.classList.add('form-status--error');
      }
    });
  }

  // Funnel tracking: keep first-touch UTMs for the session, pass them and the
  // PostHog visitor ID to the app (different domain, so cookies don't carry),
  // and record signup clicks, sample downloads, and Calendly bookings.
  var APP_ORIGIN = 'https://app.geniussheets.com';
  var UTM_KEY = 'gs_utm';
  var UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function track(event, props) {
    if (window.gtag) gtag('event', event, props);
    if (window.posthog) posthog.capture(event, props);
  }

  function storedUtms() {
    try {
      return JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}') || {};
    } catch (_) {
      return {};
    }
  }

  (function saveFirstTouchUtms() {
    var params = new URLSearchParams(window.location.search);
    var utms = {};
    UTM_PARAMS.forEach(function (k) {
      if (params.get(k)) utms[k] = params.get(k);
    });
    if (!Object.keys(utms).length) return;
    try {
      if (!sessionStorage.getItem(UTM_KEY)) sessionStorage.setItem(UTM_KEY, JSON.stringify(utms));
    } catch (_) { /* storage blocked: links just go without UTMs */ }
  })();

  function decorateAppLink(link) {
    var url;
    try {
      url = new URL(link.href);
    } catch (_) {
      return;
    }
    if (url.origin !== APP_ORIGIN || url.pathname.indexOf('/faq') === 0) return;
    var utms = storedUtms();
    Object.keys(utms).forEach(function (k) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, utms[k]);
    });
    var id = window.posthog && posthog.get_distinct_id && posthog.get_distinct_id();
    if (id) url.searchParams.set('ph_id', id);
    link.href = url.toString();
  }

  // Click time, not load time, so PostHog has finished loading and the ID is real.
  // Covers middle-click / open-in-new-tab too.
  ['click', 'auxclick'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var link = e.target.closest && e.target.closest('a[href]');
      if (!link) return;
      decorateAppLink(link);
      if (type !== 'click') return;
      if (link.dataset.cta === 'signup') {
        track('signup_click', {
          cta_location: link.dataset.ctaLocation || 'unknown',
          page: window.location.pathname,
        });
      } else if (link.dataset.event === 'sample_download') {
        track('sample_download', {
          sample: link.dataset.sample || link.getAttribute('href'),
          page: window.location.pathname,
        });
      }
    }, true);
  });

  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://calendly.com') return;
    if (!e.data || e.data.event !== 'calendly.event_scheduled') return;
    track('calendly_booked', { page: window.location.pathname });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
      });
      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
