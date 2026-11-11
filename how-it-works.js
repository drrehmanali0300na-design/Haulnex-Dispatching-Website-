/* =========================================================
   HAULNEX DISPATCH SERVICES
   HOW IT WORKS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".process-card, .step-card, .workflow-card, .benefit-card, .how-card"
    );

    if ("IntersectionObserver" in window) {

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
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal-element");
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       02. PROCESS STEP INTERACTION
    ===================================================== */

    const processSteps = document.querySelectorAll(
        ".process-step, .workflow-step"
    );

    processSteps.forEach((step) => {

        step.addEventListener("click", () => {

            processSteps.forEach((item) => {
                item.classList.remove("active");
            });

            step.classList.add("active");

        });

    });


    /* =====================================================
       03. FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(
        ".faq-item, .how-faq-item"
    );

    faqItems.forEach((item) => {

        const question = item.querySelector(
            ".faq-question, .how-faq-question"
        );

        if (!question) return;

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            faqItems.forEach((otherItem) => {

                otherItem.classList.remove("active");

                const otherQuestion = otherItem.querySelector(
                    ".faq-question, .how-faq-question"
                );

                if (otherQuestion) {
                    otherQuestion.setAttribute("aria-expanded", "false");
                }

            });

            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");

            }

        });

    });


    /* =====================================================
       04. SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       05. ACTIVE PROCESS CARD
    ===================================================== */

    const processCards = document.querySelectorAll(
        ".process-card"
    );

    processCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("card-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("card-active");
        });

    });


    /* =====================================================
       06. CURRENT YEAR
       global.js also handles this, so only set if needed.
    ===================================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement && !yearElement.textContent.trim()) {
        yearElement.textContent = new Date().getFullYear();
    }

});