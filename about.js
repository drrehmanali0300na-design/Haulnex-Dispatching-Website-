
"use strict";

/* =====================================================
   HAULNEX DISPATCH SERVICES
   ABOUT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeAboutPage();
});


/* =====================================================
   01. INITIALIZE ABOUT PAGE
===================================================== */

function initializeAboutPage() {

    const aboutPage = document.querySelector(".about-hero-section");

    // Run only on About page
    if (!aboutPage) return;

    initializeAboutScrollReveal();
    initializeAboutImages();
    initializeAboutCardEffects();
}


/* =====================================================
   02. ABOUT PAGE SCROLL REVEAL
===================================================== */

function initializeAboutScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".about-hero-content, " +
        ".about-intro-image, " +
        ".about-intro-content, " +
        ".about-section-heading, " +
        ".purpose-card, " +
        ".about-why-content, " +
        ".about-why-visual, " +
        ".about-cta-content"
    );

    if (!revealElements.length) return;

    // Respect accessibility preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach(element => {
            element.classList.add("about-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


/* =====================================================
   03. ABOUT PAGE IMAGE CHECK
===================================================== */

function initializeAboutImages() {

    const images = document.querySelectorAll(
        ".about-intro-image img, " +
        ".about-why-visual img"
    );

    images.forEach(image => {

        const checkImage = () => {

            if (image.naturalWidth > 0) {

                image.classList.add("about-image-loaded");
                image.classList.remove("about-image-error");

            } else {

                image.classList.add("about-image-error");

            }

        };

        image.addEventListener("load", checkImage, {
            once: true
        });

        image.addEventListener("error", checkImage, {
            once: true
        });

        // Handle cached images
        if (image.complete) {
            checkImage();
        }

    });
}


/* =====================================================
   04. PURPOSE CARDS
   Add accessible keyboard interaction
===================================================== */

function initializeAboutCardEffects() {

    const cards = document.querySelectorAll(
        ".purpose-card"
    );

    cards.forEach(card => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("focus", () => {
            card.classList.add("card-focused");
        });

        card.addEventListener("blur", () => {
            card.classList.remove("card-focused");
        });

    });
}


/* =====================================================
   END OF ABOUT PAGE JAVASCRIPT
===================================================== */

"use strict";

/* =====================================================
   HAULNEX DISPATCH SERVICES
   ABOUT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeAboutPage();
});


/* =====================================================
   01. INITIALIZE ABOUT PAGE
===================================================== */

function initializeAboutPage() {

    const aboutPage = document.querySelector(".about-hero-section");

    // Run only on About page
    if (!aboutPage) return;

    initializeAboutScrollReveal();
    initializeAboutImages();
    initializeAboutCardEffects();
}


/* =====================================================
   02. ABOUT PAGE SCROLL REVEAL
===================================================== */

function initializeAboutScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".about-hero-content, " +
        ".about-intro-image, " +
        ".about-intro-content, " +
        ".about-section-heading, " +
        ".purpose-card, " +
        ".about-why-content, " +
        ".about-why-visual, " +
        ".about-cta-content"
    );

    if (!revealElements.length) return;

    // Respect accessibility preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach(element => {
            element.classList.add("about-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


/* =====================================================
   03. ABOUT PAGE IMAGE CHECK
===================================================== */

function initializeAboutImages() {

    const images = document.querySelectorAll(
        ".about-intro-image img, " +
        ".about-why-visual img"
    );

    images.forEach(image => {

        const checkImage = () => {

            if (image.naturalWidth > 0) {

                image.classList.add("about-image-loaded");
                image.classList.remove("about-image-error");

            } else {

                image.classList.add("about-image-error");

            }

        };

        image.addEventListener("load", checkImage, {
            once: true
        });

        image.addEventListener("error", checkImage, {
            once: true
        });

        // Handle cached images
        if (image.complete) {
            checkImage();
        }

    });
}


/* =====================================================
   04. PURPOSE CARDS
   Add accessible keyboard interaction
===================================================== */

function initializeAboutCardEffects() {

    const cards = document.querySelectorAll(
        ".purpose-card"
    );

    cards.forEach(card => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("focus", () => {
            card.classList.add("card-focused");
        });

        card.addEventListener("blur", () => {
            card.classList.remove("card-focused");
        });

    });
}


/* =====================================================
   END OF ABOUT PAGE JAVASCRIPT
===================================================== */

"use strict";

/* =====================================================
   HAULNEX DISPATCH SERVICES
   ABOUT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeAboutPage();
});


/* =====================================================
   01. INITIALIZE ABOUT PAGE
===================================================== */

function initializeAboutPage() {

    const aboutPage = document.querySelector(".about-hero-section");

    // Run only on About page
    if (!aboutPage) return;

    initializeAboutScrollReveal();
    initializeAboutImages();
    initializeAboutCardEffects();
}


/* =====================================================
   02. ABOUT PAGE SCROLL REVEAL
===================================================== */

function initializeAboutScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".about-hero-content, " +
        ".about-intro-image, " +
        ".about-intro-content, " +
        ".about-section-heading, " +
        ".purpose-card, " +
        ".about-why-content, " +
        ".about-why-visual, " +
        ".about-cta-content"
    );

    if (!revealElements.length) return;

    // Respect accessibility preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach(element => {
            element.classList.add("about-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


/* =====================================================
   03. ABOUT PAGE IMAGE CHECK
===================================================== */

function initializeAboutImages() {

    const images = document.querySelectorAll(
        ".about-intro-image img, " +
        ".about-why-visual img"
    );

    images.forEach(image => {

        const checkImage = () => {

            if (image.naturalWidth > 0) {

                image.classList.add("about-image-loaded");
                image.classList.remove("about-image-error");

            } else {

                image.classList.add("about-image-error");

            }

        };

        image.addEventListener("load", checkImage, {
            once: true
        });

        image.addEventListener("error", checkImage, {
            once: true
        });

        // Handle cached images
        if (image.complete) {
            checkImage();
        }

    });
}


/* =====================================================
   04. PURPOSE CARDS
   Add accessible keyboard interaction
===================================================== */

function initializeAboutCardEffects() {

    const cards = document.querySelectorAll(
        ".purpose-card"
    );

    cards.forEach(card => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("focus", () => {
            card.classList.add("card-focused");
        });

        card.addEventListener("blur", () => {
            card.classList.remove("card-focused");
        });

    });
}


/* =====================================================
   END OF ABOUT PAGE JAVASCRIPT
===================================================== */
