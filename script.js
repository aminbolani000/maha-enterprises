// Global Configuration
const CONFIG = {
    whatsappNumber: "923139223086"
};

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initLanguageSwitch();
    initHeroAnimations();
    initCollectionInteractions();
    initServicesInteractions();
    initLocationInteractions();
    initSocialInteractions();
    initAboutCatalogInteractions();
});

// =========================================================
// NAVBAR & MOBILE MENU CODE
// =========================================================
function initNavigation() {
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// =========================================================
// LANGUAGE SWITCH SYSTEM (ENGLISH / URDU)
// =========================================================
function initLanguageSwitch() {
    const langBtn = document.getElementById("lang-toggle");
    const langText = document.getElementById("lang-text");
    let currentLang = "en";

    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "ur" : "en";
        langText.textContent = currentLang === "en" ? "اردو" : "English";

        if (currentLang === "ur") {
            document.body.classList.add("lang-ur");
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.body.classList.remove("lang-ur");
            document.documentElement.setAttribute("dir", "ltr");
        }

        // Translate data attributes
        const translatableElements = document.querySelectorAll("[data-en]");
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    });
}

// =========================================================
// SECTION ONE ANIMATION CODE — HERO / BANNER
// =========================================================
function initHeroAnimations() {
    // Check if GSAP library is available
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

        // Hero content entrance
        tl.from(".hero-content > *", {
            y: 40,
            opacity: 0,
            stagger: 0.15
        });

        // 4 Hero Product entrance animations
        tl.from(".hero-clothes", { y: 100, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-watch", { scale: 0.5, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-shoes", { y: 80, opacity: 0, duration: 0.7 }, "-=0.4")
          .from(".hero-perfume", { scale: 0.2, opacity: 0, duration: 0.5 }, "-=0.3");

        // Floating loop animation after entrance
        gsap.to(".hero-clothes", { y: "-=10", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-watch", { y: "+=8", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-shoes", { y: "-=12", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-perfume", { y: "+=10", duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
}

// =========================================================
// SECTION TWO ANIMATION / INTERACTION CODE — COLLECTIONS
// =========================================================
function initCollectionInteractions() {
    const cards = document.querySelectorAll(".collection-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.borderColor = "var(--primary-red)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.borderColor = "var(--border-color)";
        });
    });
}

// =========================================================
// SECTION THREE ANIMATION / INTERACTION CODE — SERVICES
// =========================================================
function initServicesInteractions() {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            const icon = card.querySelector(".service-icon");
            if (icon) icon.style.transform = "scale(1.1)";
        });
        card.addEventListener("mouseleave", () => {
            const icon = card.querySelector(".service-icon");
            if (icon) icon.style.transform = "scale(1)";
        });
    });
}

// =========================================================
// SECTION FOUR INTERACTION CODE — SHOP LOCATION
// =========================================================
function initLocationInteractions() {
    const mapContainer = document.querySelector(".location-map-container");
    if (mapContainer) {
        mapContainer.addEventListener("click", () => {
            window.open("https://maps.google.com/?q=Bolton+Market+Saddar+Karachi", "_blank");
        });
    }
}

// =========================================================
// SECTION FIVE INTERACTION CODE — SOCIAL MEDIA
// =========================================================
function initSocialInteractions() {
    const socialItems = document.querySelectorAll(".social-item");
    socialItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
        });
        item.addEventListener("mouseleave", () => {
            item.style.boxShadow = "none";
        });
    });
}

// =========================================================
// SECTION SIX INTERACTION CODE — ABOUT / CATALOG
// =========================================================
function initAboutCatalogInteractions() {
    const downloadBtn = document.getElementById("btn-catalog-download");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", (e) => {
            // Placeholder fallback logic if catalog PDF is missing
            const catalogPath = downloadBtn.getAttribute("href");
            if (!catalogPath || catalogPath === "#") {
                e.preventDefault();
                alert("Catalog PDF will be available soon!");
            }
        });
    }
}