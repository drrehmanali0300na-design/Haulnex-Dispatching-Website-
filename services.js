
/* =========================================================
   HAULNEX DISPATCH SERVICES
   SERVICES PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeServicesSmoothScroll();
    initializeServiceCardInteractions();
    initializeServicesReveal();

});


/* =========================================================
   02. SMOOTH SCROLL
========================================================= */

function initializeServicesSmoothScroll() {

    const anchorLinks = document.querySelectorAll(
        '.services-hero a[href^="#"], ' +
        '.service-card a[href^="#"], ' +
        '.services-cta a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

}


/* =========================================================
   03. SERVICE CARD INTERACTIONS
========================================================= */

function initializeServiceCardInteractions() {

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.classList.add("is-active");

        });

        card.addEventListener("mouseleave", function () {

            this.classList.remove("is-active");

        });

    });

}


/* =========================================================
   04. SCROLL REVEAL ANIMATION
========================================================= */

function initializeServicesReveal() {

    const revealElements = document.querySelectorAll(
        ".services-intro-grid, " +
        ".section-heading, " +
        ".service-card, " +
        ".services-support-content, " +
        ".support-item, " +
        ".services-cta-box"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(

        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }

    );


    revealElements.forEach(function (element) {

        element.classList.add("services-reveal");

        observer.observe(element);

    });

}


/* =========================================================
   05. SERVICES PAGE INITIALIZED
========================================================= */

console.log("HAULNEX Services Page Initialized Successfully");
