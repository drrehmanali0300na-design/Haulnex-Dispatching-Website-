
/* =========================================================
   HAULNEX DISPATCH SERVICES
   CARRIERS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealSelectors = [
        ".carrier-visual-card",
        ".carrier-type-card",
        ".carrier-benefit-card",
        ".commitment-item",
        ".carrier-start-card",
        ".carriers-cta-content"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal-element");

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       02. CARRIER CARD INTERACTION
    ===================================================== */

    const carrierCards = document.querySelectorAll(
        ".carrier-type-card, .carrier-benefit-card, .carrier-start-card"
    );

    carrierCards.forEach((card) => {

        card.addEventListener("focusin", () => {
            card.classList.add("card-active");
        });

        card.addEventListener("focusout", () => {
            card.classList.remove("card-active");
        });

    });


    /* =====================================================
       03. SMOOTH SCROLL
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       04. CARRIER CTA BUTTON TRACKING
       No fake submission or success message.
    ===================================================== */

    const carrierCTAButtons = document.querySelectorAll(
        '.carriers-hero-actions a[href="carrier-application.html"], ' +
        '.carriers-cta-actions a[href="carrier-application.html"]'
    );

    carrierCTAButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.add("cta-clicked");

        });

    });


    /* =====================================================
       05. COMMITMENT ITEMS
    ===================================================== */

    const commitmentItems = document.querySelectorAll(
        ".commitment-item"
    );

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const commitmentObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        commitmentItems.forEach((item) => {
            commitmentObserver.observe(item);
        });

    }

});
