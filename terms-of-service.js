
/* =========================================================
   HAULNEX DISPATCH SERVICES
   TERMS OF SERVICE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       01. SELECT ELEMENTS
    ===================================================== */

    const termsNavigation = document.querySelector(
        ".terms-navigation"
    );

    const termsLinks = document.querySelectorAll(
        ".terms-navigation a[href^='#']"
    );

    const termsSections = document.querySelectorAll(
        ".terms-policy-section[id]"
    );


    /* =====================================================
       02. UPDATE ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveLink(activeId) {

        termsLinks.forEach(function (link) {

            const linkTarget = link.getAttribute("href");

            const isActive = linkTarget === activeId;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }


    /* =====================================================
       03. SMOOTH SCROLL FUNCTION
    ===================================================== */

    function scrollToSection(targetSection, targetId) {

        if (!targetSection) {
            return;
        }

        targetSection.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

        if (targetId) {

            history.replaceState(
                null,
                "",
                targetId
            );

            updateActiveLink(targetId);

        }

    }


    /* =====================================================
       04. SIDEBAR NAVIGATION
    ===================================================== */

    if (termsLinks.length > 0) {

        termsLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId = this.getAttribute("href");

                const targetSection =
                    document.querySelector(targetId);

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                scrollToSection(
                    targetSection,
                    targetId
                );

            });

        });

    }


    /* =====================================================
       05. DOCUMENT INTERNAL LINKS
    ===================================================== */

    const documentLinks = document.querySelectorAll(
        ".terms-document a[href^='#']"
    );

    documentLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            scrollToSection(
                targetSection,
                targetId
            );

        });

    });


    /* =====================================================
       06. SCROLL SECTION OBSERVER
    ===================================================== */

    if (
        termsSections.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                const visibleSections = entries
                    .filter(function (entry) {

                        return entry.isIntersecting;

                    })
                    .sort(function (a, b) {

                        return a.boundingClientRect.top -
                            b.boundingClientRect.top;

                    });

                if (visibleSections.length > 0) {

                    const currentId =
                        "#" + visibleSections[0].target.id;

                    updateActiveLink(currentId);

                }

            },

            {

                root: null,

                rootMargin: "-15% 0px -70% 0px",

                threshold: 0

            }

        );


        termsSections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       07. INITIAL ACTIVE SECTION
    ===================================================== */

    function initializeActiveSection() {

        const currentHash = window.location.hash;

        const matchingLink = Array.from(termsLinks).find(
            function (link) {

                return link.getAttribute("href") === currentHash;

            }
        );

        if (matchingLink) {

            updateActiveLink(currentHash);

            return;

        }

        if (termsSections.length > 0) {

            updateActiveLink(
                "#" + termsSections[0].id
            );

        }

    }


    initializeActiveSection();


    /* =====================================================
       08. BROWSER BACK / FORWARD SUPPORT
    ===================================================== */

    window.addEventListener("hashchange", function () {

        const currentHash = window.location.hash;

        const matchingSection =
            document.querySelector(currentHash);

        if (matchingSection) {

            updateActiveLink(currentHash);

        }

    });


    /* =====================================================
       09. KEYBOARD ACCESSIBILITY
    ===================================================== */

    termsLinks.forEach(function (link) {

        link.addEventListener("keydown", function (event) {

            if (event.key !== "Enter") {
                return;
            }

            const targetId = this.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                scrollToSection(
                    targetSection,
                    targetId
                );

            }

        });

    });


    /* =====================================================
       10. INITIALIZE PAGE
    ===================================================== */

    document.documentElement.classList.add(
        "terms-page-ready"
    );


    console.log(
        "HAULNEX Terms of Service initialized successfully."
    );

});
