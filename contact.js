
/* =========================================================
   HAULNEX DISPATCH SERVICES
   CONTACT PAGE JAVASCRIPT
   Email Service: FormSubmit
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SELECT ELEMENTS
    ===================================================== */

    const contactForm = document.getElementById("contactForm");
    const submitButton = document.querySelector(".contact-submit-btn");
    const formMessage = document.getElementById("contactFormMessage");

    if (!contactForm) return;

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const phoneInput = document.getElementById("contactPhone");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");
    const consentInput = document.getElementById("contactConsent");

    /* =====================================================
       02. FORM CONFIGURATION
    ===================================================== */

    const RECEIVER_EMAIL = "drrehmanali0300@gmail.com";

    /* =====================================================
       03. MESSAGE HANDLER
    ===================================================== */

    function showMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = "contact-form-message " + type;
        formMessage.style.display = "block";

    }

    function clearMessage() {

        if (!formMessage) return;

        formMessage.textContent = "";
        formMessage.className = "contact-form-message";
        formMessage.style.display = "none";

    }

    /* =====================================================
       04. EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    /* =====================================================
       05. FORM VALIDATION
    ===================================================== */

    function validateForm() {

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !subject || !message) {

            showMessage("Please complete all required fields.", "error");
            return false;

        }

        if (name.length < 2) {

            showMessage("Please enter your full name.", "error");
            nameInput.focus();
            return false;

        }

        if (!isValidEmail(email)) {

            showMessage("Please enter a valid email address.", "error");
            emailInput.focus();
            return false;

        }

        if (phone && !/^[0-9+\-().\s]{7,25}$/.test(phone)) {

            showMessage("Please enter a valid phone number.", "error");
            phoneInput.focus();
            return false;

        }

        if (message.length < 10) {

            showMessage(
                "Your message must contain at least 10 characters.",
                "error"
            );

            messageInput.focus();
            return false;

        }

        if (!consentInput.checked) {

            showMessage(
                "Please agree before submitting your inquiry.",
                "error"
            );

            consentInput.focus();
            return false;

        }

        return true;

    }

    /* =====================================================
       06. BUTTON LOADING STATE
    ===================================================== */

    function setLoading(isLoading) {

        if (!submitButton) return;

        if (isLoading) {

            submitButton.disabled = true;

            submitButton.dataset.originalText =
                submitButton.innerHTML;

            submitButton.textContent = "Sending Message...";

        } else {

            submitButton.disabled = false;

            if (submitButton.dataset.originalText) {

                submitButton.innerHTML =
                    submitButton.dataset.originalText;

                delete submitButton.dataset.originalText;

            }

        }

    }

    /* =====================================================
       07. REAL EMAIL SUBMISSION
    ===================================================== */

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearMessage();

        if (!validateForm()) return;

        setLoading(true);

        try {

            const formData = new FormData(contactForm);

            formData.set("_subject", "New HAULNEX Contact Inquiry");
            formData.set("_template", "table");
            formData.set("_captcha", "true");

            const response = await fetch(
                `https://formsubmit.co/ajax/${RECEIVER_EMAIL}`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok || result.success !== "true") {

                throw new Error(
                    result.message || "Email delivery failed."
                );

            }

            contactForm.reset();

            showMessage(
                "Thank you! Your inquiry has been submitted successfully. We will get back to you.",
                "success"
            );

        } catch (error) {

            console.error("Contact form error:", error);

            showMessage(
                "Sorry, your message could not be sent. Please try again later.",
                "error"
            );

        } finally {

            setLoading(false);

        }

    });

    /* =====================================================
       08. CLEAR MESSAGE WHILE TYPING
    ===================================================== */

    const formFields = [
        nameInput,
        emailInput,
        phoneInput,
        subjectInput,
        messageInput
    ];

    formFields.forEach((field) => {

        if (!field) return;

        field.addEventListener("input", clearMessage);

    });

    consentInput.addEventListener("change", clearMessage);

    /* =====================================================
       09. CUSTOM VALIDATION
    ===================================================== */

    contactForm.setAttribute("novalidate", "true");

});
