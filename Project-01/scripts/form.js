document.addEventListener("DOMContentLoaded", () => {
    // DOM
    const form = document.getElementById("marathon-form");
    const emailInput = document.getElementById("email");
    const messageContainer = document.getElementById("form-message-container");
    if (form === null) return;
    const submitButton = form.querySelector(".submit-btn");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // message
    function displayMessage(message, type = "error", duration = 5000) {
        messageContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
        setTimeout(() => {
            messageContainer.innerHTML = "";
        }, duration);
    }

    function validateEmail(email) {
        return emailRegex.test(email);
    }

    function validateForm(data) {
        // HTML validation
        if (!form.checkValidity()) {
            return "Proszę wypełnić wszystkie pola oznaczone jako wymagane.";
        }

        // email
        if (!validateEmail(data.email)) {
            return "Wprowadzony adres e-mail jest nieprawidłowy.";
        }

        // select
        if (!data.intent || data.intent === "") {
            return "Proszę wybrać cel kontaktu z listy.";
        }

        return null;
    }

    form.addEventListener("submit", function (event) {
        // block default property
        event.preventDefault();
        messageContainer.innerHTML = "";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const validationError = validateForm(data);

        if (validationError) {
            displayMessage(`Błąd walidacji: ${validationError}`, "error");
            return;
        }

        submitButton.textContent = "Wysyłanie...";
        submitButton.disabled = true;

        // fetch simulation:

        setTimeout(() => {
            const success = Math.random() > 0.5; // 50% success ratio

            if (success) {
                displayMessage(
                    "Dziękujemy! Twoja wiadomość została wysłana pomyślnie.",
                    "success",
                    8000
                );
                form.reset();
            } else {
                // error
                displayMessage(
                    "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się mailowo.",
                    "error",
                    10000
                );
            }

            // restore btn
            submitButton.textContent = "Wyślij wiadomość";
            submitButton.disabled = false;
        }, 700); // Symulacja opóźnienia sieci
    });
});
