document.addEventListener('DOMContentLoaded', function () {
  // ---------------------------------------------------------------------------
  // Analytics helper: one call fans out to GA4 and PostHog.
  // ---------------------------------------------------------------------------
  function track(name, props) {
    if (window.gtag) gtag('event', name, props || {});
    if (window.posthog) posthog.capture(name, props || {});
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navbar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---------------------------------------------------------------------------
  // Outbound app links: tag with UTM params so signups attribute back to the
  // page and CTA that produced them, and fire a conversion event on click.
  // ---------------------------------------------------------------------------
  const pageSlug = (window.location.pathname.replace(/^\/|\/$/g, '') || 'home').replace(/\.html$/, '');

  document.querySelectorAll('a[href*="app.geniussheets.com"]').forEach(function (link) {
    const intent = link.dataset.cta || 'signup';

    // Login links are not acquisition traffic, so leave them untagged.
    if (intent !== 'login') {
      try {
        const url = new URL(link.href, window.location.origin);
        if (!url.searchParams.has('utm_source')) {
          url.searchParams.set('utm_source', 'geniussheets_site');
          url.searchParams.set('utm_medium', 'website');
          url.searchParams.set('utm_campaign', pageSlug);
          if (link.dataset.ctaLocation) {
            url.searchParams.set('utm_content', link.dataset.ctaLocation);
          }
          link.href = url.toString();
        }
      } catch (_) {
        /* malformed href, leave it alone */
      }
    }

    link.addEventListener('click', function () {
      track(intent === 'login' ? 'login_click' : 'signup_click', {
        event_category: 'conversion',
        cta_location: link.dataset.ctaLocation || 'unknown',
        cta_text: link.textContent.trim(),
        page: pageSlug,
      });
    });
  });

  // Demo / booking intent (internal links to the contact page, Calendly, mailto)
  document.querySelectorAll('[data-cta="demo"], [data-cta="contact"]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('demo_click', {
        event_category: 'conversion',
        cta_location: link.dataset.ctaLocation || 'unknown',
        page: pageSlug,
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Pricing section view — fires once when pricing scrolls into view.
  // ---------------------------------------------------------------------------
  const pricingSection = document.querySelector('#pricing, .pricing-full');
  if (pricingSection && 'IntersectionObserver' in window) {
    const pricingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track('pricing_view', { page: pageSlug });
          pricingObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });
    pricingObserver.observe(pricingSection);
  }

  // ---------------------------------------------------------------------------
  // Video lightbox — plays in an overlay instead of sending visitors off site.
  // ---------------------------------------------------------------------------
  const videoTriggers = document.querySelectorAll('[data-video]');
  if (videoTriggers.length) {
    let overlay = null;
    let lastFocused = null;

    function closeVideo() {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.classList.remove('video-modal-open');
      if (lastFocused) lastFocused.focus();
    }

    function openVideo(src, label) {
      lastFocused = document.activeElement;
      overlay = document.createElement('div');
      overlay.className = 'video-modal';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', label || 'Product video');
      overlay.innerHTML =
        '<div class="video-modal-inner">' +
        '<button class="video-modal-close" aria-label="Close video">&times;</button>' +
        '<div class="video-modal-frame">' +
        '<iframe src="' + src + '" title="' + (label || 'Product video') + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>' +
        '</div></div>';

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('video-modal-close')) closeVideo();
      });

      document.body.appendChild(overlay);
      document.body.classList.add('video-modal-open');
      overlay.querySelector('.video-modal-close').focus();
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeVideo();
    });

    videoTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        const src = trigger.dataset.video;
        if (!src) return;
        e.preventDefault();
        openVideo(src, trigger.dataset.videoTitle);
        track('video_play', {
          event_category: 'engagement',
          video: trigger.dataset.videoTitle || src,
          page: pageSlug,
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Sticky mobile CTA bar — reveals once the hero CTA has scrolled away.
  // ---------------------------------------------------------------------------
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    let ticking = false;
    const reveal = function () {
      stickyCta.classList.toggle('is-visible', window.scrollY > 500);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(reveal);
      }
    }, { passive: true });
    reveal();
  }

  // Contact form (Formspree AJAX)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('contact-form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.className = 'form-status';
      if (submitBtn) submitBtn.disabled = true;
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const entities = contactForm.querySelector('[name="entities"]');
          contactForm.reset();
          status.textContent = "Thanks, we'll get back to you within one business day.";
          status.classList.add('form-status--success');
          track('contact_submit', {
            event_category: 'lead',
            entities: entities ? entities.value : undefined,
          });
        } else {
          const data = await res.json().catch(() => ({}));
          status.textContent = data.errors?.[0]?.message || 'Something went wrong. Please email info@geniussheets.us.';
          status.classList.add('form-status--error');
        }
      } catch (_) {
        status.textContent = 'Network error. Please email info@geniussheets.us.';
        status.classList.add('form-status--error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item, i) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    const answerId = 'faq-answer-' + i;
    answer.id = answerId;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', answerId);

    btn.addEventListener('click', function () {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
        const q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        track('faq_open', { question: btn.textContent.trim(), page: pageSlug });
      }
    });
  });
});
