
/* =========================================================
   HAULNEX DISPATCH SERVICES
   FAQ PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        // Initial accessibility attributes
        const isInitiallyOpen = item.classList.contains("active");

        question.setAttribute(
            "aria-expanded",
            String(isInitiallyOpen)
        );

        const answerId = `faq-answer-${Array.from(faqItems).indexOf(item) + 1}`;

        answer.id = answerId;
        question.setAttribute("aria-controls", answerId);

        const toggleIcon = question.querySelector(".faq-toggle");

        if (toggleIcon) {
            toggleIcon.setAttribute("aria-hidden", "true");
        }

        // Accordion click
        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach((otherItem) => {

                otherItem.classList.remove("active");

                const otherQuestion = otherItem.querySelector(
                    ".faq-question"
                );

                if (otherQuestion) {
                    otherQuestion.setAttribute("aria-expanded", "false");
                }

            });

            // Open selected item
            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");

            }

        });

    });


    /* =====================================================
       02. FAQ CATEGORY NAVIGATION
    ===================================================== */

    const categoryLinks = document.querySelectorAll(
        ".faq-category-link"
    );

    const faqGroups = document.querySelectorAll(".faq-group");

    categoryLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            // Smooth scroll
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Update active category
            categoryLinks.forEach((category) => {
                category.classList.remove("active");
            });

            link.classList.add("active");

            // Update URL hash
            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }

        });

    });


    /* =====================================================
       03. ACTIVE CATEGORY ON SCROLL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const categoryObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const activeId = `#${entry.target.id}`;

                    categoryLinks.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === activeId
                        );

                    });

                });

            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0
            }
        );

        faqGroups.forEach((group) => {
            categoryObserver.observe(group);
        });

    }


    /* =====================================================
       04. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not(.faq-category-link)'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       05. KEYBOARD ACCESSIBILITY
    ===================================================== */

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("keydown", (event) => {

            if (event.key === "Escape" &&
                item.classList.contains("active")) {

                item.classList.remove("active");

                question.setAttribute("aria-expanded", "false");

                question.focus();

            }

        });

    });


    /* =====================================================
       06. INITIAL CATEGORY FROM URL
    ===================================================== */

    const initialHash = window.location.hash;

    if (initialHash) {

        const matchingLink = document.querySelector(
            `.faq-category-link[href="${initialHash}"]`
        );

        if (matchingLink) {

            categoryLinks.forEach((link) => {
                link.classList.remove("active");
            });

            matchingLink.classList.add("active");

        }

    }

});
