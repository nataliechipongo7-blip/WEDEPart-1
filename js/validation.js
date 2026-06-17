// Wait for the browser to fully load the page elements
document.addEventListener("DOMContentLoaded", function () {
    
    // Find all forms on the page
    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {
        // Run this function whenever a user clicks submit
        form.addEventListener("submit", function (event) {
            let isValid = true;
            let errorMessage = "";

            // --- Check Name ---
            const nameInput = form.querySelector("#name");
            if (nameInput) {
                const nameValue = nameInput.value.trim();
                // Names should be at least 2 characters long
                if (nameValue.length < 2) {
                    isValid = false;
                    errorMessage += "• Please enter a valid name (at least 2 characters).\n";
                    nameInput.style.borderColor = "red";
                } else {
                    nameInput.style.borderColor = "#ddd";
                }
            }

            // --- Check Email ---
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                const emailValue = emailInput.value.trim();
                // Basic formula to make sure email has an @ and a dot
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailValue)) {
                    isValid = false;
                    errorMessage += "• Please enter a valid email address.\n";
                    emailInput.style.borderColor = "red";
                } else {
                    emailInput.style.borderColor = "#ddd";
                }
            }

            // --- Check Phone Number ---
            const phoneInput = form.querySelector('input[type="tel"]');
            if (phoneInput) {
                const phoneValue = phoneInput.value.trim();
                // If they typed something, make sure it looks like a real phone number
                if (phoneValue !== "") {
                    const phonePattern = /^\+?[0-9\s\-]{10,15}$/;
                    if (!phonePattern.test(phoneValue)) {
                        isValid = false;
                        errorMessage += "• Please enter a valid phone number (at least 10 digits).\n";
                        phoneInput.style.borderColor = "red";
                    } else {
                        phoneInput.style.borderColor = "#ddd";
                    }
                }
            }

            // --- Check Date ---
            const dateInput = form.querySelector('input[type="date"]');
            if (dateInput) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                // Clear out times so we only compare the calendar dates
                today.setHours(0, 0, 0, 0);

                if (!dateInput.value) {
                    isValid = false;
                    errorMessage += "• Please select a delivery or collection date.\n";
                    dateInput.style.borderColor = "red";
                } else if (selectedDate < today) {
                    isValid = false;
                    errorMessage += "• The date needed cannot be in the past.\n";
                    dateInput.style.borderColor = "red";
                } else {
                    dateInput.style.borderColor = "#ddd";
                }
            }

            // --- Final Check ---
            // If anything failed, stop the form from sending and show the warnings
            if (!isValid) {
                event.preventDefault();
                alert("Please fix these errors before submitting:\n\n" + errorMessage);
            } else {
                alert("Success! Your form has been submitted.");
            }
        });
    });
});