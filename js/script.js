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





//ya section one ka new ha bhai
        const BANNER_API_URL = "https://maha-enterprises-production.up.railway.app/api/banners";
        let bannerList = [];
        let currentBannerIndex = 0;
        let bannerTimer = null;

        const bannerSlider = document.getElementById("bannerSlider");

        // Load Banners from Railway Backend
        async function fetchBanners() {
            try {
                const res = await fetch(BANNER_API_URL);
                if (!res.ok) throw new Error("Banner fetch failed");
                
                const data = await res.json();
                bannerList = Array.isArray(data) ? data : (data.data || []);

                if (bannerList.length > 0) {
                    renderBanners();
                    startAutoSlide();
                }
            } catch (err) {
                console.log("Using default fallback banner:", err);
            }
        }

        // Render Banner Slides Dynamically
        function renderBanners() {
            if (!bannerSlider || bannerList.length === 0) return;

            bannerSlider.innerHTML = "";
            bannerList.forEach((banner, index) => {
                const isActive = index === 0 ? "active" : "";
                const targetUrl = banner.linkUrl || "#collections";

                const slideHTML = `
                    <div class="banner-slide ${isActive}">
                        <div class="banner-img-box">
                            <img src="${banner.imageUrl}" alt="Banner Post ${index + 1}">
                        </div>
                        <div class="banner-action-bar">
                            <a href="${targetUrl}" target="_blank" class="banner-visit-btn">
                                VIEW POST DETAILS <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                `;
                bannerSlider.innerHTML += slideHTML;
            });
        }

        // Change Active Slide
        function showSlide(index) {
            const slides = document.querySelectorAll(".banner-slide");
            if (slides.length === 0) return;

            if (index >= slides.length) currentBannerIndex = 0;
            else if (index < 0) currentBannerIndex = slides.length - 1;
            else currentBannerIndex = index;

            slides.forEach((slide, idx) => {
                slide.classList.toggle("active", idx === currentBannerIndex);
            });
        }

        // Auto slide every 5 seconds
        function startAutoSlide() {
            stopAutoSlide();
            bannerTimer = setInterval(() => {
                showSlide(currentBannerIndex + 1);
            }, 5000);
        }

        function stopAutoSlide() {
            if (bannerTimer) clearInterval(bannerTimer);
        }

        // Manual Next/Prev Listeners
        document.getElementById("bannerNextBtn")?.addEventListener("click", () => {
            showSlide(currentBannerIndex + 1);
            startAutoSlide();
        });

        document.getElementById("bannerPrevBtn")?.addEventListener("click", () => {
            showSlide(currentBannerIndex - 1);
            startAutoSlide();
        });

        document.addEventListener("DOMContentLoaded", fetchBanners);

document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove("active");
            }
        });
    }
});
