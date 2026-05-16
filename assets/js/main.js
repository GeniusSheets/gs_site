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
          status.textContent = "Thanks — we'll get back to you within 24 hours.";
          status.classList.add('form-status--success');
          if (window.gtag) gtag('event', 'contact_submit', { event_category: 'lead' });
          if (window.posthog) posthog.capture('contact_submit');
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
