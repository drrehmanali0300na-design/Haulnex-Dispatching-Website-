
/* =========================================================
   HAULNEX DISPATCH SERVICES
   PRIVACY POLICY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       01. SELECT ELEMENTS
    ===================================================== */

    const privacyNavigation = document.querySelector(
        ".privacy-navigation"
    );

    const privacyLinks = document.querySelectorAll(
        ".privacy-navigation a[href^='#']"
    );

    const policySections = document.querySelectorAll(
        ".privacy-policy-section[id]"
    );


    /* =====================================================
       02. SMOOTH SIDEBAR NAVIGATION
    ===================================================== */

    if (privacyLinks.length > 0) {

        privacyLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId = this.getAttribute("href");

                const targetSection = document.querySelector(targetId);

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(
                    null,
                    "",
                    targetId
                );

                updateActiveLink(targetId);

            });

        });

    }


    /* =====================================================
       03. UPDATE ACTIVE SIDEBAR LINK
    ===================================================== */

    function updateActiveLink(activeId) {

        privacyLinks.forEach(function (link) {

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
       04. DETECT CURRENT SECTION ON SCROLL
    ===================================================== */

    if (
        policySections.length > 0 &&
        privacyNavigation &&
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


        policySections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       05. INITIAL ACTIVE SECTION
    ===================================================== */

    function setInitialActiveSection() {

        const currentHash = window.location.hash;

        if (
            currentHash &&
            document.querySelector(currentHash) &&
            document.querySelector(
                ".privacy-navigation a[href='" + currentHash + "']"
            )
        ) {

            updateActiveLink(currentHash);

            return;

        }

        if (policySections.length > 0) {

            updateActiveLink(
                "#" + policySections[0].id
            );

        }

    }


    setInitialActiveSection();


    /* =====================================================
       06. HANDLE BROWSER BACK / FORWARD
    ===================================================== */

    window.addEventListener("hashchange", function () {

        const currentHash = window.location.hash;

        if (
            currentHash &&
            document.querySelector(
                ".privacy-navigation a[href='" + currentHash + "']"
            )
        ) {

            updateActiveLink(currentHash);

        }

    });


    /* =====================================================
       07. EXTERNAL AND INTERNAL DOCUMENT LINKS
    ===================================================== */

    const documentLinks = document.querySelectorAll(
        ".privacy-document a[href^='#']"
    );

    documentLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(
                null,
                "",
                targetId
            );

            updateActiveLink(targetId);

        });

    });


    /* =====================================================
       08. ACCESSIBILITY
    ===================================================== */

    privacyLinks.forEach(function (link) {

        link.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                const targetId = this.getAttribute("href");

                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {

                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =====================================================
       09. INITIALIZE PRIVACY PAGE
    ===================================================== */

    document.documentElement.classList.add(
        "privacy-page-ready"
    );


    console.log(
        "HAULNEX Privacy Policy initialized successfully."
    );

});
