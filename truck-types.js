
/* =========================================================
   HAULNEX DISPATCH SERVICES
   TRUCK TYPES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01. CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       02. SMOOTH SCROLLING
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            const header = document.getElementById("siteHeader");

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });

        });

    });


    /* =====================================================
       03. HERO CONTENT ANIMATION
    ===================================================== */

    const heroElements = document.querySelectorAll(`
        .truck-types-hero-content,
        .truck-hero-side-card,
        .truck-hero-stats
    `);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduceMotion && typeof Element.prototype.animate === "function") {

        heroElements.forEach((element, index) => {

            element.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(20px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 750,
                    delay: index * 150,
                    easing: "ease-out",
                    fill: "both"
                }
            );

        });

    }


    /* =====================================================
       04. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(`
        .truck-intro-heading,
        .truck-intro-description,
        .truck-categories .section-heading,
        .truck-type-card,
        .specialized-content,
        .specialized-item,
        .truck-cta-box
    `);

    if (
        !reduceMotion &&
        "IntersectionObserver" in window &&
        typeof Element.prototype.animate === "function"
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const element = entry.target;

                    const isCard = element.classList.contains(
                        "truck-type-card"
                    );

                    const isSpecialized = element.classList.contains(
                        "specialized-item"
                    );

                    let delay = 0;

                    if (isCard) {
                        const cards = Array.from(
                            document.querySelectorAll(".truck-type-card")
                        );

                        delay = (cards.indexOf(element) % 3) * 100;
                    }

                    if (isSpecialized) {
                        const items = Array.from(
                            document.querySelectorAll(".specialized-item")
                        );

                        delay = items.indexOf(element) * 90;
                    }

                    element.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(22px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 650,
                            delay: delay,
                            easing: "ease-out",
                            fill: "both"
                        }
                    );

                    observer.unobserve(element);

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
       05. TRUCK IMAGE HANDLING
    ===================================================== */

    const truckImages = document.querySelectorAll(
        ".truck-type-image img"
    );

    truckImages.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-unavailable");

            image.setAttribute(
                "aria-label",
                "Truck image could not be loaded"
            );

        });

        image.addEventListener("load", () => {

            image.classList.add("image-loaded");

        });

    });


    /* =====================================================
       06. SPECIALIZED EQUIPMENT INTERACTIONS
    ===================================================== */

    const specializedItems = document.querySelectorAll(
        ".specialized-item"
    );

    specializedItems.forEach(item => {

        item.addEventListener("click", event => {

            // Keep normal link navigation working if one is added.
            if (event.target.closest("a")) return;

            item.classList.add("item-selected");

            setTimeout(() => {
                item.classList.remove("item-selected");
            }, 250);

        });

    });


    /* =====================================================
       07. CTA BUTTON FEEDBACK
    ===================================================== */

    const ctaButtons = document.querySelectorAll(`
        .truck-types-hero-actions a,
        .specialized-content a,
        .truck-cta-actions a
    `);

    ctaButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("button-clicked");

            setTimeout(() => {
                button.classList.remove("button-clicked");
            }, 250);

        });

    });


    /* =====================================================
       08. ACCESSIBILITY
    ===================================================== */

    const truckCategories = document.getElementById(
        "truck-categories"
    );

    if (truckCategories) {
        truckCategories.style.scrollMarginTop = "100px";
    }


    /* =====================================================
       09. INITIALIZATION
    ===================================================== */

    console.log(
        "HAULNEX Truck Types Page Initialized Successfully."
    );

});
