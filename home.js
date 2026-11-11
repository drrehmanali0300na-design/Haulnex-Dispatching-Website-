
"use strict";

/* =========================================
   HAULNEX DISPATCH SERVICES
   HOME PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeHomePage();
});


/* =========================================
   HOME PAGE INITIALIZATION
========================================= */

function initializeHomePage() {
    // Run only on the homepage
    const isHomePage =
        document.body.classList.contains("home-page") ||
        document.querySelector(".hero-section");

    if (!isHomePage) return;

    initializeHeroImage();
    initializeScrollReveal();
    initializeStatCounters();
}


/* =========================================
   HERO IMAGE
   Check image loading status
========================================= */

function initializeHeroImage() {
    const heroImage = document.querySelector(".hero-truck-image");

    if (!heroImage) return;

    const checkImage = () => {
        if (heroImage.complete && heroImage.naturalWidth > 0) {
            heroImage.classList.add("image-loaded");
            heroImage.classList.remove("image-error");
        } else if (heroImage.complete && heroImage.naturalWidth === 0) {
            heroImage.classList.add("image-error");
        }
    };

    heroImage.addEventListener("load", checkImage, { once: true });
    heroImage.addEventListener("error", checkImage, { once: true });

    checkImage();
}


/* =========================================
   SCROLL REVEAL
   Lightweight section appearance
========================================= */

function initializeScrollReveal() {
    const elements = document.querySelectorAll(
        ".intro-section, .services-section, .truck-types-section, " +
        ".why-section, .process-section, .carrier-cta-section, " +
        ".service-card, .truck-card, .process-step"
    );

    if (!elements.length) return;

    // Show everything if browser does not support IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================
   STAT COUNTERS
   Animate numerical statistics
========================================= */

function initializeStatCounters() {
    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const animateCounter = (counter) => {
        if (counter.dataset.animated === "true") return;

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.counter);

        if (!Number.isFinite(target)) return;

        const duration = 1400;
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(
                startValue + (target - startValue) * easedProgress
            );

            counter.textContent = currentValue.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString("en-US");
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
