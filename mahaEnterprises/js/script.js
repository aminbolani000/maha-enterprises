/* ==========================================================================
   MAHA ENTERPRISES - MAIN JAVASCRIPT (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* --------------------------------------------------------------------------
       1. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar Scroll Listener
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile Hamburger Navigation
    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile drawer on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* --------------------------------------------------------------------------
       2. ACTIVE SECTION HIGHLIGHTING (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    /* --------------------------------------------------------------------------
       3. SMOOTH SCROLL FOR INTERNAL LINKS
       -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       4. WHATSAPP CLICK LOGGING & ANALYTICS HELPER
       -------------------------------------------------------------------------- */
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.gtag) {
                window.gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Inquiry Triggered'
                });
            }
        });
    });
});




/* section one waps*/

/* ==========================================================================
   HERO PRODUCT AUTO SLIDER (2-Second Interval)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Har 2 Seconds (2000ms) ke baad image change hogi
    setInterval(nextSlide, 2000);
});