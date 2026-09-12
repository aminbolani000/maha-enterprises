/* ==========================================================================
   MAHA ENTERPRISES - UNIVERSAL SCROLL REVEAL ANIMATIONS (animation.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Sabhi animated elements ko select karein
    const revealElements = document.querySelectorAll('.js-reveal, .service-card, .collection-card, .social-card, .info-card');

    if (!revealElements.length) return;

    // Scroll Animation Observer Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px', // Element screen par aane par trigger hoga
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Card Stagger Delay Apply Karein
                const delay = el.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);

                // Ek baar animate hone ke baad observation stop karein
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Initial setup for CSS smooth transitions
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(el);
    });
});