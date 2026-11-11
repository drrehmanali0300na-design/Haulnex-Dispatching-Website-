
/* =========================================================
   HAULNEX DISPATCH SERVICES
   GLOBAL JAVASCRIPT
   Common functionality for all website pages
========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL DOM ELEMENTS
========================================================= */

const DOM = {
    header: document.getElementById("siteHeader"),
    menuToggle: document.getElementById("mobileMenuToggle"),
    navigation: document.getElementById("mainNavigation"),
    loader: document.getElementById("pageLoader"),
    currentYear: document.getElementById("currentYear")
};


/* =========================================================
   02. PAGE LOADER
========================================================= */

function initializePageLoader() {

    if (!DOM.loader) return;

    function hideLoader() {

        DOM.loader.classList.add("loaded");

        setTimeout(() => {

            if (DOM.loader) {
                DOM.loader.remove();
            }

        }, 500);

    }

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener("load", hideLoader, {
            once: true
        });

        // Safety fallback if the window load event is delayed.
        setTimeout(hideLoader, 3000);

    }

}


/* =========================================================
   03. MOBILE NAVIGATION
========================================================= */

function initializeMobileNavigation() {

    const toggle = DOM.menuToggle;
    const navigation = DOM.navigation;

    if (!toggle || !navigation) return;


    function openMenu() {

        navigation.classList.add("active");

        toggle.classList.add("active");

        document.body.classList.add("menu-open");

        toggle.setAttribute("aria-expanded", "true");

    }


    function closeMenu() {

        navigation.classList.remove("active");

        toggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        toggle.setAttribute("aria-expanded", "false");

    }


    function toggleMenu() {

        const isOpen = navigation.classList.contains("active");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    // Toggle button click

    toggle.addEventListener("click", toggleMenu);


    // Close menu after clicking a navigation link

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    // Close menu when Escape key is pressed

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

            toggle.blur();

        }

    });


    // Close menu when clicking outside navigation

    document.addEventListener("click", event => {

        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedToggle =
            toggle.contains(event.target);

        if (
            navigation.classList.contains("active") &&
            !clickedInsideNavigation &&
            !clickedToggle
        ) {

            closeMenu();

        }

    });


    // Close mobile navigation when returning to desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMenu();

        }

    });

}


/* =========================================================
   04. HEADER SCROLL EFFECT
========================================================= */

function initializeHeaderScroll() {

    const header = DOM.header;

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    // Initial check

    updateHeader();


    // Scroll event with passive optimization

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

}


/* =========================================================
   05. AUTOMATIC COPYRIGHT YEAR
========================================================= */

function initializeCopyrightYear() {

    const yearElement = DOM.currentYear;

    if (!yearElement) return;

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================================
   06. ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const currentPath = window.location.pathname;

    const navigationLinks = document.querySelectorAll(
        ".nav-link, .footer-column a"
    );


    navigationLinks.forEach(link => {

        const linkURL = new URL(
            link.getAttribute("href"),
            window.location.href
        );


        const currentURL = new URL(
            window.location.href
        );


        const isSamePage =
            linkURL.pathname === currentURL.pathname;


        if (isSamePage) {

            if (link.classList.contains("nav-link")) {

                link.classList.add("active");

            }

        } else {

            if (link.classList.contains("nav-link")) {

                link.classList.remove("active");

            }

        }

    });

}


/* =========================================================
   07. SMOOTH SCROLL FOR INTERNAL ANCHORS
========================================================= */

function initializeSmoothScroll() {

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",

                block: "start"

            });

        });

    });

}


/* =========================================================
   08. IMAGE ERROR HANDLING
========================================================= */

function initializeImageFallbacks() {

    const images = document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.setAttribute("data-image-error", "true");

        }, {
            once: true
        });

    });

}


/* =========================================================
   09. INITIALIZE WEBSITE
========================================================= */

function initializeWebsite() {

    initializePageLoader();

    initializeMobileNavigation();

    initializeHeaderScroll();

    initializeCopyrightYear();

    initializeActiveNavigation();

    initializeSmoothScroll();

    initializeImageFallbacks();

}


/* =========================================================
   10. DOM READY
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite,
        { once: true }
    );

} else {

    initializeWebsite();

}


/* =========================================================
   END OF GLOBAL JAVASCRIPT
========================================================= */
