
/* =========================================================
   HAULNEX DISPATCH SERVICES
   CARRIER APPLICATION JAVASCRIPT
   Email Service: FormSubmit
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SELECT ELEMENTS
    ===================================================== */

    const applicationForm = document.getElementById(
        "carrierApplicationForm"
    );

    const submitButton = document.getElementById(
        "applicationSubmitBtn"
    );

    const formMessage = document.getElementById(
        "applicationFormMessage"
    );

    if (!applicationForm) return;

    const RECEIVER_EMAIL = "drrehmanali0300na@gmail.com";

    let isSubmitting = false;

    const fields = {
        companyName: document.getElementById("companyName"),
        businessType: document.getElementById("businessType"),
        contactPerson: document.getElementById("contactPerson"),
        email: document.getElementById("carrierEmail"),
        phone: document.getElementById("carrierPhone"),
        location: document.getElementById("businessLocation"),

        authorityStatus: document.getElementById("authorityStatus"),
        truckType: document.getElementById("truckType"),
        truckQuantity: document.getElementById("truckQuantity"),
        equipmentAvailability: document.getElementById(
            "equipmentAvailability"
        ),

        operatingArea: document.getElementById("operatingArea"),
        dispatchService: document.getElementById("dispatchService"),

        consent: document.getElementById("applicationConsent"),
        dispatchStart: document.getElementById("dispatchStart")
    };

    /* =====================================================
       02. SHOW MESSAGE
    ===================================================== */

    function showMessage(message, type = "error") {

        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className =
            `application-form-message ${type}`;

        formMessage.style.display = "block";

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

    /* =====================================================
       03. CLEAR MESSAGE
    ===================================================== */

    function clearMessage() {

        if (!formMessage) return;

        formMessage.textContent = "";
        formMessage.className = "application-form-message";
        formMessage.style.display = "none";

    }

    /* =====================================================
       04. VALIDATION HELPERS
    ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    function isValidPhone(phone) {

        const cleanedPhone = phone.replace(/[\s\-().+]/g, "");

        return /^\d{7,15}$/.test(cleanedPhone);

    }

    function getValue(field) {

        return field ? field.value.trim() : "";

    }

    function validateRequired(field, message) {

        if (!field || !getValue(field)) {

            showMessage(message);
            field?.focus();

            return false;

        }

        return true;

    }

    /* =====================================================
       05. FORM VALIDATION
    ===================================================== */

    function validateApplication() {

        clearMessage();

        if (!validateRequired(
            fields.companyName,
            "Please enter your company or business name."
        )) return false;

        if (!validateRequired(
            fields.businessType,
            "Please select your business type."
        )) return false;

        if (!validateRequired(
            fields.contactPerson,
            "Please enter the contact person's full name."
        )) return false;

        if (getValue(fields.contactPerson).length < 2) {

            showMessage("Please enter a valid contact person's name.");
            fields.contactPerson.focus();

            return false;

        }

        if (!validateRequired(
            fields.email,
            "Please enter your email address."
        )) return false;

        if (!isValidEmail(getValue(fields.email))) {

            showMessage("Please enter a valid email address.");
            fields.email.focus();

            return false;

        }

        if (!validateRequired(
            fields.phone,
            "Please enter your phone number."
        )) return false;

        if (!isValidPhone(getValue(fields.phone))) {

            showMessage(
                "Please enter a valid phone number with 7 to 15 digits."
            );

            fields.phone.focus();

            return false;

        }

        if (!validateRequired(
            fields.location,
            "Please enter your business location."
        )) return false;

        if (!validateRequired(
            fields.authorityStatus,
            "Please select your authority status."
        )) return false;

        if (!validateRequired(
            fields.truckType,
            "Please select your primary truck type."
        )) return false;

        if (!validateRequired(
            fields.truckQuantity,
            "Please enter the number of trucks."
        )) return false;

        const truckCount = Number(getValue(fields.truckQuantity));

        if (
            !Number.isInteger(truckCount) ||
            truckCount < 1 ||
            truckCount > 10000
        ) {

            showMessage("Please enter a valid number of trucks.");
            fields.truckQuantity.focus();

            return false;

        }

        if (!validateRequired(
            fields.equipmentAvailability,
            "Please select your equipment availability."
        )) return false;

        if (!validateRequired(
            fields.operatingArea,
            "Please select your operating area."
        )) return false;

        if (!validateRequired(
            fields.dispatchService,
            "Please select the dispatch service you are interested in."
        )) return false;

        const selectedDate = getValue(fields.dispatchStart);

        if (selectedDate) {

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const chosenDate = new Date(
                `${selectedDate}T00:00:00`
            );

            if (
                Number.isNaN(chosenDate.getTime()) ||
                chosenDate < today
            ) {

                showMessage(
                    "Please select today or a future preferred start date."
                );

                fields.dispatchStart.focus();

                return false;

            }

        }

        if (!fields.consent?.checked) {

            showMessage(
                "Please accept the Privacy Policy and Terms of Service."
            );

            fields.consent?.focus();

            return false;

        }

        return true;

    }

    /* =====================================================
       06. BUTTON LOADING STATE
    ===================================================== */

    function setLoading(loading) {

        if (!submitButton) return;

        if (loading) {

            submitButton.disabled = true;

            submitButton.dataset.originalContent =
                submitButton.innerHTML;

            submitButton.textContent =
                "Sending Application...";

        } else {

            submitButton.disabled = false;

            if (submitButton.dataset.originalContent) {

                submitButton.innerHTML =
                    submitButton.dataset.originalContent;

                delete submitButton.dataset.originalContent;

            }

        }

    }

    /* =====================================================
       07. COLLECT APPLICATION DATA
    ===================================================== */

    function collectApplicationData() {

        const formData = new FormData(applicationForm);

        const applicationData = Object.fromEntries(
            formData.entries()
        );

        applicationData._subject =
            "New HAULNEX Carrier Application";

        applicationData._template = "table";

        applicationData._replyto =
            getValue(fields.email);

        return applicationData;

    }

    /* =====================================================
       08. SEND APPLICATION TO EMAIL
    ===================================================== */

    async function sendApplication(applicationData) {

        const response = await fetch(
            `https://formsubmit.co/ajax/${RECEIVER_EMAIL}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(applicationData)
            }
        );

        const result = await response.json();

        if (
            !response.ok ||
            !(
                result.success === true ||
                result.success === "true"
            )
        ) {

            throw new Error(
                result.message || "Application delivery failed."
            );

        }

        return result;

    }

    /* =====================================================
       09. FORM SUBMISSION
    ===================================================== */

    applicationForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (isSubmitting) return;

        if (!validateApplication()) return;

        isSubmitting = true;
        setLoading(true);

        try {

            const applicationData = collectApplicationData();

            await sendApplication(applicationData);

            applicationForm.reset();

            showMessage(
                "Thank you! Your carrier application has been submitted successfully. We will review your information and contact you.",
                "success"
            );

        } catch (error) {

            console.error(
                "Carrier application submission error:",
                error
            );

            showMessage(
                "Your application could not be submitted. Please try again later or contact us directly.",
                "error"
            );

        } finally {

            isSubmitting = false;
            setLoading(false);

        }

    });

    /* =====================================================
       10. CLEAR MESSAGE ON INPUT
    ===================================================== */

    applicationForm.querySelectorAll(
        "input, select, textarea"
    ).forEach((field) => {

        field.addEventListener("input", clearMessage);
        field.addEventListener("change", clearMessage);

    });

    /* =====================================================
       11. PREVENT PAST DATE SELECTION
    ===================================================== */

    if (fields.dispatchStart) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        fields.dispatchStart.min =
            `${year}-${month}-${day}`;

    }

    /* =====================================================
       12. INITIALIZE FORM
    ===================================================== */

    applicationForm.setAttribute("novalidate", "true");

    console.log(
        "HAULNEX Carrier Application initialized."
    );

});
